
import React from 'react';

interface SupplierPrepaymentsProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const SupplierPrepayments: React.FC<SupplierPrepaymentsProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-blue-500 cursor-pointer hover:underline">Procurement</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Supplier Prepayments</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Supplier Prepayment Form Section */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
          <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between">
            <h2 className="text-[16px] font-medium text-gray-600">Supplier Prepayment</h2>
            <div className="relative group">
               <button className="bg-[#5bc0de] text-white px-3 py-1 rounded-sm text-[11px] font-bold flex items-center gap-2 hover:bg-[#31b0d5]">
                 Actions <i className="fa-solid fa-caret-down text-[9px]"></i>
               </button>
            </div>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
             {/* Left and Middle Columns (8 cols) */}
             <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                <PreField label="Supplier" type="select" />
                <PreField label="Reference" />
                
                <PreField label="Payment Mode" type="select" defaultValue="Cash" />
                <div className="flex flex-col gap-1.5">
                   <label className="text-[12px] font-bold text-gray-700 leading-tight">Paid On</label>
                   <div className="relative">
                      <input type="text" defaultValue="01/02/2026 04:27:00 PM" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white text-green-700 font-medium" />
                      <i className="fa-solid fa-calendar absolute right-3 top-2.5 text-gray-400 text-[10px]"></i>
                   </div>
                </div>

                <PreField label="Cash:" type="select" defaultValue="Cash" />
                <div className="hidden md:block"></div> {/* Spacer */}
             </div>

             {/* Right Column (4 cols) */}
             <div className="lg:col-span-4 flex flex-col gap-4">
                <PreField label="Paid By" />
                <PreField label="Prepayment Amount" />

                <div className="flex flex-col gap-1 text-[13px] text-gray-700 font-medium pt-2">
                   <div className="flex justify-between border-b border-gray-50 pb-1">
                      <span className="font-bold">Amount Used:</span>
                      <span></span>
                   </div>
                   <div className="flex justify-between border-b border-gray-50 pb-1">
                      <span className="font-bold">Amount Refunded:</span>
                      <span></span>
                   </div>
                   <div className="flex justify-between border-b border-gray-50 pb-1">
                      <span className="font-bold">Balance:</span>
                      <span></span>
                   </div>
                </div>

                <div className="flex justify-end mt-4">
                   <button className="bg-[#17a2b8] text-white px-8 py-1.5 rounded-sm text-[12px] font-bold hover:bg-[#138496] shadow-sm uppercase tracking-wide">
                      Save Prepayment
                   </button>
                </div>
             </div>
          </div>
        </div>

        {/* View: Supplier Prepayments Table Section */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
          <div className="px-4 py-2 border-b bg-[#f8f9fa]">
            <h2 className="text-[15px] font-medium text-gray-600">View: Supplier Prepayments</h2>
          </div>
          <div className="p-4 flex flex-col gap-4">
             <div className="flex justify-end items-center gap-2">
                <span className="text-[12px] text-gray-500">Search:</span>
                <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[220px]" />
             </div>

             <div className="border border-gray-200 rounded-sm overflow-x-auto">
               <table className="w-full text-left text-[12px] whitespace-nowrap">
                 <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                   <tr>
                     <th className="px-3 py-2 font-bold text-[#333] border-r">No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     <th className="px-3 py-2 font-bold text-[#333] border-r text-blue-800">Supplier <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                     <th className="px-3 py-2 font-bold text-[#333] border-r">Payment Mode <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     <th className="px-3 py-2 font-bold text-[#333] border-r">Paid On <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     <th className="px-3 py-2 font-bold text-[#333] border-r">Status <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     <th className="px-3 py-2 font-bold text-[#333] border-r text-green-700">Amount <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     <th className="px-3 py-2 font-bold text-[#333] border-r text-green-700">Used <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     <th className="px-3 py-2 font-bold text-[#333] border-r text-green-700">Refunded <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     <th className="px-3 py-2 font-bold text-[#333] text-green-700">Balance <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                   </tr>
                 </thead>
                 <tbody className="bg-white text-gray-700">
                    <PrepaymentRow no="127" supplier="TUSKYS SUPERMARKET" mode="Cash" date="Sep 4, 2025" status="Active" amount="30,000.00" used="8,000.00" refunded="0.00" balance="22,000.00" />
                    <PrepaymentRow no="126" supplier="Dawa Limited" mode="Cash" date="Aug 4, 2025" status="Active" amount="50,000.00" used="2,500.00" refunded="0.00" balance="47,500.00" />
                    <PrepaymentRow no="125" supplier="Medi suppliers" mode="Cash" date="Aug 1, 2025" status="Active" amount="1,000,000.00" used="500,000.00" refunded="0.00" balance="500,000.00" />
                    <PrepaymentRow no="124" supplier="Dawa Limited" mode="Cash" date="Aug 1, 2025" status="Active" amount="100,000.00" used="1,000.00" refunded="0.00" balance="99,000.00" />
                    <PrepaymentRow no="123" supplier="Transwide Pharmaceuticals Limited" mode="Cash" date="Aug 1, 2025" status="Active" amount="50,000.00" used="400.00" refunded="0.00" balance="49,600.00" />
                    <PrepaymentRow no="122" supplier="TUSKYS SUPERMARKET" mode="Cash" date="Aug 1, 2025" status="Active" amount="50,000.00" used="0.00" refunded="0.00" balance="50,000.00" />
                    <PrepaymentRow no="121" supplier="Mission for Essential Drugs and Supplies(MEDS)" mode="Cash" date="Jul 17, 2025" status="Active" amount="40,000.00" used="0.00" refunded="0.00" balance="40,000.00" />
                    <PrepaymentRow no="120" supplier="Mission for Essential Drugs and Supplies(MEDS)" mode="MPESA" date="Jul 17, 2025" status="Active" amount="40,000.00" used="40,000.00" refunded="0.00" balance="0.00" />
                    <PrepaymentRow no="119" supplier="Mission for Essential Drugs and Supplies(MEDS)" mode="Cash" date="Jul 17, 2025" status="Active" amount="23,434.00" used="0.00" refunded="0.00" balance="23,434.00" />
                 </tbody>
               </table>
             </div>

             <div className="text-[12px] text-gray-500 font-medium">Showing 1 to 102 of 102 entries</div>

             {/* Bottom Filters */}
             <div className="bg-[#fcfcfc] border border-gray-200 rounded p-4 flex flex-wrap items-center gap-6 mt-2">
                <div className="flex items-center gap-2">
                   <span className="text-[13px] font-bold text-gray-700">Status</span>
                   <select className="border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white outline-none text-green-700 font-bold min-w-[120px]">
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>All</option>
                   </select>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-[13px] font-bold text-gray-700">From:</span>
                   <div className="relative">
                      <input type="text" defaultValue="01/02/2026" className="border border-gray-300 rounded px-2 py-1.5 text-[14px] w-[110px] text-green-700 font-bold" />
                      <i className="fa-solid fa-calendar absolute right-2 top-2.5 text-gray-400 text-[10px]"></i>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-[13px] font-bold text-gray-700">To:</span>
                   <div className="relative">
                      <input type="text" defaultValue="01/02/2026" className="border border-gray-300 rounded px-2 py-1.5 text-[14px] w-[110px] text-green-700 font-bold" />
                      <i className="fa-solid fa-calendar absolute right-2 top-2.5 text-gray-400 text-[10px]"></i>
                   </div>
                </div>
                <button className="bg-[#5bc0de] text-white px-6 py-1.5 rounded-sm text-[13px] font-bold hover:bg-[#31b0d5] transition-colors shadow-sm">
                   View
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PreField: React.FC<{ label: string; type?: 'input' | 'select'; defaultValue?: string }> = ({ label, type = 'input', defaultValue }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[12px] font-bold text-gray-700 leading-tight">{label}</label>
    {type === 'select' ? (
      <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-400 bg-white">
        <option>{defaultValue}</option>
      </select>
    ) : (
      <input 
        type="text" 
        className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-400 bg-white"
        defaultValue={defaultValue}
      />
    )}
  </div>
);

const PrepaymentRow: React.FC<{ no: string; supplier: string; mode: string; date: string; status: string; amount: string; used: string; refunded: string; balance: string }> = ({ 
  no, supplier, mode, date, status, amount, used, refunded, balance 
}) => (
  <tr className="border-b hover:bg-gray-50 transition-colors group">
    <td className="px-3 py-2 border-r">{no}</td>
    <td className="px-3 py-2 border-r font-medium text-green-700 cursor-pointer group-hover:underline">{supplier}</td>
    <td className="px-3 py-2 border-r">{mode}</td>
    <td className="px-3 py-2 border-r text-green-700 font-medium">{date}</td>
    <td className="px-3 py-2 border-r text-green-700 font-bold">{status}</td>
    <td className="px-3 py-2 border-r text-right font-medium">{amount}</td>
    <td className="px-3 py-2 border-r text-right font-medium">{used}</td>
    <td className="px-3 py-2 border-r text-right font-medium">{refunded}</td>
    <td className="px-3 py-2 text-right font-bold text-green-700">{balance}</td>
  </tr>
);
