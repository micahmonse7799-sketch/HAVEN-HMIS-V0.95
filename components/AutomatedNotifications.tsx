
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

interface AutomatedNotificationsProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const AutomatedNotifications: React.FC<AutomatedNotificationsProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form mapping as per prompt
  const initialForm = {
    type: '',
    is_active: true,
    users_list: '' // Mapped to users_list column
  };

  const [formData, setFormData] = useState(initialForm);
  const isMounted = useRef(true);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('config_automated_notifications')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) throw error;
      if (isMounted.current) setNotifications(data || []);
    } catch (err: any) {
      console.error("Fetch Notifications Error:", err.message);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    fetchNotifications();
    return () => { isMounted.current = false; };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSave = async () => {
    if (!formData.type) {
      alert("Please select a notification type.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        type: formData.type,
        is_active: formData.is_active,
        users_list: formData.users_list,
        updated_at: new Date().toISOString()
      };

      if (editingId) {
        const { error } = await supabase
          .from('config_automated_notifications')
          .update(payload)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('config_automated_notifications')
          .insert([payload]);
        if (error) throw error;
      }

      setFormData(initialForm);
      setEditingId(null);
      await fetchNotifications();
      
      setShowSuccess(true);
      setTimeout(() => { if (isMounted.current) setShowSuccess(false); }, 4000);
    } catch (err: any) {
      console.error("Database Action Failed: " + err.message);
      alert("Database error: " + err.message);
    } finally {
      if (isMounted.current) setSaving(false);
    }
  };

  const handleDoubleClick = (notif: any) => {
    setFormData({
      type: notif.type || '',
      is_active: notif.is_active ?? true,
      users_list: notif.users_list || ''
    });
    setEditingId(notif.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamically calculate user count for the display
  const getUserCount = (users: string) => {
    if (!users) return 0;
    return users.split(',').filter(u => u.trim().length > 0).length;
  };

  const filteredList = notifications.filter(n => 
    (n.type || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (n.users_list || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-1 animate-in fade-in duration-300 relative min-h-full">
      
      {/* Premium Emerald Pulse Notification */}
      {showSuccess && (
        <div className="fixed top-12 right-6 z-[9000] animate-in slide-in-from-right-8 duration-300 pointer-events-auto">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-4 border border-white/20 min-w-[320px]">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0 shadow-inner">
              <i className="fa-solid fa-check text-xl animate-pulse"></i>
            </div>
            <div className="flex-1">
              <h3 className="font-black text-[13px] uppercase tracking-wider leading-none mb-1">Configuration Saved</h3>
              <p className="text-[11px] font-bold opacity-90 leading-tight">Database synchronized successfully.</p>
            </div>
            <button onClick={() => setShowSuccess(false)} className="text-white/40 hover:text-white transition-colors p-1">
              <i className="fa-solid fa-times text-xs"></i>
            </button>
          </div>
        </div>
      )}

      {/* Top Header Section */}
      <div className="bg-white px-4 py-2 flex items-center justify-between shadow-sm border-b border-gray-100">
        <h1 className="text-[#333] font-bold text-[18px]">Haven Hospital</h1>
        <div className="flex items-center gap-12 text-[14px] text-gray-700">
          <div>Branch: <span className="text-[#43939e] font-medium">Main branch</span></div>
          <div>Room: <span onClick={onOpenRoomModal} className="text-[#43939e] cursor-pointer hover:underline font-medium">{currentRoom}</span></div>
          <button className="bg-[#17a2b8] text-white px-4 py-1.5 rounded-md text-[13px] font-bold uppercase tracking-tight shadow-md">Queue</button>
        </div>
      </div>

      {/* Breadcrumb Row */}
      <div className="bg-[#f8f9fa] border-b border-gray-200 px-4 py-1.5 flex items-center justify-between text-[13px]">
        <div className="flex items-center gap-2">
          <i onClick={onBack} className="fa-solid fa-home text-[#43939e] cursor-pointer text-[14px]"></i>
          <span className="text-gray-300">/</span>
          <div className="flex items-center gap-1 cursor-pointer hover:text-[#43939e]">
             <span className="text-[#43939e]">Configurations</span>
             <i className="fa-solid fa-caret-down text-[10px] text-[#43939e] mt-0.5"></i>
          </div>
          <span className="text-gray-300">/</span>
          <span className="text-[#43939e]">Automated Notifications</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#43939e] cursor-pointer hover:underline font-bold">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Main Configuration Card */}
      <div className="bg-white flex flex-col mt-0.5 border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2.5 bg-white border-b border-gray-100">
          <h2 className="text-[17px] text-gray-700 font-normal">Automated Notifications</h2>
        </div>

        {/* Input Form matching screenshot precisamente */}
        <div className="p-6 bg-[#eef5f6]">
           <div className="flex flex-col gap-6 max-w-5xl">
              {/* Type and Is Active Row */}
              <div className="flex items-end gap-10">
                 <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-[13px] font-bold text-gray-600 uppercase tracking-tight">Type</label>
                    <div className="relative">
                       <select 
                           name="type"
                           value={formData.type}
                           onChange={handleInputChange}
                           className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 appearance-none shadow-xs cursor-pointer font-medium"
                       >
                           <option value="">--Select Type--</option>
                           <option value="Debts due for payment">Debts due for payment</option>
                           <option value="Internal order status change">Internal order status change</option>
                           <option value="Items Below Reorder Level">Items Below Reorder Level</option>
                           <option value="Expiring Batches Alert">Expiring Batches Alert</option>
                       </select>
                       <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                           <i className="fa-solid fa-chevron-down text-xs"></i>
                       </div>
                    </div>
                 </div>
                 <div className="flex items-center gap-2 pb-2">
                    <input 
                      type="checkbox" 
                      id="is_active" 
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-gray-300 text-[#17a2b8] focus:ring-[#17a2b8] cursor-pointer shadow-sm" 
                    />
                    <label htmlFor="is_active" className="text-[13px] text-gray-700 font-bold cursor-pointer uppercase tracking-tight">Is Active</label>
                 </div>
              </div>

              {/* User(s) and Plus Button Row */}
              <div className="flex items-end gap-6">
                 <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-[13px] font-bold text-gray-600 uppercase tracking-tight">User(s)</label>
                    <input 
                        type="text"
                        name="users_list"
                        value={formData.users_list}
                        onChange={handleInputChange}
                        placeholder="Comma separated usernames..."
                        className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-inner font-medium" 
                    />
                 </div>
                 <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-[#17a2b8] text-white w-10 h-10 rounded flex items-center justify-center shadow-lg transition-all active:scale-95 disabled:bg-gray-300 hover:bg-[#138496]"
                 >
                    {saving ? <i className="fa-solid fa-spinner fa-spin text-lg"></i> : (editingId ? <span className="text-[9px] font-black uppercase">Update</span> : <i className="fa-solid fa-plus text-xl"></i>)}
                 </button>
              </div>
           </div>
        </div>

        {/* View Section */}
        <div className="border-t border-gray-200">
           <div className="px-4 py-2.5 bg-[#f0f4f5] border-b border-gray-200 flex items-center justify-between">
             <h2 className="text-[16px] font-medium text-gray-700 uppercase tracking-tight">View: Automated Notifications</h2>
             <div className="flex items-center gap-3">
                 <span className="text-[13px] font-bold text-gray-500 uppercase tracking-tight">Search:</span>
                 <input 
                   type="text" 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none w-[260px] bg-white focus:ring-1 focus:ring-cyan-500 shadow-xs" 
                 />
              </div>
           </div>
           
           <div className="p-0 bg-white">
              <div className="overflow-x-auto min-h-[450px] shadow-inner bg-white custom-scrollbar">
                <table className="w-full text-left text-[13px] whitespace-nowrap">
                   <thead className="bg-[#f8f9fa] text-gray-500 border-b border-gray-200 font-bold sticky top-0">
                      <tr>
                         <th className="px-6 py-3 border-r border-gray-200/60 group">
                            <div className="flex items-center justify-between uppercase text-[11px] tracking-widest">
                               Type <i className="fa-solid fa-arrows-up-down text-[10px] opacity-20"></i>
                            </div>
                         </th>
                         <th className="px-6 py-3 border-r border-gray-200/60 group">
                            <div className="flex items-center justify-between uppercase text-[11px] tracking-widest">
                               Hours <i className="fa-solid fa-arrows-up-down text-[10px] opacity-20"></i>
                            </div>
                         </th>
                         <th className="px-6 py-3 border-r border-gray-200/60 group">
                            <div className="flex items-center justify-between uppercase text-[11px] tracking-widest">
                               Storage Location <i className="fa-solid fa-arrows-up-down text-[10px] opacity-20"></i>
                            </div>
                         </th>
                         <th className="px-6 py-3 border-r border-gray-200/60 group">
                            <div className="flex items-center justify-between uppercase text-[11px] tracking-widest">
                               Is Active? <i className="fa-solid fa-arrows-up-down text-[10px] opacity-20"></i>
                            </div>
                         </th>
                         <th className="px-6 py-3 group">
                            <div className="flex items-center justify-between uppercase text-[11px] tracking-widest">
                               User Count <i className="fa-solid fa-arrows-up-down text-[10px] opacity-20"></i>
                            </div>
                         </th>
                      </tr>
                   </thead>
                   <tbody className="bg-white">
                      {loading && notifications.length === 0 ? (
                         <tr>
                           <td colSpan={5} className="py-32 text-center">
                             <i className="fa-solid fa-spinner fa-spin text-cyan-600 text-4xl"></i>
                             <p className="mt-4 text-gray-400 font-black uppercase tracking-widest text-[11px]">Synchronizing logic...</p>
                           </td>
                         </tr>
                      ) : (filteredList.length > 0) ? (
                         filteredList.map((notif, idx) => (
                           <tr 
                              key={notif.id} 
                              onDoubleClick={() => handleDoubleClick(notif)}
                              className={`border-b border-gray-100 hover:bg-cyan-50/40 transition-colors cursor-pointer group ${editingId === notif.id ? 'bg-orange-50 ring-1 ring-inset ring-orange-200' : ''}`}
                           >
                              <td className="px-6 py-3.5 border-r border-gray-100 text-gray-800 font-bold uppercase tracking-tight">{notif.type}</td>
                              <td className="px-6 py-3.5 border-r border-gray-100 text-gray-500 font-mono">{notif.hours || '-'}</td>
                              <td className="px-6 py-3.5 border-r border-gray-100 text-blue-900 font-black text-[11px] tracking-widest uppercase">{notif.storage_location || '-'}</td>
                              <td className="px-6 py-3.5 border-r border-gray-100">
                                 <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${notif.is_active ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
                                    {notif.is_active ? 'Yes' : 'No'}
                                 </span>
                              </td>
                              <td className="px-6 py-3.5 text-blue-800 font-black text-[14px]">{getUserCount(notif.users_list)}</td>
                           </tr>
                         ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-32 text-center text-gray-300 font-medium italic uppercase tracking-[0.3em] opacity-40 select-none">
                            {loading ? 'Refreshing...' : 'No Automated Rules Found'}
                          </td>
                        </tr>
                      )}
                   </tbody>
                </table>
              </div>
           </div>
        </div>

        {/* Automated Charges Footer Area matching screenshot */}
        <div className="bg-[#f8f9fa] border-t border-gray-200 p-6 min-h-[100px]">
           <h2 className="text-[15px] font-bold text-gray-600 uppercase tracking-tight mb-4 flex items-center gap-2">
              <i className="fa-solid fa-gears text-[#17a2b8]"></i>
              Automated Charges Linked
           </h2>
           <div className="grid grid-cols-12 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-200 pb-2 mb-2">
              <div className="col-span-4">Charge Type</div>
              <div className="col-span-8">Billing Instruction</div>
           </div>
           <div className="text-center py-6 text-gray-300 italic uppercase text-[10px] tracking-widest font-bold">
              No Automated Charges Linked to Current Selection
           </div>
        </div>
      </div>
    </div>
  );
};
