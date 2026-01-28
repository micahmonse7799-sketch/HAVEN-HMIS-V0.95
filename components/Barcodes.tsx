
import React, { useState } from 'react';

interface BarcodesProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const Barcodes: React.FC<BarcodesProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>('4'); // Defaulting to '4' to match the reference image's selection

  const barcodeItems = [
    { no: '4', item: 'Sona moja', barcode: '406152370792' },
    { no: '8', item: 'COARTEM', barcode: '450782385237' },
    { no: '9', item: 'DAWANOL', barcode: '466619177012' },
    { no: '10', item: 'TRIHISTAMINE', barcode: '450368519315' },
    { no: '11', item: 'AMOXIL 500MG CAP', barcode: '427674910112' },
    { no: '12', item: 'ASPIRIN ADULT TAB 300MG', barcode: '411724078570' },
    { no: '13', item: 'CALPOL 120MG\\5ML SUSP', barcode: '419389655723' },
    { no: '14', item: 'D-GAM 500IU VIAL', barcode: '469151484990' },
    { no: '15', item: 'VISCOTEARS OPTH GEL', barcode: '467798371888' },
    { no: '16', item: 'AMPICLOX DAWA 100ML SUSPENSION', barcode: '451524658626' },
    { no: '17', item: 'AXACEF 250MG TABS (CEFUROXIME)', barcode: '413855270403' },
    { no: '18', item: 'ARTEMETHER-LUMEFANTRINE (COARTEM™) TABS', barcode: '480933921779' },
    { no: '19', item: 'SEFUR (CEFUROXIME) 750', barcode: '467209596381' },
    { no: '21', item: 'ZESTORIL - LISINOPRIL', barcode: '499960205943' },
    { no: '23', item: 'NEXIUM 40MG TABLETS', barcode: '483710584419' },
    { no: '28', item: 'ARTESUN 120MG INJ (ARTESUNATE SODIUM)', barcode: '407875739798' }
  ];

  const filteredItems = barcodeItems.filter(i => 
    i.item.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.barcode.includes(searchTerm)
  );

  return (
    <div className="flex flex-col gap-0 animate-in fade-in duration-300 pb-10">
      {/* Top Main MIS Header */}
      <div className="bg-white px-4 h-10 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-3">
          <i onClick={onBack} className="fa-solid fa-times text-gray-400 cursor-pointer hover:text-gray-600 text-xs font-black"></i>
          <h1 className="text-gray-700 font-semibold text-[14px]">Demo Hospital</h1>
        </div>
        <div className="flex items-center gap-12 text-[13px] text-gray-500">
          <div className="flex items-center gap-1">Branch: <span className="text-[#337ab7] cursor-pointer hover:underline font-bold">Main branch</span></div>
          <div className="flex items-center gap-1">Room: <span onClick={onOpenRoomModal} className="text-[#337ab7] cursor-pointer hover:underline font-bold">{currentRoom}</span></div>
          <button className="bg-[#17a2b8] text-white px-4 py-0.5 rounded-sm text-[11px] font-bold uppercase shadow-sm">Queue</button>
        </div>
      </div>

      {/* Breadcrumb row */}
      <div className="bg-[#fcfcfc] px-4 py-1.5 flex items-center justify-between border-b border-gray-200 text-[12px]">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-home text-[#337ab7]"></i>
          <span className="text-gray-300 opacity-60">/</span>
          <div className="flex items-center gap-1 text-[#337ab7] cursor-pointer hover:underline">
             <span>Configurations</span>
             <i className="fa-solid fa-caret-down text-[9px] mt-0.5 opacity-60"></i>
          </div>
          <span className="text-gray-300 opacity-60">/</span>
          <span className="text-gray-500 font-medium tracking-tight">Barcodes</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#337ab7] cursor-pointer hover:underline font-bold">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Main Workspace Area with Teal Backdrop */}
      <div className="bg-[#87c7cf]/10 p-2 min-h-screen">
        <div className="bg-white border border-gray-200 shadow-sm rounded-sm flex flex-col min-h-[750px]">
          {/* Internal Panel Header */}
          <div className="px-4 py-2 bg-[#f8f9fa] border-b border-gray-200 flex items-center justify-between shadow-xs">
            <h2 className="text-[17px] font-normal text-gray-600">Item Barcodes</h2>
            <div className="flex gap-1.5">
              <button className="bg-[#d9534f] text-white px-4 py-1.5 rounded-sm text-[12px] font-bold shadow-sm hover:bg-[#c9302c] transition-colors">Clear Barcodes</button>
              <button className="bg-[#5bc0de] text-white px-4 py-1.5 rounded-sm text-[12px] font-bold shadow-sm hover:bg-[#31b0d5] transition-colors">Generate Barcodes</button>
            </div>
          </div>

          <div className="p-4 flex flex-col flex-1 gap-4">
            {/* Search Box Right Aligned */}
            <div className="flex justify-end items-center gap-3">
              <label className="text-[14px] text-gray-500 font-bold">Search:</label>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 w-[280px] shadow-xs" 
              />
            </div>

            {/* Main Data Table */}
            <div className="border border-gray-200 rounded-sm overflow-hidden shadow-inner bg-white">
              <table className="w-full text-left text-[14px] border-collapse">
                <thead className="bg-[#eef5f6] text-gray-600 border-b border-gray-200">
                  <tr className="text-[11px] font-black uppercase tracking-wider">
                    <th className="px-4 py-3 w-[60px] text-center border-r border-gray-200">
                      <div className="flex items-center justify-center gap-3">
                        <div className="bg-blue-600 text-white w-4 h-4 flex items-center justify-center rounded-sm">
                          <i className="fa-solid fa-minus text-[9px]"></i>
                        </div>
                        <i className="fa-solid fa-arrows-up-down text-[10px] opacity-30"></i>
                      </div>
                    </th>
                    <th className="px-4 py-3 border-r border-gray-200 w-[80px]">
                      <div className="flex items-center justify-between">
                        No <i className="fa-solid fa-arrows-up-down text-[10px] opacity-30"></i>
                      </div>
                    </th>
                    <th className="px-4 py-3 border-r border-gray-200">
                      <div className="flex items-center justify-between">
                        Item <i className="fa-solid fa-arrows-up-down text-[10px] opacity-30"></i>
                      </div>
                    </th>
                    <th className="px-4 py-3 border-r border-gray-200 w-[200px]">
                      <div className="flex items-center justify-between">
                        Barcode <i className="fa-solid fa-arrows-up-down text-[10px] opacity-30"></i>
                      </div>
                    </th>
                    <th className="px-4 py-3 w-[50px] text-center border-r border-gray-200">
                      <i className="fa-solid fa-arrows-up-down text-[10px] opacity-30"></i>
                    </th>
                    <th className="px-4 py-3 w-[50px] text-center">
                      <i className="fa-solid fa-arrows-up-down text-[10px] opacity-30"></i>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredItems.map((item) => (
                    <tr 
                      key={item.no} 
                      onClick={() => setSelectedId(item.no)}
                      className={`transition-all cursor-pointer group border-b border-gray-100 ${selectedId === item.no ? 'bg-[#337ab7] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <td className="px-4 py-2 text-center border-r border-gray-100/50">
                        <input 
                          type="checkbox" 
                          checked={selectedId === item.no} 
                          readOnly 
                          className={`w-3.5 h-3.5 rounded-sm border-gray-300 focus:ring-0 ${selectedId === item.no ? 'accent-white' : ''}`} 
                        />
                      </td>
                      <td className={`px-4 py-2 border-r border-gray-100/50 font-bold ${selectedId === item.no ? 'text-white' : 'text-gray-400'}`}>
                        {item.no}
                      </td>
                      <td className={`px-4 py-2 border-r border-gray-100/50 font-bold uppercase tracking-tight ${selectedId === item.no ? 'text-white' : 'text-gray-700'}`}>
                        {item.item}
                      </td>
                      <td className={`px-4 py-2 border-r border-gray-100/50 font-mono text-[13px] ${selectedId === item.no ? 'text-white font-bold' : 'text-gray-700'}`}>
                        {item.barcode}
                      </td>
                      <td className="px-4 py-2 text-center border-r border-gray-100/50">
                        <i className={`fa-solid fa-print ${selectedId === item.no ? 'text-white' : 'text-blue-500'} transition-colors`}></i>
                      </td>
                      <td className="px-4 py-2 text-center">
                        {/* Placeholder action column */}
                      </td>
                    </tr>
                  ))}
                  {filteredItems.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-20 text-center text-gray-300 italic uppercase tracking-[0.3em] font-bold opacity-40">No records found matching search</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Pagination Info */}
            <div className="text-[13px] text-gray-400 font-bold px-1 italic">
              Showing 1 to {filteredItems.length} of 1,586 entries
            </div>

            {/* Bottom Actions Footer */}
            <div className="mt-auto flex items-center justify-between bg-[#f8f9fa] border border-gray-200 p-4 rounded shadow-xs">
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-bold text-gray-700 uppercase">View:</span>
                <div className="relative">
                  <select className="border border-gray-300 rounded px-4 py-1.5 text-[14px] bg-white outline-none focus:ring-1 focus:ring-cyan-500 appearance-none pr-10 text-green-700 font-black min-w-[220px] shadow-xs">
                    <option>Stock Items</option>
                    <option>Non-Stock Items</option>
                    <option>All Items</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-green-600">
                    <i className="fa-solid fa-chevron-down text-[10px]"></i>
                  </div>
                </div>
              </div>
              <button className="bg-[#5bc0de] hover:bg-[#31b0d5] text-white px-8 py-2 rounded-sm text-[12px] font-black uppercase tracking-widest shadow-md transition-all active:scale-95">
                Print Multiple Barcodes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
