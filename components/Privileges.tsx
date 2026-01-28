
import React from 'react';

interface PrivilegesProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const Privileges: React.FC<PrivilegesProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20">
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
      <div className="bg-[#f8f9fa] border border-gray-200 rounded-sm px-4 py-1 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5 text-gray-500">
          <i className="fa-solid fa-home text-blue-500"></i>
          <span className="opacity-50">/</span>
          <span className="text-blue-500 cursor-pointer hover:underline font-medium">Security</span>
          <span className="opacity-50">/</span>
          <span className="text-blue-500 cursor-pointer hover:underline font-medium">Privileges</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden p-6 flex flex-col gap-10">
         {/* Role Selection Header */}
         <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="flex-1 w-full max-w-lg">
               <select className="w-full border border-gray-300 rounded px-4 py-2 text-[14px] outline-none bg-white text-gray-500 focus:ring-1 focus:ring-cyan-500 shadow-sm appearance-none cursor-pointer">
                  <option>--Select a role here--</option>
                  <option>Super Admin</option>
                  <option>Cashier</option>
                  <option>Doctor</option>
               </select>
            </div>
            <div className="flex items-center gap-3">
               <span className="text-[14px] font-bold text-gray-700">Privilege:</span>
               <div className="flex gap-1 shadow-xs">
                  <input type="text" placeholder="Add a privilege here..." className="border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none w-[200px] focus:ring-1 focus:ring-cyan-500" />
                  <button className="bg-[#17a2b8] text-white w-8 h-8 rounded flex items-center justify-center hover:bg-[#138496] shadow-sm">
                    <i className="fa-solid fa-plus text-xs"></i>
                  </button>
               </div>
            </div>
         </div>

         {/* Dual Pane Assignment Grid */}
         <div className="grid grid-cols-1 lg:grid-cols-[1fr_60px_1fr] gap-4 items-center">
            {/* Left Pane: Role Privileges */}
            <div className="flex flex-col gap-2">
               <h3 className="text-[14px] font-bold text-gray-700 underline uppercase tracking-tight">Role Privileges</h3>
               <div className="flex flex-wrap items-center justify-between mb-1 gap-2">
                  <div className="flex gap-1">
                     <button className="border border-gray-300 bg-white px-2 py-0.5 text-[11px] text-gray-600 rounded hover:bg-gray-50 shadow-xs">Excel</button>
                     <button className="border border-gray-300 bg-white px-2 py-0.5 text-[11px] text-gray-600 hover:bg-gray-50 shadow-xs">CSV</button>
                     <button className="border border-gray-300 bg-white px-2 py-0.5 text-[11px] text-gray-600 hover:bg-gray-50 shadow-xs">Print</button>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="text-[12px] text-gray-500 font-medium">Search:</span>
                     <input type="text" className="border border-gray-300 rounded px-2 py-0.5 text-[12px] outline-none w-[120px] focus:ring-1 focus:ring-cyan-500" />
                  </div>
               </div>
               <div className="border border-gray-200 rounded-sm overflow-hidden min-h-[300px] bg-white shadow-inner">
                  <table className="w-full text-left text-[12px]">
                     <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                        <tr>
                           <th className="px-2 py-2 w-[40px] border-r text-center"><input type="checkbox" className="w-3.5 h-3.5" /></th>
                           <th className="px-3 py-2 font-bold border-r">ID <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                           <th className="px-3 py-2 font-bold">Name <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                        </tr>
                     </thead>
                     <tbody className="bg-white text-center italic text-gray-400">
                        <tr>
                           <td colSpan={3} className="py-24 text-gray-500 font-medium">No data available in table</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>

            {/* Central Navigation Controls */}
            <div className="flex lg:flex-col gap-3 justify-center items-center lg:pt-20">
               <button className="bg-[#17a2b8] text-white w-8 h-8 rounded flex items-center justify-center hover:bg-[#138496] shadow-sm transition-all active:scale-90">
                  <i className="fa-solid fa-chevron-left"></i>
               </button>
               <button className="bg-[#17a2b8] text-white w-8 h-8 rounded flex items-center justify-center hover:bg-[#138496] shadow-sm transition-all active:scale-90">
                  <i className="fa-solid fa-chevron-right"></i>
               </button>
            </div>

            {/* Right Pane: All Privileges */}
            <div className="flex flex-col gap-2">
               <h3 className="text-[14px] font-bold text-gray-700 underline uppercase tracking-tight">All Privileges</h3>
               <div className="flex flex-wrap items-center justify-between mb-1 gap-2">
                  <div className="flex gap-1">
                     <button className="border border-gray-300 bg-white px-2 py-0.5 text-[11px] text-gray-600 rounded hover:bg-gray-50 shadow-xs">Excel</button>
                     <button className="border border-gray-300 bg-white px-2 py-0.5 text-[11px] text-gray-600 hover:bg-gray-50 shadow-xs">CSV</button>
                     <button className="border border-gray-300 bg-white px-2 py-0.5 text-[11px] text-gray-600 hover:bg-gray-50 shadow-xs">Print</button>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="text-[12px] text-gray-500 font-medium">Search:</span>
                     <input type="text" className="border border-gray-300 rounded px-2 py-0.5 text-[12px] outline-none w-[120px] focus:ring-1 focus:ring-cyan-500" />
                  </div>
               </div>
               <div className="border border-gray-200 rounded-sm overflow-y-auto h-[300px] shadow-inner custom-scrollbar bg-white">
                  <table className="w-full text-left text-[12px]">
                     <thead className="bg-[#f8f9fa] text-gray-600 border-b sticky top-0 z-10">
                        <tr>
                           <th className="px-2 py-2 w-[40px] border-r text-center bg-[#f8f9fa]"><input type="checkbox" className="w-3.5 h-3.5" /></th>
                           <th className="px-3 py-2 font-bold border-r bg-[#f8f9fa]">ID <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                           <th className="px-3 py-2 font-bold bg-[#f8f9fa]">Name <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                        </tr>
                     </thead>
                     <tbody className="bg-white text-gray-700">
                        <PrivRow id="1" name="Can Add Privilege" />
                        <PrivRow id="2" name="Can write 2" />
                        <PrivRow id="3" name="Can Edit Privileges" />
                        <PrivRow id="4" name="Can Create Or Update Privilege" />
                        <PrivRow id="5" name="Can View Privileges" />
                        <PrivRow id="6" name="Can Assign Privileges To Role" />
                        <PrivRow id="7" name="Can Remove Privileges From Role" />
                        <PrivRow id="8" name="Can View User Roles" />
                        <PrivRow id="9" name="Can Copy Privileges" />
                        <PrivRow id="10" name="Can View Users" />
                        <PrivRow id="11" name="Can Create Or Update System User" />
                        <PrivRow id="12" name="Can Reset User Password" />
                        <PrivRow id="13" name="Can View Hospital Information" />
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         {/* Bottom Control Bar */}
         <div className="bg-[#f8f9fa] border border-gray-200 rounded p-4 flex flex-wrap items-center gap-6 mt-auto shadow-sm">
            <div className="flex items-center gap-2">
               <span className="text-[13px] font-bold text-gray-700">Copy privileges From (Role):</span>
               <select className="border border-gray-300 rounded px-3 py-1.5 text-[13px] bg-white outline-none min-w-[240px] focus:ring-1 focus:ring-cyan-500 shadow-xs appearance-none cursor-pointer">
                  <option>--Select a role here--</option>
               </select>
            </div>
            <div className="flex items-center gap-2">
               <span className="text-[13px] font-bold text-gray-700">To (Role):</span>
               <select className="border border-gray-300 rounded px-3 py-1.5 text-[13px] bg-white outline-none min-w-[240px] focus:ring-1 focus:ring-cyan-500 shadow-xs appearance-none cursor-pointer">
                  <option>--Select a role here--</option>
               </select>
            </div>
            <button className="bg-[#17a2b8] text-white px-8 py-2 rounded-sm text-[13px] font-bold hover:bg-[#138496] shadow-sm uppercase tracking-tight transition-colors ml-auto md:ml-0 active:scale-95">
               Copy
            </button>
         </div>
      </div>
    </div>
  );
};

const PrivRow: React.FC<{ id: string; name: string }> = ({ id, name }) => (
  <tr className="border-b hover:bg-gray-50 transition-colors">
    <td className="px-2 py-2 text-center border-r"><input type="checkbox" className="w-3.5 h-3.5" /></td>
    <td className="px-3 py-2 border-r">{id}</td>
    <td className="px-3 py-2">{name}</td>
  </tr>
);
