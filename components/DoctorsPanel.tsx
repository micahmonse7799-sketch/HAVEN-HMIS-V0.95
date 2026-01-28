
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { QueueModal } from './QueueModal';

interface DoctorsPanelProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
  session?: any;
  setSession?: (session: any) => void;
}

const INITIAL_CLINICAL_FORM = {
  complaints: [] as string[],
  hpi: '',
  medical_history: [] as string[],
  surgical_history: [] as string[],
  family_history: [] as string[],
  social_history: [] as string[],
  economic_history: [] as string[],
  allergies: [] as string[],
  impressions: [] as string[],
  diagnosis: [] as string[],
  clinical_summary: ''
};

export const DoctorsPanel: React.FC<DoctorsPanelProps> = ({ 
  onBack, 
  currentRoom, 
  onOpenRoomModal,
  session,
  setSession
}) => {
  const [isPatientDetailsVisible, setIsPatientDetailsVisible] = useState(true);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isQueueModalOpen, setIsQueueModalOpen] = useState(false);
  const [queueList, setQueueList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotification, setShowNotification] = useState<{ visible: boolean; title: string; message: string; type: 'success' | 'error' } | null>(null);
  
  // States that persist via props.session
  const [selectedPatient, setSelectedPatient] = useState<any>(session?.patient || null);
  const [selectedScheme, setSelectedScheme] = useState<any>(session?.scheme || null);
  const [triageData, setTriageData] = useState<any[]>(session?.triage || []);
  const [clinicalForm, setClinicalForm] = useState(session?.form || INITIAL_CLINICAL_FORM);

  // Local/Temporary States
  const [icd10Results, setIcd10Results] = useState<{ id: string; label: string }[]>([]);
  const [isSearchingIcd10, setIsSearchingIcd10] = useState(false);
  const [tempInputs, setTempInputs] = useState<Record<string, string>>({});
  
  const isMounted = useRef(true);
  const actionsRef = useRef<HTMLDivElement>(null);

  // Sync back to session on changes
  useEffect(() => {
    if (setSession) {
      setSession({
        patient: selectedPatient,
        scheme: selectedScheme,
        triage: triageData,
        form: clinicalForm
      });
    }
  }, [selectedPatient, selectedScheme, triageData, clinicalForm]);

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
        .eq('current_room', currentRoom)
        .eq('status', 'Queued for Doctor')
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

  useEffect(() => {
    const term = tempInputs['diagnosis'];
    if (!term || term.length < 2) {
      setIcd10Results([]);
      return;
    }
    const delayDebounceFn = setTimeout(() => performIcd10Search(term), 300);
    return () => clearTimeout(delayDebounceFn);
  }, [tempInputs['diagnosis']]);

  const performIcd10Search = async (term: string) => {
    setIsSearchingIcd10(true);
    try {
      const { data, error } = await supabase
        .from('config_icd10')
        .select('code, description')
        .or(`code.ilike.%${term}%,description.ilike.%${term}%`)
        .limit(10);
      if (error) throw error;
      if (isMounted.current) {
        setIcd10Results((data || []).map(item => ({
          id: item.code,
          label: `${item.code} - ${item.description}`
        })));
      }
    } catch (err: any) {
      if (err.name === 'AbortError' || err.message?.includes('aborted')) return;
      console.warn("ICD-10 Search failed:", err);
    } finally {
      setIsSearchingIcd10(false);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    fetchQueue();
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
  }, [currentRoom]);

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

  const handlePatientSelect = async (visit: any) => {
    setLoading(true);
    try {
      const patientId = visit.patient_id;
      const visitId = visit.id;
      const [schemeRes, triageRes] = await Promise.all([
        supabase.from('patient_schemes').select('*').eq('patient_id', patientId).order('created_at', { ascending: false }).limit(1).single(),
        supabase.from('clinical_examinations').select('*').eq('visit_id', visitId)
      ]);
      if (isMounted.current) {
        setSelectedPatient({ 
          ...visit.patients_registry, 
          visit_id: visitId,
          nursing_notes: visit.nursing_notes
        });
        setSelectedScheme(schemeRes.data || null);
        setTriageData(triageRes.data || []);
        setClinicalForm(INITIAL_CLINICAL_FORM);
      }
    } catch (err: any) {
      if (err.name === 'AbortError' || err.message?.includes('aborted')) return;
      console.error('Details Fetch failed:', err.message);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  const addItem = (field: keyof typeof INITIAL_CLINICAL_FORM) => {
    const val = tempInputs[field as string]?.trim();
    if (!val) return;
    setClinicalForm(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), val]
    }));
    setTempInputs(prev => ({ ...prev, [field]: '' }));
    if (field === 'diagnosis') setIcd10Results([]);
  };

  const addIcd10Selection = (label: string) => {
    setClinicalForm(prev => ({
      ...prev,
      diagnosis: [...prev.diagnosis, label]
    }));
    setTempInputs(prev => ({ ...prev, diagnosis: '' }));
    setIcd10Results([]);
  };

  const removeItem = (field: keyof typeof INITIAL_CLINICAL_FORM, index: number) => {
    setClinicalForm(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  const handleMarkAsSeen = async () => {
    const vId = selectedPatient?.visit_id;
    if (!vId) return;
    try {
      const { error } = await supabase.from('patient_visits').update({ status: 'Completed', queue_status: 'Completed' }).eq('id', vId);
      if (error) throw error;
      setShowNotification({ visible: true, title: 'PATIENT SEEN', message: 'The patient encounter has been marked as seen.', type: 'success' });
      handleQueueSuccess(); // Shared cleanup logic
      setIsActionsOpen(false);
    } catch (err: any) {
      if (err.name === 'AbortError' || err.message?.includes('aborted')) return;
      alert("Error marking as seen: " + err.message);
    }
  };

  const handleSaveConsultation = async () => {
    const vId = selectedPatient?.visit_id;
    const pId = selectedPatient?.id;
    if (!vId || !pId) {
      setShowNotification({ visible: true, title: 'NO PATIENT SELECTED', message: 'Please select a patient from the queue.', type: 'error' });
      return;
    }
    setSaving(true);
    try {
      const { error: recordError } = await supabase
        .from('consultation_records')
        .upsert({
          visit_id: vId,
          patient_id: pId,
          complaints: clinicalForm.complaints,
          hpi: clinicalForm.hpi,
          medical_history: clinicalForm.medical_history,
          surgical_history: clinicalForm.surgical_history,
          family_history: clinicalForm.family_history,
          social_history: clinicalForm.social_history,
          economic_history: clinicalForm.economic_history,
          allergies: clinicalForm.allergies,
          impressions: clinicalForm.impressions,
          diagnosis: clinicalForm.diagnosis,
          clinical_summary: clinicalForm.clinical_summary,
          created_at: new Date().toISOString()
        }, { onConflict: 'visit_id' });
      if (recordError) throw recordError;
      setShowNotification({ 
        visible: true, 
        title: 'SUCCESS', 
        message: 'Consultation data saved successfully.', 
        type: 'success' 
      });
      setTimeout(() => { if(isMounted.current) setShowNotification(null); }, 4000);
    } catch (err: any) {
      if (err.name === 'AbortError' || err.message?.includes('aborted')) return;
      console.error("Save Error:", err);
      setShowNotification({ visible: true, title: 'SAVE FAILED', message: err.message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleQueueSuccess = () => {
    // 1. Clear Form State
    setClinicalForm(INITIAL_CLINICAL_FORM);
    // 2. Clear Details Section
    setSelectedPatient(null);
    setSelectedScheme(null);
    setTriageData([]);
    // 3. Clear App Persistence State
    if (setSession) setSession(null);
    // 4. Refresh left-hand queue
    fetchQueue();
  };

  const vitals = triageData.filter(d => d.exam_type === 'General');

  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-10 relative">
      {showNotification?.visible && (
        <div className="fixed top-24 right-10 z-[5000] animate-in slide-in-from-right duration-500">
          <div className={`${showNotification.type === 'success' ? 'bg-[#5da54f]' : 'bg-[#e51c44]'} text-white px-6 py-4 rounded-sm shadow-2xl flex items-center gap-5 min-w-[380px] border-l-[10px] border-black/10`}>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <i className={`fa-solid ${showNotification.type === 'success' ? 'fa-check-circle' : 'fa-triangle-exclamation'} text-2xl`}></i>
            </div>
            <div className="flex-1">
              <div className="font-black text-[15px] uppercase tracking-wider mb-0.5">{showNotification.title}</div>
              <div className="text-[13px] font-medium opacity-90 leading-tight">{showNotification.message}</div>
            </div>
            <button onClick={() => setShowNotification(null)} className="text-white/40 hover:text-white transition-colors self-start mt-1">
               <i className="fa-solid fa-times text-lg"></i>
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-sm h-10 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <i onClick={onBack} className="fa-solid fa-times text-gray-400 cursor-pointer hover:text-gray-600 text-xs"></i>
          <h1 className="text-gray-700 font-semibold text-[14px]">Haven MIS</h1>
        </div>
        <div className="flex items-center gap-8 text-[13px] text-gray-500">
          <div>Branch: <span className="text-[#43939e] font-bold">Main branch</span></div>
          <div>Room: <span onClick={onOpenRoomModal} className="text-[#43939e] cursor-pointer hover:underline font-bold">{currentRoom}</span></div>
          <button onClick={fetchQueue} className="bg-[#17a2b8] text-white px-4 py-1 rounded-sm text-[11px] hover:bg-[#138496] transition-colors font-bold uppercase tracking-tight">
            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Refresh Queue'}
          </button>
        </div>
      </div>

      <div className="bg-[#f8f9fa] border border-gray-200 rounded-sm px-4 py-1.5 flex items-center justify-between text-[12px]">
        <div className="flex items-center gap-2 text-gray-500">
          <i className="fa-solid fa-home text-blue-500"></i>
          <span className="opacity-50">/</span>
          <span className="text-blue-500 cursor-pointer hover:underline">Clinical</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Consultation</span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b flex items-center justify-between bg-[#f8f9fa]">
          <h2 className="text-[14px] font-medium text-gray-600 uppercase tracking-tight">
            Patients Details <span onClick={() => setIsPatientDetailsVisible(!isPatientDetailsVisible)} className="text-[12px] font-normal text-gray-400 cursor-pointer italic">(click here to {isPatientDetailsVisible ? 'hide' : 'show'})</span>
          </h2>
        </div>
        {isPatientDetailsVisible && (
          <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-8 bg-[#eef5f6]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1.5 text-[13px] text-gray-700">
              <DataLine label="OPD No:" value={selectedPatient?.id_number} />
              <DataLine label="Surname:" value={selectedPatient?.surname} />
              <DataLine label="Othernames:" value={selectedPatient?.other_names} />
              <DataLine label="Age:" value={calculateAge(selectedPatient?.dob)} />
              <DataLine label="Sex:" value={selectedPatient?.sex} />
              <DataLine label="Residence:" value={selectedPatient?.residence} />
              <DataLine label="Occupation:" value={selectedPatient?.occupation} />
              <DataLine label="Scheme:" value={selectedScheme?.scheme_name || "Cash Payers"} color="text-blue-600" />
              <div className="md:col-span-2">
                <DataLine label="Note:" value={selectedPatient?.nursing_notes || selectedPatient?.notes} color="text-orange-500" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-end gap-2 items-center">
                <span className="text-[12px] text-gray-500 font-black uppercase tracking-tighter">Search Queue:</span>
                <input type="text" className="border border-gray-300 rounded px-2 py-0.5 text-[12px] outline-none w-[180px] shadow-sm" />
              </div>
              <div className="border border-gray-200 rounded-sm overflow-hidden bg-white shadow-inner max-h-[180px] overflow-y-auto custom-scrollbar">
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
                          className={`hover:bg-cyan-50 transition-colors cursor-pointer ${selectedPatient?.visit_id === visit.id ? 'bg-cyan-100 font-bold border-l-4 border-cyan-500' : ''}`}
                        >
                          <td className="px-3 py-2 border-r">{idx + 1}</td>
                          <td className="px-3 py-2 border-r font-mono">{visit.patients_registry?.id_number || '-'}</td>
                          <td className="px-3 py-2 border-r uppercase">{visit.patients_registry?.surname} {visit.patients_registry?.other_names}</td>
                          <td className="px-3 py-2 border-r">{visit.previous_room || '-'}</td>
                          <td className="px-3 py-2 font-bold">{Math.floor((currentTime.getTime() - new Date(visit.queued_at).getTime()) / 60000)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-10 text-gray-400 italic font-medium uppercase tracking-widest opacity-40">No active patients in your room queue</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-[#eef5f6] border border-gray-200 px-4 py-3 flex flex-col gap-2 shadow-inner">
         <div className="flex items-center justify-center gap-1.5 text-[12px] font-bold text-[#4a4a7d] uppercase tracking-widest border-b border-gray-300/40 pb-2 mb-1">
            <i className="fa-solid fa-stethoscope text-cyan-600"></i>
            <span>Patient Vitals SNAPSHOT</span>
         </div>
         <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[14px]">
            {vitals.length > 0 ? (
                vitals.map((v, i) => (
                    <div key={i} className="flex gap-2 items-baseline border-r border-gray-300 pr-8 last:border-0 last:pr-0">
                        <span className="font-bold text-gray-600 uppercase text-[11px] tracking-tight">{v.parameter_name}:</span>
                        <span className={`font-black tracking-tight ${v.is_critical ? 'text-red-600 animate-pulse' : 'text-blue-700'}`}>{v.finding}</span>
                    </div>
                ))
            ) : (
                <span className="text-gray-400 italic text-[12px] font-medium opacity-60">No vital readings retrieved for this encounter</span>
            )}
         </div>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2 border-b flex items-center justify-between bg-[#f8f9fa]">
          <h2 className="text-[14px] font-medium text-gray-600 uppercase tracking-tight">Clinical Panel</h2>
          <div className="relative" ref={actionsRef}>
            <button 
              onClick={() => setIsActionsOpen(!isActionsOpen)}
              className="bg-[#17a2b8] text-white px-4 py-1.5 rounded-sm text-[12px] flex items-center gap-2 font-bold shadow-md hover:bg-[#138496] transition-all"
            >
              Actions <i className={`fa-solid fa-caret-down text-[10px]} transition-transform ${isActionsOpen ? 'rotate-180' : ''}`}></i>
            </button>
            {isActionsOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.15)] rounded-md z-[100] py-1 text-[13px] animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
                <DropdownItem label="Request Lab" onClick={() => setIsActionsOpen(false)} className="text-blue-700 font-bold" />
                <DropdownItem label="Prescription" onClick={() => setIsActionsOpen(false)} className="text-blue-700 font-bold" />
                <DropdownItem label="Mark as Seen" onClick={handleMarkAsSeen} className="text-green-800 font-black border-t border-gray-100 bg-green-50/50" />
                <hr className="my-1 border-gray-100" />
                <DropdownItem label="Physical Examination" onClick={() => setIsActionsOpen(false)} />
                <DropdownItem label="Radiology Request" onClick={() => setIsActionsOpen(false)} />
                <DropdownItem label="Admit Patient" onClick={() => setIsActionsOpen(false)} />
                <DropdownItem label="Queue Patient" onClick={() => { setIsActionsOpen(false); if (selectedPatient) setIsQueueModalOpen(true); }} className="text-green-700 font-bold" />
              </div>
            )}
          </div>
        </div>
        <div className="p-4 flex flex-col gap-6 bg-[#eef5f6]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PanelInputList label="Complaints" placeholder="Primary Patient complaint" items={clinicalForm.complaints} onAdd={() => addItem('complaints')} onRemove={(idx) => removeItem('complaints', idx)} value={tempInputs['complaints'] || ''} onChange={(v) => setTempInputs(p => ({ ...p, complaints: v }))} />
            <PanelTextAreaSection label="History of Presenting Illness" value={clinicalForm.hpi} onChange={(v) => setClinicalForm(p => ({ ...p, hpi: v }))} placeholder="Detailed symptom progression..." />
            <PanelInputList label="Medical History" placeholder="Chronic conditions..." items={clinicalForm.medical_history} onAdd={() => addItem('medical_history')} onRemove={(idx) => removeItem('medical_history', idx)} value={tempInputs['medical_history'] || ''} onChange={(v) => setTempInputs(p => ({ ...p, medical_history: v }))} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PanelInputList label="Surgical History" placeholder="Previous operations..." items={clinicalForm.surgical_history} onAdd={() => addItem('surgical_history')} onRemove={(idx) => removeItem('surgical_history', idx)} value={tempInputs['surgical_history'] || ''} onChange={(v) => setTempInputs(p => ({ ...p, surgical_history: v }))} />
            <PanelInputList label="Family History" placeholder="Genetic conditions..." items={clinicalForm.family_history} onAdd={() => addItem('family_history')} onRemove={(idx) => removeItem('family_history', idx)} value={tempInputs['family_history'] || ''} onChange={(v) => setTempInputs(p => ({ ...p, family_history: v }))} />
            <PanelInputList label="Social History" placeholder="Lifestyle factors..." items={clinicalForm.social_history} onAdd={() => addItem('social_history')} onRemove={(idx) => removeItem('social_history', idx)} value={tempInputs['social_history'] || ''} onChange={(v) => setTempInputs(p => ({ ...p, social_history: v }))} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PanelInputList label="Economic History" placeholder="Employment/Living status..." items={clinicalForm.economic_history} onAdd={() => addItem('economic_history')} onRemove={(idx) => removeItem('economic_history', idx)} value={tempInputs['economic_history'] || ''} onChange={(v) => setTempInputs(p => ({ ...p, economic_history: v }))} />
            <PanelInputList label="Allergies" placeholder="Drug/Food reactions..." items={clinicalForm.allergies} onAdd={() => addItem('allergies')} onRemove={(idx) => removeItem('allergies', idx)} value={tempInputs['allergies'] || ''} onChange={(v) => setTempInputs(p => ({ ...p, allergies: v }))} />
            <PanelInputList label="Impressions" placeholder="Clinical impressions..." items={clinicalForm.impressions} onAdd={() => addItem('impressions')} onRemove={(idx) => removeItem('impressions', idx)} value={tempInputs['impressions'] || ''} onChange={(v) => setTempInputs(p => ({ ...p, impressions: v }))} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2">
              <PanelInputList label="Diagnosis" placeholder="Enter diagnosis / Select ICD 10 from list..." items={clinicalForm.diagnosis} onAdd={() => addItem('diagnosis')} onRemove={(idx) => removeItem('diagnosis', idx)} value={tempInputs['diagnosis'] || ''} onChange={(v) => setTempInputs(p => ({ ...p, diagnosis: v }))} results={icd10Results} onSelectResult={addIcd10Selection} isSearching={isSearchingIcd10} />
            </div>
            <PanelTextAreaSection label="Clinical Summary" value={clinicalForm.clinical_summary} onChange={(v) => setClinicalForm(p => ({ ...p, clinical_summary: v }))} placeholder="Concise overview..." />
          </div>
          <div className="flex justify-end pt-4 border-t border-gray-200">
             <button 
               onClick={handleSaveConsultation}
               disabled={saving || !selectedPatient}
               className={`bg-[#5da54f] text-white px-12 py-3 rounded shadow-lg font-black uppercase tracking-[0.1em] hover:bg-[#4d8a41] transition-all active:scale-95 flex items-center gap-3 ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
             >
                {saving ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-save"></i>}
                Save Consultation
             </button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b bg-[#f8f9fa]">
          <h2 className="text-[14px] font-medium text-gray-600 uppercase tracking-tight">Clinical Encounter History</h2>
        </div>
        <div className="p-4 bg-white">
          <div className="border border-gray-200 rounded-sm overflow-hidden bg-white shadow-inner">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#f2f2f2] text-gray-600 border-b">
                <tr>
                  <th className="px-4 py-2 font-bold border-r">Visit Id</th>
                  <th className="px-4 py-2 font-bold border-r">Date of Visit</th>
                  <th className="px-4 py-2 font-bold">Summary Report</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                <tr className="border-b">
                  <td colSpan={3} className="text-center py-10 italic">Patient encounter history will manifest upon selection from queue</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isQueueModalOpen && selectedPatient && (
        <QueueModal 
          patient={selectedPatient}
          visitId={selectedPatient.visit_id}
          onClose={() => setIsQueueModalOpen(false)}
          setParentNotification={setShowNotification}
          mode="update"
          initialFrom={currentRoom}
          onSuccess={handleQueueSuccess}
        />
      )}
    </div>
  );
};

const DataLine: React.FC<{ label: string; value: any; color?: string }> = ({ label, value, color = "text-gray-900" }) => (
  <div className="flex gap-2 justify-between border-b border-white/40 pb-0.5 group">
    <span className="font-bold text-[11px] w-[110px] uppercase tracking-tighter opacity-70 group-hover:opacity-100 transition-opacity whitespace-nowrap">{label}</span>
    <span className={`font-semibold text-right truncate ${color}`}>{value || '-'}</span>
  </div>
);

const DropdownItem: React.FC<{ label: string; onClick: () => void; className?: string }> = ({ label, onClick, className = "" }) => (
  <div onClick={onClick} className={`px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors ${className}`}>{label}</div>
);

const PanelInputList: React.FC<{
  label: string;
  placeholder: string;
  items: string[];
  onAdd: () => void;
  onRemove: (idx: number) => void;
  value: string;
  onChange: (v: string) => void;
  results?: { id: string; label: string }[];
  onSelectResult?: (label: string) => void;
  isSearching?: boolean;
}> = ({ label, placeholder, items, onAdd, onRemove, value, onChange, results, onSelectResult, isSearching }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[12px] font-black text-slate-700 uppercase tracking-widest">{label}</label>
    <div className="flex gap-1 relative">
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && onAdd()} placeholder={placeholder} className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white" />
      <button onClick={onAdd} className="bg-cyan-600 text-white w-8 h-8 rounded flex items-center justify-center hover:bg-cyan-700 shadow-sm transition-all active:scale-90"><i className="fa-solid fa-plus text-xs"></i></button>
      {results && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-xl z-50 rounded-md py-1 max-h-[200px] overflow-y-auto custom-scrollbar">
          {results.map((res) => (
            <div key={res.id} onClick={() => onSelectResult?.(res.label)} className="px-4 py-2 text-[12px] hover:bg-cyan-50 cursor-pointer border-b border-gray-50 last:border-0">
              <span className="font-bold text-cyan-700">{res.id}</span> - {res.label.split(' - ')[1]}
            </div>
          ))}
        </div>
      )}
      {isSearching && (
        <div className="absolute right-10 top-1/2 -translate-y-1/2">
          <i className="fa-solid fa-spinner fa-spin text-cyan-600 text-xs"></i>
        </div>
      )}
    </div>
    <div className="flex flex-wrap gap-2 mt-1">
      {items.map((item, idx) => (
        <div key={idx} className="bg-white border border-cyan-100 text-cyan-800 text-[11px] px-3 py-1 rounded-full font-bold flex items-center gap-2 shadow-sm animate-in zoom-in-95">
          <span className="max-w-[200px] truncate">{item}</span>
          <i onClick={() => onRemove(idx)} className="fa-solid fa-times text-[9px] text-cyan-300 hover:text-rose-500 cursor-pointer"></i>
        </div>
      ))}
      {items.length === 0 && <span className="text-[11px] text-gray-400 italic">No entries added</span>}
    </div>
  </div>
);

const PanelTextAreaSection: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}> = ({ label, value, onChange, placeholder }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[12px] font-black text-slate-700 uppercase tracking-widest">{label}</label>
    <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full h-[100px] border border-gray-300 rounded px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 resize-none shadow-inner bg-white font-medium"></textarea>
  </div>
);
