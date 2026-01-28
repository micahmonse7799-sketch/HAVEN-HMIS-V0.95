
import React from 'react';

interface SchedulingProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const Scheduling: React.FC<SchedulingProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = [
    { d: 28, curr: false, events: ['8a Kembe Levi Mark: IT'] }, 
    { d: 29, curr: false, events: ['8a Kembe Levi Mark: IT'] }, 
    { d: 30, curr: false, events: ['8a Kembe Levi Mark: IT'] }, 
    { d: 31, curr: false, events: ['8a Kembe Levi Mark: IT'] }, 
    { d: 1, curr: true }, { d: 2, curr: true }, { d: 3, curr: true, isHighlighted: true },
    { d: 4, curr: true }, { d: 5, curr: true }, { d: 6, curr: true }, { d: 7, curr: true }, { d: 8, curr: true }, { d: 9, curr: true }, { d: 10, curr: true },
    { d: 11, curr: true }, { d: 12, curr: true }, { d: 13, curr: true }, { d: 14, curr: true }, { d: 15, curr: true }, { d: 16, curr: true }, { d: 17, curr: true },
    { d: 18, curr: true }, { d: 19, curr: true }, { d: 20, curr: true }, { d: 21, curr: true }, { d: 22, curr: true }, { d: 23, curr: true }, { d: 24, curr: true },
    { d: 25, curr: true }, { d: 26, curr: true }, { d: 27, curr: true }, { d: 28, curr: true }, { d: 29, curr: true }, { d: 30, curr: true }, { d: 31, curr: true },
    { d: 1, curr: false }, { d: 2, curr: false }, { d: 3, curr: false }, { d: 4, curr: false }, { d: 5, curr: false }, { d: 6, curr: false }, { d: 7, curr: false }
  ];

  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20">
      {/* Breadcrumbs */}
      <div className="bg-[#f8f9fa] border border-gray-200 rounded-sm px-4 py-1 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5 text-gray-500">
          <i className="fa-solid fa-home text-blue-500"></i>
          <span className="opacity-50">/</span>
          <span className="text-blue-500 cursor-pointer">HR</span>
          <span className="opacity-50">/</span>
          <span className="text-blue-500 cursor-pointer">Scheduling</span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden flex flex-col h-full min-h-[600px]">
        <div className="px-4 py-2 border-b bg-white flex items-center justify-between">
          <h2 className="text-[17px] font-normal text-gray-700">Scheduling</h2>
          <button className="bg-[#5bc0de] text-white px-3 py-1 rounded-sm text-[12px] flex items-center gap-2 hover:bg-[#31b0d5]">
            Actions <i className="fa-solid fa-caret-down text-[9px]"></i>
          </button>
        </div>

        {/* Calendar Toolbar */}
        <div className="p-3 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-1">
            <div className="flex rounded overflow-hidden shadow-sm">
              <button className="bg-[#34495e] text-white px-3 py-1.5 hover:bg-[#2c3e50] border-r border-black/20"><i className="fa-solid fa-angles-left text-[10px]"></i></button>
              <button className="bg-[#34495e] text-white px-3 py-1.5 hover:bg-[#2c3e50] border-r border-black/20"><i className="fa-solid fa-angle-left text-[10px]"></i></button>
              <button className="bg-[#34495e] text-white px-3 py-1.5 hover:bg-[#2c3e50] border-r border-black/20"><i className="fa-solid fa-angle-right text-[10px]"></i></button>
              <button className="bg-[#34495e] text-white px-3 py-1.5 hover:bg-[#2c3e50]"><i className="fa-solid fa-angles-right text-[10px]"></i></button>
            </div>
            <button className="bg-[#7f8c8d] text-white px-4 py-1.5 rounded shadow-sm text-[12px] font-medium hover:bg-[#6c7a7b]">today</button>
            <button className="bg-[#34495e] text-white w-9 h-9 flex items-center justify-center rounded shadow-sm ml-1"><i className="fa-solid fa-print text-sm"></i></button>
          </div>

          <h2 className="text-[22px] font-normal text-gray-700">January 2026</h2>

          <div className="flex rounded overflow-hidden shadow-sm">
            <button className="bg-[#2c3e50] text-white px-4 py-1.5 hover:bg-[#1a252f] text-[12px] border-r border-black/20 font-medium">month</button>
            <button className="bg-[#2c3e50] text-white px-4 py-1.5 hover:bg-[#1a252f] text-[12px] border-r border-black/20 font-medium">week</button>
            <button className="bg-[#2c3e50] text-white px-4 py-1.5 hover:bg-[#1a252f] text-[12px] font-medium">day</button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 bg-white flex flex-col">
          <div className="grid grid-cols-7 border-b border-gray-200">
            {days.map(day => (
              <div key={day} className="py-2 text-center text-[13px] font-bold text-gray-700 border-r last:border-r-0">
                {day}
              </div>
            ))}
          </div>
          <div className="flex-1 grid grid-cols-7 auto-rows-fr">
            {dates.map((date, idx) => (
              <div key={idx} className={`border-r border-b last:border-r-0 p-1 flex flex-col min-h-[100px] ${date.isHighlighted ? 'bg-[#fcf8e3]' : ''}`}>
                <div className={`text-right text-[12px] pr-1 pt-1 font-medium ${date.curr ? 'text-blue-400' : 'text-blue-200'}`}>
                  {date.d}
                </div>
                <div className="flex flex-col gap-1 mt-1">
                  {date.events?.map((ev, eIdx) => (
                    <div key={eIdx} className="bg-black text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold truncate">
                      {ev}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
