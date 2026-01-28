
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

interface ItemClassModalProps {
  onClose: () => void;
}

export const ItemClassModal: React.FC<ItemClassModalProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [classes, setClasses] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '', class_type: '' });
  const isMounted = useRef(true);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('config_item_classes').select('*').order('id', { ascending: true });
      if (error) throw error;
      if (isMounted.current) setClasses(data || []);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    fetchClasses();
    return () => { isMounted.current = false; };
  }, []);

  const handleSave = async () => {
    if (!formData.name) return;
    setSaving(true);
    try {
      if (editingId) {
        await supabase.from('config_item_classes').update(formData).eq('id', editingId);
      } else {
        await supabase.from('config_item_classes').insert([formData]);
      }
      setFormData({ name: '', description: '', class_type: '' });
      setEditingId(null);
      await fetchClasses();
    } catch (err: any) {
      alert(err.message);
    } finally {
      if (isMounted.current) setSaving(false);
    }
  };

  const handleDoubleClick = (item: any) => {
    setFormData({ name: item.name, description: item.description || '', class_type: item.class_type || '' });
    setEditingId(item.id);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[7000] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-[600px] rounded shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[85vh]">
        <div className="bg-[#e9eaf2] px-6 py-3 flex items-center justify-between border-b">
          <h3 className="text-[18px] text-[#4a4a7d] font-normal uppercase tracking-tight">Item Class</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><i className="fa-solid fa-times text-lg"></i></button>
        </div>
        <div className="p-8 overflow-y-auto custom-scrollbar flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-bold text-gray-700">Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="border border-green-400 rounded-lg px-3 py-1.5 text-[14px] outline-none" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-bold text-gray-700">Class Type</label>
              <select value={formData.class_type} onChange={(e) => setFormData({...formData, class_type: e.target.value})} className="border border-green-400 rounded-lg px-3 py-1.5 text-[14px] outline-none bg-white">
                <option value="">--Select Type--</option>
                <option value="Drug Class">Drug Class</option>
                <option value="Service Class">Service Class</option>
                <option value="Product Class">Product Class</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 col-span-2">
              <label className="text-[12px] font-bold text-gray-700">Description</label>
              <div className="flex gap-2">
                <input type="text" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="flex-1 border border-green-400 rounded-lg px-3 py-1.5 text-[14px] outline-none" />
                <button onClick={handleSave} disabled={saving} className="bg-[#17a2b8] text-white w-10 h-10 rounded flex items-center justify-center hover:bg-[#138496] shadow-lg">
                   {saving ? <i className="fa-solid fa-spinner fa-spin"></i> : (editingId ? <span className="text-[10px] font-black">UPDATE</span> : <i className="fa-solid fa-plus text-lg"></i>)}
                </button>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-sm overflow-hidden">
            <div className="bg-[#f8f9fa] px-4 py-2 border-b text-[14px] font-medium text-gray-600 uppercase">View: Item Classes</div>
            <div className="p-2 flex gap-1 border-b">
               <button className="border border-gray-300 bg-white px-3 py-0.5 text-[11px] rounded shadow-xs uppercase font-bold">Excel</button>
               <button className="border border-gray-300 bg-white px-3 py-0.5 text-[11px] rounded shadow-xs uppercase font-bold">CSV</button>
               <button className="border border-gray-300 bg-white px-3 py-0.5 text-[11px] rounded shadow-xs uppercase font-bold">Print</button>
            </div>
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                <tr>
                  <th className="px-4 py-2 font-bold border-r w-16">No</th>
                  <th className="px-4 py-2 font-bold">Name</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={2} className="py-10 text-center italic text-gray-400">Loading...</td></tr>
                ) : classes.map((c, i) => (
                  <tr key={c.id} onDoubleClick={() => handleDoubleClick(c)} className={`border-b hover:bg-cyan-50 cursor-pointer ${editingId === c.id ? 'bg-orange-50' : ''}`}>
                    <td className="px-4 py-2 border-r">{i + 1}</td>
                    <td className="px-4 py-2 font-medium">{c.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
