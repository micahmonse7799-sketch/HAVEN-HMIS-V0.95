
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

interface LabTestsProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const LabTests: React.FC<LabTestsProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSpecimenModalOpen, setIsSpecimenModalOpen] = useState(false);
  const [isComponentModalOpen, setIsComponentModalOpen] = useState(false);
  const [isPanelModalOpen, setIsPanelModalOpen] = useState(false);
  const [configuredTests, setConfiguredTests] = useState<any[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // States for Categories Modal
  const [categories, setCategories] = useState<any[]>([]);
  const [categorySaving, setCategorySaving] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [categoryFormData, setCategoryFormData] = useState({ name: '', description: '' });
  const [categorySearchQuery, setCategorySearchQuery] = useState('');

  // States for Specimen Modal
  const [specimens, setSpecimens] = useState<any[]>([]);
  const [specimenSaving, setSpecimenSaving] = useState(false);
  const [editingSpecimenId, setEditingSpecimenId] = useState<number | null>(null);
  const [specimenFormData, setSpecimenFormData] = useState({ name: '', description: '' });
  const [specimenSearchQuery, setSpecimenSearchQuery] = useState('');

  // States for Test Components Modal
  const [components, setComponents] = useState<any[]>([]);
  const [componentSaving, setComponentSaving] = useState(false);
  const [editingComponentId, setEditingComponentId] = useState<number | null>(null);
  const [componentFormData, setComponentFormData] = useState({
    name: '',
    units: '',
    lower_limit: '',
    upper_limit: '',
    code: ''
  });

  // States for Test Panel Modal
  const [panelMembers, setPanelMembers] = useState<any[]>([]);
  const [panelSaving, setPanelSaving] = useState(false);
  const [selectedIncludedTestName, setSelectedIncludedTestName] = useState('');
  
  const initialForm = {
    name: '',
    description: '',
    category: '',
    specimen: '',
    service: '',
    test_price: '0',
    test_code: '',
    machine: 'None',
    print_reference_ranges: false
  };

  const [formData, setFormData] = useState(initialForm);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    fetchConfiguredTests();
    fetchCategories();
    fetchSpecimens();
    return () => { isMounted.current = false; };
  }, []);

  const fetchConfiguredTests = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('config_lab_tests')
        .select('*')
        .order('id', { ascending: true });
      if (error) throw error;
      if (isMounted.current) setConfiguredTests(data || []);
    } catch (err: any) {
      console.error("Error fetching lab configs:", err.message);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('config_lab_test_categories')
        .select('*')
        .order('id', { ascending: true });
      if (error) throw error;
      if (isMounted.current) setCategories(data || []);
    } catch (err: any) {
      console.error("Error fetching categories:", err.message);
    }
  };

  const fetchSpecimens = async () => {
    try {
      const { data, error } = await supabase
        .from('config_lab_test_specimens')
        .select('*')
        .order('id', { ascending: true });
      if (error) throw error;
      if (isMounted.current) setSpecimens(data || []);
    } catch (err: any) {
      console.error("Error fetching specimens:", err.message);
    }
  };

  const fetchComponents = async (parentId: number) => {
    try {
      const { data, error } = await supabase
        .from('config_lab_test_components')
        .select('*')
        .eq('parent_test_id', parentId)
        .order('id', { ascending: true });
      if (error) throw error;
      if (isMounted.current) setComponents(data || []);
    } catch (err: any) {
      console.error("Error fetching components:", err.message);
    }
  };

  const fetchPanelMembers = async (parentId: number) => {
    try {
      const { data, error } = await supabase
        .from('config_lab_test_panels')
        .select('id, included_test_name')
        .eq('parent_test_id', parentId)
        .order('id', { ascending: true });
      if (error) throw error;
      if (isMounted.current) setPanelMembers(data || []);
    } catch (err: any) {
      console.error("Error fetching panel members:", err.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSpecimenInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSpecimenFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleComponentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setComponentFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.name) {
      alert("Validation Error: 'Name' is required.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        category: formData.category,
        specimen: formData.specimen,
        service: formData.service,
        test_price: parseFloat(formData.test_price) || 0,
        test_code: formData.test_code.trim(),
        machine: formData.machine,
        print_reference_ranges: formData.print_reference_ranges,
        updated_at: new Date().toISOString()
      };

      if (editingId) {
        const { error } = await supabase
          .from('config_lab_tests')
          .update(payload)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('config_lab_tests')
          .insert([payload]);
        if (error) throw error;
      }

      setFormData(initialForm);
      setEditingId(null);
      await fetchConfiguredTests();
      
      triggerSuccessNotification();
    } catch (err: any) {
      alert("Operation Failed: " + err.message);
    } finally {
      if (isMounted.current) setSaving(false);
    }
  };

  const handleSaveCategory = async () => {
    if (!categoryFormData.name) {
      alert("Category Name is required.");
      return;
    }

    setCategorySaving(true);
    try {
      const payload = {
        name: categoryFormData.name.trim(),
        description: categoryFormData.description.trim(),
        updated_at: new Date().toISOString()
      };

      if (editingCategoryId) {
        const { error } = await supabase
          .from('config_lab_test_categories')
          .update(payload)
          .eq('id', editingCategoryId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('config_lab_test_categories')
          .insert([payload]);
        if (error) throw error;
      }

      setCategoryFormData({ name: '', description: '' });
      setEditingCategoryId(null);
      await fetchCategories();
      
      triggerSuccessNotification();
    } catch (err: any) {
      alert("Category Save Failed: " + err.message);
    } finally {
      if (isMounted.current) setCategorySaving(false);
    }
  };

  const handleSaveSpecimen = async () => {
    if (!specimenFormData.name) {
      alert("Specimen Name is required.");
      return;
    }

    setSpecimenSaving(true);
    try {
      const payload = {
        name: specimenFormData.name.trim(),
        description: specimenFormData.description.trim(),
        updated_at: new Date().toISOString()
      };

      if (editingSpecimenId) {
        const { error } = await supabase
          .from('config_lab_test_specimens')
          .update(payload)
          .eq('id', editingSpecimenId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('config_lab_test_specimens')
          .insert([payload]);
        if (error) throw error;
      }

      setSpecimenFormData({ name: '', description: '' });
      setEditingSpecimenId(null);
      await fetchSpecimens();
      
      triggerSuccessNotification();
    } catch (err: any) {
      alert("Specimen Save Failed: " + err.message);
    } finally {
      if (isMounted.current) setSpecimenSaving(false);
    }
  };

  const handleSaveComponent = async () => {
    if (!editingId) return; 
    if (!componentFormData.name) {
      alert("Component Name is required.");
      return;
    }

    setComponentSaving(true);
    try {
      const payload = {
        parent_test_id: editingId,
        name: componentFormData.name.trim(),
        units: componentFormData.units.trim(),
        lower_limit: componentFormData.lower_limit.trim(),
        upper_limit: componentFormData.upper_limit.trim(),
        code: componentFormData.code.trim(),
        updated_at: new Date().toISOString()
      };

      if (editingComponentId) {
        const { error } = await supabase
          .from('config_lab_test_components')
          .update(payload)
          .eq('id', editingComponentId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('config_lab_test_components')
          .insert([payload]);
        if (error) throw error;
      }

      setComponentFormData({ name: '', units: '', lower_limit: '', upper_limit: '', code: '' });
      setEditingComponentId(null);
      await fetchComponents(editingId);
      
      triggerSuccessNotification();
    } catch (err: any) {
      alert("Component Save Failed: " + err.message);
    } finally {
      if (isMounted.current) setComponentSaving(false);
    }
  };

  const handleSavePanelMember = async () => {
    if (!editingId) return;
    if (!selectedIncludedTestName) {
      alert("Please select a test to add to the panel.");
      return;
    }

    setPanelSaving(true);
    try {
      const { error } = await supabase
        .from('config_lab_test_panels')
        .insert([{
          parent_test_id: editingId,
          included_test_name: selectedIncludedTestName,
          updated_at: new Date().toISOString()
        }]);
      
      if (error) throw error;

      setSelectedIncludedTestName('');
      await fetchPanelMembers(editingId);
      
      triggerSuccessNotification();
    } catch (err: any) {
      alert("Panel Update Failed: " + err.message);
    } finally {
      if (isMounted.current) setPanelSaving(false);
    }
  };

  const handleDeletePanelMember = async (id: number) => {
    if (!confirm("Remove this test from the panel?")) return;
    try {
      const { error } = await supabase
        .from('config_lab_test_panels')
        .delete()
        .eq('id', id);
      if (error) throw error;

      if (editingId) await fetchPanelMembers(editingId);
      triggerSuccessNotification();
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    }
  };

  const triggerSuccessNotification = () => {
    setShowSuccess(true);
    setTimeout(() => { if (isMounted.current) setShowSuccess(false); }, 4000);
  };

  const handleDoubleClick = (test: any) => {
    setFormData({
      name: test.name || '',
      description: test.description || '',
      category: test.category || '',
      specimen: test.specimen || '',
      service: test.service || '',
      test_price: test.test_price?.toString() || '0',
      test_code: test.test_code || '',
      machine: test.machine || 'None',
      print_reference_ranges: test.print_reference_ranges ?? false
    });
    setEditingId(test.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDoubleClickCategory = (cat: any) => {
    setCategoryFormData({
      name: cat.name || '',
      description: cat.description || ''
    });
    setEditingCategoryId(cat.id);
  };

  const handleDoubleClickSpecimen = (spec: any) => {
    setSpecimenFormData({
      name: spec.name || '',
      description: spec.description || ''
    });
    setEditingSpecimenId(spec.id);
  };

  const handleDoubleClickComponent = (comp: any) => {
    setComponentFormData({
      name: comp.name || '',
      units: comp.units || '',
      lower_limit: comp.lower_limit || '',
      upper_limit: comp.upper_limit || '',
      code: comp.code || ''
    });
    setEditingComponentId(comp.id);
  };

  const handleOpenComponentsModal = () => {
    if (!editingId) {
      alert("Select the test first");
      return;
    }
    fetchComponents(editingId);
    setIsComponentModalOpen(true);
  };

  const handleOpenPanelModal = () => {
    if (!editingId) {
      alert("Select the test first");
      return;
    }
    fetchPanelMembers(editingId);
    setIsPanelModalOpen(true);
  };

  const filteredTests = configuredTests.filter(t => 
    (t.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.service || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCategories = categories.filter(c => 
    (c.name || '').toLowerCase().includes(categorySearchQuery.toLowerCase())
  );

  const filteredSpecimens = specimens.filter(s => 
    (s.name || '').toLowerCase().includes(specimenSearchQuery.toLowerCase())
  );

  const selectedTestName = configuredTests.find(t => t.id === editingId)?.name || 'Unknown';

  return (
    <div className="flex flex-col gap-0 animate-in fade-in duration-300 pb-10 min-h-screen relative">
      
      {/* Premium Emerald Pulse Notification */}
      {showSuccess && (
        <div className="fixed top-12 right-6 z-[9999] animate-in slide-in-from-right-8 duration-300 pointer-events-auto">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-4 rounded shadow-2xl flex items-center gap-5 border border-white/20 min-w-[360px]">
            <div className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center shrink-0 shadow-inner">
              <i className="fa-solid fa-check text-2xl animate-pulse"></i>
            </div>
            <div className="flex-1">
              <h3 className="font-black text-[14px] uppercase tracking-wider mb-1">Update Success</h3>
              <p className="text-[12px] font-bold opacity-95">Configuration synchronized with database.</p>
            </div>
            <button onClick={() => setShowSuccess(false)} className="text-white/40 hover:text-white transition-colors p-1">
              <i className="fa-solid fa-times text-xs"></i>
            </button>
          </div>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="bg-white rounded-sm h-10 px-4 flex items-center justify-between shadow-sm border-b border-gray-200">
        <div className="flex items-center gap-3">
          <i onClick={onBack} className="fa-solid fa-times text-gray-400 cursor-pointer hover:text-gray-600 text-xs font-black"></i>
          <h1 className="text-gray-700 font-semibold text-[14px]">Haven MIS</h1>
        </div>
        <div className="flex items-center gap-12 text-[13px] text-gray-500">
          <div>Branch: <span className="text-[#337ab7] cursor-pointer hover:underline font-bold">Main branch</span></div>
          <div>Room: <span onClick={onOpenRoomModal} className="text-[#337ab7] cursor-pointer hover:underline font-bold">{currentRoom}</span></div>
          <button className="bg-[#17a2b8] text-white px-4 py-0.5 rounded-sm text-[11px] font-bold uppercase shadow-sm">Queue</button>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-[#fcfcfc] border-b border-gray-200 px-4 py-1.5 flex items-center justify-between text-[12px]">
        <div className="flex items-center gap-2 text-gray-500">
          <i className="fa-solid fa-home text-[#337ab7]"></i>
          <span className="opacity-50">/</span>
          <div className="flex items-center gap-1 text-[#337ab7] cursor-pointer hover:underline">
             <span>Configurations</span>
             <i className="fa-solid fa-caret-down text-[9px] mt-0.5 opacity-60"></i>
          </div>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Lab Test Configuration</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#337ab7] cursor-pointer hover:underline font-bold">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Main Workspace Area with Teal Backdrop */}
      <div className="bg-[#87c7cf]/10 p-2 flex flex-col gap-4 flex-1">
        
        {/* Test Details Card */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-sm flex flex-col">
          <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center">
            <h2 className="text-[17px] font-normal text-gray-600">Test Details</h2>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative">
             {/* Form Content (9 cols) */}
             <div className="lg:col-span-9 flex flex-col gap-6">
                
                {/* Search Here Input Row */}
                <div className="relative w-full max-w-sm mb-4">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fa-solid fa-magnifying-glass text-gray-400 text-sm"></i>
                   </div>
                   <input 
                     type="text" 
                     className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-[#f0f2f5] text-[13px] outline-none shadow-inner focus:ring-1 focus:ring-cyan-500"
                     placeholder="Search here..." 
                   />
                </div>

                {/* Primary Input Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
                   <InputField label="Name" name="name" value={formData.name} onChange={handleInputChange} />
                   <InputField label="Description" name="description" value={formData.description} onChange={handleInputChange} />
                   <InputField label="Category" name="category" value={formData.category} onChange={handleInputChange} type="select" options={categories.map(c => c.name)} />
                   
                   <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Rate</label>
                      <input 
                        type="number" 
                        name="test_price"
                        value={formData.test_price}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[14px] outline-none shadow-sm font-bold text-green-700 text-right" 
                      />
                   </div>
                   <InputField label="Test Code" name="test_code" value={formData.test_code} onChange={handleInputChange} />
                   <InputField label="Machine" name="machine" value={formData.machine} onChange={handleInputChange} type="select" options={['Sysmex', 'Mindray', 'Cobas', 'None']} />
                   
                   <InputField label="Specimen" name="specimen" value={formData.specimen} onChange={handleInputChange} type="select" options={specimens.map(s => s.name)} />
                   <InputField label="Service" name="service" value={formData.service} onChange={handleInputChange} type="select" options={['Laboratory', 'Radiology', 'Consultation', 'Nursing']} />
                   
                   <div className="flex items-center gap-3 pt-6">
                      <input 
                        type="checkbox" 
                        id="print_ranges"
                        name="print_reference_ranges"
                        checked={formData.print_reference_ranges}
                        onChange={handleInputChange}
                        className="w-4.5 h-4.5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 shadow-xs cursor-pointer" 
                      />
                      <label htmlFor="print_ranges" className="text-[12px] text-gray-700 font-bold uppercase tracking-tighter leading-tight cursor-pointer">Print Reference Ranges on Lab Report</label>
                   </div>
                </div>
             </div>

             {/* Action Sidebar (3 cols) */}
             <div className="lg:col-span-3 flex flex-col gap-1.5 pt-2">
                <ActionBtn label="Sync Tests" variant="teal" />
                <ActionBtn label="Test Components" variant="teal" onClick={handleOpenComponentsModal} />
                <ActionBtn label="Configure As Panel" variant="teal" onClick={handleOpenPanelModal} />
                <ActionBtn label="Test Metadata" variant="teal" />
                <ActionBtn label="Test Categories" onClick={() => setIsCategoryModalOpen(true)} />
                <ActionBtn label="Test Specimen" onClick={() => setIsSpecimenModalOpen(true)} />
             </div>

             {/* Main Save Action */}
             <div className="absolute right-[28%] bottom-10 lg:right-[26%]">
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className={`${editingId ? 'bg-orange-50 hover:bg-orange-600' : 'bg-[#17a2b8] hover:bg-[#138496]'} text-white w-10 h-8 rounded flex items-center justify-center shadow-lg active:scale-95 transition-all disabled:bg-gray-300`}
                >
                   {saving ? <i className="fa-solid fa-spinner fa-spin"></i> : (editingId ? <span className="font-black text-[10px] tracking-widest uppercase">Update</span> : <i className="fa-solid fa-plus text-xl font-black"></i>)}
                </button>
             </div>
          </div>
        </div>

        {/* View Section */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-sm flex flex-col min-h-[400px]">
           <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between shadow-xs">
             <h2 className="text-[15px] font-medium text-gray-600">View: Lab Tests</h2>
             <div className="flex gap-1.5">
                <button className="bg-white border border-gray-300 text-gray-600 px-3 py-1 text-[11px] font-bold rounded shadow-xs hover:bg-gray-50 uppercase tracking-tight">Excel</button>
                <button className="bg-white border border-gray-300 text-gray-600 px-3 py-1 text-[11px] font-bold rounded shadow-xs hover:bg-gray-50 uppercase tracking-tight">CSV</button>
                <button className="border border-gray-300 text-gray-700 px-3 py-1 text-[11px] font-bold rounded shadow-xs hover:bg-gray-50 uppercase tracking-tight">Print</button>
             </div>
           </div>
           <div className="p-4 flex flex-col gap-4">
              <div className="flex justify-end items-center gap-3">
                 <span className="text-[13px] text-gray-500 font-bold uppercase tracking-tight">Search:</span>
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="border border-gray-300 rounded-sm px-3 py-1.5 text-[14px] outline-none w-[280px] shadow-xs focus:ring-1 focus:ring-cyan-500 bg-white" 
                 />
              </div>
              
              <div className="border border-gray-200 rounded-sm overflow-x-auto min-h-[350px] shadow-inner bg-white custom-scrollbar text-center">
                <table className="w-full text-left text-[13px] border-collapse">
                   <thead className="bg-[#eef5f6] text-gray-600 border-b sticky top-0 z-10 font-bold shadow-sm">
                      <tr>
                         <th className="px-6 py-3 border-r w-[80px] text-center uppercase text-[11px] tracking-widest">No</th>
                         <th className="px-6 py-3 border-r group cursor-pointer uppercase text-[11px] tracking-widest">
                            <div className="flex items-center justify-between">
                               Test <i className="fa-solid fa-arrows-up-down text-[10px] opacity-20 group-hover:opacity-100 transition-opacity ml-2"></i>
                            </div>
                         </th>
                         <th className="px-6 py-3 border-r group cursor-pointer uppercase text-[11px] tracking-widest">
                            <div className="flex items-center justify-between">
                               Service <i className="fa-solid fa-arrows-up-down text-[10px] opacity-20 group-hover:opacity-100 transition-opacity ml-2"></i>
                            </div>
                         </th>
                         <th className="px-6 py-3 group cursor-pointer uppercase text-[11px] tracking-widest">
                            <div className="flex items-center justify-between">
                               Rate <i className="fa-solid fa-arrows-up-down text-[10px] opacity-20 group-hover:opacity-100 transition-opacity ml-2"></i>
                            </div>
                         </th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100 font-medium text-left">
                      {loading && configuredTests.length === 0 ? (
                        <tr><td colSpan={4} className="py-20 text-center text-gray-400 italic font-bold">Syncing records...</td></tr>
                      ) : filteredTests.length > 0 ? (
                        filteredTests.map((test, idx) => (
                           <tr 
                              key={test.id} 
                              onDoubleClick={() => handleDoubleClick(test)}
                              className={`border-b hover:bg-cyan-50/50 transition-all cursor-pointer group ${editingId === test.id ? 'bg-orange-50 ring-1 ring-inset ring-orange-200' : ''}`}
                           >
                              <td className="px-6 py-4 border-r text-gray-500 font-mono text-[11px] text-center">{(idx + 1).toString().padStart(3, '0')}</td>
                              <td className="px-6 py-4 border-r font-bold text-gray-700 group-hover:text-cyan-800 uppercase tracking-tight">{test.name}</td>
                              <td className="px-6 py-4 border-r text-gray-600 uppercase text-[11px] font-black tracking-widest">{test.service || '-'}</td>
                              <td className="px-6 py-4 text-right font-black text-blue-900 tabular-nums">{test.test_price?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                           </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center py-24 text-gray-400 italic font-medium uppercase tracking-[0.2em] opacity-40 select-none">No records matching criteria</td>
                        </tr>
                      )}
                   </tbody>
                </table>
              </div>
           </div>
        </div>
      </div>

      {/* Test Component Modal */}
      {isComponentModalOpen && editingId && (
        <div className="fixed inset-0 bg-black/60 z-[9000] flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200 backdrop-blur-[1px]">
          <div className="bg-white w-full max-w-[650px] rounded shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-white/20">
             <div className="bg-[#e9eaf2] px-4 py-3 flex items-center justify-between border-b shadow-sm">
                <h3 className="text-[19px] text-[#4a4a7d] font-normal tracking-tight">Test Component - {selectedTestName}</h3>
                <button onClick={() => setIsComponentModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                   <i className="fa-solid fa-times text-[20px]"></i>
                </button>
             </div>

             <div className="p-6 flex flex-col gap-6 bg-[#87c7cf]/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                   <div className="flex flex-col gap-1.5">
                      <label className="text-[14px] font-bold text-gray-700 uppercase tracking-tight">Name <span className="text-red-500 font-black">*</span></label>
                      <input 
                        type="text" 
                        name="name"
                        value={componentFormData.name}
                        onChange={handleComponentInputChange}
                        className="w-full border border-red-300 rounded-xl px-3 py-2 text-[14px] outline-none shadow-xs focus:ring-1 focus:ring-red-400 bg-white font-medium" 
                      />
                   </div>
                   <div className="flex flex-col gap-1.5">
                      <label className="text-[14px] font-bold text-gray-700 uppercase tracking-tight">Units</label>
                      <input 
                        type="text" 
                        name="units"
                        value={componentFormData.units}
                        onChange={handleComponentInputChange}
                        className="w-full border border-emerald-300 rounded-xl px-3 py-2 text-[14px] outline-none shadow-xs focus:ring-1 focus:ring-emerald-400 bg-white font-medium" 
                      />
                   </div>
                   <div className="flex flex-col gap-1.5">
                      <label className="text-[14px] font-bold text-gray-700 uppercase tracking-tight">Lower Limit</label>
                      <input 
                        type="text" 
                        name="lower_limit"
                        value={componentFormData.lower_limit}
                        onChange={handleComponentInputChange}
                        className="w-full border border-emerald-300 rounded-xl px-3 py-2 text-[14px] outline-none shadow-xs focus:ring-1 focus:ring-emerald-400 bg-white font-medium" 
                      />
                   </div>
                   <div className="flex flex-col gap-1.5">
                      <label className="text-[14px] font-bold text-gray-700 uppercase tracking-tight">Code</label>
                      <input 
                        type="text" 
                        name="code"
                        value={componentFormData.code}
                        onChange={handleComponentInputChange}
                        className="w-full border border-emerald-300 rounded-xl px-3 py-2 text-[14px] outline-none shadow-xs focus:ring-1 focus:ring-emerald-400 bg-white font-medium" 
                      />
                   </div>
                   <div className="flex flex-col gap-1.5 relative">
                      <label className="text-[14px] font-bold text-gray-700 uppercase tracking-tight">Upper Limit</label>
                      <div className="flex gap-4">
                        <input 
                          type="text" 
                          name="upper_limit"
                          value={componentFormData.upper_limit}
                          onChange={handleComponentInputChange}
                          className="flex-1 border border-emerald-300 rounded-xl px-3 py-2 text-[14px] outline-none shadow-xs focus:ring-1 focus:ring-emerald-400 bg-white font-medium" 
                        />
                        <button 
                          onClick={handleSaveComponent}
                          disabled={componentSaving}
                          className={`${editingComponentId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-[#17a2b8] hover:bg-[#138496]'} text-white w-10 h-8 rounded flex items-center justify-center shadow-lg active:scale-95 transition-all`}
                        >
                           {componentSaving ? <i className="fa-solid fa-spinner fa-spin"></i> : (editingComponentId ? <span className="text-[9px] font-black uppercase">Update</span> : <i className="fa-solid fa-plus text-lg font-black"></i>)}
                        </button>
                      </div>
                   </div>
                </div>

                <div className="flex flex-col gap-1 mt-4">
                   <div className="bg-[#f0f9ff] px-4 py-1.5 -mx-6 mb-2 border-y border-[#e0f2fe]">
                      <h4 className="text-[17px] text-gray-600 font-normal tracking-tight">View: Test Components</h4>
                   </div>
                   <div className="border border-gray-200 rounded-sm overflow-hidden relative shadow-inner bg-white min-h-[300px]">
                      <table className="w-full text-left text-[14px] border-collapse">
                         <thead className="bg-[#fcfdfe] border-b text-gray-600 font-bold shadow-xs sticky top-0 z-10">
                            <tr className="uppercase text-[11px] tracking-widest">
                               <th className="px-4 py-2.5 border-r">Name</th>
                               <th className="px-4 py-2.5 border-r">Range</th>
                               <th className="px-4 py-2.5 border-r">Units</th>
                               <th className="px-4 py-2.5 border-r w-[80px]">Code</th>
                               <th className="px-2 py-2.5 w-[40px] text-center border-r"><i className="fa-solid fa-chevron-up text-blue-500 opacity-50"></i></th>
                               <th className="px-2 py-2.5 w-[40px] text-center"><i className="fa-solid fa-chevron-down text-blue-500 opacity-50"></i></th>
                            </tr>
                         </thead>
                         <tbody className="bg-white divide-y divide-gray-50 custom-scrollbar overflow-y-auto max-h-[350px]">
                            {components.length > 0 ? components.map((comp) => (
                               <tr 
                                 key={comp.id} 
                                 onDoubleClick={() => handleDoubleClickComponent(comp)}
                                 className={`hover:bg-cyan-50/50 transition-colors cursor-pointer group ${editingComponentId === comp.id ? 'bg-orange-50 ring-1 ring-inset ring-orange-200' : ''}`}
                               >
                                  <td className="px-4 py-3 border-r text-gray-800 font-bold uppercase tracking-tight">{comp.name}</td>
                                  <td className="px-4 py-3 border-r text-gray-800 font-medium">{comp.lower_limit} - {comp.upper_limit}</td>
                                  <td className="px-4 py-3 border-r text-gray-800 font-medium">{comp.units || '-'}</td>
                                  <td className="px-4 py-3 border-r font-mono text-gray-400 text-xs">{comp.code || '-'}</td>
                                  <td className="px-2 py-3 border-r text-center"><i className="fa-solid fa-chevron-up text-blue-500 hover:text-blue-700 transition-colors"></i></td>
                                  <td className="px-2 py-3 text-center"><i className="fa-solid fa-chevron-down text-blue-500 hover:text-blue-700 transition-colors"></i></td>
                               </tr>
                            )) : (
                               <tr><td colSpan={6} className="py-20 text-center text-gray-300 font-medium italic uppercase tracking-widest opacity-40">No components defined</td></tr>
                            )}
                         </tbody>
                      </table>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Test Panel Modal */}
      {isPanelModalOpen && editingId && (
        <div className="fixed inset-0 bg-black/60 z-[9000] flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200 backdrop-blur-[1px]">
          <div className="bg-white w-full max-w-[650px] rounded shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-white/20">
             {/* Modal Header: Lavender Styling */}
             <div className="bg-[#e9eaf2] px-4 py-3 flex items-center justify-between border-b shadow-sm">
                <h3 className="text-[19px] text-[#4a4a7d] font-normal tracking-tight">Test Panel - {selectedTestName}</h3>
                <button onClick={() => setIsPanelModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                   <i className="fa-solid fa-times text-[20px]"></i>
                </button>
             </div>

             <div className="p-6 flex flex-col gap-6 bg-white">
                {/* Modal Data Mapping Form */}
                <div className="flex items-end gap-6">
                   <div className="flex-1 flex flex-col gap-1.5">
                      <label className="text-[14px] font-bold text-gray-700 uppercase tracking-tight">Test</label>
                      <div className="relative">
                        {/* Populated from name column of config_lab_tests */}
                        <select 
                          value={selectedIncludedTestName}
                          onChange={(e) => setSelectedIncludedTestName(e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] outline-none bg-white font-medium appearance-none focus:ring-1 focus:ring-cyan-500 shadow-xs"
                        >
                          <option value="">--Select Test to Add--</option>
                          {configuredTests.filter(t => t.id !== editingId).map(t => (
                            <option key={t.id} value={t.name}>{t.name}</option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                           <i className="fa-solid fa-chevron-down text-xs"></i>
                        </div>
                      </div>
                   </div>
                   {/* Actions: (+) Button */}
                   <button 
                      onClick={handleSavePanelMember}
                      disabled={panelSaving || !selectedIncludedTestName}
                      className="bg-[#17a2b8] hover:bg-[#138496] text-white w-10 h-10 rounded flex items-center justify-center shadow-lg active:scale-95 transition-all disabled:bg-gray-300"
                   >
                      {panelSaving ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-plus text-lg font-black"></i>}
                   </button>
                </div>

                {/* View: Panel Tests */}
                <div className="flex flex-col gap-1 mt-4">
                   <div className="bg-[#f0f9ff] px-4 py-1.5 -mx-6 mb-2 border-y border-[#e0f2fe]">
                      <h4 className="text-[17px] text-gray-600 font-normal tracking-tight">View: Panel Tests</h4>
                   </div>
                   <div className="border border-gray-200 rounded-sm overflow-hidden relative shadow-inner bg-white min-h-[250px]">
                      <table className="w-full text-left text-[14px] border-collapse">
                         <thead className="bg-[#fcfdfe] border-b text-gray-600 font-bold shadow-xs sticky top-0 z-10">
                            <tr className="uppercase text-[11px] tracking-widest">
                               <th className="px-4 py-2.5 border-r text-left">Test</th>
                               <th className="px-4 py-2.5 w-[50px] text-center"></th>
                            </tr>
                         </thead>
                         <tbody className="bg-white divide-y divide-gray-50 custom-scrollbar overflow-y-auto max-h-[300px]">
                            {panelMembers.length > 0 ? panelMembers.map((pm) => (
                               <tr key={pm.id} className="hover:bg-cyan-50/50 transition-colors">
                                  <td className="px-4 py-3 border-r text-gray-800 font-bold uppercase tracking-tight">
                                     {pm.included_test_name || 'Unknown Test'}
                                  </td>
                                  <td className="px-4 py-3 text-center">
                                     {/* Trash Icon: delete action with Success Notification */}
                                     <button 
                                       onClick={() => handleDeletePanelMember(pm.id)}
                                       className="text-gray-400 hover:text-red-600 transition-colors"
                                     >
                                        <i className="fa-solid fa-trash-can"></i>
                                     </button>
                                  </td>
                               </tr>
                            )) : (
                               <tr><td colSpan={2} className="py-20 text-center text-gray-300 font-medium italic uppercase tracking-widest opacity-40">No tests assigned to this panel</td></tr>
                            )}
                         </tbody>
                      </table>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Test Categories Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[9000] flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200 backdrop-blur-[1px]">
          <div className="bg-white w-full max-w-[650px] rounded shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="bg-[#e9eaf2] px-4 py-2.5 border-b flex items-center justify-between">
                <h3 className="text-[19px] text-[#4a4a7d] font-normal tracking-tight">Test Categories</h3>
                <button onClick={() => setIsCategoryModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1">
                   <i className="fa-solid fa-times text-[18px]"></i>
                </button>
             </div>
             <div className="p-6 flex flex-col gap-8">
                <div className="bg-[#f0f9ff] px-4 py-1.5 -mx-6 -mt-6 mb-4 border-b border-[#e0f2fe]">
                   <h4 className="text-[17px] text-gray-600 font-normal tracking-tight">Test Categories</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
                   <div className="flex flex-col gap-1.5">
                      <label className="text-[14px] font-bold text-gray-700 uppercase tracking-tight">Name <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        name="name"
                        value={categoryFormData.name}
                        onChange={handleCategoryInputChange}
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[14px] outline-none shadow-xs focus:ring-1 focus:ring-cyan-500" 
                      />
                   </div>
                   <div className="flex flex-col gap-1.5">
                      <label className="text-[14px] font-bold text-gray-700 uppercase tracking-tight">Description</label>
                      <div className="flex gap-4">
                        <input 
                          type="text" 
                          name="description"
                          value={categoryFormData.description}
                          onChange={handleCategoryInputChange}
                          className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-[14px] outline-none shadow-xs focus:ring-1 focus:ring-cyan-500" 
                        />
                        <button 
                          onClick={handleSaveCategory}
                          disabled={categorySaving}
                          className={`${editingCategoryId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-[#17a2b8] hover:bg-[#138496]'} text-white w-10 h-8 rounded flex items-center justify-center shadow-md active:scale-95 transition-all`}
                        >
                           {categorySaving ? <i className="fa-solid fa-spinner fa-spin"></i> : (editingCategoryId ? <span className="text-[9px] font-black tracking-widest">Update</span> : <i className="fa-solid fa-plus text-lg font-black"></i>)}
                        </button>
                      </div>
                   </div>
                </div>
                <div className="flex flex-col gap-1 mt-4">
                   <div className="bg-[#f0f9ff] px-4 py-1.5 -mx-6 mb-2 border-y border-[#e0f2fe] flex items-center justify-between">
                      <h4 className="text-[17px] text-gray-600 font-normal tracking-tight">Item Categories View</h4>
                      <div className="flex items-center gap-2 pr-4">
                         <span className="text-[11px] text-gray-400 font-bold uppercase">Search:</span>
                         <input 
                           type="text" 
                           value={categorySearchQuery}
                           onChange={(e) => setCategorySearchQuery(e.target.value)}
                           className="border border-gray-200 rounded-sm px-2 py-0.5 text-[12px] outline-none w-32"
                         />
                      </div>
                   </div>
                   <div className="flex gap-1 mb-2">
                      <button className="border border-gray-300 bg-white px-3 py-0.5 text-[11px] text-gray-600 rounded-sm hover:bg-gray-50 shadow-xs font-bold uppercase tracking-tighter">Excel</button>
                      <button className="border border-gray-300 bg-white px-3 py-0.5 text-[11px] text-gray-600 rounded-sm hover:bg-gray-50 shadow-xs font-bold uppercase tracking-tighter">CSV</button>
                      <button className="border border-gray-300 bg-white px-3 py-0.5 text-[11px] text-gray-600 rounded-sm hover:bg-gray-50 shadow-xs font-bold uppercase tracking-tighter">Print</button>
                   </div>
                   <div className="border border-gray-200 rounded-sm overflow-hidden relative shadow-inner bg-white min-h-[250px]">
                      <table className="w-full text-left text-[14px] border-collapse">
                         <thead className="bg-[#fcfdfe] border-b text-gray-600 font-bold shadow-xs sticky top-0">
                            <tr>
                               <th className="px-4 py-2 border-r w-[240px] uppercase text-[11px] tracking-widest">Test Category ID</th>
                               <th className="px-4 py-2 uppercase text-[11px] tracking-widest">Name</th>
                            </tr>
                         </thead>
                         <tbody className="bg-white divide-y divide-gray-50 custom-scrollbar overflow-y-auto max-h-[300px]">
                            {filteredCategories.map((cat) => (
                               <tr 
                                 key={cat.id} 
                                 onDoubleClick={() => handleDoubleClickCategory(cat)}
                                 className={`hover:bg-gray-50 transition-colors cursor-pointer ${editingCategoryId === cat.id ? 'bg-orange-50' : ''}`}
                               >
                                  <td className="px-4 py-2 border-r w-[240px] text-gray-800 font-black text-[13px]">{cat.id}</td>
                                  <td className="px-4 py-2 text-gray-800 font-bold uppercase tracking-tight">{cat.name}</td>
                               </tr>
                            ))}
                            {filteredCategories.length === 0 && (
                               <tr><td colSpan={2} className="py-20 text-center text-gray-300 italic">No categories found...</td></tr>
                            )}
                         </tbody>
                      </table>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Test Specimen Modal */}
      {isSpecimenModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[9000] flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200 backdrop-blur-[1px]">
          <div className="bg-white w-full max-w-[650px] rounded shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-white/20">
             {/* Modal Header */}
             <div className="bg-[#e9eaf2] px-4 py-3 flex items-center justify-between border-b shadow-sm">
                <h3 className="text-[19px] text-[#4a4a7d] font-normal tracking-tight">Test Specimen</h3>
                <button onClick={() => setIsSpecimenModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                   <i className="fa-solid fa-times text-[20px]"></i>
                </button>
             </div>

             <div className="p-6 flex flex-col gap-8">
                {/* Form Section Title */}
                <div className="bg-[#f0f9ff] px-4 py-1.5 -mx-6 -mt-6 mb-4 border-b border-[#e0f2fe]">
                   <h4 className="text-[17px] text-gray-600 font-normal tracking-tight">Test Specimen</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
                   <div className="flex flex-col gap-1.5">
                      <label className="text-[14px] font-bold text-gray-700 uppercase tracking-tight">Name <span className="text-red-500 font-black">*</span></label>
                      <input 
                        type="text" 
                        name="name"
                        value={specimenFormData.name}
                        onChange={handleSpecimenInputChange}
                        placeholder="Specimen name..."
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[14px] outline-none shadow-xs focus:ring-1 focus:ring-cyan-500 bg-white font-medium" 
                      />
                   </div>
                   <div className="flex flex-col gap-1.5">
                      <label className="text-[14px] font-bold text-gray-700 uppercase tracking-tight">Description</label>
                      <div className="flex gap-4">
                        <input 
                          type="text" 
                          name="description"
                          value={specimenFormData.description}
                          onChange={handleSpecimenInputChange}
                          placeholder="Brief info..."
                          className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-[14px] outline-none shadow-xs focus:ring-1 focus:ring-cyan-500 bg-white font-medium" 
                        />
                        <button 
                          onClick={handleSaveSpecimen}
                          disabled={specimenSaving}
                          className={`${editingSpecimenId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-[#17a2b8] hover:bg-[#138496]'} text-white w-10 h-8 rounded flex items-center justify-center shadow-lg active:scale-95 transition-all`}
                        >
                           {specimenSaving ? <i className="fa-solid fa-spinner fa-spin"></i> : (editingSpecimenId ? <span className="text-[9px] font-black tracking-widest uppercase">Update</span> : <i className="fa-solid fa-plus text-lg font-black"></i>)}
                        </button>
                      </div>
                   </div>
                </div>

                {/* View Section */}
                <div className="flex flex-col gap-1 mt-4">
                   <div className="bg-[#f0f9ff] px-4 py-1.5 -mx-6 mb-2 border-y border-[#e0f2fe] flex items-center justify-between">
                      <h4 className="text-[17px] text-gray-600 font-normal tracking-tight">View: Test Specimen</h4>
                      <div className="flex items-center gap-2 pr-4">
                         <span className="text-[11px] text-gray-400 font-bold uppercase">Search:</span>
                         <input 
                           type="text" 
                           value={specimenSearchQuery}
                           onChange={(e) => setSpecimenSearchQuery(e.target.value)}
                           className="border border-gray-200 rounded-sm px-2 py-0.5 text-[12px] outline-none w-36 bg-white"
                         />
                      </div>
                   </div>
                   <div className="flex gap-1 mb-2">
                      <button className="border border-gray-300 bg-white px-3 py-0.5 text-[11px] text-gray-600 rounded-sm hover:bg-gray-50 shadow-xs font-bold uppercase tracking-tighter">Excel</button>
                      <button className="border border-gray-300 bg-white px-3 py-1 text-[11px] text-gray-600 rounded-sm hover:bg-gray-50 shadow-xs font-bold uppercase tracking-tighter">CSV</button>
                      <button className="border border-gray-300 bg-white px-3 py-1 text-[11px] text-gray-600 rounded-sm hover:bg-gray-50 shadow-xs font-bold uppercase tracking-tighter">Print</button>
                   </div>
                   <div className="border border-gray-200 rounded-sm overflow-hidden relative shadow-inner bg-white min-h-[300px]">
                      <table className="w-full text-left text-[14px] border-collapse">
                         <thead className="bg-[#fcfdfe] border-b text-gray-600 font-bold shadow-xs sticky top-0 z-10">
                            <tr className="uppercase text-[11px] tracking-widest">
                               <th className="px-4 py-2.5 border-r w-[200px]">Test Specimen ID</th>
                               <th className="px-4 py-2.5">Name</th>
                            </tr>
                         </thead>
                         <tbody className="bg-white divide-y divide-gray-50 custom-scrollbar overflow-y-auto max-h-[350px]">
                            {filteredSpecimens.length > 0 ? filteredSpecimens.map((spec) => (
                               <tr 
                                 key={spec.id} 
                                 onDoubleClick={() => handleDoubleClickSpecimen(spec)}
                                 className={`hover:bg-cyan-50/50 transition-colors cursor-pointer group ${editingId === spec.id ? 'bg-orange-50 ring-1 ring-inset ring-orange-200' : ''}`}
                               >
                                  <td className="px-4 py-3 border-r w-[200px] text-gray-800 font-black text-[13px] group-hover:text-cyan-800">{spec.id}</td>
                                  <td className="px-4 py-3 text-gray-800 font-bold uppercase tracking-tight group-hover:text-cyan-900">{spec.name}</td>
                               </tr>
                            )) : (
                               <tr><td colSpan={2} className="py-20 text-center text-gray-300 font-medium italic uppercase tracking-widest opacity-40">No specimens found in system</td></tr>
                            )}
                         </tbody>
                      </table>
                   </div>
                </div>
             </div>
          </div>
        </div>
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
          className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[14px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 appearance-none shadow-sm font-medium"
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
        className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-sm font-medium" 
      />
    )}
  </div>
);

const ActionBtn: React.FC<{ label: string; variant?: 'teal'; onClick?: () => void }> = ({ label, variant, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full border rounded-sm py-2 px-4 text-[12px] font-black uppercase tracking-widest shadow-md transition-all active:scale-95 text-center ${
    variant === 'teal' 
      ? 'bg-[#008b8b] border-[#007a7a] text-white hover:bg-[#007a7a]' 
      : 'bg-white border-gray-200 text-[#4a4a7d] hover:bg-gray-50'
  }`}>
    {label}
  </button>
);
