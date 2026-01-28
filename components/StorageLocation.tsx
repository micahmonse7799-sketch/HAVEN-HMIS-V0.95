
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

interface StorageLocationProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const StorageLocation: React.FC<StorageLocationProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [locations, setLocations] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showNotification, setShowNotification] = useState<{ visible: boolean; title: string; message: string; type: 'success' | 'error' | 'warning' } | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; id: number | null }>({ x: 0, y: 0, id: null });

  const initialForm = {
    name: '',
    department: '',
    description: '',
    is_optical: false,
    is_selling_point: false,
    is_inpatient_store: false
  };

  const [formData, setFormData] = useState(initialForm);
  const isMounted = useRef(true);

  // 1. & 3. Fix View All & Automated Retrieval: Fetch all records on mount
  const fetchLocations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('config_storage_locations')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) throw error;
      if (isMounted.current) setLocations(data || []);
    } catch (err: any) {
      console.error("Fetch Locations Error:", err.message);
      setShowNotification({ visible: true, title: 'Sync Error', message: 'Failed to retrieve storage locations.', type: 'error' });
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  // 2. Department Dropdown: Fetch from config_departments table
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
    fetchLocations();
    
    const handleClickOutside = () => setContextMenu({ x: 0, y: 0, id: null });
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

  // 4. Save Change & Immediate Refresh Logic
  const handleSave = async () => {
    if (!formData.name) {
      setShowNotification({ visible: true, title: 'Input Required', message: 'Please enter a location name.', type: 'warning' });
      return;
    }

    setSaving(true);
    try {
      // 1. Fix Schema Mapping: Ensure correct column names used in payload
      const payload = {
        name: formData.name.trim(),
        department: formData.department,
        description: formData.description.trim(),
        is_optical: formData.is_optical,
        is_selling_point: formData.is_selling_point,
        is_inpatient_store: formData.is_inpatient_store
      };

      if (editingId) {
        // UPDATE Operation
        const { error } = await supabase
          .from('config_storage_locations')
          .update(payload)
          .eq('id', editingId);
        
        if (error) throw error;
        setShowNotification({ visible: true, title: 'Updated', message: 'Storage location updated successfully!', type: 'success' });
      } else {
        // INSERT Operation
        const { error } = await supabase
          .from('config_storage_locations')
          .insert([payload]);
        
        if (error) throw error;
        setShowNotification({ visible: true, title: 'Success', message: 'New storage location added.', type: 'success' });
      }

      // Reset state back to (+) and clear form
      setFormData(initialForm);
      setEditingId(null);
      
      // Immediately refresh the table view
      await fetchLocations();
      
      setTimeout(() => { if (isMounted.current) setShowNotification(null); }, 4000);
    } catch (err: any) {
      setShowNotification({ visible: true, title: 'Database Error', message: err.message, type: 'error' });
    } finally {
      if (isMounted.current) setSaving(false);
    }
  };

  // 4. Enable Update Feature: Double-Click to populate fields
  const handleDoubleClick = (loc: any) => {
    setFormData({
      name: loc.name || '',
      department: loc.department || '',
      description: loc.description || '',
      is_optical: loc.is_optical || false,
      is_selling_point: loc.is_selling_point || false,
      is_inpatient_store: loc.is_inpatient_store || false
    });
    setEditingId(loc.id);
    // Smooth scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContextMenu = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    setContextMenu({ x: e.pageX, y: e.pageY, id });
  };

  const handleDelete = async () => {
    if (!contextMenu.id) return;
    if (!confirm('Permanently delete this storage location?')) return;
    try {
      const { error } = await supabase.from('config_storage_locations').delete().eq('id', contextMenu.id);
      if (error) throw error;
      setLocations(prev => prev.filter(l => l.id !== contextMenu.id));
      setShowNotification({ visible: true, title: 'Deleted', message: 'Record removed successfully.', type: 'error' });
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    }
  };

  // Build combined flags display string
  const formatFlags = (loc: any) => {
    const active = [];
    if (loc.is_optical) active.push('Is Optical Workshop Store');
    if (loc.is_selling_point) active.push('Is Default Selling Point');
    if (loc.is_inpatient_store) active.push('Is Default Inpatient Store');
    return active.join(' | ');
  };

  const filteredList = locations.filter(l => 
    (l.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.department || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20 relative">
      {/* Context Menu */}
      {contextMenu.id && (
        <div 
          className="fixed z-[7000] bg-white border border-gray-200 shadow-xl rounded py-1 min-w-[150px] animate-in fade-in zoom-in-95 duration-100"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button 
            onClick={handleDelete}
            className="w-full text-left px-4 py-2 text-[13px] text-red-600 font-bold hover:bg-red-50 flex items-center gap-2"
          >
            <i className="fa-solid fa-trash-can"></i> Delete Record
          </button>
        </div>
      )}

      {/* Toast Notification */}
      {showNotification?.visible && (
        <div className="fixed top-24 right-10 z-[6000] animate-in slide-in-from-right duration-500">
          <div className={`${
            showNotification.type === 'success' ? 'bg-[#5da54f]' : 
            showNotification.type === 'warning' ? 'bg-[#f0ad4e]' : 'bg-[#e51c44]'
          } text-white px-6 py-4 rounded-sm shadow-2xl flex items-center gap-5 min-w-[380px] border-l-[10px] border-black/10`}>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <i className={`fa-solid ${
                showNotification.type === 'success' ? 'fa-check-circle' : 
                showNotification.type === 'warning' ? 'fa-circle-exclamation' : 'fa-triangle-exclamation'
              } text-2xl`}></i>
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

      {/* Header Bar */}
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

      {/* Breadcrumbs */}
      <div className="bg-[#f8f9fa] border border-gray-200 rounded-sm px-4 py-1.5 flex items-center justify-between text-[12px]">
        <div className="flex items-center gap-2 text-gray-500">
          <i className="fa-solid fa-home text-blue-500"></i>
          <span className="opacity-50">/</span>
          <span className="text-blue-500 cursor-pointer hover:underline font-medium">Configurations</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Storage Locations</span>
        </div>
      </div>

      {/* Input Form Card */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden flex flex-col">
        <div className="px-4 py-2 border-b bg-[#e9eaf2]">
          <h2 className="text-[17px] font-normal text-gray-600 uppercase tracking-tight">Storage Locations</h2>
        </div>

        <div className="p-8">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-5 items-start">
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Name</label>
                 <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="E.g. Main Pharmacy"
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-xs font-medium" 
                 />
              </div>

              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Department</label>
                 <select 
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 appearance-none shadow-xs font-bold text-green-700 cursor-pointer"
                 >
                    <option value="">--Select Department--</option>
                    {/* 2. Department dropdown population */}
                    {departments.map((d, i) => <option key={i} value={d.name}>{d.name}</option>)}
                 </select>
              </div>

              <div className="flex items-center gap-2 pt-6">
                 {/* 1. Fix Schema Mapping: is_optical */}
                 <input 
                    type="checkbox" 
                    id="is_optical" 
                    name="is_optical"
                    checked={formData.is_optical}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer shadow-sm" 
                 />
                 <label htmlFor="is_optical" className="text-[13px] text-gray-700 font-bold cursor-pointer">Is Optical Workshop Store</label>
              </div>

              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Description</label>
                 <input 
                    type="text" 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Short description..."
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-xs font-medium" 
                 />
              </div>

              <div className="flex flex-col gap-2 pt-2">
                 <div className="flex items-center gap-2">
                    {/* 1. Fix Schema Mapping: is_selling_point */}
                    <input 
                      type="checkbox" 
                      id="is_selling_point" 
                      name="is_selling_point"
                      checked={formData.is_selling_point}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer shadow-sm" 
                    />
                    <label htmlFor="is_selling_point" className="text-[13px] text-gray-700 font-bold cursor-pointer">Is Default Selling Point</label>
                 </div>
                 <div className="flex items-center gap-2">
                    {/* 1. Fix Schema Mapping: is_inpatient_store */}
                    <input 
                      type="checkbox" 
                      id="is_inpatient_store" 
                      name="is_inpatient_store"
                      checked={formData.is_inpatient_store}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer shadow-sm" 
                    />
                    <label htmlFor="is_inpatient_store" className="text-[13px] text-gray-700 font-bold cursor-pointer">Is Default Inpatient Store</label>
                 </div>
              </div>

              <div className="flex justify-end items-end h-full">
                 {/* 4. Toggle Button UI */}
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

        {/* View/List Section */}
        <div className="border-t border-gray-200">
           <div className="px-4 py-2 bg-[#e9eaf2] border-b">
             <h2 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">View: Storage Locations</h2>
           </div>
           <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-1">
                 <div className="flex gap-1.5">
                    <button className="border border-gray-300 bg-white px-3 py-1 text-[11px] text-gray-600 rounded-sm hover:bg-gray-50 shadow-xs uppercase font-bold tracking-tight transition-colors">Excel</button>
                    <button className="border border-gray-300 bg-white px-3 py-1 text-[11px] text-gray-600 rounded-sm hover:bg-gray-50 shadow-xs uppercase font-bold tracking-tight transition-colors">CSV</button>
                    <button className="border border-gray-300 bg-white px-3 py-1 text-[11px] text-gray-600 rounded-sm hover:bg-gray-50 shadow-xs uppercase font-bold tracking-tight transition-colors">Print</button>
                 </div>

                 <div className="flex items-center gap-3">
                    {/* 3. Fix View All Button: fresh fetch */}
                    <button 
                       onClick={fetchLocations}
                       className="bg-white border border-cyan-500 text-cyan-600 px-4 py-1 text-[11px] font-bold rounded shadow-xs hover:bg-cyan-50 transition-colors uppercase tracking-tight"
                    >
                       View All
                    </button>
                    <div className="w-px h-6 bg-gray-200 mx-2"></div>
                    <span className="text-[13px] text-gray-500 font-bold uppercase tracking-tight">Search:</span>
                    <input 
                       type="text" 
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                       placeholder="Search locations or departments..." 
                       className="border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none w-[240px] focus:ring-1 focus:ring-cyan-500 shadow-sm font-medium" 
                    />
                 </div>
              </div>

              {/* Data Table Area */}
              <div className="border border-gray-200 rounded-sm overflow-x-auto min-h-[350px] shadow-inner bg-white custom-scrollbar">
                <table className="w-full text-left text-[13px] whitespace-nowrap">
                   <thead className="bg-[#f8f9fa] text-gray-600 border-b sticky top-0 z-10">
                      <tr>
                         <th className="px-6 py-3 font-bold border-r w-[80px]">No</th>
                         <th className="px-6 py-3 font-bold border-r">Name <i className="fa-solid fa-arrows-up-down text-[10px] opacity-30 ml-2"></i></th>
                         <th className="px-6 py-3 font-bold border-r">Department <i className="fa-solid fa-arrows-up-down text-[10px] opacity-30 ml-2"></i></th>
                         <th className="px-6 py-3 font-bold">Flags <i className="fa-solid fa-arrows-up-down text-[10px] opacity-30 ml-2"></i></th>
                      </tr>
                   </thead>
                   <tbody className="bg-white">
                      {loading ? (
                         <tr>
                           <td colSpan={4} className="py-20 text-center">
                             <i className="fa-solid fa-spinner fa-spin text-cyan-600 text-3xl"></i>
                             <p className="mt-4 text-gray-400 font-bold uppercase tracking-widest text-[11px]">Synchronizing...</p>
                           </td>
                         </tr>
                      ) : (filteredList.length > 0) ? (
                         filteredList.map((loc) => (
                           <tr 
                              key={loc.id} 
                              onDoubleClick={() => handleDoubleClick(loc)}
                              onContextMenu={(e) => handleContextMenu(e, loc.id)}
                              className={`border-b hover:bg-cyan-50 transition-colors cursor-pointer group ${editingId === loc.id ? 'bg-orange-50 ring-1 ring-inset ring-orange-200' : ''}`}
                           >
                              <td className="px-6 py-4 border-r text-gray-500 font-mono text-[11px] group-hover:text-cyan-700">{loc.id}</td>
                              <td className="px-6 py-4 border-r font-bold text-gray-800 group-hover:text-cyan-800 uppercase tracking-tight">{loc.name}</td>
                              <td className="px-6 py-4 border-r font-black text-blue-900 uppercase text-[11px] tracking-wider">{loc.department || '-'}</td>
                              <td className="px-6 py-4 text-gray-500 italic text-[12px]">{formatFlags(loc) || <span className="opacity-20">-</span>}</td>
                           </tr>
                         ))
                      ) : (
                         <tr>
                           <td colSpan={4} className="py-32 text-center text-gray-400 font-medium italic uppercase tracking-[0.2em] opacity-50 select-none">
                             No data available in table
                           </td>
                         </tr>
                      )}
                   </tbody>
                </table>
              </div>
              <div className="flex justify-between items-center text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">
                 <span>Total Records: {filteredList.length}</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
