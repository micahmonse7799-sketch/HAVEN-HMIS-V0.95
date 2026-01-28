import React, { useState } from 'react';

interface ReferralsProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const Referrals: React.FC<ReferralsProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [isPatientDetailsVisible, setIsPatientDetailsVisible] = useState(true);

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
          <span className="text-blue-500 cursor-pointer hover:underline">Clinical</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Referrals</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Patients Details Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2 border-b flex items-center justify-between bg-[#f8f9fa]">
          <h2 className="text-[15px] font-medium text-gray-600">
            Patients Details <span onClick={() => setIsPatientDetailsVisible(!isPatientDetailsVisible)} className="text-[12px] font-normal text-gray-400 cursor-pointer lowercase">(click here to {isPatientDetailsVisible ? 'hide' : 'show'})</span>
          </h2>
        </div>
        
        {isPatientDetailsVisible && (
          <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1.5 text-[13px] text-gray-700">
              <DataLine label="O.P NO.:" value="" />
              <div className="flex items-baseline justify-between border-b border-gray-50 pb-0.5">
                <span className="font-bold text-gray-700 whitespace-nowrap mr-4">Age:</span>
                <span className="font-medium text-[#43939e] italic">(yrs) (mths) (wks) (days)</span>
              </div>
              <DataLine label="Surname:" value="" />
              <DataLine label="Other Names:" value="" />
              <DataLine label="Occupation:" value="" />
              <DataLine label="Sex:" value="" />
            </div>

            {/* Right: Queue Table Area */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between mb-1">
                <button className="bg-white border border-gray-300 text-gray-600 px-3 py-1 text-[11px] rounded shadow-sm hover:bg-gray-50 transition-colors">
                  View Referral Report
                </button>
                <div className="flex justify-end gap-2 items-center">
                  <span className="text-[12px] text-gray-500">Search:</span>
                  <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[180px]" />
                </div>
              </div>
              <div className="border border-gray-100 rounded-sm overflow-hidden">
                <table className="w-full text-left text-[12px]">
                  <thead className="bg-[#eef5f6] text-gray-600 border-b">
                    <tr>
                      <th className="px-3 py-1.5 font-bold">Q. No</th>
                      <th className="px-3 py-1.5 font-bold">OPD No</th>
                      <th className="px-3 py-1.5 font-bold">Name</th>
                      <th className="px-3 py-1.5 font-bold">From</th>
                      <th className="px-3 py-1.5 font-bold">Mins</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-gray-500 font-medium">No data available in table</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Referral Details Form Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2 border-b flex items-center justify-between bg-[#f8f9fa]">
          <h2 className="text-[15px] font-medium text-gray-600">Referral Details</h2>
          <button className="bg-[#5bc0de] text-white px-3 py-1 rounded-sm text-[11px] flex items-center gap-2 hover:bg-[#31b0d5]">
            Actions <i className="fa-solid fa-caret-down text-[9px]"></i>
          </button>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Column 1: Sources */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-600">Referral Type</label>
              <select className="w-full border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 text-green-700 font-medium">
                <option></option>
                <option>Outbound</option>
                <option>Inbound</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-600">Referred From</label>
              <select className="w-full border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500">
                <option></option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-600">Referred To</label>
              <select className="w-full border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500">
                <option></option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-600">Referring Doctor</label>
              <input type="text" className="w-full border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500" />
            </div>
          </div>

          {/* Column 2: Reasoning & Timing */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-600">Reason For Referral</label>
              <textarea className="w-full h-16 border border-gray-300 rounded p-2 text-[12px] outline-none focus:ring-1 focus:ring-cyan-500 resize-none"></textarea>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-600">Date Time Referred</label>
              <div className="relative">
                <input type="text" defaultValue="01/02/2026 12:38:00 AM" className="w-full border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none text-green-700 font-medium" />
                <i className="fa-solid fa-calendar absolute right-3 top-2.5 text-gray-400 text-[10px]"></i>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-600">Date Time Received</label>
              <div className="relative">
                <input type="text" defaultValue="01/02/2026 12:38:00 AM" className="w-full border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none text-green-700 font-medium" />
                <i className="fa-solid fa-calendar absolute right-3 top-2.5 text-gray-400 text-[10px]"></i>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-600">Received By</label>
              <input type="text" className="w-full border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500" />
            </div>
          </div>

          {/* Column 3: Examinations 1 */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-600">Complaints</label>
              <textarea className="w-full h-14 border border-gray-300 rounded p-2 text-[12px] outline-none focus:ring-1 focus:ring-cyan-500 resize-none"></textarea>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-600">General Examinations</label>
              <textarea className="w-full h-14 border border-gray-300 rounded p-2 text-[12px] outline-none focus:ring-1 focus:ring-cyan-500 resize-none"></textarea>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-600">System Examinations</label>
              <textarea className="w-full h-14 border border-gray-300 rounded p-2 text-[12px] outline-none focus:ring-1 focus:ring-cyan-500 resize-none"></textarea>
            </div>
          </div>

          {/* Column 4: Examinations 2 */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-600">Investigations</label>
              <textarea className="w-full h-14 border border-gray-300 rounded p-2 text-[12px] outline-none focus:ring-1 focus:ring-cyan-500 resize-none"></textarea>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-600">Other Examinations</label>
              <textarea className="w-full h-14 border border-gray-300 rounded p-2 text-[12px] outline-none focus:ring-1 focus:ring-cyan-500 resize-none"></textarea>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-600">Prescription</label>
              <textarea className="w-full h-14 border border-gray-300 rounded p-2 text-[12px] outline-none focus:ring-1 focus:ring-cyan-500 resize-none"></textarea>
            </div>
            <div className="flex justify-end mt-2">
              <button className="bg-[#17a2b8] text-white px-8 py-2 rounded text-[13px] font-bold hover:bg-[#138496] transition-colors shadow-sm uppercase tracking-wide">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Referrals View Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2 border-b bg-[#f8f9fa]">
          <h2 className="text-[15px] font-medium text-gray-600">Referrals View</h2>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-1">
              <button className="border border-gray-300 px-3 py-1 text-[11px] hover:bg-gray-50">Excel</button>
              <button className="border border-gray-300 px-3 py-1 text-[11px] hover:bg-gray-50">CSV</button>
              <button className="border border-gray-300 px-3 py-1 text-[11px] hover:bg-gray-50">Print</button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-gray-500">Search:</span>
              <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[200px]" />
            </div>
          </div>

          <div className="border border-gray-100 rounded-sm overflow-x-auto min-h-[140px]">
            <table className="w-full text-left text-[12px]">
              <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                <tr>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">No</th>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">Referred From</th>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">Referred To</th>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">Referring Doctor</th>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">DateTime Referred</th>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">DateTime Received</th>
                  <th className="px-4 py-2 font-bold text-[#333]">Reason</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500 font-medium italic">No data available in table</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table Footer Filters */}
          <div className="flex items-center justify-between flex-wrap gap-4 mt-2">
            <div className="bg-[#fcfcfc] border border-gray-200 rounded p-4 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-bold text-gray-700">View</span>
                <select className="border border-gray-300 rounded px-2 py-1 text-[13px] bg-white outline-none w-[120px] text-green-700 font-bold">
                  <option>Outbound</option>
                  <option>Inbound</option>
                  <option>All</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-bold text-gray-700">Between</span>
                <div className="relative">
                  <input type="text" defaultValue="01/02/2026" className="border border-gray-300 rounded px-2 py-1 text-[13px] outline-none w-[110px] text-green-700 font-bold" />
                  <i className="fa-solid fa-calendar absolute right-2 top-2 text-gray-400 text-[10px]"></i>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-bold text-gray-700">And</span>
                <div className="relative">
                  <input type="text" defaultValue="01/02/2026" className="border border-gray-300 rounded px-2 py-1 text-[13px] outline-none w-[110px] text-green-700 font-bold" />
                  <i className="fa-solid fa-calendar absolute right-2 top-2 text-gray-400 text-[10px]"></i>
                </div>
              </div>
              <button className="bg-[#5bc0de] text-white px-6 py-1.5 rounded-sm text-[12px] font-bold hover:bg-[#31b0d5] transition-colors">
                View
              </button>
            </div>

            <button className="bg-[#17a2b8] text-white px-8 py-2 rounded text-[13px] font-bold hover:bg-[#138496] transition-colors shadow-sm">
              Facilities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataLine: React.FC<{ label: string; value: string; color?: string }> = ({ label, value, color = "text-gray-800" }) => (
  <div className="flex items-baseline justify-between border-b border-gray-50 pb-0.5">
    <span className="font-bold text-gray-700 whitespace-nowrap mr-4">{label}</span>
    <span className={`font-semibold ${color} truncate`}>{value || ''}</span>
  </div>
);