
import React, { useState } from 'react';

interface InventoryProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const Inventory: React.FC<InventoryProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(true);

  const locations = [
    "Pharmacy", "Main Store", "Laboratory", "Casualty Emergency Kit",
    "Nursing Station", "Theatre", "Consultation", "Kitchen",
    "Administration", "Procedures", "Dental", "Dialysis Unit",
    "Nutrition", "Scanning/Ultrasound", "ICT", "Housekeeping",
    "Accounts", "Optical Shop", "Pharmacy Inpatient", "Over the Counter Store",
    "Hospitality", "Lab", "Radiology", "Inpatient", "Test 1", "Thearte",
    "Water Point", "MAWAS", "STORE", "Store 1", "stores 001", "Warehouse",
    "Mobile Clinic A", "stores1", "Out Patient", "Store 20", "emergency"
  ];

  const handleLocationSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(e.target.value);
    if (e.target.value) {
      setIsLocationModalOpen(false);
    }
  };

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
          <span className="text-gray-400 font-medium">Inventory</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between">
          <h2 className="text-[15px] font-medium text-gray-600">
            Inventory Item Details <span className="text-[12px] font-normal text-gray-400 cursor-pointer italic">(click here to change)</span>
          </h2>
        </div>

        <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column - Form (9 cols) */}
          <div className="lg:col-span-9 flex flex-col gap-4">
            {/* Search Top */}
            <div className="flex items-center gap-2 max-w-sm mb-2">
               <div className="relative flex-1">
                  <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-gray-400 text-[12px]"></i>
                  <input type="text" placeholder="Search here..." className="w-full bg-[#f0f2f5] border border-gray-200 rounded px-8 py-1.5 text-[13px] outline-none" />
               </div>
               <button className="bg-gray-100 p-2 rounded border border-gray-200"><i className="fa-solid fa-barcode text-gray-600"></i></button>
               <button className="bg-white border border-gray-300 px-4 py-1.5 rounded text-[13px] font-medium text-gray-700">Search</button>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-3">
               <InvField label="Name" />
               <InvField label="Other Tax" type="select" />
               <InvField label="Batch No" />

               <InvField label="Item Category" type="select" />
               <InvField label="Unit Cost (BP)" />
               <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-gray-500 uppercase">Batch Expiry Date</label>
                  <div className="relative">
                    <input type="text" placeholder="mm/dd/yyyy" className="w-full border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none" />
                    <i className="fa-solid fa-calendar absolute right-3 top-2 text-gray-400"></i>
                  </div>
               </div>

               <InvField label="Item Class" type="select" />
               <InvField label="Unit Price (For cash payers)" />
               <InvField label="Item Code" />

               <InvField label="Inventory Sub-Account" type="select" />
               <InvField label="Min Unit Price" />
               <InvField label="Barcode" />

               <InvField label="Cost Of Sale Sub-Account" type="select" />
               <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-gray-500 uppercase">Available Quantity</label>
                  <input type="text" defaultValue="0" readOnly className="w-full border border-gray-200 bg-gray-50 rounded px-2 py-1.5 text-[13px] text-green-700 font-bold text-right" />
               </div>
               <InvField label="Reorder Level" />

               <InvField label="Income Sub-Account" type="select" />
               <InvField label="Total Quantity" />
               <div className="flex items-center gap-2 pt-6">
                  <input type="checkbox" id="new_batch" className="w-4 h-4 rounded border-gray-300 text-cyan-600" />
                  <label htmlFor="new_batch" className="text-[12px] text-gray-700 font-medium">Create a new batch</label>
               </div>

               <InvField label="VAT Type" type="select" />
               <InvField label="Unit Of Measure" type="select" />
               <div className="flex items-end justify-end">
                  <button className="bg-[#17a2b8] text-white w-8 h-8 rounded flex items-center justify-center hover:bg-[#138496] shadow-md">
                     <i className="fa-solid fa-plus"></i>
                  </button>
               </div>
            </div>
          </div>

          {/* Right Column - Actions (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-2 pt-4">
             <button className="bg-[#008080] text-white py-1.5 rounded-sm text-[12px] font-medium shadow-sm hover:bg-[#006666]">View Reserved</button>
             <div className="flex justify-center py-1 opacity-50"><i className="fa-solid fa-ellipsis-vertical text-gray-400"></i></div>
             
             <ActionBtn label="Import Products" />
             <ActionBtn label="Export Products" />
             <ActionBtn label="Create Opening Stock" />
             <ActionBtn label="Sync Inventory Items" />
             <ActionBtn label="Retire Old Batches" />
             <ActionBtn label="Merge Batches" />
             <button className="bg-[#c29141] text-white py-1.5 rounded-sm text-[12px] font-medium shadow-sm hover:bg-[#a67c37]">View Expired Batches</button>
             
             <div className="flex justify-center py-1 opacity-50"><i className="fa-solid fa-ellipsis-vertical text-gray-400"></i></div>
             <button className="bg-white border border-gray-300 text-gray-700 py-1.5 rounded-sm text-[12px] font-medium shadow-sm hover:bg-gray-50">Item Classes</button>
             <button className="bg-white border border-gray-300 text-gray-700 py-1.5 rounded-sm text-[12px] font-medium shadow-sm hover:bg-gray-50">Item Categories</button>
          </div>
        </div>

        {/* View Section */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">View: Inventory Items</h2>
            <div className="flex gap-2">
              <button className="border border-gray-300 bg-white px-3 py-1 text-[11px] text-gray-600 rounded shadow-xs hover:bg-gray-50">Excel</button>
              <button className="border border-gray-300 bg-white px-3 py-1 text-[11px] text-gray-600 rounded shadow-xs hover:bg-gray-50">CSV</button>
              <button className="border border-gray-300 bg-white px-3 py-1 text-[11px] text-gray-600 rounded shadow-xs hover:bg-gray-50">Print</button>
            </div>
          </div>

          <div className="flex justify-end gap-2 items-center mb-2">
            <span className="text-[12px] text-gray-500">Search:</span>
            <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[200px]" />
          </div>

          <div className="border border-gray-200 rounded-sm overflow-x-auto min-h-[150px]">
            <table className="w-full text-left text-[12px] whitespace-nowrap">
              <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                <tr>
                  <th className="px-3 py-2 font-bold border-r">Name <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                  <th className="px-3 py-2 font-bold border-r">Batch No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                  <th className="px-3 py-2 font-bold border-r">Unit Cost <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                  <th className="px-3 py-2 font-bold border-r">Unit Price <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                  <th className="px-3 py-2 font-bold border-r">Total Quantity <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                  <th className="px-3 py-2 font-bold border-r">Available Quantity <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                  <th className="px-3 py-2 font-bold">Expires On <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                </tr>
              </thead>
              <tbody className="bg-white text-gray-400 italic">
                <tr>
                  <td colSpan={7} className="text-center py-10">No items found in this storage location</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Storage Location Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[500] flex items-start justify-center pt-20">
          <div className="bg-white w-full max-w-[480px] rounded-lg shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden border border-gray-100">
            <div className="bg-[#ececf6] px-4 py-2.5 border-b border-gray-200">
               <h3 className="text-[#4a4a7d] text-[14px] font-bold">Select Your Storage Location First</h3>
            </div>
            <div className="p-8">
               <div className="relative">
                  <select 
                    value={selectedLocation}
                    onChange={handleLocationSelect}
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-[15px] text-green-700 font-medium outline-none focus:ring-1 focus:ring-cyan-500 appearance-none bg-white shadow-sm"
                  >
                    <option value="">Select Location...</option>
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
                     <i className="fa-solid fa-chevron-down"></i>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const InvField: React.FC<{ label: string; type?: 'text' | 'select' }> = ({ label, type = 'text' }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">{label}</label>
    {type === 'select' ? (
      <select className="w-full border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white">
        <option></option>
      </select>
    ) : (
      <input type="text" className="w-full border border-gray-300 rounded px-2 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-xs" />
    )}
  </div>
);

const ActionBtn: React.FC<{ label: string }> = ({ label }) => (
  <button className="bg-[#008b8b] text-white py-1.5 rounded-sm text-[12px] font-medium shadow-sm hover:bg-[#007a7a] transition-colors">
    {label}
  </button>
);
