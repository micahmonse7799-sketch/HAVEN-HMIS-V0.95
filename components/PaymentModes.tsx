
import React from 'react';

interface PaymentModesProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const PaymentModes: React.FC<PaymentModesProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-blue-500 cursor-pointer hover:underline">Accounts</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Payment Modes</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Payment Mode Details Form */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between">
          <h2 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">Payment Mode Details</h2>
          <div className="relative group">
             <button className="bg-[#5bc0de] text-white px-3 py-1 rounded-sm text-[11px] font-bold flex items-center gap-2 hover:bg-[#31b0d5]">
               Actions <i className="fa-solid fa-caret-down text-[9px]"></i>
             </button>
          </div>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-12 gap-y-4 items-start">
           {/* Left Form Block */}
           <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Name</label>
                 <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 shadow-xs" />
              </div>
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Payment Mode Category</label>
                 <div className="flex gap-2">
                    <select className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white">
                       <option></option>
                    </select>
                    <button className="text-blue-600 hover:text-blue-800 transition-colors">
                       <i className="fa-solid fa-plus-circle text-lg"></i>
                    </button>
                 </div>
              </div>
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Sub Account</label>
                 <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white">
                    <option></option>
                 </select>
              </div>
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">API</label>
                 <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white text-green-700 font-medium">
                    <option>None</option>
                 </select>
              </div>
           </div>

           {/* Right Form Block */}
           <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Selection Level</label>
                 <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white">
                    <option></option>
                 </select>
              </div>
              <div className="flex items-center gap-12 pt-1">
                 <div className="flex items-center gap-2">
                    <input type="checkbox" id="default" className="w-4 h-4 rounded border-gray-300 text-cyan-600" />
                    <label htmlFor="default" className="text-[13px] text-gray-700 font-medium">Is Default</label>
                 </div>
                 <div className="flex items-center gap-2">
                    <input type="checkbox" id="received" className="w-4 h-4 rounded border-gray-300 text-cyan-600" />
                    <label htmlFor="received" className="text-[13px] text-gray-700 font-medium">Can Be Received</label>
                 </div>
              </div>
              <div className="flex justify-end mt-2">
                 <button className="bg-[#17a2b8] text-white w-10 h-10 rounded flex items-center justify-center hover:bg-[#138496] shadow-md transition-all active:scale-95">
                    <i className="fa-solid fa-plus text-lg"></i>
                 </button>
              </div>
           </div>
        </div>

        {/* View Payment Modes Table */}
        <div className="border-t border-gray-200">
           <div className="px-4 py-2 bg-[#f8f9fa] border-b">
             <h2 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">View: Payment Modes</h2>
           </div>
           <div className="p-4 flex flex-col gap-4">
              <div className="flex justify-end items-center gap-2">
                 <span className="text-[12px] text-gray-500">Search:</span>
                 <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[200px]" />
              </div>

              <div className="border border-gray-200 rounded-sm overflow-x-auto min-h-[140px]">
                <table className="w-full text-left text-[12px] whitespace-nowrap">
                  <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                    <tr>
                      <th className="px-3 py-2 font-bold border-r">No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-3 py-2 font-bold border-r text-blue-800">Name <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-3 py-2 font-bold border-r">Sub Account <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-3 py-2 font-bold border-r">Category <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-3 py-2 font-bold border-r">Is Default <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-3 py-2 font-bold">Can Be Received <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-gray-700">
                     <PaymentRow no="1" name="Cash" sub="Cash At Hand" cat="Cash" isDef="Yes" canRec="Yes" />
                     <PaymentRow no="2" name="MPESA" sub="Mpesa" cat="Mobile Payment" isDef="No" canRec="Yes" />
                     <PaymentRow no="3" name="Airtel Money" sub="Airtel Money Income" cat="Cash" isDef="No" canRec="Yes" />
                     <PaymentRow no="4" name="Cheque" sub="Equity Bank" cat="Cheque" isDef="No" canRec="Yes" />
                     <PaymentRow no="5" name="Petty Cash" sub="Petty Cash" cat="Cash" isDef="No" canRec="No" />
                     <PaymentRow no="6" name="EFT" sub="Demo Main Bank" cat="EFT" isDef="No" canRec="No" />
                     <PaymentRow no="8" name="Visa" sub="Sidian Bank" cat="Credit Card" isDef="No" canRec="No" />
                     <PaymentRow no="9" name="EFT Sidian" sub="Sidian Bank" cat="Credit Card" isDef="No" canRec="No" />
                     <PaymentRow no="10" name="POCHI LA BIASHARA" sub="Mpesa" cat="Cash" isDef="No" canRec="No" />
                     <PaymentRow no="11" name="National Bank Cheque" sub="National Bank" cat="Cheque" isDef="No" canRec="No" />
                     <PaymentRow no="12" name="Debit Card" sub="Dtb Bank" cat="Cheque" isDef="No" canRec="No" />
                  </tbody>
                </table>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const PaymentRow: React.FC<{ no: string; name: string; sub: string; cat: string; isDef: string; canRec: string }> = ({ no, name, sub, cat, isDef, canRec }) => (
  <tr className="border-b hover:bg-gray-50 transition-colors">
    <td className="px-3 py-2 border-r">{no}</td>
    <td className="px-3 py-2 border-r font-medium text-blue-700 cursor-pointer">{name}</td>
    <td className="px-3 py-2 border-r">{sub}</td>
    <td className="px-3 py-2 border-r">{cat}</td>
    <td className="px-3 py-2 border-r font-bold text-green-700">{isDef}</td>
    <td className="px-3 py-2 font-bold text-green-700">{canRec}</td>
  </tr>
);
