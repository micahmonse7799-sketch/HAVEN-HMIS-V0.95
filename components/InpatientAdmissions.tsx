
import React, { useState, useRef, useEffect } from 'react';

interface InpatientAdmissionsProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const InpatientAdmissions: React.FC<InpatientAdmissionsProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isAdmitModalOpen, setIsAdmitModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsActionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Top Header Bar */}
      <div className="bg-white rounded-sm h-10 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <i onClick={onBack} className="fa-solid fa-times text-gray-400 cursor-pointer hover:text-gray-600 text-xs"></i>
          <h1 className="text-gray-700 font-semibold text-[14px]">Haven Hospital</h1>
        </div>
        <div className="flex items-center gap-8 text-[13px] text-gray-500">
          <div>Branch: <span className="text-[#43939e] cursor-pointer hover:underline">Main branch</span></div>
          <div>Room: <span onClick={onOpenRoomModal} className="text-[#43939e] cursor-pointer hover:underline">{currentRoom}</span></div>
          <button className="bg-[#17a2b8] text-white px-4 py-1 rounded-sm text-[11px]">Queue</button>
        </div>
      </div>

      {/* Breadcrumbs Area */}
      <div className="bg-[#f8f9fa] border border-gray-200 rounded-sm px-4 py-1.5 flex items-center justify-between text-[12px]">
        <div className="flex items-center gap-2 text-gray-500">
          <i className="fa-solid fa-home text-blue-500"></i>
          <span className="opacity-50">/</span>
          <span className="text-blue-500 cursor-pointer hover:underline">InpatientCare</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Admissions</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Main Admissions Section */}
      <div className="bg-white rounded-sm border border-gray-200 p-4 shadow-sm relative">
        <div className="flex items-center justify-between mb-4 border-b pb-2">
          <h2 className="text-[16px] text-gray-600 font-medium">Admission Details</h2>
          
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsActionsOpen(!isActionsOpen)}
              className="bg-[#17a2b8] text-white px-3 py-1 rounded-sm text-[12px] flex items-center gap-2"
            >
              Actions <i className={`fa-solid fa-chevron-down text-[10px] transition-transform ${isActionsOpen ? 'rotate-180' : ''}`}></i>
            </button>
            {isActionsOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 shadow-xl z-[100] rounded-sm py-1">
                <div className="px-4 py-2 text-[13px] hover:bg-gray-100 cursor-pointer">Admit Patient</div>
                <div className="px-4 py-2 text-[13px] hover:bg-gray-100 cursor-pointer">Transfer Ward</div>
                <div className="px-4 py-2 text-[13px] hover:bg-gray-100 cursor-pointer border-t">Update Billing</div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Patient Admission Details Box */}
          <div className="border border-gray-200 rounded-sm p-4 pt-6 relative">
            <span className="absolute -top-3 left-4 bg-white px-2 text-[12px] font-semibold text-gray-500">Patient Admission</span>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-[13px]">
              <DataLabel label="Adm ID:" value="" />
              <DataLabel label="Visit ID:" value="" />
              <DataLabel label="Othernames:" value="" />
              <DataLabel label="Surname:" value="" />
              <DataLabel label="OP NO:" value="" />
              <DataLabel label="I.P NO:" value="" />
              <DataLabel label="Ward:" value="" />
              <DataLabel label="Ref No:" value="" />
              <div className="flex justify-between items-center col-span-1">
                <span className="text-gray-500 font-medium">Rate:</span>
                <span className="text-gray-400">Per Day</span>
              </div>
              <DataLabel label="Bed No:" value="" />
              <DataLabel label="Admitted By:" value="" />
              <DataLabel label="Bed Status:" value="" />
              <DataLabel label="Adm DateTime:" value="" />
              <DataLabel label="Doctor:" value="" />
              <DataLabel label="Discharged By:" value="" />
              <DataLabel label="Duration:" value="" />
            </div>

            <div className="flex justify-end mt-4">
              <button 
                onClick={() => setIsAdmitModalOpen(true)}
                className="bg-[#17a2b8] text-white px-4 py-1.5 rounded-sm text-[12px] font-medium hover:bg-[#138496]"
              >
                Admit From Queue
              </button>
            </div>
          </div>

          {/* Right Column: Discharge & Gate Pass */}
          <div className="flex flex-col gap-4">
            {/* Discharge Patient Box */}
            <div className="border border-gray-200 rounded-sm p-4 pt-6 relative">
              <span className="absolute -top-3 left-4 bg-white px-2 text-[12px] font-semibold text-gray-500">Discharge Patient</span>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="discharged" className="w-4 h-4" />
                    <label htmlFor="discharged" className="text-[13px] text-gray-600">Discharged</label>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-semibold text-gray-600">Discharge Status</label>
                    <select className="border border-gray-300 rounded-sm px-2 py-1.5 text-[13px] bg-white outline-none">
                      <option></option>
                      <option>Recovered</option>
                      <option>Transferred</option>
                      <option>Deceased</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="backdate" className="w-4 h-4" />
                    <label htmlFor="backdate" className="text-[12px] text-gray-600">Backdate Discharge Date</label>
                  </div>

                  <div className="bg-[#fcf8e3] border border-[#faebcc] text-[#8a6d3b] px-3 py-1.5 rounded-sm text-[13px] font-medium text-center">
                    12/31/2025 04:14:00 AM
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                   <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-semibold text-gray-600">Discharging Doctor</label>
                    <select className="border border-gray-300 rounded-sm px-2 py-1.5 text-[13px] bg-white outline-none">
                      <option></option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <input type="checkbox" id="discharge-in" className="w-4 h-4" />
                    <label htmlFor="discharge-in" className="text-[13px] text-gray-600">Discharge In</label>
                  </div>
                </div>
              </div>
            </div>

            {/* Gate Pass Box */}
            <div className="border border-gray-200 rounded-sm p-3 pt-6 relative">
              <span className="absolute -top-3 left-4 bg-white px-2 text-[12px] font-semibold text-gray-500">Gate Pass</span>
              <div className="flex gap-4">
                <button className="bg-[#5bc0de] hover:bg-[#31b0d5] text-white px-4 py-1.5 rounded-sm text-[12px] font-medium">
                  Generate Gatepass
                </button>
                <button className="bg-[#5bc0de] hover:bg-[#31b0d5] text-white px-4 py-1.5 rounded-sm text-[12px] font-medium">
                  View Gatepass
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden mt-2">
        <div className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex gap-1">
              <button className="border border-gray-300 px-3 py-1 text-[12px] hover:bg-gray-50">Excel</button>
              <button className="border border-gray-300 px-3 py-1 text-[12px] hover:bg-gray-50">CSV</button>
              <button className="border border-gray-300 px-3 py-1 text-[12px] hover:bg-gray-50">Print</button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-gray-600">Search:</span>
              <input type="text" className="border border-gray-300 rounded-sm px-2 py-1 text-[13px] focus:outline-none w-[200px]" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                <tr>
                  <th className="px-4 py-2 font-medium">IPD No <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-40"></i></th>
                  <th className="px-4 py-2 font-medium">OPD No <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-40"></i></th>
                  <th className="px-4 py-2 font-medium">Patient <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-40"></i></th>
                  <th className="px-4 py-2 font-medium">Admitted On <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-40"></i></th>
                  <th className="px-4 py-2 font-medium">Duration <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-40"></i></th>
                  <th className="px-4 py-2 font-medium">Ward <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-40"></i></th>
                  <th className="px-4 py-2 font-medium">Bed <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-40"></i></th>
                  <th className="px-4 py-2 font-medium">Scheme <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-40"></i></th>
                  <th className="px-4 py-2 font-medium">Bill <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-40"></i></th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b bg-gray-50/30 hover:bg-gray-100 transition-colors">
                  <td className="px-4 py-2">10114</td>
                  <td className="px-4 py-2">10114</td>
                  <td className="px-4 py-2 font-medium">Millicent Maua Mafura</td>
                  <td className="px-4 py-2">Dec 25, 2025 10:43 am</td>
                  <td className="px-4 py-2">5 Day(s)</td>
                  <td className="px-4 py-2">private ward 10</td>
                  <td className="px-4 py-2">5</td>
                  <td className="px-4 py-2">SHA OUTPATIENT</td>
                  <td className="px-4 py-2 text-blue-500 cursor-pointer hover:underline font-medium">122,957.35</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Admit Patient From Queue Modal */}
      {isAdmitModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[700px] rounded shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            {/* Modal Header */}
            <div className="bg-[#e9eaf2] px-4 py-3 flex items-center justify-between border-b">
              <h3 className="text-[18px] text-[#4a4a7d] font-normal">Admit Patient From Queue</h3>
              <button 
                onClick={() => setIsAdmitModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fa-solid fa-times text-[18px]"></i>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 pt-4 flex flex-col gap-5">
              {/* Radio Group */}
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="roomScope" defaultChecked className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                  <span className="text-[15px] text-gray-700">My Room</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="roomScope" className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                  <span className="text-[15px] text-gray-700">All</span>
                </label>
              </div>

              {/* Patient Selection */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-gray-700">Select Patient From Queue</label>
                <div className="relative">
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] appearance-none bg-white outline-none focus:ring-1 focus:ring-blue-400">
                    <option></option>
                  </select>
                  <i className="fa-solid fa-caret-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                {/* Ward */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[14px] font-bold text-gray-700">Ward</label>
                  <div className="relative">
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] appearance-none bg-white outline-none focus:ring-1 focus:ring-blue-400 text-gray-400 italic">
                      <option>Select Ward</option>
                    </select>
                    <i className="fa-solid fa-caret-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                  </div>
                </div>

                {/* Admission Date Time */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[14px] font-bold text-gray-700">Admission Date Time</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      defaultValue="12/31/2025 04:24:00 AM"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] text-green-700 font-medium bg-white outline-none focus:ring-1 focus:ring-blue-400"
                    />
                    <i className="fa-solid fa-calendar absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"></i>
                  </div>
                </div>

                {/* Bed No */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[14px] font-bold text-gray-700">Bed No</label>
                  <div className="relative">
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] appearance-none bg-white outline-none focus:ring-1 focus:ring-blue-400 text-gray-400 italic">
                      <option>Select Bed</option>
                    </select>
                    <i className="fa-solid fa-caret-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                  </div>
                </div>

                {/* Admitting Doctor */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[14px] font-bold text-gray-700">Admitting Doctor</label>
                  <div className="relative">
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] appearance-none bg-white outline-none focus:ring-1 focus:ring-blue-400">
                      <option></option>
                    </select>
                    <i className="fa-solid fa-caret-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                  </div>
                </div>
              </div>

              {/* Details Summary & Submit */}
              <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                  <h4 className="text-[14px] font-bold text-gray-800 underline">Selected Ward/Bed Details</h4>
                  <div className="text-[13px] text-gray-800 font-medium space-y-1.5">
                    <div>Rate per day:</div>
                    <div>Bed Status:</div>
                    <div>Bed Capacity:</div>
                  </div>
                </div>
                
                <button className="bg-[#17a2b8] hover:bg-[#138496] text-white px-6 py-2 rounded font-bold text-[14px] transition-colors self-end md:mb-2">
                  Admit Patient
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DataLabel: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-gray-50 py-1">
    <span className="text-gray-500 font-medium whitespace-nowrap mr-4">{label}</span>
    <span className="text-gray-800 font-semibold truncate">{value || '-'}</span>
  </div>
);
