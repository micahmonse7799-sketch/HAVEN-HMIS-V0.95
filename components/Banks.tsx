
import React from 'react';

interface BanksProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const Banks: React.FC<BanksProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-gray-400 font-medium">Banks</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Bank Details Form Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b bg-[#f8f9fa]">
          <h2 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">Bank Details</h2>
        </div>

        <div className="p-4 flex flex-col gap-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-4">
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Name</label>
                 <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 shadow-xs" />
              </div>
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Account No</label>
                 <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 shadow-xs" />
              </div>
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Branch Code</label>
                 <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 shadow-xs" />
              </div>
              
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Bank Code</label>
                 <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 shadow-xs" />
              </div>
              <div className="flex flex-col gap-1.5">
                 <label className="text-[12px] font-bold text-gray-700 uppercase tracking-tight">Branch</label>
                 <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 shadow-xs" />
              </div>
              <div className="flex items-end justify-end">
                 <button className="bg-[#17a2b8] text-white w-10 h-10 rounded flex items-center justify-center hover:bg-[#138496] shadow-md transition-all active:scale-95">
                    <i className="fa-solid fa-plus text-lg"></i>
                 </button>
              </div>
           </div>
        </div>

        {/* View Section */}
        <div className="border-t border-gray-200">
           <div className="px-4 py-2 bg-[#f8f9fa] border-b">
             <h2 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">View: Banks</h2>
           </div>
           <div className="p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between mb-1">
                 <div className="flex gap-1">
                    <button className="border border-gray-300 bg-white px-2 py-1 text-[10px] text-gray-600 rounded shadow-xs hover:bg-gray-50">Excel</button>
                    <button className="border border-gray-300 bg-white px-2 py-1 text-[10px] text-gray-600 rounded shadow-xs hover:bg-gray-50">CSV</button>
                    <button className="border border-gray-300 bg-white px-2 py-1 text-[10px] text-gray-600 rounded shadow-xs hover:bg-gray-50">Print</button>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-500">Search:</span>
                    <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[11px] outline-none w-[200px]" />
                 </div>
              </div>

              <div className="border border-gray-200 rounded-sm overflow-hidden min-h-[300px]">
                <table className="w-full text-left text-[12px] whitespace-nowrap">
                  <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                    <tr>
                      <th className="px-4 py-2 font-bold border-r">Bank ID <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-4 py-2 font-bold border-r text-blue-800">Name <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-4 py-2 font-bold border-r">Account No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      <th className="px-4 py-2 font-bold">Branch <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-gray-700">
                     <BankRow id="1" name="Demo Main Bank" account="72423492348020" branch="Nairobi CBD" />
                     <BankRow id="2" name="Sidian Bank" account="-" branch="" />
                     <BankRow id="3" name="KCB" account="7123456789" branch="Meru" />
                     <BankRow id="4" name="EQUITY BANK" account="777111222333" branch="MOI AVENU" />
                     <BankRow id="5" name="SBI Bank" account="9876543210" branch="Law Garden" />
                     <BankRow id="6" name="Equity Bank" account="80000232" branch="MOMBASA ROAD" />
                     <BankRow id="7" name="some bank" account="12345678" branch="ngara" />
                     <BankRow id="8" name="Cooperative Bank" account="01148676569400" branch="Co-op Hse" />
                     <BankRow id="88" name="standard chartered JAMU LTD" account="" branch="" />
                     <BankRow id="136" name="DTB BANK" account="" branch="" />
                     <BankRow id="221" name="National Bank" account="" branch="" />
                  </tbody>
                </table>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const BankRow: React.FC<{ id: string; name: string; account: string; branch: string }> = ({ id, name, account, branch }) => (
  <tr className="border-b hover:bg-gray-50 transition-colors">
    <td className="px-4 py-2 border-r">{id}</td>
    <td className="px-4 py-2 border-r font-medium text-blue-700">{name}</td>
    <td className="px-4 py-2 border-r">{account}</td>
    <td className="px-4 py-2">{branch}</td>
  </tr>
);
