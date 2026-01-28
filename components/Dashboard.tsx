
import React, { useState, useEffect } from 'react';
import { QUICK_ACTIONS } from '../constants';
import { QuickActionCard } from './QuickActionCard';
import { Widget } from './Widget';
import { ViewType } from '../App';

interface DashboardProps {
  onNavigate: (view: ViewType) => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, currentRoom, onOpenRoomModal }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleActionClick = (id: string) => {
    const map: Record<string, ViewType> = {
      'patient_registry': 'patient_registry',
      'inpatient': 'inpatient_admissions',
      'doctor': 'doctors_panel',
      'triage': 'triage',
      'appointments': 'appointments',
      'pharmacy': 'pharmacy',
      'laboratory': 'laboratory',
      'otc': 'over_the_counter',
      'bills': 'patient_bills',
      'reports_action': 'reports'
    };
    onNavigate(map[id] || 'other');
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700 max-w-[1600px] mx-auto pb-12">
      {/* Dynamic Header */}
      <div className="bg-white rounded-[2rem] h-28 px-10 flex items-center justify-between shadow-xl shadow-slate-200/50 border border-white">
        <div className="flex items-center gap-6">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-600 w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-indigo-200 group transition-transform hover:scale-105">
            <i className="fa-solid fa-tower-observation text-white text-3xl group-hover:rotate-12 transition-transform"></i>
          </div>
          <div>
            <h1 className="text-slate-900 font-black text-[28px] leading-tight tracking-tight uppercase">Mission Control</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-[12px] text-slate-400 font-black uppercase tracking-[0.2em]">Active Facility Hub | V0.51</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-12">
          <div className="hidden lg:flex flex-col items-end border-r border-slate-100 pr-12">
            <span className="text-slate-400 text-[10px] uppercase font-black tracking-widest mb-1.5">Station Link</span>
            <div 
              onClick={onOpenRoomModal}
              className="flex items-center gap-2.5 text-indigo-600 font-black text-[15px] cursor-pointer hover:bg-indigo-50 transition-all px-4 py-2 rounded-2xl border border-indigo-50"
            >
              <i className="fa-solid fa-door-open text-[11px]"></i>
              {currentRoom}
            </div>
          </div>
          <div className="flex flex-col items-end min-w-[180px]">
            <span className="text-slate-900 font-mono font-black text-[26px] tabular-nums tracking-tighter">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
            </span>
            <span className="text-slate-400 text-[11px] font-black uppercase tracking-widest mt-0.5">
              {currentTime.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <MetricCard label="Registrations" value="142" icon="fa-id-card" color="indigo" trend="+12%" trendUp />
        <MetricCard label="Pending Lab" value="12" icon="fa-vial" color="amber" trend="4 Urgent" />
        <MetricCard label="Bed Occupancy" value="82%" icon="fa-bed-pulse" color="blue" trend="48 Free" />
        <MetricCard label="Rev Cycle" value="KES 1.2M" icon="fa-coins" color="emerald" trend="On Target" trendUp />
      </div>

      <div className="flex flex-col xl:flex-row gap-10 mt-4">
        {/* Main Modules Area */}
        <div className="flex-1 flex flex-col gap-10">
          <div className="flex items-center gap-5">
            <h2 className="text-[15px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-4">
              <i className="fa-solid fa-grid-2 text-indigo-600"></i>
              System Modules
            </h2>
            <div className="flex-1 h-[1px] bg-slate-200"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {QUICK_ACTIONS.map(action => (
              <QuickActionCard 
                key={action.id} 
                action={action} 
                onClick={() => handleActionClick(action.id)}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Widget title="Clinical Roster" icon="fa-calendar-check">
              <div className="p-6 space-y-1">
                <ScheduleItem time="09:15 AM" patient="Alice Cooper" provider="Dr. Kihiu" status="Waiting" />
                <ScheduleItem time="10:30 AM" patient="Robert Wilson" provider="Dr. Thuo" status="Ongoing" />
                <button className="w-full py-5 mt-3 text-[12px] font-black text-slate-400 hover:text-indigo-600 hover:bg-slate-50 uppercase tracking-[0.2em] transition-all border-t border-slate-100 rounded-b-[2rem]">
                  Open Patient Queue
                </button>
              </div>
            </Widget>
            <Widget title="Facility Alerts" icon="fa-bolt">
               <div className="p-8 flex flex-col gap-6">
                  <AlertItem level="critical" title="Emergency Call: Room 402" time="1m ago" />
                  <AlertItem level="high" title="Pharmacy: Antibiotic stock low" time="12m ago" />
                  <AlertItem level="info" title="Billing: Batch process complete" time="32m ago" />
               </div>
            </Widget>
          </div>
        </div>

        {/* Right Sidebar Feed */}
        <div className="w-full xl:w-[480px] shrink-0 flex flex-col gap-10">
           <div className="flex items-center gap-5">
            <h2 className="text-[15px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-4">
              <i className="fa-solid fa-bullhorn text-rose-600"></i>
              Broadcasts
            </h2>
            <div className="flex-1 h-[1px] bg-slate-200"></div>
          </div>
          
          <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-white flex-1 min-h-[600px] flex flex-col">
            <div className="p-12 flex flex-col gap-10 flex-1">
              <LogEntry author="System Admin" time="11:30 AM" text="PACS server maintenance scheduled for 23:00 tonight. 30min expected downtime." priority="high" />
              <LogEntry author="Nursing Lead" time="09:15 AM" text="Morning clinical rounds complete. Ward B staff handover finalized." priority="normal" />
              <LogEntry author="Pharmacy" time="08:45 AM" text="Weekly narcotic audit successfully uploaded to secure ledger." priority="normal" />
              
              <div className="mt-auto bg-slate-50 rounded-[2.5rem] p-10 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center py-16 group/post cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-300">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover/post:scale-110 transition-all mb-5">
                  <i className="fa-solid fa-plus text-slate-300 group-hover/post:text-indigo-500 text-3xl"></i>
                </div>
                <p className="text-[14px] font-black text-slate-400 group-hover/post:text-indigo-600 uppercase tracking-[0.2em]">Post Entry</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{ label: string, value: string, icon: string, color: string, trend: string, trendUp?: boolean }> = ({ label, value, icon, color, trend, trendUp }) => {
  const colors: any = {
    indigo: 'border-indigo-500 text-indigo-600',
    amber: 'border-amber-500 text-amber-600',
    blue: 'border-blue-500 text-blue-600',
    emerald: 'border-emerald-500 text-emerald-600'
  };
  return (
    <div className={`bg-white rounded-[2.5rem] p-10 border-l-[12px] shadow-sm hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 ${colors[color]}`}>
      <div className="flex justify-between items-start mb-8">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-slate-50 shadow-inner group-hover:bg-white group-hover:shadow-lg transition-all`}>
          <i className={`fa-solid ${icon} text-3xl`}></i>
        </div>
        <span className={`text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter flex items-center gap-2 ${
          trendUp ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-500'
        }`}>
          {trendUp && <i className="fa-solid fa-caret-up"></i>}
          {trend}
        </span>
      </div>
      <div>
        <span className="text-[42px] font-black text-slate-900 tracking-tighter block leading-none">{value}</span>
        <span className="block text-[13px] font-black text-slate-400 uppercase tracking-[0.2em] mt-4">{label}</span>
      </div>
    </div>
  );
};

const ScheduleItem: React.FC<{ time: string, patient: string, provider: string, status: string }> = ({ time, patient, provider, status }) => (
  <div className="flex items-center gap-6 p-6 hover:bg-slate-50 rounded-3xl transition-all group border border-transparent hover:border-slate-100 cursor-pointer">
    <div className="bg-slate-900 text-white font-mono font-black text-[13px] px-4 py-2 rounded-2xl shadow-xl">{time}</div>
    <div className="flex-1">
      <div className="text-[17px] font-black text-slate-800 group-hover:text-indigo-700 transition-colors">{patient}</div>
      <div className="text-[12px] text-slate-400 font-black uppercase tracking-widest">{provider}</div>
    </div>
    <div className={`text-[11px] font-black uppercase px-5 py-2 rounded-full border ${
      status === 'Waiting' ? 'bg-amber-50 text-amber-600 border-amber-200' :
      status === 'Ongoing' ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'bg-slate-50 text-slate-500'
    }`}>{status}</div>
  </div>
);

const AlertItem: React.FC<{ level: string; title: string; time: string }> = ({ level, title, time }) => (
  <div className={`flex items-center gap-6 p-6 rounded-[2.5rem] border group transition-all cursor-pointer ${
    level === 'critical' ? 'bg-rose-50 border-rose-100' : 'bg-slate-50 border-slate-100'
  }`}>
    <div className={`w-4 h-4 rounded-full ${level === 'critical' ? 'bg-rose-500 animate-ping shadow-[0_0_12px_rgba(244,63,94,0.6)]' : 'bg-indigo-500'}`}></div>
    <div className="flex-1 text-[16px] font-black text-slate-800 tracking-tight">{title}</div>
    <div className="text-[11px] text-slate-400 font-black uppercase tracking-widest">{time}</div>
  </div>
);

const LogEntry: React.FC<{ author: string, time: string, text: string, priority: string }> = ({ author, time, text, priority }) => (
  <div className={`relative pl-12 border-l-4 py-4 transition-all hover:bg-slate-50 rounded-r-3xl ${priority === 'high' ? 'border-rose-500' : 'border-slate-200'}`}>
    <div className="absolute -left-[12px] top-4 w-6 h-6 bg-white border-2 rounded-full flex items-center justify-center shadow-md">
       <div className={`w-2.5 h-2.5 rounded-full ${priority === 'high' ? 'bg-rose-500' : 'bg-slate-300'}`}></div>
    </div>
    <div className="flex justify-between items-center mb-2.5">
      <span className="text-[13px] font-black text-slate-900 uppercase tracking-widest">{author}</span>
      <span className="text-[11px] text-slate-400 font-black font-mono">{time}</span>
    </div>
    <p className="text-[16px] text-slate-600 leading-relaxed font-semibold">{text}</p>
  </div>
);
