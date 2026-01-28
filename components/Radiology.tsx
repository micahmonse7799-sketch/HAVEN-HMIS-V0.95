
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { QueueModal } from './QueueModal';

interface RadiologyProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

const INITIAL_FORM = {
  history: '',
  technique: '',
  findings: '',
  impression: '',
  comment: '',
  examiner: '',
  radiologist: '',
  centre: '',
  reason_not_done: '',
  is_done: false,
  is_internal: true,
  date_done: new Date().toLocaleString()
};

export const Radiology: React.FC<RadiologyProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [isPatientDetailsVisible, setIsPatientDetailsVisible] = useState(true);
  const [isQueueModalOpen, setIsQueueModalOpen] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [queueList, setQueueList] = useState<any[]>([]);
  const [selectedVisit, setSelectedVisit] = useState<any>(null);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [form, setForm] = useState(INITIAL_FORM);
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
        .eq('current_room', 'Radiology')
        .eq('queue_status', 'Waiting')
        .order('queued_at', { ascending: true });

      if (error) {
        if (error.message?.includes('aborted')) return;
        console.warn('Radiology Queue Error:', error.message);
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
      if (isMounted.current) {
        setSelectedVisit(visit);
        setSelectedPatient(visit.patients_registry);
        // Reset form for new patient but keep current time for date_done
        setForm({ ...INITIAL_FORM, date_done: new Date().toLocaleString() });
        
        // Try fetching existing results if any
        const { data: existing, error } = await supabase
          .from('radiology_results')
          .select('*')
          .eq('visit_id', visit.id)
          .maybeSingle();
        
        if (existing && isMounted.current) {
          setForm({
            ...existing,
            date_done: existing.date_done ? new Date(existing.date_done).toLocaleString() : new Date().toLocaleString()
          });
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError' || err.message?.includes('aborted')) return;
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedVisit) {
      alert("Please select a patient from the queue.");
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase
        .from('radiology_results')
        .upsert({
          visit_id: selectedVisit.id,
          patient_id: selectedPatient.id,
          history: form.history,
          technique: form.technique,
          findings: form.findings,
          impression: form.impression,
          comment: form.comment,
          examiner: form.examiner,
          radiologist: form.radiologist,
          centre: form.centre,
          date_done: new Date().toISOString(),
          is_done: form.is_done,
          is_internal: form.is_internal,
          reason_not_done: form.reason_not_done,
          created_at: new Date().toISOString()
        }, { onConflict: 'visit_id' });

      if (error) throw error;

      setShowToast({
        visible: true,
        title: 'SUCCESS',
        message: 'Radiology examination results saved successfully.',
        type: 'success'
      });
      setTimeout(() => { if (isMounted.current) setShowToast(null); }, 3000);
    } catch (err: any) {
      if (err.name === 'AbortError' || err.message?.includes('aborted')) return;
      setShowToast({
        visible: true,
        title: 'SAVE FAILED',
        message: err.message,
        type: 'error'
      });
    } finally {
      if (isMounted.current) setSaving(false);
    }
  };

  const handleQueueSuccess = () => {
    setSelectedPatient(null);
    setSelectedVisit(null);
    setForm(INITIAL_FORM);
    fetchQueue();
  };

  const calculateAge = (dob: string) => {
    if (!dob) return "-";
    const birthDate = new Date(dob);
    const today = new Date();
    if (isNaN(birthDate.getTime())) return "-";
    let years = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) years--;
    
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0) m += 12;
    return `${years} yrs ${m} mths 0 wks 0 days`;
  };

  useEffect(() => {
    isMounted.current = true;
    fetchQueue();
    const pollInterval = setInterval(fetchQueue, 15000);
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
          <div className={`${showToast.type === 'success' ? 'bg-[#5da54f]' : 'bg-[#e51c44]'} text-white px-6 py-4 rounded-sm shadow-2xl flex items-center gap-5 min-w-[380px] border-l-[10px] border-black/10`}>
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
      <div className="bg-white rounded-sm h-10 px-4 flex items-center justify-between shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <i onClick={onBack} className="fa-solid fa-times text-gray-400 cursor-pointer hover:text-gray-600 text-xs"></i>
          <h1 className="text-gray-700 font-semibold text-[14px]">Haven MIS</h1>
        </div>
        <div className="flex items-center gap-8 text-[13px] text-gray-500">
          <div>Branch: <span className="text-[#43939e] font-bold">Main branch</span></div>
          <div>Room: <span onClick={onOpenRoomModal} className="text-[#43939e] cursor-pointer hover:underline font-bold">{currentRoom}</span></div>
          <button 
            disabled={!selectedPatient}
            onClick={() => setIsQueueModalOpen(true)}
            className={`px-6 py-1 rounded-sm text-[11px] font-black uppercase tracking-widest transition-all shadow-sm ${selectedPatient ? 'bg-[#17a2b8] text-white hover:bg-[#138496]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
          >
            Queue
          </button>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-[#f8f9fa] border border-gray-200 rounded-sm px-4 py-1.5 flex items-center justify-between text-[12px]">
        <div className="flex items-center gap-2 text-gray-500">
          <i className="fa-solid fa-home text-blue-500"></i>
          <span className="opacity-50">/</span>
          <span className="text-blue-500 cursor-pointer hover:underline">Clinical</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Radiology</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Patients Details Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b flex items-center justify-between bg-[#f8f9fa]">
          <h2 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">
            Patients Details <span onClick={() => setIsPatientDetailsVisible(!isPatientDetailsVisible)} className="text-[12px] font-normal text-gray-400 cursor-pointer lowercase italic">(click here to {isPatientDetailsVisible ? 'hide' : 'show'})</span>
          </h2>
        </div>
        
        {isPatientDetailsVisible && (
          <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-8 bg-[#eef5f6]">
            {/* Left: Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1.5 text-[13px] text-gray-700">
              <DataLine label="OPD No:" value={selectedPatient?.id_number} />
              <DataLine label="Surname:" value={selectedPatient?.surname} />
              <DataLine label="Other Names:" value={selectedPatient?.other_names} />
              <div className="flex items-baseline justify-between border-b border-white/60 pb-0.5 group">
                <span className="font-bold text-gray-700 whitespace-nowrap mr-4 uppercase text-[11px] tracking-tight opacity-70">Age:</span>
                <span className={`font-semibold text-right ${selectedPatient ? 'text-gray-900' : 'text-gray-400 italic'}`}>
                  {selectedPatient ? calculateAge(selectedPatient.dob) : 'yrs mths wks days'}
                </span>
              </div>
              <DataLine label="Sex:" value={selectedPatient?.sex} />
              <DataLine label="Residence:" value={selectedPatient?.residence} />
              <DataLine label="Occupation:" value={selectedPatient?.occupation} />
            </div>

            {/* Right: Queue Table */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-end gap-2 items-center">
                <span className="text-[12px] text-gray-500 font-bold uppercase tracking-tight">Search:</span>
                <input type="text" className="border border-gray-300 rounded px-2 py-0.5 text-[12px] outline-none w-[180px] bg-white shadow-xs focus:ring-1 focus:ring-cyan-500" />
              </div>
              <div className="border border-gray-200 rounded-sm overflow-hidden bg-white shadow-inner max-h-[160px] overflow-y-auto custom-scrollbar">
                <table className="w-full text-left text-[11px] whitespace-nowrap">
                  <thead className="bg-[#f2f2f2] text-gray-600 border-b sticky top-0 z-10 font-black uppercase tracking-tighter">
                    <tr>
                      <th className="px-3 py-2 font-bold border-r">Q. No</th>
                      <th className="px-3 py-2 font-bold border-r">OPD No</th>
                      <th className="px-3 py-2 font-bold border-r">Name</th>
                      <th className="px-3 py-2 font-bold border-r">From</th>
                      <th className="px-3 py-2 font-bold">Mins</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {queueList.length > 0 ? (
                      queueList.map((visit, idx) => (
                        <tr 
                          key={visit.id} 
                          onClick={() => handlePatientSelect(visit)}
                          className={`hover:bg-cyan-50 transition-colors cursor-pointer ${selectedVisit?.id === visit.id ? 'bg-cyan-100 font-black border-l-4 border-cyan-500' : ''}`}
                        >
                          <td className="px-3 py-2 border-r">{(idx + 1).toString().padStart(4, '0')}</td>
                          <td className="px-3 py-2 border-r font-mono">{visit.patients_registry?.id_number}</td>
                          <td className="px-3 py-2 border-r uppercase">{visit.patients_registry?.surname} {visit.patients_registry?.other_names}</td>
                          <td className="px-3 py-2 border-r">{visit.previous_room || '-'}</td>
                          <td className="px-3 py-2 font-black text-blue-600">{Math.floor((currentTime.getTime() - new Date(visit.queued_at).getTime()) / 60000)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-10 text-gray-400 font-medium italic uppercase tracking-widest opacity-40">No patients available in Radiology queue</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Radiology - Examination Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b flex items-center justify-between bg-[#f8f9fa]">
          <h2 className="text-[15px] font-bold text-gray-600 uppercase tracking-tight flex items-center gap-2">
             <i className="fa-solid fa-x-ray text-cyan-600"></i>
             Radiology - Examination
          </h2>
          <div className="relative" ref={actionsRef}>
             <button 
                onClick={() => setIsActionsOpen(!isActionsOpen)}
                className="bg-[#5bc0de] text-white px-4 py-1.5 rounded-sm text-[11px] flex items-center gap-2 hover:bg-[#31b0d5] font-black uppercase tracking-widest shadow-sm transition-all"
              >
              Actions <i className={`fa-solid fa-caret-down text-[9px] transition-transform ${isActionsOpen ? 'rotate-180' : ''}`}></i>
            </button>
            {isActionsOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-2xl rounded-md z-50 py-1 text-[13px] animate-in fade-in zoom-in-95 duration-100">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 flex items-center gap-3">
                   <i className="fa-solid fa-print opacity-50"></i> Print Results
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 flex items-center gap-3">
                   <i className="fa-solid fa-file-pdf opacity-50"></i> Export PDF
                </button>
                <hr className="my-1 border-gray-100" />
                <button 
                  onClick={() => { setIsActionsOpen(false); if (selectedPatient) setIsQueueModalOpen(true); }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-green-700 font-bold flex items-center gap-3"
                >
                   <i className="fa-solid fa-user-clock opacity-50"></i> Queue Patient
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#eef5f6]">
          {/* Requested Examination(s) (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            <label className="text-[12px] font-black text-slate-700 uppercase tracking-widest border-l-4 border-cyan-500 pl-2">Clinical Indication</label>
            <div className="border border-gray-200 rounded p-4 min-h-[300px] bg-white shadow-inner text-[13px] text-gray-600 leading-relaxed font-medium">
               {selectedVisit?.note ? (
                 <div className="whitespace-pre-wrap italic">"{selectedVisit.note}"</div>
               ) : (
                 <div className="text-gray-300 italic">No clinical indications or notes provided with this scan request.</div>
               )}
            </div>
          </div>

          {/* Forms Area (10 cols) */}
          <div className="lg:col-span-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Inputs */}
            <div className="flex flex-col gap-4">
              <label className="text-[12px] font-black text-slate-700 uppercase tracking-widest underline decoration-cyan-500 decoration-4 underline-offset-8 mb-2">Radiological Findings</label>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider">Patient History</label>
                <textarea 
                  value={form.history}
                  onChange={(e) => setForm({...form, history: e.target.value})}
                  placeholder="Summary of medical history relevant to imaging..."
                  className="w-full h-24 border border-gray-300 rounded-lg p-3 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 shadow-sm bg-white font-medium"
                ></textarea>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider">Technique / Procedure</label>
                <textarea 
                  value={form.technique}
                  onChange={(e) => setForm({...form, technique: e.target.value})}
                  placeholder="Equipment used, settings, view angles..."
                  className="w-full h-24 border border-gray-300 rounded-lg p-3 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 shadow-sm bg-white font-medium"
                ></textarea>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider">Observations / Findings</label>
                <textarea 
                  value={form.findings}
                  onChange={(e) => setForm({...form, findings: e.target.value})}
                  placeholder="Detailed anatomical observations..."
                  className="w-full h-32 border border-gray-300 rounded-lg p-3 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 shadow-sm bg-white font-medium"
                ></textarea>
              </div>
            </div>

            {/* Middle Inputs */}
            <div className="flex flex-col gap-4 pt-10">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider">Impression</label>
                <textarea 
                  value={form.impression}
                  onChange={(e) => setForm({...form, impression: e.target.value})}
                  placeholder="Diagnostic conclusion..."
                  className="w-full h-24 border border-gray-300 rounded-lg p-3 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 shadow-sm bg-white font-black text-blue-900"
                ></textarea>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider">General Comment</label>
                <textarea 
                  value={form.comment}
                  onChange={(e) => setForm({...form, comment: e.target.value})}
                  className="w-full h-24 border border-gray-300 rounded-lg p-3 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 shadow-sm bg-white font-medium"
                ></textarea>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider">Radiographer / Examiner</label>
                <input 
                  type="text" 
                  value={form.examiner}
                  onChange={(e) => setForm({...form, examiner: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-3 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 shadow-sm bg-white font-bold" 
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider">Reporting Radiologist</label>
                <input 
                  type="text" 
                  value={form.radiologist}
                  onChange={(e) => setForm({...form, radiologist: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-3 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 shadow-sm bg-white font-bold" 
                />
              </div>
            </div>

            {/* Right Action Column */}
            <div className="flex flex-col gap-4 pt-10">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider">Imaging Centre</label>
                <input 
                  type="text" 
                  value={form.centre}
                  onChange={(e) => setForm({...form, centre: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-3 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 shadow-sm bg-white font-bold" 
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider">Examination Date Time</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={form.date_done}
                    onChange={(e) => setForm({...form, date_done: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-3 text-[13px] outline-none text-green-700 font-black bg-white" 
                  />
                  <i className="fa-solid fa-calendar absolute right-4 top-4 text-gray-400 text-[12px]"></i>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider">Reason (If examination not done)</label>
                <textarea 
                  value={form.reason_not_done}
                  onChange={(e) => setForm({...form, reason_not_done: e.target.value})}
                  className="w-full h-20 border border-gray-300 rounded-lg p-3 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 shadow-sm bg-white font-medium italic"
                ></textarea>
              </div>
              <div className="flex flex-col gap-6 mt-4 p-6 bg-white rounded-xl border border-gray-200 shadow-inner">
                <div className="flex items-center gap-10">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id="is_done" 
                      checked={form.is_done}
                      onChange={(e) => setForm({...form, is_done: e.target.checked})}
                      className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer shadow-sm" 
                    />
                    <label htmlFor="is_done" className="text-[13px] text-gray-700 font-black uppercase tracking-tight">Mark Done</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id="is_internal" 
                      checked={form.is_internal}
                      onChange={(e) => setForm({...form, is_internal: e.target.checked})}
                      className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer shadow-sm" 
                    />
                    <label htmlFor="is_internal" className="text-[13px] text-gray-700 font-black uppercase tracking-tight">Internal Scan</label>
                  </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-gray-100">
                   <button 
                    onClick={handleSave}
                    disabled={saving || !selectedVisit}
                    className={`bg-[#5da54f] text-white px-12 py-3 rounded-md shadow-xl text-[14px] font-black uppercase tracking-[0.15em] transition-all active:scale-95 flex items-center gap-3 ${saving || !selectedVisit ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:bg-[#4d8a41] animate-in slide-in-from-bottom-2'}`}
                  >
                    {saving ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-floppy-disk"></i>}
                    Save Examination
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Patient's Full History Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden mt-4">
        <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between">
          <h2 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">Clinical Diagnostic History</h2>
        </div>
        <div className="p-4">
          <div className="flex gap-2 mb-4">
            <button className="border border-gray-300 bg-white px-5 py-2 text-[11px] font-black text-gray-600 rounded-sm shadow-sm hover:bg-gray-50 uppercase tracking-widest transition-colors">Export EXCEL</button>
            <button className="border border-gray-300 bg-white px-5 py-2 text-[11px] font-black text-gray-600 rounded-sm shadow-sm hover:bg-gray-50 uppercase tracking-widest transition-colors">Print History</button>
          </div>

          <div className="border border-gray-200 rounded-sm overflow-x-auto min-h-[160px] shadow-inner">
            <table className="w-full text-left text-[12px]">
              <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                <tr>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">Visit ID <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">Date of Visit <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                  <th className="px-4 py-2 font-bold text-[#333]">Clinical Note / Indication <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td colSpan={3} className="text-center py-16 text-gray-400 font-black uppercase tracking-[0.3em] opacity-30">Select a patient to view previous encounters</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isQueueModalOpen && selectedPatient && (
        <QueueModal 
          patient={selectedPatient}
          visitId={selectedVisit?.id}
          onClose={() => setIsQueueModalOpen(false)}
          setParentNotification={setShowToast}
          mode="update"
          initialFrom="Radiology"
          onSuccess={handleQueueSuccess}
        />
      )}
    </div>
  );
};

const DataLine: React.FC<{ label: string; value: string; color?: string }> = ({ label, value, color = "text-gray-800" }) => (
  <div className="flex items-baseline justify-between border-b border-white/60 pb-0.5 group hover:bg-white/40 transition-colors">
    <span className="font-bold text-gray-700 whitespace-nowrap mr-4 uppercase text-[10px] tracking-tight opacity-70 group-hover:opacity-100">{label}</span>
    <span className={`font-black text-right truncate ${color}`}>{value || '-'}</span>
  </div>
);
