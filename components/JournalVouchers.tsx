
import React from 'react';

interface JournalVouchersProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const JournalVouchers: React.FC<JournalVouchersProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20">
      {/* Top Header Bar */}
      <div className="bg-white rounded-sm h-10 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <i onClick={onBack} className="fa-solid fa-times text-gray-400 cursor-pointer hover:text-gray-600 text-xs"></i>
          <h1 className="text-gray-700 font-semibold text-[14px]">Haven Hospital</h1>
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
          <span className="text-gray-400 font-medium">Journal Vouchers</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Main Journal Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between">
          <h2 className="text-[16px] font-medium text-gray-600">Journal Details - Journal Voucher No:</h2>
          <div className="flex gap-2">
            <button className="bg-[#00a699] text-white px-3 py-1 rounded-sm text-[11px] font-bold hover:bg-[#008c82]">Journal Entries</button>
            <button className="bg-[#d9534f] text-white px-3 py-1 rounded-sm text-[11px] font-bold hover:bg-[#c9302c]">Unpost Selected Journal</button>
          </div>
        </div>

        <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
           {/* Form Area (9 cols) */}
           <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-4">
              <JournalField label="Source Reference" />
              <JournalField label="Description" />
              <JournalField label="Amount" />

              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700">Department</label>
                 <select className="border border-gray-300 rounded px-3 py-1.5 text-[13px] bg-white outline-none">
                    <option></option>
                 </select>
              </div>
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700">Transaction Date Time</label>
                 <div className="relative">
                    <input type="text" defaultValue="01/02/2026 06:15:00 PM" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none text-green-700 font-medium" />
                    <i className="fa-solid fa-calendar absolute right-3 top-2.5 text-gray-400 text-[10px]"></i>
                 </div>
              </div>
              <div className="flex flex-col gap-3 pt-6">
                 <div className="text-[13px] text-gray-600"><span className="font-bold">Status:</span> </div>
                 <div className="text-[13px] text-gray-600"><span className="font-bold">Posted By:</span> </div>
              </div>
           </div>

           {/* Save Button (3 cols) */}
           <div className="lg:col-span-3 flex justify-end items-end h-full pt-4">
              <button className="bg-[#17a2b8] text-white px-10 py-1.5 rounded-sm text-[13px] font-bold hover:bg-[#138496] shadow-sm uppercase tracking-wide">
                 Save
              </button>
           </div>
        </div>

        {/* View Section */}
        <div className="border-t border-gray-200">
           <div className="px-4 py-2 bg-[#f8f9fa] border-b">
             <h2 className="text-[15px] font-medium text-gray-600">View: Journal Vouchers</h2>
           </div>
           <div className="p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between mb-1">
                 <div className="flex gap-1">
                    <button className="border border-gray-300 bg-white px-2 py-1 text-[11px] text-gray-600 rounded hover:bg-gray-50">Copy</button>
                    <button className="border border-gray-300 bg-white px-2 py-1 text-[11px] text-gray-600 rounded hover:bg-gray-50">CSV</button>
                    <button className="border border-gray-300 bg-white px-2 py-1 text-[11px] text-gray-600 rounded hover:bg-gray-50">Excel</button>
                    <button className="border border-gray-300 bg-white px-2 py-1 text-[11px] text-gray-600 rounded hover:bg-gray-50">Print</button>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-[12px] text-gray-500">Search:</span>
                    <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[11px] outline-none w-[200px]" />
                 </div>
              </div>

              <div className="border border-gray-200 rounded-sm overflow-x-auto min-h-[300px]">
                <table className="w-full text-left text-[12px] whitespace-nowrap">
                  <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                    <tr>
                      <th className="px-3 py-2 font-bold border-r">JV ID <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30"></i></th>
                      <th className="px-3 py-2 font-bold border-r">Fiscal No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30"></i></th>
                      <th className="px-3 py-2 font-bold border-r">Transacted On <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30"></i></th>
                      <th className="px-3 py-2 font-bold border-r">Source Ref <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30"></i></th>
                      <th className="px-3 py-2 font-bold border-r">Description <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30"></i></th>
                      <th className="px-3 py-2 font-bold">Amount <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30"></i></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={6} className="text-center py-20 text-gray-400 italic">No data available in table</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-[11px] text-gray-500">Showing 0 to 0 of 0 entries</div>

              {/* Footer Filters */}
              <div className="bg-[#fcfcfc] border border-gray-200 rounded p-4 flex flex-wrap items-center gap-6 mt-4">
                 <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold text-gray-700">View</span>
                    <select className="border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white outline-none text-green-700 font-bold min-w-[200px]">
                       <option>Manual - Not Posted</option>
                       <option>Manual - Posted</option>
                       <option>System - Posted</option>
                    </select>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold text-gray-700">Between</span>
                    <div className="relative">
                       <input type="text" defaultValue="01/02/2026" className="border border-gray-300 rounded px-2 py-1.5 text-[14px] w-[120px] text-green-700 font-bold shadow-sm" />
                       <i className="fa-solid fa-calendar absolute right-2 top-2.5 text-gray-400 text-[10px]"></i>
                    </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold text-gray-700">And</span>
                    <div className="relative">
                       <input type="text" defaultValue="01/02/2026" className="border border-gray-300 rounded px-2 py-1.5 text-[14px] w-[120px] text-green-700 font-bold shadow-sm" />
                       <i className="fa-solid fa-calendar absolute right-2 top-2.5 text-gray-400 text-[10px]"></i>
                    </div>
                 </div>
                 <button className="bg-[#5bc0de] text-white px-6 py-1.5 rounded-sm text-[13px] font-bold hover:bg-[#31b0d5] transition-colors shadow-sm">
                    View
                 </button>
                 <label className="flex items-center gap-2 ml-auto cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-[13px] text-gray-700 font-medium">For All Periods</span>
                 </label>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const JournalField: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[12px] font-bold text-gray-700 leading-tight">{label}</label>
    <input 
      type="text" 
      className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-400 transition-all bg-white"
    />
  </div>
);
