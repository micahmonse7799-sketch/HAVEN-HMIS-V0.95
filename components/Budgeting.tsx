
import React from 'react';

interface BudgetingProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const Budgeting: React.FC<BudgetingProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-gray-400 font-medium">Budgeting</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between">
          <h2 className="text-[16px] font-medium text-gray-700">Budget No:</h2>
          <button className="bg-[#5bc0de] text-white px-3 py-1 rounded-sm text-[11px] font-bold flex items-center gap-2 hover:bg-[#31b0d5]">
            Actions <i className="fa-solid fa-caret-down text-[9px]"></i>
          </button>
        </div>

        <div className="p-4 flex flex-col gap-6">
           {/* Budget Details Box */}
           <div className="border border-gray-200 rounded p-4 pt-6 relative shadow-xs">
              <span className="absolute -top-3 left-4 bg-white px-2 text-[14px] font-bold text-gray-700 underline decoration-gray-400">Budget Details</span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-2 text-[13px] text-gray-700">
                 <div className="flex justify-between border-b border-gray-50 pb-0.5"><span className="font-bold">Budget No:</span><span></span></div>
                 <div className="flex justify-between border-b border-gray-50 pb-0.5"><span className="font-bold">Budget Name:</span><span></span></div>
                 <div className="flex justify-between border-b border-gray-50 pb-0.5"><span className="font-bold">Created On:</span><span></span></div>
                 <div className="flex justify-between border-b border-gray-50 pb-0.5"><span className="font-bold">Fiscal Year:</span><span></span></div>
                 <div className="flex justify-between border-b border-gray-50 pb-0.5"><span className="font-bold">Last Updated:</span><span></span></div>
                 <div className="flex justify-between border-b border-gray-50 pb-0.5"><span className="font-bold">Interval:</span><span></span></div>
                 <div className="flex justify-between border-b border-gray-50 pb-0.5"><span className="font-bold">CreatedBy:</span><span></span></div>
              </div>
           </div>

           {/* View Section */}
           <div className="flex flex-col gap-3">
              <h3 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">View: Budgets</h3>
              <div className="border border-gray-200 rounded-sm overflow-x-auto">
                 <table className="w-full text-left text-[13px] whitespace-nowrap">
                    <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                       <tr>
                          <th className="px-4 py-2 font-bold border-r">Name</th>
                          <th className="px-4 py-2 font-bold border-r">Period</th>
                          <th className="px-4 py-2 font-bold border-r">Created On</th>
                          <th className="px-4 py-2 font-bold border-r">Last Update</th>
                          <th className="px-4 py-2 font-bold">Created By</th>
                       </tr>
                    </thead>
                    <tbody className="bg-white">
                       <BudgetRow name="dental budget" period="Jan 2025 - Dec 2025" created="Feb 17, 2025 10:04 am" updated="Oct 23, 2025 1:35 pm" by="accounts" />
                       <BudgetRow name="2026 BUDGET" period="Jan 2026 - Dec 2026" created="Apr 26, 2025 1:38 pm" updated="Jun 25, 2025 9:52 am" by="DOCTOR" />
                       <BudgetRow name="Try" period="Jan 2027 - Dec 2027" created="Sep 22, 2025 11:28 pm" updated="Sep 22, 2025 11:28 pm" by="DOCTOR" />
                    </tbody>
                 </table>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const BudgetRow: React.FC<{ name: string; period: string; created: string; updated: string; by: string }> = ({ name, period, created, updated, by }) => (
  <tr className="border-b hover:bg-gray-50 transition-colors">
    <td className="px-4 py-2 border-r font-medium text-gray-700">{name}</td>
    <td className="px-4 py-2 border-r">{period}</td>
    <td className="px-4 py-2 border-r">{created}</td>
    <td className="px-4 py-2 border-r">{updated}</td>
    <td className="px-4 py-2">{by}</td>
  </tr>
);
