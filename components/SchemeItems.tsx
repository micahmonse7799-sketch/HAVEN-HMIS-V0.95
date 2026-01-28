
import React from 'react';

interface SchemeItemsProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const SchemeItems: React.FC<SchemeItemsProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-gray-400 font-medium">Scheme Items</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between">
          <h2 className="text-[16px] font-medium text-gray-700">Scheme Prices</h2>
          <button className="bg-[#5bc0de] text-white px-3 py-1 rounded-sm text-[11px] font-bold flex items-center gap-2 hover:bg-[#31b0d5]">
            Actions <i className="fa-solid fa-caret-down text-[9px]"></i>
          </button>
        </div>

        <div className="p-4 flex flex-col gap-6">
          {/* Top Selection Row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="w-full max-w-lg">
              <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white">
                <option>--Select a scheme here--</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[13px] font-bold text-gray-700">Item Type:</span>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-[13px] text-gray-700">
                  <input type="radio" name="itemType" defaultChecked className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                  <span>Products</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-[13px] text-gray-700">
                  <input type="radio" name="itemType" className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                  <span>Services</span>
                </label>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Table Comparison Area */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 items-center">
            
            {/* Left Section: Scheme Items */}
            <div className="flex flex-col gap-2">
              <h3 className="text-[14px] font-bold text-blue-800 underline uppercase tracking-tight">Scheme Items</h3>
              <div className="flex flex-wrap items-center justify-between mb-1 gap-2">
                <div className="flex gap-1">
                  <button className="border border-gray-300 bg-white px-2 py-1 text-[11px] text-gray-600 rounded shadow-xs hover:bg-gray-50">Excel</button>
                  <button className="border border-gray-300 bg-white px-2 py-1 text-[11px] text-gray-600 rounded shadow-xs hover:bg-gray-50">CSV</button>
                  <button className="border border-gray-300 bg-white px-2 py-1 text-[11px] text-gray-600 rounded shadow-xs hover:bg-gray-50">Print</button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-gray-500">Search:</span>
                  <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[120px] focus:ring-1 focus:ring-cyan-500" />
                </div>
              </div>
              <div className="border border-gray-200 rounded-sm overflow-hidden min-h-[300px]">
                <table className="w-full text-left text-[12px]">
                  <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                    <tr>
                      <th className="px-2 py-2 w-[30px] border-r"><input type="checkbox" className="w-3.5 h-3.5" /></th>
                      <th className="px-2 py-2 font-bold border-r">Name <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-2 py-2 font-bold border-r">Markup <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-2 py-2 font-bold border-r">Factor <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-2 py-2 font-bold">Price <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={5} className="text-center py-24 text-gray-400 italic">No data available in table</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Middle Action Arrows */}
            <div className="flex lg:flex-col gap-2 justify-center lg:pt-16">
              <button className="bg-[#17a2b8] text-white w-7 h-7 rounded flex items-center justify-center hover:bg-[#138496] shadow-sm transition-all active:scale-90">
                <i className="fa-solid fa-chevron-left text-[10px]"></i>
              </button>
              <button className="bg-[#17a2b8] text-white w-7 h-7 rounded flex items-center justify-center hover:bg-[#138496] shadow-sm transition-all active:scale-90">
                <i className="fa-solid fa-chevron-right text-[10px]"></i>
              </button>
            </div>

            {/* Right Section: All Items */}
            <div className="flex flex-col gap-2">
              <h3 className="text-[14px] font-bold text-blue-800 underline uppercase tracking-tight">All Items (Default Scheme Prices)</h3>
              <div className="flex flex-wrap items-center justify-between mb-1 gap-2">
                <div className="flex gap-1">
                  <button className="border border-gray-300 bg-white px-2 py-1 text-[11px] text-gray-600 rounded shadow-xs hover:bg-gray-50">Excel</button>
                  <button className="border border-gray-300 bg-white px-2 py-1 text-[11px] text-gray-600 rounded shadow-xs hover:bg-gray-50">CSV</button>
                  <button className="border border-gray-300 bg-white px-2 py-1 text-[11px] text-gray-600 rounded shadow-xs hover:bg-gray-50">Print</button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-gray-500">Search:</span>
                  <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[120px] focus:ring-1 focus:ring-cyan-500" />
                </div>
              </div>
              <div className="border border-gray-200 rounded-sm overflow-hidden min-h-[300px]">
                <table className="w-full text-left text-[12px]">
                  <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                    <tr>
                      <th className="px-2 py-2 w-[30px] border-r"><input type="checkbox" className="w-3.5 h-3.5" /></th>
                      <th className="px-2 py-2 font-bold border-r">Name <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-2 py-2 font-bold">Unit Price <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={3} className="text-center py-24 text-gray-400 italic">No data available in table</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions: Copy Prices */}
        <div className="bg-[#fcfcfc] border-t border-gray-200 p-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-bold text-gray-700">Copy Prices From (Scheme):</span>
            <select className="border border-gray-300 rounded px-3 py-1 text-[13px] bg-white outline-none min-w-[220px] focus:ring-1 focus:ring-cyan-500">
              <option>--Select a scheme here--</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-bold text-gray-700">To (Scheme):</span>
            <input 
              type="text" 
              className="border border-gray-300 rounded px-3 py-1 text-[13px] outline-none w-[200px] focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <button className="bg-[#17a2b8] text-white px-6 py-1.5 rounded-sm text-[13px] font-bold hover:bg-[#138496] shadow-sm uppercase tracking-tight transition-colors">
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};
