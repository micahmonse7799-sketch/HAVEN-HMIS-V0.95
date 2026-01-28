import React from 'react';

interface MaternityProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const Maternity: React.FC<MaternityProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-gray-400 font-medium">Maternity</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Mother and Child Welfare Container */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2 border-b flex items-center justify-between bg-[#f8f9fa]">
          <h2 className="text-[15px] font-medium text-gray-600">Mother and Child Welfare</h2>
          <button className="bg-[#5bc0de] text-white px-3 py-1 rounded-sm text-[11px] flex items-center gap-2 hover:bg-[#31b0d5]">
            Actions <i className="fa-solid fa-caret-down text-[9px]"></i>
          </button>
        </div>

        <div className="p-4">
           {/* Maternal Profile Box */}
           <div className="border border-gray-200 rounded-sm p-4 pt-6 relative bg-white">
              <span className="absolute -top-3 left-4 bg-white px-2 text-[12px] font-semibold text-gray-500">Maternal Profile</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-1 text-[12px] text-gray-700">
                 <DataLine label="Maternal Profile No:" value="" />
                 <DataLine label="ANC NO:" value="" />
                 <DataLine label="LMP:" value="" />

                 <DataLine label="Other Names:" value="" />
                 <DataLine label="Surname:" value="" />
                 <DataLine label="EDD:" value="" />

                 <DataLine label="OP NO:" value="" />
                 <DataLine label="Visit ID:" value="" />
                 <DataLine label="Marital Status:" value="" />

                 <DataLine label="Gravida:" value="" />
                 <DataLine label="Parity:" value="" />
                 <DataLine label="Education:" value="" />

                 <DataLine label="Created By:" value="" />
                 <DataLine label="Doctor:" value="" />
                 <DataLine label="Date Of Pregnancy:" value="" />

                 <DataLine label="DateTime Created:" value="" />
                 <DataLine label="Pregnancy Duration:" value="" />
                 <DataLine label="Pregnancy Status:" value="" />
              </div>
              <div className="mt-6 border-t border-gray-50 pt-3 flex justify-end">
                 <button className="bg-[#5bc0de] text-white px-6 py-2 rounded text-[12px] font-bold shadow-sm hover:bg-[#31b0d5] transition-colors">
                   Create Maternal Profile From Queue
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* View: Maternal Profiles Table Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2 border-b bg-[#f8f9fa]">
          <h2 className="text-[15px] font-medium text-gray-600">View: Maternal Profiles</h2>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <div className="flex justify-end gap-2 items-center">
            <span className="text-[12px] text-gray-500">Search:</span>
            <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[220px]" />
          </div>

          <div className="border border-gray-100 rounded-sm overflow-x-auto min-h-[140px]">
            <table className="w-full text-left text-[12px]">
              <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                <tr>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">ANC No <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">Surname <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">Other Names <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">Start Date <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">EDD <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                  <th className="px-4 py-2 font-bold text-[#333]">Status <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500 font-medium italic">No data available in table</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-[12px] text-gray-500 font-medium">Showing 0 to 0 of 0 entries</div>

          {/* Table Footer Filters */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <div className="bg-[#fcfcfc] border border-gray-200 rounded p-4 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-bold text-gray-700">View</span>
                <select className="border border-gray-300 rounded px-2 py-1 text-[13px] bg-white outline-none w-[160px] text-green-700 font-bold">
                  <option>Current Visits</option>
                  <option>Previous Visits</option>
                  <option>All</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-bold text-gray-700">From</span>
                <div className="relative">
                  <input type="text" defaultValue="01/02/2026" className="border border-gray-300 rounded px-2 py-1 text-[13px] outline-none w-[110px] text-green-700 font-bold" />
                  <i className="fa-solid fa-calendar absolute right-2 top-2 text-gray-400 text-[10px]"></i>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-bold text-gray-700">To</span>
                <div className="relative">
                  <input type="text" defaultValue="01/02/2026" className="border border-gray-300 rounded px-2 py-1 text-[13px] outline-none w-[110px] text-green-700 font-bold" />
                  <i className="fa-solid fa-calendar absolute right-2 top-2 text-gray-400 text-[10px]"></i>
                </div>
              </div>
              <button className="bg-[#5bc0de] text-white px-6 py-1.5 rounded-sm text-[12px] font-bold hover:bg-[#31b0d5] transition-colors">
                View
              </button>
            </div>
            
            <div className="flex gap-4 ml-auto">
               <div className="flex items-center gap-2">
                 <div className="w-4 h-4 bg-blue-700"></div>
                 <span className="text-[12px] font-medium text-gray-600">Pending</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-4 h-4 bg-green-700"></div>
                 <span className="text-[12px] font-medium text-gray-600">Done</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataLine: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col gap-0.5 border-b border-gray-50 pb-1">
    <span className="font-bold text-gray-600 text-[11px] uppercase tracking-tight">{label}</span>
    <span className="font-semibold text-gray-800 text-[12px] min-h-[1.2rem]">{value || ''}</span>
  </div>
);
