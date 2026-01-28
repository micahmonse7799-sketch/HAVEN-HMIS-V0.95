
import React from 'react';

interface CurrencyUnitsProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const CurrencyUnits: React.FC<CurrencyUnitsProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-gray-400 font-medium">Currency Unit</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden flex flex-col max-w-2xl">
        <div className="px-4 py-2 border-b bg-[#f8f9fa]">
          <h2 className="text-[16px] font-medium text-gray-600">Currency Units</h2>
        </div>

        <div className="p-4 flex flex-col gap-6">
           <div className="grid grid-cols-2 gap-8 items-end">
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700">Name</label>
                 <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500" />
              </div>
              <div className="flex items-end gap-2">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[12px] font-bold text-gray-700">Multiplicand</label>
                  <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500" />
                </div>
                <button className="bg-[#17a2b8] text-white w-10 h-10 rounded flex items-center justify-center hover:bg-[#138496] shadow-sm">
                   <i className="fa-solid fa-plus text-lg"></i>
                </button>
              </div>
           </div>

           <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
              <h3 className="text-[15px] font-medium text-gray-600">View: Currency Units</h3>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-1">
                   <button className="border border-gray-300 bg-white px-3 py-1 text-[11px] text-gray-600 hover:bg-gray-50">Excel</button>
                   <button className="border border-gray-300 bg-white px-3 py-1 text-[11px] text-gray-600 hover:bg-gray-50">CSV</button>
                   <button className="border border-gray-300 bg-white px-3 py-1 text-[11px] text-gray-600 hover:bg-gray-50">Print</button>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-[12px] text-gray-500">Search:</span>
                   <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[180px]" />
                </div>
              </div>

              <div className="border border-gray-200 rounded-sm overflow-hidden">
                <table className="w-full text-left text-[12px]">
                   <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                      <tr>
                         <th className="px-4 py-2 font-bold border-r">ID</th>
                         <th className="px-4 py-2 font-bold border-r">Name <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-4 py-2 font-bold">Multiplicand <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      </tr>
                   </thead>
                   <tbody className="bg-white text-gray-700">
                      <UnitRow id="1" name="1000-Shilling Note" mult="1000" />
                      <UnitRow id="2" name="500-Shilling Note" mult="500" />
                      <UnitRow id="3" name="200-Shilling Note" mult="200" />
                      <UnitRow id="4" name="100-Shilling Note" mult="100" />
                      <UnitRow id="5" name="50-Shilling Note" mult="50" />
                      <UnitRow id="6" name="40-Shilling Coin" mult="40" />
                      <UnitRow id="7" name="20-Shilling Coin" mult="20" />
                      <UnitRow id="8" name="10-Shilling Coin" mult="10" />
                      <UnitRow id="9" name="5-Shilling Coin" mult="5" />
                      <UnitRow id="10" name="1-Shilling Coin" mult="1" />
                      <UnitRow id="11" name="1-Dollar Bill" mult="100" />
                   </tbody>
                </table>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const UnitRow: React.FC<{ id: string; name: string; mult: string }> = ({ id, name, mult }) => (
  <tr className="border-b hover:bg-gray-50 transition-colors">
    <td className="px-4 py-2 border-r">{id}</td>
    <td className="px-4 py-2 border-r font-medium text-gray-800">{name}</td>
    <td className="px-4 py-2 font-medium">{mult}</td>
  </tr>
);
