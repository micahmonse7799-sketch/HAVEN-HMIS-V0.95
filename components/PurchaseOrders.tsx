import React from 'react';

interface PurchaseOrdersProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const PurchaseOrders: React.FC<PurchaseOrdersProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-gray-400 font-medium">Purchase Order</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Purchase Orders Main Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between">
          <h2 className="text-[16px] font-medium text-gray-600">Purchase Orders</h2>
          <button className="bg-[#5bc0de] text-white px-3 py-1 rounded-sm text-[11px] font-bold flex items-center gap-2 hover:bg-[#31b0d5]">
            Actions <i className="fa-solid fa-caret-down text-[9px]"></i>
          </button>
        </div>

        <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
           {/* Left Form Area (9 cols) */}
           <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 leading-tight">Storage Location</label>
                 <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 text-green-700 font-medium">
                    <option>Pharmacy</option>
                 </select>
              </div>
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 leading-tight">Order Reference</label>
                 <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-xs" />
              </div>
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 leading-tight">DateTime Created</label>
                 <div className="relative">
                    <input type="text" defaultValue="01/02/2026 02:28:00 AM" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white text-green-700 font-medium" />
                    <i className="fa-solid fa-calendar absolute right-3 top-2.5 text-gray-400 text-[10px]"></i>
                 </div>
              </div>

              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 leading-tight">Supplier</label>
                 <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white outline-none focus:ring-1 focus:ring-cyan-500">
                    <option></option>
                 </select>
              </div>
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 leading-tight">Valid Before</label>
                 <div className="relative">
                    <input type="text" defaultValue="01/02/2026" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white text-green-700 font-medium" />
                    <i className="fa-solid fa-calendar absolute right-3 top-2.5 text-gray-400 text-[10px]"></i>
                 </div>
              </div>
              <div className="flex flex-col gap-1.5 row-span-2">
                 <label className="text-[12px] font-bold text-gray-700 leading-tight">Terms & Conditions</label>
                 <textarea className="w-full h-full border border-gray-300 rounded p-2 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 resize-none min-h-[100px]"></textarea>
              </div>

              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 leading-tight">Alias</label>
                 <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-xs" />
              </div>
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 leading-tight">DateTime Issued</label>
                 <div className="relative">
                    <input type="text" defaultValue="01/02/2026 02:28:00 AM" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white text-green-700 font-medium" />
                    <i className="fa-solid fa-calendar absolute right-3 top-2.5 text-gray-400 text-[10px]"></i>
                 </div>
              </div>

              <div className="md:col-start-3 flex justify-end pt-2">
                 <button className="bg-[#17a2b8] text-white px-6 py-1.5 rounded-sm text-[12px] font-bold hover:bg-[#138496] shadow-sm uppercase tracking-wide">
                    Save
                 </button>
              </div>
           </div>

           {/* Right Actions Area (3 cols) */}
           <div className="lg:col-span-3 flex flex-col gap-4">
              <div className="bg-[#fcfcfc] border border-gray-100 rounded p-3">
                 <h3 className="text-[11px] font-bold text-blue-800 underline mb-2 uppercase tracking-tight">Selected LPO Details</h3>
                 <div className="text-[12px] text-gray-700 space-y-1">
                    <div className="flex justify-between border-b border-gray-50 pb-0.5">
                       <span className="font-bold">Purchase Order #:</span>
                       <span></span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-0.5">
                       <span className="font-bold">Is Committed To Stock?:</span>
                       <span></span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-0.5">
                       <span className="font-bold">Prepared By:</span>
                       <span></span>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col gap-1">
                 <button className="bg-white border border-gray-200 text-gray-700 py-1.5 text-[11px] font-medium rounded-sm shadow-xs hover:bg-gray-50">Purchase Order Report</button>
                 <button className="bg-white border border-gray-200 text-gray-700 py-1.5 text-[11px] font-medium rounded-sm shadow-xs hover:bg-gray-50">Purchase Order Report W/O Prices</button>
                 <button className="bg-white border border-gray-200 text-gray-700 py-1.5 text-[11px] font-medium rounded-sm shadow-xs hover:bg-gray-50">Purchase Order Items</button>
                 <button className="bg-[#008b8b] text-white py-1.5 text-[12px] font-medium rounded-sm shadow-xs hover:bg-[#007a7a]">Mark as Received</button>
              </div>
           </div>
        </div>

        {/* View: Purchase Order Section */}
        <div className="border-t border-gray-200">
          <div className="px-4 py-2 bg-[#f8f9fa] border-b">
            <h2 className="text-[15px] font-medium text-gray-600">View: Purchase Order</h2>
          </div>
          <div className="p-4 flex flex-col gap-4">
             <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-1">
                  <button className="border border-gray-300 px-3 py-1 text-[11px] hover:bg-gray-50 rounded-sm">Excel</button>
                  <button className="border border-gray-300 px-3 py-1 text-[11px] hover:bg-gray-50 rounded-sm">CSV</button>
                  <button className="border border-gray-300 px-3 py-1 text-[11px] hover:bg-gray-50 rounded-sm">Print</button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-gray-500">Search:</span>
                  <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[220px]" />
                </div>
             </div>

             <div className="border border-gray-200 rounded-sm overflow-x-auto min-h-[140px]">
               <table className="w-full text-left text-[12px] whitespace-nowrap">
                 <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                   <tr>
                     <th className="px-3 py-2 font-bold text-[#333] border-r">LPO No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     <th className="px-3 py-2 font-bold text-[#333] border-r">Supplier <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                     <th className="px-3 py-2 font-bold text-[#333] border-r">Alias <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     <th className="px-3 py-2 font-bold text-[#333] border-r">Created On <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     <th className="px-3 py-2 font-bold text-[#333] border-r">Checked By <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     <th className="px-3 py-2 font-bold text-[#333] border-r">Approved By <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     <th className="px-3 py-2 font-bold text-[#333] border-r">Authorized By <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     <th className="px-3 py-2 font-bold text-[#333]">Net Amount <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                   </tr>
                 </thead>
                 <tbody className="bg-white">
                    <tr>
                      <td colSpan={8} className="text-center py-8 text-gray-400 italic">No data available in table</td>
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