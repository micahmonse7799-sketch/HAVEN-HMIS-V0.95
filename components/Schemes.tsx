
import React from 'react';

interface SchemesProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const Schemes: React.FC<SchemesProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-blue-500 cursor-pointer hover:underline">Accounts</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Schemes</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Scheme Details Form Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between">
          <h2 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">Scheme Details</h2>
          <div className="relative group">
             <button className="bg-[#5bc0de] text-white px-3 py-1 rounded-sm text-[11px] font-bold flex items-center gap-2 hover:bg-[#31b0d5]">
               Actions <i className="fa-solid fa-caret-down text-[9px]"></i>
             </button>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-3">
            {/* Column 1 */}
            <div className="flex flex-col gap-3">
              <SchemeField label="Name" />
              <SchemeField label="Description" />
              <SchemeField label="Underwriter" type="select" />
              <SchemeField label="Category" type="select" />
              <SchemeField label="Physical Address" isTextarea />
              <SchemeField label="Postal Address" />
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-3">
              <SchemeField label="Postal Code" />
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase">Town/City</label>
                <div className="flex gap-2">
                  <select className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none bg-white">
                    <option></option>
                  </select>
                  <button className="text-blue-600 hover:text-blue-800 transition-colors">
                    <i className="fa-solid fa-plus-circle text-lg"></i>
                  </button>
                </div>
              </div>
              <SchemeField label="Telephone 1" />
              <SchemeField label="Telephone 2" />
              <SchemeField label="Email" />
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase">Credit Period From</label>
                <div className="relative">
                  <input type="text" placeholder="mm/dd/yyyy" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none" />
                  <i className="fa-solid fa-calendar absolute right-3 top-2 text-gray-400 text-[10px]"></i>
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase">Credit Period To</label>
                <div className="relative">
                  <input type="text" placeholder="mm/dd/yyyy" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none" />
                  <i className="fa-solid fa-calendar absolute right-3 top-2 text-gray-400 text-[10px]"></i>
                </div>
              </div>
              <SchemeField label="Receivable SubAccount" type="select" />
              <SchemeField label="Deposit SubAccount" type="select" />
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase">Current Balance</label>
                <input type="text" defaultValue="0" readOnly className="w-full border border-gray-200 bg-gray-50 rounded px-3 py-1.5 text-[13px] text-green-700 font-bold text-right outline-none" />
              </div>
              <SchemeField label="Comment" />
              <SchemeField label="Code" />
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-4">
              <SchemeField label="Pin Number" />
              
              <div className="flex flex-col gap-3 mt-2">
                 <CheckboxItem id="active" label="Is Active" />
                 <CheckboxItem id="default" label="Is Default Scheme" />
                 <CheckboxItem id="employee" label="Is Employee Scheme" />
                 <CheckboxItem id="smart" label="Uses Smart Card" />
                 <CheckboxItem id="sha" label="Is SHA Scheme" />
              </div>

              <div className="flex justify-end mt-4">
                 <button className="bg-[#17a2b8] text-white w-10 h-10 rounded flex items-center justify-center hover:bg-[#138496] shadow-md transition-all active:scale-95">
                    <i className="fa-solid fa-plus text-lg"></i>
                 </button>
              </div>
            </div>
          </div>
        </div>

        {/* View Section */}
        <div className="border-t border-gray-200">
           <div className="px-4 py-2 bg-[#f8f9fa] border-b flex items-center justify-between">
             <h2 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">View: Schemes</h2>
           </div>
           <div className="p-4 flex flex-col gap-4">
              <div className="flex justify-end items-center gap-2">
                 <span className="text-[12px] text-gray-500">Search:</span>
                 <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[200px]" />
              </div>

              <div className="border border-gray-200 rounded-sm overflow-x-auto">
                <table className="w-full text-left text-[12px] whitespace-nowrap">
                  <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                    <tr>
                      <th className="px-3 py-2 font-bold border-r">Scheme No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-3 py-2 font-bold border-r text-blue-800">Name <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-3 py-2 font-bold border-r">Underwriter <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-3 py-2 font-bold border-r text-right">OPD Limit <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-3 py-2 font-bold border-r text-right">IPD Limit <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-3 py-2 font-bold border-r text-right">Copayment <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-3 py-2 font-bold">Flags <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-gray-700">
                     <SchemeRow no="1" name="Cash Payers" underwriter="-" opd="0.00" ipd="0.00" co="0.00" flags="Active | Default Scheme" />
                     <SchemeRow no="2" name="CASH PAY LATER" underwriter="-" opd="0.00" ipd="0.00" co="0.00" flags="Active" />
                     <SchemeRow no="3" name="Child Under Five" underwriter="-" opd="0.00" ipd="300,000.00" co="0.00" flags="" />
                     <SchemeRow no="4" name="SHA OUTPATIENT" underwriter="SHA" opd="0.00" ipd="0.00" co="0.00" flags="Active" />
                     <SchemeRow no="6" name="AON INSURANCE" underwriter="Minet" opd="3,000.00" ipd="0.00" co="0.00" flags="Active | Uses Smart Card" />
                     <SchemeRow no="8" name="SHA INPATIENT" underwriter="SHA" opd="0.00" ipd="0.00" co="0.00" flags="Active" />
                     <SchemeRow no="10" name="Under Five" underwriter="-" opd="0.00" ipd="0.00" co="1,000.00" flags="" />
                     <SchemeRow no="11" name="DEMO HOSPITAL EMPLOYEES" underwriter="-" opd="0.00" ipd="0.00" co="0.00" flags="Active" />
                     <SchemeRow no="12" name="NAIROBI WOMEN HOSPITAL" underwriter="-" opd="0.00" ipd="0.00" co="0.00" flags="" />
                     <SchemeRow no="13" name="JUBILEE" underwriter="-" opd="0.00" ipd="0.00" co="0.00" flags="Active | Uses Smart Card" />
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center mt-2">
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-1.5 rounded shadow-xs text-[12px] font-medium hover:bg-gray-50">
                  Scheme Categories
                </button>
                <div className="text-[12px] text-gray-500">Showing 1 to 10 of 16 entries</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const SchemeField: React.FC<{ label: string; type?: 'text' | 'select'; isTextarea?: boolean }> = ({ label, type = 'text', isTextarea = false }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">{label}</label>
    {isTextarea ? (
      <textarea className="w-full border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-xs resize-none h-10" />
    ) : type === 'select' ? (
      <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-xs">
        <option></option>
      </select>
    ) : (
      <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-xs" />
    )}
  </div>
);

const CheckboxItem: React.FC<{ id: string; label: string }> = ({ id, label }) => (
  <div className="flex items-center gap-2">
    <input type="checkbox" id={id} className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer" />
    <label htmlFor={id} className="text-[12px] text-gray-700 font-medium cursor-pointer">{label}</label>
  </div>
);

const SchemeRow: React.FC<{ no: string; name: string; underwriter: string; opd: string; ipd: string; co: string; flags: string }> = ({ no, name, underwriter, opd, ipd, co, flags }) => (
  <tr className="border-b hover:bg-gray-50 transition-colors">
    <td className="px-3 py-2 border-r">{no}</td>
    <td className="px-3 py-2 border-r font-medium text-blue-700 cursor-pointer">{name}</td>
    <td className="px-3 py-2 border-r">{underwriter}</td>
    <td className="px-3 py-2 border-r text-right">{opd}</td>
    <td className="px-3 py-2 border-r text-right">{ipd}</td>
    <td className="px-3 py-2 border-r text-right">{co}</td>
    <td className="px-3 py-2 font-medium text-gray-600">{flags}</td>
  </tr>
);
