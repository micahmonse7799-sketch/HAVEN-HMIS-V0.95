
import React from 'react';

interface ProFormaInvoicesProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const ProFormaInvoices: React.FC<ProFormaInvoicesProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-gray-400 font-medium">Pro Forma Invoices</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Pro Forma Invoice Header */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between">
          <h2 className="text-[15px] font-medium text-gray-600">Pro Forma Invoice:</h2>
          <button className="bg-[#5bc0de] text-white px-3 py-1 rounded-sm text-[12px] flex items-center gap-2">
            Actions <i className="fa-solid fa-caret-down text-[9px]"></i>
          </button>
        </div>
        
        <div className="p-4">
           <div className="grid grid-cols-4 gap-y-1 gap-x-12 text-[13px] text-gray-700">
              <DataLine label="Invoice No" value="" />
              <DataLine label="Patient" value="" />
              <DataLine label="Date of Admission" value="" />
              <DataLine label="Created On" value="" />
              
              <DataLine label="Scheme" value="" />
              <DataLine label="OPD No" value="" />
              <DataLine label="Date of Discharge" value="" />
              <DataLine label="Created By" value="" />
              
              <DataLine label="Visit No" value="" />
              <DataLine label="IP No" value="" />
              <DataLine label="Status" value="" />
              <DataLine label="Cost" value="" />
           </div>
        </div>

        {/* View Table Section */}
        <div className="border-t border-gray-200">
          <div className="px-4 py-2 bg-[#f8f9fa] border-b">
            <h2 className="text-[14px] font-medium text-gray-600">View: Pro Forma Invoices</h2>
          </div>
          <div className="p-4">
            <div className="flex justify-end gap-2 items-center mb-4">
                <span className="text-[12px] text-gray-500">Search:</span>
                <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[220px]" />
            </div>

            <div className="border border-gray-100 rounded-sm overflow-x-auto min-h-[120px]">
              <table className="w-full text-left text-[12px]">
                <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                  <tr>
                    <th className="px-4 py-2 font-medium">No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                    <th className="px-4 py-2 font-medium">Patient <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                    <th className="px-4 py-2 font-medium">Scheme <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                    <th className="px-4 py-2 font-medium">Created On <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                    <th className="px-4 py-2 font-medium">Created By <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                    <th className="px-4 py-2 font-medium">Status <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                    <th className="px-4 py-2 font-medium">DOA <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                    <th className="px-4 py-2 font-medium">DOD <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                    <th className="px-4 py-2 font-medium">Total Cost <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={9} className="text-center py-6 text-gray-400 italic">No data available in table</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-[12px] text-gray-500">Showing 0 to 0 of 0 entries</div>
          </div>
        </div>

        {/* Footer Filter Bar */}
        <div className="p-4 border-t border-gray-100 flex items-center gap-4">
           <div className="flex items-center gap-2">
              <span className="text-[13px] text-gray-600">Status</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-[13px] bg-white text-green-700 min-w-[150px]">
                 <option>Pending Approval</option>
                 <option>Approved</option>
                 <option>Rejected</option>
                 <option>All</option>
              </select>
           </div>
           <div className="flex items-center gap-2">
              <span className="text-[13px] text-gray-600 font-bold">Between</span>
              <div className="relative">
                 <input type="text" defaultValue="01/01/2026" className="border border-gray-300 rounded px-2 py-1 text-[13px] w-[110px]" />
                 <i className="fa-solid fa-calendar absolute right-2 top-2 text-gray-400 text-[10px]"></i>
              </div>
           </div>
           <div className="flex items-center gap-2">
              <span className="text-[13px] text-gray-600 font-bold">And</span>
              <div className="relative">
                 <input type="text" defaultValue="01/01/2026" className="border border-gray-300 rounded px-2 py-1 text-[13px] w-[110px]" />
                 <i className="fa-solid fa-calendar absolute right-2 top-2 text-gray-400 text-[10px]"></i>
              </div>
           </div>
           <button className="bg-[#5bc0de] text-white px-4 py-1.5 rounded text-[13px] font-medium">View</button>
        </div>
      </div>
    </div>
  );
};

const DataLine: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col gap-0.5">
    <span className="font-bold text-gray-700 text-[12px]">{label}</span>
    <span className="font-medium text-gray-400 text-[13px] min-h-[1.2rem]">{value || ''}</span>
  </div>
);
