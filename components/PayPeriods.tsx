
import React from 'react';

interface PayPeriodsProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const PayPeriods: React.FC<PayPeriodsProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-blue-500 cursor-pointer hover:underline">HR</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Pay Periods</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Pay Period Entry Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between">
          <h2 className="text-[16px] font-medium text-gray-600 uppercase tracking-tight">Pay Period Details</h2>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start relative">
           {/* Form Area */}
           <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Pay Year</label>
                 <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white" />
              </div>
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Period Ending Date</label>
                 <div className="relative">
                    <input type="text" placeholder="mm/dd/yyyy" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white" />
                    <i className="fa-solid fa-calendar absolute right-3 top-2.5 text-gray-400 text-[10px]"></i>
                 </div>
              </div>
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Pay Month</label>
                 <select className="border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white outline-none focus:ring-1 focus:ring-cyan-500">
                    <option></option>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                    <option>April</option>
                    <option>May</option>
                    <option>June</option>
                    <option>July</option>
                    <option>August</option>
                    <option>September</option>
                    <option>October</option>
                    <option>November</option>
                    <option>December</option>
                 </select>
              </div>
              <div className="flex items-center gap-2 pt-6">
                 <input type="checkbox" id="current_period" className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
                 <label htmlFor="current_period" className="text-[13px] text-gray-700 font-medium">Is Current Pay Period</label>
              </div>
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Period Beginning Date</label>
                 <div className="relative">
                    <input type="text" placeholder="mm/dd/yyyy" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white" />
                    <i className="fa-solid fa-calendar absolute right-3 top-2.5 text-gray-400 text-[10px]"></i>
                 </div>
              </div>
           </div>

           {/* Save Button Container */}
           <div className="lg:col-span-4 flex justify-end items-end h-full pt-4">
              <button className="bg-[#17a2b8] text-white w-10 h-10 rounded flex items-center justify-center hover:bg-[#138496] shadow-md transition-all active:scale-95">
                 <i className="fa-solid fa-plus text-lg"></i>
              </button>
           </div>
        </div>

        {/* View Section */}
        <div className="border-t border-gray-200">
           <div className="px-4 py-2 bg-[#f8f9fa] border-b">
             <h2 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">View: Pay Periods</h2>
           </div>
           <div className="p-4 flex flex-col gap-4">
              <div className="flex justify-end items-center gap-2">
                 <span className="text-[12px] text-gray-500">Search:</span>
                 <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[11px] outline-none w-[200px]" />
              </div>

              <div className="border border-gray-200 rounded-sm overflow-hidden">
                <table className="w-full text-left text-[12px] whitespace-nowrap">
                   <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                      <tr>
                         <th className="px-3 py-2 font-bold border-r">Period ID <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Pay Year <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Pay Month <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Beginning Date <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Ending Date <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold">Is Current <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      </tr>
                   </thead>
                   <tbody className="bg-white text-gray-700">
                      <PeriodRow id="176" year="2025" month="January" start="Jan 1, 2025" end="Jan 31, 2025" current="No" />
                      <PeriodRow id="178" year="2025" month="February" start="Feb 1, 2025" end="Feb 28, 2025" current="No" />
                      <PeriodRow id="180" year="2025" month="March" start="Mar 1, 2025" end="Mar 31, 2025" current="No" />
                      <PeriodRow id="181" year="2025" month="April" start="Apr 1, 2025" end="Apr 30, 2025" current="No" />
                      <PeriodRow id="182" year="2025" month="May" start="May 1, 2025" end="May 31, 2025" current="No" />
                      <PeriodRow id="183" year="2025" month="June" start="Jun 1, 2025" end="Jun 30, 2025" current="No" />
                      <PeriodRow id="184" year="2025" month="July" start="Jul 1, 2025" end="Jul 31, 2025" current="No" />
                      <PeriodRow id="185" year="2025" month="August" start="Aug 1, 2025" end="Aug 31, 2025" current="No" />
                      <PeriodRow id="186" year="2025" month="September" start="Sep 1, 2025" end="Sep 30, 2025" current="No" />
                      <PeriodRow id="194" year="2025" month="November" start="Nov 1, 2025" end="Nov 30, 2025" current="No" />
                      <PeriodRow id="196" year="2025" month="December" start="Dec 1, 2025" end="Dec 31, 2025" current="Yes" />
                   </tbody>
                </table>
              </div>

              {/* Bottom Filter */}
              <div className="flex items-center gap-2 mt-4">
                 <span className="text-[13px] font-bold text-gray-700">Year:</span>
                 <select className="border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white text-green-700 font-bold min-w-[150px]">
                    <option>2025</option>
                    <option>2024</option>
                 </select>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const PeriodRow: React.FC<{ id: string; year: string; month: string; start: string; end: string; current: string }> = ({ id, year, month, start, end, current }) => (
  <tr className="border-b hover:bg-gray-50 transition-colors">
    <td className="px-3 py-2 border-r">{id}</td>
    <td className="px-3 py-2 border-r">{year}</td>
    <td className="px-3 py-2 border-r font-medium">{month}</td>
    <td className="px-3 py-2 border-r">{start}</td>
    <td className="px-3 py-2 border-r">{end}</td>
    <td className="px-3 py-2">{current}</td>
  </tr>
);
