
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

interface ServiceInputModalProps {
  serviceId: number;
  serviceName: string;
  onClose: () => void;
}

export const ServiceInputModal: React.FC<ServiceInputModalProps> = ({ serviceId, serviceName, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [inputs, setInputs] = useState<any[]>([]);
  const [storageLocations, setStorageLocations] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [editingInputId, setEditingInputId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    item_type: 'Product',
    storage_location: '',
    product_name: '',
    required_quantity: '1',
    is_non_discrete: false
  });

  const isMounted = useRef(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Inputs linked to this service
      const { data: inputData, error: inputError } = await supabase
        .from('config_service_inputs')
        .select('*')
        .eq('service_id', serviceId)
        .order('id', { ascending: true });
      if (inputError) throw inputError;
      if (isMounted.current) setInputs(inputData || []);

      // 2. Fetch Storage Locations for dropdown
      const { data: locData } = await supabase.from('config_storage_locations').select('name');
      if (isMounted.current) setStorageLocations(locData || []);

      // 3. Fetch Products for dropdown
      const { data: prodData } = await supabase.from('inventory_items').select('name').order('name');
      if (isMounted.current) setProducts(prodData || []);

    } catch (err: any) {
      console.error("Fetch Modal Error:", err.message);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    fetchData();
    return () => { isMounted.current = false; };
  }, [serviceId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSave = async () => {
    if (!formData.product_name || !formData.required_quantity) {
      alert("Please select a product and enter a quantity.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        service_id: serviceId,
        item_type: formData.item_type,
        storage_location: formData.storage_location,
        product_name: formData.product_name,
        required_quantity: parseFloat(formData.required_quantity) || 0,
        is_non_discrete: formData.is_non_discrete
      };

      if (editingInputId) {
        const { error } = await supabase.from('config_service_inputs').update(payload).eq('id', editingInputId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('config_service_inputs').insert([payload]);
        if (error) throw error;
      }

      setFormData({
        item_type: 'Product',
        storage_location: '',
        product_name: '',
        required_quantity: '1',
        is_non_discrete: false
      });
      setEditingInputId(null);
      await fetchData();

    } catch (err: any) {
      alert("Save Failed: " + err.message);
    } finally {
      if (isMounted.current) setSaving(false);
    }
  };

  const handleDoubleClick = (item: any) => {
    setFormData({
      item_type: item.item_type || 'Product',
      storage_location: item.storage_location || '',
      product_name: item.product_name || '',
      required_quantity: item.required_quantity?.toString() || '1',
      is_non_discrete: item.is_non_discrete || false
    });
    setEditingInputId(item.id);
  };

  const filteredInputs = inputs.filter(item => 
    item.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.item_type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[7000] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-[1000px] rounded shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#e9eaf2] px-6 py-3 flex items-center justify-between border-b">
          <h3 className="text-[18px] text-[#4a4a7d] font-normal uppercase tracking-tight">Service Input Items - <span className="font-bold text-[#17a2b8]">{serviceName}</span></h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <i className="fa-solid fa-times text-[20px]"></i>
          </button>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="p-8 overflow-y-auto custom-scrollbar flex flex-col gap-8">
           
           {/* Top Form Section */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-5 items-start">
              <div className="flex flex-col gap-4">
                 <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-bold text-gray-700 uppercase">Type</label>
                    <select 
                       name="item_type"
                       value={formData.item_type}
                       onChange={handleInputChange}
                       className="w-full border border-green-400 rounded-lg px-3 py-1.5 text-[14px] bg-white outline-none focus:ring-1 focus:ring-green-500 text-green-700 font-medium appearance-none shadow-sm"
                    >
                       <option value="Product">Product</option>
                       <option value="Service">Service</option>
                    </select>
                 </div>
                 <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-bold text-gray-700 uppercase">Storage Location</label>
                    <select 
                       name="storage_location"
                       value={formData.storage_location}
                       onChange={handleInputChange}
                       className="w-full border border-green-400 rounded-lg px-3 py-1.5 text-[14px] bg-white outline-none focus:ring-1 focus:ring-green-500 text-green-700 font-medium appearance-none shadow-sm"
                    >
                       <option value="">--Select Location--</option>
                       {storageLocations.map((loc, i) => <option key={i} value={loc.name}>{loc.name}</option>)}
                    </select>
                 </div>
                 <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-bold text-gray-700 uppercase">Product</label>
                    <select 
                       name="product_name"
                       value={formData.product_name}
                       onChange={handleInputChange}
                       className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-[14px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 appearance-none shadow-sm"
                    >
                       <option value="">--Select Item--</option>
                       {products.map((p, i) => <option key={i} value={p.name}>{p.name}</option>)}
                    </select>
                 </div>
              </div>

              <div className="flex flex-col gap-4">
                 <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-bold text-gray-700 uppercase">Required Quantity</label>
                    <input 
                       type="number"
                       name="required_quantity"
                       value={formData.required_quantity}
                       onChange={handleInputChange}
                       className="w-full border border-green-400 rounded-lg px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-green-500 bg-white shadow-sm" 
                    />
                 </div>
                 <div className="flex items-center gap-2 pt-2">
                    <input 
                      type="checkbox" 
                      id="non-discrete"
                      name="is_non_discrete"
                      checked={formData.is_non_discrete}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded border-gray-300 text-[#17a2b8] focus:ring-[#17a2b8] cursor-pointer" 
                    />
                    <label htmlFor="non-discrete" className="text-[13px] text-gray-600 font-bold cursor-pointer">Is Non-Discrete</label>
                 </div>
              </div>

              <div className="flex flex-col gap-1 text-[12px] text-gray-500 font-medium pl-6 border-l border-gray-100 h-full">
                 <div className="flex justify-between"><span>Unit Of Measure:</span><span className="font-bold"></span></div>
                 <div className="flex justify-between"><span>Code:</span><span className="font-bold"></span></div>
                 <div className="flex justify-between"><span>Unit Cost:</span><span className="font-bold"></span></div>
                 <div className="flex justify-between"><span>Unit Price:</span><span className="font-bold"></span></div>
                 <div className="flex justify-between"><span>Required Qty cost:</span><span className="font-bold"></span></div>
                 
                 <div className="mt-auto flex justify-end">
                    <button 
                      onClick={handleSave}
                      disabled={saving}
                      className="bg-[#17a2b8] text-white w-10 h-10 rounded flex items-center justify-center hover:bg-[#138496] shadow-lg transition-all active:scale-95 disabled:bg-gray-300"
                    >
                       {saving ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-plus text-xl"></i>}
                    </button>
                 </div>
              </div>
           </div>

           {/* View Section */}
           <div className="flex flex-col gap-4 mt-4">
              <div className="bg-[#f8f9fa] border-b border-gray-200 px-4 py-2">
                 <h2 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">View: Service Inputs</h2>
              </div>
              
              <div className="flex flex-wrap items-center justify-between gap-4">
                 <div className="flex gap-1.5">
                    <button className="border border-gray-300 bg-white px-3 py-1 text-[11px] text-gray-600 rounded-sm hover:bg-gray-50 uppercase font-bold tracking-tight">Excel</button>
                    <button className="border border-gray-300 bg-white px-3 py-1 text-[11px] text-gray-600 rounded-sm hover:bg-gray-50 uppercase font-bold tracking-tight">CSV</button>
                    <button className="border border-gray-300 bg-white px-3 py-1 text-[11px] text-gray-600 rounded-sm hover:bg-gray-50 uppercase font-bold tracking-tight">Print</button>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-[12px] text-gray-500 font-bold uppercase">Search:</span>
                    <input 
                      type="text" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border border-gray-300 rounded px-2.5 py-1 text-[12px] outline-none w-[200px] focus:ring-1 focus:ring-cyan-500 shadow-sm bg-white" 
                    />
                 </div>
              </div>

              <div className="border border-gray-200 rounded-sm overflow-x-auto min-h-[250px] bg-white shadow-inner">
                <table className="w-full text-left text-[13px] whitespace-nowrap">
                   <thead className="bg-[#f8f9fa] text-gray-600 border-b sticky top-0">
                      <tr>
                         <th className="px-6 py-2 font-bold border-r w-[80px]">No</th>
                         <th className="px-6 py-2 font-bold border-r">Type</th>
                         <th className="px-6 py-2 font-bold border-r">Name</th>
                         <th className="px-6 py-2 font-bold">Quantity</th>
                      </tr>
                   </thead>
                   <tbody>
                      {loading ? (
                        <tr><td colSpan={4} className="py-12 text-center text-gray-400 italic">Loading items...</td></tr>
                      ) : filteredInputs.length > 0 ? (
                        filteredInputs.map((item, idx) => (
                          <tr 
                             key={item.id} 
                             onDoubleClick={() => handleDoubleClick(item)}
                             className={`border-b hover:bg-cyan-50 transition-colors cursor-pointer ${editingInputId === item.id ? 'bg-orange-50' : ''}`}
                          >
                             <td className="px-6 py-2 border-r text-gray-500 font-mono text-[11px]">{item.id}</td>
                             <td className="px-6 py-2 border-r font-medium">{item.item_type}</td>
                             <td className="px-6 py-2 border-r font-bold text-gray-800 uppercase tracking-tight">{item.product_name}</td>
                             <td className="px-6 py-2 font-black text-blue-900">{item.required_quantity}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="py-20 text-center text-gray-400 font-medium italic uppercase tracking-[0.2em] opacity-50 select-none">
                            No data available in table
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
