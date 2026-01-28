
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

interface VitalsConfigProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const VitalsConfig: React.FC<VitalsConfigProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [vitals, setVitals] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const initialForm = {
    name: '',
    lower_limit: '',
    upper_limit: '',
    formula: '',
    vital_type: 'Other',
    units: '',
    allow_multiple_captures: false
  };

  const [formData, setFormData] = useState(initialForm);
  const isMounted = useRef(true);

  const fetchVitals = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('config_vitals')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) {
        throw error;
      } else {
        if (isMounted.current) setVitals(data || []);
      }
    } catch (err: any) {
      console.error("Fetch Vitals Error:", err.message);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    fetchVitals();
    return () => { isMounted.current = false; };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSave = async () => {
    if (!formData.name) {
      alert("Please enter a vital name.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: formData.name.trim(),
        lower_limit: formData.lower_limit || null,
        upper_limit: formData.upper_limit || null,
        formula: formData.formula || null,
        vital_type: formData.vital_type,
        units: formData.units || null,
        allow_multiple_captures: formData.allow_multiple_captures
      };

      if (editingId) {
        const { error } = await supabase
          .from('config_vitals')
          .update(payload)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('config_vitals')
          .insert([payload]);
        if (error) throw error;
      }

      setFormData(initialForm);
      setEditingId(null);
      await fetchVitals();
      
      setShowSuccess(true);
      setTimeout(() => { if (isMounted.current) setShowSuccess(false); }, 4000);
    } catch (err: any) {
      alert("Database Action Failed: " + err.message);
    } finally {
      if (isMounted.current) setSaving(false);
    }
  };

  const handleDoubleClick = (vital: any) => {
    setFormData({
      name: vital.name || '',
      lower_limit: vital.lower_limit || '',
      upper_limit: vital.upper_limit || '',
      formula: vital.formula || '',
      vital_type: vital.vital_type || 'Other',
      units: vital.units || '',
      allow_multiple_captures: vital.allow_multiple_captures ?? false
    });
    setEditingId(vital.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredList = vitals.filter(v => 
    (v.name || '').toLowerCase().includes(searchTerm.toLowerCase())
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
              <p className="text-[11px] font-bold opacity-90 leading-tight">The vital parameter has been successfully updated.</p>
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
          <span className="text-[#43939e]">Vitals</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#43939e] cursor-pointer hover:underline font-bold">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Main Form Area */}
      <div className="bg-white flex flex-col mt-0.5 border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2.5 bg-white border-b border-gray-100">
          <h2 className="text-[17px] text-gray-700 font-normal">General Examinations (Vitals)</h2>
        </div>

        <div className="p-6 bg-[#eef5f6]">
           <div className="grid grid-cols-12 gap-x-10 gap-y-5 items-end">
              {/* Row 1 */}
              <div className="col-span-4 flex flex-col gap-1.5">
                 <label className="text-[13px] font-bold text-gray-600">Name</label>
                 <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-sm" 
                 />
              </div>

              <div className="col-span-2 flex flex-col gap-1.5">
                 <label className="text-[13px] font-bold text-gray-600">Lower Limit</label>
                 <input 
                    type="text" 
                    name="lower_limit"
                    value={formData.lower_limit}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-sm" 
                 />
              </div>

              <div className="col-span-2 flex flex-col gap-1.5">
                 <label className="text-[13px] font-bold text-gray-600">Upper Limit</label>
                 <input 
                    type="text" 
                    name="upper_limit"
                    value={formData.upper_limit}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-sm" 
                 />
              </div>

              <div className="col-span-4 flex flex-col gap-1.5">
                 <label className="text-[13px] font-bold text-gray-600 flex items-center gap-1.5">
                    Formula <i className="fa-solid fa-question-circle text-blue-500 text-[14px] cursor-help"></i>
                 </label>
                 <input 
                    type="text" 
                    name="formula"
                    value={formData.formula}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-sm" 
                 />
              </div>

              {/* Row 2 */}
              <div className="col-span-4 flex flex-col gap-1.5">
                 <label className="text-[13px] font-bold text-gray-600">Type</label>
                 <div className="relative">
                    <select 
                        name="vital_type"
                        value={formData.vital_type}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 appearance-none text-green-700 font-bold cursor-pointer shadow-sm"
                    >
                        <option value="Other">Other</option>
                        <option value="General">General</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                    </div>
                 </div>
              </div>

              <div className="col-span-4 flex flex-col gap-1.5">
                 <label className="text-[13px] font-bold text-gray-600">Units</label>
                 <input 
                    type="text" 
                    name="units"
                    value={formData.units}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-sm" 
                 />
              </div>

              <div className="col-span-3 flex items-center gap-3 pb-2">
                 <input 
                   type="checkbox" 
                   id="allow_multiple_captures" 
                   name="allow_multiple_captures"
                   checked={formData.allow_multiple_captures}
                   onChange={handleInputChange}
                   className="w-5 h-5 rounded border-gray-300 text-[#17a2b8] focus:ring-[#17a2b8] cursor-pointer shadow-xs" 
                 />
                 <label htmlFor="allow_multiple_captures" className="text-[14px] text-gray-800 font-bold cursor-pointer">Allow Multiple Captures</label>
              </div>

              <div className="col-span-1 flex justify-end pb-1.5">
                 <button 
                   onClick={handleSave}
                   disabled={saving}
                   className="bg-[#17a2b8] text-white w-11 h-11 rounded flex items-center justify-center shadow-lg transition-all active:scale-95 disabled:bg-gray-300 hover:bg-[#138496]"
                 >
                    {saving ? <i className="fa-solid fa-spinner fa-spin"></i> : (editingId ? <span className="text-[9px] font-black tracking-tighter">UPDATE</span> : <i className="fa-solid fa-plus text-xl"></i>)}
                 </button>
              </div>
           </div>
        </div>

        {/* View Section */}
        <div className="border-t border-gray-200">
           <div className="px-4 py-2.5 bg-[#f0f4f5] border-b border-gray-200 flex items-center justify-between">
             <h2 className="text-[16px] font-medium text-gray-700">View: Vitals (General Examinations)</h2>
             <div className="flex items-center gap-3">
                 <span className="text-[14px] font-medium text-gray-500">Search:</span>
                 <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-1.5 text-[14px] outline-none w-[260px] bg-white focus:ring-1 focus:ring-cyan-500 shadow-xs" 
                 />
              </div>
           </div>
           
           <div className="p-0 bg-white">
              <div className="overflow-x-auto min-h-[450px] custom-scrollbar shadow-inner bg-white">
                <table className="w-full text-left text-[14px] whitespace-nowrap">
                   <thead className="bg-[#f8f9fa] text-gray-500 border-b border-gray-200 font-bold">
                      <tr>
                         <th className="px-6 py-3 border-r border-gray-200/60 group">
                            <div className="flex items-center justify-between uppercase text-[11px] tracking-widest">
                               Name <i className="fa-solid fa-arrows-up-down text-[10px] opacity-20 group-hover:opacity-100 transition-opacity"></i>
                            </div>
                         </th>
                         <th className="px-6 py-3 border-r border-gray-200/60 group">
                            <div className="flex items-center justify-between uppercase text-[11px] tracking-widest">
                               Lower Limit <i className="fa-solid fa-arrows-up-down text-[10px] opacity-20 group-hover:opacity-100 transition-opacity"></i>
                            </div>
                         </th>
                         <th className="px-6 py-3 border-r border-gray-200/60 group">
                            <div className="flex items-center justify-between uppercase text-[11px] tracking-widest">
                               Upper Limit <i className="fa-solid fa-arrows-up-down text-[10px] opacity-20 group-hover:opacity-100 transition-opacity"></i>
                            </div>
                         </th>
                         <th className="px-6 py-3 border-r border-gray-200/60 group">
                            <div className="flex items-center justify-between uppercase text-[11px] tracking-widest">
                               Units <i className="fa-solid fa-arrows-up-down text-[10px] opacity-20 group-hover:opacity-100 transition-opacity"></i>
                            </div>
                         </th>
                         <th className="px-6 py-3 group">
                            <div className="flex items-center justify-between uppercase text-[11px] tracking-widest">
                               Formula <i className="fa-solid fa-arrows-up-down text-[10px] opacity-20 group-hover:opacity-100 transition-opacity"></i>
                            </div>
                         </th>
                      </tr>
                   </thead>
                   <tbody className="bg-white">
                      {loading && vitals.length === 0 ? (
                         <tr>
                           <td colSpan={5} className="py-24 text-center">
                             <i className="fa-solid fa-spinner fa-spin text-cyan-600 text-4xl"></i>
                             <p className="mt-4 text-gray-400 font-bold uppercase tracking-widest text-[11px]">Synchronizing clinical data...</p>
                           </td>
                         </tr>
                      ) : (filteredList.length > 0) ? (
                         filteredList.map((vital) => (
                           <tr 
                              key={vital.id} 
                              onDoubleClick={() => handleDoubleClick(vital)}
                              className={`border-b border-gray-100 hover:bg-cyan-50/40 transition-colors cursor-pointer group ${editingId === vital.id ? 'bg-orange-50 ring-1 ring-inset ring-orange-200' : ''}`}
                           >
                              <td className="px-6 py-3.5 border-r border-gray-100 font-medium text-gray-800">{vital.name}</td>
                              <td className="px-6 py-3.5 border-r border-gray-100 text-gray-700">{vital.lower_limit || '-'}</td>
                              <td className="px-6 py-3.5 border-r border-gray-100 text-gray-700">{vital.upper_limit || '-'}</td>
                              <td className="px-6 py-3.5 border-r border-gray-100 text-gray-700 font-bold text-blue-900">{vital.units || '-'}</td>
                              <td className="px-6 py-3.5 text-gray-400 font-mono text-[12px] truncate max-w-[400px]">
                                {vital.formula}
                              </td>
                           </tr>
                         ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-32 text-center text-gray-400 font-medium italic uppercase tracking-[0.3em] opacity-40 select-none">
                            {loading ? 'Refreshing...' : 'No Parameters Found'}
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
