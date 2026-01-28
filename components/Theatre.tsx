
import React, { useState } from 'react';

interface TheatreProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const Theatre: React.FC<TheatreProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-blue-500 cursor-pointer hover:underline">Theatre</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Theatre</span>
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
          <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="grid grid-cols-1 gap-y-1.5 text-[13px] text-gray-700">
              <DataLine label="Surname:" value="" />
              <div className="flex items-baseline justify-between border-b border-gray-50 pb-0.5">
                <span className="font-bold text-gray-700 whitespace-nowrap mr-4">Age:</span>
                <span className="font-medium text-[#43939e] italic"> (yrs) (mths) (wks) (days)</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-1.5 text-[13px] text-gray-700">
              <DataLine label="Other Names:" value="" />
              <DataLine label="Sex:" value="" />
            </div>
            <div className="grid grid-cols-1 gap-y-1.5 text-[13px] text-gray-700">
              <DataLine label="Occupation:" value="" />
              <DataLine label="Requested On:" value="" />
            </div>
          </div>
        )}
      </div>

      {/* Theatre Request / Operation Notes Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2 border-b flex items-center justify-between bg-[#f8f9fa]">
          <h2 className="text-[15px] font-medium text-gray-600">Theatre Request / Operation Notes</h2>
          <button className="bg-[#5bc0de] text-white px-3 py-1 rounded-sm text-[11px] flex items-center gap-2 hover:bg-[#31b0d5]">
            Actions <i className="fa-solid fa-caret-down text-[9px]"></i>
          </button>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Column 1 */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Operation <span className="text-red-500">*</span></label>
              <select className="border border-gray-300 rounded px-2 py-1.5 text-[13px] bg-white outline-none focus:ring-1 focus:ring-cyan-500">
                <option></option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Specific Operation</label>
              <input type="text" className="border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Surgeon</label>
              <input type="text" className="border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Assistant (Surgeon)</label>
              <input type="text" className="border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Anaesthetist</label>
              <input type="text" className="border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500" />
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Anaesthesia</label>
              <input type="text" className="border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Scrub Nurse</label>
              <input type="text" className="border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Diagnosis</label>
              <input type="text" className="border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Incision</label>
              <input type="text" className="border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Biopsy Specimens</label>
              <input type="text" className="border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500" />
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Procedure</label>
              <textarea className="w-full h-[66px] border border-gray-300 rounded p-2 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 resize-none"></textarea>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Complications</label>
              <textarea className="w-full h-[66px] border border-gray-300 rounded p-2 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 resize-none"></textarea>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Anaesthetic Notes</label>
              <textarea className="w-full h-[66px] border border-gray-300 rounded p-2 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 resize-none"></textarea>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Estimated Blood Loss (cc)</label>
              <input type="text" className="border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500" />
            </div>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Doctor</label>
              <input type="text" className="border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">DateTime Requested</label>
              <div className="relative">
                <input type="text" defaultValue="01/02/2026 12:29:00 AM" className="w-full border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none text-green-700 font-medium" />
                <i className="fa-solid fa-calendar absolute right-3 top-2.5 text-gray-500 text-[10px]"></i>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Theatre Count</label>
              <select className="border border-gray-300 rounded px-2 py-1.5 text-[13px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 text-green-700 font-medium">
                <option>Correct</option>
                <option>Discrepancy</option>
              </select>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input type="checkbox" id="op_complete" className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
              <label htmlFor="op_complete" className="text-[13px] text-gray-600 font-medium">Operation Completed</label>
            </div>
            <div className="flex justify-end mt-4">
              <button className="bg-[#17a2b8] text-white px-8 py-2 rounded-sm text-[12px] font-bold hover:bg-[#138496] transition-colors shadow-sm">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* View: Theatre Requests Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2 border-b bg-[#f8f9fa]">
          <h2 className="text-[15px] font-medium text-gray-600">View: Theatre Requests</h2>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
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

          <div className="border border-gray-100 rounded-sm overflow-x-auto min-h-[300px]">
            <table className="w-full text-left text-[12px]">
              <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                <tr>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">Request No. <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">Outpatient No. <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">Name <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">DateTime Requested <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">Sex <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                  <th className="px-4 py-2 font-bold text-[#333] text-center" colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <TableRow 
                    id="1034" 
                    outId="Demo52640922" 
                    name="Doe Kennedy Otieno Ageji" 
                    date="Dec 31, 2025 5:32 pm" 
                    sex="Male" 
                />
                <TableRow 
                    id="1033" 
                    outId="Demo52640922" 
                    name="Doe Kennedy Otieno Ageji" 
                    date="Dec 31, 2025 5:28 pm" 
                    sex="Male" 
                />
                <TableRow 
                    id="1032" 
                    outId="Demo52640922" 
                    name="Doe Kennedy Otieno Ageji" 
                    date="Dec 31, 2025 5:27 pm" 
                    sex="Male" 
                />
                <TableRow 
                    id="1031" 
                    outId="Demo52640922" 
                    name="Doe Kennedy Otieno Ageji" 
                    date="Dec 31, 2025 5:22 pm" 
                    sex="Male" 
                />
                <TableRow 
                    id="1030" 
                    outId="20251010114" 
                    name="Millicent Maua Mafura" 
                    date="Dec 31, 2025 4:48 pm" 
                    sex="Female" 
                />
              </tbody>
            </table>
          </div>

          <div className="text-[12px] text-gray-500 font-medium">Showing 1 to 634 of 634 entries</div>

          {/* Table Footer Filters */}
          <div className="bg-[#fcfcfc] border border-gray-200 rounded p-4 flex flex-wrap items-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold text-gray-700">View:</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-[13px] bg-white outline-none w-[140px] text-green-700 font-bold">
                <option>Pending</option>
                <option>Done</option>
                <option>All</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold text-gray-700">From:</span>
              <div className="relative">
                <input type="text" defaultValue="01/02/2026" className="border border-gray-300 rounded px-2 py-1 text-[13px] outline-none w-[110px] text-green-700 font-bold" />
                <i className="fa-solid fa-calendar absolute right-2 top-2 text-gray-400 text-[10px]"></i>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold text-gray-700">To:</span>
              <div className="relative">
                <input type="text" defaultValue="01/02/2026" className="border border-gray-300 rounded px-2 py-1 text-[13px] outline-none w-[110px] text-green-700 font-bold" />
                <i className="fa-solid fa-calendar absolute right-2 top-2 text-gray-400 text-[10px]"></i>
              </div>
            </div>
            <button className="bg-[#5bc0de] text-white px-6 py-1.5 rounded-sm text-[12px] font-bold hover:bg-[#31b0d5] transition-colors">
              View
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

const TableRow: React.FC<{ id: string; outId: string; name: string; date: string; sex: string }> = ({ id, outId, name, date, sex }) => (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="px-4 py-2 border-r">{id}</td>
      <td className="px-4 py-2 border-r">{outId}</td>
      <td className="px-4 py-2 border-r font-medium text-gray-700">{name}</td>
      <td className="px-4 py-2 border-r">{date}</td>
      <td className="px-4 py-2 border-r">{sex}</td>
      <td className="px-4 py-2 border-r text-center w-[40px]">
          {/* Action indicator placeholder */}
      </td>
      <td className="px-4 py-2 text-center w-[40px]">
          <button className="text-red-600 hover:text-red-800 transition-colors">
            <i className="fa-solid fa-times text-xs"></i>
          </button>
      </td>
    </tr>
);
