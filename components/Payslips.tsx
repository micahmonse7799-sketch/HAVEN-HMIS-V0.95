import React from 'react';

interface PayslipsProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const Payslips: React.FC<PayslipsProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-gray-400 font-medium">Payslips</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden p-4">
         <h2 className="text-[18px] font-medium text-gray-700 mb-4">Payslips</h2>

         <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
            {/* Left: Pay Periods Selection */}
            <div className="flex flex-col gap-2">
               <h3 className="text-[13px] font-bold text-blue-800 underline uppercase tracking-tight">Pay Periods (Select pay period to view payslips)</h3>
               <div className="flex items-center gap-2 text-[12px] text-gray-600 mb-1">
                  <span>Show</span>
                  <select className="border border-gray-300 rounded px-1.5 py-0.5 outline-none">
                     <option>10</option>
                  </select>
                  <span>entries</span>
               </div>
               <div className="border border-gray-200 rounded-sm overflow-hidden">
                  <table className="w-full text-left text-[12px]">
                     <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                        <tr>
                           <th className="px-3 py-1.5 border-r font-bold">No</th>
                           <th className="px-3 py-1.5 border-r font-bold">Beginning Date <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                           <th className="px-3 py-1.5 border-r font-bold">Ending Date <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                           <th className="px-3 py-1.5 border-r font-bold">Pay Year <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                           <th className="px-3 py-1.5 font-bold">Pay Month <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                        </tr>
                     </thead>
                     <tbody className="bg-white text-gray-700">
                        <PeriodSelectionRow no="196" start="Dec 1, 2025" end="Dec 31, 2025" year="2025" month="December" />
                        <PeriodSelectionRow no="194" start="Nov 1, 2025" end="Nov 30, 2025" year="2025" month="November" />
                        <PeriodSelectionRow no="186" start="Sep 1, 2025" end="Sep 30, 2025" year="2025" month="September" />
                        <PeriodSelectionRow no="185" start="Aug 1, 2025" end="Aug 31, 2025" year="2025" month="August" />
                        <PeriodSelectionRow no="184" start="Jul 1, 2025" end="Jul 31, 2025" year="2025" month="July" />
                     </tbody>
                  </table>
               </div>
               <div className="flex justify-end mt-2">
                  <div className="flex items-center border border-gray-300 rounded overflow-hidden text-[11px]">
                     <button className="px-3 py-1 hover:bg-gray-100 border-r border-gray-300">Previous</button>
                     <button className="px-3 py-1 bg-blue-600 text-white border-r border-gray-300">1</button>
                     <button className="px-3 py-1 hover:bg-gray-100 border-r border-gray-300">2</button>
                     <button className="px-3 py-1 hover:bg-gray-100 border-r border-gray-300">3</button>
                     <button className="px-3 py-1 hover:bg-gray-100 border-r border-gray-300">4</button>
                     <button className="px-3 py-1 hover:bg-gray-100 border-r border-gray-300">5</button>
                     <button className="px-3 py-1 hover:bg-gray-100 border-r border-gray-300">...</button>
                     <button className="px-3 py-1 hover:bg-gray-100 border-r border-gray-300">13</button>
                     <button className="px-3 py-1 hover:bg-gray-100">Next</button>
                  </div>
               </div>
            </div>

            {/* Right: Employee Details Card */}
            <div className="bg-[#fcfcfc] border border-gray-200 rounded p-4 flex flex-col gap-1 self-start min-h-[200px]">
               <h3 className="text-[13px] font-bold text-blue-800 underline uppercase tracking-tight mb-2">Employee details</h3>
               <DetailLine label="Surname:" />
               <DetailLine label="Othernames:" />
               <DetailLine label="Staff No:" />
               <DetailLine label="Payslip No:" />
               <DetailLine label="Pay Period:" />
               <DetailLine label="Status:" />
               <div className="mt-auto pt-4 flex justify-end">
                  <button className="bg-white border border-gray-300 px-4 py-1.5 text-[11px] font-medium rounded shadow-xs hover:bg-gray-50 transition-colors">
                     View Payslip
                  </button>
               </div>
            </div>
         </div>

         {/* Bottom: Main Table */}
         <div className="mt-8">
            <h3 className="text-[14px] font-bold text-blue-800 underline uppercase tracking-tight mb-2">View: Payslips For Period:</h3>
            <div className="flex justify-end mb-2">
               <div className="flex items-center gap-2">
                  <span className="text-[12px] text-gray-500">Search:</span>
                  <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[11px] outline-none w-[220px]" />
               </div>
            </div>
            <div className="border border-gray-200 rounded-sm overflow-x-auto min-h-[140px]">
               <table className="w-full text-left text-[12px] whitespace-nowrap">
                  <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                     <tr>
                        <th className="px-2 py-2 w-[40px] text-center border-r"><input type="checkbox" className="w-3.5 h-3.5" /></th>
                        <th className="px-3 py-2 font-bold border-r">Surname <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                        <th className="px-3 py-2 font-bold border-r">Other Names <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                        <th className="px-3 py-2 font-bold border-r">Department <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                        <th className="px-3 py-2 font-bold border-r">Basic Pay <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                        <th className="px-3 py-2 font-bold border-r">Gross Earning <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                        <th className="px-3 py-2 font-bold border-r">Total Deductions <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                        <th className="px-3 py-2 font-bold border-r">Net Pay <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                        <th className="px-3 py-2 font-bold">Status <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     </tr>
                  </thead>
                  <tbody className="bg-white text-gray-400 italic text-center">
                     <tr>
                        <td colSpan={9} className="py-8">No data available in table</td>
                     </tr>
                  </tbody>
               </table>
            </div>
            
            <div className="mt-4 flex flex-wrap justify-between gap-4">
               <button className="bg-[#5bc0de] text-white px-8 py-2 rounded text-[13px] font-bold shadow-sm flex items-center gap-2 hover:bg-[#31b0d5]">
                  Pay Selected Payslip(s) <i className="fa-solid fa-caret-up text-[10px]"></i>
               </button>
               <button className="bg-[#d9534f] text-white px-8 py-2 rounded text-[13px] font-bold shadow-sm hover:bg-[#c9302c]">
                  Cancel Payslip(s)
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

const PeriodSelectionRow: React.FC<{ no: string; start: string; end: string; year: string; month: string }> = ({ no, start, end, year, month }) => (
   <tr className="border-b hover:bg-gray-50 transition-colors cursor-pointer">
      <td className="px-3 py-1.5 border-r">{no}</td>
      <td className="px-3 py-1.5 border-r">{start}</td>
      <td className="px-3 py-1.5 border-r">{end}</td>
      <td className="px-3 py-1.5 border-r">{year}</td>
      <td className="px-3 py-1.5">{month}</td>
   </tr>
);

const DetailLine: React.FC<{ label: string }> = ({ label }) => (
   <div className="flex gap-2 text-[12px] text-gray-700">
      <span className="font-bold whitespace-nowrap">{label}</span>
      <span className="min-h-[1.2rem]"></span>
   </div>
);
