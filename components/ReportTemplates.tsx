
import React from 'react';

interface ReportTemplatesProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const ReportTemplates: React.FC<ReportTemplatesProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const sections = [
    { title: 'Laboratory Report', icon: true },
    { title: 'Customer Bill Report', icon: false },
    { title: 'Sick Note Report', icon: false },
    { title: 'Visit Summary Report', icon: false }
  ];

  const templates = [
    { id: 1, img: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?q=80&w=400&auto=format&fit=crop' },
    { id: 2, img: 'https://images.unsplash.com/photo-1618044733300-9472154094ee?q=80&w=400&auto=format&fit=crop' }
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
          <span className="text-[#43939e]">Report Templates</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#43939e] cursor-pointer hover:underline font-bold">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Main Workspace Card */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm flex flex-col mt-0.5 p-6">
         <h2 className="text-[19px] text-gray-700 font-medium mb-8">Select Report Templates</h2>

         <div className="flex flex-col gap-12">
            {sections.map((section, sIdx) => (
               <div key={section.title} className="flex flex-col gap-4">
                  <div className="flex items-center gap-1.5">
                     <h3 className="text-[16px] font-bold text-gray-700">{section.title}</h3>
                     {section.icon && <i className="fa-solid fa-cog text-gray-600 text-sm"></i>}
                  </div>
                  
                  <div className="flex gap-10">
                     {templates.map((template, tIdx) => (
                        <div key={tIdx} className="flex flex-col items-start gap-2 group">
                           <div className="relative w-40 h-52 border border-gray-200 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-gray-50 flex items-center justify-center">
                              {/* Thumbnail Placeholder */}
                              <div className="w-full h-full p-2 bg-white flex flex-col gap-2">
                                 <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                                 <div className="h-2 bg-gray-50 rounded w-full"></div>
                                 <div className="h-2 bg-gray-50 rounded w-full"></div>
                                 <div className="h-32 bg-gray-100/50 rounded flex items-center justify-center">
                                    <i className="fa-solid fa-file-invoice text-gray-200 text-3xl"></i>
                                 </div>
                                 <div className="flex justify-between items-center mt-auto">
                                    <div className="h-3 bg-blue-100 rounded w-1/3"></div>
                                    <div className="h-3 bg-gray-100 rounded w-1/4"></div>
                                 </div>
                              </div>
                              <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors cursor-pointer"></div>
                           </div>
                           <label className="flex items-center gap-3 cursor-pointer">
                              <input 
                                 type="radio" 
                                 name={`active-template-${sIdx}`} 
                                 defaultChecked={tIdx === 0}
                                 className="w-5 h-5 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500" 
                              />
                           </label>
                        </div>
                     ))}
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};
