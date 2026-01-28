
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

interface HospitalInfoProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const HospitalInfo: React.FC<HospitalInfoProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    registration_number: '',
    vat_number: '',
    website: '',
    pin_number: '',
    agent_number: '',
    logo_url: ''
  });

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    const fetchHospitalInfo = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('config_hospital_info')
          .select('*')
          .eq('id', 1)
          .maybeSingle();
        
        if (error) throw error;
        if (data && isMounted.current) {
          setFormData({
            name: data.name || '',
            registration_number: data.registration_number || '',
            vat_number: data.vat_number || '',
            website: data.website || '',
            pin_number: data.pin_number || '',
            agent_number: data.agent_number || '',
            logo_url: data.logo_url || ''
          });
          if (data.logo_url) setLogoPreview(data.logo_url);
        }
      } catch (err: any) {
        console.error("Fetch Error:", err.message);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    };

    fetchHospitalInfo();
    return () => { isMounted.current = false; };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoPreview(result);
        setFormData(prev => ({ ...prev, logo_url: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    if (!formData.name) {
      alert("Hospital Name is required.");
      return;
    }
    setUpdating(true);
    try {
      // Perform targeted UPSERT on ID 1 as per requirements
      const { error } = await supabase
        .from('config_hospital_info')
        .upsert({
          id: 1,
          name: formData.name,
          registration_number: formData.registration_number,
          vat_number: formData.vat_number,
          website: formData.website,
          pin_number: formData.pin_number,
          agent_number: formData.agent_number,
          logo_url: formData.logo_url,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      setShowSuccess(true);
      setTimeout(() => { if (isMounted.current) setShowSuccess(false); }, 4000);
    } catch (err: any) {
      alert("Update failed: " + err.message);
    } finally {
      if (isMounted.current) setUpdating(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20 relative min-h-full">
      
      {/* Premium Emerald-to-Teal Gradient Snackbar */}
      {showSuccess && (
        <div className="fixed top-12 right-6 z-[9000] animate-in slide-in-from-right-8 duration-300 pointer-events-auto">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-4 border border-white/20 min-w-[360px]">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0 shadow-inner">
              <i className="fa-solid fa-check text-xl animate-pulse"></i>
            </div>
            <div className="flex-1">
              <h3 className="font-black text-[13px] uppercase tracking-wider leading-none mb-1">Update Success</h3>
              <p className="text-[12px] font-bold opacity-95 leading-tight">Hospital Information Updated Successfully! 🏥</p>
            </div>
            <button onClick={() => setShowSuccess(false)} className="text-white/40 hover:text-white transition-colors p-1">
              <i className="fa-solid fa-times text-xs"></i>
            </button>
          </div>
        </div>
      )}

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

      <div className="bg-[#f8f9fa] border border-gray-200 rounded-sm px-4 py-1.5 flex items-center justify-between text-[12px]">
        <div className="flex items-center gap-2 text-gray-500">
          <i className="fa-solid fa-home text-blue-500"></i>
          <span className="opacity-50">/</span>
          <span className="text-blue-500 cursor-pointer hover:underline font-medium">Configurations</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Hospital Info</span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden flex flex-col min-h-[450px]">
        <div className="px-4 py-2 border-b bg-[#e9eaf2] flex items-center justify-between">
          <h2 className="text-[17px] font-normal text-gray-600 uppercase tracking-tight">Hospital Information</h2>
          {loading && <i className="fa-solid fa-spinner fa-spin text-gray-400 mr-2"></i>}
        </div>

        <div className="p-10">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-8 items-start">
              <div className="flex flex-col gap-2">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Name <span className="text-red-500">*</span></label>
                 <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-[15px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white text-green-700 font-bold shadow-xs" 
                 />
              </div>
              <div className="flex flex-col gap-2">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Registration Number</label>
                 <input 
                    type="text" 
                    name="registration_number"
                    value={formData.registration_number}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-[15px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white text-green-700 font-bold shadow-xs" 
                 />
              </div>
              <div className="flex flex-col gap-2">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">VAT Number</label>
                 <input 
                    type="text" 
                    name="vat_number"
                    value={formData.vat_number}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-[15px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white font-medium shadow-xs" 
                 />
              </div>
              <div className="flex flex-col gap-2">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Company Logo</label>
                 <div className="flex border border-gray-300 rounded overflow-hidden shadow-xs group">
                    <label className="bg-gray-100 px-3 py-2 text-[12px] border-r border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors font-bold text-gray-600">
                       Choose File
                       <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
                    </label>
                    <span className="flex-1 px-3 py-2 text-[12px] text-gray-400 italic truncate bg-white">
                      {logoPreview ? 'Custom_Hospital_Logo.png' : 'No file chosen'}
                    </span>
                 </div>
              </div>

              <div className="flex flex-col gap-2">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Website</label>
                 <input 
                    type="text" 
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-[15px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white text-green-700 font-bold shadow-xs" 
                 />
              </div>
              <div className="flex flex-col gap-2">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Pin Number</label>
                 <input 
                    type="text" 
                    name="pin_number"
                    value={formData.pin_number}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-[15px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white text-green-700 font-bold shadow-xs" 
                 />
              </div>
              <div className="flex flex-col gap-2">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Agent Number</label>
                 <input 
                    type="text" 
                    name="agent_number"
                    value={formData.agent_number}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-[15px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white font-medium shadow-xs" 
                 />
              </div>
              
              <div className="flex flex-col gap-4">
                 <div className="border border-gray-200 rounded-xl bg-slate-50 flex items-center justify-center shadow-inner h-32 relative overflow-hidden group">
                    {logoPreview ? (
                        <img src={logoPreview} alt="Logo Preview" className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-110" />
                    ) : (
                        <div className="text-center opacity-40">
                           <i className="fa-solid fa-image text-3xl text-gray-300 mb-1"></i>
                           <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Logo Placeholder</div>
                        </div>
                    )}
                 </div>
                 <div className="flex justify-end">
                    <button 
                       onClick={handleUpdate}
                       disabled={updating}
                       className="bg-[#17a2b8] text-white px-10 py-2.5 rounded shadow-xl text-[13px] font-black uppercase tracking-widest transition-all active:scale-95 hover:bg-[#138496] disabled:bg-gray-300 flex items-center gap-2"
                    >
                       {updating ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-cloud-arrow-up"></i>}
                       UPDATE INFO
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
