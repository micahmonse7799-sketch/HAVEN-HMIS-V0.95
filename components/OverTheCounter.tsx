
import React from 'react';

interface OverTheCounterProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const OverTheCounter: React.FC<OverTheCounterProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-10">
      {/* Top Header Bar */}
      <div className="bg-white rounded-sm h-10 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <i onClick={onBack} className="fa-solid fa-times text-gray-400 cursor-pointer hover:text-gray-600 text-xs"></i>
          <h1 className="text-gray-700 font-semibold text-[14px]">Haven Hospital</h1>
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
          <span className="text-blue-500 cursor-pointer hover:underline">Billing</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Over The Counter</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Main Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2 border-b flex items-center justify-between bg-[#f8f9fa]">
          <h2 className="text-[15px] font-medium text-gray-600">Over the counter:</h2>
          <button className="bg-[#17a2b8] text-white px-3 py-1 rounded-sm text-[11px] hover:bg-[#138496]">Create New</button>
        </div>

        <div className="p-4 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="change-storage" className="w-4 h-4" />
                <label htmlFor="change-storage" className="text-[12px] text-gray-600 font-medium">Change Item Storage Location</label>
              </div>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] bg-white outline-none">
                <option>Pharmacy</option>
              </select>
              <div className="flex flex-col gap-1.5 mt-2">
                <label className="text-[12px] font-bold text-gray-700">Item Type</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] bg-white outline-none text-green-700 font-medium">
                  <option>Product</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-gray-700">Product Name</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] bg-white outline-none">
                  <option></option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4 text-[12px] text-gray-600 mt-2">
                <div>Qty in stock:</div>
                <div>Units:</div>
                <div>Unit Cost:</div>
                <div>VAT: %</div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="change-date" className="w-4 h-4" />
                <label htmlFor="change-date" className="text-[12px] text-gray-600 font-medium">Change Billing DateTime</label>
              </div>
              <div className="bg-[#fcf8e3] border border-[#faebcc] text-[#8a6d3b] px-3 py-1.5 rounded-sm text-[13px] font-medium">
                12/31/2025 05:58:00 AM
              </div>
              <div className="flex flex-col gap-1.5 mt-2">
                <label className="text-[12px] font-bold text-gray-700">Scheme</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] bg-white outline-none text-green-700 font-medium">
                  <option>Cash Payers</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-gray-700">Unit Price</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] outline-none" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="change-price" className="w-4 h-4" />
                <label htmlFor="change-price" className="text-[12px] text-gray-600 font-medium">Change Unit Price</label>
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-gray-700">Sale Quantity</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] outline-none" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-gray-700">% Discount</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] outline-none" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="use-discount" className="w-4 h-4" />
                <label htmlFor="use-discount" className="text-[12px] text-gray-600 font-medium">Use Discount Amount</label>
              </div>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] outline-none bg-gray-50" />
              <div className="flex flex-col gap-1.5 mt-2">
                <label className="text-[12px] font-bold text-gray-700">Comment</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] outline-none" />
              </div>
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-gray-700">Amount</label>
                <input type="text" readOnly className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] outline-none bg-gray-50" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-gray-700">Net Amount</label>
                <input type="text" readOnly className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] outline-none bg-gray-50" />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" id="update-if" className="w-4 h-4" />
                <label htmlFor="update-if" className="text-[12px] text-gray-600 font-medium">Update (If Item exists)</label>
              </div>
              <div className="flex justify-end mt-4">
                <button className="bg-[#17a2b8] text-white w-10 h-10 rounded flex items-center justify-center hover:bg-[#138496]">
                  <i className="fa-solid fa-plus text-lg"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Grid */}
        <div className="p-4 grid grid-cols-1 lg:grid-cols-4 gap-6 border-t border-gray-100">
          {/* Direct Sales Table */}
          <div className="lg:col-span-3">
             <h3 className="text-[15px] font-bold text-blue-800 underline mb-3">Direct Sales</h3>
             <div className="flex justify-end gap-2 items-center mb-2">
                <span className="text-[12px] text-gray-500">Search:</span>
                <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[200px]" />
              </div>
              <div className="border border-gray-100 rounded-sm overflow-hidden">
                <table className="w-full text-left text-[12px]">
                  <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                    <tr>
                      <th className="px-3 py-2 font-medium">No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40"></i></th>
                      <th className="px-3 py-2 font-medium">Name <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40"></i></th>
                      <th className="px-3 py-2 font-medium">DateTime Created <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40"></i></th>
                      <th className="px-3 py-2 font-medium">Net Amount <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40"></i></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={4} className="text-center py-4 text-gray-400 italic">No data available in table</td>
                    </tr>
                  </tbody>
                </table>
              </div>
          </div>

          {/* Payment Details */}
          <div className="bg-[#f8f9fa] border border-gray-200 rounded p-4 flex flex-col gap-4">
            <h3 className="text-[15px] font-bold text-blue-800 underline">Payment Details</h3>
            <div className="grid grid-cols-2 gap-2 text-[12px] text-gray-700">
               <div className="font-semibold">Sales No:</div>
               <div></div>
               <div className="font-semibold">Total Amount:</div>
               <div className="font-bold"></div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-semibold text-gray-600">Type of Sale</label>
                <select className="border border-gray-300 rounded px-2 py-1.5 text-[12px] bg-white text-green-700 font-medium">
                  <option>Cash Sale</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-semibold text-gray-600">Payment Mode</label>
                <select className="border border-gray-300 rounded px-2 py-1.5 text-[12px] bg-white text-green-700 font-medium">
                  <option>Cash</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-semibold text-gray-600">Cash:</label>
                <select className="border border-gray-300 rounded px-2 py-1.5 text-[12px] bg-white text-green-700 font-medium">
                  <option>Cash</option>
                </select>
              </div>

              <div className="grid grid-cols-1 gap-2 mt-2">
                 <div className="flex items-center justify-between gap-4">
                    <label className="text-[12px] font-bold text-gray-700">Amount To Pay</label>
                    <input type="text" readOnly defaultValue="0.00" className="w-[80px] border border-gray-300 rounded px-2 py-1 text-[12px] bg-white text-right font-bold text-green-700" />
                 </div>
                 <div className="flex items-center justify-between gap-4">
                    <label className="text-[12px] font-bold text-gray-700">Amount Tendered</label>
                    <input type="text" defaultValue="0" className="w-[80px] border border-gray-300 rounded px-2 py-1 text-[12px] bg-white text-right font-bold" />
                 </div>
                 <div className="flex items-center justify-between gap-4">
                    <label className="text-[12px] font-bold text-gray-700">Change</label>
                    <input type="text" readOnly defaultValue="0.00" className="w-[80px] border border-gray-300 rounded px-2 py-1 text-[12px] bg-white text-right font-bold text-green-700" />
                 </div>
              </div>

              <button className="bg-[#17a2b8] hover:bg-[#138496] text-white py-1.5 rounded text-[13px] font-bold transition-colors mt-2">
                Save Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
