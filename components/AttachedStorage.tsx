
import React, { useState } from 'react';

interface AttachedStorageProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const AttachedStorage: React.FC<AttachedStorageProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const [storages, setStorages] = useState([
    { name: 'Demo Upload', type: 'FTP', host: '127.0.0.1', port: '14148', username: 'Evanso', root: '/Demo/', active: true },
    { name: 'file_upload_ftp', type: 'FTP', host: '192.168.240.1', port: '21', username: 'ftp_demo_hospital', root: 'ftp_storage', active: true },
    { name: 'Hanmak FTP Server', type: 'FTP', host: '192.168.0.189', port: '21', username: 'ftp-user', root: 'patient files', active: true },
    { name: 'medicentre3wa_n', type: 'FTP', host: '172.25.64.1', port: '80', username: 'medicentre3', root: 'files', active: true },
    { name: 'medStorage', type: 'Google Drive', host: '', port: '0', username: 'Ndiritu', root: 'files', active: true },
    { name: 'MedV3', type: 'FTP', host: '41.60.234.47', port: '21', username: 'ftp-hanmak', root: 'patientfiles', active: true },
    { name: 'Test', type: 'FTP', host: '192.168.100.12', port: '14148', username: 'chumo', root: 'D:\\Ftp', active: true },
  ]);

  const filteredList = storages.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStatus = (idx: number) => {
    const updated = [...storages];
    updated[idx].active = !updated[idx].active;
    setStorages(updated);
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 relative bg-[#87c7cf]/10 min-h-screen">
      {/* Top Header Bar */}
      <div className="bg-white px-4 h-11 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-2">
          <h1 className="text-gray-700 font-bold text-[15px]">Demo Hospital</h1>
          <div className="flex items-center gap-12 ml-20 text-[13px] text-gray-500">
             <div>Branch: <span className="text-[#43939e] cursor-pointer hover:underline font-bold">Main branch</span></div>
             <div>Room: <span onClick={onOpenRoomModal} className="text-[#43939e] cursor-pointer hover:underline font-bold">{currentRoom}</span></div>
          </div>
        </div>
        <button className="bg-[#17a2b8] text-white px-5 py-1 rounded-sm text-[11px] font-bold uppercase shadow-sm">Queue</button>
      </div>

      {/* Breadcrumb Area */}
      <div className="bg-[#fcfcfc] px-4 py-2 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-2 text-[#337ab7] text-[13px]">
          <i className="fa-solid fa-home"></i>
          <span className="text-gray-300">/</span>
          <div className="flex items-center gap-1 cursor-pointer hover:underline">
            <span>Configurations</span>
            <i className="fa-solid fa-caret-down text-[10px] mt-0.5"></i>
          </div>
          <span className="text-gray-300">/</span>
          <span className="text-gray-500">Attached Storage</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#337ab7] cursor-pointer hover:underline text-[13px]">
          <i className="fa-solid fa-question-circle"></i>
          <span className="font-bold">Guide</span>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="p-2 flex flex-col gap-4">
        
        {/* TOP CARD: Config Form */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-5 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[17px] text-[#4a4a7d] font-normal">Attached Storage Config</h2>
            <button className="bg-[#5cb85c] hover:bg-[#4cae4c] text-white px-5 py-1.5 rounded-sm text-[13px] font-bold shadow-sm transition-all active:scale-95">
              Test Connection
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-6">
            {/* Row 1 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-700">Name</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 shadow-sm" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-700">Host</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 shadow-sm" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-700">Password</label>
              <input type="password" placeholder="" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 shadow-sm" />
            </div>

            {/* Row 2 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-700">Storage Type</label>
              <div className="relative">
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] outline-none bg-white text-green-800 font-medium appearance-none cursor-pointer shadow-sm">
                  <option>FTP</option>
                  <option>Google Drive</option>
                  <option>SFTP</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-green-600">
                  <i className="fa-solid fa-chevron-down text-[11px]"></i>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-700">Port</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 shadow-sm" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-700">Credentials file:</label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <label className="bg-[#f0f2f5] hover:bg-gray-200 cursor-pointer px-4 py-2 border-r border-gray-200 text-[12px] font-bold text-gray-600 transition-colors">
                  Choose File
                  <input type="file" className="hidden" />
                </label>
                <span className="flex-1 px-3 py-2 text-[12px] text-green-700 font-medium bg-white truncate">No file chosen</span>
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-700">Root Folder</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 shadow-sm" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-700">Username</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] outline-none focus:ring-1 focus:ring-cyan-500 shadow-sm" />
            </div>
            <div className="flex items-end justify-end h-full">
              <button className="bg-[#17a2b8] hover:bg-[#138496] text-white w-10 h-8 rounded-sm flex items-center justify-center shadow-md transition-all active:scale-90">
                <i className="fa-solid fa-plus text-lg"></i>
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM CARD: Data View */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col flex-1 mt-6">
          <div className="px-4 py-3 border-b border-gray-100 bg-white">
            <h2 className="text-[16px] text-[#4a4a7d] font-normal">View: Attached Storages</h2>
          </div>

          <div className="p-4 flex flex-col gap-4">
            {/* Search Row */}
            <div className="flex justify-end items-center gap-3">
              <label className="text-[14px] text-gray-500 font-bold">Search:</label>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded px-4 py-1.5 text-[14px] outline-none w-[320px] shadow-sm focus:ring-1 focus:ring-cyan-500" 
              />
            </div>

            {/* Table Area */}
            <div className="border border-gray-200 rounded-sm overflow-x-auto shadow-inner bg-white">
              <table className="w-full text-left text-[14px] border-collapse min-w-[1000px]">
                <thead className="bg-[#f8f9fa] text-gray-600 border-b border-gray-200 font-bold">
                  <tr>
                    <th className="px-4 py-3 border-r border-gray-200">
                      <div className="flex items-center justify-between">
                        Name <i className="fa-solid fa-arrows-up-down text-[10px] opacity-30"></i>
                      </div>
                    </th>
                    <th className="px-4 py-3 border-r border-gray-200">
                      <div className="flex items-center justify-between w-24">
                        Type <i className="fa-solid fa-arrows-up-down text-[10px] opacity-30"></i>
                      </div>
                    </th>
                    <th className="px-4 py-3 border-r border-gray-200">
                      <div className="flex items-center justify-between">
                        Host <i className="fa-solid fa-arrows-up-down text-[10px] opacity-30"></i>
                      </div>
                    </th>
                    <th className="px-4 py-3 border-r border-gray-200">
                      <div className="flex items-center justify-between w-24">
                        Port <i className="fa-solid fa-arrows-up-down text-[10px] opacity-30"></i>
                      </div>
                    </th>
                    <th className="px-4 py-3 border-r border-gray-200">
                      <div className="flex items-center justify-between">
                        Username <i className="fa-solid fa-arrows-up-down text-[10px] opacity-30"></i>
                      </div>
                    </th>
                    <th className="px-4 py-3 border-r border-gray-200">
                      <div className="flex items-center justify-between">
                        Root <i className="fa-solid fa-arrows-up-down text-[10px] opacity-30"></i>
                      </div>
                    </th>
                    <th className="px-4 py-3 w-[80px] text-center">
                      <i className="fa-solid fa-arrows-up-down text-[10px] opacity-30"></i>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredList.map((storage, idx) => (
                    <tr 
                      key={idx} 
                      className="bg-white hover:bg-cyan-50/40 transition-colors text-gray-700 text-[13px] group"
                    >
                      <td className="px-4 py-3.5 border-r border-gray-50">
                        {storage.name}
                      </td>
                      <td className="px-4 py-3.5 border-r border-gray-50">
                        {storage.type}
                      </td>
                      <td className="px-4 py-3.5 border-r border-gray-50 font-mono text-[12px] text-gray-500">
                        {storage.host || '-'}
                      </td>
                      <td className="px-4 py-3.5 border-r border-gray-50">
                        {storage.port}
                      </td>
                      <td className="px-4 py-3.5 border-r border-gray-50">
                        {storage.username}
                      </td>
                      <td className="px-4 py-3.5 border-r border-gray-50 italic text-gray-500">
                        {storage.root}
                      </td>
                      <td className="px-4 py-3.5 text-center flex justify-center">
                        <div 
                          onClick={() => toggleStatus(idx)}
                          className={`w-[52px] h-[26px] rounded-full relative cursor-pointer transition-all duration-300 border-2 ${storage.active ? 'bg-white border-[#337ab7]' : 'bg-gray-100 border-gray-300'}`}
                        >
                           <div className={`absolute top-[2px] w-[18px] h-[18px] rounded-full transition-all duration-300 shadow-sm ${storage.active ? 'right-[2px] bg-[#337ab7]' : 'left-[2px] bg-gray-400'}`}></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredList.length === 0 && (
                     <tr><td colSpan={7} className="py-20 text-center text-gray-400 italic font-bold">No storage configurations match your search</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="text-[12px] text-gray-400 font-bold px-1 italic">
              Showing 1 to {filteredList.length} of {storages.length} entries
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Widget */}
      <div className="fixed bottom-0 right-4 w-52 h-8 bg-[#212529] rounded-t-lg flex items-center justify-between px-3 text-white border border-gray-800 z-[10000]">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_green] animate-pulse"></div>
            <span className="text-[12px] font-bold">Chat</span>
         </div>
         <i className="fa-solid fa-minus text-[10px] opacity-70 cursor-pointer"></i>
      </div>
    </div>
  );
};
