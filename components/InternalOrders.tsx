
import React from 'react';

interface InternalOrdersProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const InternalOrders: React.FC<InternalOrdersProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-blue-500 cursor-pointer hover:underline">Inventory</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Internal Orders</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Order Entry Area */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
         {/* Form Fields (9 cols) */}
         <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
            <div className="flex flex-col gap-1.5">
               <label className="text-[12px] font-bold text-gray-700">Requesting Location</label>
               <select className="border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white outline-none focus:ring-1 focus:ring-cyan-500">
                  <option></option>
               </select>
            </div>
            <div className="flex flex-col gap-1.5">
               <label className="text-[12px] font-bold text-gray-700">Issuing Location</label>
               <select className="border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white outline-none focus:ring-1 focus:ring-cyan-500">
                  <option></option>
               </select>
            </div>
            <div className="flex flex-col gap-1.5">
               <label className="text-[12px] font-bold text-gray-700">Order Type</label>
               <select className="border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 text-green-700 font-bold">
                  <option>Stock</option>
                  <option>Non-Stock</option>
               </select>
            </div>

            <div className="flex flex-col gap-1.5">
               <label className="text-[12px] font-bold text-gray-700">Requesting Location Comment</label>
               <textarea className="w-full border border-gray-300 rounded p-2 text-[13px] h-16 outline-none focus:ring-1 focus:ring-cyan-500 resize-none"></textarea>
            </div>
            <div className="flex flex-col gap-1.5">
               <label className="text-[12px] font-bold text-gray-700">Issuing Location Comment</label>
               <textarea className="w-full border border-gray-300 rounded p-2 text-[13px] h-16 outline-none focus:ring-1 focus:ring-cyan-500 resize-none"></textarea>
            </div>
            <div className="flex flex-col gap-2 pt-6">
               <div className="flex justify-end gap-2">
                 <button className="bg-[#17a2b8] text-white px-5 py-1.5 rounded text-[12px] font-bold uppercase hover:bg-[#138496]">Save</button>
               </div>
               <div className="flex justify-end gap-2 mt-2">
                 <button className="bg-white border border-gray-300 text-gray-700 px-4 py-1.5 rounded text-[12px] font-bold hover:bg-gray-50">Order Items</button>
                 <button className="bg-white border border-gray-300 text-gray-700 px-4 py-1.5 rounded text-[12px] font-bold hover:bg-gray-50">View Order</button>
               </div>
            </div>
         </div>

         {/* Workflow Checkboxes (3 cols) */}
         <div className="lg:col-span-3 flex flex-col gap-2.5 pt-2">
            <CheckboxItem label="Approve Order" />
            <CheckboxItem label="Send Order" />
            <CheckboxItem label="Cancel Order" />
            <CheckboxItem label="Dispatch Items" />
            <CheckboxItem label="Receive Items Without Dispatch" />
            <CheckboxItem label="Receive Items" />
         </div>
      </div>

      {/* Internal Order Views Table */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b bg-[#f8f9fa]">
          <h2 className="text-[15px] font-medium text-gray-600">Internal Order Views</h2>
        </div>
        <div className="p-4 flex flex-col gap-4">
           <div className="border border-gray-200 rounded-sm overflow-x-auto min-h-[300px]">
             <table className="w-full text-left text-[12px] whitespace-nowrap">
               <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                 <tr>
                   <th className="px-3 py-2 font-bold border-r">Internal Order No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                   <th className="px-3 py-2 font-bold border-r">Requesting Location <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                   <th className="px-3 py-2 font-bold border-r">Issuing Location <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                   <th className="px-3 py-2 font-bold border-r">Order Status <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                   <th className="px-3 py-2 font-bold border-r">Prepared By <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                   <th className="px-3 py-2 font-bold border-r">Approaved By <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                   <th className="px-3 py-2 font-bold">Received By <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                 </tr>
               </thead>
               <tbody className="bg-white text-gray-400 italic">
                  <tr>
                    <td colSpan={7} className="text-center py-20">No data available in table</td>
                  </tr>
               </tbody>
             </table>
           </div>

           {/* Table Footer Filters */}
           <div className="flex flex-wrap items-center gap-6 mt-2">
              <div className="flex items-center gap-2">
                 <span className="text-[12px] font-bold text-gray-700">View</span>
                 <select className="border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white outline-none text-green-700 font-bold min-w-[120px]">
                    <option>Not Sent</option>
                    <option>Sent</option>
                    <option>Complete</option>
                    <option>All</option>
                 </select>
              </div>
              <div className="flex items-center gap-2">
                 <span className="text-[12px] font-bold text-gray-700">Between</span>
                 <div className="relative">
                    <input type="text" defaultValue="01/02/2026" className="border border-gray-300 rounded px-2 py-1.5 text-[14px] w-[110px] text-green-700 font-bold" />
                    <i className="fa-solid fa-calendar absolute right-2 top-2.5 text-gray-400 text-[10px]"></i>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                 <span className="text-[12px] font-bold text-gray-700">And</span>
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
  );
};

const CheckboxItem: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center gap-2.5">
    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
    <span className="text-[13px] text-gray-700 font-medium">{label}</span>
  </div>
);
