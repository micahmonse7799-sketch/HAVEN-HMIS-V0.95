
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

interface WardBedsProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const WardBeds: React.FC<WardBedsProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [beds, setBeds] = useState<any[]>([]);
  const [showNotification, setShowNotification] = useState<{ visible: boolean; title: string; message: string; type: 'success' | 'error' | 'warning' } | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; id: number | null }>({ x: 0, y: 0, id: null });
  
  const [formData, setFormData] = useState({
    bed_no: '',
    ward: '',
    status: 'Available',
    capacity: '1'
  });

  const isMounted = useRef(true);

  // 3. ID Order: Order by ID ascending
  const fetchBeds = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('config_ward_beds')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) throw error;
      if (isMounted.current) setBeds(data || []);
    } catch (err: any) {
      console.error("Connection Error:", err.message);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    fetchBeds();

    const handleClickOutside = (event: MouseEvent) => {
      setContextMenu({ x: 0, y: 0, id: null });
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => { 
      isMounted.current = false; 
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 1. Fix Connection & 2. Add/Update Logic
  const handleSave = async () => {
    const bedNo = formData.bed_no?.trim();
    const ward = formData.ward;
    
    if (!bedNo || !ward) {
      setShowNotification({
        visible: true,
        title: 'Warning',
        message: 'Please fill in Bed No and select a Ward.',
        type: 'warning'
      });
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        // UPDATE Action
        const { error } = await supabase
          .from('config_ward_beds')
          .update({ 
            bed_no: bedNo, 
            ward: ward, 
            status: formData.status, // Explicitly mapped to 'status' column
            capacity: parseInt(formData.capacity) 
          })
          .eq('id', editingId);

        if (error) throw error;

        setShowNotification({
          visible: true,
          title: 'Updated',
          message: `Bed [${bedNo}] updated successfully!`,
          type: 'success'
        });
      } else {
        // INSERT Logic (Default)
        const { error } = await supabase
          .from('config_ward_beds')
          .insert([{ 
            bed_no: bedNo, 
            ward: ward, 
            status: formData.status, 
            capacity: parseInt(formData.capacity) 
          }]);

        if (error) throw error;

        setShowNotification({
          visible: true,
          title: 'Success',
          message: `Bed [${bedNo}] added successfully!`,
          type: 'success'
        });
      }

      // Reset Form and Mode
      setFormData({
        bed_no: '',
        ward: '',
        status: 'Available',
        capacity: '1'
      });
      setEditingId(null);
      
      // Refresh Data
      await fetchBeds();
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

  // Edit Mode Trigger
  const handleDoubleClick = (bed: any) => {
    setFormData({
      bed_no: bed.bed_no || '',
      ward: bed.ward || '',
      status: bed.status || 'Available',
      capacity: bed.capacity?.toString() || '1'
    });
    setEditingId(bed.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContextMenu = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    setContextMenu({ x: e.pageX, y: e.pageY, id });
  };

  // Delete Logic with Confirmation
  const handleDelete = async () => {
    if (!contextMenu.id) return;
    
    const confirmDelete = window.confirm('Are you sure you want to delete this configuration? This cannot be undone.');
    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from('config_ward_beds')
        .delete()
        .eq('id', contextMenu.id);

      if (error) throw error;

      setShowNotification({
        visible: true,
        title: 'Deleted',
        message: 'Record deleted successfully.',
        type: 'error' 
      });

      // State Reset if deleting the record currently being edited
      if (editingId === contextMenu.id) {
        setEditingId(null);
        setFormData({ bed_no: '', ward: '', status: 'Available', capacity: '1' });
      }

      await fetchBeds();
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    } finally {
      setContextMenu({ x: 0, y: 0, id: null });
    }
  };

  // 3. Automated Search on 'Bed No' or 'Ward'
  const filteredBeds = beds.filter(bed => {
    const search = searchTerm.toLowerCase();
    return (
      (bed.bed_no || '').toLowerCase().includes(search) || 
      (bed.ward || '').toLowerCase().includes(search)
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

      {/* Top Header Bar */}
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
          <span className="text-gray-400 font-medium">Ward Beds</span>
        </div>
      </div>

      {/* Beds Entry Card */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden flex flex-col min-h-[400px]">
        <div className="px-4 py-2 border-b bg-[#e9eaf2]">
          <h2 className="text-[17px] font-normal text-gray-600">Beds</h2>
        </div>

        <div className="p-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 max-w-4xl relative">
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Bed No</label>
                 <input 
                  type="text" 
                  value={formData.bed_no}
                  onChange={(e) => setFormData({...formData, bed_no: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-xs" 
                 />
              </div>
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Ward</label>
                 <select 
                  value={formData.ward}
                  onChange={(e) => setFormData({...formData, ward: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 shadow-xs appearance-none cursor-pointer text-green-700 font-bold"
                 >
                    <option value="">--Select Ward--</option>
                    <option value="Maternity Ward">Maternity Ward</option>
                    <option value="Male Ward">Male Ward</option>
                    <option value="Female Ward">Female Ward</option>
                    <option value="Pediatric Ward">Pediatric Ward</option>
                    <option value="Private Ward">Private Ward</option>
                    <option value="Teresa Ward">Teresa Ward</option>
                 </select>
              </div>
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Bed Status</label>
                 <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 shadow-xs appearance-none cursor-pointer text-green-700 font-bold"
                 >
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Maintenance">Maintenance</option>
                 </select>
              </div>
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Capacity</label>
                 <input 
                  type="number" 
                  value={formData.capacity}
                  onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-xs" 
                 />
              </div>

              <div className="md:col-span-2 flex justify-end mt-2">
                 <button 
                  onClick={handleSave}
                  disabled={saving}
                  className={`${editingId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-[#17a2b8] hover:bg-[#138496]'} text-white h-10 px-6 rounded flex items-center justify-center shadow-lg transition-all active:scale-95 disabled:bg-gray-300 min-w-[50px]`}
                 >
                    {saving ? <i className="fa-solid fa-spinner fa-spin"></i> : (editingId ? <span className="font-bold text-[12px]">UPDATE</span> : <i className="fa-solid fa-plus text-xl"></i>)}
                 </button>
                 {editingId && (
                   <button 
                    onClick={() => { setEditingId(null); setFormData({ bed_no: '', ward: '', status: 'Available', capacity: '1' }); }}
                    className="absolute -top-10 right-0 text-[10px] font-bold text-gray-400 hover:text-red-500 uppercase tracking-widest"
                   >
                     Cancel Edit
                   </button>
                 )}
              </div>
           </div>
        </div>

        {/* View Section */}
        <div className="border-t border-gray-200">
           <div className="px-4 py-2 bg-[#e9eaf2] border-b">
             <h2 className="text-[15px] font-medium text-gray-600">View: Beds</h2>
           </div>
           <div className="p-4 flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                 <div className="flex gap-1">
                    <button className="border border-gray-300 bg-white px-3 py-1 text-[11px] text-gray-600 rounded shadow-xs hover:bg-gray-50 uppercase font-bold tracking-tight">Excel</button>
                    <button className="border border-gray-300 bg-white px-3 py-1 text-[11px] text-gray-600 rounded shadow-xs hover:bg-gray-50 uppercase font-bold tracking-tight">CSV</button>
                    <button className="border border-gray-300 bg-white px-3 py-1 text-[11px] text-gray-600 rounded shadow-xs hover:bg-gray-50 uppercase font-bold tracking-tight">Print</button>
                 </div>
                 <div className="flex items-center gap-2">
                    <button 
                      onClick={fetchBeds}
                      className="bg-white border border-cyan-500 text-cyan-600 px-4 py-1 text-[11px] font-bold rounded shadow-xs hover:bg-cyan-50 transition-colors uppercase tracking-tight mr-4"
                    >
                      View All
                    </button>
                    <span className="text-[13px] text-gray-500 font-medium">Search:</span>
                    <input 
                      type="text" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by Bed No or Ward..."
                      className="border border-gray-300 rounded px-2 py-1 text-[13px] outline-none w-[220px] focus:ring-1 focus:ring-cyan-500 shadow-sm" 
                    />
                 </div>
              </div>

              <div className="border border-gray-200 rounded-sm overflow-x-auto h-[350px] shadow-inner bg-white custom-scrollbar">
                <table className="w-full text-left text-[13px] whitespace-nowrap">
                   <thead className="bg-[#f8f9fa] text-gray-600 border-b sticky top-0 z-10">
                      <tr>
                         <th className="px-6 py-3 font-bold border-r">ID <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                         <th className="px-6 py-3 font-bold border-r">Bed No <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                         <th className="px-6 py-3 font-bold border-r">Ward <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                         <th className="px-6 py-3 font-bold border-r">Capacity <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                         <th className="px-6 py-3 font-bold">Status <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                      </tr>
                   </thead>
                   <tbody className="bg-white text-gray-700 font-medium">
                      {loading && beds.length === 0 ? (
                        <tr>
                           <td colSpan={5} className="text-center py-20">
                              <i className="fa-solid fa-spinner fa-spin text-cyan-600 text-3xl"></i>
                              <p className="mt-2 text-gray-400 font-medium uppercase tracking-widest text-[11px]">Synchronizing records...</p>
                           </td>
                        </tr>
                      ) : filteredBeds.length > 0 ? (
                        filteredBeds.map((bed) => (
                           <tr 
                             key={bed.id} 
                             onDoubleClick={() => handleDoubleClick(bed)}
                             onContextMenu={(e) => handleContextMenu(e, bed.id)}
                             className={`hover:bg-cyan-50 transition-colors group cursor-pointer ${editingId === bed.id ? 'bg-orange-50 ring-1 ring-orange-200' : ''}`}
                           >
                              <td className="px-6 py-3.5 border-r font-mono text-[11px] text-gray-400">{bed.id}</td>
                              <td className="px-6 py-3.5 border-r font-bold text-gray-800 uppercase tracking-tight">{bed.bed_no}</td>
                              <td className="px-6 py-3.5 border-r font-bold text-blue-800 uppercase">{bed.ward}</td>
                              <td className="px-6 py-3.5 border-r text-gray-600">{bed.capacity}</td>
                              <td className="px-6 py-3.5">
                                 <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                    bed.status === 'Available' ? 'bg-green-100 text-green-700' : 
                                    bed.status === 'Occupied' ? 'bg-blue-100 text-blue-700' : 
                                    'bg-amber-100 text-amber-700'
                                 }`}>
                                    {bed.status}
                                 </span>
                              </td>
                           </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center py-24 text-gray-400 italic font-medium uppercase tracking-[0.2em] opacity-40">
                             {searchTerm ? 'No matching bed records found' : 'No bed records configured'}
                          </td>
                        </tr>
                      )}
                   </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between mt-2">
                 <div className="flex items-center gap-2">
                    <input type="checkbox" id="availableOnly" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer shadow-sm" />
                    <label htmlFor="availableOnly" className="text-[13px] text-gray-700 font-medium cursor-pointer leading-tight uppercase tracking-tight">Show only available beds</label>
                 </div>
                 <div className="text-[12px] text-gray-500 font-medium">Showing {filteredBeds.length} of {beds.length} entries</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
