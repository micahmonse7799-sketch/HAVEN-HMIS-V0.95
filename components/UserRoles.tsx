
import React from 'react';

interface UserRolesProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const UserRoles: React.FC<UserRolesProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
      <div className="bg-[#f8f9fa] border border-gray-200 rounded-sm px-4 py-1.5 flex items-center justify-between text-[12px]">
        <div className="flex items-center gap-2 text-gray-500">
          <i className="fa-solid fa-home text-blue-500"></i>
          <span className="opacity-50">/</span>
          <span className="text-blue-500 cursor-pointer hover:underline font-medium">Security</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">User Roles</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden flex flex-col min-h-[500px]">
        <div className="px-4 py-2 border-b bg-[#e9eaf2]">
          <h2 className="text-[17px] font-normal text-gray-600">User Roles</h2>
        </div>

        <div className="p-6 max-w-4xl flex flex-col gap-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-4">
              <div className="flex flex-col gap-1.5">
                 <label className="text-[13px] font-bold text-gray-700">Name</label>
                 <div className="flex items-center gap-10">
                   <input type="text" className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 shadow-sm" />
                   <div className="flex items-center gap-2 whitespace-nowrap">
                      <input type="checkbox" id="requiresShift" className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer" />
                      <label htmlFor="requiresShift" className="text-[13px] text-gray-700 font-medium cursor-pointer">Requires Cashier Shift</label>
                   </div>
                 </div>
              </div>
              <div className="hidden md:block"></div>
              
              <div className="flex flex-col gap-1.5 md:col-span-2">
                 <label className="text-[13px] font-bold text-gray-700">Description</label>
                 <div className="flex items-center gap-2">
                    <input type="text" className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 shadow-sm" />
                    <button className="bg-[#17a2b8] text-white w-10 h-8 rounded flex items-center justify-center hover:bg-[#138496] shadow-md transition-all active:scale-95 ml-4">
                       <i className="fa-solid fa-plus"></i>
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* View: Rooms Table Section */}
        <div className="border-t border-gray-200">
           <div className="px-4 py-2 bg-[#e9eaf2] border-b">
             <h2 className="text-[15px] font-medium text-gray-600">View: Rooms</h2>
           </div>
           <div className="p-4 flex flex-col gap-4">
              <div className="flex justify-end mb-1">
                 <div className="flex items-center gap-2">
                    <span className="text-[13px] text-gray-500 font-medium">Search:</span>
                    <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[13px] outline-none w-[220px] focus:ring-1 focus:ring-cyan-500" />
                 </div>
              </div>

              <div className="border border-gray-200 rounded-sm overflow-hidden shadow-xs">
                <table className="w-full text-left text-[13px] whitespace-nowrap">
                   <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                      <tr>
                         <th className="px-4 py-2 font-bold border-r">UserRoleID <i className="fa-solid fa-arrows-up-down text-[9px] opacity-30 ml-1"></i></th>
                         <th className="px-4 py-2 font-bold border-r">Name <i className="fa-solid fa-arrows-up-down text-[9px] opacity-30 ml-1"></i></th>
                         <th className="px-4 py-2 font-bold">Description <i className="fa-solid fa-arrows-up-down text-[9px] opacity-30 ml-1"></i></th>
                      </tr>
                   </thead>
                   <tbody className="bg-white text-gray-700">
                      <RoleRow id="1" name="Super Admin" desc="SU" />
                      <RoleRow id="2" name="Demo Request User" desc="IT" />
                      <RoleRow id="3" name="Accountant" desc="Acc" />
                      <RoleRow id="4" name="Human Resource" desc="H.R" />
                      <RoleRow id="5" name="Cashier" desc="Cashier" />
                      <RoleRow id="6" name="Queue Panel" desc="" />
                      <RoleRow id="7" name="Administrator" desc="-" />
                      <RoleRow id="8" name="Demo User" desc="-" />
                      <RoleRow id="9" name="User Creator" desc="-" />
                      <RoleRow id="10" name="Laboratory" desc="" />
                      <RoleRow id="11" name="Doctors" desc="co's" />
                   </tbody>
                </table>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const RoleRow: React.FC<{ id: string; name: string; desc: string }> = ({ id, name, desc }) => (
  <tr className="border-b hover:bg-gray-50 transition-colors">
    <td className="px-4 py-2 border-r">{id}</td>
    <td className="px-4 py-2 border-r font-medium text-gray-800">{name}</td>
    <td className="px-4 py-2">{desc}</td>
  </tr>
);
