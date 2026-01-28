import React, { useState } from 'react';

interface DialysisChecklistsProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const DialysisChecklists: React.FC<DialysisChecklistsProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [activeStage, setActiveStage] = useState<'pre' | 'intra' | 'post'>('pre');

  const checklists = {
    pre: [
      "Patient Identity Verified",
      "Consent Form Signed",
      "Machine Cleanliness Checked",
      "Prime Procedure Completed",
      "Water Quality Verified (LAL/Endotoxin)",
      "Dialyzer Integrity Checked",
      "Pre-Dialysis Vitals Recorded",
      "Pre-Weight Measured",
      "Heparin Pump Calibrated"
    ],
    intra: [
      "Blood Flow Rate Monitoring",
      "Venous Pressure Monitoring",
      "Arterial Pressure Monitoring",
      "Air Detector On",
      "Patient Comfort Verified",
      "Machine Alarm Checks",
      "Fluid Removal Tracking"
    ],
    post: [
      "Post-Dialysis Vitals Recorded",
      "Post-Weight Measured",
      "Blood Access Site Integrity",
      "Patient Stability Verified",
      "Treatment Log Signed",
      "Machine Disinfection Started",
      "Bicarbonate Container Removed"
    ]
  };

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
          <span className="text-blue-500 cursor-pointer hover:underline">Dialysis</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Checklists</span>
        </div>
      </div>

      {/* Stage Selection Tabs */}
      <div className="flex gap-1">
        <TabButton active={activeStage === 'pre'} onClick={() => setActiveStage('pre')} label="Pre-Dialysis" icon="fa-hourglass-start" />
        <TabButton active={activeStage === 'intra'} onClick={() => setActiveStage('intra')} label="Intra-Dialysis" icon="fa-spinner" />
        <TabButton active={activeStage === 'post'} onClick={() => setActiveStage('post')} label="Post-Dialysis" icon="fa-hourglass-end" />
      </div>

      {/* Checklist Card */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-3 border-b flex items-center justify-between bg-[#f8f9fa]">
          <h2 className="text-[16px] font-bold text-gray-700 flex items-center gap-2">
             <i className={`fa-solid ${activeStage === 'pre' ? 'fa-hourglass-start' : activeStage === 'intra' ? 'fa-spinner' : 'fa-hourglass-end'} text-cyan-600`}></i>
             {activeStage === 'pre' ? 'Pre-Dialysis Safety Checks' : activeStage === 'intra' ? 'Treatment Monitoring' : 'Post-Dialysis Verification'}
          </h2>
          <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Procedural Quality Control</span>
        </div>

        <div className="p-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {checklists[activeStage].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 border border-gray-50 rounded-lg hover:bg-gray-50 transition-colors group">
                   <div className="relative flex items-center justify-center">
                      <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer" />
                   </div>
                   <span className="text-[13px] text-gray-700 font-medium group-hover:text-gray-900 transition-colors">{item}</span>
                </div>
              ))}
           </div>

           <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-4">
              <label className="text-[13px] font-bold text-gray-600">Nursing Observations / Notes</label>
              <textarea className="w-full h-24 border border-gray-300 rounded p-3 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 resize-none shadow-inner bg-gray-50/50" placeholder="Record any deviations or observations during this stage..."></textarea>
           </div>

           <div className="mt-6 flex justify-end">
              <button className="bg-[#17a2b8] text-white px-10 py-2.5 rounded font-bold text-[14px] hover:bg-[#138496] transition-all shadow-md active:scale-95">
                Complete Stage Verification
              </button>
           </div>
        </div>
      </div>

      {/* History Log */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2 border-b bg-[#f8f9fa]">
          <h2 className="text-[15px] font-medium text-gray-600">Verification History</h2>
        </div>
        <div className="p-4 text-center text-gray-400 italic text-[13px] py-10">
           No checklists have been finalized for the current session.
        </div>
      </div>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; label: string; icon: string }> = ({ active, onClick, label, icon }) => (
  <button 
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-t-lg font-bold text-[13px] transition-all ${
      active 
        ? 'bg-white text-cyan-800 border-t-2 border-x-2 border-gray-200' 
        : 'bg-gray-100/50 text-gray-500 border-t-2 border-transparent hover:bg-gray-200'
    }`}
  >
    <i className={`fa-solid ${icon}`}></i>
    {label}
  </button>
);
