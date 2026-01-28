
import React from 'react';
import { QuickAction } from '../types';

interface QuickActionCardProps {
  action: QuickAction;
  onClick?: () => void;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({ action, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative bg-white rounded-[2.5rem] shadow-sm p-8 flex flex-col items-center justify-center gap-6 cursor-pointer hover:bg-white hover:shadow-2xl hover:shadow-indigo-100 transition-all border border-slate-100 hover:border-indigo-200 hover:-translate-y-3 active:scale-95 aspect-square overflow-hidden"
    >
      {/* Decorative Gradient Overlay */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-blue-500/5 rounded-bl-full group-hover:scale-[3] transition-transform duration-1000 blur-3xl"></div>
      
      {/* Icon Container */}
      <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center group-hover:bg-indigo-600 group-hover:rotate-[15deg] group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-indigo-200 transition-all duration-500 z-10">
        <i className={`fa-solid ${action.icon} text-[32px] ${action.color || 'text-slate-400'} group-hover:text-white transition-all duration-500`}></i>
      </div>
      
      {/* Label */}
      <div className="z-10 text-center">
        <span className="text-[13px] font-black text-slate-700 group-hover:text-slate-900 leading-tight uppercase tracking-[0.12em] transition-colors duration-500">
          {action.label}
        </span>
      </div>

      {/* Action Indicator */}
      <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 group-hover:right-6 transition-all duration-500">
         <div className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center border border-indigo-200 shadow-sm">
            <i className="fa-solid fa-arrow-right text-[10px]"></i>
         </div>
      </div>
    </div>
  );
};
