
import React, { useState } from 'react';

interface PatientChartProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const PatientChart: React.FC<PatientChartProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [activeTab, setActiveTab] = useState('Vitals');

  const tabs = [
    { name: 'Vitals', icon: 'fa-thermometer-half' },
    { name: 'Encounter', icon: 'fa-history' },
    { name: 'Notes', icon: 'fa-clipboard' },
    { name: 'Clinics', icon: 'fa-hospital' },
    { name: 'Requests', icon: 'fa-vial' },
    { name: 'Prescription', icon: 'fa-prescription' },
    { name: 'Appointments', icon: 'fa-calendar-alt' },
    { name: 'Insurance', icon: 'fa-shield-halved' },
    { name: 'Reports', icon: 'fa-file-medical' },
    { name: 'More', icon: 'fa-ellipsis-h' },
  ];

  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-10">
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
          <span className="text-blue-500 cursor-pointer hover:underline">Clinical</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Patient Chart</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Search Bar Area */}
      <div className="flex justify-center my-1">
        <div className="relative w-full max-w-2xl flex shadow-sm">
          <input 
            type="text" 
            placeholder="Search for patient by (Name, ID, OP/NO, P/NO)"
            className="flex-1 bg-white border border-gray-300 rounded px-4 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#43939e]"
          />
        </div>
      </div>

      {/* Patient Info Panel */}
      <div className="bg-[#f8f9fa] border border-gray-200 rounded-sm p-4 relative shadow-sm">
        <div className="absolute -top-3 left-4 bg-[#f8f9fa] px-2 text-[13px] font-semibold text-[#43939e] border-l-2 border-[#43939e]">Patient Info</div>
        
        <div className="flex justify-between items-start">
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-8 text-[13px] text-gray-700">
            <InfoLine label="Surname" value="" />
            <InfoLine label="Gender" value="" />
            <InfoLine label="OPD No" value="" />
            <InfoLine label="Telephone" value="" />
            <InfoLine label="Other Names" value="" />
            <InfoLine label="Age" value="" />
            <InfoLine label="Occupation" value="" />
            <InfoLine label="Residence" value="" />
          </div>
          
          <div className="flex gap-1">
            <button className="bg-[#5cb85c] text-white px-3 py-1 text-[11px] rounded flex items-center gap-1.5 hover:bg-[#4cae4c]">
              <i className="fa-solid fa-edit"></i> Edit Patient
            </button>
            <button className="bg-[#5bc0de] text-white px-3 py-1 text-[11px] rounded flex items-center gap-1.5 hover:bg-[#31b0d5]">
              <i className="fa-solid fa-plus"></i> New Patient
            </button>
            <button className="bg-[#17a2b8] text-white px-3 py-1 text-[11px] rounded flex items-center gap-1.5 hover:bg-[#138496]">
               My Queue
            </button>
          </div>
        </div>
      </div>

      {/* Visits & Tabs Section */}
      <div className="flex flex-col gap-0">
        <div className="flex items-center justify-between mb-2">
            <h2 className="text-[14px] font-bold text-gray-600">Visits</h2>
            <button className="bg-[#5bc0de] text-white px-3 py-1 rounded text-[11px] font-bold flex items-center gap-1.5">
              <i className="fa-solid fa-plus"></i> New Visit
            </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center bg-[#eef5f6] border border-gray-200 rounded-t-sm p-0.5 overflow-x-auto no-scrollbar relative">
          {/* Arrow buttons for scroll - visual only for now */}
          <div className="absolute left-0 h-full w-8 bg-gradient-to-r from-[#eef5f6] to-transparent flex items-center justify-center z-10 pointer-events-none opacity-0">
            <i className="fa-solid fa-chevron-left text-[10px] text-gray-400"></i>
          </div>
          <div className="absolute right-0 h-full w-8 bg-gradient-to-l from-[#eef5f6] to-transparent flex items-center justify-center z-10 pointer-events-none opacity-0">
            <i className="fa-solid fa-chevron-right text-[10px] text-gray-400"></i>
          </div>

          <div className="flex flex-nowrap gap-0.5 min-w-max px-4">
            {tabs.map(tab => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-2 px-4 py-1.5 text-[12px] font-medium transition-all rounded-sm border border-transparent ${activeTab === tab.name ? 'bg-white text-[#43939e] shadow-sm border-gray-100' : 'text-gray-500 hover:bg-white/50'}`}
              >
                <i className={`fa-solid ${tab.icon} text-[11px]`}></i>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Panels Grid */}
        <div className="bg-[#f0f4f5] border border-t-0 border-gray-200 p-4 rounded-b-sm shadow-inner min-h-[400px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ChartWidget title="Vital Signs" icon="plus" />
            <ChartWidget title="Body Systems" icon="plus" />
            <ChartWidget title="Procedures" icon="plus" emptyMessage="No Procedure Available" />
            <ChartWidget title="Nursing Notes" icon="edit" emptyMessage="No Notes Available" />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoLine: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col gap-0.5">
    <span className="font-bold text-gray-700 text-[11px]">{label}</span>
    <span className="font-medium text-gray-500 text-[13px] border-b border-gray-100 min-h-[1.2rem]">{value}</span>
  </div>
);

const ChartWidget: React.FC<{ title: string; icon: string; emptyMessage?: string }> = ({ title, icon, emptyMessage }) => (
  <div className="bg-white rounded-sm border border-gray-200 shadow-sm flex flex-col overflow-hidden">
    <div className="bg-[#337ab7] px-3 py-1.5 flex items-center justify-between">
      <h3 className="text-white text-[13px] font-semibold">{title}</h3>
      <button className="w-5 h-5 bg-white/20 hover:bg-white/30 rounded flex items-center justify-center text-white">
        <i className={`fa-solid fa-${icon} text-[10px]`}></i>
      </button>
    </div>
    <div className="p-4 flex flex-col items-center justify-center min-h-[80px]">
      {emptyMessage ? (
        <span className="text-[12px] text-gray-400 italic font-medium">{emptyMessage}</span>
      ) : (
        <div className="w-full h-2 rounded bg-gray-50"></div>
      )}
    </div>
  </div>
);
