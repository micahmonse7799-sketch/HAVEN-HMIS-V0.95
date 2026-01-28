import React from 'react';

interface CapitationsProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const Capitations: React.FC<CapitationsProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-gray-400 font-medium">Capitations</span>
        </div>
      </div>

      {/* Capitation Entry Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between">
          <h2 className="text-[16px] font-medium text-gray-600 uppercase tracking-tight">Capitation:</h2>
          <button className="bg-[#5bc0de] text-white px-3 py-1 rounded-sm text-[11px] font-bold flex items-center gap-2 hover:bg-[#31b0d5]">
            Actions <i className="fa-solid fa-caret-down text-[9px]"></i>
          </button>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-4">
           {/* Row 1 */}
           <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-700">Title</label>
              <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-xs" />
           </div>
           <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-700">Scheme</label>
              <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white">
                 <option></option>
              </select>
           </div>
           <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-700">Period Begin Date</label>
              <div className="relative">
                 <input type="text" defaultValue="01/02/2026" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none text-green-700 font-medium" />
                 <i className="fa-solid fa-calendar absolute right-3 top-2.5 text-gray-400 text-[11px]"></i>
              </div>
           </div>
           <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-700">Payment Reference</label>
              <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none" />
           </div>

           {/* Row 2 */}
           <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-700">Payment Mode</label>
              <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none bg-white text-green-700 font-medium">
                 <option>Cash</option>
              </select>
           </div>
           <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-700">Amount Received</label>
              <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none" />
           </div>
           <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-700">Period End Date</label>
              <div className="relative">
                 <input type="text" defaultValue="01/02/2026" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none text-green-700 font-medium" />
                 <i className="fa-solid fa-calendar absolute right-3 top-2.5 text-gray-400 text-[11px]"></i>
              </div>
           </div>
           <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-700">Received On</label>
              <div className="relative">
                 <input type="text" defaultValue="01/02/2026 10:58:00 PM" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none text-green-700 font-medium" />
                 <i className="fa-solid fa-calendar absolute right-3 top-2.5 text-gray-400 text-[11px]"></i>
              </div>
           </div>

           {/* Row 3 */}
           <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-700">Cash:</label>
              <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none bg-white text-green-700 font-medium">
                 <option>Cash</option>
              </select>
           </div>
           <div className="lg:col-span-3 flex justify-end items-end h-full">
              <button className="bg-[#17a2b8] text-white w-10 h-10 rounded flex items-center justify-center hover:bg-[#138496] shadow-md">
                 <i className="fa-solid fa-plus text-lg"></i>
              </button>
           </div>
        </div>

        {/* View Section */}
        <div className="border-t border-gray-200">
           <div className="px-4 py-2 bg-[#f8f9fa] border-b">
             <h2 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">View: Capitations</h2>
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
                         <th className="px-3 py-2 font-bold border-r">No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Title <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Scheme <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Mode <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Received On <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Start <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">End <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Status <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Received <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Consumption <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Processed <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold">% <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      </tr>
                   </thead>
                   <tbody>
                      <tr>
                         <td colSpan={12} className="text-center py-12 text-gray-400 italic">No data available in table</td>
                      </tr>
                   </tbody>
                </table>
             </div>

             <div className="text-[12px] text-gray-500">Showing 0 to 0 of 0 entries</div>

             {/* Footer Filters */}
             <div className="bg-[#fcfcfc] border border-gray-200 rounded p-4 flex flex-wrap items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                   <span className="text-[13px] font-bold text-gray-700">Status</span>
                   <select className="border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white text-green-700 font-bold min-w-[150px]">
                      <option>Active</option>
                      <option>Cancelled</option>
                      <option>All</option>
                   </select>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-[13px] font-bold text-gray-700">Between</span>
                   <div className="relative">
                      <input type="text" defaultValue="01/02/2026" className="border border-gray-300 rounded px-2 py-1.5 text-[14px] w-[120px] text-green-700 font-bold shadow-sm outline-none" />
                      <i className="fa-solid fa-calendar absolute right-2 top-2.5 text-gray-400 text-[10px]"></i>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-[13px] font-bold text-gray-700">And</span>
                   <div className="relative">
                      <input type="text" defaultValue="01/02/2026" className="border border-gray-300 rounded px-2 py-1.5 text-[14px] w-[120px] text-green-700 font-bold shadow-sm outline-none" />
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
