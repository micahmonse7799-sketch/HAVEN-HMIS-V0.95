
import React from 'react';

interface WidgetProps {
  title: string;
  icon?: string;
  children?: React.ReactNode;
  emptyMessage?: string;
  height?: string;
}

export const Widget: React.FC<WidgetProps> = ({ title, icon, children, emptyMessage, height = 'h-auto' }) => {
  return (
    <div className={`bg-white rounded-[2rem] shadow-sm border border-slate-100 flex flex-col overflow-hidden transition-all hover:shadow-2xl hover:shadow-slate-200/40 ${height}`}>
      <div className="p-6 px-8 border-b border-slate-50 bg-[#fcfdfe] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shadow-sm">
            {icon && <i className={`fa-solid ${icon} text-indigo-600 text-sm`}></i>}
          </div>
          <h3 className="text-[14px] font-black text-slate-800 uppercase tracking-[0.2em]">{title}</h3>
        </div>
        <div className="flex gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-100"></div>
        </div>
      </div>
      <div className="flex-1">
        {emptyMessage ? (
          <div className="p-10 h-full flex items-center justify-center">
            <div className="bg-slate-50 text-slate-400 rounded-3xl py-12 px-12 text-[14px] border border-slate-100 border-dashed flex flex-col items-center gap-4">
              <i className="fa-solid fa-inbox opacity-20 text-4xl"></i>
              <span className="font-bold italic uppercase tracking-[0.2em]">{emptyMessage}</span>
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};
