
import React from 'react';

interface TaxesProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const Taxes: React.FC<TaxesProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-gray-400 font-medium">Taxes</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* VAT Type Details */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
          <div className="px-4 py-2 border-b bg-[#f8f9fa]">
            <h2 className="text-[15px] font-medium text-gray-600">VAT Type Details</h2>
          </div>
          <div className="p-4 flex flex-col gap-4">
             <div className="grid grid-cols-2 gap-4">
                <TaxField label="Name" />
                <TaxField label="Per Rate(%)" />
                <TaxField label="VAT Liability Sub-Account" type="select" />
                <TaxField label="Tax Code" />
             </div>
             <div className="flex justify-end">
                <button className="bg-[#17a2b8] text-white w-8 h-8 rounded flex items-center justify-center hover:bg-[#138496] shadow-md">
                   <i className="fa-solid fa-plus"></i>
                </button>
             </div>
             <div className="mt-4">
                <h3 className="text-[14px] font-bold text-gray-600 mb-2">View: VAT Types</h3>
                <div className="flex gap-1 mb-2">
                   <button className="border border-gray-300 bg-white px-2 py-0.5 text-[10px] text-gray-600 rounded">Excel</button>
                   <button className="border border-gray-300 bg-white px-2 py-0.5 text-[10px] text-gray-600 rounded">CSV</button>
                   <button className="border border-gray-300 bg-white px-2 py-0.5 text-[10px] text-gray-600 rounded">Print</button>
                </div>
                <div className="border border-gray-200 rounded-sm overflow-hidden">
                   <table className="w-full text-left text-[12px]">
                      <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                         <tr>
                            <th className="px-3 py-1.5 font-bold border-r">VATType ID</th>
                            <th className="px-3 py-1.5 font-bold border-r">Name</th>
                            <th className="px-3 py-1.5 font-bold">Per Rate (%)</th>
                         </tr>
                      </thead>
                      <tbody className="bg-white text-gray-700">
                         <TaxRow id="1" name="VAT Exempt" rate="0" />
                         <TaxRow id="3" name="Reduced VAT Rate" rate="12" />
                         <TaxRow id="4" name="Standard VAT" rate="16" />
                         <TaxRow id="5" name="Zero Rated" rate="0" />
                         <TaxRow id="6" name="Fuel" rate="16" />
                         <TaxRow id="7" name="VAT" rate="16" />
                      </tbody>
                   </table>
                </div>
             </div>
          </div>
        </div>

        {/* Other Tax Details */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
          <div className="px-4 py-2 border-b bg-[#f8f9fa]">
            <h2 className="text-[15px] font-medium text-gray-600">Other Tax Details</h2>
          </div>
          <div className="p-4 flex flex-col gap-4">
             <div className="grid grid-cols-2 gap-4">
                <TaxField label="Name" />
                <TaxField label="Per Rate(%)" />
                <div className="col-span-1">
                   <TaxField label="VAT Liability Sub-Account" type="select" />
                </div>
             </div>
             <div className="flex justify-end">
                <button className="bg-[#17a2b8] text-white w-8 h-8 rounded flex items-center justify-center hover:bg-[#138496] shadow-md">
                   <i className="fa-solid fa-plus"></i>
                </button>
             </div>
             <div className="mt-4">
                <h3 className="text-[14px] font-bold text-gray-600 mb-2">View: Other Taxes</h3>
                <div className="flex gap-1 mb-2">
                   <button className="border border-gray-300 bg-white px-2 py-0.5 text-[10px] text-gray-600 rounded">Excel</button>
                   <button className="border border-gray-300 bg-white px-2 py-0.5 text-[10px] text-gray-600 rounded">CSV</button>
                   <button className="border border-gray-300 bg-white px-2 py-0.5 text-[10px] text-gray-600 rounded">Print</button>
                </div>
                <div className="border border-gray-200 rounded-sm overflow-hidden">
                   <table className="w-full text-left text-[12px]">
                      <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                         <tr>
                            <th className="px-3 py-1.5 font-bold border-r">OtherTax ID</th>
                            <th className="px-3 py-1.5 font-bold border-r">Name</th>
                            <th className="px-3 py-1.5 font-bold">Per Rate (%)</th>
                         </tr>
                      </thead>
                      <tbody className="bg-white text-gray-700">
                         <TaxRow id="1" name="None" rate="0" />
                         <TaxRow id="3" name="VAT exempt" rate="0" />
                         <TaxRow id="4" name="Other tax 10" rate="10" />
                         <TaxRow id="5" name="PAYE" rate="30" />
                         <TaxRow id="10" name="Housing Levy" rate="1.5" />
                         <TaxRow id="11" name="Excise duty" rate="15" />
                      </tbody>
                   </table>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TaxField: React.FC<{ label: string; type?: 'text' | 'select' }> = ({ label, type = 'text' }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[11px] font-bold text-gray-500 uppercase">{label}</label>
    {type === 'select' ? (
      <select className="w-full border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none bg-white">
        <option></option>
      </select>
    ) : (
      <input type="text" className="w-full border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none shadow-xs" />
    )}
  </div>
);

const TaxRow: React.FC<{ id: string; name: string; rate: string }> = ({ id, name, rate }) => (
  <tr className="border-b hover:bg-gray-50 transition-colors">
    <td className="px-3 py-1.5 border-r">{id}</td>
    <td className="px-3 py-1.5 border-r font-medium text-gray-700">{name}</td>
    <td className="px-3 py-1.5">{rate}</td>
  </tr>
);
