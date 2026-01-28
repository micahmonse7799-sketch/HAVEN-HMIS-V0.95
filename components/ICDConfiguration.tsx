
import React, { useState } from 'react';

interface ICDConfigurationProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const ICDConfiguration: React.FC<ICDConfigurationProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const icdChapters = [
    { chapter: '01', range: '1A00-1H0Z', description: 'Certain infectious or parasitic diseases' },
    { chapter: '02', range: '2A00-2F9Z', description: 'Neoplasms' },
    { chapter: '03', range: '3A00-3C0Z', description: 'Diseases of the blood or blood-forming organs' },
    { chapter: '04', range: '4A00-4B4Z', description: 'Diseases of the immune system' },
    { chapter: '05', range: '5A00-5D46', description: 'Endocrine, nutritional or metabolic diseases' },
    { chapter: '06', range: '6A00-6E8Z', description: 'Mental, behavioural or neurodevelopmental disorders' },
    { chapter: '07', range: '7A00-7B2Z', description: 'Sleep-wake disorders' },
    { chapter: '08', range: '8A00-8E7Z', description: 'Diseases of the nervous system' },
    { chapter: '09', range: '9A00-9E1Z', description: 'Diseases of the visual system' },
    { chapter: '11', range: 'BA00-BE2Z', description: 'Diseases of the circulatory system' },
    { chapter: '10', range: 'AA00-AC0Z', description: 'Diseases of the ear or mastoid process' },
    { chapter: '12', range: 'CA00-CB7Z', description: 'Diseases of the respiratory system' },
    { chapter: '13', range: 'DA00-DE2Z', description: 'Diseases of the digestive system' },
    { chapter: '14', range: 'EA00-EM0Z', description: 'Diseases of the skin' },
    { chapter: '15', range: 'FA00-FC0Z', description: 'Diseases of the musculoskeletal system or connective tissue' },
    { chapter: '16', range: 'GA00-GC8Z', description: 'Diseases of the genitourinary system' },
  ];

  return (
    <div className="flex flex-col gap-1 animate-in fade-in duration-300 relative min-h-full">
      {/* Top Header Section */}
      <div className="bg-white px-4 py-2 flex items-center justify-between shadow-sm border-b border-gray-100">
        <h1 className="text-[#333] font-bold text-[18px]">Demo Hospital</h1>
        <div className="flex items-center gap-12 text-[14px] text-gray-700">
          <div>Branch: <span className="text-[#43939e] font-medium">Main branch</span></div>
          <div>Room: <span onClick={onOpenRoomModal} className="text-[#43939e] cursor-pointer hover:underline font-medium">{currentRoom}</span></div>
          <button className="bg-[#17a2b8] text-white px-4 py-1.5 rounded-md text-[13px] font-bold uppercase tracking-tight shadow-md">Queue</button>
        </div>
      </div>

      {/* Breadcrumb Row */}
      <div className="bg-[#f8f9fa] border-b border-gray-200 px-4 py-1.5 flex items-center justify-between text-[13px]">
        <div className="flex items-center gap-2">
          <i onClick={onBack} className="fa-solid fa-home text-[#43939e] cursor-pointer text-[14px]"></i>
          <span className="text-gray-300">/</span>
          <div className="flex items-center gap-1 cursor-pointer hover:text-[#43939e]">
             <span className="text-[#43939e]">Configurations</span>
             <i className="fa-solid fa-caret-down text-[10px] text-[#43939e] mt-0.5"></i>
          </div>
          <span className="text-gray-300">/</span>
          <span className="text-[#43939e]">ICD Configuration</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#43939e] cursor-pointer hover:underline font-bold">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Main Workspace Card */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm flex flex-col mt-0.5">
         <div className="px-4 py-2.5 bg-white border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-[17px] text-gray-700 font-normal">ICD Chapters</h2>
            <button className="bg-[#5bc0de] text-white px-5 py-1.5 rounded-sm text-[12px] font-bold shadow-sm hover:bg-[#31b0d5] transition-all active:scale-95">
               Save
            </button>
         </div>

         <div className="p-4 flex flex-col gap-4">
            {/* Search Area */}
            <div className="flex justify-end items-center gap-3">
               <span className="text-[14px] font-medium text-gray-600">Search:</span>
               <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none w-[260px] bg-white focus:ring-1 focus:ring-cyan-500 shadow-xs" 
               />
            </div>

            {/* ICD Chapters Table */}
            <div className="border border-gray-200 rounded-sm overflow-hidden shadow-inner bg-[#eef5f6]">
               <table className="w-full text-left text-[14px] border-collapse">
                  <thead className="bg-[#f8f9fa] text-gray-700 border-b border-gray-200">
                     <tr>
                        <th className="px-3 py-2 w-[40px] text-center border-r border-gray-200">
                           <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        </th>
                        <th className="px-6 py-2 font-bold border-r border-gray-200">Chapter</th>
                        <th className="px-6 py-2 font-bold border-r border-gray-200">Code Range</th>
                        <th className="px-6 py-2 font-bold">Description</th>
                     </tr>
                  </thead>
                  <tbody>
                     {icdChapters.map((item, idx) => (
                        <tr 
                           key={idx} 
                           className="bg-[#337ab7] text-white border-b border-white/20 hover:brightness-105 transition-all cursor-default select-none"
                        >
                           <td className="px-3 py-2 text-center border-r border-white/20">
                              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-white/30 text-blue-500 focus:ring-blue-400" />
                           </td>
                           <td className="px-6 py-2.5 border-r border-white/20 font-medium">
                              {item.chapter}
                           </td>
                           <td className="px-6 py-2.5 border-r border-white/20 font-medium">
                              {item.range}
                           </td>
                           <td className="px-6 py-2.5 font-medium italic">
                              {item.description}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            {/* Footer Stats */}
            <div className="flex justify-between items-center px-1 mt-2">
               <span className="text-[12px] text-gray-500 font-medium italic">
                  Showing 1 to {icdChapters.length} of 28 entries
               </span>
               <div className="flex gap-1">
                  <button className="px-3 py-1 border border-gray-300 rounded text-[12px] text-gray-400 cursor-not-allowed">Previous</button>
                  <button className="px-3 py-1 bg-[#337ab7] text-white rounded text-[12px]">1</button>
                  <button className="px-3 py-1 border border-gray-300 rounded text-[12px] text-blue-600 hover:bg-gray-50">2</button>
                  <button className="px-3 py-1 border border-gray-300 rounded text-[12px] text-blue-600 hover:bg-gray-50">Next</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
