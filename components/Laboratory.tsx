
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { QueueModal } from './QueueModal';

interface LaboratoryProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const Laboratory: React.FC<LaboratoryProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [isPatientDetailsVisible, setIsPatientDetailsVisible] = useState(true);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isQueueModalOpen, setIsQueueModalOpen] = useState(false);
  const [queueList, setQueueList] = useState<any[]>([]);
  const [configuredTests, setConfiguredTests] = useState<any[]>([]);
  const [selectedTestId, setSelectedTestId] = useState('');
  
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [selectedVisit, setSelectedVisit] = useState<any>(null);
  const [selectedScheme, setSelectedScheme] = useState<any>(null);
  const [requestedTests, setRequestedTests] = useState<any[]>([]);
  const [requestedSummary, setRequestedSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotification, setShowNotification] = useState<{ visible: boolean; title: string; message: string; type: 'success' | 'error' } | null>(null);
  
  const isMounted = useRef(true);
  const actionsRef = useRef<HTMLDivElement>(null);

  const fetchQueue = async () => {
    try {
      const { data, error } = await supabase
        .from('patient_visits')
        .select(`
          *,
          patients_registry (
            id, surname, other_names, id_number, dob, sex, residence, occupation, notes
          )
        `)
        .eq('current_room', 'Laboratory')
        .eq('queue_status', 'Waiting')
        .order('queued_at', { ascending: true });

      if (error) {
        if (error.message?.includes('aborted')) return;
        console.warn('Supabase Error:', error.message);
        return;
      }
      
      if (isMounted.current) {
        setQueueList(data || []);
      }
    } catch (err: any) {
      if (err.name === 'AbortError' || err.message?.includes('aborted')) return;
      console.error('Queue Fetch Exception:', err.message);
    }
  };

  const fetchConfiguredTests = async () => {
    try {
      const { data, error } = await supabase
        .from('lab_test_configurations')
        .select('*')
        .order('test_name', { ascending: true });
      if (error) throw error;
      if (isMounted.current) setConfiguredTests(data || []);
    } catch (err) {
      console.error("Error fetching lab test configs:", err);
    }
  };

  const handlePatientSelect = async (visit: any) => {
    setLoading(true);
    try {
      const patientId = visit.patient_id;
      const visitId = visit.id;

      const [schemeRes, testsRes] = await Promise.all([
        supabase
          .from('patient_schemes')
          .select('*')
          .eq('patient_id', patientId)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle(),
        supabase
          .from('lab_tests') 
          .select('*')
          .eq('visit_id', visitId)
      ]);

      if (isMounted.current) {
        setSelectedPatient({ ...visit.patients_registry, visit_id: visitId });
        setSelectedVisit(visit);
        setSelectedScheme(schemeRes.data || null);
        setRequestedTests(testsRes.data || []);
        
        // Update summary from existing tests
        const summary = (testsRes.data || []).map(t => t.test_name).join(', ');
        setRequestedSummary(summary);
      }
    } catch (err: any) {
      if (err.name === 'AbortError' || err.message?.includes('aborted')) return;
      console.error('Details Fetch failed:', err.message);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  const handleAddTestToPatient = () => {
    if (!selectedVisit) {
      alert("Please select a patient from the queue first.");
      return;
    }
    if (!selectedTestId) {
      alert("Please select a test from the list.");
      return;
    }

    const testConfig = configuredTests.find(t => t.id === selectedTestId);
    if (!testConfig) return;

    // Local append for display in table
    const newTest = {
      id: `temp-${Date.now()}`,
      test_name: testConfig.test_name,
      component_name: testConfig.test_name,
      test_price: testConfig.test_price, // Mapping test_rate from configuration
      is_new: true,
      status: 'Ordered'
    };

    setRequestedTests(prev => {
      const updated = [...prev, newTest];
      // Sync Summary Text Area
      const summary = updated.map(t => t.test_name).join(', ');
      setRequestedSummary(summary);
      return updated;
    });

    // Cleanup: Clear the dropdown selection
    setSelectedTestId('');
  };

  const handleSubmitLabReport = async () => {
    if (!selectedVisit || requestedTests.length === 0) return;
    
    setLoading(true);
    try {
      const newTests = requestedTests.filter(t => t.is_new);
      
      // 1. Save new tests to lab_tests table
      if (newTests.length > 0) {
        const testsToInsert = newTests.map(t => ({
          visit_id: selectedVisit.id,
          test_name: t.test_name,
          component_name: t.component_name,
          created_at: new Date().toISOString()
        }));
        
        const { error: testsError } = await supabase.from('lab_tests').insert(testsToInsert);
        if (testsError) throw testsError;

        // 2. Automate Billing using test_price (rate) from configuration
        const billingItems = newTests.map(t => ({
          visit_id: selectedVisit.id,
          patient_id: selectedPatient.id,
          item_name: t.test_name,
          unit_cost: t.test_price || 0,
          quantity: 1,
          status: 'Unpaid',
          created_at: new Date().toISOString()
        }));

        const { error: billingError } = await supabase.from('billing_queue').insert(billingItems);
        if (billingError) throw billingError;
      }

      setShowNotification({
        visible: true,
        title: 'Report Submitted',
        message: 'Lab tests saved and sent to billing successfully.',
        type: 'success'
      });
      
      // Refresh patient tests
      const { data: freshTests } = await supabase.from('lab_tests').select('*').eq('visit_id', selectedVisit.id);
      setRequestedTests(freshTests || []);
      setRequestedSummary((freshTests || []).map(t => t.test_name).join(', '));

      setTimeout(() => { if (isMounted.current) setShowNotification(null); }, 4000);
    } catch (err: any) {
      alert("Submission failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQueueSuccess = (targetRoom: string) => {
    setSelectedPatient(null);
    setSelectedVisit(null);
    setSelectedScheme(null);
    setRequestedTests([]);
    setRequestedSummary('');
    fetchQueue();
    setShowNotification({
      visible: true,
      title: 'Success',
      message: `Patient moved to ${targetRoom}`,
      type: 'success'
    });
    setTimeout(() => {
      if (isMounted.current) setShowNotification(null);
    }, 4000);
  };

  const calculateAge = (dob: string) => {
    if (!dob) return "-";
    const birthDate = new Date(dob);
    const today = new Date();
    if (isNaN(birthDate.getTime())) return "-";
    
    let years = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) years--;
    
    return `${years} yrs`;
  };

  useEffect(() => {
    isMounted.current = true;
    fetchQueue();
    fetchConfiguredTests();
    
    const pollInterval = setInterval(fetchQueue, 15000);
    const timeInterval = setInterval(() => {
      if (isMounted.current) setCurrentTime(new Date());
    }, 10000);

    const handleClickOutside = (event: MouseEvent) => {
      if (actionsRef.current && !actionsRef.current.contains(event.target as Node)) {
        setIsActionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      isMounted.current = false;
      clearInterval(pollInterval);
      clearInterval(timeInterval);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-10 relative">
      {/* Toast Notification */}
      {showNotification?.visible && (
        <div className="fixed top-24 right-10 z-[5000] animate-in slide-in-from-right duration-500">
          <div className={`${showNotification.type === 'success' ? 'bg-[#5da54f]' : 'bg-rose-600'} text-white px-6 py-4 rounded-sm shadow-2xl flex items-center gap-4 min-w-[320px] border border-white/20`}>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <i className={`fa-solid ${showNotification.type === 'success' ? 'fa-check-circle' : 'fa-triangle-exclamation'} text-xl`}></i>
            </div>
            <div className="flex-1">
              <div className="font-bold text-[14px] uppercase tracking-wide">{showNotification.title}</div>
              <div className="text-[12px] opacity-90">{showNotification.message}</div>
            </div>
            <button onClick={() => setShowNotification(null)} className="text-white/40 hover:text-white transition-colors">
               <i className="fa-solid fa-times"></i>
            </button>
          </div>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="bg-white rounded-sm h-10 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <i onClick={onBack} className="fa-solid fa-times text-gray-400 cursor-pointer hover:text-gray-600 text-xs"></i>
          <h1 className="text-gray-700 font-semibold text-[14px]">Haven MIS</h1>
        </div>
        <div className="flex items-center gap-8 text-[13px] text-gray-500">
          <div>Branch: <span className="text-[#43939e] font-bold">Main branch</span></div>
          <div>Room: <span onClick={onOpenRoomModal} className="text-[#43939e] cursor-pointer hover:underline font-bold">{currentRoom}</span></div>
          <button onClick={fetchQueue} className="bg-[#17a2b8] text-white px-4 py-1 rounded-sm text-[11px] font-bold uppercase">
             {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Refresh Queue'}
          </button>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-[#f8f9fa] border border-gray-200 rounded-sm px-4 py-1.5 flex items-center justify-between text-[12px]">
        <div className="flex items-center gap-2 text-gray-500">
          <i className="fa-solid fa-home text-blue-500"></i>
          <span className="opacity-50">/</span>
          <span className="text-blue-500 cursor-pointer hover:underline">Laboratory</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Laboratory</span>
        </div>
      </div>

      {/* Patients Details Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b flex items-center justify-between bg-[#f8f9fa]">
          <h2 className="text-[15px] font-medium text-gray-600">
            Patients Details <span onClick={() => setIsPatientDetailsVisible(!isPatientDetailsVisible)} className="text-[12px] font-normal text-gray-400 cursor-pointer lowercase italic">(click here to {isPatientDetailsVisible ? 'hide' : 'show'})</span>
          </h2>
        </div>
        
        {isPatientDetailsVisible && (
          <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#eef5f6]">
            {/* Left: Metadata */}
            <div className="lg:col-span-4 grid grid-cols-1 gap-y-1 text-[13px]">
              <DataLine label="OPD No:" value={selectedPatient?.id_number} />
              <DataLine label="Surname:" value={selectedPatient?.surname} />
              <DataLine label="Othernames:" value={selectedPatient?.other_names} />
              <DataLine label="Age:" value={calculateAge(selectedPatient?.dob)} />
              <DataLine label="Sex:" value={selectedPatient?.sex} />
              <DataLine label="Residence:" value={selectedPatient?.residence} />
              <DataLine label="Occupation:" value={selectedPatient?.occupation} />
              <DataLine label="Scheme:" value={selectedScheme?.scheme_name || "CASH"} color="text-blue-600" />
              <DataLine label="Note:" value={selectedVisit?.note} color="text-orange-500" />
            </div>

            {/* Right: Queue Table */}
            <div className="lg:col-span-8 flex flex-col gap-2">
              <div className="flex justify-end gap-2 items-center">
                <span className="text-[12px] text-gray-500 font-bold uppercase tracking-tight">Search Queue:</span>
                <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[180px] bg-white shadow-xs focus:ring-1 focus:ring-cyan-500" />
              </div>
              <div className="border border-gray-200 rounded-sm overflow-hidden bg-white shadow-inner max-h-[180px] overflow-y-auto custom-scrollbar">
                <table className="w-full text-left text-[11px] whitespace-nowrap">
                  <thead className="bg-[#eef5f6] text-gray-600 border-b sticky top-0 z-10">
                    <tr>
                      <th className="px-3 py-1.5 font-bold border-r">Q. No</th>
                      <th className="px-3 py-1.5 font-bold border-r">OPD No</th>
                      <th className="px-3 py-1.5 font-bold border-r">Name</th>
                      <th className="px-3 py-1.5 font-bold border-r">From</th>
                      <th className="px-3 py-1.5 font-bold">Mins</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {queueList.length > 0 ? (
                      queueList.map((visit, idx) => (
                        <tr 
                          key={visit.id} 
                          onClick={() => handlePatientSelect(visit)}
                          className={`hover:bg-cyan-50 transition-colors cursor-pointer ${selectedVisit?.id === visit.id ? 'bg-cyan-100 font-bold border-l-4 border-cyan-500' : ''}`}
                        >
                          <td className="px-3 py-2 border-r">{idx + 1}</td>
                          <td className="px-3 py-2 border-r font-mono">{visit.patients_registry?.id_number}</td>
                          <td className="px-3 py-2 border-r uppercase">{visit.patients_registry?.surname} {visit.patients_registry?.other_names}</td>
                          <td className="px-3 py-2 border-r">{visit.previous_room || '-'}</td>
                          <td className="px-3 py-2 font-bold">
                             {Math.floor((currentTime.getTime() - new Date(visit.queued_at).getTime()) / 60000)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-10 text-gray-400 font-medium italic">No patients in Laboratory queue</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Requested Tests and Results Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b flex items-center justify-between bg-[#f8f9fa]">
          <h2 className="text-[15px] font-medium text-gray-600">Requested Tests and Results</h2>
          <div className="relative" ref={actionsRef}>
            <button 
              onClick={() => setIsActionsOpen(!isActionsOpen)}
              className="bg-[#5bc0de] text-white px-3 py-1 rounded-sm text-[11px] flex items-center gap-2 hover:bg-[#31b0d5] font-bold"
            >
              Actions <i className={`fa-solid fa-caret-down text-[9px] transition-transform ${isActionsOpen ? 'rotate-180' : ''}`}></i>
            </button>
            {isActionsOpen && (
              <div className="absolute right-0 mt-1 w-56 bg-white border border-gray-200 shadow-xl z-50 rounded-sm py-1 animate-in fade-in zoom-in-95 duration-100">
                <button 
                  onClick={() => { setIsActionsOpen(false); if (selectedPatient) setIsQueueModalOpen(true); }}
                  className="w-full text-left px-4 py-2 text-[13px] hover:bg-gray-50 text-green-700 font-bold flex items-center gap-2"
                >
                   <i className="fa-solid fa-user-clock opacity-50"></i> Queue Patient
                </button>
                <button className="w-full text-left px-4 py-2 text-[13px] hover:bg-gray-50 text-gray-700 flex items-center gap-2">
                   <i className="fa-solid fa-history opacity-50"></i> View Previous Visits
                </button>
                <hr className="my-1 border-gray-50" />
                <button className="w-full text-left px-4 py-2 text-[13px] hover:bg-gray-50 text-gray-700 flex items-center gap-2">
                   <i className="fa-solid fa-file-medical opacity-50"></i> Lab Report
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Test Selection */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-semibold text-gray-600 uppercase tracking-tight">Patient Scheme</label>
              <input 
                type="text" 
                readOnly 
                value={selectedScheme?.scheme_name || "CASH"} 
                className="border border-gray-300 rounded px-2 py-1.5 text-[13px] bg-gray-50 outline-none text-green-700 font-bold"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-semibold text-gray-600 uppercase tracking-tight">Lab Test</label>
              <div className="flex gap-2">
                <select 
                  value={selectedTestId}
                  onChange={(e) => setSelectedTestId(e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-2 py-1.5 text-[13px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 shadow-xs cursor-pointer font-medium"
                >
                  <option value="">--Select Test--</option>
                  {configuredTests.map(t => (
                    <option key={t.id} value={t.id}>{t.test_name}</option>
                  ))}
                </select>
                <button 
                  onClick={handleAddTestToPatient}
                  className="bg-[#17a2b8] text-white w-8 h-8 flex items-center justify-center rounded-sm hover:bg-[#138496] shadow-md active:scale-95 transition-all"
                >
                  <i className="fa-solid fa-plus text-xs"></i>
                </button>
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
               <label className="text-[12px] font-semibold text-gray-600 uppercase tracking-tight">Requested Tests Summary</label>
               <textarea 
                  readOnly
                  value={requestedSummary}
                  placeholder="Summary of tests added..."
                  className="w-full h-32 border border-gray-200 rounded p-2 text-[12px] bg-gray-50 outline-none resize-none italic text-gray-600 shadow-inner"
               />
            </div>
          </div>

          {/* Right Column: Test Grid */}
          <div className="lg:col-span-9 flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-2">
              <div className="flex gap-12">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-bold text-gray-700 uppercase tracking-tight">Status:</span>
                  <span className="text-[13px] text-blue-600 font-black uppercase tracking-wider">{selectedPatient ? 'Active Session' : 'Idle - Waiting Selection'}</span>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="bg-[#17a2b8] text-white px-4 py-1.5 rounded-sm text-[11px] font-bold hover:bg-[#138496] shadow-sm uppercase tracking-widest transition-all">
                  Collect Sample
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-sm overflow-x-auto min-h-[300px] bg-white shadow-inner">
              <table className="w-full text-left text-[12px]">
                <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                  <tr>
                    <th className="px-3 py-2 font-bold text-[#333] border-r">Component Name</th>
                    <th className="px-3 py-2 font-bold text-[#333] border-r">Lower Limit</th>
                    <th className="px-3 py-2 font-bold text-[#333] border-r">Upper Limit</th>
                    <th className="px-3 py-2 font-bold text-[#333] border-r">Units</th>
                    <th className="px-3 py-2 font-bold text-[#333] border-r">Value</th>
                    <th className="px-3 py-2 font-bold text-[#333] border-r">Result</th>
                    <th className="px-3 py-2 font-bold text-[#333] text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {requestedTests.length > 0 ? (
                    requestedTests.map((test, i) => (
                      <tr key={test.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-3 py-2 border-r font-medium flex items-center gap-2">
                           {test.component_name}
                           {test.is_new && <span className="bg-amber-100 text-amber-700 text-[8px] px-1 rounded font-black uppercase">Unsaved</span>}
                        </td>
                        <td className="px-3 py-2 border-r">{test.lower_limit || '-'}</td>
                        <td className="px-3 py-2 border-r">{test.upper_limit || '-'}</td>
                        <td className="px-3 py-2 border-r">{test.units || '-'}</td>
                        <td className="px-3 py-2 border-r">
                           <input type="text" className="w-full border border-gray-200 rounded px-2 py-0.5 outline-none focus:border-cyan-500 shadow-xs" />
                        </td>
                        <td className="px-3 py-2 border-r font-bold"></td>
                        <td className="px-3 py-2 text-center">
                           <button 
                             onClick={() => setRequestedTests(prev => {
                               const updated = prev.filter(t => t.id !== test.id);
                               setRequestedSummary(updated.map(t => t.test_name).join(', '));
                               return updated;
                             })}
                             className="text-red-400 hover:text-red-600 transition-colors"
                           >
                             <i className="fa-solid fa-trash-can"></i>
                           </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center py-24 text-gray-400 font-medium italic uppercase tracking-[0.2em] opacity-50">
                        No tests requested for this encounter. <br/> Use the dropdown on the left to add diagnostic tests.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
              <div className="flex items-center gap-3">
                <input type="checkbox" id="is_partial" className="w-4.5 h-4.5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 shadow-xs cursor-pointer" />
                <label htmlFor="is_partial" className="text-[13px] text-gray-600 font-bold uppercase tracking-tight cursor-pointer">Is Partially Done</label>
              </div>
              <button 
                onClick={handleSubmitLabReport}
                disabled={loading || requestedTests.length === 0}
                className="bg-[#5cb85c] text-white px-10 py-2.5 rounded-sm text-[13px] font-black uppercase tracking-widest hover:bg-[#4cae4c] transition-all shadow-lg active:scale-95 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
              >
                {loading ? <i className="fa-solid fa-spinner fa-spin mr-2"></i> : <i className="fa-solid fa-check-double mr-2"></i>}
                Submit & Bill Requested Tests
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Queue Patient Modal */}
      {isQueueModalOpen && selectedPatient && (
        <QueueModal 
          patient={selectedPatient}
          visitId={selectedPatient.visit_id}
          onClose={() => setIsQueueModalOpen(false)}
          setParentNotification={setShowNotification}
          mode="update"
          initialFrom="Laboratory"
          onSuccess={handleQueueSuccess}
        />
      )}
    </div>
  );
};

const DataLine: React.FC<{ label: string; value: any; color?: string }> = ({ label, value, color = "text-gray-800" }) => (
  <div className="flex items-baseline justify-between border-b border-white/60 pb-0.5 group hover:bg-white/40 transition-colors">
    <span className="font-bold text-gray-700 whitespace-nowrap mr-4 uppercase text-[10px] tracking-tight opacity-70">{label}</span>
    <span className={`font-semibold ${color} truncate`}>{value || ''}</span>
  </div>
);

const DropdownItem: React.FC<{ label: string; onClick: () => void; className?: string }> = ({ label, onClick, className = "" }) => (
  <div onClick={onClick} className={`px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors ${className}`}>{label}</div>
);
