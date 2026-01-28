
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

interface QueueModalProps {
  patient: any;
  onClose: () => void;
  setParentNotification: (val: any) => void;
  mode?: 'insert' | 'update';
  visitId?: string;
  onSuccess?: (targetRoom: string) => void;
  initialFrom?: string;
}

export const QueueModal: React.FC<QueueModalProps> = ({ 
  patient, 
  onClose, 
  setParentNotification, 
  mode = 'insert',
  visitId,
  onSuccess,
  initialFrom = 'Reception'
}) => {
  const [loading, setLoading] = useState(false);
  const [queueData, setQueueData] = useState({
    from: initialFrom,
    to: initialFrom === 'Laboratory' ? 'Billing' : 'Consultation Room 1',
    note: '',
    is_emergency: false,
    is_revisit: false
  });
  
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    setQueueData(prev => ({ ...prev, from: initialFrom }));
    return () => { isMounted.current = false; };
  }, [initialFrom]);

  const handleQueuePatient = async () => {
    if (!patient?.id) {
       alert("Invalid patient selection. Please try re-selecting the patient.");
       return;
    }
    if (!queueData.to) {
       alert("Please select a destination room.");
       return;
    }

    setLoading(true);

    const queueAction = async (retryCount = 0): Promise<boolean> => {
      try {
        if (mode === 'insert') {
          const { error } = await supabase
            .from('patient_visits')
            .insert([{ 
               patient_id: patient.id,
               current_room: queueData.to,
               previous_room: queueData.from,
               is_emergency: queueData.is_emergency,
               is_revisit: queueData.is_revisit,
               note: queueData.note,
               status: 'Active',
               queue_status: 'Waiting',
               queued_at: new Date().toISOString()
            }]);
          if (error) throw error;
        } else {
          if (!visitId) throw new Error("Visit ID missing for update mode");
          
          const isQueuedForDoctor = queueData.to.toLowerCase().includes('consultation') || queueData.to === 'Doctor';
          const visitStatus = isQueuedForDoctor ? 'Queued for Doctor' : (queueData.to === 'Laboratory' ? 'Queued for Lab' : (queueData.to === 'Billing' ? 'Queued for Billing' : 'Active'));

          const updatePayload: any = { 
            previous_room: queueData.from,
            current_room: queueData.to,
            status: visitStatus,
            queue_status: 'Waiting',
            note: queueData.note || `Moved from ${queueData.from}`,
            queued_at: new Date().toISOString()
          };

          if (initialFrom === 'Laboratory') {
            updatePayload.lab_to_doctor_notes = queueData.note;
          }

          const { error: visitUpdateError } = await supabase
            .from('patient_visits')
            .update(updatePayload)
            .eq('id', visitId);
            
          if (visitUpdateError) {
             if (retryCount < 1 && (visitUpdateError.message.includes('not found') || visitUpdateError.code === '42703')) {
                await new Promise(res => setTimeout(res, 1000));
                return queueAction(retryCount + 1);
             }
             throw visitUpdateError;
          }

          // Financial automation for Lab results completion
          if (initialFrom === 'Laboratory' && queueData.to === 'Billing') {
            const { data: tests } = await supabase
              .from('lab_tests')
              .select('test_name')
              .eq('visit_id', visitId);

            if (tests && tests.length > 0) {
              for (const test of tests) {
                const { data: config } = await supabase
                  .from('config_lab_tests')
                  .select('unit_cost')
                  .eq('test_name', test.test_name)
                  .maybeSingle();

                await supabase.from('billing_queue').insert({
                  visit_id: visitId,
                  patient_id: patient.id,
                  item_name: test.test_name,
                  unit_cost: config?.unit_cost || 0,
                  quantity: 1,
                  status: 'Unpaid',
                  created_at: new Date().toISOString()
                });
              }
            }
          }
          
          // Automate Lab request creation if moving to Lab
          if (queueData.to === 'Laboratory') {
            await supabase
              .from('lab_requests')
              .insert([{
                visit_id: visitId,
                patient_id: patient.id,
                request_note: queueData.note,
                status: 'Pending',
                requested_at: new Date().toISOString(),
                requested_from: queueData.from
              }]);
          }
        }
        return true;
      } catch (err: any) {
        if (err.name === 'AbortError' || err.message?.includes('aborted')) return false;
        throw err;
      }
    };

    try {
      const success = await queueAction();
      if (!success) return; // Silent abort

      if (isMounted.current) {
        setParentNotification({
          visible: true,
          title: 'Success',
          message: `Patient ${patient.surname} has been moved to ${queueData.to}`,
          type: 'success'
        });
        if (onSuccess) onSuccess(queueData.to);
        onClose();
      }
    } catch (err: any) {
      if (err.name === 'AbortError' || err.message?.includes('aborted')) return;
      if (isMounted.current) {
        setParentNotification({
          visible: true,
          title: 'Queueing Failed',
          message: err.message,
          type: 'error'
        });
      }
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  const calculateAgeDetailed = (dob: string) => {
    if (!dob) return "-";
    const birthDate = new Date(dob);
    const today = new Date();
    if (isNaN(birthDate.getTime())) return "-";
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age--; }
    return age >= 0 ? `${age} (yrs)` : "0 (yrs)";
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[3000] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-[600px] rounded shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
        <div className="bg-[#e9eaf2] px-6 py-4 flex items-center justify-between border-b">
          <h3 className="text-[20px] text-[#4a4a7d] font-black uppercase tracking-tight">Queue Patient</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><i className="fa-solid fa-times text-[22px]"></i></button>
        </div>
        <div className="p-8 flex flex-col gap-6">
           <div className="grid grid-cols-2 gap-4 text-[13px] border-b pb-4 border-gray-50">
              <div className="flex gap-2">
                 <span className="font-bold text-gray-500 uppercase tracking-tighter">Surname:</span>
                 <span className="text-blue-700 font-black uppercase">{patient?.surname || '-'}</span>
              </div>
              <div className="flex gap-2">
                 <span className="font-bold text-gray-500 uppercase tracking-tighter">Other Names:</span>
                 <span className="text-blue-700 font-black uppercase">{patient?.other_names || '-'}</span>
              </div>
              <div className="flex gap-2">
                 <span className="font-bold text-gray-500 uppercase tracking-tighter">O.P NO:</span>
                 <span className="text-blue-700 font-black">{patient?.id_number || '-'}</span>
              </div>
              <div className="flex gap-2">
                 <span className="font-bold text-gray-500 uppercase tracking-tighter">Age:</span>
                 <span className="text-blue-700 font-black">{calculateAgeDetailed(patient?.dob)}</span>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-black text-gray-600 uppercase tracking-tight">From</label>
                <input 
                    type="text" 
                    readOnly 
                    value={queueData.from} 
                    className="w-full border border-gray-200 rounded px-3 py-2 text-[13px] bg-gray-100 outline-none font-bold text-gray-500" 
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-black text-gray-600 uppercase tracking-tight">To (Destination)</label>
                <select value={queueData.to} onChange={(e) => setQueueData({...queueData, to: e.target.value})} className="flex-1 border border-gray-300 rounded px-3 py-2 text-[13px] bg-white outline-none focus:ring-2 focus:ring-cyan-500 font-bold text-blue-900">
                  <option value="Consultation Room 1">Consultation Room 1</option>
                  <option value="Consultation Room 2">Consultation Room 2</option>
                  <option value="Consultation Room 3">Consultation Room 3</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Laboratory">Laboratory</option>
                  <option value="Radiology">Radiology</option>
                  <option value="Billing">Billing</option>
                  <option value="Triage">Triage</option>
                  <option value="Exit/Discharge">Exit/Discharge</option>
                </select>
              </div>
              <div className="col-span-2">
                 <label className="text-[12px] font-black text-gray-600 uppercase tracking-tight">Special Instructions / Clinical Note</label>
                 <textarea 
                   value={queueData.note}
                   onChange={(e) => setQueueData({...queueData, note: e.target.value})}
                   placeholder="Enter clinical indication or instructions for the next department..."
                   className="w-full border border-gray-300 rounded-lg p-3 text-[14px] h-24 outline-none focus:ring-2 focus:ring-cyan-500 shadow-inner font-medium bg-[#fcfdfe]" 
                 />
              </div>
           </div>

           <div className="flex items-center gap-10">
              <label className="flex items-center gap-3 cursor-pointer group">
                 <input type="checkbox" checked={queueData.is_emergency} onChange={(e) => setQueueData({...queueData, is_emergency: e.target.checked})} className="w-5 h-5 rounded border-gray-300 text-rose-600 focus:ring-rose-500" />
                 <span className="text-[14px] text-gray-700 font-black uppercase tracking-tight group-hover:text-rose-600 transition-colors">Is Emergency</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                 <input type="checkbox" checked={queueData.is_revisit} onChange={(e) => setQueueData({...queueData, is_revisit: e.target.checked})} className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
                 <span className="text-[14px] text-gray-700 font-black uppercase tracking-tight group-hover:text-cyan-600 transition-colors">Is Revisit</span>
              </label>
           </div>

           <div className="flex justify-end pt-4 border-t border-gray-50">
              <button 
                onClick={handleQueuePatient}
                disabled={loading}
                className="bg-[#17a2b8] text-white px-12 py-3 rounded-md font-black shadow-xl hover:bg-[#138496] uppercase tracking-[0.2em] transition-all active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-3"
              >
                {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-user-clock"></i>}
                Queue Patient
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
