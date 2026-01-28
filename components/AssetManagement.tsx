
import React from 'react';

interface AssetManagementProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const AssetManagement: React.FC<AssetManagementProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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

      {/* Main Form Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between">
          <h2 className="text-[16px] font-medium text-gray-700">Fixed Asset Management</h2>
          <button className="bg-[#5bc0de] text-white px-3 py-1 rounded-sm text-[11px] font-bold flex items-center gap-2 hover:bg-[#31b0d5]">
            Actions <i className="fa-solid fa-caret-down text-[9px]"></i>
          </button>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
           <AssetField label="Asset Name" />
           <AssetField label="Manufacturer" />
           <AssetField label="Quantity" />
           <div className="flex flex-col gap-1">
              <label className="text-[12px] font-bold text-gray-600">Date Of Acquisition</label>
              <div className="relative">
                 <input type="text" defaultValue="01/02/2026" className="w-full border border-gray-300 rounded px-2 py-1.5 text-[14px] outline-none" />
                 <i className="fa-solid fa-calendar absolute right-3 top-2.5 text-gray-400"></i>
              </div>
           </div>

           <AssetField label="Asset Sub-Account" type="select" />
           <AssetField label="Make" />
           <AssetField label="Initial Rate Per Unit" />
           <AssetField label="Asset Location" type="select" />

           <AssetField label="Income Sub-Account" type="select" />
           <AssetField label="Model" />
           <AssetField label="Initial Value" />
           <AssetField label="Employee in charge" type="select" />

           <AssetField label="Expense Sub-Account" type="select" />
           <AssetField label="Serial Number" />
           <AssetField label="Current Value" />
           <div className="flex items-end justify-end">
              <button className="bg-[#17a2b8] text-white w-10 h-10 rounded flex items-center justify-center hover:bg-[#138496] shadow-md">
                 <i className="fa-solid fa-plus text-lg"></i>
              </button>
           </div>

           <AssetField label="Asset Class" type="select" />
           <AssetField label="Barcode" />
           <AssetField label="Salvage Value" />
        </div>

        {/* View Section */}
        <div className="border-t border-gray-200">
           <div className="px-4 py-2 bg-[#f8f9fa] border-b">
             <h2 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">View: Fixed Assets</h2>
           </div>
           <div className="p-4 flex flex-col gap-4">
              <div className="flex justify-end items-center gap-2">
                 <span className="text-[12px] text-gray-500">Search:</span>
                 <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[200px]" />
              </div>

              <div className="border border-gray-200 rounded-sm overflow-x-auto">
                <table className="w-full text-left text-[12px] whitespace-nowrap">
                  <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                    <tr>
                      <th className="px-3 py-2 font-bold border-r">Name <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-3 py-2 font-bold border-r">Class <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-3 py-2 font-bold border-r text-right">Initial Value <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-3 py-2 font-bold border-r text-right text-blue-800">Current Value <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-3 py-2 font-bold border-r text-right">Salvage Value <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-3 py-2 font-bold border-r">Useful Life <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-3 py-2 font-bold">Depreciation Method <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-gray-700">
                     <AssetRow name="ACER SYSTEM UNIT - I453453439-3500k" class_="Computer-Equipment - AssetClass-Dpr" initial="1,200,000.00" current="960,000.00" salvage="0.00" life="60 months" method="Straight Line" />
                     <AssetRow name="ACER SYSTEM UNIT - I7-3500k" class_="Computer-Equipment - AssetClass-Dpr" initial="1,200,000.00" current="0.00" salvage="0.00" life="60 months" method="Straight Line" />
                     <AssetRow name="ACER SYSTEM UNIT - I9-3500k" class_="Computer-Equipment - AssetClass-Dpr" initial="1,200,000.00" current="0.00" salvage="0.00" life="60 months" method="Straight Line" />
                     <tr className="border-b"><td className="px-3 py-2 text-orange-400 font-medium" colSpan={7}>Ambulance KDS 123Q</td></tr>
                     <tr className="border-b"><td className="px-3 py-2 text-orange-400 font-medium" colSpan={7}>Analyzer</td></tr>
                     <AssetRow name="Apple One - CCO" class_="Computer-Equipment - AssetClass-Slvg" initial="200,000.00" current="110,720.00" salvage="40,000.00" life="60 months" method="Straight Line" />
                     <AssetRow name="Audi R70" class_="Motor Vehicles" initial="2,000,000.00" current="2,000,000.00" salvage="500,000.00" life="48 months" method="Straight Line" />
                  </tbody>
                </table>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const AssetField: React.FC<{ label: string; type?: 'text' | 'select' }> = ({ label, type = 'text' }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[12px] font-bold text-gray-700 tracking-tight">{label}</label>
    {type === 'select' ? (
      <select className="w-full border border-gray-300 rounded px-2 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white">
        <option></option>
      </select>
    ) : (
      <input type="text" className="w-full border border-gray-300 rounded px-2 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white" />
    )}
  </div>
);

const AssetRow: React.FC<{ name: string; class_: string; initial: string; current: string; salvage: string; life: string; method: string }> = ({ name, class_, initial, current, salvage, life, method }) => (
  <tr className="border-b hover:bg-gray-50 transition-colors">
    <td className="px-3 py-2 border-r font-medium text-green-700 cursor-pointer hover:underline">{name}</td>
    <td className="px-3 py-2 border-r text-green-700">{class_}</td>
    <td className="px-3 py-2 border-r text-right text-green-700">{initial}</td>
    <td className="px-3 py-2 border-r text-right text-green-700 font-bold">{current}</td>
    <td className="px-3 py-2 border-r text-right text-green-700">{salvage}</td>
    <td className="px-3 py-2 border-r text-green-700">{life}</td>
    <td className="px-3 py-2 text-green-700">{method}</td>
  </tr>
);
