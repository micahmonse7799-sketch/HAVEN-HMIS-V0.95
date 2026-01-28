
import React, { useState } from 'react';

interface ReportsProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const Reports: React.FC<ReportsProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length >= 4) {
      setIsAuthenticated(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-[#87c7cf] z-[400] flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-[450px] rounded shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
          {/* Modal Header */}
          <div className="bg-[#e9eaf2] px-4 py-3 flex items-center justify-between border-b">
            <h3 className="text-[17px] text-[#4a4a7d] font-normal">Authentication Required</h3>
            <button onClick={onBack} className="text-gray-400 hover:text-gray-600">
              <i className="fa-solid fa-times text-[18px]"></i>
            </button>
          </div>

          {/* Modal Body */}
          <form onSubmit={handleAuthenticate} className="p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-gray-700 uppercase tracking-tight">Enter Your Password</label>
              <input 
                autoFocus
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[16px] outline-none focus:ring-1 focus:ring-[#17a2b8]"
              />
            </div>

            <div className="flex justify-end mt-2">
              <button 
                type="submit"
                className="bg-[#17a2b8] hover:bg-[#138496] text-white px-8 py-2.5 rounded font-bold text-[14px] transition-colors"
              >
                Authenticate
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-10">
      {/* Top Header Bar */}
      <div className="bg-white rounded-sm h-10 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <i onClick={onBack} className="fa-solid fa-times text-gray-400 cursor-pointer hover:text-gray-600 text-xs"></i>
          <h1 className="text-gray-700 font-semibold text-[14px]">Haven Hospital</h1>
        </div>
        <div className="flex items-center gap-8 text-[13px] text-gray-500">
          <div>Branch: <span className="text-blue-500 cursor-pointer hover:underline">Main branch</span></div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_5px_rgba(34,197,94,0.6)]"></div>
            <span className="text-gray-500 font-medium">Online</span>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-[#f8f9fa] border border-gray-200 rounded-sm px-4 py-1.5 flex items-center justify-between text-[12px]">
        <div className="flex items-center gap-2 text-gray-500">
          <i className="fa-solid fa-home text-blue-500"></i>
          <span className="opacity-50">/</span>
          <span className="text-blue-500 cursor-pointer hover:underline">Analytics</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Dashboard</span>
        </div>
      </div>

      {/* Analytics Charts Section */}
      <div className="bg-white/80 border border-gray-200 shadow-sm rounded-sm p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ChartItem label="Visits By Branch" />
          <ChartItem label="Visits By Gender" />
          <ChartItem label="Fast Moving Items" />
          <ChartItem label="Registration By Branch" />
        </div>
      </div>

      {/* Filter and Content Area */}
      <div className="bg-white/80 border border-gray-200 shadow-sm rounded-sm p-4 min-h-[400px]">
        <div className="flex items-center gap-3 mb-6">
          <select className="border border-gray-300 rounded px-3 py-1 text-[13px] bg-white outline-none text-green-700 font-medium focus:ring-1 focus:ring-[#17a2b8]">
            <option>Main branch</option>
          </select>
        </div>
        
        {/* Empty Area for more detailed reports */}
        <div className="flex flex-col items-center justify-center py-20 opacity-20">
           <i className="fa-solid fa-chart-line text-6xl text-gray-300 mb-4"></i>
           <span className="text-lg font-medium">Detailed Analytics Content</span>
        </div>
      </div>
    </div>
  );
};

const ChartItem: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex flex-col items-center gap-6">
    <h3 className="text-[13px] font-medium text-gray-700 text-center">{label}</h3>
    <div className="relative w-48 h-32 flex items-center justify-center">
       {/* 3D Oval Pie Chart Simulation */}
       <div className="w-full h-full bg-[#87b8ff] rounded-[100%] border-b-[8px] border-[#6b9ae6] shadow-xl relative transform rotate-x-45 flex items-center justify-center">
          <div className="absolute inset-2 bg-[#87b8ff] rounded-[100%] border border-white/20"></div>
       </div>
    </div>
  </div>
);
