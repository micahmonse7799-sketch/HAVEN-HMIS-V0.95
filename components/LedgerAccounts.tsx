
import React from 'react';

interface LedgerAccountsProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const LedgerAccounts: React.FC<LedgerAccountsProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-gray-400 font-medium">General Ledger Accounts</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
         
         {/* Left Column: Account Details (7 cols) */}
         <div className="lg:col-span-7 bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
            <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between">
               <h2 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">Account Details</h2>
               <div className="relative group">
                  <button className="bg-[#5bc0de] text-white px-3 py-1 rounded-sm text-[11px] font-bold flex items-center gap-2 hover:bg-[#31b0d5]">
                    Actions <i className="fa-solid fa-caret-down text-[9px]"></i>
                  </button>
               </div>
            </div>
            
            <div className="p-4 flex flex-col gap-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                  <div className="flex flex-col gap-1">
                     <label className="text-[11px] font-bold text-gray-500 uppercase">Account No</label>
                     <input type="text" defaultValue="0" readOnly className="w-full border border-gray-200 bg-gray-50 rounded px-2 py-1.5 text-[13px] text-green-700 font-bold outline-none text-right shadow-xs" />
                  </div>
                  <div className="flex flex-col gap-1">
                     <label className="text-[11px] font-bold text-gray-500 uppercase">Account Class</label>
                     <div className="flex gap-2">
                        <select className="flex-1 border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white">
                           <option></option>
                        </select>
                        <button className="text-blue-600 hover:text-blue-800"><i className="fa-solid fa-plus-circle text-lg"></i></button>
                     </div>
                  </div>
                  <div className="flex flex-col gap-1">
                     <label className="text-[11px] font-bold text-gray-500 uppercase">Account Name</label>
                     <input type="text" className="w-full border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                     <label className="text-[11px] font-bold text-gray-500 uppercase">Cash Flow Category</label>
                     <select className="w-full border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white">
                        <option></option>
                     </select>
                  </div>
               </div>
               
               <div className="flex justify-end">
                  <button className="bg-[#17a2b8] text-white w-8 h-8 rounded flex items-center justify-center hover:bg-[#138496] shadow-md">
                     <i className="fa-solid fa-plus"></i>
                  </button>
               </div>

               <div className="mt-6 border-t border-gray-100 pt-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                     <h3 className="text-[14px] font-bold text-gray-600 uppercase tracking-tight">View: Accounts</h3>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                     <div className="flex gap-1">
                        <button className="border border-gray-300 bg-white px-2 py-1 text-[10px] text-gray-600 rounded shadow-xs hover:bg-gray-50">Excel</button>
                        <button className="border border-gray-300 bg-white px-2 py-1 text-[10px] text-gray-600 rounded shadow-xs hover:bg-gray-50">CSV</button>
                        <button className="border border-gray-300 bg-white px-2 py-1 text-[10px] text-gray-600 rounded shadow-xs hover:bg-gray-50">Print</button>
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="text-[11px] text-gray-500">Search:</span>
                        <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[11px] outline-none w-[120px]" />
                     </div>
                  </div>
                  <div className="border border-gray-200 rounded-sm overflow-hidden">
                     <table className="w-full text-left text-[11px]">
                        <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                           <tr>
                              <th className="px-3 py-1.5 font-bold border-r">No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30"></i></th>
                              <th className="px-3 py-1.5 font-bold border-r">Account Name <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30"></i></th>
                              <th className="px-3 py-1.5 font-bold">Account Class <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30"></i></th>
                           </tr>
                        </thead>
                        <tbody className="bg-white text-gray-700">
                           <LedgerRow no="0" name="Inventory" class_="Current Assets" />
                           <LedgerRow no="1004" name="Bank Wallet" class_="Online Pay" />
                           <LedgerRow no="1037" name="Cash20234" class_="Current Assets" />
                           <LedgerRow no="1147" name="Motor Vehicles" class_="Fixed Assets" />
                           <LedgerRow no="1165" name="As" class_="Current Assets" />
                           <LedgerRow no="1179" name="Right-Of-Use Asset (Rou Asset)" class_="Non-Current Assets" />
                           <LedgerRow no="1217" name="Cash 3" class_="Current Assets" />
                           <LedgerRow no="1218" name="Intangible Assets" class_="Intangible Asset" />
                           <LedgerRow no="1224" name="Emergency Fund" class_="Current Assets" />
                           <LedgerRow no="1229" name="Goodwill" class_="Current Assets" />
                           <LedgerRow no="1257" name="Cogs-Service" class_="Current Assets" />
                           <LedgerRow no="1268" name="Medical Equipment" class_="Fixed Assets" />
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>

         {/* Right Column: Sub-Account Details (5 cols) */}
         <div className="lg:col-span-5 bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
            <div className="px-4 py-2 border-b bg-[#f8f9fa]">
               <h2 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">Sub-Account Details</h2>
            </div>
            
            <div className="p-4 flex flex-col gap-4">
               <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <div className="flex flex-col gap-1">
                     <label className="text-[11px] font-bold text-gray-500 uppercase">Sub-Account Name</label>
                     <input type="text" className="w-full border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 shadow-xs" />
                  </div>
                  <div className="flex flex-col gap-1">
                     <label className="text-[11px] font-bold text-gray-500 uppercase">Current balance</label>
                     <input type="text" defaultValue="0" readOnly className="w-full border border-gray-200 bg-gray-50 rounded px-2 py-1.5 text-[13px] text-green-700 font-bold outline-none text-right shadow-xs" />
                  </div>
                  <div className="flex flex-col gap-1 col-span-2">
                     <label className="text-[11px] font-bold text-gray-500 uppercase">Account</label>
                     <select className="w-full border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white">
                        <option></option>
                     </select>
                  </div>
               </div>

               <div className="flex justify-end">
                  <button className="bg-[#17a2b8] text-white w-8 h-8 rounded flex items-center justify-center hover:bg-[#138496] shadow-md">
                     <i className="fa-solid fa-plus text-lg"></i>
                  </button>
               </div>

               <div className="mt-8 border-t border-gray-100 pt-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                     <h3 className="text-[14px] font-bold text-gray-600 uppercase tracking-tight">View: Sub-Accounts ()</h3>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                     <div className="flex gap-1">
                        <button className="border border-gray-300 bg-white px-2 py-1 text-[10px] text-gray-600 rounded shadow-xs hover:bg-gray-50">Excel</button>
                        <button className="border border-gray-300 bg-white px-2 py-1 text-[10px] text-gray-600 rounded shadow-xs hover:bg-gray-50">CSV</button>
                        <button className="border border-gray-300 bg-white px-2 py-1 text-[10px] text-gray-600 rounded shadow-xs hover:bg-gray-50">Print</button>
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="text-[11px] text-gray-500">Search:</span>
                        <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[11px] outline-none w-[120px]" />
                     </div>
                  </div>
                  <div className="border border-gray-200 rounded-sm overflow-hidden min-h-[100px]">
                     <table className="w-full text-left text-[11px]">
                        <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                           <tr>
                              <th className="px-3 py-1.5 font-bold border-r">No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30"></i></th>
                              <th className="px-3 py-1.5 font-bold border-r">Name <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30"></i></th>
                              <th className="px-3 py-1.5 font-bold"></th>
                           </tr>
                        </thead>
                        <tbody className="bg-white text-gray-400 italic">
                           <tr>
                              <td colSpan={3} className="text-center py-10">No data available in table</td>
                           </tr>
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

const LedgerRow: React.FC<{ no: string; name: string; class_: string }> = ({ no, name, class_ }) => (
  <tr className="border-b hover:bg-gray-50 transition-colors">
    <td className="px-3 py-1.5 border-r">{no}</td>
    <td className="px-3 py-1.5 border-r font-medium text-gray-800">{name}</td>
    <td className="px-3 py-1.5">{class_}</td>
  </tr>
);
