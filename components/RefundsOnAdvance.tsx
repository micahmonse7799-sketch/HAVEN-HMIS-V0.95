
import React from 'react';

interface RefundsOnAdvanceProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const RefundsOnAdvance: React.FC<RefundsOnAdvanceProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-gray-400 font-medium">Refunds on Advance</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between">
          <h2 className="text-[15px] font-medium text-gray-600">Refund on Advance:</h2>
          <button className="bg-[#17a2b8] text-white px-3 py-1 rounded-sm text-[12px] flex items-center gap-2">
            Create New
          </button>
        </div>
        
        <div className="p-4">
           {/* Search Box */}
           <div className="flex justify-center mb-6">
              <div className="relative w-full max-w-xl flex shadow-sm">
                <input 
                  type="text" 
                  placeholder="Search by Patient Name or ID"
                  className="flex-1 bg-white border border-gray-300 rounded-l px-4 py-1.5 text-[14px] outline-none"
                />
                <button className="bg-[#5da54f] text-white px-4 rounded-r hover:bg-[#4d8a41]">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="border border-gray-200 rounded-sm p-4 pt-6 relative">
                 <span className="absolute -top-3 left-4 bg-white px-2 text-[12px] font-semibold text-gray-500">Refund Details</span>
                 <div className="grid grid-cols-1 gap-y-2 text-[13px] text-gray-700">
                    <DataLine label="Patient Name:" value="" />
                    <DataLine label="OP/No:" value="" />
                    <DataLine label="Advance Balance:" value="" />
                    <DataLine label="Amount to Refund:" value="" />
                    <DataLine label="Refund Mode:" value="" />
                    <DataLine label="Reason:" value="" />
                 </div>
                 <div className="mt-4 flex justify-end">
                    <button className="bg-[#5cb85c] text-white px-6 py-1.5 rounded text-[13px] font-bold">Process Refund</button>
                 </div>
              </div>

              <div className="border border-gray-200 rounded-sm p-4 pt-6 relative">
                 <span className="absolute -top-3 left-4 bg-white px-2 text-[12px] font-semibold text-gray-500">Refund History</span>
                 <div className="text-center py-10 text-gray-400 italic text-[13px]">
                    No recent refunds for this patient.
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const DataLine: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-baseline border-b border-gray-50 pb-1">
    <span className="font-bold text-gray-700 whitespace-nowrap">{label}</span>
    <span className="font-medium text-gray-800">{value || ''}</span>
  </div>
);
