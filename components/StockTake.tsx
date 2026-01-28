
import React, { useState } from 'react';

interface StockTakeProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const StockTake: React.FC<StockTakeProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
    "Mobile Clinic A", "stores1", "Out Patient", "Store 20", "emergency",
    "Emergency", "Main stores", "Main Storess", "Ambulance", "CEOs Reception",
    "Pharmacy 1", "Stores 2", "PHARMACY2", "Pharmacy 2", "main store",
    "Tumaini", "Pharmacy A", "Test Store", "Nursing station inpatient",
    "South Store", "Store", "Donation Store", "vaccines store", "maternity",
    "Dispensary", "Billing Office", "billing office", "mch", "Renal Unit",
    "peadiatrics", "Warehouse 2", "Morgue", "Remote Storage Location(Main Branch)",
    "Billing/Credit", "Canteen Store", "Hospital Farm", "Opd", "IT lab store",
    "NHIF (Main Store)", "supply room", "Specica Store", "Own Drugs"
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
          <span className="text-gray-400 font-medium">Stock Take</span>
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
            Stock Take <span className="text-[12px] font-normal text-gray-400 cursor-pointer italic">(click here to change)</span>
          </h2>
          <div className="relative group">
             <button className="bg-[#5bc0de] text-white px-3 py-1 rounded-sm text-[11px] font-bold flex items-center gap-2 hover:bg-[#31b0d5]">
               Actions <i className="fa-solid fa-caret-down text-[9px]"></i>
             </button>
          </div>
        </div>

        <div className="p-4 flex flex-col gap-6">
           {/* Top Split Sections */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left Column: View Stock Takes */}
              <div className="flex flex-col gap-3">
                 <div>
                    <button className="bg-[#00a699] text-white px-5 py-1.5 rounded-sm text-[12px] font-bold shadow-sm">New Stock Take</button>
                 </div>
                 <h3 className="text-[13px] font-bold text-blue-800 underline uppercase tracking-tight">View: Stock Takes</h3>
                 <div className="border border-gray-200 rounded-sm overflow-hidden min-h-[100px]">
                    <table className="w-full text-left text-[12px]">
                       <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                          <tr>
                             <th className="px-3 py-2 font-bold border-r">No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                             <th className="px-3 py-2 font-bold border-r">Created On <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                             <th className="px-3 py-2 font-bold">Created By <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                          </tr>
                       </thead>
                       <tbody className="bg-white text-center italic text-gray-400">
                          <tr>
                             <td colSpan={3} className="py-6">No data available in table</td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
              </div>

              {/* Right Column: Stock Take Details & Items */}
              <div className="flex flex-col gap-3">
                 <div className="grid grid-cols-2 gap-y-1 gap-x-8 text-[12px] text-gray-700">
                    <div className="flex justify-between border-b border-gray-50 pb-0.5"><span className="font-bold">Stock Take No:</span><span></span></div>
                    <div className="flex justify-between border-b border-gray-50 pb-0.5"><span className="font-bold">Created On:</span><span></span></div>
                    <div className="flex justify-between border-b border-gray-50 pb-0.5"><span className="font-bold">Created By:</span><span></span></div>
                    <div className="flex justify-between border-b border-gray-50 pb-0.5"><span className="font-bold">Status:</span><span></span></div>
                 </div>

                 <h3 className="text-[13px] font-bold text-blue-800 underline uppercase tracking-tight mt-1">View: Stock Take Items</h3>
                 <div className="flex justify-end mb-1">
                    <div className="flex items-center gap-2">
                       <span className="text-[11px] text-gray-500">Search:</span>
                       <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[11px] outline-none w-[120px]" />
                    </div>
                 </div>
                 <div className="border border-gray-200 rounded-sm overflow-hidden min-h-[100px]">
                    <table className="w-full text-left text-[12px]">
                       <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                          <tr>
                             <th className="px-3 py-2 font-bold border-r">Name <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                             <th className="px-3 py-2 font-bold border-r">Batch <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                             <th className="px-3 py-2 font-bold border-r">Units <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                             <th className="px-3 py-2 font-bold border-r">Sys Qty <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                             <th className="px-3 py-2 font-bold">New Qty <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                          </tr>
                       </thead>
                       <tbody className="bg-white text-center italic text-gray-400">
                          <tr>
                             <td colSpan={5} className="py-6">No data available in table</td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>

           {/* Filter Bar Row */}
           <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
              <div className="flex flex-wrap items-center gap-6">
                 <div className="flex items-center gap-2">
                    <span className="text-[12px] font-bold text-gray-700">View:</span>
                    <select className="border border-gray-300 rounded px-2 py-1.5 text-[13px] bg-white outline-none text-green-700 font-bold min-w-[120px]">
                       <option>Pending</option>
                       <option>Authorized</option>
                       <option>All</option>
                    </select>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-[12px] font-bold text-gray-700">Btwn:</span>
                    <div className="relative">
                       <input type="text" defaultValue="01/02/2026" className="border border-gray-300 rounded px-2 py-1.5 text-[13px] w-[110px] text-green-700 font-bold" />
                       <i className="fa-solid fa-calendar absolute right-2 top-2.5 text-gray-400 text-[10px]"></i>
                    </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-[12px] font-bold text-gray-700">And:</span>
                    <div className="relative">
                       <input type="text" defaultValue="01/02/2026" className="border border-gray-300 rounded px-2 py-1.5 text-[13px] w-[110px] text-green-700 font-bold" />
                       <i className="fa-solid fa-calendar absolute right-2 top-2.5 text-gray-400 text-[10px]"></i>
                    </div>
                 </div>
                 <button className="bg-[#5bc0de] text-white px-5 py-1.5 rounded-sm text-[12px] font-bold hover:bg-[#31b0d5] transition-colors shadow-sm">
                    View
                 </button>
              </div>

              {/* Product Search Area */}
              <div className="flex items-center gap-2">
                 <div className="flex border border-gray-300 rounded overflow-hidden">
                    <div className="bg-[#f0f2f5] px-3 py-1.5 border-r border-gray-200">
                       <i className="fa-solid fa-magnifying-glass text-gray-400 text-xs"></i>
                    </div>
                    <input type="text" placeholder="Search product here..." className="px-3 py-1.5 text-[13px] outline-none w-[200px]" />
                 </div>
                 <button className="bg-white border border-gray-300 p-2 rounded hover:bg-gray-50">
                    <i className="fa-solid fa-barcode text-gray-600"></i>
                 </button>
                 <button className="bg-white border border-gray-300 px-4 py-1.5 rounded text-[13px] font-medium text-gray-700">Search</button>
              </div>
           </div>

           {/* View Products Bottom Table */}
           <div className="border-t border-gray-100 pt-4">
              <h3 className="text-[14px] font-bold text-gray-600 uppercase tracking-tight mb-3">View: Products</h3>
              <div className="flex justify-end mb-2">
                 <div className="flex items-center gap-2">
                    <span className="text-[12px] text-gray-500">Search:</span>
                    <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[200px]" />
                 </div>
              </div>
              <div className="border border-gray-200 rounded-sm overflow-x-auto min-h-[250px]">
                 <table className="w-full text-left text-[12px] whitespace-nowrap">
                    <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                       <tr>
                          <th className="px-3 py-2 font-bold border-r">Name <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                          <th className="px-3 py-2 font-bold border-r">Batch <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                          <th className="px-3 py-2 font-bold border-r">Cost <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                          <th className="px-3 py-2 font-bold border-r">Physical Qty <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                          <th className="px-3 py-2 font-bold">System Qty <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                       </tr>
                    </thead>
                    <tbody className="bg-white text-center italic text-gray-400">
                       <tr>
                          <td colSpan={5} className="py-20">No data available in table</td>
                       </tr>
                    </tbody>
                 </table>
              </div>
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
                    {locations.map((loc, idx) => (
                      <option key={`${loc}-${idx}`} value={loc}>{loc}</option>
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
