import React from 'react';

interface CWCVisitsProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const CWCVisits: React.FC<CWCVisitsProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-blue-500 cursor-pointer hover:underline">GenericModules</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">CWC</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Search Bar for Patient */}
      <div className="flex justify-center mt-1">
        <div className="bg-white/50 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded shadow-sm w-full max-w-xl">
           <input 
             type="text" 
             placeholder="Search for patient by (Name, ID, OP/NO, P/NO, Ref)"
             className="w-full text-center text-[15px] outline-none bg-transparent placeholder-gray-500 font-medium"
           />
        </div>
      </div>

      {/* Child Welfare Clinic Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between">
          <h2 className="text-[16px] font-medium text-gray-600">Child Welfare Clinic</h2>
          <button className="bg-[#5bc0de] text-white px-3 py-1 rounded-sm text-[11px] font-bold flex items-center gap-2 hover:bg-[#31b0d5]">
            Actions <i className="fa-solid fa-caret-down text-[9px]"></i>
          </button>
        </div>

        <div className="p-4 flex flex-col gap-8">
           {/* Patient Meta-Info */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-12 text-[14px] text-gray-800">
              <div className="flex flex-col gap-1">
                <span className="font-bold">Surname</span>
                <span className="text-gray-400 min-h-[1.4rem]"></span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold">Gender</span>
                <span className="text-gray-400 min-h-[1.4rem]"></span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold">OPD No</span>
                <span className="text-gray-400 min-h-[1.4rem]"></span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold">Telephone</span>
                <span className="text-gray-400 min-h-[1.4rem]"></span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold">Othernames</span>
                <span className="text-gray-400 min-h-[1.4rem]"></span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold">Age</span>
                <span className="text-gray-400 min-h-[1.4rem]"></span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold">Occupation</span>
                <span className="text-gray-400 min-h-[1.4rem]"></span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold">Residence</span>
                <span className="text-gray-400 min-h-[1.4rem]"></span>
              </div>
           </div>

           {/* Form Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
              <CwcFormField label="Weight" />
              <CwcFormField label="Height" />
              <CwcFormField label="Head circumference (for infants)" />
              <CwcFormField label="Mid-upper arm circumference (MUAC)" />
              
              <CwcFormField label="Vaccines given" />
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-gray-700">Date of administration</label>
                <div className="relative">
                  <input type="text" placeholder="mm/dd/yyyy" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] outline-none text-green-700 font-medium" />
                  <i className="fa-solid fa-calendar absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-gray-700">Next scheduled immunization date</label>
                <div className="relative">
                  <input type="text" placeholder="mm/dd/yyyy --:-- --" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] outline-none text-green-700 font-medium" />
                  <i className="fa-solid fa-calendar absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                </div>
              </div>
              <CwcFormField label="Exclusive breastfeeding status (0-6 months)" />
              
              <CwcFormField label="Complementary feeding practices (6-23 months)" />
              <CwcFormField label="Dietary diversity score" />
              <CwcFormField label="Vitamin A supplementation" />
              <CwcFormField label="Deworming status" />
              
              <CwcFormField label="Past illnesses" />
              <CwcFormField label="Allergies or chronic conditions" />
              <CwcFormField label="Iron/folate supplementation (if applicable)" />
              <CwcFormField label="Oral health check" />
              
              <CwcFormField label="TB screening (where relevant)" />
              <CwcFormField label="HIV exposure and prophylaxis status" />
              <CwcFormField label="Counseling notes" />
              <CwcFormField label="Nurse's name" />

              <div className="flex items-end justify-end lg:col-start-4">
                <button className="bg-[#17a2b8] text-white w-8 h-8 flex items-center justify-center rounded-sm hover:bg-[#138496]">
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
           </div>
        </div>

        {/* View: Child Welfare Clinic Table Section */}
        <div className="border-t border-gray-200">
          <div className="px-4 py-2 bg-[#f8f9fa] border-b">
            <h2 className="text-[15px] font-medium text-gray-600">View: Child Welfare Clinic</h2>
          </div>
          <div className="p-4 flex flex-col gap-4">
             <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-1">
                  <button className="border border-gray-300 px-3 py-1 text-[11px] hover:bg-gray-50">Excel</button>
                  <button className="border border-gray-300 px-3 py-1 text-[11px] hover:bg-gray-50">CSV</button>
                  <button className="border border-gray-300 px-3 py-1 text-[11px] hover:bg-gray-50">Print</button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-gray-500">Search:</span>
                  <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[220px]" />
                </div>
             </div>

             <div className="border border-gray-200 rounded-sm overflow-x-auto min-h-[140px]">
               <table className="w-full text-left text-[13px]">
                 <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                   <tr>
                     <th className="px-4 py-2 font-bold text-[#333] border-r">No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     <th className="px-4 py-2 font-bold text-[#333] border-r">Patient <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                     <th className="px-4 py-2 font-bold text-[#333] border-r">Captured On <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     <th className="px-4 py-2 font-bold text-[#333] border-r">Captured By <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     <th className="px-4 py-2 font-bold text-[#333]">Actions <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                   </tr>
                 </thead>
                 <tbody className="bg-white text-gray-400 italic">
                    <tr>
                      <td colSpan={5} className="text-center py-6">No data available in table</td>
                    </tr>
                 </tbody>
               </table>
             </div>

             <div className="text-[12px] text-gray-500">Showing 0 to 0 of 0 entries</div>

             {/* Table Footer Filters */}
             <div className="bg-[#fcfcfc] border border-gray-200 rounded p-4 flex flex-wrap items-center gap-6 mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-bold text-gray-700">Filter:</span>
                  <select className="border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white outline-none w-[180px] text-green-700 font-bold">
                    <option>All Patients</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-bold text-gray-700">From:</span>
                  <div className="relative">
                    <input type="text" defaultValue="01/02/2026" className="border border-gray-300 rounded px-2 py-1.5 text-[14px] w-[110px] text-green-700 font-bold" />
                    <i className="fa-solid fa-calendar absolute right-2 top-2.5 text-gray-400 text-[10px]"></i>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-bold text-gray-700">To:</span>
                  <div className="relative">
                    <input type="text" defaultValue="01/02/2026" className="border border-gray-300 rounded px-2 py-1.5 text-[14px] w-[110px] text-green-700 font-bold" />
                    <i className="fa-solid fa-calendar absolute right-2 top-2.5 text-gray-400 text-[10px]"></i>
                  </div>
                </div>
                <button className="bg-[#5bc0de] text-white px-6 py-1.5 rounded-sm text-[13px] font-bold hover:bg-[#31b0d5] transition-colors">
                  View
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CwcFormField: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[12px] font-bold text-gray-700 leading-tight">{label}</label>
    <div className="relative">
      <input 
        type="text" 
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[14px] outline-none focus:ring-1 focus:ring-cyan-400 transition-all bg-white"
      />
    </div>
  </div>
);