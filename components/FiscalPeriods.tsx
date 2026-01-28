
import React from 'react';

interface FiscalPeriodsProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const FiscalPeriods: React.FC<FiscalPeriodsProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-gray-400 font-medium">Fiscal Periods</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Fiscal Period Form */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b bg-[#f8f9fa]">
          <h2 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">Fiscal Period Details</h2>
        </div>

        <div className="p-4 flex flex-col gap-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Period ID</label>
                 <input type="text" defaultValue="0" readOnly className="w-full border border-gray-200 bg-gray-50 rounded px-3 py-1.5 text-[14px] text-green-700 font-bold outline-none text-right" />
              </div>
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Close Date</label>
                 <div className="relative">
                    <input type="text" placeholder="mm/dd/yyyy" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none" />
                    <i className="fa-solid fa-calendar absolute right-3 top-2.5 text-gray-400 text-[11px]"></i>
                 </div>
              </div>
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Open Date</label>
                 <div className="relative">
                    <input type="text" placeholder="mm/dd/yyyy" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none" />
                    <i className="fa-solid fa-calendar absolute right-3 top-2.5 text-gray-400 text-[11px]"></i>
                 </div>
              </div>
              <div className="flex items-center gap-12 pt-6">
                 <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-cyan-600" />
                    <label className="text-[13px] text-gray-700 font-medium">Is Active</label>
                 </div>
                 <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-cyan-600" />
                    <label className="text-[13px] text-gray-700 font-medium">Is Open</label>
                 </div>
              </div>
           </div>
           
           <div className="flex justify-end">
              <button className="bg-[#17a2b8] text-white w-10 h-10 rounded flex items-center justify-center hover:bg-[#138496] shadow-md transition-all active:scale-95">
                <i className="fa-solid fa-plus text-lg"></i>
              </button>
           </div>
        </div>

        {/* View Section */}
        <div className="border-t border-gray-200">
           <div className="px-4 py-2 bg-[#f8f9fa] border-b">
             <h2 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">View: Fiscal Periods</h2>
           </div>
           <div className="p-4 flex flex-col gap-4">
              <div className="flex justify-end gap-2 items-center">
                 <span className="text-[12px] text-gray-500">Search:</span>
                 <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[200px]" />
              </div>

              <div className="border border-gray-200 rounded-sm overflow-hidden">
                <table className="w-full text-left text-[12px]">
                  <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                    <tr>
                      <th className="px-4 py-2 font-bold border-r">Fiscal Period No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-4 py-2 font-bold border-r">Open Date <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-4 py-2 font-bold border-r">Close Date <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-4 py-2 font-bold border-r">Is Active <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-4 py-2 font-bold">Is Open <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-gray-700">
                     <FiscalRow no="1" open="Jan 1, 2020" close="Dec 31, 2020" active="No" isOpen="No" />
                     <FiscalRow no="2" open="Jan 1, 2021" close="Dec 31, 2021" active="No" isOpen="No" />
                     <FiscalRow no="3" open="Jan 1, 2022" close="Dec 31, 2022" active="No" isOpen="Yes" />
                     <FiscalRow no="4" open="Jan 1, 2023" close="Dec 31, 2023" active="No" isOpen="Yes" />
                     <FiscalRow no="5" open="Jan 1, 2029" close="Dec 31, 2029" active="No" isOpen="Yes" />
                     <FiscalRow no="6" open="Jan 1, 2025" close="Dec 30, 2025" active="No" isOpen="Yes" />
                     <FiscalRow no="7" open="Jan 25, 2019" close="Jun 30, 2019" active="No" isOpen="Yes" />
                     <FiscalRow no="8" open="Jan 1, 1990" close="Dec 31, 1990" active="No" isOpen="Yes" />
                     <FiscalRow no="9" open="Dec 31, 2026" close="Dec 31, 2027" active="No" isOpen="Yes" />
                     <FiscalRow no="10" open="Jan 1, 2024" close="Dec 31, 2024" active="No" isOpen="Yes" />
                  </tbody>
                </table>
              </div>

              {/* Footer Controls */}
              <div className="flex items-center justify-between mt-2">
                 <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer text-[13px] text-gray-700">
                       <input type="radio" name="statusFilter" className="w-4 h-4 text-blue-600" /> Active
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-[13px] text-gray-700">
                       <input type="radio" name="statusFilter" className="w-4 h-4 text-blue-600" /> Inactive
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-[13px] text-gray-700">
                       <input type="radio" name="statusFilter" defaultChecked className="w-4 h-4 text-blue-600" /> All
                    </label>
                 </div>
                 <button className="bg-[#17a2b8] text-white px-5 py-1.5 rounded-sm text-[12px] font-bold hover:bg-[#138496] shadow-sm uppercase tracking-tight">
                    Close Period
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const FiscalRow: React.FC<{ no: string; open: string; close: string; active: string; isOpen: string }> = ({ no, open, close, active, isOpen }) => (
  <tr className="border-b hover:bg-gray-50 transition-colors">
    <td className="px-4 py-2 border-r">{no}</td>
    <td className="px-4 py-2 border-r">{open}</td>
    <td className="px-4 py-2 border-r">{close}</td>
    <td className="px-4 py-2 border-r">{active}</td>
    <td className="px-4 py-2">{isOpen}</td>
  </tr>
);
