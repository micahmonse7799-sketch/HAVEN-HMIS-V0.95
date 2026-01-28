
import React from 'react';

interface CashierShiftsProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const CashierShifts: React.FC<CashierShiftsProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-gray-400 font-medium">Cashier Shifts</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between">
          <h2 className="text-[16px] font-medium text-gray-600">Cashier Shift Details</h2>
          <button className="bg-[#5bc0de] text-white px-3 py-1 rounded-sm text-[11px] font-bold flex items-center gap-2 hover:bg-[#31b0d5]">
            Actions <i className="fa-solid fa-caret-down text-[9px]"></i>
          </button>
        </div>

        <div className="p-4 flex flex-col gap-6">
          {/* Summary Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2 gap-x-12 text-[13px] text-gray-700">
            <DataLine label="Shift ID:" value="" />
            <DataLine label="Beginning:" value="" />
            <DataLine label="Opening Balance:" value="" />
            <DataLine label="User:" value="" />
            <DataLine label="Ending:" value="" />
            <DataLine label="Status:" value="" />
          </div>

          <div className="flex flex-col gap-2 mt-4">
             <h3 className="text-[15px] font-bold text-blue-800 underline uppercase tracking-tight">View: Shifts</h3>
             <div className="flex justify-end mb-1">
                <div className="flex items-center gap-2">
                   <span className="text-[12px] text-gray-500">Search:</span>
                   <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[200px]" />
                </div>
             </div>
             <div className="border border-gray-200 rounded-sm overflow-hidden">
                <table className="w-full text-left text-[12px]">
                   <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                      <tr>
                         <th className="px-3 py-2 w-[40px] text-center border-r"><input type="checkbox" className="w-3.5 h-3.5" /></th>
                         <th className="px-3 py-2 font-bold border-r">Shift ID <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Beginning Date Time <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Ending Date Time <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30"></i></th>
                         <th className="px-3 py-2 font-bold">User <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30"></i></th>
                      </tr>
                   </thead>
                   <tbody className="bg-white">
                      <tr className="border-b hover:bg-gray-50 transition-colors">
                         <td className="px-3 py-2 text-center border-r"><input type="checkbox" className="w-3.5 h-3.5" /></td>
                         <td className="px-3 py-2 border-r font-medium text-blue-700 cursor-pointer">2662</td>
                         <td className="px-3 py-2 border-r text-green-700 font-medium">Dec 31, 2025 4:42 pm</td>
                         <td className="px-3 py-2 border-r">-</td>
                         <td className="px-3 py-2 text-green-700 font-medium">demo</td>
                      </tr>
                   </tbody>
                </table>
             </div>
             <div className="text-[11px] text-gray-500 mt-2">Showing 1 to 1 of 1 entries</div>
          </div>

          {/* Footer Filters */}
          <div className="bg-[#fcfcfc] border border-gray-200 rounded p-4 flex flex-wrap items-center gap-6 mt-4">
             <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-gray-700">View</span>
                <select className="border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white outline-none text-green-700 font-bold min-w-[150px]">
                   <option>My Active Shift</option>
                   <option>All Shifts</option>
                </select>
             </div>
             <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-gray-700">From</span>
                <div className="relative">
                   <input type="text" defaultValue="01/02/2026" className="border border-gray-300 rounded px-2 py-1.5 text-[14px] w-[120px] text-green-700 font-bold shadow-sm" />
                   <i className="fa-solid fa-calendar absolute right-2 top-2.5 text-gray-400 text-[10px]"></i>
                </div>
             </div>
             <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-gray-700">To</span>
                <div className="relative">
                   <input type="text" defaultValue="01/02/2026" className="border border-gray-300 rounded px-2 py-1.5 text-[14px] w-[120px] text-green-700 font-bold shadow-sm" />
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
  );
};

const DataLine: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-baseline border-b border-gray-50 pb-0.5">
    <span className="font-bold text-gray-500 whitespace-nowrap mr-4 uppercase text-[11px] tracking-tight">{label}</span>
    <span className="font-semibold text-gray-800 text-[13px] min-h-[1.2rem]">{value}</span>
  </div>
);
