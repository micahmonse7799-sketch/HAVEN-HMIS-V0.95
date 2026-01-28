
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

interface TopbarProps {
  onToggleSidebar: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar }) => {
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'offline'>('checking');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    const healthCheck = async () => {
      try {
        const { error } = await supabase.from('patients_registry').select('id').limit(1);
        
        if (!isMounted.current) return;

        if (error) {
          setDbStatus('offline');
          setErrorMessage(error.message);
        } else {
          setDbStatus('connected');
          setErrorMessage(null);
        }
      } catch (err: any) {
        if (!isMounted.current) return;
        setDbStatus('offline');
        setErrorMessage(err.message || 'Network connectivity error');
      }
    };

    healthCheck();
    return () => { isMounted.current = false; };
  }, []);

  return (
    <header className="h-10 bg-[#212529] text-gray-300 flex items-center justify-end px-4 gap-6 border-b border-black/20">
      <div className="flex items-center gap-5">
        
        {/* Connection Status Indicator */}
        <div 
          className="flex items-center gap-2 group relative cursor-help select-none"
          title={dbStatus === 'offline' ? `Error: ${errorMessage}` : 'System Online'}
        >
          {/* Circular LED Light */}
          <div className="relative flex h-3 w-3">
            {dbStatus === 'connected' && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            )}
            <span className={`relative inline-flex rounded-full h-3 w-3 transition-colors duration-500 ${
              dbStatus === 'connected' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.7)]' : 
              dbStatus === 'offline' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]' : 
              'bg-gray-600'
            }`}></span>
          </div>

          {/* Label */}
          <span className={`text-[10px] font-bold uppercase tracking-tight leading-none transition-colors duration-500 ${
            dbStatus === 'connected' ? 'text-green-500' : dbStatus === 'offline' ? 'text-red-500' : 'text-gray-500'
          }`}>
            {dbStatus === 'connected' ? 'Database Connected' : dbStatus === 'offline' ? 'Database Offline' : 'Verifying...'}
          </span>

          {/* Tooltip for error debugging */}
          {dbStatus === 'offline' && (
            <div className="absolute top-8 right-0 bg-gray-900 text-white text-[10px] p-2 rounded shadow-2xl whitespace-nowrap z-[1000] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-red-500/50">
              <span className="text-red-400 font-bold mr-1">DEBUG:</span> {errorMessage}
            </div>
          )}
        </div>

        <div className="w-px h-4 bg-gray-700 mx-1"></div>

        <div className="cursor-pointer hover:text-white transition-colors">
          <i className="fa-solid fa-microphone-slash text-xs"></i>
        </div>
        <div className="cursor-pointer hover:text-white transition-colors">
          <i className="fa-solid fa-user-circle"></i>
        </div>
        <div className="cursor-pointer hover:text-white relative group transition-colors">
          <i className="fa-solid fa-bell"></i>
          <span className="absolute -top-1.5 -right-2 bg-[#dc3545] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full border border-[#212529] font-bold">0</span>
        </div>
        <div className="cursor-pointer hover:text-white transition-colors">
          <i className="fa-solid fa-comment"></i>
        </div>
        <div className="flex items-center gap-2 cursor-pointer group hover:text-white transition-colors">
          <i className="fa-solid fa-user-circle text-gray-300 group-hover:text-white"></i>
          <i className="fa-solid fa-chevron-down text-[9px]"></i>
        </div>
      </div>
    </header>
  );
};
