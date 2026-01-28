
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

interface DepartmentsProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const Departments: React.FC<DepartmentsProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [departments, setDepartments] = useState<any[]>([]);
  const [showNotification, setShowNotification] = useState<{ visible: boolean; title: string; message: string; type: 'success' | 'error' | 'warning' } | null>(null);
  const [showQuickRef, setShowQuickRef] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; id: number | null }>({ x: 0, y: 0, id: null });
  
  const [formData, setFormData] = useState({
    name: '',
    branch: 'Main branch'
  });

  const isMounted = useRef(true);
  const quickRefRef = useRef<HTMLDivElement>(null);

  // 2. Data Retrieval: Perform a fresh SELECT * query to pull all existing records
  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('config_departments')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) throw error;
      if (isMounted.current) setDepartments(data || []);
    } catch (err: any) {
      console.error("Connection Error:", err.message);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    fetchDepartments();

    const handleClickOutside = (event: MouseEvent) => {
      if (quickRefRef.current && !quickRefRef.current.contains(event.target as Node)) {
        setShowQuickRef(false);
      }
      setContextMenu({ x: 0, y: 0, id: null });
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => { 
      isMounted.current = false; 
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 3. Fix Save Action: INSERT/UPDATE logic with RLS disabled
  const handleSave = async () => {
    const deptName = formData.name?.trim();
    
    if (!deptName) {
      setShowNotification({
        visible: true,
        title: 'Warning',
        message: 'Please enter a name.',
        type: 'warning'
      });
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        // UPDATE Logic
        const { error } = await supabase
          .from('config_departments')
          .update({ name: deptName, company_branch: formData.branch })
          .eq('id', editingId);

        if (error) throw error;

        setShowNotification({
          visible: true,
          title: 'Updated',
          message: `Department [${deptName}] updated successfully!`,
          type: 'success'
        });
      } else {
        // INSERT Logic
        const { error } = await supabase
          .from('config_departments')
          .insert([{ name: deptName, company_branch: formData.branch }]);

        if (error) {
          if (error.code === '23505') throw new Error('This department name is already taken.');
          throw error;
        }

        setShowNotification({
          visible: true,
          title: 'Success',
          message: `Department [${deptName}] added successfully!`,
          type: 'success'
        });
      }

      // State Reset
      setFormData({ ...formData, name: '' });
      setEditingId(null);
      setSearchTerm('');
      
      // Immediate Refresh
      await fetchDepartments();
      setTimeout(() => { if (isMounted.current) setShowNotification(null); }, 4000);
    } catch (err: any) {
      setShowNotification({
        visible: true,
        title: 'Operation Failed',
        message: err.message,
        type: 'error'
      });
    } finally {
      if (isMounted.current) setSaving(false);
    }
  };

  const handleDoubleClick = (dept: any) => {
    setFormData({
      name: dept.name,
      branch: dept.company_branch || 'Main branch'
    });
    setEditingId(dept.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContextMenu = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    setContextMenu({ x: e.pageX, y: e.pageY, id });
  };

  // 4. Delete Logic: Direct DELETE command to the database
  const handleDelete = async () => {
    if (!contextMenu.id) return;
    
    const confirmDelete = window.confirm('Are you sure you want to delete this configuration? This cannot be undone.');
    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from('config_departments')
        .delete()
        .eq('id', contextMenu.id);

      if (error) throw error;

      setShowNotification({
        visible: true,
        title: 'Deleted',
        message: 'Record deleted successfully.',
        type: 'error' 
      });

      if (editingId === contextMenu.id) {
        setEditingId(null);
        setFormData({ name: '', branch: 'Main branch' });
      }

      await fetchDepartments();
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    } finally {
      setContextMenu({ x: 0, y: 0, id: null });
    }
  };

  const filteredDepartments = departments.filter(dept => {
    const name = dept.name?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();
    return name.includes(search);
  });

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

      <div className="bg-white rounded-sm h-10 px-4 flex items-center justify-between shadow-sm border border-gray-200">
        <div className="flex items-center gap-3">
          <i onClick={onBack} className="fa-solid fa-times text-gray-400 cursor-pointer hover:text-gray-600 text-xs"></i>
          <h1 className="text-gray-700 font-semibold text-[14px]">Haven MIS</h1>
        </div>
        <div className="flex items-center gap-8 text-[13px] text-gray-500">
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
          <span className="text-gray-400 font-medium">Departments</span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden flex flex-col">
        <div className="px-4 py-3 border-b bg-white">
          <h2 className="text-[20px] font-normal text-gray-600">Departments</h2>
        </div>

        <div className="p-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 max-w-5xl relative">
              <div className="flex flex-col gap-2">
                 <label className="text-[13px] font-bold text-gray-600 uppercase tracking-tight">Name</label>
                 <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                    placeholder="Enter department name..."
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-[15px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-inner transition-all" 
                 />
              </div>

              <div className="flex flex-col gap-2">
                 <label className="text-[13px] font-bold text-gray-600 uppercase tracking-tight">Company Branch</label>
                 <div className="relative">
                    <select 
                      value={formData.branch}
                      onChange={(e) => setFormData({...formData, branch: e.target.value})}
                      className="w-full border border-gray-300 rounded px-4 py-2.5 text-[15px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 appearance-none text-green-700 font-bold cursor-pointer"
                    >
                       <option value="Main branch">Main branch</option>
                       <option value="Satellite A">Satellite A</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-green-600">
                       <i className="fa-solid fa-chevron-down text-xs"></i>
                    </div>
                 </div>
              </div>

              <div className="absolute right-0 bottom-[-10px] md:bottom-[-20px] lg:right-[-40px]">
                 <button 
                   onClick={handleSave}
                   disabled={saving}
                   className={`${editingId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-[#17a2b8] hover:bg-[#138496]'} text-white h-10 px-4 rounded flex items-center justify-center shadow-lg transition-all active:scale-95 disabled:bg-gray-300 min-w-[50px]`}
                 >
                    {saving ? <i className="fa-solid fa-spinner fa-spin"></i> : (editingId ? <span className="font-bold text-[12px]">UPDATE</span> : <i className="fa-solid fa-plus text-xl"></i>)}
                 </button>
                 {editingId && (
                   <button 
                    onClick={() => { setEditingId(null); setFormData({ name: '', branch: 'Main branch' }); }}
                    className="absolute -top-10 right-0 text-[10px] font-bold text-gray-400 hover:text-red-500 uppercase tracking-widest"
                   >
                     Cancel Edit
                   </button>
                 )}
              </div>
           </div>
        </div>

        <div className="border-t border-gray-200">
           <div className="px-6 py-4 bg-[#f0f2f5] border-b">
             <h2 className="text-[16px] font-medium text-gray-600">View: Departments</h2>
           </div>
           
           <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                 <div className="flex gap-1.5">
                    <button className="border border-gray-300 bg-white px-4 py-1.5 text-[12px] text-gray-600 font-bold rounded shadow-xs hover:bg-gray-50 uppercase tracking-tight">Excel</button>
                    <button className="border border-gray-300 bg-white px-4 py-1.5 text-[12px] text-gray-600 font-bold rounded shadow-xs hover:bg-gray-50 uppercase tracking-tight">CSV</button>
                    <button className="border border-gray-300 bg-white px-4 py-1.5 text-[12px] text-gray-600 font-bold rounded shadow-xs hover:bg-gray-50 uppercase tracking-tight">Print</button>
                 </div>
                 <div className="flex items-center gap-3 relative" ref={quickRefRef}>
                    <button 
                      onClick={() => setShowQuickRef(!showQuickRef)}
                      className="bg-white border border-cyan-500 text-cyan-600 px-4 py-1.5 text-[12px] font-bold rounded shadow-xs hover:bg-cyan-50 transition-colors uppercase"
                    >
                      View All Departments
                    </button>

                    {showQuickRef && (
                      <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 shadow-2xl rounded-sm z-[1000] p-4 animate-in zoom-in-95 duration-100 max-h-80 overflow-y-auto custom-scrollbar">
                        <div className="text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 mb-3">Quick Reference List</div>
                        <div className="flex flex-col gap-1.5">
                          {departments.map((d, i) => (
                            <div key={d.id} className="text-[13px] font-bold text-gray-700 hover:text-cyan-600 cursor-default flex items-center gap-3 px-2 py-1 rounded hover:bg-cyan-50/50 transition-all">
                              <span className="text-[10px] text-gray-300 w-4">{i + 1}.</span>
                              {d.name}
                            </div>
                          ))}
                          {departments.length === 0 && <span className="text-[12px] text-gray-400 italic">No departments configured</span>}
                        </div>
                      </div>
                    )}

                    <span className="text-[14px] text-gray-500 font-medium ml-4">Search:</span>
                    <input 
                      type="text" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by Name..."
                      className="border border-gray-300 rounded-md px-3 py-1.5 text-[14px] outline-none w-[260px] focus:ring-1 focus:ring-cyan-500 shadow-sm" 
                    />
                 </div>
              </div>

              <div className="border border-gray-200 rounded-sm overflow-hidden bg-white shadow-inner min-h-[300px]">
                <table className="w-full text-left text-[14px] whitespace-nowrap">
                   <thead className="bg-white text-gray-600 border-b">
                      <tr className="bg-gray-50/30">
                         <th className="px-6 py-3 font-bold border-r w-[180px]">
                            Department ID <i className="fa-solid fa-arrows-up-down text-[10px] ml-2 opacity-30 cursor-pointer"></i>
                         </th>
                         <th className="px-6 py-3 font-bold border-r">
                            Name <i className="fa-solid fa-arrows-up-down text-[10px] ml-2 opacity-30 cursor-pointer"></i>
                         </th>
                         <th className="px-6 py-3 font-bold">
                            DateTime Created <i className="fa-solid fa-arrows-up-down text-[10px] ml-2 opacity-30 cursor-pointer"></i>
                         </th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                      {loading && departments.length === 0 ? (
                        <tr>
                           <td colSpan={3} className="text-center py-20">
                              <i className="fa-solid fa-spinner fa-spin text-cyan-600 text-3xl"></i>
                              <p className="mt-2 text-gray-400 font-medium">Synchronizing records...</p>
                           </td>
                        </tr>
                      ) : filteredDepartments.length > 0 ? (
                        filteredDepartments.map((dept) => (
                           <tr 
                             key={dept.id} 
                             onDoubleClick={() => handleDoubleClick(dept)}
                             onContextMenu={(e) => handleContextMenu(e, dept.id)}
                             className={`hover:bg-cyan-50 transition-colors group cursor-pointer ${editingId === dept.id ? 'bg-orange-50 ring-1 ring-orange-200' : ''}`}
                           >
                              <td className="px-6 py-3.5 border-r font-medium text-gray-700">{dept.id}</td>
                              <td className="px-6 py-3.5 border-r font-medium text-gray-800">{dept.name}</td>
                              <td className="px-6 py-3.5 text-gray-600">
                                 {dept.created_at ? new Date(dept.created_at).toLocaleString('en-US', { 
                                    month: 'short', day: 'numeric', year: 'numeric', 
                                    hour: 'numeric', minute: '2-digit', hour12: true 
                                 }) : '-'}
                              </td>
                           </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="text-center py-24 text-gray-400 italic font-medium uppercase tracking-[0.2em] opacity-40">
                             {searchTerm ? 'No matching department records found' : 'No department records found'}
                          </td>
                        </tr>
                      )}
                   </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center mt-2 text-[12px] text-gray-500">
                 <span>Showing {filteredDepartments.length} of {departments.length} departments</span>
                 <div className="flex gap-2">
                    <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-100 disabled:opacity-30" disabled>Previous</button>
                    <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-100 disabled:opacity-30" disabled>Next</button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
