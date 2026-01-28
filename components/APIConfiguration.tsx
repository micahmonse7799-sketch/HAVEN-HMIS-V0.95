
import React from 'react';

interface APIConfigurationProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const APIConfiguration: React.FC<APIConfigurationProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const configs = [
    'Sms Configuration',
    'Dicom Configuration',
    'IPay Configuration',
    'Mpesa Configuration',
    'Smart Configuration',
    'Mini Apps Configuration',
    'Patient Portal Configuration'
  ];

  return (
    <div className="flex flex-col gap-1 animate-in fade-in duration-300 relative min-h-full">
      {/* Top Header Section */}
      <div className="bg-white px-4 py-2 flex items-center justify-between shadow-sm border-b border-gray-100">
        <h1 className="text-[#333] font-bold text-[18px]">Demo Hospital</h1>
        <div className="flex items-center gap-12 text-[14px] text-gray-700">
          <div>Branch: <span className="text-[#43939e] font-medium">Main branch</span></div>
          <div>Room: <span onClick={onOpenRoomModal} className="text-[#43939e] cursor-pointer hover:underline font-medium">{currentRoom}</span></div>
          <button className="bg-[#17a2b8] text-white px-4 py-1.5 rounded-md text-[13px] font-bold uppercase tracking-tight shadow-md">Queue</button>
        </div>
      </div>

      {/* Breadcrumb Row */}
      <div className="bg-[#f8f9fa] border-b border-gray-200 px-4 py-1.5 flex items-center justify-between text-[13px]">
        <div className="flex items-center gap-2">
          <i onClick={onBack} className="fa-solid fa-home text-[#43939e] cursor-pointer text-[14px]"></i>
          <span className="text-gray-300">/</span>
          <div className="flex items-center gap-1 cursor-pointer hover:text-[#43939e]">
             <span className="text-[#43939e]">Configurations</span>
             <i className="fa-solid fa-caret-down text-[10px] text-[#43939e] mt-0.5"></i>
          </div>
          <span className="text-gray-300">/</span>
          <span className="text-[#43939e]">API Configuration</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#43939e] cursor-pointer hover:underline font-bold">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Main Selection Area - Teal Backdrop */}
      <div className="flex-1 bg-[#87c7cf] flex flex-col items-center justify-center p-8 mt-0.5 min-h-[500px]">
         <div className="flex flex-col items-center gap-6 animate-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-[26px] text-[#555] font-medium tracking-tight mb-2">Select API Configuration</h2>
            
            <div className="flex flex-col items-center gap-2.5">
               {configs.map((config) => (
                  <button 
                     key={config}
                     className="text-[18px] text-[#337ab7] hover:text-[#23527c] hover:underline transition-all font-normal"
                  >
                     {config}
                  </button>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};
