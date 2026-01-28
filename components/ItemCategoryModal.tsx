
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

interface ItemCategoryModalProps {
  onClose: () => void;
}

export const ItemCategoryModal: React.FC<ItemCategoryModalProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({ 
    name: '', 
    code: '', 
    department: '', 
    description: '' 
  });
  
  const isMounted = useRef(true);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('config_item_categories')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) throw error;
      if (isMounted.current) setCategories(data || []);
    } catch (err: any) {
      console.error("Fetch Categories Error:", err.message);
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
    fetchCategories();
    fetchDepartments();
    return () => { isMounted.current = false; };
  }, []);

  const handleSave = async () => {
    if (!formData.name) {
      alert("Please enter a category name.");
      return;
    }
    
    setSaving(true);
    try {
      const payload = {
        name: formData.name.trim(),
        code: formData.code.trim(),
        department: formData.department,
        description: formData.description.trim()
      };

      if (editingId) {
        const { error } = await supabase
          .from('config_item_categories')
          .update(payload)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('config_item_categories')
          .insert([payload]);
        if (error) throw error;
      }

      setFormData({ name: '', code: '', department: '', description: '' });
      setEditingId(null);
      await fetchCategories();

      setShowSuccess(true);
      setTimeout(() => { if (isMounted.current) setShowSuccess(false); }, 4000);
      
    } catch (err: any) {
      alert("Database Operation Failed: " + err.message);
    } finally {
      if (isMounted.current) setSaving(false);
    }
  };

  const handleDoubleClick = (item: any) => {
    setFormData({ 
      name: item.name || '', 
      code: item.code || '',
      department: item.department || '', 
      description: item.description || '' 
    });
    setEditingId(item.id);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[7000] flex items-center justify-center p-4 backdrop-blur-sm">
      
      {/* Premium Emerald Pulse Notification Inside Modal */}
      {showSuccess && (
        <div className="absolute top-4 right-6 z-[8000] animate-in slide-in-from-top-4 duration-300 pointer-events-auto">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-4 border border-white/20 min-w-[280px]">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0 shadow-inner">
              <i className="fa-solid fa-check text-md animate-pulse"></i>
            </div>
            <div className="flex-1">
              <h3 className="font-black text-[12px] uppercase tracking-wider leading-none mb-1">Update Success</h3>
              <p className="text-[10px] font-bold opacity-90 leading-tight">Item category has been saved.</p>
            </div>
            <button onClick={() => setShowSuccess(false)} className="text-white/40 hover:text-white transition-colors p-1">
              <i className="fa-solid fa-times text-xs"></i>
            </button>
          </div>
        </div>
      )}

      <div className="bg-white w-full max-w-[750px] rounded shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="bg-[#e9eaf2] px-6 py-3 flex items-center justify-between border-b shadow-sm">
          <h3 className="text-[18px] text-[#4a4a7d] font-normal uppercase tracking-tight">Item Categories</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <i className="fa-solid fa-times text-lg"></i>
          </button>
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Name</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                className="border border-gray-300 rounded-lg px-3 py-2 text-[14px] outline-none shadow-xs focus:ring-1 focus:ring-cyan-500 bg-white font-medium" 
                placeholder="Category name..."
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Code</label>
              <input 
                type="text" 
                value={formData.code} 
                onChange={(e) => setFormData({...formData, code: e.target.value})} 
                className="border border-gray-300 rounded-lg px-3 py-2 text-[14px] outline-none shadow-xs focus:ring-1 focus:ring-cyan-500 bg-white font-medium" 
                placeholder="Database code..."
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Department</label>
              <select 
                value={formData.department} 
                onChange={(e) => setFormData({...formData, department: e.target.value})} 
                className="border border-gray-300 rounded-lg px-3 py-2 text-[14px] outline-none bg-white shadow-xs focus:ring-1 focus:ring-cyan-500 text-green-700 font-bold appearance-none"
              >
                <option value="">--Select Department--</option>
                {departments.map((dept, i) => (
                  <option key={i} value={dept.name}>{dept.name}</option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Description</label>
              <div className="flex gap-4">
                <input 
                  type="text" 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})} 
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-[14px] outline-none shadow-xs focus:ring-1 focus:ring-cyan-500 bg-white font-medium" 
                  placeholder="Notes..."
                />
                <button 
                  onClick={handleSave} 
                  disabled={saving} 
                  className={`bg-[#17a2b8] text-white w-12 h-10 rounded-lg flex items-center justify-center hover:bg-[#138496] shadow-lg transition-all active:scale-95 disabled:bg-gray-300`}
                >
                   {saving ? <i className="fa-solid fa-spinner fa-spin"></i> : (editingId ? <span className="text-[10px] font-black uppercase">Update</span> : <i className="fa-solid fa-plus text-lg"></i>)}
                </button>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-sm overflow-hidden shadow-xs mt-4">
            <div className="bg-[#f8f9fa] px-4 py-2 border-b text-[13px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
               <i className="fa-solid fa-list-ul text-cyan-600"></i>
               View: Item Categories
            </div>
            
            <div className="overflow-y-auto max-h-[350px] custom-scrollbar bg-white">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-[#f8f9fa] text-gray-600 border-b sticky top-0 z-10 shadow-sm">
                  <tr>
                    <th className="px-6 py-2.5 font-bold border-r w-[80px]">No</th>
                    <th className="px-6 py-2.5 font-bold border-r">Name</th>
                    <th className="px-6 py-2.5 font-bold">Code</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading && categories.length === 0 ? (
                    <tr><td colSpan={3} className="py-20 text-center text-gray-400 italic">Fetching categories...</td></tr>
                  ) : categories.length > 0 ? (
                    categories.map((c) => (
                      <tr 
                        key={c.id} 
                        onDoubleClick={() => handleDoubleClick(c)} 
                        className={`hover:bg-cyan-50/50 transition-colors cursor-pointer group ${editingId === c.id ? 'bg-orange-50 ring-1 ring-inset ring-orange-200' : ''}`}
                      >
                        <td className="px-6 py-3 border-r text-gray-500 font-mono text-[11px] group-hover:text-cyan-700">{c.id}</td>
                        <td className="px-6 py-3 border-r font-bold text-gray-800 uppercase tracking-tight">{c.name}</td>
                        <td className="px-6 py-3 font-mono text-gray-400">{c.code || '-'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="py-20 text-center text-gray-400 font-medium italic uppercase tracking-[0.2em] opacity-50 select-none">
                        No item categories found in database
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
