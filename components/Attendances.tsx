
import React from 'react';

interface AttendancesProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const Attendances: React.FC<AttendancesProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
      <div className="bg-[#f8f9fa] border border-gray-200 rounded-sm px-4 py-1 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5 text-gray-500">
          <i className="fa-solid fa-home text-blue-500"></i>
          <span className="opacity-50">/</span>
          <span className="text-blue-500 cursor-pointer">HR</span>
          <span className="opacity-50">/</span>
          <span className="text-blue-500 cursor-pointer">Attendances</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden flex flex-col min-h-[500px]">
        <div className="px-4 py-3 border-b bg-white">
          <h2 className="text-[17px] font-normal text-gray-700">Attendances</h2>
        </div>

        <div className="p-4 flex flex-col gap-4 flex-1">
          <div className="flex justify-end mb-1">
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-gray-500">Search:</span>
              <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[13px] outline-none w-[220px]" />
            </div>
          </div>

          <div className="border border-gray-200 rounded-sm overflow-x-auto">
            <table className="w-full text-left text-[13px] whitespace-nowrap">
              <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                <tr>
                  <th className="px-3 py-2 font-bold border-r">No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                  <th className="px-3 py-2 font-bold border-r">Employee <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                  <th className="px-3 py-2 font-bold border-r">Check In <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                  <th className="px-3 py-2 font-bold border-r">Break <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                  <th className="px-3 py-2 font-bold border-r">Check Out <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                  <th className="px-3 py-2 font-bold border-r">Tardiness <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                  <th className="px-3 py-2 font-bold border-r">Status <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                  <th className="px-3 py-2 font-bold border-r">Working Hrs <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                  <th className="px-3 py-2 font-bold">Overtime <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={9} className="text-center py-10 text-gray-500 font-medium italic">No data available in table</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-auto pt-4 flex flex-col gap-4">
            <div className="text-[12px] text-gray-500">Showing 0 to 0 of 0 entries</div>
            
            <div className="bg-white p-4 rounded border border-gray-200 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-gray-700">Status</span>
                <select className="border border-gray-300 rounded px-2 py-1.5 text-[14px] bg-white outline-none min-w-[150px] text-green-700 font-bold">
                  <option>Present</option>
                  <option>Absent</option>
                  <option>Late</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-gray-700">Between</span>
                <div className="relative">
                  <input type="text" defaultValue="01/03/2026" className="border border-gray-300 rounded px-2 py-1.5 text-[14px] w-[120px] text-green-700 font-bold outline-none" />
                  <i className="fa-solid fa-calendar absolute right-2 top-2.5 text-gray-400 text-[10px]"></i>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-gray-700">And</span>
                <div className="relative">
                  <input type="text" defaultValue="01/03/2026" className="border border-gray-300 rounded px-2 py-1.5 text-[14px] w-[120px] text-green-700 font-bold outline-none" />
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
    </div>
  );
};
