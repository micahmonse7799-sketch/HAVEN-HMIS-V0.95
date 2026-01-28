import React from 'react';

interface PurchaseRequisitionNoteProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const PurchaseRequisitionNote: React.FC<PurchaseRequisitionNoteProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-gray-400 font-medium">Purchase Requisition Note</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Main Section Heading */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b bg-[#f8f9fa]">
          <h2 className="text-[16px] font-medium text-gray-600">Purchase Requisition Note</h2>
        </div>

        <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
           {/* Left Form Area (9 cols) */}
           <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 leading-tight">Purchase Requisition Note No</label>
                 <input type="text" defaultValue="0" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-xs text-right" />
              </div>
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 leading-tight">DateTime Created</label>
                 <div className="relative">
                    <input type="text" defaultValue="01/02/2026 02:02 AM" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white text-green-700 font-medium" />
                    <i className="fa-solid fa-calendar absolute right-3 top-2.5 text-gray-400 text-[10px]"></i>
                 </div>
              </div>
              <div className="flex flex-col gap-4 pt-6">
                 <div className="flex items-center gap-2">
                    <input type="checkbox" id="authorized" className="w-3.5 h-3.5" />
                    <label htmlFor="authorized" className="text-[12px] text-gray-700">Is Authorized</label>
                 </div>
              </div>

              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 leading-tight">Storage Location</label>
                 <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white outline-none focus:ring-1 focus:ring-cyan-500">
                    <option></option>
                 </select>
              </div>
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 leading-tight">Authorized By</label>
                 <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white outline-none focus:ring-1 focus:ring-cyan-500">
                    <option></option>
                 </select>
              </div>
              <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-2">
                    <input type="checkbox" id="committed" className="w-3.5 h-3.5" />
                    <label htmlFor="committed" className="text-[12px] text-gray-700">Committed To Stock</label>
                 </div>
                 <div className="flex justify-end">
                    <button className="bg-[#5cb85c] text-white px-6 py-1 rounded text-[12px] font-bold hover:bg-[#4cae4c] transition-colors shadow-sm">Save</button>
                 </div>
              </div>

              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 leading-tight">Created By</label>
                 <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white outline-none focus:ring-1 focus:ring-cyan-500">
                    <option></option>
                 </select>
              </div>
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 leading-tight">DateTime Authorized</label>
                 <div className="relative">
                    <input type="text" defaultValue="01/02/2026 02:02 AM" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white text-green-700 font-medium" />
                    <i className="fa-solid fa-calendar absolute right-3 top-2.5 text-gray-400 text-[10px]"></i>
                 </div>
              </div>
           </div>

           {/* Right Actions Area (3 cols) */}
           <div className="lg:col-span-3 flex flex-col gap-2 pt-2">
              <button className="bg-[#008b8b] text-white py-2 text-[12px] font-medium rounded shadow-xs hover:bg-[#007a7a] transition-colors">
                Purchase Requisition Note Items
              </button>
              <button className="bg-white border border-gray-200 text-gray-700 py-2 text-[12px] font-medium rounded shadow-xs hover:bg-gray-50 transition-colors">
                View Purchase Requisition Note Report
              </button>
           </div>
        </div>

        {/* View: Purchase Requisition Notes Section */}
        <div className="border-t border-gray-200">
          <div className="px-4 py-2 bg-[#f8f9fa] border-b">
            <h2 className="text-[15px] font-medium text-gray-600">View: Purchase Requisition Notes</h2>
          </div>
          <div className="p-4 flex flex-col gap-4">
             <div className="flex justify-end items-center gap-2">
                <span className="text-[12px] text-gray-500">Search:</span>
                <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[220px]" />
             </div>

             <div className="border border-gray-200 rounded-sm overflow-x-auto">
               <table className="w-full text-left text-[13px]">
                 <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                   <tr>
                     <th className="px-4 py-2 font-bold text-[#333] border-r">PRN No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     <th className="px-4 py-2 font-bold text-[#333] border-r">DateTime Created <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     <th className="px-4 py-2 font-bold text-[#333] border-r">Created By <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     <th className="px-4 py-2 font-bold text-[#333] border-r">Storage Location <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     <th className="px-4 py-2 font-bold text-[#333]">Department <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                   </tr>
                 </thead>
                 <tbody className="bg-white">
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-gray-400 italic">No data available in table</td>
                    </tr>
                 </tbody>
               </table>
             </div>

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