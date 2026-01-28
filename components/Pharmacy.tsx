
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { QueueModal } from './QueueModal';

interface PharmacyProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const Pharmacy: React.FC<PharmacyProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [isPatientDetailsVisible, setIsPatientDetailsVisible] = useState(true);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isQueueModalOpen, setIsQueueModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [queueList, setQueueList] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [selectedVisit, setSelectedVisit] = useState<any>(null);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [dispenseQtys, setDispenseQtys] = useState<Record<string, string>>({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showToast, setShowToast] = useState<{ visible: boolean; title: string; message: string; type: 'success' | 'error' } | null>(null);
  
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
        .eq('current_room', 'Pharmacy')
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

  const handlePatientSelect = async (visit: any) => {
    setLoading(true);
    try {
      const visitId = visit.id;

      // Fetch Prescriptions for this visit
      const { data: presData, error: presError } = await supabase
        .from('pharmacy_prescriptions')
        .select('*')
        .eq('visit_id', visitId);

      if (presError) throw presError;

      if (isMounted.current) {
        setSelectedVisit(visit);
        setSelectedPatient(visit.patients_registry);
        setPrescriptions(presData || []);
        
        // Reset quantities map
        const initialQtys: Record<string, string> = {};
        presData?.forEach(p => {
          initialQtys[p.id] = p.quantity?.toString() || '1';
        });
        setDispenseQtys(initialQtys);
      }
    } catch (err: any) {
      if (err.name === 'AbortError' || err.message?.includes('aborted')) return;
      console.error('Details Fetch failed:', err.message);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  const handleQtyChange = (id: string, val: string) => {
    setDispenseQtys(prev => ({ ...prev, [id]: val }));
  };

  const handleDispense = async (prescription: any) => {
    if (prescription.status === 'Dispensed') return;
    const qty = parseFloat(dispenseQtys[prescription.id] || '0');
    if (qty <= 0) {
      alert("Please enter a valid quantity to dispense.");
      return;
    }

    setLoading(true);
    try {
      // 1. Update status and actual quantity in pharmacy_prescriptions
      const { error: updateError } = await supabase
        .from('pharmacy_prescriptions')
        .update({ 
          status: 'Dispensed', 
          dispensed_at: new Date().toISOString(),
          dispensed_quantity: qty
        })
        .eq('id', prescription.id);

      if (updateError) throw updateError;

      // 2. Add to billing_queue
      const { error: billingError } = await supabase
        .from('billing_queue')
        .insert([{
          visit_id: selectedVisit.id,
          patient_id: selectedPatient.id,
          item_name: prescription.drug_name,
          unit_cost: prescription.unit_cost || 0,
          quantity: qty,
          status: 'Unpaid',
          created_at: new Date().toISOString()
        }]);

      if (billingError) throw billingError;

      // Update local state
      setPrescriptions(prev => 
        prev.map(p => p.id === prescription.id ? { ...p, status: 'Dispensed', dispensed_quantity: qty } : p)
      );

      setShowToast({
        visible: true,
        title: 'Dispensed',
        message: `${prescription.drug_name} (${qty}) has been dispensed and billed.`,
        type: 'success'
      });
      setTimeout(() => { if (isMounted.current) setShowToast(null); }, 3000);

    } catch (err: any) {
      if (err.name === 'AbortError' || err.message?.includes('aborted')) return;
      setShowToast({
        visible: true,
        title: 'Dispensing Failed',
        message: err.message,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQueueSuccess = (destination: string) => {
    setShowToast({
      visible: true,
      title: 'QUEUED',
      message: `Patient ${selectedPatient?.surname} queued to ${destination}.`,
      type: 'success'
    });
    
    // UI Cleanup
    setSelectedPatient(null);
    setSelectedVisit(null);
    setPrescriptions([]);
    setDispenseQtys({});
    fetchQueue();

    setTimeout(() => { if (isMounted.current) setShowToast(null); }, 4000);
  };

  const calculateAge = (dob: string) => {
    if (!dob) return "-";
    const birthDate = new Date(dob);
    const today = new Date();
    if (isNaN(birthDate.getTime())) return "-";
    let years = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) years--;
    return `${years} (yrs)`;
  };

  useEffect(() => {
    isMounted.current = true;
    fetchQueue();
    const pollInterval = setInterval(fetchQueue, 20000);
    const timeInterval = setInterval(() => { if (isMounted.current) setCurrentTime(new Date()); }, 10000);
    
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
      {showToast?.visible && (
        <div className="fixed top-24 right-10 z-[5000] animate-in slide-in-from-right duration-500">
          <div className={`${showToast.type === 'success' ? 'bg-[#5da54f]' : 'bg-[#e51c44]'} text-white px-6 py-4 rounded-sm shadow-2xl flex items-center gap-5 min-w-[350px] border-l-[10px] border-black/10`}>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <i className={`fa-solid ${showToast.type === 'success' ? 'fa-check-circle' : 'fa-triangle-exclamation'} text-2xl`}></i>
            </div>
            <div className="flex-1">
              <div className="font-black text-[15px] uppercase tracking-wider mb-0.5">{showToast.title}</div>
              <div className="text-[13px] font-medium opacity-90 leading-tight">{showToast.message}</div>
            </div>
            <button onClick={() => setShowToast(null)} className="text-white/40 hover:text-white transition-colors self-start mt-1">
               <i className="fa-solid fa-times text-lg"></i>
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
          <button onClick={fetchQueue} className="bg-[#17a2b8] text-white px-4 py-1 rounded-sm text-[11px] font-bold uppercase tracking-tight shadow-sm hover:bg-[#138496]">
             {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Refresh Queue'}
          </button>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-[#f8f9fa] border border-gray-200 rounded-sm px-4 py-1.5 flex items-center justify-between text-[12px]">
        <div className="flex items-center gap-2 text-gray-500">
          <i className="fa-solid fa-home text-blue-500"></i>
          <span className="opacity-50">/</span>
          <span className="text-blue-500 cursor-pointer hover:underline">Billing</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Pharmacy Dispensing</span>
        </div>
      </div>

      {/* Patient Details Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b flex items-center justify-between bg-[#f8f9fa]">
          <h2 className="text-[14px] font-medium text-gray-600 uppercase tracking-tight">
            Patients Details <span onClick={() => setIsPatientDetailsVisible(!isPatientDetailsVisible)} className="text-[12px] font-normal text-gray-400 cursor-pointer italic">(click here to {isPatientDetailsVisible ? 'hide' : 'show'})</span>
          </h2>
        </div>
        
        {isPatientDetailsVisible && (
          <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-8 bg-[#eef5f6]">
            {/* Left: Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1.5 text-[13px] text-gray-700">
              <DataLine label="OPD No:" value={selectedPatient?.id_number} />
              <DataLine label="Surname:" value={selectedPatient?.surname} />
              <DataLine label="Othernames:" value={selectedPatient?.other_names} />
              <DataLine label="Age:" value={calculateAge(selectedPatient?.dob)} />
              <DataLine label="Sex:" value={selectedPatient?.sex} />
              <DataLine label="Residence:" value={selectedPatient?.residence} />
              <DataLine label="Occupation:" value={selectedPatient?.occupation} />
              <DataLine label="Visit ID:" value={selectedVisit?.id} color="text-blue-600 font-bold" />
              <div className="md:col-span-2">
                <DataLine label="Doctor Note:" value={selectedVisit?.note} color="text-orange-500" />
              </div>
            </div>

            {/* Right: Queue Table */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-end gap-2 items-center">
                <span className="text-[12px] text-gray-500 font-black uppercase tracking-tighter">Queue Search:</span>
                <input type="text" className="border border-gray-300 rounded px-2 py-0.5 text-[12px] outline-none w-[180px] shadow-sm bg-white" />
              </div>
              <div className="border border-gray-200 rounded-sm overflow-hidden bg-white shadow-inner max-h-[160px] overflow-y-auto custom-scrollbar">
                <table className="w-full text-left text-[11px] whitespace-nowrap">
                  <thead className="bg-[#f2f2f2] text-gray-600 border-b sticky top-0 z-10">
                    <tr>
                      <th className="px-3 py-2 font-bold border-r">Q. No</th>
                      <th className="px-3 py-2 font-bold border-r">OPD No</th>
                      <th className="px-3 py-2 font-bold border-r">Name</th>
                      <th className="px-3 py-2 font-bold border-r">From</th>
                      <th className="px-3 py-2 font-bold">Mins</th>
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
                          <td className="px-3 py-2 font-bold">{Math.floor((currentTime.getTime() - new Date(visit.queued_at).getTime()) / 60000)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-10 text-gray-400 italic uppercase tracking-widest font-medium opacity-50">No patients in Pharmacy queue</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Prescription Workspace Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2 border-b flex items-center justify-between bg-[#f8f9fa]">
          <h2 className="text-[14px] font-medium text-gray-600 uppercase tracking-tight">Prescription Workspace</h2>
          <div className="relative" ref={actionsRef}>
            <button 
              onClick={() => setIsActionsOpen(!isActionsOpen)}
              className="bg-[#17a2b8] text-white px-4 py-1.5 rounded-sm text-[12px] flex items-center gap-2 font-bold shadow-md hover:bg-[#138496] transition-all"
            >
              Actions <i className={`fa-solid fa-caret-down text-[10px] transition-transform ${isActionsOpen ? 'rotate-180' : ''}`}></i>
            </button>
            {isActionsOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.15)] rounded-md z-[100] py-1 text-[13px] animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
                <DropdownItem label="Prescription Refills" onClick={() => setIsActionsOpen(false)} />
                <DropdownItem label="Billing" onClick={() => setIsActionsOpen(false)} />
                <DropdownItem label="Finalize Bill" onClick={() => setIsActionsOpen(false)} />
                <DropdownItem label="Prescription" onClick={() => setIsActionsOpen(false)} />
                <hr className="my-1 border-gray-100" />
                <DropdownItem 
                  label="Queue Patient" 
                  onClick={() => { setIsActionsOpen(false); if (selectedPatient) setIsQueueModalOpen(true); }} 
                  className="text-green-700 font-bold" 
                />
              </div>
            )}
          </div>
        </div>

        <div className="p-4 flex flex-col gap-4 bg-[#eef5f6]">
          <div className="flex justify-between items-center mb-1">
             <h3 className="text-[13px] font-bold text-[#4a4a7d] uppercase tracking-widest flex items-center gap-2">
                <i className="fa-solid fa-prescription text-cyan-600"></i>
                Prescribed Medication List
             </h3>
          </div>

          <div className="border border-gray-200 rounded-sm overflow-x-auto min-h-[250px] bg-white shadow-inner">
            <table className="w-full text-left text-[12px]">
              <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                <tr>
                  <th className="px-4 py-2 font-bold border-r">Drug Name</th>
                  <th className="px-4 py-2 font-bold border-r">Dosage</th>
                  <th className="px-4 py-2 font-bold border-r">Frequency</th>
                  <th className="px-4 py-2 font-bold border-r w-[100px] text-center">Qty</th>
                  <th className="px-4 py-2 font-bold border-r text-center">Status</th>
                  <th className="px-4 py-2 font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {prescriptions.length > 0 ? (
                  prescriptions.map((pres, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 border-r font-medium text-gray-800">{pres.drug_name}</td>
                      <td className="px-4 py-3 border-r">{pres.dosage}</td>
                      <td className="px-4 py-3 border-r">{pres.frequency}</td>
                      <td className="px-4 py-3 border-r text-center">
                         {pres.status === 'Dispensed' ? (
                           <span className="font-bold text-gray-600">{pres.dispensed_quantity || pres.quantity}</span>
                         ) : (
                           <input 
                              type="number" 
                              value={dispenseQtys[pres.id] || ''} 
                              onChange={(e) => handleQtyChange(pres.id, e.target.value)}
                              className="w-16 border border-gray-300 rounded px-2 py-1 text-center font-bold text-blue-700 focus:ring-1 focus:ring-cyan-500 outline-none"
                           />
                         )}
                      </td>
                      <td className="px-4 py-3 border-r text-center">
                         <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                           pres.status === 'Dispensed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700 animate-pulse'
                         }`}>
                           {pres.status || 'Pending'}
                         </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {pres.status !== 'Dispensed' ? (
                          <button 
                            onClick={() => handleDispense(pres)}
                            className="bg-[#17a2b8] text-white px-4 py-1 rounded-sm text-[11px] font-bold hover:bg-[#138496] shadow-sm transition-all active:scale-90 flex items-center gap-2 mx-auto"
                          >
                             <i className="fa-solid fa-hand-holding-medical"></i> Dispense
                          </button>
                        ) : (
                          <span className="text-gray-400 italic text-[11px] flex items-center justify-center gap-1">
                             <i className="fa-solid fa-check-double text-green-500"></i> Billed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-20 text-gray-400 italic font-medium uppercase tracking-widest opacity-40">
                      {selectedVisit ? 'No prescriptions found for this encounter' : 'Select a patient from the queue to view prescriptions'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex gap-8 text-[12px] text-gray-500 font-bold bg-white/50 p-2 rounded">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-amber-400 rounded-full"></span>
              <span>Pending Dispensing</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>Dispensed & Billed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Patient's Previous Visits Table */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b bg-[#f8f9fa]">
          <h2 className="text-[14px] font-medium text-gray-600 uppercase tracking-tight">Clinical Encounter History</h2>
        </div>
        <div className="p-4">
          <div className="border border-gray-100 rounded-sm overflow-hidden bg-white shadow-inner">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#f2f2f2] text-gray-600 border-b">
                <tr>
                  <th className="px-4 py-2 font-bold border-r">Visit Id</th>
                  <th className="px-4 py-2 font-bold border-r">Date of Visit</th>
                  <th className="px-4 py-2 font-bold">Prescription Summary</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td colSpan={3} className="text-center py-10 text-gray-400 italic">Encounter history will manifest upon patient selection</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isQueueModalOpen && selectedPatient && selectedVisit && (
        <QueueModal 
          patient={selectedPatient}
          visitId={selectedVisit.id}
          onClose={() => setIsQueueModalOpen(false)}
          setParentNotification={setShowToast}
          mode="update"
          initialFrom="Pharmacy"
          onSuccess={handleQueueSuccess}
        />
      )}
    </div>
  );
};

const DataLine: React.FC<{ label: string; value: string; color?: string }> = ({ label, value, color = "text-gray-900" }) => (
  <div className="flex gap-2 justify-between border-b border-white/40 pb-0.5 group">
    <span className="font-bold text-[11px] w-[110px] uppercase tracking-tighter opacity-70 group-hover:opacity-100 transition-opacity whitespace-nowrap">{label}</span>
    <span className={`font-semibold text-right truncate ${color}`}>{value || '-'}</span>
  </div>
);

const DropdownItem: React.FC<{ label: string; onClick: () => void; className?: string }> = ({ label, onClick, className = "" }) => (
  <div onClick={onClick} className={`px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors ${className}`}>{label}</div>
);
