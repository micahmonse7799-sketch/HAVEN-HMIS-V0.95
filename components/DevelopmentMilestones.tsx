import React from 'react';

interface DevelopmentMilestonesProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const DevelopmentMilestones: React.FC<DevelopmentMilestonesProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-10">
      {/* Top Header Bar */}
      <div className="bg-white rounded-sm h-10 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <i onClick={onBack} className="fa-solid fa-times text-gray-400 cursor-pointer hover:text-gray-600 text-xs"></i>
          <h1 className="text-gray-700 font-semibold text-[14px]">Demo Hospital</h1>
        </div>
        <div className="flex items-center gap-8 text-[13px] text-gray-500">
          <div>Branch: <span className="text-[#43939e]">Main branch</span></div>
          <div>Room: <span onClick={onOpenRoomModal} className="text-[#43939e] cursor-pointer hover:underline">{currentRoom}</span></div>
          <button className="bg-[#17a2b8] text-white px-4 py-1 rounded-sm text-[11px]">Queue</button>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-[#f8f9fa] border border-gray-200 rounded-sm px-4 py-1.5 flex items-center justify-between text-[12px]">
        <div className="flex items-center gap-2 text-gray-500">
          <i className="fa-solid fa-home text-blue-500"></i>
          <span className="opacity-50">/</span>
          <span className="text-blue-500 cursor-pointer hover:underline">Maternity</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Child Development Milestones</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Child Development Milestone Form */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2 border-b flex items-center justify-between bg-[#f8f9fa]">
          <h2 className="text-[15px] font-medium text-gray-600">Child Development Milestone</h2>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-start">
           <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-gray-600">Name</label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-gray-600">Upper Limit (Period)</label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-gray-600">Lower Limit (Period)</label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-gray-600">Period In</label>
                <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white">
                  <option></option>
                  <option>Months</option>
                  <option>Days</option>
                  <option>Weeks</option>
                </select>
              </div>
              <div className="flex items-end h-full md:col-span-2 justify-end">
                 <button className="bg-[#17a2b8] text-white w-8 h-8 flex items-center justify-center rounded-sm hover:bg-[#138496]">
                    <i className="fa-solid fa-plus text-xs"></i>
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* View: Development Milestones Table */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2 border-b bg-[#f8f9fa]">
          <h2 className="text-[15px] font-medium text-gray-600">View: Development Milestones</h2>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <div className="flex justify-end gap-2 items-center">
            <span className="text-[12px] text-gray-500">Search:</span>
            <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[220px]" />
          </div>

          <div className="border border-gray-100 rounded-sm overflow-x-auto">
            <table className="w-full text-left text-[12px]">
              <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                <tr>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">No <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">Milestone <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                  <th className="px-4 py-2 font-bold text-[#333]">Normal Limits <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <MilestoneRow no="1" name="Walking" limits="9 - 12 Months" />
                <MilestoneRow no="2" name="Recognizes Sounds and Voice" limits="1 - 2 Months" />
                <MilestoneRow no="3" name="Follow Moving Objects with eyes" limits="2 - 3 Months" />
                <MilestoneRow no="4" name="Latches onto nipples or bottle" limits="0 - 1 Days" />
                <MilestoneRow no="5" name="Tongue moves backward and forward to suck" limits="0 - 3 Months" />
                <MilestoneRow no="6" name="Running" limits="12 - 36 Months" />
                <MilestoneRow no="11" name="Sitting" limits="5 - 8 Months" />
                <MilestoneRow no="17" name="crawling" limits="5 - 6 Months" />
                <MilestoneRow no="63" name="Can latch and breastfeed" limits="0 - 14 Days" />
                <MilestoneRow no="64" name="Has healed navel" limits="7 - 14 Days" />
                <MilestoneRow no="67" name="Keen hands in tight fists" limits="0 - 4 Months" />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const MilestoneRow: React.FC<{ no: string; name: string; limits: string }> = ({ no, name, limits }) => (
  <tr className="border-b hover:bg-gray-50 transition-colors">
    <td className="px-4 py-2 border-r">{no}</td>
    <td className="px-4 py-2 border-r">{name}</td>
    <td className="px-4 py-2">{limits}</td>
  </tr>
);
