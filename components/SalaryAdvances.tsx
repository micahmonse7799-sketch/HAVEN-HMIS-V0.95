import React from 'react';

interface SalaryAdvancesProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const SalaryAdvances: React.FC<SalaryAdvancesProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20">
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

      <div className="bg-[#f8f9fa] border border-gray-200 rounded-sm px-4 py-1.5 flex items-center justify-between text-[12px]">
        <div className="flex items-center gap-2 text-gray-500">
          <i className="fa-solid fa-home text-blue-500"></i>
          <span className="opacity-50">/</span>
          <span className="text-blue-500 cursor-pointer hover:underline">HR</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Salary Advances</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between">
          <h2 className="text-[16px] font-medium text-gray-600 uppercase tracking-tight">Salary Advances</h2>
          <button className="bg-[#5bc0de] text-white px-3 py-1 rounded-sm text-[11px] font-bold flex items-center gap-2 hover:bg-[#31b0d5]">
            Actions <i className="fa-solid fa-caret-down text-[9px]"></i>
          </button>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 items-start relative">
           <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700">Employee</label>
                 <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white">
                    <option></option>
                 </select>
              </div>
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700">Amount Requested</label>
                 <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none" />
              </div>
           </div>
           
           <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700">Pay From Month</label>
                 <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white">
                    <option></option>
                 </select>
              </div>
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700">Pay From Year</label>
                 <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white" />
              </div>
           </div>

           <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700">Payment Plan</label>
                 <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white text-green-700">
                    <option>Clear fully at specified period</option>
                 </select>
              </div>
              <div className="flex flex-col gap-2 pt-1 items-end">
                 <button className="bg-[#17a2b8] text-white w-10 h-10 rounded flex items-center justify-center hover:bg-[#138496] shadow-md transition-all active:scale-95">
                    <i className="fa-solid fa-plus text-lg"></i>
                 </button>
              </div>
           </div>

           <div className="md:col-span-2 lg:col-span-1 flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Purpose</label>
              <textarea className="w-full border border-gray-300 rounded p-2 text-[13px] h-16 outline-none focus:ring-1 focus:ring-cyan-500 resize-none"></textarea>
           </div>
        </div>

        <div className="border-t border-gray-200">
           <div className="px-4 py-2 bg-[#f8f9fa] border-b">
             <h2 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">View: Salary Advance Requests</h2>
           </div>
           <div className="p-4 flex flex-col gap-4">
              <div className="flex justify-end items-center gap-2">
                 <span className="text-[12px] text-gray-500">Search:</span>
                 <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[11px] outline-none w-[200px]" />
              </div>

              <div className="border border-gray-200 rounded-sm overflow-x-auto min-h-[140px]">
                <table className="w-full text-left text-[12px] whitespace-nowrap">
                   <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                      <tr>
                         <th className="px-3 py-2 font-bold border-r">Request # <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Employee <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Requested On <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Plan <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Begin <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Status <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Requested <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Approved <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Disbursed <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold">Cleared <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      </tr>
                   </thead>
                   <tbody>
                      <tr>
                         <td colSpan={10} className="text-center py-12 text-gray-400 italic">No data available in table</td>
                      </tr>
                   </tbody>
                </table>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
