
import React, { useState } from 'react';

interface BranchProfileProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const BranchProfile: React.FC<BranchProfileProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [activeCategory, setActiveCategory] = useState('Security');

  const categories = [
    'Security', 'Accounts', 'Billing', 'Clinical', 'Queue', 'Laboratory', 'Inventory', 'Procurement', 'Digital Stamp', 'Email Settings'
  ];

  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20 h-full">
      {/* Top Header Bar */}
      <div className="bg-white rounded-sm h-10 px-4 flex items-center justify-between shadow-sm border border-gray-200">
        <div className="flex items-center gap-3">
          <i onClick={onBack} className="fa-solid fa-times text-gray-400 cursor-pointer hover:text-gray-600 text-xs"></i>
          <h1 className="text-gray-700 font-semibold text-[14px]">Demo Hospital</h1>
        </div>
        <div className="flex items-center gap-12 text-[13px] text-gray-500">
          <div>Branch: <span className="text-[#43939e] cursor-pointer hover:underline">Main branch</span></div>
          <div>Room: <span onClick={onOpenRoomModal} className="text-[#43939e] cursor-pointer hover:underline">{currentRoom}</span></div>
          <button className="bg-[#17a2b8] text-white px-4 py-1 rounded-sm text-[11px] font-medium hover:bg-[#138496]">Queue</button>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-[#f8f9fa] border border-gray-200 rounded-sm px-4 py-1.5 flex items-center justify-between text-[12px]">
        <div className="flex items-center gap-2 text-gray-500">
          <i className="fa-solid fa-home text-blue-500"></i>
          <span className="opacity-50">/</span>
          <span className="text-blue-500 cursor-pointer hover:underline font-medium">Configurations</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Branch Profile</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Main Dual Pane Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden flex flex-1">
         {/* Left Side: Sidebar Navigation */}
         <div className="w-64 border-r border-gray-200 bg-[#f8f9fa] flex flex-col">
            <div className="p-4">
                <nav className="flex flex-col gap-1">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2.5 text-[14px] text-left transition-all rounded-sm ${
                                activeCategory === cat 
                                ? 'bg-[#337ab7] text-white font-medium shadow-md translate-x-1' 
                                : 'text-[#337ab7] hover:bg-gray-100 hover:pl-6'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </nav>
            </div>
         </div>

         {/* Right Side: Settings Area */}
         <div className="flex-1 bg-[#f0f4f5] p-8 overflow-y-auto">
            <div className="max-w-4xl flex flex-col gap-10">
               <h2 className="text-[17px] font-medium text-gray-700 underline decoration-gray-400 underline-offset-4 uppercase tracking-tight">
                  {activeCategory} Settings
               </h2>

               <div className="flex flex-col gap-8">
                  {/* Setting Item 1: Geofencing */}
                  <div className="bg-white border border-gray-200 rounded p-5 flex items-center justify-between shadow-lg relative group">
                     <div className="flex items-center gap-3">
                        <i className="fa-solid fa-location-crosshairs text-gray-600"></i>
                        <span className="text-[14px] font-bold text-gray-700">Geofencing</span>
                     </div>
                     <div className="w-[300px]">
                        <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-blue-400 bg-white text-green-700 font-bold appearance-none cursor-pointer">
                           <option>None</option>
                           <option>Restricted Area</option>
                           <option>Global Access</option>
                        </select>
                     </div>
                  </div>

                  {/* Setting Item 2: Max Logon Attempts */}
                  <div className="bg-white border border-gray-200 rounded p-5 flex items-center justify-between shadow-lg relative group">
                     <div className="flex items-center gap-3">
                        <i className="fa-solid fa-lock text-gray-600"></i>
                        <span className="text-[14px] font-bold text-gray-700">Maximum Logon Attempts</span>
                     </div>
                     <div className="w-[120px]">
                        <input 
                           type="text" 
                           defaultValue="5" 
                           className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-blue-400 bg-white text-green-700 font-bold text-center" 
                        />
                     </div>
                  </div>

                  {/* Setting Item 3: 2FA Toggle */}
                  <div className="bg-white border border-gray-200 rounded p-5 flex items-center justify-between shadow-lg relative group">
                     <div className="flex items-center gap-3">
                        <i className="fa-solid fa-lock text-gray-600"></i>
                        <span className="text-[14px] font-bold text-gray-700">2-Factor Authentication on Patient Portal</span>
                     </div>
                     <div className="flex items-center">
                        {/* High Fidelity Toggle Simulation from screenshot */}
                        <div className="w-16 h-8 bg-[#e9eaf2] rounded-full p-1 border border-gray-300 flex items-center relative cursor-pointer shadow-inner group overflow-hidden">
                           <div className="w-7 h-6 bg-red-100 rounded-full flex items-center justify-center border border-red-200 shadow-sm z-10">
                              <span className="text-red-500 font-bold text-[10px]">X</span>
                           </div>
                           <div className="absolute right-1 w-7 h-6 flex items-center justify-center opacity-30">
                              <i className="fa-solid fa-check text-green-600 text-xs"></i>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
