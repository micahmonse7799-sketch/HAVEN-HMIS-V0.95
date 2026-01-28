
import React from 'react';

interface BankReconciliationProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const BankReconciliation: React.FC<BankReconciliationProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-gray-400 font-medium">Bank Reconciliation</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Bank Reconciliation Details Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between">
          <h2 className="text-[16px] font-medium text-gray-600 uppercase tracking-tight">Bank Reconciliation Details</h2>
          <div className="relative group">
             <button className="bg-[#5bc0de] text-white px-3 py-1 rounded-sm text-[11px] font-bold flex items-center gap-2 hover:bg-[#31b0d5]">
               Actions <i className="fa-solid fa-caret-down text-[9px]"></i>
             </button>
          </div>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-y-2 gap-x-12 text-[13px] text-gray-700">
           {/* Column 1 */}
           <div className="flex flex-col gap-1">
              <DataSummaryLine label="Reconciliation No:" />
              <DataSummaryLine label="Title:" />
              <DataSummaryLine label="Bank:" />
              <DataSummaryLine label="Created By:" />
           </div>
           {/* Column 2 */}
           <div className="flex flex-col gap-1">
              <DataSummaryLine label="Created On:" />
              <DataSummaryLine label="Statement Balance:" />
              <DataSummaryLine label="Cleared Book Balance:" />
              <DataSummaryLine label="Adjusted Book Balance:" />
           </div>
           {/* Column 3 */}
           <div className="flex flex-col gap-1">
              <DataSummaryLine label="Reconciled On:" />
              <DataSummaryLine label="Reconciled By:" />
              <DataSummaryLine label="Status:" />
           </div>
        </div>

        {/* View: Reconciliations Table Section */}
        <div className="border-t border-gray-200">
          <div className="px-4 py-2 bg-[#f8f9fa] border-b">
            <h2 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">View: Reconciliations</h2>
          </div>
          <div className="p-4 flex flex-col gap-4">
             <div className="flex justify-end items-center gap-2">
                <span className="text-[12px] text-gray-500">Search:</span>
                <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[11px] outline-none w-[200px]" />
             </div>

             <div className="border border-gray-200 rounded-sm overflow-x-auto min-h-[300px]">
                <table className="w-full text-left text-[12px] whitespace-nowrap">
                   <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                      <tr>
                         <th className="px-3 py-2 font-bold border-r">No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Title <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Bank <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Created On <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Created By <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Cleared Balance <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Statement Balance <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Book Adjustment <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Reconciled On <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold">Reconciled by <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      </tr>
                   </thead>
                   <tbody>
                      <tr>
                         <td colSpan={10} className="text-center py-12 text-gray-400 italic">No data available in table</td>
                      </tr>
                   </tbody>
                </table>
             </div>

             {/* Footer Filters */}
             <div className="bg-[#fcfcfc] border border-gray-200 rounded p-4 flex flex-wrap items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                   <span className="text-[13px] font-bold text-gray-700 uppercase tracking-tight">View:</span>
                   <select className="border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white text-green-700 font-bold min-w-[150px]">
                      <option>Not Cleared</option>
                      <option>Cleared</option>
                      <option>All</option>
                   </select>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-[13px] font-bold text-gray-700 uppercase tracking-tight">From:</span>
                   <div className="relative">
                      <input type="text" defaultValue="01/02/2026" className="border border-gray-300 rounded px-2 py-1.5 text-[14px] w-[120px] text-green-700 font-bold shadow-sm outline-none" />
                      <i className="fa-solid fa-calendar absolute right-2 top-2.5 text-gray-400 text-[10px]"></i>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-[13px] font-bold text-gray-700 uppercase tracking-tight">To:</span>
                   <div className="relative">
                      <input type="text" defaultValue="01/02/2026" className="border border-gray-300 rounded px-2 py-1.5 text-[14px] w-[120px] text-green-700 font-bold shadow-sm outline-none" />
                      <i className="fa-solid fa-calendar absolute right-2 top-2.5 text-gray-400 text-[10px]"></i>
                   </div>
                </div>
                <button className="bg-[#5bc0de] text-white px-6 py-1.5 rounded-sm text-[13px] font-bold hover:bg-[#31b0d5] transition-colors shadow-sm uppercase tracking-tight">
                   View
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataSummaryLine: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex justify-between items-baseline border-b border-gray-50 pb-0.5">
    <span className="font-bold text-gray-500 whitespace-nowrap mr-4 uppercase text-[11px] tracking-tight">{label}</span>
    <span className="font-semibold text-gray-800 text-[13px] min-h-[1.2rem]"></span>
  </div>
);
