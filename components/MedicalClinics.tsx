
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

interface MedicalClinicsProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const MedicalClinics: React.FC<MedicalClinicsProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [clinics, setClinics] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const initialForm = {
    name: '',
    department: '',
    clinic_type: '',
    service_type: 'General',
    icon: 'abacus',
    is_active: true,
    appear_on_queue: false
  };

  const [formData, setFormData] = useState(initialForm);
  const isMounted = useRef(true);
  const actionsRef = useRef<HTMLDivElement>(null);

  const fetchClinics = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('config_medical_clinics')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) throw error;
      if (isMounted.current) setClinics(data || []);
    } catch (err: any) {
      console.error("Fetch Clinics Error:", err.message);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const { data, error } = await supabase
        .from('config_departments')
        .select('name')
        .order('name', { ascending: true });
      if (error) throw error;
      if (isMounted.current) setDepartments(data || []);
    } catch (err: any) {
      console.error("Fetch Departments Error:", err.message);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    fetchDepartments();
    fetchClinics();
    
    const handleClickOutside = (event: MouseEvent) => {
      if (actionsRef.current && !actionsRef.current.contains(event.target as Node)) {
        setIsActionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => { 
      isMounted.current = false; 
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSave = async () => {
    if (!formData.name) {
      alert("Please enter a clinic name.");
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        const { error } = await supabase
          .from('config_medical_clinics')
          .update(formData)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('config_medical_clinics')
          .insert([formData]);
        if (error) throw error;
      }

      setFormData(initialForm);
      setEditingId(null);
      await fetchClinics();
      
      setShowSuccess(true);
      setTimeout(() => { if (isMounted.current) setShowSuccess(false); }, 4000);
    } catch (err: any) {
      alert("Database Action Failed: " + err.message);
    } finally {
      if (isMounted.current) setSaving(false);
    }
  };

  const handleDoubleClick = (clinic: any) => {
    setFormData({
      name: clinic.name || '',
      department: clinic.department || '',
      clinic_type: clinic.clinic_type || '',
      service_type: clinic.service_type || 'General',
      icon: clinic.icon || 'abacus',
      is_active: clinic.is_active ?? true,
      appear_on_queue: clinic.appear_on_queue ?? false
    });
    setEditingId(clinic.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatFlags = (clinic: any) => {
    const flags = [];
    if (clinic.is_active) flags.push('Active');
    else flags.push('Inactive');

    if (clinic.clinic_type) flags.push(clinic.clinic_type);
    if (clinic.name && !clinic.clinic_type?.includes(clinic.name)) flags.push(clinic.name);
    if (clinic.appear_on_queue) flags.push('Appear on Queue Popup');
    
    return flags.join(' | ') || '-';
  };

  const filteredList = clinics.filter(c => 
    (c.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.department || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20 relative min-h-full">
      
      {/* Compact Top-Right Emerald Notification */}
      {showSuccess && (
        <div className="fixed top-12 right-6 z-[9000] animate-in slide-in-from-right-8 duration-300 pointer-events-auto">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-4 border border-white/20 min-w-[300px]">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center shrink-0 shadow-inner">
              <i className="fa-solid fa-check text-lg"></i>
            </div>
            <div className="flex-1">
              <h3 className="font-black text-[13px] uppercase tracking-wider leading-none mb-1">Success</h3>
              <p className="text-[11px] font-bold opacity-90 leading-tight">Medical Clinic Configuration Saved Successfully!</p>
            </div>
            <button onClick={() => setShowSuccess(false)} className="text-white/40 hover:text-white transition-colors p-1">
              <i className="fa-solid fa-times text-xs"></i>
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-sm h-10 px-4 flex items-center justify-between shadow-sm border border-gray-200">
        <div className="flex items-center gap-3">
          <i onClick={onBack} className="fa-solid fa-times text-gray-400 cursor-pointer hover:text-gray-600 text-xs"></i>
          <h1 className="text-gray-700 font-semibold text-[14px]">Haven MIS</h1>
        </div>
        <div className="flex items-center gap-12 text-[13px] text-gray-500">
          <div>Branch: <span className="text-[#43939e] font-bold">Main branch</span></div>
          <div>Room: <span onClick={onOpenRoomModal} className="text-[#43939e] cursor-pointer hover:underline font-bold">{currentRoom}</span></div>
          <div className="flex items-center gap-1.5 text-blue-500 cursor-pointer hover:underline">
            <i className="fa-solid fa-question-circle"></i>
            <span className="font-bold">Guide</span>
          </div>
        </div>
      </div>

      <div className="bg-[#f8f9fa] border border-gray-200 rounded-sm px-4 py-1.5 flex items-center justify-between text-[12px]">
        <div className="flex items-center gap-2 text-gray-500">
          <i className="fa-solid fa-home text-blue-500"></i>
          <span className="opacity-50">/</span>
          <span className="text-blue-500 cursor-pointer hover:underline font-medium">Configurations</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Medical Clinics</span>
        </div>
        <div className="bg-[#17a2b8] text-white px-3 py-0.5 rounded-sm text-[11px] font-bold">Queue</div>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden flex flex-col">
        <div className="px-4 py-2 border-b bg-[#e9eaf2] flex items-center justify-between">
          <h2 className="text-[17px] font-normal text-gray-600 uppercase tracking-tight">Medical Clinics</h2>
          <div className="relative" ref={actionsRef}>
             <button 
                onClick={() => setIsActionsOpen(!isActionsOpen)}
                className="bg-[#43939e] text-white px-3 py-1 rounded-sm text-[12px] flex items-center gap-2 hover:bg-[#3b828c] shadow-sm font-bold transition-colors"
             >
                Actions <i className={`fa-solid fa-caret-down text-[10px] transition-transform ${isActionsOpen ? 'rotate-180' : ''}`}></i>
             </button>
             {isActionsOpen && (
                <div className="absolute right-0 mt-1 w-64 bg-white border border-gray-200 shadow-2xl z-[7000] rounded-sm py-2 animate-in fade-in zoom-in-95 duration-150">
                   <DropdownItem label="Configure Parameters" />
                   <DropdownItem label="Organize Parameters" />
                   <DropdownItem label="Export Parameters & Template" />
                   <DropdownItem label="Import Parameters & Template" />
                   <hr className="my-1 border-gray-100" />
                   <DropdownItem label="Copy Parameters & Template" />
                </div>
             )}
          </div>
        </div>

        <div className="p-8">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6 items-start">
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Name</label>
                 <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="E.g. General Outpatient"
                    className="w-full border border-gray-300 rounded-sm px-3 py-2 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-xs font-medium" 
                 />
              </div>

              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Type of Clinic</label>
                 <select 
                    name="clinic_type"
                    value={formData.clinic_type}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-sm px-3 py-2 text-[14px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 appearance-none shadow-xs font-medium cursor-pointer"
                 >
                    <option value="">--Select Type--</option>
                    <option value="General Clinic">General Clinic</option>
                    <option value="Special Clinic">Special Clinic</option>
                    <option value="Dental Clinic">Dental Clinic</option>
                    <option value="Optical Clinic">Optical Clinic</option>
                 </select>
              </div>

              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Icon</label>
                 <div className="flex border border-gray-300 rounded-sm shadow-xs overflow-hidden">
                    <input 
                       type="text" 
                       name="icon"
                       value={formData.icon}
                       onChange={handleInputChange}
                       className="flex-1 px-3 py-2 text-[14px] outline-none bg-white font-mono" 
                    />
                    <div className="bg-gray-50 border-l border-gray-300 px-4 py-2 flex items-center justify-center gap-2">
                       <span className="text-[12px] text-gray-500 lowercase italic">{formData.icon}</span>
                       <i className={`fa-solid fa-${formData.icon} text-cyan-600 text-sm`}></i>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Department</label>
                 <select 
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-sm px-3 py-2 text-[14px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 appearance-none shadow-xs font-bold text-green-700 cursor-pointer"
                 >
                    <option value="">--Select Department--</option>
                    {departments.map((d, i) => <option key={i} value={d.name}>{d.name}</option>)}
                 </select>
              </div>

              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Type of Service [For Reporting]</label>
                 <select 
                    name="service_type"
                    value={formData.service_type}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-sm px-3 py-2 text-[14px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 appearance-none shadow-xs font-bold text-green-700 cursor-pointer"
                 >
                    <option value="General">General</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Specialized">Specialized</option>
                 </select>
              </div>

              <div className="flex flex-col gap-3 pt-6">
                 <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="is_active" 
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer shadow-sm" 
                    />
                    <label htmlFor="is_active" className="text-[13px] text-gray-700 font-bold cursor-pointer">Is Active</label>
                 </div>
                 <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="appear_on_queue" 
                      name="appear_on_queue"
                      checked={formData.appear_on_queue}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer shadow-sm" 
                    />
                    <label htmlFor="appear_on_queue" className="text-[13px] text-gray-700 font-bold cursor-pointer">Appear on Queue Popup</label>
                 </div>
              </div>

              <div className="lg:col-start-3 flex justify-end items-end h-full">
                 <button 
                   onClick={handleSave}
                   disabled={saving}
                   className={`${editingId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-[#17a2b8] hover:bg-[#138496]'} text-white h-10 px-6 rounded flex items-center justify-center shadow-lg transition-all active:scale-95 disabled:bg-gray-300 min-w-[50px]`}
                 >
                    {saving ? <i className="fa-solid fa-spinner fa-spin text-lg"></i> : (editingId ? <span className="font-black text-[11px] tracking-widest uppercase">Update</span> : <i className="fa-solid fa-plus text-xl"></i>)}
                 </button>
              </div>
           </div>
        </div>

        <div className="border-t border-gray-200">
           <div className="px-4 py-2 bg-[#f0f2f5] border-b">
             <h2 className="text-[16px] font-medium text-gray-600 uppercase tracking-tight">View: Medical Clinics</h2>
           </div>
           <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-1">
                 <div className="flex gap-1.5">
                    <TableActionBtn label="Excel" />
                    <TableActionBtn label="CSV" />
                    <TableActionBtn label="Print" />
                 </div>
                 <div className="flex items-center gap-3">
                    <span className="text-[13px] text-gray-500 font-bold uppercase tracking-tight">Search:</span>
                    <input 
                       type="text" 
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                       placeholder="Filter by name..." 
                       className="border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none w-[240px] focus:ring-1 focus:ring-cyan-500 shadow-sm font-medium bg-white" 
                    />
                 </div>
              </div>

              <div className="border border-gray-200 rounded-sm overflow-x-auto min-h-[350px] shadow-inner bg-white custom-scrollbar">
                <table className="w-full text-left text-[13px] whitespace-nowrap">
                   <thead className="bg-[#f8f9fa] text-gray-600 border-b sticky top-0 z-10">
                      <tr>
                         <th className="px-6 py-3 font-bold border-r w-[80px]">No <i className="fa-solid fa-arrows-up-down text-[10px] opacity-30 ml-2"></i></th>
                         <th className="px-6 py-3 font-bold border-r">Name <i className="fa-solid fa-arrows-up-down text-[10px] opacity-30 ml-2"></i></th>
                         <th className="px-6 py-3 font-bold border-r">Department <i className="fa-solid fa-arrows-up-down text-[10px] opacity-30 ml-2"></i></th>
                         <th className="px-6 py-3 font-bold">Flags <i className="fa-solid fa-arrows-up-down text-[10px] opacity-30 ml-2"></i></th>
                      </tr>
                   </thead>
                   <tbody className="bg-white">
                      {loading && clinics.length === 0 ? (
                         <tr>
                           <td colSpan={4} className="py-20 text-center">
                             <i className="fa-solid fa-spinner fa-spin text-cyan-600 text-3xl"></i>
                             <p className="mt-4 text-gray-400 font-bold uppercase tracking-widest text-[11px]">Synchronizing Records...</p>
                           </td>
                         </tr>
                      ) : (filteredList.length > 0) ? (
                         filteredList.map((clinic) => (
                           <tr 
                              key={clinic.id} 
                              onDoubleClick={() => handleDoubleClick(clinic)}
                              className={`border-b hover:bg-cyan-50 transition-colors cursor-pointer group ${editingId === clinic.id ? 'bg-orange-50 ring-1 ring-inset ring-orange-200' : ''}`}
                           >
                              <td className="px-6 py-4 border-r text-gray-500 font-mono text-[11px] group-hover:text-cyan-700">{clinic.id}</td>
                              <td className="px-6 py-4 border-r font-bold text-gray-800 group-hover:text-cyan-800 uppercase tracking-tight">{clinic.name}</td>
                              <td className="px-6 py-4 border-r font-black text-blue-900 uppercase text-[11px] tracking-wider">{clinic.department || '-'}</td>
                              <td className="px-6 py-4 text-gray-500 italic text-[12px]">
                                {formatFlags(clinic)}
                              </td>
                           </tr>
                         ))
                      ) : (
                         <tr>
                           <td colSpan={4} className="py-32 text-center text-gray-400 font-medium italic uppercase tracking-[0.2em] opacity-50 select-none">
                             {loading ? 'Synchronizing...' : 'No clinical data matches your search'}
                           </td>
                         </tr>
                      )}
                   </tbody>
                </table>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const DropdownItem: React.FC<{ label: string }> = ({ label }) => (
  <div className="px-6 py-2 text-[13px] text-gray-700 font-medium hover:bg-cyan-50 hover:text-cyan-700 cursor-pointer transition-all border-b border-gray-50 last:border-0">
     {label}
  </div>
);

const TableActionBtn: React.FC<{ label: string }> = ({ label }) => (
  <button className="border border-gray-300 bg-white px-3 py-1 text-[11px] text-gray-600 rounded-sm hover:bg-gray-50 shadow-xs uppercase font-bold tracking-tight transition-colors">
     {label}
  </button>
);
