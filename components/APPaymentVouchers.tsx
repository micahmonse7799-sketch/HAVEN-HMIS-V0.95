
import React from 'react';

interface APPaymentVouchersProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const APPaymentVouchers: React.FC<APPaymentVouchersProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-blue-500 cursor-pointer hover:underline">Procurement</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Payment Vouchers</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Main Content Area */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
          <div className="px-4 py-2 border-b bg-[#f8f9fa]">
            <h2 className="text-[18px] font-medium text-gray-700">Payment Vouchers</h2>
          </div>

          <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
             {/* Left Section (9 cols) */}
             <div className="lg:col-span-9 flex flex-col gap-6">
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-6 bg-[#fcfcfc] p-3 border border-gray-100 rounded-sm">
                   <div className="flex items-center gap-2">
                      <span className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">View:</span>
                      <select className="border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white outline-none text-green-700 font-bold min-w-[120px]">
                        <option>Pending</option>
                        <option>Approved</option>
                        <option>All</option>
                      </select>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="text-[12px] font-bold text-gray-700">Between</span>
                      <div className="relative">
                        <input type="text" defaultValue="01/02/2026" className="border border-gray-300 rounded px-2 py-1.5 text-[14px] w-[110px] text-green-700 font-bold" />
                        <i className="fa-solid fa-calendar absolute right-2 top-2.5 text-gray-400 text-[10px]"></i>
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="text-[12px] font-bold text-gray-700">And</span>
                      <div className="relative">
                        <input type="text" defaultValue="01/02/2026" className="border border-gray-300 rounded px-2 py-1.5 text-[14px] w-[110px] text-green-700 font-bold" />
                        <i className="fa-solid fa-calendar absolute right-2 top-2.5 text-gray-400 text-[10px]"></i>
                      </div>
                   </div>
                   <button className="bg-[#5bc0de] text-white px-6 py-1.5 rounded-sm text-[12px] font-bold hover:bg-[#31b0d5] transition-colors shadow-sm">
                      View
                   </button>
                </div>

                {/* Table 1: Vouchers List */}
                <div className="flex flex-col gap-2">
                   <div className="flex justify-end items-center gap-2">
                      <span className="text-[12px] text-gray-500">Search:</span>
                      <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[200px]" />
                   </div>
                   <div className="border border-gray-200 rounded-sm overflow-x-auto">
                     <table className="w-full text-left text-[12px]">
                       <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                         <tr>
                           <th className="px-3 py-2 font-bold text-[#333] border-r">Voucher ID <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                           <th className="px-3 py-2 font-bold text-[#333] border-r">Created By <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                           <th className="px-3 py-2 font-bold text-[#333] border-r">Date Time Created <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                           <th className="px-3 py-2 font-bold text-[#333] border-r">Status <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                           <th className="px-3 py-2 font-bold text-[#333]">Date Time Approved <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         </tr>
                       </thead>
                       <tbody className="bg-white">
                          <VoucherRow id="1780" user="tuser" date="Apr 3, 2024 12:23 pm" status="Pending" approved="-" />
                          <VoucherRow id="1781" user="tuser" date="Apr 3, 2024 12:30 pm" status="Pending" approved="-" />
                          <VoucherRow id="1795" user="NURSE" date="Apr 7, 2024 11:00 am" status="Pending" approved="-" />
                          <VoucherRow id="1828" user="Nancy.M" date="Apr 15, 2024 11:27 am" status="Pending" approved="-" />
                          <VoucherRow id="1829" user="Nancy.M" date="Apr 15, 2024 11:35 am" status="Pending" approved="-" />
                          <VoucherRow id="1830" user="Nancy.M" date="Apr 15, 2024 12:50 pm" status="Pending" approved="-" />
                       </tbody>
                     </table>
                   </div>
                </div>

                {/* Table 2: Voucher Items */}
                <div className="flex flex-col gap-2 mt-4">
                   <h3 className="text-[15px] font-medium text-gray-700">Payment Voucher Items (Voucher No: )</h3>
                   <div className="flex justify-end items-center gap-2">
                      <span className="text-[12px] text-gray-500">Search:</span>
                      <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[200px]" />
                   </div>
                   <div className="border border-gray-200 rounded-sm overflow-x-auto min-h-[100px]">
                     <table className="w-full text-left text-[12px]">
                       <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                         <tr>
                           <th className="px-2 py-2 w-[40px] text-center border-r"><input type="checkbox" className="w-3.5 h-3.5" /></th>
                           <th className="px-3 py-2 font-bold text-[#333] border-r">Inv No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                           <th className="px-3 py-2 font-bold text-[#333] border-r">Supplier <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                           <th className="px-3 py-2 font-bold text-[#333] border-r">Alias <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                           <th className="px-3 py-2 font-bold text-[#333] border-r">Date <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                           <th className="px-3 py-2 font-bold text-[#333] border-r">Balance <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                           <th className="px-3 py-2 font-bold text-[#333] border-r text-blue-600">Approved Amount <span className="text-[10px] font-normal lowercase">(click to edit)</span></th>
                           <th className="px-3 py-2 font-bold text-[#333]">Approval Status <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         </tr>
                       </thead>
                       <tbody className="bg-white">
                          <tr>
                            <td colSpan={8} className="text-center py-10 text-gray-400 italic">No data available in table</td>
                          </tr>
                       </tbody>
                     </table>
                   </div>
                </div>
             </div>

             {/* Right Section Actions (3 cols) */}
             <div className="lg:col-span-3 flex flex-col gap-6 pt-4">
                <div className="space-y-2">
                   <div className="text-[14px] font-bold text-gray-700">Payment Voucher ID:</div>
                   <div className="text-[14px] font-bold text-gray-700">Status:</div>
                </div>

                <div className="flex flex-col gap-1.5">
                   <ActionButton label="Approve Payment Voucher" />
                   <ActionButton label="Reject Payment Voucher" />
                   <ActionButton label="Cancel Payment Voucher" />
                   <ActionButton label="Undo Approaval" />
                   <ActionButton label="View Payment Voucher" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VoucherRow: React.FC<{ id: string; user: string; date: string; status: string; approved: string }> = ({ id, user, date, status, approved }) => (
  <tr className="border-b hover:bg-gray-50 transition-colors">
    <td className="px-3 py-2 border-r">{id}</td>
    <td className="px-3 py-2 border-r">{user}</td>
    <td className="px-3 py-2 border-r">{date}</td>
    <td className="px-3 py-2 border-r font-medium">{status}</td>
    <td className="px-3 py-2">{approved}</td>
  </tr>
);

const ActionButton: React.FC<{ label: string }> = ({ label }) => (
  <button className="bg-white border border-gray-300 text-gray-700 text-[11px] font-medium py-1.5 px-4 rounded-sm hover:bg-gray-50 transition-colors w-full text-center shadow-xs">
    {label}
  </button>
);
