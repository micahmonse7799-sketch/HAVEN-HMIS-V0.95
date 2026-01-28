
import React from 'react';

interface ARInvoicesProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const ARInvoices: React.FC<ARInvoicesProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-10">
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
          <span className="text-blue-500 cursor-pointer hover:underline">Billing</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">A/R Invoices</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Invoice Details Container */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="px-4 py-2 border-b bg-[#f8f9fa]">
          <h2 className="text-[15px] font-medium text-gray-600">Invoice Details</h2>
        </div>
        
        <div className="p-4 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
           <div className="lg:col-span-3">
              {/* Search Section */}
              <div className="border border-gray-200 rounded-sm p-4 pt-6 relative mb-6">
                <span className="absolute -top-3 left-4 bg-white px-2 text-[12px] font-semibold text-gray-500">ARInvoice(s) Search</span>
                <div className="flex items-center gap-3">
                  <span className="text-[13px] text-gray-600">Search Word:</span>
                  <input type="text" className="border border-gray-300 rounded px-3 py-1 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 w-[200px]" />
                  <button className="bg-[#17a2b8] text-white px-4 py-1 rounded-sm text-[12px] font-medium">Search Invoice(s)</button>
                  <span className="text-[12px] text-gray-400">(Invoice To/Invoice No)</span>
                </div>
              </div>

              {/* Data Grid Section */}
              <div className="border border-gray-200 rounded-sm p-4 pt-6 relative">
                <span className="absolute -top-3 left-4 bg-white px-2 text-[12px] font-semibold text-gray-500">Invoice</span>
                <div className="grid grid-cols-2 gap-y-1 gap-x-12 text-[13px] text-gray-700">
                  <DataRow label="A/R Invoice No:" value="" />
                  <DataRow label="DateTime Created:" value="" />
                  <DataRow label="Bill No:" value="" />
                  <DataRow label="Due date:" value="" />
                  <DataRow label="Customer Name:" value="" />
                  <DataRow label="Amount Receivable:" value="" />
                  <DataRow label="Invoice To:" value="" />
                  <DataRow label="Cover Amount:" value="" />
                  <DataRow label="Telephone#1:" value="" />
                  <DataRow label="Discount Amount:" value="" />
                  <DataRow label="Address:" value="" />
                  <DataRow label="Write-Off Amount:" value="" />
                  <DataRow label="Email:" value="" />
                  <DataRow label="Total Amount Paid:" value="" />
                  <DataRow label="Status:" value="" />
                  <DataRow label="Outstanding Balance:" value="" />
                </div>
              </div>
           </div>

           {/* Sidebar Actions & Selected Info */}
           <div className="flex flex-col gap-4">
              <div className="border border-gray-200 rounded-sm p-4 pt-6 relative">
                 <span className="absolute -top-3 left-4 bg-white px-2 text-[12px] font-semibold text-gray-500">Selected Invoices</span>
                 <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                       <input type="checkbox" id="batch" className="w-4 h-4" />
                       <label htmlFor="batch" className="text-[13px] text-gray-700">Batch Payment</label>
                    </div>
                    <div className="flex items-center justify-between text-[14px]">
                       <span className="font-bold text-gray-600">Total:</span>
                       <span className="font-bold text-blue-800">0.00</span>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col gap-1 text-center">
                 <div className="text-[11px] text-gray-500 mb-1">View Invoice Detailed</div>
                 <ActionBtn label="View Invoice" hasArrow />
                 <ActionBtn label="Receive Payment" color="text-[#5cb85c]" />
                 <ActionBtn label="Apply Copayment" color="text-[#5cb85c]" />
                 <ActionBtn label="Reconcile Payment" hasArrow color="text-[#5cb85c]" />
                 <ActionBtn label="Create Credit Note" color="text-blue-400" />
                 <ActionBtn label="Sales Discount" color="text-blue-400" />
                 <ActionBtn label="Send Smart Claim" color="text-[#5cb85c]" />
                 <ActionBtn label="Mark as Dispatched" color="text-[#5cb85c]" />
                 <ActionBtn label="Write-Off" hasArrow color="text-red-500" />
                 <ActionBtn label="Cancel Invoice" color="text-red-500" />
              </div>
           </div>
        </div>

        {/* View Invoices Table */}
        <div className="border-t border-gray-200">
          <div className="px-4 py-2 bg-[#f8f9fa] border-b">
            <h2 className="text-[14px] font-medium text-gray-600">View: Invoices</h2>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex gap-1">
                <button className="border border-gray-300 px-3 py-1 text-[11px] hover:bg-gray-50">Copy</button>
                <button className="border border-gray-300 px-3 py-1 text-[11px] hover:bg-gray-50">CSV</button>
                <button className="border border-gray-300 px-3 py-1 text-[11px] hover:bg-gray-50">Excel</button>
                <button className="border border-gray-300 px-3 py-1 text-[11px] hover:bg-gray-50">Print</button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-gray-500">Search:</span>
                <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[200px]" />
              </div>
            </div>

            <div className="border border-gray-100 rounded-sm overflow-x-auto min-h-[120px]">
              <table className="w-full text-left text-[12px]">
                <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                  <tr>
                    <th className="px-2 py-2"><input type="checkbox" className="w-3.5 h-3.5" /></th>
                    <th className="px-2 py-2 font-medium">Inv No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40"></i></th>
                    <th className="px-2 py-2 font-medium">Scheme <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40"></i></th>
                    <th className="px-2 py-2 font-medium">Patient <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40"></i></th>
                    <th className="px-2 py-2 font-medium">Claim ID <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40"></i></th>
                    <th className="px-2 py-2 font-medium">Mem No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40"></i></th>
                    <th className="px-2 py-2 font-medium">Created On <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40"></i></th>
                    <th className="px-2 py-2 font-medium">Net Amount <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40"></i></th>
                    <th className="px-2 py-2 font-medium">Amount Paid <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40"></i></th>
                    <th className="px-2 py-2 font-medium">Discount <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40"></i></th>
                    <th className="px-2 py-2 font-medium">Credit Note <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40"></i></th>
                    <th className="px-2 py-2 font-medium">Write-Off <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40"></i></th>
                    <th className="px-2 py-2 font-medium">Rebate <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40"></i></th>
                    <th className="px-2 py-2 font-medium">Balance <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40"></i></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={14} className="text-center py-6 text-gray-400 italic">No data available in table</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-baseline border-b border-gray-50 pb-0.5">
    <span className="font-bold text-gray-700 whitespace-nowrap">{label}</span>
    <span className="font-medium text-gray-800">{value || ''}</span>
  </div>
);

const ActionBtn: React.FC<{ label: string; color?: string; hasArrow?: boolean }> = ({ label, color = "text-gray-700", hasArrow = false }) => (
  <button className={`bg-white border border-gray-200 px-3 py-1 text-[11px] font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 ${color}`}>
    {label} {hasArrow && <i className="fa-solid fa-caret-down text-[9px]"></i>}
  </button>
);
