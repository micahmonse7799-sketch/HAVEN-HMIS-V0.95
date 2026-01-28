
import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ViewType } from '../App';
import { QueueModal } from './QueueModal';

interface PatientRegistryProps {
  onBack: () => void;
  onNavigate: (view: ViewType) => void;
  setCurrentRoom: (room: string) => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const PatientRegistry: React.FC<PatientRegistryProps> = ({ 
  onBack, 
  onNavigate, 
  setCurrentRoom,
  currentRoom, 
  onOpenRoomModal 
}) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isSchemesModalOpen, setIsSchemesModalOpen] = useState(false);
  const [isQueueModalOpen, setIsQueueModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState<{ visible: boolean; title: string; message: string; type: 'success' | 'error'; patient?: any } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [activeSchemes, setActiveSchemes] = useState<any[]>([]);
  const [selectedActiveSchemeIdx, setSelectedActiveSchemeIdx] = useState<number>(-1);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(true);

  const initialFormState = {
    surname: '',
    other_names: '',
    sex: '',
    dob: '',
    id_type: '',
    id_number: '',
    telephone_1: '',
    telephone_2: '',
    email: '',
    postal_address: '',
    postal_code: '',
    residence: '',
    town: '',
    reference_number: '',
    nationality: '',
    next_of_kin: '',
    occupation: '',
    relationship: '',
    nok_contact: '',
    notes: '' 
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    isMounted.current = true;
    handleSearch();
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsActionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      isMounted.current = false;
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const fetchActiveSchemes = async (patientId: string) => {
    try {
      const { data, error } = await supabase
        .from('patient_schemes')
        .select('*')
        .eq('patient_id', patientId);
      if (error) {
        if (error.message?.includes('aborted')) return;
        throw error;
      }
      if (isMounted.current) {
        setActiveSchemes(data || []);
        if (data && data.length > 0) setSelectedActiveSchemeIdx(0);
      }
    } catch (err) {
      console.error("Error fetching schemes:", err);
    }
  };

  const selectPatient = (patient: any) => {
    setSelectedPatient(patient);
    setFormData({
      surname: patient.surname || '',
      other_names: patient.other_names || '',
      sex: patient.sex || '',
      dob: patient.dob || '',
      id_type: patient.id_type || '',
      id_number: patient.id_number || '',
      telephone_1: patient.telephone_1 || '',
      telephone_2: patient.telephone_2 || '',
      email: patient.email || '',
      postal_address: patient.postal_address || '',
      postal_code: patient.postal_code || '',
      residence: patient.residence || '',
      town: patient.town || '',
      reference_number: patient.reference_number || '',
      nationality: patient.nationality || '',
      next_of_kin: patient.next_of_kin || '',
      occupation: patient.occupation || '',
      relationship: patient.relationship || '',
      nok_contact: patient.nok_contact || '',
      notes: patient.notes || ''
    });
    fetchActiveSchemes(patient.id);
  };

  const handleSavePatient = async () => {
    if (!formData.surname || !formData.telephone_1) {
      alert("Please fill in required fields: Surname and Telephone 1");
      return;
    }

    setLoading(true);
    try {
      let savedPatient;
      
      // Step 1: Save Demographics - Removing 'notes' to avoid schema errors
      const { notes, ...cleanData } = formData;
      
      if (selectedPatient) {
        const { data, error } = await supabase
          .from('patients_registry')
          .update(cleanData)
          .eq('id', selectedPatient.id)
          .select();
        if (error) throw error;
        savedPatient = data?.[0];
      } else {
        const { data, error } = await supabase
          .from('patients_registry')
          .insert([cleanData])
          .select();
        if (error) throw error;
        savedPatient = data?.[0];
      }
      
      if (!savedPatient) throw new Error("Failed to retrieve saved patient record.");

      // Step 2: Save linked schemes - Mapping only valid columns
      const unsavedSchemes = activeSchemes.filter(s => s.id?.toString().startsWith('temp-'));
      if (unsavedSchemes.length > 0) {
        const schemesToInsert = unsavedSchemes.map(({ id, principal_member, notes: sNotes, ...rest }) => ({
          ...rest,
          patient_id: savedPatient.id,
          // Mapping 'Membership Number' to membership_no (already done via rest if key matches)
          // Omitting principal_member and notes per urgent instructions
        }));
        
        const { error: schemeError } = await supabase
          .from('patient_schemes')
          .insert(schemesToInsert);
        if (schemeError) throw schemeError;
      }

      // Step 3: Success Notification Routine
      if (isMounted.current) {
        setShowNotification({ 
          visible: true, 
          title: 'Saved Successfully', 
          message: `Patient ${savedPatient.surname} has been saved in the database`,
          type: 'success',
          patient: savedPatient
        });
        
        // Reset form ONLY AFTER notification is ready
        setFormData(initialFormState);
        setActiveSchemes([]);
        setSelectedActiveSchemeIdx(-1);
        setSelectedPatient(null);
        
        handleSearch();
      }

    } catch (err: any) {
      if (err.message?.includes('aborted')) return;
      alert('Save Failed: ' + err.message);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      let query = supabase.from('patients_registry').select('*');
      if (searchTerm) {
        query = query.or(`surname.ilike.%${searchTerm}%,other_names.ilike.%${searchTerm}%,id_number.ilike.%${searchTerm}%`);
      }
      const { data, error } = await query.order('created_at', { ascending: false }).limit(50);
      if (error) {
        if (error.message?.includes('aborted')) return;
        throw error;
      }
      if (isMounted.current) setPatients(data || []);
    } catch (err: any) {
      console.error('Search error:', err.message);
    }
  };

  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 relative">
      {/* Updated Toast Notification with Interactive Hand Link */}
      {showNotification?.visible && (
        <div className="fixed top-20 right-10 z-[2000] animate-in slide-in-from-right duration-500">
          <div className={`${showNotification.type === 'success' ? 'bg-[#17a2b8]' : 'bg-rose-600'} text-white px-6 py-4 rounded shadow-2xl flex items-center gap-4 min-w-[380px] border border-white/20`}>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <i className={`fa-solid ${showNotification.type === 'success' ? 'fa-check' : 'fa-triangle-exclamation'} text-xl`}></i>
            </div>
            <div className="flex-1">
              <p className="font-bold text-[14px] uppercase tracking-wide">{showNotification.title}</p>
              <p className="text-[12px] opacity-95">
                {showNotification.message}{' '}
                <button 
                  onClick={() => { 
                    setSelectedPatient(showNotification.patient);
                    setIsQueueModalOpen(true); 
                    setShowNotification(null); 
                  }}
                  className="font-black underline uppercase text-[11px] tracking-widest hover:text-white/80 transition-colors ml-1 inline-flex items-center gap-1"
                >
                  👈 Add patient to the Queue
                </button>
              </p>
            </div>
            <button onClick={() => setShowNotification(null)} className="text-white/50 hover:text-white transition-colors self-start mt-1">
              <i className="fa-solid fa-times"></i>
            </button>
          </div>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-white rounded-sm h-10 px-4 flex items-center justify-between shadow-sm">
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
            className={`px-4 py-1 rounded-sm text-[11px] font-bold uppercase transition-all ${selectedPatient ? 'bg-[#17a2b8] text-white hover:bg-[#138496]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
          >
            Queue
          </button>
        </div>
      </div>

      <div className="bg-[#f8f9fa] border border-gray-200 rounded-sm px-4 py-1.5 flex items-center justify-between text-[12px]">
        <div className="flex items-center gap-2 text-gray-500">
          <i className="fa-solid fa-home text-blue-500"></i>
          <span className="opacity-50">/</span>
          <span className="text-blue-500 cursor-pointer hover:underline">Clinical</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Patient Registry</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-center mt-2">
          <div className="relative w-full max-w-2xl flex shadow-sm">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search for patient by (Name, ID, OP/NO, P/NO, M/S)"
              className="flex-1 bg-white border border-gray-300 rounded-l px-4 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#17a2b8]"
            />
            <button onClick={handleSearch} className="bg-[#5da54f] text-white px-4 rounded-r hover:bg-[#4d8a41] transition-colors">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-sm border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b pb-2">
            <h2 className="text-[16px] text-gray-600 font-medium">
              {selectedPatient && formData.surname ? `Active Patient: ${formData.surname} ${formData.other_names}` : 'Register New Patient'}
            </h2>
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsActionsOpen(!isActionsOpen)}
                className="bg-[#17a2b8] text-white px-3 py-1 rounded-sm text-[12px] flex items-center gap-2 hover:bg-[#138496]"
              >
                Actions <i className={`fa-solid fa-chevron-down text-[10px] ${isActionsOpen ? 'rotate-180' : ''} transition-transform`}></i>
              </button>
              {isActionsOpen && (
                <div className="absolute right-0 mt-1 w-64 bg-white border border-gray-200 shadow-xl z-50 rounded-sm py-1">
                  <ActionItem label="Queue Patient" active onClick={() => { if (selectedPatient) setIsQueueModalOpen(true); }} />
                  <ActionItem label="Deactivate Patient" onClick={() => alert('Patient Deactivated')} />
                  <ActionItem label="Delete Patient" onClick={() => alert('Patient Record Removed')} />
                  <ActionItem label="Smart Member Profile" active />
                  <ActionItem label="Import Patients" />
                  <ActionItem label="View Visits/Bills History" />
                  <hr className="my-1 border-gray-100" />
                  <ActionItem label="Clear Form" onClick={() => { setFormData(initialFormState); setActiveSchemes([]); setSelectedActiveSchemeIdx(-1); setSelectedPatient(null); }} />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
              <FormField name="surname" value={formData.surname} onChange={handleInputChange} label="Surname" required />
              <FormField name="telephone_1" value={formData.telephone_1} onChange={handleInputChange} label="Telephone 1" required />
              <FormField name="residence" value={formData.residence} onChange={handleInputChange} label="Residence" required />
              <FormField name="other_names" value={formData.other_names} onChange={handleInputChange} label="Other Names" required />
              <FormField name="telephone_2" value={formData.telephone_2} onChange={handleInputChange} label="Telephone 2" />
              <FormSelect name="town" value={formData.town} onChange={handleInputChange} label="Town" required options={['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru']} />
              <FormSelect name="sex" value={formData.sex} onChange={handleInputChange} label="Sex" required options={['Male', 'Female']} />
              <FormField name="email" value={formData.email} onChange={handleInputChange} label="Email" type="email" />
              <FormField name="reference_number" value={formData.reference_number} onChange={handleInputChange} label="Reference Number" />
              <FormField name="dob" value={formData.dob} onChange={handleInputChange} label="Date Of Birth" type="date" required />
              <FormField name="postal_address" value={formData.postal_address} onChange={handleInputChange} label="Postal Address" />
              <FormSelect name="nationality" value={formData.nationality} onChange={handleInputChange} label="Nationality" required options={['Kenyan', 'Ugandan', 'Other']} />
              <FormSelect name="id_type" value={formData.id_type} onChange={handleInputChange} label="ID Type" required options={['National ID', 'Passport', 'Birth Cert']} />
              <FormField name="postal_code" value={formData.postal_code} onChange={handleInputChange} label="Postal Code" />
              <FormField name="next_of_kin" value={formData.next_of_kin} onChange={handleInputChange} label="Next Of Kin" />
              <FormField name="id_number" value={formData.id_number} onChange={handleInputChange} label="ID/Serial Number" />
              <FormSelect name="occupation" value={formData.occupation} onChange={handleInputChange} label="Occupation" options={['Employed', 'Self-Employed', 'Student']} />
              <FormField name="relationship" value={formData.relationship} onChange={handleInputChange} label="Relationship" />
            </div>

            <div className="w-full lg:w-[320px] flex flex-col gap-4">
              <FormField name="nok_contact" value={formData.nok_contact} onChange={handleInputChange} label="Next Of Kin Contact" />
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-gray-600 uppercase tracking-tighter">Notes</label>
                <textarea name="notes" value={formData.notes} onChange={handleInputChange} className="w-full h-[60px] border border-gray-300 rounded-sm p-2 text-[13px] outline-none shadow-inner" placeholder="Optional notes..." />
              </div>

              {/* Customer Schemes Display Area */}
              <div className="bg-[#f8f9fa] border border-gray-200 rounded p-3 min-h-[100px] flex flex-col shadow-sm">
                 <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-black text-[#4a4a7d] uppercase tracking-widest border-b border-[#4a4a7d]/20 pb-0.5">Active Customer Schemes</span>
                    <button 
                      onClick={() => setIsSchemesModalOpen(true)}
                      className="bg-[#17a2b8] text-white px-2 py-0.5 rounded text-[10px] font-bold hover:bg-[#138496] shadow-sm"
                    >
                      Manage
                    </button>
                 </div>
                 <div className="flex flex-col gap-1.5 flex-1 max-h-[80px] overflow-y-auto no-scrollbar">
                    {activeSchemes.length > 0 ? (
                      activeSchemes.map((s, i) => (
                        <div 
                           key={i} 
                           className={`text-[11px] font-black border-l-2 pl-2 bg-white/50 py-1 flex justify-between items-center group transition-all ${selectedActiveSchemeIdx === i ? 'border-[#17a2b8] text-[#17a2b8] ring-1 ring-[#17a2b8]/10' : 'border-gray-200 text-gray-400'}`}
                           onClick={() => setSelectedActiveSchemeIdx(i)}
                        >
                           <span>{s.scheme_name}</span>
                           <span className="font-mono text-[10px] opacity-70">{s.membership_no}</span>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-center flex-1 py-2 opacity-30">
                         <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-center">No Active Scheme Assigned</span>
                      </div>
                    )}
                 </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2 px-1">
                   <div className="text-[11px] text-gray-400 font-black uppercase tracking-widest">OP No: <span className="text-gray-900 font-mono">{selectedPatient?.id_number || '-'}</span></div>
                   <div className="text-[11px] text-gray-400 font-black uppercase tracking-widest">Reg: <span className="text-gray-900 font-mono">{selectedPatient ? new Date(selectedPatient.created_at).toLocaleDateString() : '-'}</span></div>
                </div>
                
                {/* Save Button (+) */}
                <div className="flex justify-end pr-1 pt-1">
                  <button 
                    onClick={handleSavePatient}
                    disabled={loading}
                    className="w-10 h-10 bg-[#17a2b8] text-white rounded flex items-center justify-center hover:bg-[#138496] shadow-[0_4px_12px_rgba(23,162,184,0.35)] transition-all active:scale-90"
                    title="Save Registration"
                  >
                     {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-plus text-xl"></i>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isSchemesModalOpen && (
        <SchemesModal 
          patient={selectedPatient} 
          patientName={`${formData.surname} ${formData.other_names}`}
          currentLocalSchemes={activeSchemes}
          onUpdateSchemes={(updated) => {
             setActiveSchemes(updated);
             if (updated.length > 0 && selectedActiveSchemeIdx === -1) {
                setSelectedActiveSchemeIdx(0);
             }
          }}
          onClose={() => setIsSchemesModalOpen(false)} 
        />
      )}

      {isQueueModalOpen && selectedPatient && (
        <QueueModal 
          patient={selectedPatient} 
          onClose={() => setIsQueueModalOpen(false)} 
          setParentNotification={setShowNotification}
          mode="insert"
        />
      )}
    </div>
  );
};

const SchemesModal: React.FC<{ 
  patient: any; 
  patientName: string; 
  currentLocalSchemes: any[];
  onUpdateSchemes: (schemes: any[]) => void;
  onClose: () => void;
}> = ({ patient, patientName, currentLocalSchemes, onUpdateSchemes, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [schemeData, setSchemeData] = useState({
    scheme_name: '',
    principal_member: '',
    membership_no: '', 
    is_principal: false,
    notes: ''
  });

  const handleTogglePrincipal = (checked: boolean) => {
    setSchemeData(prev => ({
      ...prev,
      is_principal: checked,
      principal_member: checked ? patientName.trim() : ''
    }));
  };

  const handleSaveScheme = async () => {
    if (!schemeData.scheme_name) {
      alert("Please select a scheme.");
      return;
    }
    if (!schemeData.membership_no) {
      alert("Please enter a membership number.");
      return;
    }

    setLoading(true);
    try {
      // Mapping logic: ommit principal_member and notes for database if needed
      if (patient?.id) {
         const { error } = await supabase
           .from('patient_schemes')
           .insert([{ 
             scheme_name: schemeData.scheme_name,
             membership_no: schemeData.membership_no,
             is_principal: schemeData.is_principal,
             patient_id: patient.id 
           }]);
         if (error) throw error;
         
         const { data: fresh } = await supabase.from('patient_schemes').select('*').eq('patient_id', patient.id);
         onUpdateSchemes(fresh || []);
      } else {
         const newScheme = { ...schemeData, id: `temp-${Date.now()}` };
         onUpdateSchemes([...currentLocalSchemes, newScheme]);
      }
      
      setSchemeData({
        scheme_name: '',
        principal_member: '',
        membership_no: '',
        is_principal: false,
        notes: ''
      });
    } catch (err: any) {
      alert('Failed to save scheme: ' + err.message);
    } finally {
      setTimeout(() => setLoading(false), 300);
    }
  };

  const handleDeleteScheme = async (s: any) => {
    if (!confirm("Remove this scheme?")) return;
    
    if (patient?.id && !s.id.toString().startsWith('temp-')) {
       await supabase.from('patient_schemes').delete().eq('id', s.id);
       const { data: fresh } = await supabase.from('patient_schemes').select('*').eq('patient_id', patient.id);
       onUpdateSchemes(fresh || []);
    } else {
       onUpdateSchemes(currentLocalSchemes.filter(item => item.id !== s.id));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-[950px] rounded-lg shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
        <div className="bg-[#e9eaf2] px-6 py-4 flex items-center justify-between border-b">
          <h3 className="text-[20px] text-[#4a4a7d] font-normal uppercase tracking-tight">Customer Schemes</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><i className="fa-solid fa-times text-[22px]"></i></button>
        </div>
        <div className="p-10">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8 items-end">
              <div className="flex flex-col gap-2">
                 <label className="text-[13px] font-black text-gray-700 uppercase tracking-widest">Select Scheme:</label>
                 <select 
                    value={schemeData.scheme_name}
                    onChange={(e) => setSchemeData({...schemeData, scheme_name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[15px] outline-none focus:ring-1 focus:ring-blue-400 bg-white shadow-sm"
                 >
                    <option value="">--Select--</option>
                    <option value="CASH PAY LATER">CASH PAY LATER</option>
                    <option value="SHA - SHA OUTPATIENT">SHA - SHA OUTPATIENT</option>
                    <option value="Minet - AON INSURANCE">Minet - AON INSURANCE</option>
                    <option value="JUBILEE">JUBILEE</option>
                 </select>
              </div>
              <div className="flex flex-col gap-2">
                 <label className="text-[13px] font-black text-gray-700 uppercase tracking-widest">Principal Member</label>
                 <div className="flex gap-4 items-center">
                    <input 
                      type="text" 
                      value={schemeData.principal_member}
                      onChange={(e) => setSchemeData({...schemeData, principal_member: e.target.value})}
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-[15px] outline-none focus:border-cyan-500 bg-white" 
                      placeholder="Principal name..."
                    />
                    <div className="flex items-center gap-3 shrink-0 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                       <input 
                         type="checkbox" 
                         id="isPrincipal" 
                         checked={schemeData.is_principal}
                         onChange={(e) => handleTogglePrincipal(e.target.checked)}
                         className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer shadow-sm" 
                       />
                       <label htmlFor="isPrincipal" className="text-[13px] text-gray-600 font-bold whitespace-nowrap cursor-pointer">Is Principal</label>
                    </div>
                 </div>
              </div>
              <div className="flex flex-col gap-2">
                 <label className="text-[13px] font-black text-gray-700 uppercase tracking-widest">Membership Number</label>
                 <div className="flex gap-3">
                    <input 
                      type="text" 
                      value={schemeData.membership_no}
                      onChange={(e) => setSchemeData({...schemeData, membership_no: e.target.value})}
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-[15px] outline-none focus:border-cyan-500 bg-white" 
                    />
                    <button 
                      onClick={handleSaveScheme}
                      disabled={loading}
                      className="w-12 h-12 bg-[#17a2b8] text-white rounded-lg flex items-center justify-center hover:bg-[#138496] shadow-lg transition-all active:scale-95"
                      title="Add to table"
                    >
                      {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-plus text-lg"></i>}
                    </button>
                 </div>
              </div>
              <div className="flex flex-col gap-2">
                 <label className="text-[13px] font-black text-gray-700 uppercase tracking-widest">Notes</label>
                 <input 
                   type="text" 
                   value={schemeData.notes}
                   onChange={(e) => setSchemeData({...schemeData, notes: e.target.value})}
                   className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[15px] outline-none focus:border-cyan-500 bg-white" 
                   placeholder="Additional info..."
                 />
              </div>
           </div>

           <div className="mt-6 border border-gray-100 rounded-sm shadow-inner overflow-hidden">
              <div className="bg-[#eef5f6] px-5 py-3 text-[12px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-200">View: Customer Schemes</div>
              <table className="w-full text-left text-[13px]">
                 <thead className="border-b bg-gray-50 text-gray-400">
                    <tr>
                       <th className="px-5 py-3 font-bold border-r">Scheme Name</th>
                       <th className="px-5 py-3 font-bold border-r">Principal Member</th>
                       <th className="px-5 py-3 font-bold border-r">Membership No</th>
                       <th className="px-5 py-3 font-bold border-r">Is Principal</th>
                       <th className="px-5 py-3 text-center w-16"></th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                    {currentLocalSchemes.length > 0 ? (
                      currentLocalSchemes.map((s, i) => (
                        <tr key={i} className="hover:bg-cyan-50/50 transition-colors">
                           <td className="px-5 py-4 border-r font-black text-blue-800">{s.scheme_name}</td>
                           <td className="px-5 py-4 border-r uppercase">{s.principal_member}</td>
                           <td className="px-5 py-4 border-r font-mono font-bold">{s.membership_no}</td>
                           <td className="px-5 py-4 border-r text-center">{s.is_principal ? 'Yes' : 'No'}</td>
                           <td className="px-5 py-4 text-center">
                              <button onClick={() => handleDeleteScheme(s)} className="text-gray-300 hover:text-red-600 transition-colors">
                                <i className="fa-solid fa-trash-can"></i>
                              </button>
                           </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan={5} className="p-20 text-center text-gray-400 italic uppercase tracking-[0.3em] font-medium opacity-50">No data available in table</td></tr>
                    )}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );
};

const FormField: React.FC<{ name: string; value: string; onChange: (e: any) => void; label: string; required?: boolean; type?: string }> = ({ name, value, onChange, label, required, type = 'text' }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[12px] font-semibold text-gray-600 uppercase tracking-tight">{label} {required && <span className="text-red-500">*</span>}</label>
    <input name={name} value={value} onChange={onChange} type={type} className="border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 shadow-xs bg-white" />
  </div>
);

const FormSelect: React.FC<{ name?: string; value: string; onChange: (e: any) => void; label: string; required?: boolean; options: string[]; hasPlus?: boolean }> = ({ name, value, onChange, label, required, options, hasPlus }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[12px] font-semibold text-gray-600 uppercase tracking-tight">{label} {required && <span className="text-red-500">*</span>}</label>
    <div className="flex gap-2">
      <select name={name} value={value} onChange={onChange} className="flex-1 border border-gray-300 rounded-sm px-2 py-1.5 text-[13px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 shadow-xs">
        <option value="">--Select--</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      {hasPlus && <button className="text-blue-600"><i className="fa-solid fa-plus-circle text-lg"></i></button>}
    </div>
  </div>
);

const ActionItem: React.FC<{ label: string; active?: boolean; onClick?: () => void }> = ({ label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`px-4 py-2 text-[13px] hover:bg-gray-100 cursor-pointer transition-colors ${active ? 'text-green-700 font-bold border-l-4 border-green-500' : 'text-gray-700'}`}
  >
    {label}
  </div>
);
