
import React from 'react';

interface SystemUsersProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const SystemUsers: React.FC<SystemUsersProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20">
      {/* Top Header */}
      <div className="bg-white rounded-sm h-10 px-4 flex items-center justify-between shadow-sm border border-gray-200">
        <div className="flex items-center gap-3">
          <i onClick={onBack} className="fa-solid fa-times text-gray-400 cursor-pointer hover:text-gray-600 text-xs"></i>
          <h1 className="text-gray-700 font-semibold text-[14px]">Haven Hospital</h1>
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
          <span className="text-gray-400 font-medium">Users</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* System User Details Card */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden flex flex-col">
        <div className="px-4 py-2 border-b bg-[#e9eaf2] flex items-center justify-between">
          <h2 className="text-[17px] font-normal text-gray-600 uppercase tracking-tight">System User Details</h2>
          <button className="bg-[#5bc0de] text-white px-4 py-1.5 rounded-sm text-[11px] font-bold flex items-center gap-2 hover:bg-[#31b0d5] shadow-sm">
            Actions <i className="fa-solid fa-caret-down text-[9px]"></i>
          </button>
        </div>

        <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
           {/* Left/Middle Column: Primary Form Fields (8 cols) */}
           <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <UserField label="Surname" />
              <UserField label="Password" type="password" />
              <UserField label="Othernames" />
              <UserField label="Confirm Password" type="password" />
              <UserField label="Username" />
              
              <div className="flex flex-col gap-1.5">
                 <label className="text-[13px] font-bold text-gray-700 uppercase tracking-tight">Roles</label>
                 <select className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 text-gray-400 italic shadow-sm appearance-none cursor-pointer">
                    <option>Select Roles</option>
                    <option>Administrator</option>
                    <option>Super User</option>
                 </select>
              </div>
              
              <div className="flex flex-col gap-1.5 md:col-span-2">
                 <label className="text-[13px] font-bold text-gray-700 uppercase tracking-tight">Branches (Leave blank for user to access all branches)</label>
                 <div className="flex gap-4">
                    <select className="flex-1 border border-gray-300 rounded px-3 py-2 text-[14px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 text-gray-400 italic shadow-sm appearance-none cursor-pointer">
                        <option>Select Branches</option>
                        <option>Main branch</option>
                    </select>
                    <button className="bg-[#17a2b8] text-white w-10 h-10 rounded-md flex items-center justify-center hover:bg-[#138496] shadow-md transition-all active:scale-95">
                       <i className="fa-solid fa-plus"></i>
                    </button>
                 </div>
              </div>
           </div>

           {/* Right Column: Security Flags (4 cols) */}
           <div className="lg:col-span-4 grid grid-cols-2 gap-x-4 gap-y-5 pt-4 px-4 border-l border-gray-50 h-full">
              <CheckboxItem label="Is Employee" />
              <CheckboxItem label="Is Disabled" />
              <CheckboxItem label="Is Locked" />
              <CheckboxItem label="Is Blocked" />
              <div className="col-span-2 space-y-5 mt-2">
                 <CheckboxItem label="Has Limited Logon Attempts" />
                 <CheckboxItem label="Can Login From Anywhere" />
              </div>
           </div>
        </div>

        {/* View: System Users Table Section */}
        <div className="border-t border-gray-200 shadow-inner">
           <div className="px-4 py-2 bg-[#e9eaf2] border-b">
             <h2 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">View: System Users</h2>
           </div>
           <div className="p-4 flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                 <div className="flex gap-1.5">
                    <button className="border border-gray-300 bg-white px-3 py-1.5 text-[11px] text-gray-600 rounded-sm hover:bg-gray-50 shadow-xs uppercase font-bold tracking-tight transition-colors">Excel</button>
                    <button className="border border-gray-300 bg-white px-3 py-1.5 text-[11px] text-gray-600 rounded-sm hover:bg-gray-50 shadow-xs uppercase font-bold tracking-tight transition-colors">CSV</button>
                    <button className="border border-gray-300 bg-white px-3 py-1.5 text-[11px] text-gray-600 rounded-sm hover:bg-gray-50 shadow-xs uppercase font-bold tracking-tight transition-colors">Print</button>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-[13px] text-gray-500 font-medium">Search:</span>
                    <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[13px] outline-none w-[240px] focus:ring-1 focus:ring-cyan-500 shadow-sm" />
                 </div>
              </div>

              <div className="border border-gray-200 rounded-sm overflow-x-auto min-h-[300px] shadow-inner bg-white">
                <table className="w-full text-left text-[12px] whitespace-nowrap">
                   <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                      <tr>
                         <th className="px-3 py-2.5 font-bold border-r">No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2.5 font-bold border-r">Name <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2.5 font-bold border-r text-cyan-700">Username <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2.5 font-bold border-r">Created On <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2.5 font-bold border-r text-blue-800">Last Login <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                         <th className="px-3 py-2.5 font-bold border-r text-center">Logins <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2.5 font-bold border-r text-center">Blocked? <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2.5 font-bold border-r text-center">Locked? <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2.5 font-bold text-center">Disabled? <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      </tr>
                   </thead>
                   <tbody className="bg-white text-gray-700">
                      <UserRow no="1" name="--" user="admin" created="Dec 19, 2018" last="Jan 3, 2026 8:33 am" logins="12044" />
                      <UserRow no="2" name="Dummy Jane" user="Dr" created="Sep 3, 2019" last="Mar 15, 2024 8:20 am" logins="84" blocked="Yes" />
                      <UserRow no="4" name="--" user="Hannington" created="Aug 8, 2019" last="Oct 9, 2022 1:50 pm" logins="269" />
                      <UserRow no="6" name="musembi Dummy" user="a.musembi" created="Jul 10, 2019" last="Nov 9, 2021 8:23 am" logins="307" />
                      <UserRow no="16" name="" user="klvnkihiu@gmail.com" created="Sep 6, 2019" last="Sep 6, 2019 3:00 pm" logins="4" />
                      <UserRow no="19" name="Test user" user="tuser" created="Sep 6, 2019" last="Dec 24, 2025 11:59 am" logins="9048" />
                      <UserRow no="21" name="--" user="panel" created="May 1, 2019" last="Jan 2, 2026 6:35 am" logins="2883" />
                      <UserRow no="22" name="" user="Emmanuel" created="Sep 6, 2019" last="May 15, 2025 4:18 pm" logins="2" />
                      <UserRow no="27" name="Kyama Wellington Mumo" user="w.kyama" created="Sep 6, 2019" last="Sep 6, 2019 3:00 pm" logins="5" blocked="Yes" />
                      <UserRow no="28" name="Steve -" user="STEVE" created="Sep 6, 2019" last="Sep 6, 2019 3:00 pm" logins="1" />
                   </tbody>
                </table>
              </div>

              {/* Table Status Footer */}
              <div className="flex flex-col gap-3 mt-4 border-t border-gray-100 pt-4">
                 <div className="text-[12px] text-gray-500 font-medium">Showing 1 to 10 of 1,464 entries</div>
                 <div className="flex items-center gap-2">
                    <input type="checkbox" id="viewDisabled" className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer shadow-sm" />
                    <label htmlFor="viewDisabled" className="text-[13px] text-gray-700 font-bold cursor-pointer uppercase tracking-tight">View Disabled</label>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const UserField: React.FC<{ label: string; type?: string }> = ({ label, type = 'text' }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[13px] font-bold text-gray-700 uppercase tracking-tight">{label}</label>
    <input 
      type={type} 
      className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-sm"
    />
  </div>
);

