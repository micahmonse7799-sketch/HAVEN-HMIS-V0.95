
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { ServiceInputModal } from './ServiceInputModal';
import { ItemClassModal } from './ItemClassModal';
import { ItemCategoryModal } from './ItemCategoryModal';

interface ServicesProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [services, setServices] = useState<any[]>([]); 
  const [editingId, setEditingId] = useState<number | null>(null); 
  const [filterType, setFilterType] = useState('All Services');
  const [showNotification, setShowNotification] = useState<{ visible: boolean; title: string; message: string; type: 'success' | 'error' | 'warning' } | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; id: number | null }>({ x: 0, y: 0, id: null });
  
  // Modal states
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // Dropdown options states
  const [itemClasses, setItemClasses] = useState<any[]>([]);
  const [itemCategories, setItemCategories] = useState<any[]>([]);

  const initialForm = {
    name: '',
    item_category: '',
    item_code: '',
    rate: '0',
    income_subaccount: '',
    item_class: '',
    expense_subaccount: '',
    vat_type: '',
    other_tax: '',
    is_procedure: false,
    is_examination: false,
    is_theatre_operation: false,
    is_active: true
  };

  const [formData, setFormData] = useState(initialForm);
  const isMounted = useRef(true);

  const fetchDropdownData = async () => {
    try {
      const [classesRes, catsRes] = await Promise.all([
        supabase.from('config_item_classes').select('*').order('name'),
        supabase.from('config_item_categories').select('*').order('name')
      ]);
      if (isMounted.current) {
        setItemClasses(classesRes.data || []);
        setItemCategories(catsRes.data || []);
      }
    } catch (err) {
      console.error("Dropdown fetch error:", err);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    fetchDropdownData();
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

  const fetchFilteredServices = async () => {
    setLoading(true);
    try {
      let query = supabase.from('config_services').select('*').order('id', { ascending: true });

      if (filterType === 'Active Only') query = query.eq('is_active', true);
      if (filterType === 'Inactive Only') query = query.eq('is_active', false);
      if (filterType === 'Lab Test Only') query = query.ilike('item_category', '%lab%');
      if (filterType === 'Procedures Only') query = query.eq('is_procedure', true);
      if (filterType === 'Radiology Examinations Only') query = query.eq('is_examination', true);
      if (filterType === 'Theatre Operations Only') query = query.eq('is_theatre_operation', true);

      const { data, error } = await query;
      if (error) throw error;
      if (isMounted.current) setServices(data || []);
    } catch (err: any) {
      console.error("Filter Error:", err.message);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.name) {
      setShowNotification({ visible: true, title: 'Warning', message: 'Please enter a service name.', type: 'warning' });
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...formData,
        rate: parseFloat(formData.rate) || 0
      };

      if (editingId) {
        const { error } = await supabase
          .from('config_services')
          .update(payload)
          .eq('id', editingId);
        
        if (error) throw error;
        setShowNotification({ visible: true, title: 'Updated', message: 'Service updated successfully!', type: 'success' });
        await fetchFilteredServices();
      } else {
        const { error } = await supabase
          .from('config_services')
          .insert([payload]);
        
        if (error) throw error;
        setShowNotification({ visible: true, title: 'Success', message: 'Service saved successfully!', type: 'success' });
      }

      setFormData(initialForm);
      setEditingId(null);
      setTimeout(() => { if (isMounted.current) setShowNotification(null); }, 4000);
    } catch (err: any) {
      setShowNotification({ visible: true, title: 'Operation Failed', message: err.message, type: 'error' });
    } finally {
      if (isMounted.current) setSaving(false);
    }
  };

  const handleDoubleClick = (service: any) => {
    if (!service.id) {
        setShowNotification({ visible: true, title: 'Error', message: 'Unable to capture record ID.', type: 'error' });
        return;
    }

    setFormData({
      name: service.name || '',
      item_category: service.item_category || '',
      item_code: service.item_code || '',
      rate: service.rate?.toString() || '0',
      income_subaccount: service.income_subaccount || '',
      item_class: service.item_class || '',
      expense_subaccount: service.expense_subaccount || '',
      vat_type: service.vat_type || '',
      other_tax: service.other_tax || '',
      is_procedure: service.is_procedure || false,
      is_examination: service.is_examination || false,
      is_theatre_operation: service.is_theatre_operation || false,
      is_active: service.is_active ?? true
    });
    
    setEditingId(service.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContextMenu = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    setContextMenu({ x: e.pageX, y: e.pageY, id });
  };

  const handleDelete = async () => {
    if (!contextMenu.id) return;
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const { error } = await supabase.from('config_services').delete().eq('id', contextMenu.id);
      if (error) throw error;
      setServices(prev => prev.filter(s => s.id !== contextMenu.id));
      setShowNotification({ visible: true, title: 'Deleted', message: 'Service removed successfully.', type: 'error' });
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    }
  };

  const filteredServicesList = services.filter(s => 
    s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.item_code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenInputItems = () => {
    if (!editingId) {
      setShowNotification({ visible: true, title: 'No Service Selected', message: 'Please select a service to manage its input items.', type: 'warning' });
      return;
    }
    setIsInputModalOpen(true);
  };

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
            <i className="fa-solid fa-trash-can"></i> Delete Service
          </button>
        </div>
      )}

      {/* Toast Notification */}
      {showNotification?.visible && (
        <div className="fixed top-24 right-10 z-[6000] animate-in slide-in-from-right duration-500">
          <div className={`${
            showNotification.type === 'success' ? 'bg-[#5da54f]' : 
            showNotification.type === 'warning' ? 'bg-[#f0ad4e]' : 'bg-[#e51c44]'
          } text-white px-6 py-4 rounded-sm shadow-2xl flex items-center gap-5 min-w-[350px] border-l-[10px] border-black/10`}>
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
        <div className="flex items-center gap-8 text-[13px] text-gray-500">
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
          <span className="text-gray-400 font-medium">Services</span>
        </div>
      </div>

      {/* Service Details Card */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden flex flex-col">
        <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center">
          <h2 className="text-[18px] font-normal text-gray-600 uppercase tracking-tight">Service Details</h2>
        </div>

        <div className="p-6 flex flex-col gap-6">
           <div className="flex items-center gap-2 max-w-sm">
              <div className="flex-1 flex border border-gray-300 rounded shadow-xs overflow-hidden">
                 <div className="bg-[#f0f2f5] px-3 py-1.5 border-r border-gray-200">
                    <i className="fa-solid fa-magnifying-glass text-gray-400 text-xs"></i>
                 </div>
                 <input type="text" placeholder="Search here..." className="flex-1 px-3 py-1.5 text-[13px] outline-none bg-white" />
              </div>
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-1.5 rounded-sm text-[13px] font-medium shadow-xs hover:bg-gray-50">Search</button>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Form Section (9 cols) */}
              <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-5">
                 <div className="flex flex-col gap-5">
                    <InputField label="Name" name="name" value={formData.name} onChange={handleInputChange} />
                    <InputField label="Income SubAccount" name="income_subaccount" value={formData.income_subaccount} onChange={handleInputChange} type="select" />
                    <InputField label="Expense SubAccount" name="expense_subaccount" value={formData.expense_subaccount} onChange={handleInputChange} type="select" />
                 </div>

                 <div className="flex flex-col gap-5">
                    <InputField 
                        label="Item Category" 
                        name="item_category" 
                        value={formData.item_category} 
                        onChange={handleInputChange} 
                        type="select" 
                        options={itemCategories.map(c => c.name)} 
                    />
                    <InputField 
                        label="Item Class" 
                        name="item_class" 
                        value={formData.item_class} 
                        onChange={handleInputChange} 
                        type="select" 
                        options={itemClasses.map(c => c.name)}
                    />
                    <InputField label="VAT Type" name="vat_type" value={formData.vat_type} onChange={handleInputChange} type="select" />
                    <InputField label="Other Tax" name="other_tax" value={formData.other_tax} onChange={handleInputChange} type="select" />
                 </div>

                 <div className="flex flex-col gap-5">
                    <InputField label="Item Code" name="item_code" value={formData.item_code} onChange={handleInputChange} />
                    <div className="flex flex-col gap-1">
                       <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Rate</label>
                       <input 
                         type="number" 
                         name="rate" 
                         value={formData.rate} 
                         onChange={handleInputChange}
                         className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] text-green-700 font-bold text-right outline-none shadow-xs bg-white" 
                       />
                    </div>

                    <div className="flex flex-col gap-3 mt-1">
                       <CheckboxItem label="Is a procedure" name="is_procedure" checked={formData.is_procedure} onChange={handleInputChange} />
                       <CheckboxItem label="Is an Examination" name="is_examination" checked={formData.is_examination} onChange={handleInputChange} />
                       <CheckboxItem label="Is Theatre Operation" name="is_theatre_operation" checked={formData.is_theatre_operation} onChange={handleInputChange} />
                       <CheckboxItem label="Is Active (Visible to users)" name="is_active" checked={formData.is_active} onChange={handleInputChange} />
                    </div>

                    <div className="flex justify-end mt-4">
                       <button 
                         onClick={handleSave}
                         disabled={saving}
                         className={`${editingId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-[#17a2b8] hover:bg-[#138496]'} text-white h-11 px-5 rounded flex items-center justify-center shadow-lg transition-all active:scale-95 disabled:bg-gray-300 min-w-[50px]`}
                       >
                          {saving ? <i className="fa-solid fa-spinner fa-spin"></i> : (editingId ? <span className="text-[11px] font-black tracking-widest">UPDATE</span> : <i className="fa-solid fa-plus text-xl"></i>)}
                       </button>
                    </div>
                 </div>
              </div>

              {/* Sidebar Action Buttons (3 cols) */}
              <div className="lg:col-span-3 flex flex-col gap-2 pt-2">
                 <button className="bg-[#008b8b] text-white py-2 rounded-sm text-[13px] font-medium shadow-sm hover:bg-[#007575] transition-colors">Sync Services</button>
                 <button className="bg-[#008b8b] text-white py-2 rounded-sm text-[13px] font-medium shadow-sm hover:bg-[#007575] transition-colors">Import Services</button>
                 <button className="bg-[#008b8b] text-white py-2 rounded-sm text-[13px] font-medium shadow-sm hover:bg-[#007575] transition-colors">Export Services</button>
                 <div className="flex justify-center py-1 opacity-40"><i className="fa-solid fa-ellipsis-vertical text-gray-400"></i></div>
                 <button onClick={handleOpenInputItems} className="bg-white border border-gray-200 text-gray-700 py-2 rounded-sm text-[11px] font-bold shadow-xs hover:bg-gray-50 transition-colors uppercase">Input Items</button>
                 <button onClick={() => setIsClassModalOpen(true)} className="bg-white border border-gray-200 text-gray-700 py-2 rounded-sm text-[11px] font-bold shadow-xs hover:bg-gray-50 transition-colors uppercase">Item Classes</button>
                 <button onClick={() => setIsCategoryModalOpen(true)} className="bg-white border border-gray-200 text-gray-700 py-2 rounded-sm text-[11px] font-bold shadow-xs hover:bg-gray-50 transition-colors uppercase">Item Categories</button>
              </div>
           </div>
        </div>

        {/* View Section */}
        <div className="border-t border-gray-200">
           <div className="px-6 py-3 bg-[#f8f9fa] border-b">
             <h2 className="text-[16px] font-medium text-gray-600 uppercase tracking-tight">View: Services</h2>
           </div>
           <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                 <div className="flex gap-1.5">
                    <button className="border border-gray-300 bg-white px-4 py-1.5 text-[12px] text-gray-600 rounded-sm hover:bg-gray-50 shadow-xs uppercase font-bold tracking-tight">Excel</button>
                    <button className="border border-gray-300 bg-white px-4 py-1.5 text-[12px] text-gray-600 rounded-sm hover:bg-gray-50 shadow-xs uppercase font-bold tracking-tight">CSV</button>
                    <button className="border border-gray-300 bg-white px-4 py-1.5 text-[12px] text-gray-600 rounded-sm hover:bg-gray-50 shadow-xs uppercase font-bold tracking-tight">Print</button>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-[13px] text-gray-500 font-medium">Search:</span>
                    <input 
                      type="text" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border border-gray-300 rounded px-2.5 py-1.5 text-[13px] outline-none w-[240px] focus:ring-1 focus:ring-cyan-500 shadow-sm" 
                    />
                 </div>
              </div>

              {/* Table Body */}
              <div className="border border-gray-200 rounded-sm overflow-x-auto min-h-[350px] shadow-inner bg-white custom-scrollbar">
                <table className="w-full text-left text-[13px] whitespace-nowrap">
                   <thead className="bg-[#f8f9fa] text-gray-600 border-b sticky top-0 z-10">
                      <tr>
                         <th className="px-6 py-3 font-bold border-r w-[80px]">No</th>
                         <th className="px-6 py-3 font-bold border-r">Name <i className="fa-solid fa-arrows-up-down text-[10px] opacity-30 ml-2"></i></th>
                         <th className="px-6 py-3 font-bold border-r">Category <i className="fa-solid fa-arrows-up-down text-[10px] opacity-30 ml-2"></i></th>
                         <th className="px-6 py-3 font-bold border-r">Code <i className="fa-solid fa-arrows-up-down text-[10px] opacity-30 ml-2"></i></th>
                         <th className="px-6 py-3 font-bold text-right">Rate <i className="fa-solid fa-arrows-up-down text-[10px] opacity-30 ml-2"></i></th>
                      </tr>
                   </thead>
                   <tbody className="bg-white">
                      {loading ? (
                        <tr>
                          <td colSpan={5} className="py-20 text-center">
                            <i className="fa-solid fa-spinner fa-spin text-cyan-600 text-3xl"></i>
                            <p className="mt-4 text-gray-400 font-bold uppercase tracking-widest text-[11px]">Synchronizing...</p>
                          </td>
                        </tr>
                      ) : filteredServicesList.length > 0 ? (
                        filteredServicesList.map((service, idx) => (
                          <tr 
                            key={service.id} 
                            onDoubleClick={() => handleDoubleClick(service)}
                            onContextMenu={(e) => handleContextMenu(e, service.id)}
                            className={`border-b hover:bg-cyan-50 transition-colors cursor-pointer group ${editingId === service.id ? 'bg-orange-50 ring-1 ring-inset ring-orange-200' : ''}`}
                          >
                            <td className="px-6 py-4 border-r text-gray-500 font-mono text-[11px]">{(idx + 1).toString().padStart(3, '0')}</td>
                            <td className="px-6 py-4 border-r font-bold text-gray-800 group-hover:text-cyan-800 uppercase tracking-tight">{service.name}</td>
                            <td className="px-6 py-4 border-r text-gray-600 uppercase text-[11px] font-black tracking-widest">{service.item_category}</td>
                            <td className="px-6 py-4 border-r font-mono text-gray-400">{service.item_code || '-'}</td>
                            <td className="px-6 py-4 text-right font-black text-blue-900 tabular-nums">{service.rate?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-32 text-center text-gray-400 font-medium italic uppercase tracking-[0.2em] opacity-50 select-none">
                            No data available in table
                          </td>
                        </tr>
                      )}
                   </tbody>
                </table>
              </div>
           </div>
        </div>

        {/* Footer Filter Panel */}
        <div className="p-4 border-t border-gray-100 flex items-center gap-4 bg-gray-50/80">
           <span className="text-[13px] font-bold text-gray-700">Filter:</span>
           <div className="relative flex items-center">
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-l px-4 py-2 text-[14px] bg-white outline-none text-green-700 font-black min-w-[280px] shadow-sm appearance-none cursor-pointer"
              >
                 <option value="All Services">All Services</option>
                 <option value="Active Only">Active Only</option>
                 <option value="Inactive Only">Inactive Only</option>
                 <option value="Lab Test Only">Lab Test Only</option>
                 <option value="Procedures Only">Procedures Only</option>
                 <option value="Radiology Examinations Only">Radiology Examinations Only</option>
                 <option value="Theatre Operations Only">Theatre Operations Only</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-green-600">
                 <i className="fa-solid fa-chevron-down text-xs"></i>
              </div>
           </div>
           <button 
             onClick={fetchFilteredServices}
             className="bg-[#5bc0de] text-white px-8 py-2 text-[13px] font-black uppercase tracking-widest rounded shadow-lg hover:bg-[#31b0d5] transition-all active:scale-95 flex items-center gap-2"
           >
              {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-filter"></i>}
              View
           </button>
           <span className="ml-auto text-[11px] font-bold text-gray-400 uppercase tracking-widest">
             Records Displayed: {filteredServicesList.length}
           </span>
        </div>
      </div>

      {isInputModalOpen && editingId && (
        <ServiceInputModal 
            serviceId={editingId}
            serviceName={formData.name}
            onClose={() => setIsInputModalOpen(false)}
        />
      )}

      {isClassModalOpen && (
        <ItemClassModal 
            onClose={() => {
                setIsClassModalOpen(false);
                fetchDropdownData();
            }}
        />
      )}

      {isCategoryModalOpen && (
        <ItemCategoryModal 
            onClose={() => {
                setIsCategoryModalOpen(false);
                fetchDropdownData();
            }}
        />
      )}
    </div>
  );
};

const InputField: React.FC<{ label: string; name: string; value: string; onChange: (e: any) => void; type?: 'text' | 'select'; options?: string[] }> = ({ label, name, value, onChange, type = 'text', options = [] }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">{label}</label>
    {type === 'select' ? (
      <div className="relative">
        <select 
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 appearance-none shadow-xs font-medium"
        >
          <option value=""></option>
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
           <i className="fa-solid fa-chevron-down"></i>
        </div>
      </div>
    ) : (
      <input 
        type="text" 
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-xs font-medium" 
      />
    )}
  </div>
);

const CheckboxItem: React.FC<{ label: string; name: string; checked: boolean; onChange: (e: any) => void }> = ({ label, name, checked, onChange }) => (
  <div className="flex items-center gap-3 group cursor-pointer" onClick={() => onChange({ target: { name, checked: !checked, type: 'checkbox' } })}>
    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${checked ? 'bg-cyan-600 border-cyan-600' : 'bg-white border-gray-300 group-hover:border-cyan-400 shadow-inner'}`}>
      {checked && <i className="fa-solid fa-check text-white text-[10px]"></i>}
    </div>
    <span className={`text-[13px] font-bold transition-colors ${checked ? 'text-cyan-800' : 'text-gray-600 group-hover:text-cyan-600'}`}>{label}</span>
  </div>
);
