
import React from 'react';

interface PayrollParametersProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const PayrollParameters: React.FC<PayrollParametersProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20">
      {/* Top Header Bar */}
      <div className="bg-white rounded-sm h-10 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <i onClick={onBack} className="fa-solid fa-times text-gray-400 cursor-pointer hover:text-gray-600 text-xs"></i>
          <h1 className="text-gray-700 font-semibold text-[14px]">Demo Hospital</h1>
        </div>
        <div className="flex items-center gap-12 text-[13px] text-gray-500">
          <div>Branch: <span className="text-[#43939e] cursor-pointer hover:underline">Main branch</span></div>
          <div>Room: <span onClick={onOpenRoomModal} className="text-[#43939e] cursor-pointer hover:underline">{currentRoom}</span></div>
          <button className="bg-[#17a2b8] text-white px-4 py-1 rounded-sm text-[11px]">Queue</button>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-[#f8f9fa] border border-gray-200 rounded-sm px-4 py-1.5 flex items-center justify-between text-[12px]">
        <div className="flex items-center gap-2 text-gray-500">
          <i className="fa-solid fa-home text-blue-500"></i>
          <span className="opacity-50">/</span>
          <span className="text-blue-500 cursor-pointer hover:underline">HR</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Payroll Parameters</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Payroll Parameter Details Form Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between">
          <h2 className="text-[16px] font-medium text-gray-600 uppercase tracking-tight">Payroll Parameter Details</h2>
          <div className="relative group">
             <button className="bg-[#5bc0de] text-white px-3 py-1 rounded-sm text-[11px] font-bold flex items-center gap-2 hover:bg-[#31b0d5]">
               Actions <i className="fa-solid fa-caret-down text-[9px]"></i>
             </button>
          </div>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start relative">
           {/* Left Form Block (9 cols) */}
           <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              <ParamField label="Name" />
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Category</label>
                <div className="flex gap-2">
                  <select className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white">
                    <option></option>
                  </select>
                  <button className="text-blue-600 hover:text-blue-800 transition-colors">
                    <i className="fa-solid fa-plus-circle text-lg"></i>
                  </button>
                </div>
              </div>
              <ParamField label="Description" isTextarea />
              <ParamField label="Default Value" />
              
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Round To</label>
                 <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white text-green-700 font-medium">
                    <option>Hundredths (2 dp)</option>
                 </select>
              </div>

              <div className="flex flex-col gap-2 pt-6">
                 <CheckboxItem id="required" label="Is Required" />
                 <CheckboxItem id="default_val" label="Use Default Value" />
              </div>
           </div>

           {/* Right Form Block (Checkbox List & Save) (3 cols) */}
           <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                 <CheckboxItem id="default_param" label="Is Default" />
                 <CheckboxItem id="salary_advance" label="Is Salary Advance" />
                 <CheckboxItem id="medical_deduction" label="Is Employee Medical Invoice Deduction" />
                 <CheckboxItem id="config_rates" label="Use Configured Rates" />
              </div>
              <div className="flex justify-end mt-4">
                 <button className="bg-[#17a2b8] text-white w-10 h-10 rounded flex items-center justify-center hover:bg-[#138496] shadow-md transition-all active:scale-95">
                    <i className="fa-solid fa-plus text-lg"></i>
                 </button>
              </div>
           </div>
        </div>

        {/* View Section */}
        <div className="border-t border-gray-200">
           <div className="px-4 py-2 bg-[#f8f9fa] border-b">
             <h2 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">View: Payroll Parameters</h2>
           </div>
           <div className="p-4 flex flex-col gap-4">
              <div className="flex justify-end items-center gap-2">
                 <span className="text-[12px] text-gray-500">Search:</span>
                 <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[11px] outline-none w-[200px]" />
              </div>

              <div className="border border-gray-200 rounded-sm overflow-hidden">
                <table className="w-full text-left text-[12px] whitespace-nowrap">
                  <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                    <tr>
                      <th className="px-3 py-2 font-bold border-r">No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-3 py-2 font-bold border-r text-blue-800">Name <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-3 py-2 font-bold border-r">Category <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                      <th className="px-3 py-2 font-bold border-r">Required <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-3 py-2 font-bold">Default <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-gray-700">
                     <ParamRow no="1" name="Basic Pay" cat="Basic Pay" req="Yes" def="0.00" />
                     <ParamRow no="2" name="NHIF" cat="National Hospital Cover" req="No" def="0.00" />
                     <ParamRow no="3" name="NSSF" cat="Security Fund" req="Yes" def="0.00" />
                     <ParamRow no="4" name="Personal Relief" cat="Tax Relief" req="Yes" def="2,400.00" />
                     <ParamRow no="5" name="PAYE" cat="PAYE" req="Yes" def="0.00" />
                     <ParamRow no="6" name="RBA" cat="Pension" req="No" def="0.00" />
                     <ParamRow no="8" name="Over Time" cat="Over Time" req="No" def="0.00" />
                     <ParamRow no="9" name="Advance" cat="Advance" req="No" def="0.00" />
                     <ParamRow no="10" name="Liberty Pension" cat="Pension" req="No" def="0.00" />
                     <ParamRow no="11" name="Housing" cat="Sacco" req="No" def="0.00" />
                     <ParamRow no="12" name="United Sacco" cat="Sacco" req="No" def="0.00" />
                  </tbody>
                </table>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const ParamField: React.FC<{ label: string; isTextarea?: boolean }> = ({ label, isTextarea = false }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">{label}</label>
    {isTextarea ? (
      <textarea className="w-full border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-xs resize-none h-10" />
    ) : (
      <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-xs" />
    )}
  </div>
);

const CheckboxItem: React.FC<{ id: string; label: string }> = ({ id, label }) => (
  <div className="flex items-center gap-2">
    <input type="checkbox" id={id} className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer" />
    <label htmlFor={id} className="text-[12px] text-gray-700 font-medium cursor-pointer">{label}</label>
  </div>
);

const ParamRow: React.FC<{ no: string; name: string; cat: string; req: string; def: string }> = ({ no, name, cat, req, def }) => (
  <tr className="border-b hover:bg-gray-50 transition-colors">
    <td className="px-3 py-2 border-r">{no}</td>
    <td className="px-3 py-2 border-r font-medium text-blue-700 cursor-pointer">{name}</td>
    <td className="px-3 py-2 border-r">{cat}</td>
    <td className="px-3 py-2 border-r">{req}</td>
    <td className="px-3 py-2 text-right">{def}</td>
  </tr>
);
