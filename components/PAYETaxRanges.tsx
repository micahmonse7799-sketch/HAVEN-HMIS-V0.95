import React from 'react';

interface PAYETaxRangesProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const PAYETaxRanges: React.FC<PAYETaxRangesProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-gray-400 font-medium">PAYE Tax Ranges</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between">
          <h2 className="text-[16px] font-medium text-gray-600 uppercase tracking-tight">Tax Range Details</h2>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 items-start">
           <div className="flex flex-col gap-4">
              <TaxField label="Lower Limit" />
              <TaxField label="Upper Limit" />
           </div>
           <div className="flex flex-col gap-4">
              <TaxField label="Tax Rate (%)" />
              <div className="flex items-center gap-2 pt-2">
                 <input type="checkbox" id="no-limit" className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
                 <label htmlFor="no-limit" className="text-[13px] text-gray-700 font-medium">Has No Limit</label>
              </div>
           </div>
           <div className="flex justify-end items-end h-full">
              <button className="bg-[#17a2b8] text-white w-10 h-10 rounded flex items-center justify-center hover:bg-[#138496] shadow-md transition-all active:scale-95">
                 <i className="fa-solid fa-plus text-lg"></i>
              </button>
           </div>
        </div>

        <div className="border-t border-gray-200">
           <div className="px-4 py-2 bg-[#f8f9fa] border-b">
             <h2 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">View: PAYE Tax Ranges</h2>
           </div>
           <div className="p-4">
              <div className="flex justify-end mb-2">
                 <div className="flex items-center gap-2">
                    <span className="text-[12px] text-gray-500">Search:</span>
                    <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[11px] outline-none w-[200px]" />
                 </div>
              </div>
              <div className="border border-gray-200 rounded-sm overflow-hidden">
                <table className="w-full text-left text-[12px] whitespace-nowrap">
                   <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                      <tr>
                         <th className="px-4 py-2 font-bold border-r">Range ID <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-4 py-2 font-bold border-r">Lower Limit <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-4 py-2 font-bold border-r">Upper Limit <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-4 py-2 font-bold">Tax Rate (%) <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      </tr>
                   </thead>
                   <tbody className="bg-white text-gray-700">
                      <RangeRow id="1" lower="0.00" upper="24,000.00" rate="10" />
                      <RangeRow id="2" lower="24,001.00" upper="32,333.00" rate="25" />
                      <RangeRow id="3" lower="32,334.00" upper="500,000.00" rate="30" />
                      <RangeRow id="30" lower="500,001.00" upper="800,000.00" rate="32.5" />
                      <RangeRow id="31" lower="800,000.00" upper="And Above" rate="35" />
                   </tbody>
                </table>
              </div>
           </div>
        </div>

        {/* Footer Area */}
        <div className="p-4 border-t border-gray-100 flex items-center gap-2">
           <span className="text-[13px] font-bold text-gray-700">Minimum Taxable Pay:</span>
           <div className="flex border border-gray-300 rounded shadow-xs">
              <input type="text" className="w-[120px] px-3 py-1 text-[14px] outline-none" />
              <div className="bg-gray-50 px-2 flex items-center text-green-700 font-bold border-l border-gray-300">24001</div>
           </div>
           <button className="bg-[#5bc0de] text-white px-4 py-1 rounded text-[13px] font-bold hover:bg-[#31b0d5] shadow-sm ml-2">Update</button>
        </div>
      </div>
    </div>
  );
};

const TaxField: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex flex-col gap-1.5 flex-1">
    <label className="text-[11px] font-bold text-gray-500 uppercase">{label}</label>
    <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white" />
  </div>
);

const RangeRow: React.FC<{ id: string; lower: string; upper: string; rate: string }> = ({ id, lower, upper, rate }) => (
  <tr className="border-b hover:bg-gray-50 transition-colors">
    <td className="px-4 py-2 border-r">{id}</td>
    <td className="px-4 py-2 border-r text-right">{lower}</td>
    <td className="px-4 py-2 border-r text-right">{upper}</td>
    <td className="px-4 py-2">{rate}</td>
  </tr>
);
