import React from 'react';

interface OrderSetsProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const OrderSets: React.FC<OrderSetsProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-10">
      {/* Top Header Bar */}
      <div className="bg-white rounded-sm h-10 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <i onClick={onBack} className="fa-solid fa-times text-gray-400 cursor-pointer hover:text-gray-600 text-xs"></i>
          <h1 className="text-gray-700 font-semibold text-[14px]">Demo Hospital</h1>
        </div>
        <div className="flex items-center gap-8 text-[13px] text-gray-500">
          <div>Branch: <span className="text-[#43939e]">Main branch</span></div>
          <div>Room: <span onClick={onOpenRoomModal} className="text-[#43939e] cursor-pointer hover:underline">{currentRoom}</span></div>
          <button className="bg-[#17a2b8] text-white px-4 py-1 rounded-sm text-[11px]">Queue</button>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-[#f8f9fa] border border-gray-200 rounded-sm px-4 py-1.5 flex items-center justify-between text-[12px]">
        <div className="flex items-center gap-2 text-gray-500">
          <i className="fa-solid fa-home text-blue-500"></i>
          <span className="opacity-50">/</span>
          <span className="text-blue-500 cursor-pointer hover:underline">CDS</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Order Sets</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Order Set Form Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2 border-b flex items-center justify-between bg-[#f8f9fa]">
          <h2 className="text-[15px] font-medium text-gray-600">Order Set</h2>
          <button className="bg-[#5bc0de] text-white px-3 py-1 rounded-sm text-[11px] flex items-center gap-2 hover:bg-[#31b0d5]">
            Actions <i className="fa-solid fa-caret-down text-[9px]"></i>
          </button>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-start">
           {/* Left Form (8 columns) */}
           <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-gray-600">Description</label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-gray-600">Message</label>
                <textarea className="w-full h-[60px] border border-gray-300 rounded p-2 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 resize-none"></textarea>
                <span className="text-[10px] text-gray-400">"</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-gray-600">Quality Measure</label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500" />
              </div>
              <div className="flex items-end h-full pb-1">
                 <button className="bg-[#17a2b8] text-white w-8 h-8 flex items-center justify-center rounded-sm hover:bg-[#138496]">
                    <i className="fa-solid fa-plus text-xs"></i>
                 </button>
              </div>
           </div>

           {/* Right Info (4 columns) */}
           <div className="lg:col-span-4 pt-4">
              <div className="text-[13px] text-gray-700 font-medium">
                <span className="font-bold">Linked Diagnosis</span> <span className="text-blue-500 cursor-pointer italic">Click here to add</span>
              </div>
           </div>
        </div>
      </div>

      {/* View: Order Sets Table Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2 border-b bg-[#f8f9fa]">
          <h2 className="text-[15px] font-medium text-gray-600">View: Order Sets</h2>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <div className="flex justify-end gap-2 items-center">
            <span className="text-[12px] text-gray-500">Search:</span>
            <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[220px]" />
          </div>

          <div className="border border-gray-100 rounded-sm overflow-x-auto min-h-[200px]">
            <table className="w-full text-left text-[12px]">
              <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                <tr>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">No <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">Description <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">Quality Measure <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">Created On <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                  <th className="px-4 py-2 font-bold text-[#333]">Created By <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b hover:bg-gray-50">
                   <td className="px-4 py-2 border-r">2</td>
                   <td className="px-4 py-2 border-r">Hypertension</td>
                   <td className="px-4 py-2 border-r">1</td>
                   <td className="px-4 py-2 border-r">Feb 24, 2021 11:30 am</td>
                   <td className="px-4 py-2">admin</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                   <td className="px-4 py-2 border-r">5</td>
                   <td className="px-4 py-2 border-r">Malaria</td>
                   <td className="px-4 py-2 border-r">1</td>
                   <td className="px-4 py-2 border-r">Nov 29, 2021 4:31 pm</td>
                   <td className="px-4 py-2">Wycliffe</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-[12px] text-gray-500 font-medium">Showing 1 to 2 of 2 entries</div>

          {/* Table Footer Filters */}
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">View</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-[13px] bg-white outline-none w-[160px] text-green-700 font-bold">
                <option>Active Order Sets</option>
                <option>Archived</option>
                <option>All</option>
              </select>
            </div>
            <button className="bg-[#5bc0de] text-white px-6 py-1.5 rounded-sm text-[12px] font-bold hover:bg-[#31b0d5] transition-colors shadow-sm">
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};