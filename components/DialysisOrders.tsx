import React, { useState } from 'react';

interface DialysisOrdersProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const DialysisOrders: React.FC<DialysisOrdersProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [isPatientDetailsVisible, setIsPatientDetailsVisible] = useState(true);

  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-10">
      {/* Top Header Bar */}
      <div className="bg-white rounded-sm h-10 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <i onClick={onBack} className="fa-solid fa-times text-gray-400 cursor-pointer hover:text-gray-600 text-xs"></i>
          <h1 className="text-gray-700 font-semibold text-[14px]">Demo Hospital</h1>
        </div>
        <div className="flex items-center gap-8 text-[13px] text-gray-500">
          <div>Branch: <span className="text-[#43939e]">Main branch</span></div>
          <div>Room: <span onClick={onOpenRoomModal} className="text-[#43939e] cursor-pointer hover:underline">{currentRoom}</span></div>
          <button className="bg-[#17a2b8] text-white px-4 py-1 rounded-sm text-[11px]">Queue</button>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-[#f8f9fa] border border-gray-200 rounded-sm px-4 py-1.5 flex items-center justify-between text-[12px]">
        <div className="flex items-center gap-2 text-gray-500">
          <i className="fa-solid fa-home text-blue-500"></i>
          <span className="opacity-50">/</span>
          <span className="text-blue-500 cursor-pointer hover:underline">Dialysis</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Dialysis Orders</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Patients Details Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2 border-b flex items-center justify-between bg-[#f8f9fa]">
          <h2 className="text-[15px] font-medium text-gray-600">
            Patients Details <span onClick={() => setIsPatientDetailsVisible(!isPatientDetailsVisible)} className="text-[12px] font-normal text-gray-400 cursor-pointer lowercase">(click here to {isPatientDetailsVisible ? 'hide' : 'show'})</span>
          </h2>
        </div>
        
        {isPatientDetailsVisible && (
          <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1.5 text-[13px] text-gray-700">
              <DataLine label="OP/No:" value="" />
              <div className="flex items-baseline justify-between border-b border-gray-50 pb-0.5">
                <span className="font-bold text-gray-700 whitespace-nowrap mr-4">Age:</span>
                <span className="font-medium text-[#43939e] italic">(yrs) (mths) (wks) (days)</span>
              </div>
              <DataLine label="Surname:" value="" />
              <DataLine label="Other Names:" value="" />
              <DataLine label="Occupation:" value="" />
              <DataLine label="Sex:" value="" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="border border-gray-100 rounded-sm overflow-hidden bg-gray-50/30 p-4 text-center">
                 <span className="text-[13px] text-gray-400 font-medium italic">Select a patient from the dialysis queue to start...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dialysis Treatment Form */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2 border-b flex items-center justify-between bg-[#f8f9fa]">
          <h2 className="text-[15px] font-medium text-gray-600">Dialysis Order / Treatment Plan</h2>
          <button className="bg-[#5bc0de] text-white px-3 py-1 rounded-sm text-[11px] flex items-center gap-2 hover:bg-[#31b0d5]">
            Actions <i className="fa-solid fa-caret-down text-[9px]"></i>
          </button>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Column 1: Prescriptive */}
          <div className="flex flex-col gap-3">
             <FormGroup label="Dialysis Machine No" type="select" />
             <FormGroup label="Dialyzer Type" type="select" />
             <FormGroup label="Needle Size" type="select" />
             <FormGroup label="Blood Access" type="select" />
          </div>

          {/* Column 2: Flows */}
          <div className="flex flex-col gap-3">
             <FormGroup label="Duration (Hours)" type="input" />
             <FormGroup label="Blood Flow Rate (BFR)" type="input" />
             <FormGroup label="Dialysate Flow Rate (DFR)" type="input" />
             <FormGroup label="Anticoagulant" type="input" />
          </div>

          {/* Column 3: Weights */}
          <div className="flex flex-col gap-3">
             <FormGroup label="Dry Weight (kg)" type="input" />
             <FormGroup label="Pre-Dialysis Weight (kg)" type="input" />
             <FormGroup label="Target Ultrafiltration (L)" type="input" />
             <FormGroup label="Heparin Dose (units)" type="input" />
          </div>

          {/* Column 4: Observations & Submit */}
          <div className="flex flex-col gap-3">
             <div className="flex flex-col gap-1.5">
               <label className="text-[12px] font-bold text-gray-600">Special Instructions</label>
               <textarea className="w-full h-24 border border-gray-300 rounded p-2 text-[12px] outline-none focus:ring-1 focus:ring-cyan-500 resize-none"></textarea>
             </div>
             <div className="flex items-center gap-2 mt-4">
                <input type="checkbox" id="emergency" className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500" />
                <label htmlFor="emergency" className="text-[13px] text-red-700 font-bold">Emergency Session</label>
             </div>
             <div className="flex justify-end mt-4">
                <button className="bg-[#17a2b8] text-white px-8 py-2 rounded text-[13px] font-bold hover:bg-[#138496] transition-colors shadow-sm uppercase tracking-wide">
                  Save Order
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* View: Dialysis History */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2 border-b bg-[#f8f9fa]">
          <h2 className="text-[15px] font-medium text-gray-600">Dialysis History</h2>
        </div>
        <div className="p-4">
          <div className="border border-gray-100 rounded-sm overflow-x-auto min-h-[140px]">
            <table className="w-full text-left text-[12px]">
              <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                <tr>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">Session No</th>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">Date</th>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">Machine</th>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">BFR/DFR</th>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">Duration</th>
                  <th className="px-4 py-2 font-bold text-[#333]">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500 font-medium italic">No dialysis sessions found for this patient.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataLine: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-baseline border-b border-gray-50 pb-0.5">
    <span className="font-bold text-gray-700 whitespace-nowrap mr-4">{label}</span>
    <span className="font-semibold text-gray-800 truncate">{value || ''}</span>
  </div>
);

const FormGroup: React.FC<{ label: string; type: 'input' | 'select' }> = ({ label, type }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[12px] font-bold text-gray-600">{label}</label>
    {type === 'select' ? (
      <select className="w-full border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white">
        <option></option>
      </select>
    ) : (
      <input type="text" className="w-full border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500" />
    )}
  </div>
);
