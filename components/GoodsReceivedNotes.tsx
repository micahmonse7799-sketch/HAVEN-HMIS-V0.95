import React from 'react';

interface GoodsReceivedNotesProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const GoodsReceivedNotes: React.FC<GoodsReceivedNotesProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-gray-400 font-medium">Goods Received Notes</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Main Details Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
           
           {/* Left Combined Details Area (9 cols) */}
           <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* GRN Details Box */}
              <div className="border border-gray-200 rounded p-4 pt-6 relative shadow-xs">
                 <span className="absolute -top-2.5 left-4 bg-white px-2 text-[11px] font-bold text-gray-500 uppercase tracking-tight">GRN Details</span>
                 <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 gap-2">
                       <label className="text-[12px] font-bold text-gray-600">GRN No</label>
                       <input type="text" defaultValue="0" readOnly className="w-full border border-gray-200 rounded px-3 py-1.5 text-[14px] bg-gray-50 text-right font-bold text-green-700 outline-none" />
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                       <label className="text-[12px] font-bold text-gray-600">A/P Invoice No</label>
                       <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500" />
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                       <label className="text-[12px] font-bold text-gray-600">Delivery Note No.</label>
                       <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500" />
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                       <label className="text-[12px] font-bold text-gray-600">Date Time Received</label>
                       <div className="relative">
                          <input type="text" defaultValue="01/02/2026 02:32:00 AM" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white text-green-700 font-medium" />
                          <i className="fa-solid fa-calendar absolute right-3 top-2.5 text-gray-400 text-[10px]"></i>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Purchase Order Details Box */}
              <div className="border border-gray-200 rounded p-4 pt-6 relative shadow-xs">
                 <span className="absolute -top-2.5 left-4 bg-white px-2 text-[11px] font-bold text-gray-500 uppercase tracking-tight">Purchase Order Details</span>
                 <div className="flex flex-col gap-1 text-[13px] text-gray-700">
                    <div className="flex justify-between border-b border-gray-50 py-1">
                       <span className="font-bold">Order No:</span>
                       <span className="text-gray-400 italic"></span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 py-1">
                       <span className="font-bold">Location:</span>
                       <span className="text-gray-400 italic"></span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 py-1">
                       <span className="font-bold">Supplier:</span>
                       <span className="text-gray-400 italic"></span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 py-1">
                       <span className="font-bold">Order ref:</span>
                       <span className="text-gray-400 italic"></span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Right Actions Area (3 cols) */}
           <div className="lg:col-span-3 flex flex-col gap-2 pt-2">
              <button className="bg-white border border-gray-200 text-gray-700 py-1.5 text-[11px] font-bold rounded shadow-xs hover:bg-gray-50 uppercase tracking-tight">Create GRN</button>
              <div className="flex justify-center py-2">
                 <i className="fa-solid fa-ellipsis-vertical text-gray-400 opacity-60"></i>
              </div>
              <button className="bg-white border border-gray-200 text-gray-700 py-1.5 text-[11px] font-bold rounded shadow-xs hover:bg-gray-50 uppercase tracking-tight">GRN Items</button>
              <button className="bg-white border border-gray-200 text-gray-700 py-1.5 text-[11px] font-bold rounded shadow-xs hover:bg-gray-50 uppercase tracking-tight">View Report</button>
           </div>
        </div>

        {/* View: GRNs Table Section */}
        <div className="border-t border-gray-200">
          <div className="px-4 py-2 bg-[#f8f9fa] border-b">
            <h2 className="text-[15px] font-medium text-gray-600">View: GRNs</h2>
          </div>
          <div className="p-4 flex flex-col gap-4">
             <div className="flex justify-end items-center gap-2">
                <span className="text-[12px] text-gray-500">Search:</span>
                <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[220px]" />
             </div>

             <div className="border border-gray-200 rounded-sm overflow-x-auto min-h-[140px]">
               <table className="w-full text-left text-[12px] whitespace-nowrap">
                 <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                   <tr>
                     <th className="px-3 py-2 font-bold text-[#333] border-r">GRN No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     <th className="px-3 py-2 font-bold text-[#333] border-r">Supplier <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                     <th className="px-3 py-2 font-bold text-[#333] border-r">P/O Number <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     <th className="px-3 py-2 font-bold text-[#333] border-r">Delivery Note No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     <th className="px-3 py-2 font-bold text-[#333] border-r">A/P Invoice No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     <th className="px-3 py-2 font-bold text-[#333]">Net Amount <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                   </tr>
                 </thead>
                 <tbody className="bg-white">
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-gray-400 italic">No data available in table</td>
                    </tr>
                 </tbody>
               </table>
             </div>

             <div className="text-[12px] text-gray-500 font-medium">Showing 0 to 0 of 0 entries</div>

             {/* Bottom Filters */}
             <div className="mt-4 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                   <span className="text-[13px] text-gray-600">View:</span>
                   <select className="border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white outline-none text-green-700 font-bold min-w-[120px]">
                      <option>Pending</option>
                      <option>Authorized</option>
                      <option>All</option>
                   </select>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-[13px] text-gray-600">Between</span>
                   <div className="relative">
                      <input type="text" defaultValue="01/02/2026" className="border border-gray-300 rounded px-2 py-1.5 text-[14px] w-[110px] text-green-700 font-bold" />
                      <i className="fa-solid fa-calendar absolute right-2 top-2.5 text-gray-400 text-[10px]"></i>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-[13px] text-gray-600">And</span>
                   <div className="relative">
                      <input type="text" defaultValue="01/02/2026" className="border border-gray-300 rounded px-2 py-1.5 text-[14px] w-[110px] text-green-700 font-bold" />
                      <i className="fa-solid fa-calendar absolute right-2 top-2.5 text-gray-400 text-[10px]"></i>
                   </div>
                </div>
                <button className="bg-[#5bc0de] text-white px-6 py-1.5 rounded text-[13px] font-bold hover:bg-[#31b0d5] transition-colors">
                   View
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};