
import React from 'react';

interface UOMProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const UOM: React.FC<UOMProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-blue-500 cursor-pointer hover:underline">Inventory</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Unit Of Measure</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
         
         {/* Left Side: Unit Of Measure Details */}
         <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden flex flex-col">
            <div className="px-4 py-2 border-b bg-[#f8f9fa]">
               <h2 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">Unit Of Measure Details</h2>
            </div>
            
            <div className="p-4 flex flex-col gap-4">
               <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div className="flex flex-col gap-1">
                     <label className="text-[11px] font-bold text-gray-500 uppercase">Name</label>
                     <input type="text" className="w-full border border-gray-200 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                     <label className="text-[11px] font-bold text-gray-500 uppercase">Measurement Unit</label>
                     <select className="w-full border border-gray-200 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white">
                        <option></option>
                     </select>
                  </div>
                  <div className="flex flex-col gap-1">
                     <label className="text-[11px] font-bold text-gray-500 uppercase">Dosage Unit [E.g. mL, Tablet]</label>
                     <input type="text" className="w-full border border-gray-200 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                     <label className="text-[11px] font-bold text-gray-500 uppercase">Packaging Unit</label>
                     <select className="w-full border border-gray-200 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white">
                        <option></option>
                     </select>
                  </div>
                  <div className="flex flex-col gap-1">
                     <label className="text-[11px] font-bold text-gray-500 uppercase">Prescription Verb [E.g. Take, Apply]</label>
                     <input type="text" className="w-full border border-gray-200 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500" />
                  </div>
                  <div className="flex flex-col gap-2 pt-2">
                     <div className="flex items-center gap-2">
                        <input type="checkbox" id="smallest" className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
                        <label htmlFor="smallest" className="text-[12px] text-gray-700">Is smallest unit</label>
                     </div>
                     <div className="flex items-center gap-2">
                        <input type="checkbox" id="computable" className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
                        <label htmlFor="computable" className="text-[12px] text-gray-700">Is Computable on Prescriptions</label>
                     </div>
                  </div>
               </div>
               
               <div className="flex justify-end mt-2">
                  <button className="bg-[#17a2b8] text-white w-8 h-8 rounded flex items-center justify-center hover:bg-[#138496] shadow-md">
                     <i className="fa-solid fa-plus"></i>
                  </button>
               </div>

               {/* View: Unit Of Measures Table */}
               <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                     <h3 className="text-[14px] font-bold text-gray-600 uppercase tracking-tight">View: Unit Of Measures</h3>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                     <div className="flex gap-1">
                        <button className="border border-gray-300 bg-white px-2 py-1 text-[10px] text-gray-600 hover:bg-gray-50">Excel</button>
                        <button className="border border-gray-300 bg-white px-2 py-1 text-[10px] text-gray-600 hover:bg-gray-50">CSV</button>
                        <button className="border border-gray-300 bg-white px-2 py-1 text-[10px] text-gray-600 hover:bg-gray-50">Print</button>
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="text-[11px] text-gray-500">Search:</span>
                        <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[11px] outline-none w-[120px]" />
                     </div>
                  </div>
                  <div className="border border-gray-200 rounded-sm overflow-x-auto">
                     <table className="w-full text-left text-[11px] whitespace-nowrap">
                        <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                           <tr>
                              <th className="px-2 py-1.5 font-bold border-r">No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30"></i></th>
                              <th className="px-2 py-1.5 font-bold border-r">Name <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30"></i></th>
                              <th className="px-2 py-1.5 font-bold border-r">Dosage <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30"></i></th>
                              <th className="px-2 py-1.5 font-bold border-r">Verb <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30"></i></th>
                              <th className="px-2 py-1.5 font-bold">Flags <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30"></i></th>
                           </tr>
                        </thead>
                        <tbody className="bg-white text-gray-700">
                           <UomRow no="1" name="Tablet" dosage="Tablet" verb="Take" flags="Smallest | Computable" />
                           <UomRow no="2" name="Dozen" dosage="Dozen" verb="Take" flags="" />
                           <UomRow no="3" name="Pack-1000" dosage="Pack-1000" verb="Take" flags="" />
                           <UomRow no="4" name="6-Pack" dosage="-" verb="-" flags="" />
                           <UomRow no="5" name="Capsule" dosage="Capsule" verb="Take" flags="Smallest | Computable" />
                           <UomRow no="6" name="100 Pack" dosage="100 Pack" verb="Take" flags="" />
                           <UomRow no="7" name="Suspension" dosage="mL" verb="Take" flags="Smallest" />
                           <UomRow no="8" name="VIAL" dosage="iu" verb="Take" flags="Smallest | Computable" />
                           <UomRow no="9" name="GEL" dosage="Layer" verb="Apply" flags="Smallest | Computable" />
                           <UomRow no="10" name="Syrup" dosage="mL" verb="Take" flags="Smallest" />
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>

         {/* Right Side: Unit Conversion Details */}
         <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden flex flex-col">
            <div className="px-4 py-2 border-b bg-[#f8f9fa]">
               <h2 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">Unit Conversion Details</h2>
            </div>
            
            <div className="p-4 flex flex-col gap-4">
               <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div className="flex flex-col gap-1">
                     <label className="text-[11px] font-bold text-gray-500 uppercase">From (Unit Of Measure)</label>
                     <select className="w-full border border-gray-200 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white">
                        <option></option>
                     </select>
                  </div>
                  <div className="flex flex-col gap-1">
                     <label className="text-[11px] font-bold text-gray-500 uppercase">Quantity</label>
                     <input type="text" className="w-full border border-gray-200 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                     <label className="text-[11px] font-bold text-gray-500 uppercase">To (Unit Of Measure)</label>
                     <select className="w-full border border-gray-200 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white">
                        <option></option>
                     </select>
                  </div>
                  <div className="flex items-end justify-end">
                     <button className="bg-[#17a2b8] text-white w-8 h-8 rounded flex items-center justify-center hover:bg-[#138496] shadow-md">
                        <i className="fa-solid fa-plus"></i>
                     </button>
                  </div>
               </div>

               {/* View: Unit Conversions Table */}
               <div className="mt-8">
                  <div className="flex items-center justify-between mb-3">
                     <h3 className="text-[14px] font-bold text-gray-600 uppercase tracking-tight">View: Unit Conversions</h3>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                     <div className="flex gap-1">
                        <button className="border border-gray-300 bg-white px-2 py-1 text-[10px] text-gray-600 hover:bg-gray-50">Excel</button>
                        <button className="border border-gray-300 bg-white px-2 py-1 text-[10px] text-gray-600 hover:bg-gray-50">CSV</button>
                        <button className="border border-gray-300 bg-white px-2 py-1 text-[10px] text-gray-600 hover:bg-gray-50">Print</button>
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="text-[11px] text-gray-500">Search:</span>
                        <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[11px] outline-none w-[120px]" />
                     </div>
                  </div>
                  <div className="border border-gray-200 rounded-sm overflow-x-auto">
                     <table className="w-full text-left text-[11px] whitespace-nowrap">
                        <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                           <tr>
                              <th className="px-2 py-1.5 font-bold border-r">UnitConversionID <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30"></i></th>
                              <th className="px-2 py-1.5 font-bold border-r">From <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30"></i></th>
                              <th className="px-2 py-1.5 font-bold border-r">To <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30"></i></th>
                              <th className="px-2 py-1.5 font-bold">Quantity <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30"></i></th>
                           </tr>
                        </thead>
                        <tbody className="bg-white text-gray-700">
                           <ConvRow id="2" from="Pack 200" to="Tablet" qty="200" />
                           <ConvRow id="4" from="10000" to="Tablet" qty="10000" />
                           <ConvRow id="5" from="50 kg" to="kg" qty="50" />
                           <ConvRow id="7" from="100 Pack" to="Tablet" qty="100" />
                           <ConvRow id="8" from="18-pack" to="Tablet" qty="18" />
                           <ConvRow id="9" from="Tin-1000" to="Tablet" qty="1000" />
                           <ConvRow id="10" from="6-Pack" to="Capsule" qty="6" />
                           <ConvRow id="11" from="Container" to="Tablet" qty="500" />
                           <ConvRow id="12" from="Puff(Inhaler)" to="ml" qty="3" />
                           <ConvRow id="13" from="Box" to="Rim of Paper" qty="500" />
                           <ConvRow id="14" from="Dozen" to="6-Pack" qty="6" />
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

const UomRow: React.FC<{ no: string; name: string; dosage: string; verb: string; flags: string }> = ({ no, name, dosage, verb, flags }) => (
  <tr className="border-b hover:bg-gray-50 transition-colors">
    <td className="px-2 py-1.5 border-r">{no}</td>
    <td className="px-2 py-1.5 border-r font-medium text-gray-800">{name}</td>
    <td className="px-2 py-1.5 border-r">{dosage}</td>
    <td className="px-2 py-1.5 border-r">{verb}</td>
    <td className="px-2 py-1.5">{flags}</td>
  </tr>
);

const ConvRow: React.FC<{ id: string; from: string; to: string; qty: string }> = ({ id, from, to, qty }) => (
  <tr className="border-b hover:bg-gray-50 transition-colors">
    <td className="px-2 py-1.5 border-r">{id}</td>
    <td className="px-2 py-1.5 border-r font-medium text-gray-800">{from}</td>
    <td className="px-2 py-1.5 border-r font-medium text-gray-800">{to}</td>
    <td className="px-2 py-1.5">{qty}</td>
  </tr>
);
