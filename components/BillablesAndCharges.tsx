
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

interface BillablesAndChargesProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const BillablesAndCharges: React.FC<BillablesAndChargesProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [autoSearchTerm, setAutoSearchTerm] = useState('');
  const [billables, setBillables] = useState<any[]>([]);
  const [automatedCharges, setAutomatedCharges] = useState<any[]>([]);
  const [schemes, setSchemes] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingAutoId, setEditingAutoId] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Billable Form Mapping
  const initialForm = {
    item_name: '',
    apply_to_scheme: 'All Schemes',
    quantity: '1',
    trigger_event: '',
    is_active: true
  };

  // Automated Charges Form Mapping
  const initialAutoForm = {
    charge_type: '',
    billing_instruction: '',
    rule_name: '',
    is_active: true
  };

  const [formData, setFormData] = useState(initialForm);
  const [autoFormData, setAutoFormData] = useState(initialAutoForm);
  
  const isMounted = useRef(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [billablesRes, autoRes] = await Promise.all([
        supabase.from('config_billables').select('*').order('id', { ascending: true }),
        supabase.from('config_automated_charges').select('*').order('id', { ascending: true })
      ]);
      
      if (isMounted.current) {
        setBillables(billablesRes.data || []);
        setAutomatedCharges(autoRes.data || []);
      }
    } catch (err: any) {
      console.error("Fetch Live Data Error:", err.message);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  const fetchDropdowns = async () => {
    try {
      const [schemesRes, servicesRes] = await Promise.all([
        supabase.from('config_schemes').select('name').order('name'),
        supabase.from('config_services').select('name').order('name')
      ]);
      if (isMounted.current) {
        setSchemes(schemesRes.data || []);
        setServices(servicesRes.data || []);
      }
    } catch (err) {
      console.error("Dropdown Dependency Error:", err);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    fetchData();
    fetchDropdowns();
    return () => { isMounted.current = false; };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleAutoInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setAutoFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSave = async () => {
    if (!formData.item_name) {
      alert("Please select an item.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        item_name: formData.item_name,
        apply_to_scheme: formData.apply_to_scheme,
        quantity: parseInt(formData.quantity) || 1,
        trigger_event: formData.trigger_event || 'On Queueing',
        is_active: formData.is_active,
        updated_at: new Date().toISOString()
      };

      if (editingId) {
        const { error } = await supabase.from('config_billables').update(payload).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('config_billables').insert([payload]);
        if (error) throw error;
      }

      setFormData(initialForm);
      setEditingId(null);
      await fetchData();
      
      setShowSuccess(true);
      setTimeout(() => { if (isMounted.current) setShowSuccess(false); }, 4000);
    } catch (err: any) {
      alert("Billable Save Failed: " + err.message);
    } finally {
      if (isMounted.current) setSaving(false);
    }
  };

  const handleAutoSave = async () => {
    if (!autoFormData.charge_type || !autoFormData.billing_instruction) {
      alert("Please fill in Charge Type and Billing Instruction.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        charge_type: autoFormData.charge_type,
        billing_instruction: autoFormData.billing_instruction,
        rule_name: autoFormData.rule_name,
        is_active: autoFormData.is_active,
        created_by: 'admin',
        updated_at: new Date().toISOString()
      };

      if (editingAutoId) {
        const { error } = await supabase.from('config_automated_charges').update(payload).eq('id', editingAutoId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('config_automated_charges').insert([payload]);
        if (error) throw error;
      }

      setAutoFormData(initialAutoForm);
      setEditingAutoId(null);
      await fetchData();

      setShowSuccess(true);
      setTimeout(() => { if (isMounted.current) setShowSuccess(false); }, 4000);
    } catch (err: any) {
      alert("Auto Charge Save Failed: " + err.message);
    } finally {
      if (isMounted.current) setSaving(false);
    }
  };

  const handleDoubleClick = (billable: any) => {
    setFormData({
      item_name: billable.item_name || '',
      apply_to_scheme: billable.apply_to_scheme || 'All Schemes',
      quantity: billable.quantity?.toString() || '1',
      trigger_event: billable.trigger_event || '',
      is_active: billable.is_active ?? true
    });
    setEditingId(billable.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAutoDoubleClick = (item: any) => {
    setAutoFormData({
      charge_type: item.charge_type || '',
      billing_instruction: item.billing_instruction || '',
      rule_name: item.rule_name || '',
      is_active: item.is_active ?? true
    });
    setEditingAutoId(item.id);
    const el = document.getElementById('auto-charges-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredList = billables.filter(b => 
    (b.item_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (b.trigger_event || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAutoList = automatedCharges.filter(a => 
    (a.charge_type || '').toLowerCase().includes(autoSearchTerm.toLowerCase()) ||
    (a.billing_instruction || '').toLowerCase().includes(autoSearchTerm.toLowerCase()) ||
    (a.rule_name || '').toLowerCase().includes(autoSearchTerm.toLowerCase())
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
              <h3 className="font-black text-[13px] uppercase tracking-wider leading-none mb-1">Update Success</h3>
              <p className="text-[11px] font-bold opacity-90 leading-tight">Database record has been synchronized successfully.</p>
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
          <span className="text-[#43939e]">Billables & Charges</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#43939e] cursor-pointer hover:underline font-bold">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* 1. Main Configuration Card: Billables */}
      <div className="bg-white flex flex-col mt-0.5 border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2.5 bg-white border-b border-gray-100">
          <h2 className="text-[17px] text-gray-700 font-normal">Billables</h2>
        </div>

        <div className="p-6 bg-[#eef5f6]">
           <div className="grid grid-cols-12 gap-x-10 gap-y-5 items-end">
              <div className="col-span-4 flex flex-col gap-1.5">
                 <label className="text-[13px] font-bold text-gray-600">Item</label>
                 <div className="relative">
                    <select 
                        name="item_name"
                        value={formData.item_name}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 appearance-none shadow-xs cursor-pointer font-medium"
                    >
                        <option value="">--Select Item--</option>
                        {services.map((s, i) => <option key={i} value={s.name}>{s.name}</option>)}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                    </div>
                 </div>
              </div>
              <div className="col-span-4 flex flex-col gap-1.5">
                 <label className="text-[13px] font-bold text-gray-600">Apply To [Scheme]</label>
                 <div className="relative">
                    <select 
                        name="apply_to_scheme"
                        value={formData.apply_to_scheme}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 appearance-none text-green-700 font-bold cursor-pointer shadow-xs"
                    >
                        <option value="All Schemes">All Schemes</option>
                        <option value="Cash Payers Only">Cash Payers Only</option>
                        {schemes.map((s, i) => <option key={i} value={s.name}>{s.name}</option>)}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-green-600">
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                    </div>
                 </div>
              </div>
              <div className="col-span-4 flex flex-col gap-1.5">
                 <label className="text-[13px] font-bold text-gray-600">Quantity</label>
                 <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-sm font-medium" />
              </div>
              <div className="col-span-4 flex flex-col gap-1.5">
                 <label className="text-[13px] font-bold text-gray-600">Trigger</label>
                 <div className="relative">
                    <select name="trigger_event" value={formData.trigger_event} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] bg-white outline-none appearance-none shadow-xs font-medium cursor-pointer">
                        <option value="">--Select Trigger--</option>
                        <option value="On Queueing">On Queueing</option>
                        <option value="On Admission">On Admission</option>
                        <option value="On Triage Completion">On Triage Completion</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                    </div>
                 </div>
              </div>
              <div className="col-span-4 flex items-center gap-3 pb-2">
                 <input type="checkbox" id="is_active" name="is_active" checked={formData.is_active} onChange={handleInputChange} className="w-5 h-5 rounded border-gray-300 text-[#17a2b8] focus:ring-[#17a2b8] cursor-pointer shadow-xs" />
                 <label htmlFor="is_active" className="text-[14px] text-gray-800 font-bold cursor-pointer">Is Active</label>
              </div>
              <div className="col-span-4 flex justify-end pb-1.5">
                 <button onClick={handleSave} disabled={saving} className="bg-[#17a2b8] text-white w-11 h-11 rounded flex items-center justify-center shadow-lg transition-all active:scale-95 disabled:bg-gray-300 hover:bg-[#138496]">
                    {saving ? <i className="fa-solid fa-spinner fa-spin"></i> : (editingId ? <span className="text-[9px] font-black uppercase">UPDATE</span> : <i className="fa-solid fa-plus text-xl"></i>)}
                 </button>
              </div>
           </div>
        </div>

        <div className="border-t border-gray-200">
           <div className="px-4 py-2.5 bg-[#f0f4f5] border-b border-gray-200 flex items-center justify-between">
             <h2 className="text-[16px] font-medium text-gray-700 uppercase tracking-tight">View: Billables</h2>
             <div className="flex items-center gap-3">
                <span className="text-[14px] font-bold text-gray-500 uppercase tracking-tight">Search:</span>
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border border-gray-300 rounded px-4 py-1.5 text-[14px] outline-none w-[260px] bg-white focus:ring-1 focus:ring-cyan-500 shadow-xs font-medium" />
             </div>
           </div>
           
           <div className="overflow-x-auto min-h-[300px] shadow-inner bg-white custom-scrollbar text-center">
              <table className="w-full text-left text-[13px] whitespace-nowrap">
                 <thead className="bg-[#f8f9fa] text-gray-500 border-b border-gray-200 font-bold">
                    <tr>
                       <th className="px-6 py-3 border-r border-gray-200/60 uppercase text-[11px] tracking-widest">No</th>
                       <th className="px-6 py-3 border-r border-gray-200/60 uppercase text-[11px] tracking-widest">Item</th>
                       <th className="px-6 py-3 border-r border-gray-200/60 uppercase text-[11px] tracking-widest">Trigger</th>
                       <th className="px-6 py-3 border-r border-gray-200/60 uppercase text-[11px] tracking-widest text-center">Active?</th>
                       <th className="px-6 py-3 uppercase text-[11px] tracking-widest text-center">Quantity</th>
                    </tr>
                 </thead>
                 <tbody className="bg-white">
                    {loading && billables.length === 0 ? (
                       <tr><td colSpan={5} className="py-20 text-center text-gray-300 italic uppercase tracking-widest">Refreshing list...</td></tr>
                    ) : filteredList.length > 0 ? (
                       filteredList.map((bill) => (
                        <tr key={bill.id} onDoubleClick={() => handleDoubleClick(bill)} className={`border-b border-gray-100 hover:bg-cyan-50/40 transition-colors cursor-pointer group ${editingId === bill.id ? 'bg-orange-50 ring-1 ring-orange-200' : ''}`}>
                           <td className="px-6 py-4 border-r border-gray-100 text-gray-500 font-mono text-[11px]">{bill.id}</td>
                           <td className="px-6 py-4 border-r border-gray-100 font-bold text-gray-800 uppercase tracking-tight">{bill.item_name}</td>
                           <td className="px-6 py-4 border-r border-gray-100 text-gray-600">{bill.trigger_event}</td>
                           <td className="px-6 py-4 border-r border-gray-100 text-center"><span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${bill.is_active ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'}`}>{bill.is_active ? 'Yes' : 'No'}</span></td>
                           <td className="px-6 py-4 text-center font-black text-blue-900">{bill.quantity}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan={5} className="py-24 text-center text-gray-400 font-medium italic uppercase tracking-[0.3em] opacity-40 select-none">No Billables Found</td></tr>
                    )}
                 </tbody>
              </table>
           </div>
        </div>
      </div>

      {/* 2. SECOND PANEL: Automated Charges */}
      <div id="auto-charges-form" className="bg-white flex flex-col mt-4 border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2.5 bg-white border-b border-gray-100">
          <h2 className="text-[18px] text-gray-700 font-normal">Automated Charges</h2>
        </div>

        <div className="p-6 bg-[#eef5f6]">
           <div className="grid grid-cols-12 gap-x-12 gap-y-6 items-start">
              <div className="col-span-6 flex flex-col gap-1.5">
                 <label className="text-[13px] font-bold text-gray-700">Charge Type</label>
                 <div className="relative">
                    <select 
                        name="charge_type"
                        value={autoFormData.charge_type}
                        onChange={handleAutoInputChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 appearance-none shadow-xs cursor-pointer font-medium"
                    >
                        <option value="">--Select Type--</option>
                        <option value="Other Inpatient Charges">Other Inpatient Charges</option>
                        <option value="Bed Charge">Bed Charge</option>
                        <option value="Morgue Charge">Morgue Charge</option>
                        <option value="Emergency Charge">Emergency Charge</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                    </div>
                 </div>
              </div>

              <div className="col-span-6 flex flex-col gap-1.5">
                 <label className="text-[13px] font-bold text-gray-700">Billing Instruction</label>
                 <div className="relative">
                    <select 
                        name="billing_instruction"
                        value={autoFormData.billing_instruction}
                        onChange={handleAutoInputChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 appearance-none text-emerald-700 font-bold shadow-xs cursor-pointer"
                    >
                        <option value="">Create New Bill Item</option>
                        {services.map((s, i) => <option key={i} value={s.name}>{s.name}</option>)}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-green-600">
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                    </div>
                 </div>
              </div>

              <div className="col-span-6 flex flex-col gap-1.5">
                 <label className="text-[13px] font-bold text-gray-700">Rule</label>
                 <div className="relative">
                    <select 
                        name="rule_name"
                        value={autoFormData.rule_name}
                        onChange={handleAutoInputChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 appearance-none shadow-xs cursor-pointer font-medium"
                    >
                        <option value="">--Select Rule--</option>
                        <option value="Charge Daily At Specified Time">Charge Daily At Specified Time</option>
                        <option value="Charge Once">Charge Once</option>
                        <option value="Charge Weekly">Charge Weekly</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                    </div>
                 </div>
              </div>

              <div className="col-span-6 flex items-center justify-between pt-6">
                 <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id="auto_is_active" 
                      name="is_active"
                      checked={autoFormData.is_active}
                      onChange={handleAutoInputChange}
                      className="w-4.5 h-4.5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer shadow-xs" 
                    />
                    <label htmlFor="auto_is_active" className="text-[14px] text-gray-700 font-bold cursor-pointer">Is Active</label>
                 </div>
                 
                 <button 
                    onClick={handleAutoSave}
                    disabled={saving}
                    className="bg-[#17a2b8] text-white w-10 h-10 rounded flex items-center justify-center shadow-lg transition-all active:scale-95 disabled:bg-gray-300 hover:bg-[#138496]"
                 >
                    {saving ? <i className="fa-solid fa-spinner fa-spin"></i> : (editingAutoId ? <span className="text-[8px] font-black uppercase">Update</span> : <i className="fa-solid fa-plus text-lg"></i>)}
                 </button>
              </div>
           </div>
        </div>

        <div className="border-t border-gray-200">
           <div className="px-4 py-2.5 bg-[#f0f4f5] border-b border-gray-200 flex items-center justify-between">
             <h2 className="text-[16px] font-medium text-gray-700 uppercase tracking-tight">View: Automated Charges</h2>
             <div className="flex items-center gap-3">
                <span className="text-[13px] font-bold text-gray-500 uppercase tracking-tight">Search:</span>
                <input 
                  type="text" 
                  value={autoSearchTerm}
                  onChange={(e) => setAutoSearchTerm(e.target.value)}
                  className="border border-gray-300 rounded px-4 py-1.5 text-[14px] outline-none w-[260px] bg-white focus:ring-1 focus:ring-cyan-500 shadow-xs font-medium" 
                />
             </div>
           </div>

           <div className="p-0 bg-white">
              <div className="overflow-x-auto min-h-[400px] shadow-inner bg-white custom-scrollbar text-center">
                <table className="w-full text-left text-[14px] border-collapse">
                   <thead className="bg-[#f8f9fa] text-gray-500 border-b border-gray-200 font-bold sticky top-0 z-10">
                      <tr>
                         <th className="px-5 py-3 border-r border-gray-200 w-[60px]">No</th>
                         <th className="px-5 py-3 border-r border-gray-200 group">
                            <div className="flex items-center justify-between uppercase text-[11px] tracking-widest">
                               Type <i className="fa-solid fa-arrows-up-down text-[10px] opacity-20"></i>
                            </div>
                         </th>
                         <th className="px-5 py-3 border-r border-gray-200 group">
                            <div className="flex items-center justify-between uppercase text-[11px] tracking-widest">
                               Rule <i className="fa-solid fa-arrows-up-down text-[10px] opacity-20"></i>
                            </div>
                         </th>
                         <th className="px-5 py-3 border-r border-gray-200 group">
                            <div className="flex items-center justify-between uppercase text-[11px] tracking-widest">
                               Service <i className="fa-solid fa-arrows-up-down text-[10px] opacity-20"></i>
                            </div>
                         </th>
                         <th className="px-5 py-3 border-r border-gray-200 group">
                            <div className="flex items-center justify-between uppercase text-[11px] tracking-widest">
                               Created By <i className="fa-solid fa-arrows-up-down text-[10px] opacity-20"></i>
                            </div>
                         </th>
                         <th className="px-5 py-3 group text-center">
                            <div className="flex items-center justify-center uppercase text-[11px] tracking-widest">
                               Active? <i className="fa-solid fa-arrows-up-down text-[10px] opacity-20 ml-2"></i>
                            </div>
                         </th>
                      </tr>
                   </thead>
                   <tbody>
                      {loading && automatedCharges.length === 0 ? (
                         <tr><td colSpan={6} className="py-20 text-center text-gray-400 italic font-bold">Synchronizing automated rules...</td></tr>
                      ) : filteredAutoList.length > 0 ? (
                         filteredAutoList.map((item, idx) => (
                           <tr 
                              key={item.id} 
                              onDoubleClick={() => handleAutoDoubleClick(item)}
                              className={`border-b border-gray-100 hover:bg-cyan-50/50 transition-colors cursor-pointer group ${editingAutoId === item.id ? 'bg-orange-50 ring-1 ring-orange-200' : ''}`}
                           >
                              <td className="px-5 py-3.5 border-r border-gray-100 text-gray-500 font-mono text-[12px]">{item.id}</td>
                              <td className="px-5 py-3.5 border-r border-gray-100 text-gray-700 font-medium">{item.charge_type}</td>
                              <td className="px-5 py-3.5 border-r border-gray-100 text-gray-600">{item.rule_name}</td>
                              <td className="px-5 py-3.5 border-r border-gray-100 font-bold text-blue-900 uppercase tracking-tight">{item.billing_instruction || '-'}</td>
                              <td className="px-5 py-3.5 border-r border-gray-100 text-gray-500 italic">{item.created_by || 'admin'}</td>
                              <td className="px-5 py-3.5 text-center font-bold text-gray-800">{item.is_active ? 'Yes' : 'No'}</td>
                           </tr>
                         ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-32 text-center text-gray-300 font-medium italic uppercase tracking-[0.3em] opacity-40 select-none">
                             No Automated Rules Found
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
