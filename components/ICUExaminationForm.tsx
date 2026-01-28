import React from 'react';

interface ICUExaminationFormProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const ICUExaminationForm: React.FC<ICUExaminationFormProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-gray-400 font-medium">Examination Form</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mt-1">
        <div className="bg-white/50 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded shadow-sm w-full max-w-xl">
           <input 
             type="text" 
             placeholder="Search for patient by (Name, ID, OP/NO, P/NO, Ref)"
             className="w-full text-center text-[15px] outline-none bg-transparent placeholder-gray-500 font-medium"
           />
        </div>
      </div>

      {/* Nursing Header Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between">
          <h2 className="text-[16px] font-medium text-gray-600">Nursing</h2>
          <button className="bg-[#5bc0de] text-white px-3 py-1 rounded-sm text-[11px] font-bold flex items-center gap-2 hover:bg-[#31b0d5]">
            Actions <i className="fa-solid fa-caret-down text-[9px]"></i>
          </button>
        </div>

        <div className="p-4 flex flex-col gap-8">
           {/* Patient Meta-Info Grid */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-12 text-[14px] text-gray-800">
              <InfoRow label="Surname" />
              <InfoRow label="Gender" />
              <InfoRow label="OPD No" />
              <InfoRow label="Telephone" />
              <InfoRow label="Othernames" />
              <InfoRow label="Age" />
              <InfoRow label="Occupation" />
              <InfoRow label="Residence" />
           </div>

           {/* Form Section: Basic Vitals */}
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-gray-700">capture on</label>
                <div className="relative">
                  <input type="text" placeholder="mm/dd/yyyy --:-- --" className="w-full border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none" />
                  <i className="fa-solid fa-calendar absolute right-2 top-2.5 text-gray-400 text-[10px]"></i>
                </div>
              </div>
              <Field label="Fraction Of Inspired O2%" />
              <Field label="SPO2%" />
              <Field label="Heart Rate BpM" />
              <Field label="Temperature" />
              <Field label="Respiration Rate Per Min" />
              
              <Field label="Weight (Kg)" />
              <Field label="Blood Glucose Level(mmols)" />
              <Field label="Blood Pressure" placeholder="Blood Pressure" />
              <Field label="MAP(mmhg)" />
              <Field label="capillary refill(sec)" />
              <Field label="Sedation Score" placeholder="SedationScore" />
              
              <Field label="Pain At Rest (0 - 10)" />
              <Field label="Pain With Movement (0 - 10)" />
              <Field label="ETCO2" />
           </div>

           {/* RESPIRATORY SYSTEM SETTINGS */}
           <div className="flex flex-col gap-4 border-t border-gray-100 pt-4">
              <h3 className="text-[13px] font-bold text-gray-600 uppercase tracking-widest border-l-4 border-cyan-500 pl-3">Respiratory System Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <Field label="Ventilator Mode/O2 delivery device" placeholder="Ventilator Mode/O2 delivery device" />
                <Field label="FiO2(%)" />
                <Field label="O2 Flow (L/min)" />
                <Field label="Pinsp (cmH20) or P High" />
                <Field label="Pressure Support-PS (cmH20)" />
                <Field label="PEEP (cmH20)" />
                <Field label="Tidal Volume(ml)" />
                <Field label="Set Respiratory Rate(b/m)" />
                <Field label="Inspiratory time-Ti (sec)" />
                <Field label="I;E Ratio" placeholder="I;E" />
              </div>
           </div>

           {/* MEASUREMENTS */}
           <div className="flex flex-col gap-4 border-t border-gray-100 pt-4">
              <h3 className="text-[13px] font-bold text-gray-600 uppercase tracking-widest border-l-4 border-cyan-500 pl-3">Measurements</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <Field label="Spontaneous breaths-(bpm)" />
                <Field label="PIP(cmH20)" />
                <Field label="Mean Airway Pressure-pmean (cmH20)" />
                <Field label="Minute volume(ml)" />
                <Field label="Expired Tidal Volume(VTe)-ml" />
                <Field label="Resistance" />
                <Field label="Compliance" />
              </div>
           </div>

           {/* PROCEDURES */}
           <div className="flex flex-col gap-4 border-t border-gray-100 pt-4">
              <h3 className="text-[13px] font-bold text-gray-600 uppercase tracking-widest border-l-4 border-cyan-500 pl-3">Procedures</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                <Field label="suction" placeholder="suction" />
                <Field label="Nebulization with" />
                <Field label="Patient Position" placeholder="Patient Position" />
                <Field label="Radial Pulse" placeholder="Radial Pulse" />
                <Field label="Pedal Pulse" placeholder="Pedal Pulse" />
                <Field label="Catheter Care" />
                <Field label="Oral Care" />
                <Field label="Eye Care" />
                <Field label="Head of bed elevation (degrees)" />
                <Field label="Skin Care" />
              </div>
           </div>

           {/* SKIN LESIONS CHART */}
           <div className="flex flex-col gap-4 border-t border-gray-100 pt-4">
              <h3 className="text-[13px] font-bold text-gray-600 uppercase tracking-widest border-l-4 border-cyan-500 pl-3">Skin Lesions Chart(Description & Grading)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <Field label="Lesion 1" />
                <Field label="Lesion 2" />
                <Field label="Lesion 3" />
                <Field label="Lesion 4" />
                <Field label="Lesion 5" />
                <Field label="Braden scale Score" />
              </div>
              <div className="mt-2 text-[#4a4a7d] text-[13px] font-medium italic">
                For Braden Score less than 15, use Air Mattress
              </div>
           </div>

           <div className="flex justify-end pt-4">
              <button className="bg-[#17a2b8] hover:bg-[#138496] text-white px-8 py-2 rounded shadow-md text-[14px] font-bold transition-all">
                Save
              </button>
           </div>
        </div>

        {/* View: Nursing Table Section */}
        <div className="border-t border-gray-200">
          <div className="px-4 py-2 bg-[#f8f9fa] border-b">
            <h2 className="text-[15px] font-medium text-gray-600">View: Nursing</h2>
          </div>
          <div className="p-4 flex flex-col gap-4">
             <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-1">
                  <button className="border border-gray-300 px-3 py-1 text-[11px] hover:bg-gray-50 rounded shadow-xs">Excel</button>
                  <button className="border border-gray-300 px-3 py-1 text-[11px] hover:bg-gray-50 rounded shadow-xs">CSV</button>
                  <button className="border border-gray-300 px-3 py-1 text-[11px] hover:bg-gray-50 rounded shadow-xs">Print</button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-gray-500">Search:</span>
                  <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[220px]" />
                </div>
             </div>

             <div className="border border-gray-200 rounded-sm overflow-x-auto min-h-[140px]">
               <table className="w-full text-left text-[13px] whitespace-nowrap">
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
                    <input type="text" defaultValue="01/02/2026" className="border border-gray-300 rounded px-2 py-1.5 text-[14px] w-[110px] text-green-700 font-bold shadow-sm outline-none" />
                    <i className="fa-solid fa-calendar absolute right-2 top-2.5 text-gray-400 text-[10px]"></i>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-bold text-gray-700">To:</span>
                  <div className="relative">
                    <input type="text" defaultValue="01/02/2026" className="border border-gray-300 rounded px-2 py-1.5 text-[14px] w-[110px] text-green-700 font-bold shadow-sm outline-none" />
                    <i className="fa-solid fa-calendar absolute right-2 top-2.5 text-gray-400 text-[10px]"></i>
                  </div>
                </div>
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

const InfoRow: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex flex-col gap-1 border-b border-gray-50 pb-1">
    <span className="font-bold text-gray-700">{label}</span>
    <span className="text-gray-400 min-h-[1.4rem]"></span>
  </div>
);

const Field: React.FC<{ label: string; placeholder?: string }> = ({ label, placeholder }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[12px] font-bold text-gray-700 leading-tight">{label}</label>
    <input 
      type="text" 
      className="w-full border border-gray-200 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-400 bg-white shadow-xs"
      placeholder={placeholder}
    />
  </div>
);