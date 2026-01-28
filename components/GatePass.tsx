
import React from 'react';

interface GatePassProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const GatePass: React.FC<GatePassProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-10">
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
          <span className="text-blue-500 cursor-pointer hover:underline">Billing</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Gate Pass</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Gate Pass Details */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2 border-b bg-[#f8f9fa]">
          <h2 className="text-[15px] font-medium text-gray-600">Gate Pass Details</h2>
        </div>
        
        <div className="p-4 flex justify-between items-start">
           <div className="grid grid-cols-3 gap-x-20 gap-y-1 text-[13px] text-gray-700 flex-1">
              <DataLine label="Gate Pass No:" value="" />
              <DataLine label="OP/No:" value="" />
              <DataLine label="Total Bill:" value="" />
              
              <DataLine label="Created By:" value="" />
              <DataLine label="Surname:" value="" />
              <DataLine label="Payments:" value="" />
              
              <DataLine label="Created On:" value="" />
              <DataLine label="Othernames:" value="" />
              <DataLine label="Balance:" value="" />
              
              <DataLine label="Status:" value="" />
           </div>
           <button className="bg-white border border-gray-300 px-4 py-1 rounded text-[12px] hover:bg-gray-50">View Gate Pass</button>
        </div>

        {/* View Gate Passes Table */}
        <div className="border-t border-gray-200">
          <div className="px-4 py-2 bg-[#f8f9fa] border-b">
            <h2 className="text-[14px] font-medium text-gray-600">View: Gate Passes</h2>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex gap-1">
                <button className="border border-gray-300 px-3 py-1 text-[11px] hover:bg-gray-50">Excel</button>
                <button className="border border-gray-300 px-3 py-1 text-[11px] hover:bg-gray-50">CSV</button>
                <button className="border border-gray-300 px-3 py-1 text-[11px] hover:bg-gray-50">Print</button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-gray-500">Search:</span>
                <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[200px]" />
              </div>
            </div>

            <div className="border border-gray-100 rounded-sm overflow-x-auto min-h-[120px]">
              <table className="w-full text-left text-[12px]">
                <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                  <tr>
                    <th className="px-2 py-2"><input type="checkbox" className="w-3.5 h-3.5" /></th>
                    <th className="px-4 py-2 font-medium">No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                    <th className="px-4 py-2 font-medium">Surname <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                    <th className="px-4 py-2 font-medium">Othernames <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                    <th className="px-4 py-2 font-medium">Created On <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                    <th className="px-4 py-2 font-medium">Status <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                    <th className="px-4 py-2 font-medium">Created By <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-gray-400 italic">No data available in table</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Filter Bar */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                 <span className="text-[13px] text-gray-600">View</span>
                 <select className="border border-gray-300 rounded px-2 py-1 text-[13px] bg-white text-green-700">
                    <option>Not Cancelled</option>
                    <option>Cancelled</option>
                    <option>All</option>
                 </select>
              </div>
              <div className="flex items-center gap-2">
                 <span className="text-[13px] text-gray-600">From</span>
                 <div className="relative">
                    <input type="text" defaultValue="01/01/2026" className="border border-gray-300 rounded px-2 py-1 text-[13px] w-[110px]" />
                    <i className="fa-solid fa-calendar absolute right-2 top-2 text-gray-400 text-[10px]"></i>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                 <span className="text-[13px] text-gray-600">To</span>
                 <div className="relative">
                    <input type="text" defaultValue="01/01/2026" className="border border-gray-300 rounded px-2 py-1 text-[13px] w-[110px]" />
                    <i className="fa-solid fa-calendar absolute right-2 top-2 text-gray-400 text-[10px]"></i>
                 </div>
              </div>
              <button className="bg-[#5bc0de] text-white px-4 py-1 rounded text-[13px]">View</button>
           </div>
           <div className="flex gap-2">
              <button className="bg-[#d9534f] text-white px-4 py-1.5 rounded text-[13px] font-medium hover:bg-[#c9302c]">Cancel Selected</button>
              <button className="bg-[#5cb85c] text-white px-4 py-1.5 rounded text-[13px] font-medium hover:bg-[#4cae4c]">Authorize Selected</button>
           </div>
        </div>
      </div>
    </div>
  );
};

const DataLine: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-baseline border-b border-gray-50 pb-0.5">
    <span className="font-bold text-gray-700 whitespace-nowrap">{label}</span>
    <span className="font-medium text-gray-800">{value || ''}</span>
  </div>
);
