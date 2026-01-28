
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

interface GenericModulesProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const GenericModules: React.FC<GenericModulesProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [modules, setModules] = useState<any[]>([]);
  const [panels, setPanels] = useState<any[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [editingModuleId, setEditingModuleId] = useState<number | null>(null);
  const [editingPanelId, setEditingPanelId] = useState<number | null>(null);
  
  // Separate search terms for each list
  const [moduleSearchTerm, setModuleSearchTerm] = useState('');
  const [panelSearchTerm, setPanelSearchTerm] = useState('');

  // Form states mapping precisely to config_generic_modules and config_generic_module_panels
  const initialModuleForm = {
    module_name: '', // Mapped to module_name column
    icon: 'abacus',  // Mapped to icon column
    description: '', // Mapped to description column
    is_active: true
  };

  const initialPanelForm = {
    module_name: '',       // Required - Mapped to module_name column
    panel_name: '',        // Required - Mapped to panel_name column
    event_description: '', // Mapped to event_description column
    icon: 'abacus',        // Mapped to icon column
    trigger: 'Nothing',    // Mapped to trigger column
    is_clinical: false,    // Mapped to is_clinical column
    include_shortcut: false, // Mapped to include_shortcut column
    require_privilege: false, // Mapped to require_privilege column
    has_notes: false,      // Mapped to has_notes column
    is_active: true        // Mapped to is_active column
  };

  const [moduleForm, setModuleForm] = useState(initialModuleForm);
  const [panelForm, setPanelForm] = useState(initialPanelForm);
  
  const isMounted = useRef(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [modulesRes, panelsRes] = await Promise.all([
        supabase.from('config_generic_modules').select('*').order('id', { ascending: true }),
        supabase.from('config_generic_module_panels').select('*').order('id', { ascending: true })
      ]);
      
      if (isMounted.current) {
        setModules(modulesRes.data || []);
        setPanels(panelsRes.data || []);
      }
    } catch (err: any) {
      console.error("Sync Error:", err.message);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    fetchData();
    return () => { isMounted.current = false; };
  }, []);

  // Generic Module (Left Pane) Actions
  const handleSaveModule = async () => {
    if (!moduleForm.module_name) {
      alert("Validation Error: Module Name is required.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        module_name: moduleForm.module_name.trim(),
        description: moduleForm.description.trim(),
        icon: moduleForm.icon,
        is_active: moduleForm.is_active,
        updated_at: new Date().toISOString()
      };

      if (editingModuleId) {
        const { error } = await supabase.from('config_generic_modules').update(payload).eq('id', editingModuleId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('config_generic_modules').insert([payload]);
        if (error) throw error;
      }

      setModuleForm(initialModuleForm);
      setEditingModuleId(null);
      await fetchData(); 
      triggerNotification();
    } catch (err: any) {
      alert("Module Save Failed: " + err.message);
    } finally {
      if (isMounted.current) setSaving(false);
    }
  };

  const deleteModule = async (id: number) => {
    if (!confirm('Permanently delete this module and its configurations?')) return;
    try {
      const { error } = await supabase.from('config_generic_modules').delete().eq('id', id);
      if (error) throw error;
      await fetchData();
      triggerNotification();
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    }
  };

  const handleDoubleClickModule = (mod: any) => {
    setModuleForm({
      module_name: mod.module_name || '',
      icon: mod.icon || 'abacus',
      description: mod.description || '',
      is_active: mod.is_active ?? true
    });
    setEditingModuleId(mod.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Module Panel (Right Pane) Actions - Final Resolve
  const handleSavePanel = async () => {
    // Validation: Ensure 'Panel Name' and 'Module' remain required fields
    if (!panelForm.module_name || !panelForm.panel_name) {
      alert("Validation Error: Both 'Module' selection and 'Panel Name' are required.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        module_name: panelForm.module_name,
        panel_name: panelForm.panel_name.trim(),
        event_description: panelForm.event_description.trim(),
        icon: panelForm.icon,
        trigger: panelForm.trigger, // Correctly mapped to trigger column
        is_clinical: panelForm.is_clinical, // Map 'Is a clinical panel' to is_clinical
        include_shortcut: panelForm.include_shortcut, // Map 'Include home page shortcut' to include_shortcut
        require_privilege: panelForm.require_privilege,
        has_notes: panelForm.has_notes, // Map 'Has Notes Captured by Clinician' to has_notes
        is_active: panelForm.is_active,
        updated_at: new Date().toISOString()
      };

      if (editingPanelId) {
        // UPDATE Logic
        const { error } = await supabase.from('config_generic_module_panels').update(payload).eq('id', editingPanelId);
        if (error) throw error;
      } else {
        // INSERT Logic for (+) button
        const { error } = await supabase.from('config_generic_module_panels').insert([payload]);
        if (error) throw error;
      }

      setPanelForm(initialPanelForm); // Reset form and clear inputs on success
      setEditingPanelId(null);
      await fetchData(); // Refresh 'VIEW: GENERIC MODULE PANELS' immediately
      triggerNotification(); // Trigger Premium Emerald Pulse Notification
    } catch (err: any) {
      alert("Panel Save Failed: " + err.message);
    } finally {
      if (isMounted.current) setSaving(false);
    }
  };

  const deletePanel = async (id: number) => {
    if (!confirm('Remove this panel?')) return;
    try {
      const { error } = await supabase.from('config_generic_module_panels').delete().eq('id', id);
      if (error) throw error;
      await fetchData();
      triggerNotification();
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    }
  };

  const handleDoubleClickPanel = (p: any) => {
    setPanelForm({
      module_name: p.module_name || '',
      panel_name: p.panel_name || '',
      event_description: p.event_description || '',
      icon: p.icon || 'abacus',
      trigger: p.trigger || 'Nothing',
      is_clinical: p.is_clinical || false,
      include_shortcut: p.include_shortcut || false,
      require_privilege: p.require_privilege || false,
      has_notes: p.has_notes || false,
      is_active: p.is_active ?? true
    });
    setEditingPanelId(p.id);
    const el = document.getElementById('panels-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const triggerNotification = () => {
    setShowSuccess(true);
    setTimeout(() => { if (isMounted.current) setShowSuccess(false); }, 5000);
  };

  const filteredModules = modules.filter(m => 
    (m.module_name || '').toLowerCase().includes(moduleSearchTerm.toLowerCase())
  );

  const filteredPanels = panels.filter(p => 
    (p.panel_name || '').toLowerCase().includes(panelSearchTerm.toLowerCase()) ||
    (p.module_name || '').toLowerCase().includes(panelSearchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-1 animate-in fade-in duration-300 relative min-h-full">
      
      {/* Premium Emerald Pulse Notification */}
      {showSuccess && (
        <div className="fixed top-12 right-6 z-[9000] animate-in slide-in-from-right-8 duration-300 pointer-events-auto">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-4 rounded shadow-2xl flex items-center gap-4 border border-white/20 min-w-[340px]">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0 shadow-inner">
              <i className="fa-solid fa-check text-xl animate-pulse"></i>
            </div>
            <div className="flex-1">
              <h3 className="font-black text-[13px] uppercase tracking-wider leading-none mb-1">Configuration Saved</h3>
              <p className="text-[11px] font-bold opacity-90 leading-tight">Database state synchronized successfully.</p>
            </div>
            <button onClick={() => setShowSuccess(false)} className="text-white/40 hover:text-white transition-colors p-1">
              <i className="fa-solid fa-times text-xs"></i>
            </button>
          </div>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-white px-4 py-2 flex items-center justify-between shadow-sm border-b border-gray-100">
        <h1 className="text-[#333] font-bold text-[18px]">Haven MIS</h1>
        <div className="flex items-center gap-12 text-[14px] text-gray-700">
          <div>Branch: <span className="text-[#43939e] font-medium">Main branch</span></div>
          <div>Room: <span onClick={onOpenRoomModal} className="text-[#43939e] cursor-pointer hover:underline font-medium">{currentRoom}</span></div>
          <button className="bg-[#17a2b8] text-white px-4 py-1.5 rounded-md text-[13px] font-bold uppercase tracking-tight shadow-md">Queue</button>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-[#f8f9fa] border-b border-gray-200 px-4 py-1.5 flex items-center justify-between text-[12px]">
        <div className="flex items-center gap-2">
          <i onClick={onBack} className="fa-solid fa-home text-[#43939e] cursor-pointer text-[14px]"></i>
          <span className="text-gray-300">/</span>
          <div className="flex items-center gap-1 cursor-pointer hover:text-[#43939e]">
             <span className="text-[#43939e]">Configurations</span>
             <i className="fa-solid fa-caret-down text-[10px] text-[#43939e] mt-0.5"></i>
          </div>
          <span className="text-gray-300">/</span>
          <span className="text-[#43939e]">Generic Modules Workspace</span>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-2 bg-[#87c7cf]/10 min-h-[calc(100vh-120px)]">
         
         {/* Left Column: Generic Module */}
         <div className="bg-white border border-gray-200 shadow-sm rounded-sm flex flex-col h-full">
            <div className="px-4 py-2.5 bg-white border-b border-gray-100 flex items-center justify-between">
               <h2 className="text-[17px] text-gray-700 font-normal">Generic Module</h2>
               <button className="bg-[#5bc0de] text-white px-3 py-1 rounded text-[11px] font-bold flex items-center gap-2">
                  Actions <i className="fa-solid fa-caret-down text-[8px]"></i>
               </button>
            </div>

            <div className="p-6 bg-[#eef5f6] flex flex-col gap-6">
               <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                  <div className="flex flex-col gap-1.5">
                     <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Module Name <span className="text-red-500 font-black">*</span></label>
                     <input 
                        type="text" 
                        value={moduleForm.module_name}
                        onChange={(e) => setModuleForm({...moduleForm, module_name: e.target.value})}
                        className="border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-sm font-medium" 
                     />
                  </div>
                  <div className="flex flex-col gap-1.5">
                     <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Icon Reference</label>
                     <div className="relative">
                        <select 
                           value={moduleForm.icon}
                           onChange={(e) => setModuleForm({...moduleForm, icon: e.target.value})}
                           className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white outline-none appearance-none font-bold text-green-700 cursor-pointer"
                        >
                           <option value="abacus">abacus 🧮</option>
                           <option value="eye">eye 👁️</option>
                           <option value="syringe">syringe 💉</option>
                           <option value="heart-pulse">heart 💓</option>
                           <option value="stethoscope">steth 🩺</option>
                           <option value="user-doctor">doctor 👨‍⚕️</option>
                           <option value="flask">flask 🧪</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                           <i className="fa-solid fa-chevron-down text-xs"></i>
                        </div>
                     </div>
                  </div>
                  <div className="col-span-2 flex flex-col gap-1.5 relative">
                     <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Module Description</label>
                     <div className="flex gap-4 items-start">
                        <textarea 
                           rows={2}
                           value={moduleForm.description}
                           onChange={(e) => setModuleForm({...moduleForm, description: e.target.value})}
                           className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-sm font-medium resize-none h-16" 
                        />
                        <button 
                          onClick={handleSaveModule}
                          disabled={saving}
                          className={`${editingModuleId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-[#17a2b8] hover:bg-[#138496]'} text-white w-10 h-10 rounded flex items-center justify-center shrink-0 shadow-lg active:scale-95 transition-all mt-1`}
                        >
                           {saving ? <i className="fa-solid fa-spinner fa-spin"></i> : (editingModuleId ? <span className="text-[9px] font-black uppercase">Update</span> : <i className="fa-solid fa-plus text-xl"></i>)}
                        </button>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex-1 border-t border-gray-200 overflow-hidden flex flex-col">
               <div className="bg-[#f8f9fa] px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-[14px] font-medium text-gray-600 uppercase tracking-widest">View: Generic Modules</h3>
                  <div className="flex items-center gap-3">
                     <span className="text-[12px] text-gray-500 font-bold uppercase tracking-tight">Search:</span>
                     <input 
                        type="text" 
                        value={moduleSearchTerm}
                        onChange={(e) => setModuleSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-1 text-[13px] w-[180px] bg-white outline-none focus:ring-1 focus:ring-cyan-500" 
                      />
                  </div>
               </div>
               <div className="overflow-x-auto h-[450px] custom-scrollbar bg-white shadow-inner">
                  <table className="w-full text-left text-[14px] border-collapse">
                     <thead className="bg-[#f8f9fa] text-gray-500 border-b border-gray-200 sticky top-0 z-10 font-bold">
                        <tr>
                           <th className="px-4 py-3 border-r border-gray-200 w-16 text-center">No</th>
                           <th className="px-6 py-3 border-r border-gray-200 group">
                              <div className="flex items-center justify-between uppercase text-[11px] tracking-widest">
                                 Module Name <i className="fa-solid fa-arrows-up-down text-[10px] opacity-20 group-hover:opacity-100 transition-opacity"></i>
                              </div>
                           </th>
                           <th className="px-6 py-3 border-r border-gray-200 text-center w-24 uppercase text-[11px] tracking-widest">Active</th>
                           <th className="px-4 py-3 text-center w-16"></th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100">
                        {loading && modules.length === 0 ? (
                           <tr><td colSpan={4} className="py-20 text-center text-gray-400 italic font-bold">Refreshing modules...</td></tr>
                        ) : filteredModules.map((m, i) => (
                           <tr 
                              key={m.id} 
                              onDoubleClick={() => handleDoubleClickModule(m)}
                              className={`border-b border-gray-50 hover:bg-cyan-50/50 transition-colors cursor-pointer group ${editingModuleId === m.id ? 'bg-orange-50 ring-1 ring-inset ring-orange-200' : ''}`}
                           >
                              <td className="px-4 py-4 border-r border-gray-100 text-gray-400 font-mono text-[11px] text-center">{i + 1}</td>
                              <td className="px-6 py-4 border-r border-gray-100 font-bold text-gray-700 group-hover:text-cyan-800 uppercase tracking-tight">{m.module_name}</td>
                              <td className="px-6 py-4 border-r border-gray-100 text-center">
                                 <i className={`fa-solid ${m.is_active ? 'fa-circle-check text-emerald-500' : 'fa-circle-xmark text-gray-300'} text-xl`}></i>
                              </td>
                              <td className="px-4 py-4 text-center">
                                 <button onClick={(e) => { e.stopPropagation(); deleteModule(m.id); }} className="text-gray-300 hover:text-red-500 transition-colors">
                                    <i className="fa-solid fa-trash-can text-[12px]"></i>
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         {/* Right Column: Module Panels */}
         <div id="panels-section" className="bg-white border border-gray-200 shadow-sm rounded-sm flex flex-col h-full">
            <div className="px-4 py-2.5 bg-white border-b border-gray-100 flex items-center justify-between">
               <h2 className="text-[17px] text-gray-700 font-normal">Module Panels</h2>
               <button className="bg-[#5bc0de] text-white px-3 py-1 rounded text-[11px] font-bold flex items-center gap-2">
                  Actions <i className="fa-solid fa-caret-down text-[8px]"></i>
               </button>
            </div>

            <div className="p-6 bg-[#eef5f6] flex flex-col gap-6">
               <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                  <div className="flex flex-col gap-1.5">
                     <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Panel Name <span className="text-red-500 font-black">*</span></label>
                     <input 
                        type="text" 
                        value={panelForm.panel_name}
                        onChange={(e) => setPanelForm({...panelForm, panel_name: e.target.value})}
                        className="border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white font-medium" 
                     />
                  </div>
                  <div className="flex flex-col gap-1.5">
                     <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight italic">Event Description e.g. Notes</label>
                     <input 
                        type="text" 
                        value={panelForm.event_description}
                        onChange={(e) => setPanelForm({...panelForm, event_description: e.target.value})}
                        className="border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white font-medium" 
                     />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                     <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Icon</label>
                     <div className="relative">
                        <select 
                           value={panelForm.icon}
                           onChange={(e) => setPanelForm({...panelForm, icon: e.target.value})}
                           className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white outline-none appearance-none font-bold text-green-700 cursor-pointer"
                        >
                           <option value="abacus">abacus 🧮</option>
                           <option value="id-card">id-card 💳</option>
                           <option value="stethoscope">steth 🩺</option>
                           <option value="flask">flask 🧪</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                           <i className="fa-solid fa-chevron-down text-xs"></i>
                        </div>
                     </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                     <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Trigger</label>
                     <div className="relative">
                        <select 
                           value={panelForm.trigger}
                           onChange={(e) => setPanelForm({...panelForm, trigger: e.target.value})}
                           className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white outline-none appearance-none font-bold text-green-700 cursor-pointer"
                        >
                           <option value="Nothing">Nothing</option>
                           <option value="Auto-Save">Auto-Save</option>
                           <option value="On Capture">On Capture</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                           <i className="fa-solid fa-chevron-down text-xs"></i>
                        </div>
                     </div>
                  </div>

                  <div className="col-span-2 grid grid-cols-2 gap-x-12 items-start">
                     <div className="flex flex-col gap-2">
                        <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Module <span className="text-red-500 font-black">*</span></label>
                        <div className="relative">
                          <select 
                             value={panelForm.module_name}
                             onChange={(e) => setPanelForm({...panelForm, module_name: e.target.value})}
                             className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white outline-none appearance-none font-black text-blue-900 shadow-sm cursor-pointer"
                          >
                             <option value="">--Select Module--</option>
                             {modules.map(m => <option key={m.id} value={m.module_name}>{m.module_name}</option>)}
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                             <i className="fa-solid fa-chevron-down text-xs"></i>
                          </div>
                        </div>
                     </div>
                     <div className="flex flex-col gap-2.5 pt-1">
                        <div className="grid grid-cols-1 gap-y-2">
                           <CheckboxItem 
                              id="is_clinical" 
                              label="Is a clinical panel" 
                              checked={panelForm.is_clinical}
                              onChange={(v) => setPanelForm({...panelForm, is_clinical: v})}
                           />
                           <CheckboxItem 
                              id="include_shortcut" 
                              label="Include home page shortcut" 
                              checked={panelForm.include_shortcut}
                              onChange={(v) => setPanelForm({...panelForm, include_shortcut: v})}
                           />
                           <CheckboxItem 
                              id="require_privilege" 
                              label="Require privilege for access" 
                              checked={panelForm.require_privilege}
                              onChange={(v) => setPanelForm({...panelForm, require_privilege: v})}
                           />
                           <CheckboxItem 
                              id="has_notes" 
                              label="Has Notes Captured by Clinician" 
                              checked={panelForm.has_notes}
                              onChange={(v) => setPanelForm({...panelForm, has_notes: v})}
                           />
                        </div>
                        <div className="flex justify-end mt-2">
                           <button 
                             onClick={handleSavePanel}
                             disabled={saving}
                             className={`${editingPanelId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-[#17a2b8] hover:bg-[#138496]'} text-white w-10 h-10 rounded flex items-center justify-center shadow-lg active:scale-95 transition-all`}
                           >
                              {saving ? <i className="fa-solid fa-spinner fa-spin"></i> : (editingPanelId ? <span className="text-[9px] font-black uppercase">Update</span> : <i className="fa-solid fa-plus text-xl"></i>)}
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex-1 border-t border-gray-200 overflow-hidden flex flex-col">
               <div className="bg-[#f8f9fa] px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-[14px] font-medium text-gray-600 uppercase tracking-widest">View: Generic Module Panels</h3>
                  <div className="flex items-center gap-3">
                     <span className="text-[12px] text-gray-500 font-bold uppercase tracking-tight">Search:</span>
                     <input 
                       type="text" 
                       value={panelSearchTerm}
                       onChange={(e) => setPanelSearchTerm(e.target.value)}
                       className="border border-gray-300 rounded px-3 py-1 text-[13px] w-[180px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 shadow-xs font-medium" 
                     />
                  </div>
               </div>
               <div className="overflow-x-auto h-[350px] custom-scrollbar bg-white shadow-inner">
                  <table className="w-full text-left text-[13px] whitespace-nowrap border-collapse">
                     <thead className="bg-[#f8f9fa] text-gray-500 border-b sticky top-0 z-10 font-bold shadow-sm">
                        <tr>
                           <th className="px-4 py-3 border-r border-gray-200 w-16 text-center">No</th>
                           <th className="px-6 py-3 border-r border-gray-200 group">
                              <div className="flex items-center justify-between uppercase text-[11px] tracking-widest">
                                 Panel Name <i className="fa-solid fa-arrows-up-down text-[10px] opacity-20 group-hover:opacity-100"></i>
                              </div>
                           </th>
                           <th className="px-6 py-3 border-r border-gray-200 uppercase text-[11px] tracking-widest text-center">Is Clinical</th>
                           <th className="px-6 py-3 border-r border-gray-200 uppercase text-[11px] tracking-widest text-center">Has Shortcut</th>
                           <th className="px-6 py-3 border-r border-gray-200 uppercase text-[11px] tracking-widest text-center">Active</th>
                           <th className="px-4 py-3 text-center w-12"></th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100 font-medium">
                        {filteredPanels.length > 0 ? filteredPanels.map((p, i) => (
                           <tr 
                              key={p.id} 
                              onDoubleClick={() => handleDoubleClickPanel(p)}
                              className={`hover:bg-cyan-50/50 transition-colors cursor-pointer group ${editingPanelId === p.id ? 'bg-orange-50 ring-1 ring-inset ring-orange-200' : ''}`}
                           >
                              <td className="px-4 py-3.5 border-r border-gray-100 text-gray-500 font-mono text-[11px] text-center">{i + 1}</td>
                              <td className="px-6 py-3.5 border-r border-gray-100 font-bold text-gray-700 uppercase tracking-tight">{p.panel_name}</td>
                              <td className="px-6 py-3.5 border-r border-gray-100 text-center">
                                 {p.is_clinical ? (
                                     <i className="fa-solid fa-stethoscope text-cyan-600" title="Clinical Panel"></i>
                                 ) : (
                                     <span className="text-gray-300">-</span>
                                 )}
                              </td>
                              <td className="px-6 py-3.5 border-r border-gray-100 text-center">
                                 {p.include_shortcut ? (
                                     <i className="fa-solid fa-house-chimney text-emerald-600" title="Has Shortcut"></i>
                                 ) : (
                                     <span className="text-gray-300">-</span>
                                 )}
                              </td>
                              <td className="px-6 py-3.5 border-r border-gray-100 text-center">
                                 <i className={`fa-solid ${p.is_active ? 'fa-circle-check text-emerald-500' : 'fa-circle-xmark text-gray-300'} text-lg`}></i>
                              </td>
                              <td className="px-4 py-3.5 text-center">
                                 <button onClick={(e) => { e.stopPropagation(); deletePanel(p.id); }} className="text-gray-300 hover:text-red-500 transition-colors">
                                    <i className="fa-solid fa-trash-can text-[12px]"></i>
                                 </button>
                              </td>
                           </tr>
                        )) : (
                           <tr>
                              <td colSpan={6} className="py-24 text-center text-gray-300 font-medium italic uppercase tracking-[0.3em] opacity-40 select-none">No data available in table</td>
                           </tr>
                        )}
                     </tbody>
                  </table>
               </div>
               <div className="bg-[#f8f9fa] px-4 py-2 border-t border-gray-200 text-[11px] text-gray-400 font-bold uppercase tracking-widest flex justify-between items-center">
                  <span>Showing 1 to {filteredPanels.length} of {panels.length} entries</span>
                  <div className="flex gap-2">
                     <button className="px-2 py-0.5 border border-gray-200 rounded opacity-40" disabled>Prev</button>
                     <button className="px-2 py-0.5 border border-gray-200 rounded opacity-40" disabled>Next</button>
                  </div>
               </div>
            </div>
         </div>

      </div>
    </div>
  );
};

const CheckboxItem: React.FC<{ id: string; label: string; checked: boolean; onChange: (v: boolean) => void }> = ({ id, label, checked, onChange }) => (
  <div className="flex items-center gap-3 group cursor-pointer" onClick={() => onChange(!checked)}>
    <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-all ${checked ? 'bg-cyan-600 border-cyan-600 shadow-md' : 'bg-white border-gray-300 group-hover:border-cyan-400 shadow-inner'}`}>
      {checked && <i className="fa-solid fa-check text-white text-[10px]"></i>}
    </div>
    <label htmlFor={id} className="text-[12px] text-gray-700 font-bold cursor-pointer select-none group-hover:text-cyan-700 transition-colors uppercase tracking-tight">{label}</label>
  </div>
);
