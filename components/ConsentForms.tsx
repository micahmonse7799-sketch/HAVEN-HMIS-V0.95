
import React, { useState } from 'react';

interface ConsentFormsProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const ConsentForms: React.FC<ConsentFormsProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [templateName, setTemplateName] = useState('Consent Form Template');

  const tags = [
    'Patient Name', 'OP #', 'Next Of Kin', 'Prescription', 'Diagnosis', 
    'Visit Date', 'Age', 'Occupation', 'Residence', 'Operation', 
    'Doctor', 'Signature'
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
          <span className="text-[#43939e]">Consent Forms</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#43939e] cursor-pointer hover:underline font-bold">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="bg-white border border-gray-200 shadow-sm flex flex-col flex-1 overflow-hidden mt-0.5">
         {/* Template Header with Actions */}
         <div className="px-4 py-2.5 bg-white border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-[17px] text-gray-700 font-normal">{templateName}</h2>
            <div className="flex gap-1.5">
               <ActionButton label="Save" color="bg-[#17a2b8]" />
               <ActionButton label="Load" color="bg-[#17a2b8]" />
               <ActionButton label="New" color="bg-[#17a2b8]" />
               <ActionButton label="Deactivate" color="bg-[#f0ad4e]" />
            </div>
         </div>

         {/* Tags Row */}
         <div className="bg-[#eef5f6] border-b border-gray-200 py-2 overflow-x-auto no-scrollbar">
            <div className="flex px-4 gap-4 min-w-max">
               {tags.map((tag) => (
                  <button 
                     key={tag} 
                     className="text-[14px] text-[#337ab7] hover:underline whitespace-nowrap"
                  >
                     {tag}
                  </button>
               ))}
            </div>
         </div>

         {/* Editor Toolbar */}
         <div className="bg-[#f8f9fa] border border-gray-200 p-2.5 flex flex-wrap gap-x-6 gap-y-3">
            <ToolbarGroup>
               <ToolbarIcon icon="fa-scissors" />
               <ToolbarIcon icon="fa-copy" />
               <ToolbarIcon icon="fa-paste" />
               <ToolbarIcon icon="fa-file-lines" />
               <ToolbarIcon icon="fa-clipboard-list" />
            </ToolbarGroup>
            
            <ToolbarGroup>
               <ToolbarIcon icon="fa-rotate-left" />
               <ToolbarIcon icon="fa-rotate-right" />
            </ToolbarGroup>

            <ToolbarGroup>
               <ToolbarIcon icon="fa-spell-check" />
            </ToolbarGroup>

            <ToolbarGroup>
               <ToolbarIcon icon="fa-image" />
               <ToolbarIcon icon="fa-table" />
               <ToolbarIcon icon="fa-grip-lines" />
               <ToolbarIcon icon="fa-omega" />
               <ToolbarIcon icon="fa-magnifying-glass" />
               <ToolbarIcon icon="fa-print" />
            </ToolbarGroup>

            <ToolbarGroup>
               <ToolbarIcon icon="fa-bold" bold />
               <ToolbarIcon icon="fa-italic" />
               <ToolbarIcon icon="fa-underline" />
               <ToolbarIcon icon="fa-subscript" />
               <ToolbarIcon icon="fa-superscript" />
            </ToolbarGroup>

            <ToolbarGroup>
               <ToolbarIcon icon="fa-list-ol" />
               <ToolbarIcon icon="fa-list-ul" />
            </ToolbarGroup>

            <ToolbarGroup>
               <ToolbarIcon icon="fa-indent" className="opacity-30" />
               <ToolbarIcon icon="fa-outdent" className="opacity-30" />
               <ToolbarIcon icon="fa-quote-left" />
            </ToolbarGroup>

            <div className="flex items-center gap-2">
               <div className="flex items-center border border-gray-300 rounded px-2 py-0.5 bg-white text-[12px] gap-2 cursor-pointer shadow-xs">
                  <span>Styles</span>
                  <i className="fa-solid fa-caret-down text-[8px] opacity-40"></i>
               </div>
               <div className="flex items-center border border-gray-300 rounded px-2 py-0.5 bg-white text-[12px] gap-2 cursor-pointer shadow-xs">
                  <span>Format</span>
                  <i className="fa-solid fa-caret-down text-[8px] opacity-40"></i>
               </div>
            </div>
         </div>

         {/* Editor Area */}
         <div className="flex-1 bg-white p-12 overflow-y-auto custom-scrollbar">
            {/* 
                Fix: Removed invalid 'placeholder' attribute from div to resolve TypeScript compilation error.
                The placeholder attribute is not standard for div elements and causes a type mismatch in React.
            */}
            <div 
               contentEditable 
               className="w-full h-full outline-none text-[15px] leading-relaxed text-gray-800 min-h-[600px]"
            >
            </div>
         </div>
      </div>
    </div>
  );
};

const ActionButton: React.FC<{ label: string; color: string }> = ({ label, color }) => (
   <button className={`${color} text-white px-4 py-1 rounded shadow-sm text-[13px] font-medium transition-all hover:brightness-95 active:scale-95`}>
      {label}
   </button>
);

const ToolbarGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => (
   <div className="flex items-center gap-1.5 border-r border-gray-300 pr-4 last:border-r-0">
      {children}
   </div>
);

const ToolbarIcon: React.FC<{ icon: string; bold?: boolean; className?: string }> = ({ icon, bold, className = "" }) => (
   <div className={`p-1.5 hover:bg-white hover:shadow-sm rounded transition-all cursor-pointer flex items-center justify-center min-w-[28px] ${className}`}>
      <i className={`fa-solid ${icon} ${bold ? 'font-black' : ''} text-[13px] text-gray-600`}></i>
   </div>
);
