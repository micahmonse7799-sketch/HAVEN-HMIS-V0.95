
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { QueueModal } from './QueueModal';

interface TriageProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const Triage: React.FC<TriageProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [loading, setLoading] = useState(false);
  const [isPatientDetailsVisible, setIsPatientDetailsVisible] = useState(true);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isQueueModalOpen, setIsQueueModalOpen] = useState(false);
  const [queueList, setQueueList] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [selectedScheme, setSelectedScheme] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showToast, setShowToast] = useState<{ visible: boolean; title: string; message: string; type: 'success' | 'error' } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(true);

  // Dynamic Scales from Database
  const [suggestedRemarks, setSuggestedRemarks] = useState<string[]>([]);

  // Form State for Triage Data
  const [generalExams, setGeneralExams] = useState<any[]>([]);
  const [systemicExams, setSystemicExams] = useState<any[]>([]);
  const [procedures, setProcedures] = useState<string[]>([]);
  const [nursingNotes, setNursingNotes] = useState('');

  // Input States
  const [vitalInput, setVitalInput] = useState({ name: '', remark: '', units: '' });
  const [systemicInput, setSystemicInput] = useState({ system: '', remark: '', anomalous: false });
  const [procedureInput, setProcedureInput] = useState('');

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
        .eq('current_room', 'Triage')
        .eq('status', 'Active')
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
    isMounted.current = true;
    fetchQueue();
    
    const pollInterval = setInterval(fetchQueue, 30000);
    const timeInterval = setInterval(() => {
      if (isMounted.current) setCurrentTime(new Date());
    }, 10000);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

  useEffect(() => {
    if (vitalInput.name) {
      fetchVitalScales(vitalInput.name);
    } else {
      setSuggestedRemarks([]);
    }
  }, [vitalInput.name]);

  const fetchVitalScales = async (vitalName: string) => {
    try {
      const { data, error } = await supabase
        .from('vitals_scales')
        .select('suggested_value')
        .eq('vital_name', vitalName);
      
      if (error) {
        if (error.message?.includes('aborted')) return;
        throw error;
      }
      
      if (isMounted.current && data) {
        setSuggestedRemarks(data.map(d => d.suggested_value).filter(Boolean));
      }
    } catch (err: any) {
      if (err.name === 'AbortError' || err.message?.includes('aborted')) return;
      console.error('Error fetching scales:', err.message);
    }
  };

  const calculateAge = (dob: string) => {
    if (!dob) return "-";
    const birthDate = new Date(dob);
    const today = new Date();
    if (isNaN(birthDate.getTime())) return "-";
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      years--;
      months += 12;
    }
    return `${years} (yrs) ${months} (mths)`;
  };

  const handlePatientSelect = async (visit: any) => {
    setLoading(true);
    try {
      const patientId = visit.patient_id;
      const registryPromise = supabase.from('patients_registry').select('*').eq('id', patientId).single();
      const schemePromise = supabase.from('patient_schemes').select('*').eq('patient_id', patientId).order('created_at', { ascending: false }).limit(1);

      const [regRes, schemeRes] = await Promise.all([registryPromise, schemePromise]);
      if (regRes.error) throw regRes.error;
      
      if (isMounted.current) {
        setSelectedPatient({ ...regRes.data, visit_id: visit.id, is_emergency: visit.is_emergency });
        setSelectedScheme(schemeRes.data?.[0] || null);
        
        // Clear previous work for new patient
        setGeneralExams([]);
        setSystemicExams([]);
        setProcedures([]);
        setNursingNotes('');
      }
    } catch (err: any) {
      if (err.name === 'AbortError' || err.message?.includes('aborted')) return;
      console.error('Fetch failed:', err.message);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  const isCriticalValue = (name: string, remark: string) => {
    const val = parseFloat(remark);
    if (isNaN(val)) return false;
    
    if (name === 'Temperature' || name === 'Temp') return val > 38 || val < 35;
    if (name === 'SPO2') return val < 92;
    if (name === 'Pulse Rate' || name === 'Pulse' || name === 'Heart Rate BpM') return val > 100 || val < 60;
    if (name === 'Random Blood Sugar' || name === 'Blood Sugar') return val > 11 || val < 3.9;
    if (name === 'Body mass index (BMI)' || name === 'BMI') return val > 30 || val < 18.5;
    if (name === 'Blood Pressure' || name === 'BP' || name === 'Blood pressure') {
        const parts = remark.split('/');
        if (parts.length === 2) {
            const sys = parseFloat(parts[0]);
            const dia = parseFloat(parts[1]);
            return sys > 140 || dia > 90;
        }
    }
    return false;
  };

  const handleAddGeneralExam = () => {
    if (!vitalInput.name || !vitalInput.remark) return;
    
    const newEntry = { 
        name: vitalInput.name, 
        remark: vitalInput.remark, 
        isCritical: isCriticalValue(vitalInput.name, vitalInput.remark) 
    };
    
    const updatedExams = [...generalExams, newEntry];
    
    // BMI Auto-calculation
    const weightEntry = updatedExams.find(e => e.name === 'Weight');
    const heightEntry = updatedExams.find(e => e.name === 'Height');
    
    if (weightEntry && heightEntry) {
        const weight = parseFloat(weightEntry.remark);
        const heightMeters = parseFloat(heightEntry.remark) / 100;
        if (weight > 0 && heightMeters > 0) {
            const bmi = (weight / (heightMeters * heightMeters)).toFixed(1);
            const bmiLabel = 'Body mass index (BMI)';
            const existingBmiIdx = updatedExams.findIndex(e => e.name === bmiLabel);
            const bmiEntry = { name: bmiLabel, remark: bmi, isCritical: parseFloat(bmi) > 30 || parseFloat(bmi) < 18.5 };
            if (existingBmiIdx > -1) {
                updatedExams[existingBmiIdx] = bmiEntry;
            } else {
                updatedExams.push(bmiEntry);
            }
        }
    }

    setGeneralExams(updatedExams);
    setVitalInput({ name: '', remark: '', units: '' });
  };

  const handleAddSystemicExam = () => {
    if (!systemicInput.system || !systemicInput.remark) return;
    setSystemicExams([...systemicExams, { ...systemicInput }]);
    setSystemicInput({ system: '', remark: '', anomalous: false });
  };

  const handleAddProcedure = () => {
    if (!procedureInput) return;
    setProcedures([...procedures, procedureInput]);
    setProcedureInput('');
  };

  const handleSaveTriage = async () => {
    if (!selectedPatient) {
      alert("Please select a patient from the queue first.");
      return;
    }
    setLoading(true);
    try {
      // 1. Data Mapping: clinical_examinations
      const examData = [
          ...generalExams.map(e => ({
              visit_id: selectedPatient.visit_id,
              exam_type: 'General',
              parameter_name: e.name,
              finding: e.remark, // Map Remark to finding
              is_critical: e.isCritical
          })),
          ...systemicExams.map(e => ({
              visit_id: selectedPatient.visit_id,
              exam_type: 'Systemic',
              body_system: e.system, // Save Body System
              parameter_name: e.system,
              finding: e.remark, // Map Remark to finding
              is_anomalous: e.anomalous
          }))
      ];

      // 2. Map Required Procedures to patient_procedures table
      const procedureData = procedures.map(p => ({
          visit_id: selectedPatient.visit_id,
          procedure_name: p
      }));

      // Group all DB operations
      const dbOperations = [];

      if (examData.length > 0) {
          dbOperations.push(supabase.from('clinical_examinations').insert(examData));
      }

      if (procedureData.length > 0) {
          dbOperations.push(supabase.from('patient_procedures').insert(procedureData));
      }

      // 3. Nursing Clinical Notes saved to patient_visits table
      dbOperations.push(supabase
        .from('patient_visits')
        .update({ nursing_notes: nursingNotes })
        .eq('id', selectedPatient.visit_id)
      );

      const results = await Promise.all(dbOperations);
      const errors = results.filter(r => r.error).map(r => r.error?.message);
      
      if (errors.length > 0) {
        throw new Error(errors.join(', '));
      }

      // 4. Success Workflow
      setShowToast({ 
          visible: true, 
          title: 'Saved Successfully', 
          message: 'Clinical Examination Saved Successfully.', 
          type: 'success' 
      });

      // Clear the examination forms as requested so nurse can click Queue next
      setGeneralExams([]);
      setSystemicExams([]);
      setProcedures([]);
      setNursingNotes('');
      
      setTimeout(() => { if (isMounted.current) setShowToast(null); }, 5000);
    } catch (err: any) {
      if (err.name === 'AbortError' || err.message?.includes('aborted')) return;
      console.error("Save failed:", err.message);
      setShowToast({ 
          visible: true, 
          title: 'Save Failed', 
          message: err.message, 
          type: 'error' 
      });
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  const handleQueueSuccess = (targetRoom: string) => {
    // Reset selection only after successful moving to next room
    setSelectedPatient(null);
    setSelectedScheme(null);
    fetchQueue(); 
  };

  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-10 relative">
      {showToast?.visible && (
        <div className="fixed top-20 right-10 z-[5000] animate-in slide-in-from-right duration-500">
          <div className={`${showToast.type === 'success' ? 'bg-[#5da54f]' : 'bg-rose-600'} text-white px-6 py-4 rounded shadow-2xl flex items-center gap-4 border border-white/20 min-w-[320px]`}>
             <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <i className={`fa-solid ${showToast.type === 'success' ? 'fa-check-circle' : 'fa-triangle-exclamation'} text-xl`}></i>
             </div>
             <div className="flex-1">
                <span className="font-bold text-[14px] uppercase tracking-wide block">{showToast.title}</span>
                <span className="text-[12px] opacity-90">{showToast.message}</span>
             </div>
             <button onClick={() => setShowToast(null)} className="text-white/50 hover:text-white transition-colors">
                <i className="fa-solid fa-times"></i>
             </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-sm h-10 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <i onClick={onBack} className="fa-solid fa-times text-gray-400 cursor-pointer hover:text-gray-600 text-xs"></i>
          <h1 className="text-gray-700 font-semibold text-[14px]">Haven MIS</h1>
        </div>
        <div className="flex items-center gap-8 text-[13px] text-gray-500">
          <div>Branch: <span className="text-[#43939e] cursor-pointer hover:underline">Main branch</span></div>
          <div>Room: <span onClick={onOpenRoomModal} className="text-[#43939e] cursor-pointer hover:underline">{currentRoom}</span></div>
          <button onClick={fetchQueue} className="bg-[#17a2b8] text-white px-4 py-1 rounded-sm text-[11px] font-medium hover:bg-[#138496]">
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
          <span className="text-gray-400 font-medium">Triage</span>
        </div>
      </div>

      {/* Patient Details Panel */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden transition-all duration-300">
        <div className="px-4 py-1.5 border-b flex items-center justify-between bg-[#f8f9fa]">
          <h2 className="text-[14px] font-medium text-gray-600 uppercase tracking-tight">
            Patients Details <span onClick={() => setIsPatientDetailsVisible(!isPatientDetailsVisible)} className="text-[12px] font-normal text-gray-400 cursor-pointer italic">(click here to {isPatientDetailsVisible ? 'hide' : 'show'})</span>
          </h2>
        </div>
        
        {isPatientDetailsVisible && (
          <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#eef5f6]">
            <div className="lg:col-span-4 grid grid-cols-1 gap-y-1 text-[13px] text-gray-700">
              <MetadataLine label="OPD No:" value={selectedPatient?.id_number} />
              <MetadataLine label="Surname:" value={selectedPatient?.surname} />
              <MetadataLine label="Othernames:" value={selectedPatient?.other_names} />
              <MetadataLine label="Age:" value={calculateAge(selectedPatient?.dob)} />
              <MetadataLine label="Sex:" value={selectedPatient?.sex} />
              <MetadataLine label="Residence:" value={selectedPatient?.residence} />
              <MetadataLine label="Occupation:" value={selectedPatient?.occupation} />
              <MetadataLine label="Scheme:" value={selectedScheme?.scheme_name || "Cash Payers"} color="text-blue-600" />
              <MetadataLine label="Rem. Credit:" value="0.00" color="text-red-600" />
              <MetadataLine label="Note:" value={selectedScheme?.notes || selectedPatient?.notes} color="text-orange-500" />
            </div>

            <div className="lg:col-span-8 flex flex-col gap-2">
              <div className="flex justify-end gap-2 items-center">
                <span className="text-[12px] text-gray-500">Search:</span>
                <input type="text" className="border border-gray-300 rounded-sm px-2 py-0.5 text-[12px] outline-none w-[200px]" />
              </div>
              <div className="border border-gray-200 rounded-sm overflow-y-auto custom-scrollbar shadow-inner bg-white max-h-[220px]">
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
                          className={`hover:bg-cyan-50 transition-colors cursor-pointer ${selectedPatient?.visit_id === visit.id ? 'bg-cyan-100 font-bold border-l-4 border-cyan-500' : ''} ${visit.is_emergency ? 'bg-rose-50 text-rose-700' : ''}`}
                        >
                          <td className="px-3 py-2 border-r">{idx + 1}</td>
                          <td className="px-3 py-2 border-r font-mono">{visit.patients_registry?.id_number || '-'}</td>
                          <td className="px-3 py-2 border-r uppercase">{visit.patients_registry?.surname} {visit.patients_registry?.other_names}</td>
                          <td className="px-3 py-2 border-r">{visit.previous_room || '-'}</td>
                          <td className="px-3 py-2 font-bold">{Math.floor((new Date().getTime() - new Date(visit.queued_at).getTime()) / 60000)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-10 text-gray-500 italic">No patients currently in Triage queue</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Triage Workspace Container */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden flex flex-col">
        <div className="px-4 py-1.5 border-b bg-[#f8f9fa] flex items-center justify-between">
          <h2 className="text-[14px] font-medium text-gray-600">Triage Workspace</h2>
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsActionsOpen(!isActionsOpen)}
              className="bg-[#17a2b8] text-white px-3 py-1 rounded-sm text-[12px] flex items-center gap-2 hover:bg-[#138496] font-bold shadow-sm"
            >
              Actions <i className={`fa-solid fa-chevron-down text-[10px] ${isActionsOpen ? 'rotate-180' : ''} transition-transform`}></i>
            </button>
            {isActionsOpen && (
              <div className="absolute right-0 mt-1 w-64 bg-white border border-gray-200 shadow-xl z-[500] rounded-sm py-1 animate-in fade-in zoom-in-95 duration-100">
                <div 
                    onClick={() => { setIsActionsOpen(false); setIsQueueModalOpen(true); }}
                    className="px-4 py-2 text-[13px] hover:bg-gray-100 cursor-pointer text-green-700 font-bold border-b border-gray-50 flex items-center gap-3"
                >
                    <i className="fa-solid fa-user-clock opacity-60"></i> Queue Patient
                </div>
                <div className="px-4 py-2 text-[13px] hover:bg-gray-100 cursor-pointer text-gray-700 flex items-center gap-3">
                    <i className="fa-solid fa-file-medical opacity-60"></i> View Report
                </div>
                <hr className="my-1 border-gray-100" />
                <div 
                    onClick={() => { 
                        setIsActionsOpen(false); 
                        setGeneralExams([]); 
                        setSystemicExams([]); 
                        setProcedures([]); 
                        setNursingNotes(''); 
                    }}
                    className="px-4 py-2 text-[13px] hover:bg-gray-100 cursor-pointer text-gray-700 flex items-center gap-3"
                >
                    <i className="fa-solid fa-eraser opacity-60"></i> Clear Form
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 bg-[#eef5f6] flex flex-col gap-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4">
              <div className="flex flex-col gap-2">
                 <h3 className="text-[13px] font-bold text-gray-700 underline decoration-gray-400">General Examination</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <div className="flex flex-col gap-1">
                       <label className="text-[11px] font-bold text-gray-600 uppercase">Vital Parameter</label>
                       <select 
                         value={vitalInput.name}
                         onChange={(e) => setVitalInput({...vitalInput, name: e.target.value})}
                         className="border border-gray-300 rounded-lg px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500"
                       >
                          <option value=""></option>
                          <option value="Temperature">Temperature</option>
                          <option value="Blood Pressure">Blood Pressure</option>
                          <option value="Weight">Weight</option>
                          <option value="Height">Height</option>
                          <option value="Body mass index (BMI)">Body mass index (BMI)</option>
                          <option value="Respiration Rate">Respiration Rate</option>
                          <option value="Pulse Rate">Pulse Rate</option>
                          <option value="SPO2">SPO2</option>
                          <option value="plasma level">plasma level</option>
                          <option value="Body Surface Area (BSA)">Body Surface Area (BSA)</option>
                          <option value="HIV Screening">HIV Screening</option>
                          <option value="TB SCREENING">TB SCREENING</option>
                          <option value="Blood Sugar">Blood Sugar</option>
                          <option value="BP">BP</option>
                          <option value="Random Blood Sugar">Random Blood Sugar</option>
                          <option value="6 MWT">6 MWT</option>
                       </select>
                    </div>
                    <div className="flex flex-col gap-1">
                       <label className="text-[11px] font-bold text-gray-600 uppercase">Observation/Remark</label>
                       <div className="flex gap-1 items-center">
                          <div className="flex-1 relative">
                            <input 
                                type="text" 
                                list="vital-remarks"
                                value={vitalInput.remark}
                                onChange={(e) => setVitalInput({...vitalInput, remark: e.target.value})}
                                placeholder="Value..."
                                className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 shadow-xs" 
                            />
                            <datalist id="vital-remarks">
                                {suggestedRemarks.map((rem, i) => <option key={i} value={rem} />)}
                            </datalist>
                          </div>
                          <button 
                            onClick={handleAddGeneralExam}
                            className="bg-[#17a2b8] text-white w-7 h-7 rounded flex items-center justify-center hover:bg-[#138496] shadow-sm"
                          >
                            <i className="fa-solid fa-plus text-xs"></i>
                          </button>
                       </div>
                    </div>
                 </div>
                 
                 <div className="border border-gray-200 rounded-sm mt-3 bg-white min-h-[100px] shadow-inner overflow-hidden">
                    <table className="w-full text-left text-[11px]">
                       <thead className="bg-[#f2f2f2] text-gray-600 border-b">
                          <tr>
                             <th className="px-3 py-1 font-bold border-r">General Exam</th>
                             <th className="px-3 py-1 font-bold">Remark</th>
                             <th className="px-3 py-1 font-bold w-10"></th>
                          </tr>
                       </thead>
                       <tbody>
                          {generalExams.map((item, i) => (
                            <tr key={i} className={`border-b last:border-b-0 hover:bg-gray-50 ${item.isCritical ? 'text-red-600 font-bold bg-rose-50/50' : 'text-gray-700'}`}>
                               <td className="px-3 py-1 border-r">{item.name}</td>
                               <td className="px-3 py-1">
                                   {item.remark} {(item.name === 'Body mass index (BMI)') && <span className="text-[9px] ml-1 opacity-60">(Auto-calculated)</span>}
                               </td>
                               <td className="px-2 py-1 text-center">
                                   <button onClick={() => setGeneralExams(prev => prev.filter((_, idx) => idx !== i))} className="text-gray-300 hover:text-red-500">
                                       <i className="fa-solid fa-times text-[10px]"></i>
                                   </button>
                               </td>
                            </tr>
                          ))}
                          {generalExams.length === 0 && (
                            <tr><td colSpan={3} className="py-8 text-center text-gray-400 font-medium">No vitals recorded yet</td></tr>
                          )}
                       </tbody>
                    </table>
                 </div>
              </div>

              <div className="flex flex-col gap-2">
                 <h3 className="text-[13px] font-bold text-gray-700 underline decoration-gray-400">Systemic Examination</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <div className="flex flex-col gap-1">
                       <label className="text-[11px] font-bold text-gray-600 uppercase">Body System</label>
                       <select 
                         value={systemicInput.system}
                         onChange={(e) => setSystemicInput({...systemicInput, system: e.target.value})}
                         className="border border-gray-300 rounded-lg px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-xs"
                       >
                          <option value=""></option>
                          <option value="Cardiovascular">Cardiovascular</option>
                          <option value="Respiratory">Respiratory</option>
                          <option value="Nervous System">Nervous System</option>
                          <option value="Gastrointestinal">Gastrointestinal</option>
                          <option value="Musculoskeletal">Musculoskeletal</option>
                       </select>
                    </div>
                    <div className="flex flex-col gap-1">
                       <label className="text-[11px] font-bold text-gray-600 uppercase">Findings</label>
                       <div className="flex gap-1 items-center">
                          <input 
                            type="text" 
                            value={systemicInput.remark}
                            onChange={(e) => setSystemicInput({...systemicInput, remark: e.target.value})}
                            placeholder="Observation..."
                            className="flex-1 border border-gray-300 rounded-lg px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 shadow-xs" 
                          />
                          <button 
                            onClick={handleAddSystemicExam}
                            className="bg-[#17a2b8] text-white w-7 h-7 rounded flex items-center justify-center hover:bg-[#138496] shadow-sm"
                          >
                            <i className="fa-solid fa-plus text-xs"></i>
                          </button>
                       </div>
                    </div>
                 </div>
                 <div className="flex items-center gap-2 mt-1">
                    <input 
                      type="checkbox" 
                      id="anomalous" 
                      checked={systemicInput.anomalous}
                      onChange={(e) => setSystemicInput({...systemicInput, anomalous: e.target.checked})}
                      className="w-3.5 h-3.5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" 
                    />
                    <label htmlFor="anomalous" className="text-[11px] text-gray-600 font-bold uppercase tracking-tight">Mark as Anomalous</label>
                 </div>

                 <div className="border border-gray-200 rounded-sm mt-3 bg-white min-h-[100px] shadow-inner overflow-hidden">
                    <table className="w-full text-left text-[11px]">
                       <thead className="bg-[#f2f2f2] text-gray-600 border-b">
                          <tr>
                             <th className="px-3 py-1.5 font-bold border-r">Body System</th>
                             <th className="px-3 py-1.5 font-bold">Remark</th>
                             <th className="px-3 py-1.5 font-bold w-10"></th>
                          </tr>
                       </thead>
                       <tbody>
                          {systemicExams.map((item, i) => (
                            <tr key={i} className="border-b last:border-b-0 hover:bg-gray-50">
                               <td className="px-3 py-1 border-r flex items-center gap-2">
                                  {item.system} {item.anomalous && <span className="bg-rose-500 text-white text-[7px] px-1 py-0.5 rounded font-black uppercase">Anomaly</span>}
                               </td>
                               <td className="px-3 py-1">{item.remark}</td>
                               <td className="px-2 py-1 text-center">
                                   <button onClick={() => setSystemicExams(prev => prev.filter((_, idx) => idx !== i))} className="text-gray-300 hover:text-red-500">
                                       <i className="fa-solid fa-times text-[10px]"></i>
                                   </button>
                               </td>
                            </tr>
                          ))}
                          {systemicExams.length === 0 && (
                            <tr><td colSpan={3} className="py-8 text-center text-gray-400 font-medium">No systemic findings added</td></tr>
                          )}
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4">
              <div className="flex flex-col gap-2">
                 <h3 className="text-[13px] font-bold text-gray-700 underline decoration-gray-400">Required Procedures</h3>
                 <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-gray-600 uppercase">Procedure Name</label>
                    <div className="flex gap-1 items-center">
                       <select 
                         value={procedureInput}
                         onChange={(e) => setProcedureInput(e.target.value)}
                         className="flex-1 border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none bg-white focus:ring-1 focus:ring-cyan-500 shadow-xs"
                       >
                          <option value=""></option>
                          <option value="Nebulization">Nebulization</option>
                          <option value="Wound Dressing">Wound Dressing</option>
                          <option value="Oxygen Support">Oxygen Support</option>
                          <option value="Stitch Removal">Stitch Removal</option>
                          <option value="Catheterization">Catheterization</option>
                       </select>
                       <button 
                         onClick={handleAddProcedure}
                         className="bg-[#17a2b8] text-white w-7 h-7 rounded flex items-center justify-center hover:bg-[#138496] shadow-sm"
                       >
                         <i className="fa-solid fa-plus text-xs"></i>
                       </button>
                    </div>
                 </div>
                 <div className="border border-gray-200 rounded-sm mt-3 bg-white min-h-[100px] p-4 flex flex-wrap gap-2 shadow-inner">
                    {procedures.map((p, i) => (
                      <div key={i} className="bg-cyan-50 border border-cyan-100 text-cyan-800 text-[11px] px-3 py-1 rounded-full font-bold flex items-center gap-2 group">
                         {p}
                         <i onClick={() => setProcedures(prev => prev.filter((_, idx) => idx !== i))} className="fa-solid fa-times text-[9px] text-cyan-300 hover:text-rose-500 cursor-pointer"></i>
                      </div>
                    ))}
                    {procedures.length === 0 && <span className="text-[11px] text-gray-400 italic font-medium w-full text-center py-6">No procedures recorded</span>}
                 </div>
              </div>

              <div className="flex flex-col gap-2 relative">
                 <h3 className="text-[13px] font-bold text-gray-700 underline decoration-gray-400">Nursing Clinical Notes</h3>
                 <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-gray-600 uppercase">Detailed Observation Notes</label>
                    <textarea 
                      value={nursingNotes}
                      onChange={(e) => setNursingNotes(e.target.value)}
                      placeholder="Enter detailed nursing assessment, chief complaints, and observations here..."
                      className="w-full h-[100px] border border-gray-300 rounded px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 resize-none shadow-inner bg-white font-medium shadow-xs"
                    ></textarea>
                 </div>
                 <div className="flex justify-end mt-4 gap-3">
                    <button 
                      onClick={() => { setGeneralExams([]); setSystemicExams([]); setProcedures([]); setNursingNotes(''); }}
                      className="px-6 py-2 rounded-sm text-[12px] font-bold bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 transition-all shadow-xs"
                    >
                      Reset Form
                    </button>
                    <button 
                      onClick={handleSaveTriage}
                      disabled={loading || !selectedPatient}
                      className={`px-10 py-2 rounded-sm text-[13px] font-bold transition-all shadow-md active:scale-95 flex items-center gap-2 ${selectedPatient ? 'bg-[#17a2b8] text-white hover:bg-[#138496]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                    >
                      {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-save"></i>}
                      Save Examination
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden mt-1">
        <div className="px-4 py-1.5 border-b bg-[#f8f9fa]">
          <h2 className="text-[14px] font-medium text-gray-600 uppercase tracking-tight">Patient's Full Clinical History</h2>
        </div>
        <div className="p-4">
           <div className="flex gap-1 mb-3">
              <ExportBtn label="Export PDF" />
              <ExportBtn label="Print History" />
           </div>
           <div className="border border-gray-200 rounded-sm overflow-hidden bg-white shadow-inner min-h-[120px]">
             <table className="w-full text-left text-[12px]">
               <thead className="bg-[#f2f2f2] text-gray-600 border-b">
                 <tr>
                   <th className="px-4 py-2 font-bold border-r">Visit ID</th>
                   <th className="px-4 py-2 font-bold border-r">Date of Visit</th>
                   <th className="px-4 py-2 font-bold">Nursing/Triage Summary</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td colSpan={3} className="text-center py-12 text-gray-400 italic">Select a patient above to view their visit history</td>
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
           setParentNotification={setShowToast}
           mode="update"
           initialFrom="Triage"
           onSuccess={handleQueueSuccess}
        />
      )}
    </div>
  );
};

const MetadataLine: React.FC<{ label: string; value: string; color?: string }> = ({ label, value, color = "text-gray-900" }) => (
  <div className="flex gap-2 justify-between border-b border-white/40 pb-0.5 group">
    <span className="font-bold text-[11px] w-[110px] uppercase tracking-tighter opacity-70 group-hover:opacity-100 transition-opacity">{label}</span>
    <span className={`font-semibold text-right truncate ${color}`}>{value || '-'}</span>
  </div>
);

const ExportBtn: React.FC<{ label: string }> = ({ label }) => (
  <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1 text-[11px] font-bold hover:bg-gray-50 transition-colors shadow-xs rounded-sm">
    {label}
  </button>
);