const CheckboxItem: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center gap-3">
    <input type="checkbox" className="w-4.5 h-4.5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer shadow-sm" />
    <label className="text-[13px] text-gray-700 font-bold cursor-pointer whitespace-nowrap uppercase tracking-tight">{label}</label>
  </div>
);

const UserRow: React.FC<{ no: string; name: string; user: string; created: string; last: string; logins: string; blocked?: string; locked?: string; disabled?: string }> = ({ 
  no, name, user, created, last, logins, blocked = "No", locked = "No", disabled = "No" 
}) => (
  <tr className="border-b hover:bg-gray-50 transition-colors cursor-pointer group">
    <td className="px-3 py-2.5 border-r group-hover:bg-cyan-50/50">{no}</td>
    <td className="px-3 py-2.5 border-r font-medium text-gray-800">{name || '-'}</td>
    <td className="px-3 py-2.5 border-r text-cyan-700 font-bold">{user}</td>
    <td className="px-3 py-2.5 border-r text-gray-600">{created}</td>
    <td className="px-3 py-2.5 border-r text-gray-600">{last}</td>
    <td className="px-3 py-2.5 border-r text-center font-bold text-gray-800">{logins}</td>
    <td className={`px-3 py-2.5 border-r text-center font-bold ${blocked === 'Yes' ? 'text-red-600' : 'text-gray-700'}`}>{blocked}</td>
    <td className={`px-3 py-2.5 border-r text-center font-bold ${locked === 'Yes' ? 'text-red-600' : 'text-gray-700'}`}>{locked}</td>
    <td className={`px-3 py-2.5 text-center font-bold ${disabled === 'Yes' ? 'text-red-600' : 'text-gray-700'}`}>{disabled}</td>
  </tr>
);
