
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

interface RoomsProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const Rooms: React.FC<RoomsProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [rooms, setRooms] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [showNotification, setShowNotification] = useState<{ visible: boolean; title: string; message: string; type: 'success' | 'error' | 'warning' } | null>(null);
  const [showQuickRef, setShowQuickRef] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; id: number | null }>({ x: 0, y: 0, id: null });
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    room_type: '',
    department: '',
    bind_to_panel: '',
    is_active: true,
    is_entry_point: false
  });

  const isMounted = useRef(true);
  const quickRefRef = useRef<HTMLDivElement>(null);

  // 2. Data Retrieval: Perform a fresh SELECT * query to pull all existing records
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: roomsData, error: roomsError } = await supabase
        .from('config_rooms')
        .select('*')
        .order('id', { ascending: true });
      
      if (roomsError) throw roomsError;
      if (isMounted.current) setRooms(roomsData || []);

      const { data: deptData, error: deptError } = await supabase
        .from('config_departments')
        .select('name')
        .order('name', { ascending: true });
      
      if (deptError) throw deptError;
      if (isMounted.current) setDepartments(deptData || []);

    } catch (err: any) {
      console.error("Connection Error:", err.message);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    fetchData();

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
    const roomName = formData.name?.trim();
    
    if (!roomName) {
      setShowNotification({
        visible: true,
        title: 'Input Required',
        message: 'Please enter a name.',
        type: 'warning'
      });
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        // UPDATE
        const { error } = await supabase
          .from('config_rooms')
          .update({
            name: roomName,
            category: formData.category,
            description: formData.description,
            room_type: formData.room_type,
            department: formData.department,
            bind_to_panel: formData.bind_to_panel,
            is_active: formData.is_active,
            is_entry_point: formData.is_entry_point
          })
          .eq('id', editingId);

        if (error) throw error;

        setShowNotification({
          visible: true,
          title: 'Updated',
          message: `Room [${roomName}] updated successfully!`,
          type: 'success'
        });
      } else {
        // INSERT
        const { error } = await supabase
          .from('config_rooms')
          .insert([{
            name: roomName,
            category: formData.category,
            description: formData.description,
            room_type: formData.room_type,
            department: formData.department,
            bind_to_panel: formData.bind_to_panel,
            is_active: formData.is_active,
            is_entry_point: formData.is_entry_point
          }]);

        if (error) throw error;

        setShowNotification({
          visible: true,
          title: 'Success',
          message: `Room [${roomName}] added successfully!`,
          type: 'success'
        });
      }

      setFormData({
        name: '', category: '', description: '', room_type: '',
        department: '', bind_to_panel: '', is_active: true, is_entry_point: false
      });
      setEditingId(null);
      setSearchTerm('');
      await fetchData();
      
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

  const handleDoubleClick = (room: any) => {
    setFormData({
      name: room.name || '',
      category: room.category || '',
      description: room.description || '',
      room_type: room.room_type || '',
      department: room.department || '',
      bind_to_panel: room.bind_to_panel || '',
      is_active: room.is_active ?? true,
      is_entry_point: room.is_entry_point ?? false
    });
    setEditingId(room.id);
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
        .from('config_rooms')
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
        setFormData({ name: '', category: '', description: '', room_type: '', department: '', bind_to_panel: '', is_active: true, is_entry_point: false });
      }

      await fetchData();
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    } finally {
      setContextMenu({ x: 0, y: 0, id: null });
    }
  };

  const filteredRooms = rooms.filter(room => {
    const search = searchTerm.toLowerCase();
    return (
      (room.name || '').toLowerCase().includes(search) || 
      (room.category || '').toLowerCase().includes(search) ||
      (room.department || '').toLowerCase().includes(search)
    );
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
          <span className="text-gray-400 font-medium">Rooms</span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden flex flex-col">
        <div className="px-4 py-3 border-b bg-white">
          <h2 className="text-[20px] font-normal text-gray-600">Rooms</h2>
        </div>

        <div className="p-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 max-w-6xl relative">
              <div className="flex flex-col gap-2">
                 <label className="text-[13px] font-bold text-gray-600 uppercase tracking-tight">Name</label>
                 <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                    placeholder="Room Name..."
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-[15px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-inner transition-all" 
                 />
              </div>

              <div className="flex flex-col gap-2">
                 <label className="text-[13px] font-bold text-gray-600 uppercase tracking-tight">Category</label>
                 <input 
                    type="text" 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder="Category..."
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-[15px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-inner transition-all" 
                 />
              </div>

              <div className="flex flex-col gap-2">
                 <label className="text-[13px] font-bold text-gray-600 uppercase tracking-tight">Room Type</label>
                 <select 
                    value={formData.room_type}
                    onChange={(e) => setFormData({...formData, room_type: e.target.value})}
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-[15px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 appearance-none text-green-700 font-bold cursor-pointer"
                  >
                     <option value="">--Select Type--</option>
                     <option value="OPD Room">OPD Room</option>
                     <option value="Inpatient Room">Inpatient Room</option>
                     <option value="Theatre">Theatre</option>
                  </select>
              </div>

              <div className="flex flex-col gap-2">
                 <label className="text-[13px] font-bold text-gray-600 uppercase tracking-tight">Description</label>
                 <input 
                    type="text" 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Brief description..."
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-[15px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-inner transition-all" 
                 />
              </div>

              <div className="flex flex-col gap-2">
                 <label className="text-[13px] font-bold text-gray-600 uppercase tracking-tight">Department</label>
                 <select 
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-[15px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 appearance-none text-green-700 font-bold cursor-pointer"
                  >
                     <option value="">--Select Department--</option>
                     {departments.map((dept, i) => (
                       <option key={i} value={dept.name}>{dept.name}</option>
                     ))}
                  </select>
              </div>

              <div className="flex flex-col gap-2">
                 <label className="text-[13px] font-bold text-gray-600 uppercase tracking-tight">Bind to panel</label>
                 <select 
                    value={formData.bind_to_panel}
                    onChange={(e) => setFormData({...formData, bind_to_panel: e.target.value})}
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-[15px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 appearance-none text-green-700 font-bold cursor-pointer"
                  >
                     <option value="">--Select Panel--</option>
                     <option value="Doctor">Doctor</option>
                     <option value="Triage">Triage</option>
                     <option value="Laboratory">Laboratory</option>
                     <option value="Pharmacy">Pharmacy</option>
                     <option value="Theatre">Theatre</option>
                  </select>
              </div>

              <div className="flex items-center gap-12 mt-4 md:col-span-2">
                 <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="active" 
                      checked={formData.is_active}
                      onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                      className="w-4 h-4 rounded border-gray-300 text-[#17a2b8] focus:ring-[#17a2b8]" 
                    />
                    <label htmlFor="active" className="text-[14px] text-gray-700 font-bold">Is Active</label>
                 </div>
                 <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="entry" 
                      checked={formData.is_entry_point}
                      onChange={(e) => setFormData({...formData, is_entry_point: e.target.checked})}
                      className="w-4 h-4 rounded border-gray-300 text-[#17a2b8] focus:ring-[#17a2b8]" 
                    />
                    <label htmlFor="entry" className="text-[14px] text-gray-700 font-bold">Is Entry Point (Where Queue Begins)</label>
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
                    onClick={() => { setEditingId(null); setFormData({ name: '', category: '', description: '', room_type: '', department: '', bind_to_panel: '', is_active: true, is_entry_point: false }); }}
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
             <h2 className="text-[16px] font-medium text-gray-600">View: Rooms</h2>
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
                      View All Rooms
                    </button>

                    {showQuickRef && (
                      <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 shadow-2xl rounded-sm z-[1000] p-4 animate-in zoom-in-95 duration-100 max-h-80 overflow-y-auto custom-scrollbar">
                        <div className="text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 mb-3">Master Rooms List</div>
                        <div className="flex flex-col gap-1.5">
                          {rooms.map((r) => (
                            <div key={r.id} className="text-[13px] font-bold text-gray-700 hover:text-cyan-600 cursor-default flex items-center gap-3 px-2 py-1 rounded hover:bg-cyan-50/50 transition-all border-b border-gray-50 last:border-0">
                              <span className="text-[10px] text-gray-300 w-6 shrink-0">{r.id}.</span>
                              <span className="flex-1 truncate">{r.name}</span>
                              <span className="text-[10px] text-gray-400 uppercase">{r.department}</span>
                            </div>
                          ))}
                          {rooms.length === 0 && <span className="text-[12px] text-gray-400 italic">No rooms configured</span>}
                        </div>
                      </div>
                    )}

                    <span className="text-[14px] text-gray-500 font-medium ml-4">Search:</span>
                    <input 
                      type="text" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search rooms..."
                      className="border border-gray-300 rounded-md px-3 py-1.5 text-[14px] outline-none w-[260px] focus:ring-1 focus:ring-cyan-500 shadow-sm" 
                    />
                 </div>
              </div>

              <div className="border border-gray-200 rounded-sm overflow-hidden bg-white shadow-inner min-h-[300px]">
                <table className="w-full text-left text-[14px] whitespace-nowrap">
                   <thead className="bg-white text-gray-600 border-b">
                      <tr className="bg-gray-50/30">
                         <th className="px-6 py-3 font-bold border-r w-[80px]">
                            ID <i className="fa-solid fa-arrows-up-down text-[10px] ml-2 opacity-30 cursor-pointer"></i>
                         </th>
                         <th className="px-6 py-3 font-bold border-r">
                            Name <i className="fa-solid fa-arrows-up-down text-[10px] ml-2 opacity-30 cursor-pointer"></i>
                         </th>
                         <th className="px-6 py-3 font-bold border-r">
                            Category <i className="fa-solid fa-arrows-up-down text-[10px] ml-2 opacity-30 cursor-pointer"></i>
                         </th>
                         <th className="px-6 py-3 font-bold">
                            Department <i className="fa-solid fa-arrows-up-down text-[10px] ml-2 opacity-30 cursor-pointer"></i>
                         </th>
                         <th className="px-6 py-3 font-bold">
                            Flags <i className="fa-solid fa-arrows-up-down text-[10px] ml-2 opacity-30 cursor-pointer"></i>
                         </th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                      {loading && rooms.length === 0 ? (
                        <tr>
                           <td colSpan={5} className="text-center py-20">
                              <i className="fa-solid fa-spinner fa-spin text-cyan-600 text-3xl"></i>
                              <p className="mt-2 text-gray-400 font-medium">Synchronizing records...</p>
                           </td>
                        </tr>
                      ) : filteredRooms.length > 0 ? (
                        filteredRooms.map((room) => (
                           <tr 
                             key={room.id} 
                             onDoubleClick={() => handleDoubleClick(room)}
                             onContextMenu={(e) => handleContextMenu(e, room.id)}
                             className={`hover:bg-cyan-50 transition-colors group cursor-pointer ${editingId === room.id ? 'bg-orange-50 ring-1 ring-orange-200' : ''}`}
                           >
                              <td className="px-6 py-3.5 border-r font-medium text-gray-700">{room.id}</td>
                              <td className="px-6 py-3.5 border-r font-black text-gray-800 uppercase tracking-tight">{room.name}</td>
                              <td className="px-6 py-3.5 border-r font-medium text-gray-600">{room.category || '-'}</td>
                              <td className="px-6 py-3.5 border-r font-bold text-cyan-700">{room.department || '-'}</td>
                              <td className="px-6 py-3.5 text-gray-600">
                                 <div className="flex gap-2">
                                   {room.is_active && <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-widest">Active</span>}
                                   {room.is_entry_point && <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-widest">Entry Point</span>}
                                   {room.bind_to_panel && <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-widest">Bound: {room.bind_to_panel}</span>}
                                 </div>
                              </td>
                           </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center py-24 text-gray-400 italic font-medium uppercase tracking-[0.2em] opacity-40">
                             {searchTerm ? 'No matching room records found' : 'No room records found'}
                          </td>
                        </tr>
                      )}
                   </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center mt-2 text-[12px] text-gray-500">
                 <span>Showing {filteredRooms.length} of {rooms.length} rooms</span>
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
