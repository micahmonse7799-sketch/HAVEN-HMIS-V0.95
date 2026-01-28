import React from 'react';

interface RequiredImmunizationProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const RequiredImmunization: React.FC<RequiredImmunizationProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-blue-500 cursor-pointer hover:underline">Maternity</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Required Immunization</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Required Immunization Form */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2 border-b flex items-center justify-between bg-[#f8f9fa]">
          <h2 className="text-[15px] font-medium text-gray-600">Required Immunization</h2>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
           <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-600">Storage Location</label>
              <select className="border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white text-green-700 font-medium">
                <option>Pharmacy</option>
              </select>
           </div>
           <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-600">Expected Quantity</label>
              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500" />
           </div>
           <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="active" className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
                <label htmlFor="active" className="text-[13px] text-gray-600 font-medium">Is Active</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="billable" className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
                <label htmlFor="billable" className="text-[13px] text-gray-600 font-medium">Is Billable</label>
              </div>
           </div>
           <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="deduct" className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
                <label htmlFor="deduct" className="text-[13px] text-gray-600 font-medium">Deduct From Stock</label>
              </div>
           </div>

           <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-600">Item</label>
              <select className="border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white">
                <option></option>
              </select>
           </div>
           <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-600">Dosage Unit</label>
              <input type="text" className="border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500" />
           </div>
           <div className="flex items-end h-full lg:col-span-2 justify-end">
              <button className="bg-[#17a2b8] text-white w-8 h-8 flex items-center justify-center rounded-sm hover:bg-[#138496] transition-colors">
                <i className="fa-solid fa-plus text-xs"></i>
              </button>
           </div>
        </div>
      </div>

      {/* View: Required Immunization Table */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2 border-b bg-[#f8f9fa]">
          <h2 className="text-[15px] font-medium text-gray-600">View: Required Immunization</h2>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <div className="flex justify-end gap-2 items-center">
            <span className="text-[12px] text-gray-500">Search:</span>
            <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[220px]" />
          </div>

          <div className="border border-gray-100 rounded-sm overflow-x-auto">
            <table className="w-full text-left text-[12px]">
              <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                <tr>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">No <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">Item <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">Quantity <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                  <th className="px-4 py-2 font-bold text-[#333] border-r">Dosage Unit <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                  <th className="px-4 py-2 font-bold text-[#333] border-r text-center">Active? <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                  <th className="px-4 py-2 font-bold text-[#333] border-r text-center">Billable? <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                  <th className="px-4 py-2 font-bold text-[#333] text-center">Deduct Stock? <i className="fa-solid fa-arrows-up-down text-[10px] ml-1 opacity-30"></i></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <ImmunizationRow no="1" name="HEP B VACCINE" qty="1" unit="SYRUP" active="Yes" billable="Yes" deduct="Yes" />
                <ImmunizationRow no="2" name="PCV" qty="1" unit="SYRUP" active="Yes" billable="Yes" deduct="Yes" />
                <ImmunizationRow no="3" name="IPV" qty="1" unit="SYRUP" active="Yes" billable="Yes" deduct="Yes" />
                <ImmunizationRow no="4" name="HEP B VACCINE" qty="1" unit="syrup" active="Yes" billable="Yes" deduct="Yes" />
                <ImmunizationRow no="5" name="BCG VACCINE" qty="1" unit="syrup" active="Yes" billable="Yes" deduct="Yes" />
                <ImmunizationRow no="7" name="ORAL POLIO" qty="1" unit="2 drops" active="No" billable="Yes" deduct="Yes" />
                <ImmunizationRow no="8" name="Amlodipine" qty="6" unit="tab" active="Yes" billable="Yes" deduct="Yes" />
                <ImmunizationRow no="9" name="BCG VACCINE" qty="1" unit="injection" active="Yes" billable="No" deduct="No" />
                <ImmunizationRow no="10" name="ORAL POLIO" qty="1" unit="2drops" active="Yes" billable="Yes" deduct="Yes" />
                <ImmunizationRow no="11" name="IMMUNE BOOSTER" qty="1" unit="Tablet" active="Yes" billable="Yes" deduct="Yes" />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImmunizationRow: React.FC<{ no: string; name: string; qty: string; unit: string; active: string; billable: string; deduct: string }> = ({ no, name, qty, unit, active, billable, deduct }) => (
  <tr className="border-b hover:bg-gray-50 transition-colors">
    <td className="px-4 py-2 border-r">{no}</td>
    <td className="px-4 py-2 border-r font-medium text-gray-700">{name}</td>
    <td className="px-4 py-2 border-r">{qty}</td>
    <td className="px-4 py-2 border-r">{unit}</td>
    <td className="px-4 py-2 border-r text-center">{active}</td>
    <td className="px-4 py-2 border-r text-center">{billable}</td>
    <td className="px-4 py-2 text-center">{deduct}</td>
  </tr>
);
