import React from 'react';

interface ReceiptsProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const Receipts: React.FC<ReceiptsProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-gray-400 font-medium">Receipts</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between">
          <h2 className="text-[15px] font-medium text-gray-600">Receipt Details:</h2>
          <button className="bg-[#5bc0de] text-white px-3 py-1 rounded-sm text-[11px] font-bold flex items-center gap-2 hover:bg-[#31b0d5]">
            Actions <i className="fa-solid fa-caret-down text-[9px]"></i>
          </button>
        </div>
        
        <div className="p-4">
           {/* Search Box */}
           <div className="flex justify-center mb-6">
              <div className="relative w-full max-w-xl flex shadow-sm">
                <input 
                  type="text" 
                  placeholder="Search for a receipt by Receipt No / Patient details"
                  className="flex-1 bg-white border border-gray-300 rounded-l px-4 py-2 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500"
                />
                <button className="bg-[#5da54f] text-white px-4 rounded-r hover:bg-[#4d8a41] transition-colors">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Receipt Info */}
              <div className="lg:col-span-8 border border-gray-200 rounded-sm p-4 pt-6 relative bg-white shadow-inner">
                 <span className="absolute -top-3 left-4 bg-white px-2 text-[12px] font-semibold text-gray-500">Receipt Information</span>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-2 text-[13px] text-gray-700">
                    <DataLine label="Receipt No:" value="" />
                    <DataLine label="Bill No:" value="" />
                    <DataLine label="DateTime Created:" value="" />
                    
                    <DataLine label="Patient Name:" value="" />
                    <DataLine label="OP/No:" value="" />
                    <DataLine label="Created By:" value="" />
                    
                    <DataLine label="Amount Received:" value="" color="text-green-700 font-bold" />
                    <DataLine label="Payment Mode:" value="" />
                    <DataLine label="Reference No:" value="" />
                    
                    <DataLine label="Status:" value="" />
                 </div>
              </div>

              {/* Sidebar actions for receipts */}
              <div className="lg:col-span-4 flex flex-col gap-2">
                 <button className="bg-white border border-gray-300 text-gray-700 text-[11px] font-bold py-2 px-4 rounded-sm hover:bg-gray-50 transition-colors w-full uppercase">
                   Print Receipt
                 </button>
                 <button className="bg-[#d9534f] text-white text-[11px] font-bold py-2 px-4 rounded-sm hover:bg-[#c9302c] transition-colors w-full uppercase">
                   Cancel Receipt
                 </button>
              </div>
           </div>
        </div>

        {/* View: All Receipts Section */}
        <div className="border-t border-gray-200">
          <div className="px-4 py-2 bg-[#f8f9fa] border-b">
            <h2 className="text-[14px] font-medium text-gray-600">View: Receipts</h2>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex gap-1">
                <button className="border border-gray-300 px-3 py-1 text-[11px] hover:bg-gray-50">CSV</button>
                <button className="border border-gray-300 px-3 py-1 text-[11px] hover:bg-gray-50">Excel</button>
                <button className="border border-gray-300 px-3 py-1 text-[11px] hover:bg-gray-50">Print</button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-gray-500">Search:</span>
                <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[200px]" />
              </div>
            </div>

            <div className="border border-gray-100 rounded-sm overflow-x-auto min-h-[200px]">
              <table className="w-full text-left text-[12px]">
                <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                  <tr>
                    <th className="px-2 py-2 w-[40px] text-center"><input type="checkbox" className="w-3.5 h-3.5" /></th>
                    <th className="px-4 py-2 font-bold text-[#333] border-r">Receipt No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                    <th className="px-4 py-2 font-bold text-[#333] border-r">Patient <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                    <th className="px-4 py-2 font-bold text-[#333] border-r">Date <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                    <th className="px-4 py-2 font-bold text-[#333] border-r">Amount <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                    <th className="px-4 py-2 font-bold text-[#333] border-r">Status <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                    <th className="px-4 py-2 font-bold text-[#333]">Mode <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-gray-400 italic">No receipts found for the selected criteria.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Filter Footer */}
        <div className="p-4 border-t border-gray-100 bg-[#fcfcfc] flex items-center flex-wrap gap-6">
           <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold text-gray-700">From:</span>
              <div className="relative">
                <input type="text" defaultValue="01/01/2026" className="border border-gray-300 rounded px-2 py-1 text-[13px] w-[110px] text-green-700 font-bold" />
                <i className="fa-solid fa-calendar absolute right-2 top-2 text-gray-400 text-[10px]"></i>
              </div>
           </div>
           <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold text-gray-700">To:</span>
              <div className="relative">
                <input type="text" defaultValue="01/01/2026" className="border border-gray-300 rounded px-2 py-1 text-[13px] w-[110px] text-green-700 font-bold" />
                <i className="fa-solid fa-calendar absolute right-2 top-2 text-gray-400 text-[10px]"></i>
              </div>
           </div>
           <button className="bg-[#5bc0de] text-white px-6 py-1.5 rounded-sm text-[12px] font-bold hover:bg-[#31b0d5] transition-colors">
              View Receipts
           </button>
        </div>
      </div>
    </div>
  );
};

const DataLine: React.FC<{ label: string; value: string; color?: string }> = ({ label, value, color = "text-gray-800" }) => (
  <div className="flex flex-col gap-0.5 border-b border-gray-50 pb-1">
    <span className="font-bold text-gray-600 text-[11px] uppercase tracking-tight">{label}</span>
    <span className={`font-semibold ${color} text-[12px] min-h-[1.2rem]`}>{value || ''}</span>
  </div>
);
