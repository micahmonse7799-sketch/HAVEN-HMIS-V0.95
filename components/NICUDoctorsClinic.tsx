import React from 'react';

interface NICUDoctorsClinicProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const NICUDoctorsClinic: React.FC<NICUDoctorsClinicProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-blue-500 cursor-pointer hover:underline">GenericModules</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">NICU Doctors clinic</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Search Bar Area */}
      <div className="flex justify-center mt-1">
        <div className="bg-white/50 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded shadow-sm w-full max-w-xl">
           <input 
             type="text" 
             placeholder="Search for patient by (Name, ID, OP/NO, P/NO, Ref)"
             className="w-full text-center text-[15px] outline-none bg-transparent placeholder-gray-500 font-medium"
           />
        </div>
      </div>

      {/* Doctors Form Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between">
          <h2 className="text-[16px] font-medium text-gray-600">Doctors</h2>
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
              <NicuFormField label="Perinatal History" isTextarea />
              <NicuFormField label="Resuscitation History" isTextarea />
              <NicuFormField label="Maternal History" isTextarea />
              <NicuFormField label="Reason for Admission" isTextarea />
              
              <NicuFormField label="Vitals" isTextarea />
              <NicuFormField label="General Examination" isTextarea />
              <NicuFormField label="Respiratory System" isTextarea />
              <NicuFormField label="Cardiovascular System" isTextarea />
              
              <NicuFormField label="Gastrointestinal Tract" isTextarea />
              <NicuFormField label="Central Nervous System" isTextarea />
              <NicuFormField label="Endocrine System" isTextarea />
              <NicuFormField label="Genital Urinary System" isTextarea />
              
              <NicuFormField label="Laboratory/Radiology Results" isTextarea />
              <NicuFormField label="Impression/Diagnosis" isTextarea />
              <NicuFormField label="Plan" isTextarea />

              <div className="flex items-end justify-end">
                <button className="bg-[#17a2b8] text-white w-8 h-8 flex items-center justify-center rounded-sm hover:bg-[#138496]">
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
           </div>
        </div>

        {/* View: Doctors Section */}
        <div className="border-t border-gray-200">
          <div className="px-4 py-2 bg-[#f8f9fa] border-b">
            <h2 className="text-[15px] font-medium text-gray-600">View: Doctors</h2>
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
                 <tbody className="bg-white">
                    <tr>
                      <td colSpan={5} className="text-center py-6 text-gray-400 italic">No data available in table</td>
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

const NicuFormField: React.FC<{ label: string; isTextarea?: boolean }> = ({ label, isTextarea = false }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[12px] font-bold text-gray-700 leading-tight">{label}</label>
    <div className="relative">
      {isTextarea ? (
        <textarea 
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[14px] outline-none focus:ring-1 focus:ring-cyan-400 transition-all bg-white resize-none h-[60px]"
        />
      ) : (
        <input 
          type="text" 
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[14px] outline-none focus:ring-1 focus:ring-cyan-400 transition-all bg-white"
        />
      )}
    </div>
  </div>
);