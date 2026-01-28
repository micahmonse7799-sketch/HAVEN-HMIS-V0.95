
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

interface PatientBillsProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const PatientBills: React.FC<PatientBillsProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  const [queueList, setQueueList] = useState<any[]>([]);
  const [selectedVisit, setSelectedVisit] = useState<any>(null);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [billItems, setBillItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const isMounted = useRef(true);

  const fetchQueue = async () => {
    try {
      const { data, error } = await supabase
        .from('patient_visits')
        .select(`
          *,
          patients_registry (
            id, surname, other_names, id_number, dob, sex, residence, occupation, notes
          )
        `)
        .eq('current_room', 'Billing')
        .eq('queue_status', 'Waiting')
        .order('queued_at', { ascending: true });

      if (error) {
        console.warn('Queue Fetch Error:', error.message);
        return;
      }
      
      if (isMounted.current) {
        setQueueList(data || []);
      }
    } catch (err: any) {
      console.error('Queue Fetch Exception:', err.message);
    }
  };

  const handlePatientSelect = async (visit: any) => {
    setLoading(true);
    try {
      const visitId = visit.id;
      const { data: unpaidItems, error } = await supabase
        .from('billing_queue')
        .select('*')
        .eq('visit_id', visitId)
        .eq('status', 'Unpaid');

      if (error) throw error;

      if (isMounted.current) {
        setSelectedVisit(visit);
        setSelectedPatient(visit.patients_registry);
        setBillItems(unpaidItems || []);
      }
    } catch (err: any) {
      console.error('Bill Items Fetch failed:', err.message);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  const calculateAge = (dob: string) => {
    if (!dob) return "-";
    const birthDate = new Date(dob);
    const today = new Date();
    if (isNaN(birthDate.getTime())) return "-";
    let years = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      years--;
    }
    return `${years} yrs`;
  };

  const totalBillAmount = billItems.reduce((sum, item) => sum + (item.unit_cost * item.quantity), 0);

  useEffect(() => {
    isMounted.current = true;
    fetchQueue();
    const pollInterval = setInterval(fetchQueue, 15000);
    const timeInterval = setInterval(() => { if (isMounted.current) setCurrentTime(new Date()); }, 10000);
    return () => {
      isMounted.current = false;
      clearInterval(pollInterval);
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-10">
      {/* Top Header Bar */}
      <div className="bg-white rounded-sm h-10 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <i onClick={onBack} className="fa-solid fa-times text-gray-400 cursor-pointer hover:text-gray-600 text-xs"></i>
          <h1 className="text-gray-700 font-semibold text-[14px]">Haven MIS</h1>
        </div>
        <div className="flex items-center gap-8 text-[13px] text-gray-500">
          <div>Branch: <span className="text-[#43939e] font-bold">Main branch</span></div>
          <div>Room: <span onClick={onOpenRoomModal} className="text-[#43939e] cursor-pointer hover:underline font-bold">{currentRoom}</span></div>
          <button onClick={fetchQueue} className="bg-[#17a2b8] text-white px-4 py-1 rounded-sm text-[11px] font-bold uppercase">
             {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Refresh Queue'}
          </button>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-[#f8f9fa] border border-gray-200 rounded-sm px-4 py-1.5 flex items-center justify-between text-[12px]">
        <div className="flex items-center gap-2 text-gray-500">
          <i className="fa-solid fa-home text-blue-500"></i>
          <span className="opacity-50">/</span>
          <span className="text-blue-500 cursor-pointer hover:underline">Billing</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Patient Bills</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Queue and Details (7 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-3">
           <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-4">
              <div className="flex justify-between items-center mb-4">
                 <h2 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">Billing Queue</h2>
                 <div className="flex items-center gap-2">
                    <span className="text-[12px] text-gray-500 uppercase font-bold">Search:</span>
                    <input type="text" className="border border-gray-300 rounded px-2 py-0.5 text-[12px] outline-none w-[180px]" />
                 </div>
              </div>
              <div className="border border-gray-200 rounded-sm overflow-y-auto max-h-[160px] custom-scrollbar shadow-inner">
                <table className="w-full text-left text-[11px] whitespace-nowrap">
                   <thead className="bg-[#f2f2f2] text-gray-600 border-b sticky top-0">
                      <tr>
                        <th className="px-3 py-2 font-bold border-r w-[60px]">No</th>
                        <th className="px-3 py-2 font-bold border-r">OPD No</th>
                        <th className="px-3 py-2 font-bold border-r">Patient Name</th>
                        <th className="px-3 py-2 font-bold border-r">From</th>
                        <th className="px-3 py-2 font-bold text-center">Mins</th>
                      </tr>
                   </thead>
                   <tbody>
                      {queueList.length > 0 ? (
                        queueList.map((visit, idx) => (
                          <tr 
                            key={visit.id} 
                            onClick={() => handlePatientSelect(visit)}
                            className={`hover:bg-cyan-50 transition-colors cursor-pointer border-b ${selectedVisit?.id === visit.id ? 'bg-cyan-100 font-bold' : ''}`}
                          >
                            <td className="px-3 py-2 border-r">{(idx + 1).toString().padStart(4, '0')}</td>
                            <td className="px-3 py-2 border-r font-mono">{visit.patients_registry?.id_number}</td>
                            <td className="px-3 py-2 border-r uppercase">{visit.patients_registry?.other_names} {visit.patients_registry?.surname}</td>
                            <td className="px-3 py-2 border-r">{visit.previous_room || '-'}</td>
                            <td className="px-3 py-2 text-center font-bold">
                               {Math.floor((currentTime.getTime() - new Date(visit.queued_at).getTime()) / 60000)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan={5} className="text-center py-10 text-gray-400 italic">No patients waiting in Billing</td></tr>
                      )}
                   </tbody>
                </table>
              </div>
           </div>

           {/* Bill Details Section */}
           <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
              <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between">
                <h2 className="text-[14px] font-medium text-gray-600 uppercase tracking-tight">Active Encounter Bill</h2>
                <div className="flex gap-2">
                   <button className="bg-[#5cb85c] text-white px-4 py-1 rounded-sm text-[11px] font-bold shadow-sm hover:bg-[#4cae4c]">Finalize Selected</button>
                   <button className="bg-white border border-gray-300 text-gray-700 px-4 py-1 rounded-sm text-[11px] font-bold hover:bg-gray-50">View Report</button>
                </div>
              </div>
              
              <div className="p-4 flex flex-col gap-4">
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[13px] text-gray-700 border-b border-gray-100 pb-4">
                    <DataLine label="Patient:" value={`${selectedPatient?.surname || ''} ${selectedPatient?.other_names || ''}`} />
                    <DataLine label="OPD No:" value={selectedPatient?.id_number} />
                    <DataLine label="Age:" value={calculateAge(selectedPatient?.dob)} />
                    <DataLine label="Visit ID:" value={selectedVisit?.id} />
                 </div>

                 <div className="border border-gray-200 rounded-sm overflow-x-auto min-h-[250px]">
                    <table className="w-full text-left text-[12px]">
                       <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                          <tr>
                             <th className="px-3 py-2 w-[40px] border-r text-center"><input type="checkbox" className="w-3.5 h-3.5" /></th>
                             <th className="px-3 py-2 font-bold border-r">Item Description</th>
                             <th className="px-3 py-2 font-bold border-r text-center w-[80px]">Qty</th>
                             <th className="px-3 py-2 font-bold border-r text-right w-[100px]">Rate</th>
                             <th className="px-3 py-2 font-bold text-right w-[120px]">Net Amount</th>
                          </tr>
                       </thead>
                       <tbody>
                          {billItems.length > 0 ? (
                            billItems.map((item, i) => (
                              <tr key={i} className="border-b hover:bg-gray-50 transition-colors">
                                 <td className="px-3 py-2 border-r text-center"><input type="checkbox" defaultChecked className="w-3.5 h-3.5" /></td>
                                 <td className="px-3 py-2 border-r font-medium">{item.item_name}</td>
                                 <td className="px-3 py-2 border-r text-center">{item.quantity}</td>
                                 <td className="px-3 py-2 border-r text-right font-mono">{item.unit_cost.toLocaleString()}</td>
                                 <td className="px-3 py-2 text-right font-black text-blue-800">{(item.unit_cost * item.quantity).toLocaleString()}</td>
                              </tr>
                            ))
                          ) : (
                            <tr><td colSpan={5} className="text-center py-20 text-gray-400 italic font-medium">Select a patient to manifest pending charges</td></tr>
                          )}
                       </tbody>
                       <tfoot className="bg-gray-50 font-black">
                          <tr>
                             <td colSpan={4} className="px-3 py-2 text-right uppercase tracking-wider text-gray-500">Total Bill Amount:</td>
                             <td className="px-3 py-2 text-right text-[15px] text-green-700">KES {totalBillAmount.toLocaleString()}</td>
                          </tr>
                       </tfoot>
                    </table>
                 </div>
              </div>
           </div>
        </div>

        {/* Right: Payment Actions (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
           <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-4 h-full flex flex-col gap-4">
              <h3 className="text-[14px] font-bold text-blue-800 underline decoration-blue-200 uppercase tracking-tight">Payment Details</h3>
              
              <div className="flex flex-col gap-4 pt-2">
                 <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Type of Sale</label>
                    <select className="border border-gray-300 rounded px-3 py-2 text-[14px] outline-none bg-white text-green-700 font-bold shadow-xs">
                       <option>Direct Cash Sale</option>
                       <option>Insurance/Scheme Claim</option>
                    </select>
                 </div>
                 <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Payment Mode</label>
                    <select className="border border-gray-300 rounded px-3 py-2 text-[14px] outline-none bg-white text-green-700 font-bold shadow-xs">
                       <option>M-PESA</option>
                       <option>Cash</option>
                       <option>Bank Transfer</option>
                       <option>Visa/Card</option>
                    </select>
                 </div>
                 <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Reference No</label>
                    <input type="text" placeholder="Transaction Reference..." className="border border-gray-300 rounded px-3 py-2 text-[14px] outline-none focus:ring-1 focus:ring-blue-400 shadow-inner" />
                 </div>
              </div>

              <div className="mt-auto space-y-3 bg-gray-50 p-4 rounded border border-gray-100">
                 <div className="flex justify-between items-center">
                    <span className="text-[13px] font-bold text-gray-600">Total Payable:</span>
                    <span className="text-[18px] font-black text-blue-900">KES {totalBillAmount.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[13px] font-bold text-gray-600">Amount Tendered:</span>
                    <input type="text" defaultValue="0" className="w-[120px] border border-gray-300 rounded px-2 py-1 text-right font-black text-green-700 text-[16px] outline-none" />
                 </div>
                 <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                    <span className="text-[13px] font-bold text-gray-600">Balance/Change:</span>
                    <span className="text-[16px] font-black text-rose-600">0.00</span>
                 </div>
              </div>

              <button 
                disabled={billItems.length === 0}
                className={`w-full py-4 rounded font-black text-[15px] uppercase tracking-widest shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 ${billItems.length > 0 ? 'bg-[#5da54f] text-white hover:bg-[#4d8a41]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
              >
                 <i className="fa-solid fa-receipt"></i>
                 Process Payment
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const DataLine: React.FC<{ label: string; value: any }> = ({ label, value }) => (
  <div className="flex flex-col gap-0.5">
    <span className="font-bold text-[10px] uppercase tracking-wider text-gray-400">{label}</span>
    <span className="font-bold text-[13px] text-gray-800 truncate">{value || '-'}</span>
  </div>
);
