
import React from 'react';

interface ConsultantsProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const Consultants: React.FC<ConsultantsProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20">
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
          <span className="text-blue-500 cursor-pointer hover:underline">Accounts</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Consultants</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Main Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between">
          <h2 className="text-[16px] font-medium text-gray-600 uppercase tracking-tight">Consultant Details</h2>
          <button className="bg-[#5bc0de] text-white px-3 py-1 rounded-sm text-[11px] font-bold flex items-center gap-2 hover:bg-[#31b0d5]">
            Actions <i className="fa-solid fa-caret-down text-[9px]"></i>
          </button>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4 items-start relative">
           {/* Row 1 */}
           <FormItem label="Surname" />
           <FormItem label="Alias" />
           <FormItem label="Phone Number" />
           <FormItem label="Pin Number" />

           {/* Row 2 */}
           <FormItem label="Othernames" />
           <FormItem label="Designation" />
           <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-600">Link To System User</label>
              <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white">
                 <option></option>
              </select>
           </div>
           <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 pt-6">
                <input type="checkbox" id="avail" className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer" />
                <label htmlFor="avail" className="text-[12px] text-gray-700 font-medium cursor-pointer">Is Available For Appointments</label>
              </div>
              <div className="flex justify-end mt-2">
                 <button className="bg-[#17a2b8] text-white w-10 h-10 rounded flex items-center justify-center hover:bg-[#138496] shadow-md transition-all active:scale-95">
                    <i className="fa-solid fa-plus text-lg"></i>
                 </button>
              </div>
           </div>
        </div>

        {/* View Section */}
        <div className="border-t border-gray-200">
           <div className="px-4 py-2 bg-[#f8f9fa] border-b">
             <h2 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">View: Consultants</h2>
           </div>
           <div className="p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                   <button className="border border-gray-300 bg-white px-3 py-1 text-[11px] text-gray-600 rounded hover:bg-gray-50 shadow-xs">Excel</button>
                   <button className="border border-gray-300 bg-white px-3 py-1 text-[11px] text-gray-600 rounded hover:bg-gray-50 shadow-xs">CSV</button>
                   <button className="border border-gray-300 bg-white px-3 py-1 text-[11px] text-gray-600 rounded hover:bg-gray-50 shadow-xs">Print</button>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-[12px] text-gray-500">Search:</span>
                   <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[11px] outline-none w-[200px]" />
                </div>
              </div>

              <div className="border border-gray-200 rounded-sm overflow-x-auto">
                <table className="w-full text-left text-[12px] whitespace-nowrap">
                   <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                      <tr>
                         <th className="px-3 py-2 font-bold border-r">Alias <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r text-blue-800">Designation <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Surname <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Othername <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold">Mobile No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      </tr>
                   </thead>
                   <tbody className="bg-white text-gray-700">
                      <ConsultantRow alias="-" desig="optician" surname="berry" other="jude" mobile="0716180011" />
                      <ConsultantRow alias="AM" desig="DOCTOR" surname="ALICIA" other="MAURICE" mobile="0787654321" />
                      <ConsultantRow alias="Andati" desig="Board Finance" surname="Eric" other="Khalumi" mobile="0714878253" />
                      <ConsultantRow alias="Arsenal" desig="Professor" surname="Arsene Wenger" other="Invicibles" mobile="0722200000" />
                      <ConsultantRow alias="Charles" desig="Gynaecologist" surname="Thuo" other="Mukamburi" mobile="0735353652" />
                      <ConsultantRow alias="Collo" desig="Business Development Officer" surname="Otip" other="Collince" mobile="09873663" />
                      <ConsultantRow alias="Consultant" desig="Physiotherapist" surname="Consultant" other="Conny" mobile="0789685743" />
                      <ConsultantRow alias="denis-consultant" desig="surgeon" surname="Doe" other="Denis Consultant" mobile="070066675" />
                      <ConsultantRow alias="Denis-Surgeon" desig="Surgeon" surname="Ndiritu" other="Ken Denis" mobile="0790898976" />
                   </tbody>
                </table>
              </div>

              {/* Bottom Filter */}
              <div className="flex items-center gap-2 mt-4">
                 <span className="text-[13px] font-bold text-gray-700">View:</span>
                 <select className="border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white text-green-700 font-bold min-w-[150px]">
                    <option>Active Consultants</option>
                    <option>Inactive</option>
                    <option>All</option>
                 </select>
                 <button className="bg-[#5bc0de] text-white px-6 py-1.5 rounded-sm text-[13px] font-bold hover:bg-[#31b0d5] transition-colors shadow-sm">
                    View
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const FormItem: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[12px] font-bold text-gray-600">{label}</label>
    <input 
      type="text" 
      className="w-full border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white"
    />
  </div>
);

const ConsultantRow: React.FC<{ alias: string; desig: string; surname: string; other: string; mobile: string }> = ({ alias, desig, surname, other, mobile }) => (
  <tr className="border-b hover:bg-gray-50 transition-colors">
    <td className="px-3 py-2 border-r">{alias}</td>
    <td className="px-3 py-2 border-r font-medium">{desig}</td>
    <td className="px-3 py-2 border-r">{surname}</td>
    <td className="px-3 py-2 border-r">{other}</td>
    <td className="px-3 py-2">{mobile}</td>
  </tr>
);
