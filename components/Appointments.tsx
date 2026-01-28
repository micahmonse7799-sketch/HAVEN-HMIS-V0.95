
import React, { useState } from 'react';

interface AppointmentsProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const Appointments: React.FC<AppointmentsProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-10">
      {/* Top Header Bar */}
      <div className="bg-white rounded-sm h-10 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <i onClick={onBack} className="fa-solid fa-times text-gray-400 cursor-pointer hover:text-gray-600 text-xs"></i>
          <h1 className="text-gray-700 font-semibold text-[14px]">Haven Hospital</h1>
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
          <span className="text-gray-400 font-medium">Appointments</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Main Appointment Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2 border-b flex items-center justify-between bg-[#f8f9fa]">
          <h2 className="text-[15px] font-medium text-gray-600">Appointment</h2>
          <button className="bg-[#17a2b8] text-white px-3 py-1 rounded-sm text-[11px] flex items-center gap-2">
            Actions <i className="fa-solid fa-chevron-down text-[9px]"></i>
          </button>
        </div>

        <div className="p-4 flex flex-col lg:flex-row gap-6">
          {/* Left: Patient and Appointment Details */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Patient Details Sub-box */}
            <div className="border border-gray-200 rounded-sm p-4 pt-6 relative">
              <span className="absolute -top-3 left-4 bg-white px-2 text-[12px] font-semibold text-gray-500">Patient Details</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2 gap-x-8 text-[13px]">
                <DataLine label="Appointment No:" value="" />
                <DataLine label="Outpatient No:" value="" />
                <DataLine label="Telephone:" value="" />
                <DataLine label="Surname:" value="" />
                <DataLine label="Other Names:" value="" />
                <DataLine label="Email:" value="" />
              </div>
            </div>

            {/* Appointment Detail Grid */}
            <div className="border border-gray-200 rounded-sm p-4 pt-6 relative grid grid-cols-1 md:grid-cols-2 gap-10">
              <span className="absolute -top-3 left-4 bg-white px-2 text-[12px] font-semibold text-gray-500">Appointment Detail</span>
              
              {/* Appointment Schedule */}
              <div className="flex flex-col gap-4">
                <h4 className="text-[14px] font-bold text-gray-700 underline decoration-gray-400 text-center">Appointment Schedule</h4>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-semibold text-gray-600">Date Time</label>
                    <input type="text" placeholder="mm/dd/yyyy --:--:-- --" className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-[13px] outline-none" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-semibold text-gray-600">Doctor</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-[13px] outline-none" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-semibold text-gray-600">Purpose</label>
                    <textarea className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-[13px] outline-none h-20 resize-none"></textarea>
                  </div>
                </div>
              </div>

              {/* Appointment Status */}
              <div className="flex flex-col gap-4">
                <h4 className="text-[14px] font-bold text-gray-700 underline decoration-gray-400 text-center">Appointment Status</h4>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-semibold text-gray-600">Seen By</label>
                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-semibold text-gray-600">Comment</label>
                    <textarea className="w-full border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none h-16 resize-none"></textarea>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <input type="checkbox" id="seen" className="w-4 h-4" />
                    <label htmlFor="seen" className="text-[13px] text-gray-600">Has Been Seen</label>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button className="bg-[#17a2b8] text-white px-6 py-2 rounded text-[13px] font-medium hover:bg-[#138496] transition-colors">Update</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Calendar View */}
          <div className="w-full lg:w-[320px] shrink-0">
            <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-2 bg-white border-b">
                <button className="bg-[#17a2b8] text-white w-7 h-7 flex items-center justify-center rounded-sm">
                  <i className="fa-solid fa-chevron-left text-[10px]"></i>
                </button>
                <span className="text-[16px] text-gray-600 font-medium">2025 December</span>
                <button className="bg-[#17a2b8] text-white w-7 h-7 flex items-center justify-center rounded-sm">
                  <i className="fa-solid fa-chevron-right text-[10px]"></i>
                </button>
              </div>
              <div className="p-2">
                <div className="grid grid-cols-7 text-center text-[12px] font-medium text-gray-500 mb-2">
                  <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
                </div>
                <div className="grid grid-cols-7 text-center text-[13px] gap-y-3">
                  <span className="py-1">1</span><span className="py-1">2</span><span className="py-1">3</span><span className="py-1">4</span><span className="py-1">5</span><span className="py-1">6</span><span className="py-1">7</span>
                  <span className="py-1">8</span><span className="py-1">9</span><span className="py-1">10</span>
                  <div className="relative flex items-center justify-center bg-[#17a2b8]/10 py-1">
                    <span className="font-bold text-[#17a2b8]">11</span>
                    <span className="absolute -top-1 -right-0.5 bg-gray-500 text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full border border-white">1</span>
                  </div>
                  <span className="py-1">12</span><span className="py-1">13</span><span className="py-1">14</span>
                  <span className="py-1">15</span><span className="py-1">16</span><span className="py-1">17</span>
                  <div className="relative flex items-center justify-center bg-[#17a2b8] py-1">
                    <span className="font-bold text-white underline">18</span>
                    <span className="absolute -top-1 -right-0.5 bg-[#8b4513] text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full border border-white">2</span>
                  </div>
                  <span className="py-1">19</span><span className="py-1">20</span><span className="py-1">21</span>
                  <span className="py-1">22</span><span className="py-1">23</span><span className="py-1">24</span><span className="py-1 font-bold text-gray-800">25</span><span className="py-1">26</span><span className="py-1">27</span><span className="py-1 text-red-500">28</span>
                  <span className="py-1">29</span><span className="py-1">30</span><span className="py-1">31</span>
                  <span className="py-1 text-gray-200">1</span><span className="py-1 text-gray-200">2</span><span className="py-1 text-gray-200">3</span><span className="py-1 text-gray-200">4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment List Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2 border-b bg-[#f8f9fa]">
          <h2 className="text-[15px] font-medium text-gray-600">View: Appointments</h2>
        </div>
        <div className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
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

          <div className="border border-gray-100 rounded-sm overflow-x-auto">
            <table className="w-full text-left text-[12px]">
              <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                <tr>
                  <th className="px-4 py-2 font-medium">Appointment No <i className="fa-solid fa-arrows-up-down text-[9px] ml-1 opacity-40"></i></th>
                  <th className="px-4 py-2 font-medium">Outpatient No <i className="fa-solid fa-arrows-up-down text-[9px] ml-1 opacity-40"></i></th>
                  <th className="px-4 py-2 font-medium">Surname <i className="fa-solid fa-arrows-up-down text-[9px] ml-1 opacity-40"></i></th>
                  <th className="px-4 py-2 font-medium">Other Names <i className="fa-solid fa-arrows-up-down text-[9px] ml-1 opacity-40"></i></th>
                  <th className="px-4 py-2 font-medium">Doctor <i className="fa-solid fa-arrows-up-down text-[9px] ml-1 opacity-40"></i></th>
                  <th className="px-4 py-2 font-medium">Date Time <i className="fa-solid fa-arrows-up-down text-[9px] ml-1 opacity-40"></i></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td colSpan={6} className="text-center py-6 text-gray-400 italic">No data available in table</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataLine: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-baseline gap-2">
    <span className="font-bold text-gray-700 whitespace-nowrap">{label}</span>
    <span className="font-medium text-gray-800">{value || '-'}</span>
  </div>
);
