import React from 'react';

interface SuppliersProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const Suppliers: React.FC<SuppliersProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20">
      {/* Top Header Bar */}
      <div className="bg-white rounded-sm h-10 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <i onClick={onBack} className="fa-solid fa-times text-gray-400 cursor-pointer hover:text-gray-600 text-xs"></i>
          <h1 className="text-gray-700 font-semibold text-[14px]">Demo Hospital</h1>
        </div>
        <div className="flex items-center gap-12 text-[13px] text-gray-500">
          <div>Branch: <span className="text-[#43939e] cursor-pointer hover:underline">Main branch</span></div>
          <div>Room: <span onClick={onOpenRoomModal} className="text-[#43939e] cursor-pointer hover:underline">{currentRoom}</span></div>
          <button className="bg-[#17a2b8] text-white px-4 py-1 rounded-sm text-[11px]">Queue</button>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-[#f8f9fa] border border-gray-200 rounded-sm px-4 py-1.5 flex items-center justify-between text-[12px]">
        <div className="flex items-center gap-2 text-gray-500">
          <i className="fa-solid fa-home text-blue-500"></i>
          <span className="opacity-50">/</span>
          <span className="text-blue-500 cursor-pointer hover:underline">Procurement</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Suppliers</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Supplier Details Form Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between">
          <h2 className="text-[16px] font-medium text-gray-600">Supplier Details</h2>
          <button className="bg-[#5bc0de] text-white px-3 py-1 rounded-sm text-[11px] font-bold flex items-center gap-2 hover:bg-[#31b0d5]">
            Actions <i className="fa-solid fa-caret-down text-[9px]"></i>
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
            <SupplierField label="Supplier Name" />
            <SupplierField label="Contact Person" />
            <SupplierSelectField label="Country" />
            
            <SupplierField label="Description" />
            <SupplierField label="Physical Address" />
            <SupplierSelectField label="Town/City" />
            
            <SupplierField label="Telephone 1" />
            <SupplierField label="Postal Address" />
            <SupplierField label="Website" />
            
            <SupplierField label="Telephone 2" />
            <SupplierField label="Postal Code" />
            <SupplierField label="Sub Account" />
            
            <SupplierField label="Email" />
            
            <div className="md:col-start-2 lg:col-start-3 flex items-end justify-end">
              <button className="bg-[#17a2b8] text-white w-10 h-10 rounded flex items-center justify-center hover:bg-[#138496] shadow-md transition-all active:scale-95">
                <i className="fa-solid fa-plus text-lg"></i>
              </button>
            </div>
          </div>
        </div>

        {/* View: Supplier(s) Table Section */}
        <div className="border-t border-gray-200">
          <div className="px-4 py-2 bg-[#f8f9fa] border-b">
            <h2 className="text-[15px] font-medium text-gray-600">View: Supplier(s)</h2>
          </div>
          <div className="p-4 flex flex-col gap-4">
             <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-1">
                  <button className="border border-gray-300 px-3 py-1 text-[11px] hover:bg-gray-50 rounded-sm">Excel</button>
                  <button className="border border-gray-300 px-3 py-1 text-[11px] hover:bg-gray-50 rounded-sm">CSV</button>
                  <button className="border border-gray-300 px-3 py-1 text-[11px] hover:bg-gray-50 rounded-sm">Print</button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-gray-500">Search:</span>
                  <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none w-[220px]" />
                </div>
             </div>

             <div className="border border-gray-200 rounded-sm overflow-x-auto">
               <table className="w-full text-left text-[13px]">
                 <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                   <tr>
                     <th className="px-4 py-2 font-bold text-[#333] border-r">Supplier No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     <th className="px-4 py-2 font-bold text-[#333] border-r">Supplier Name <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                     <th className="px-4 py-2 font-bold text-[#333] border-r">Telephone <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     <th className="px-4 py-2 font-bold text-[#333] border-r">Email <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     <th className="px-4 py-2 font-bold text-[#333] border-r">Contact Person <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                     <th className="px-4 py-2 font-bold text-[#333]">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="bg-white text-gray-700">
                    <SupplierTableRow no="1" name="TUSKYS SUPERMARKET" tel="0721431510" email="mwauraevans7@gmail.com" contact="MBUGUA" />
                    <SupplierTableRow no="2" name="Mission for Essential Drugs and Supplies(MEDS)" tel="+254-719-086501" email="sahibu@africaonline.co.ke" contact="Customer Service" />
                    <SupplierTableRow no="3" name="General Suppliers Ltd" tel="+254797759834" email="mwangikiunjuri@gmail.com" contact="-" />
                    <SupplierTableRow no="4" name="Transwide Pharmaceuticals Limited" tel="0711111111" email="customerservice@tanswide.co.ke" contact="Customer Service" />
                    <SupplierTableRow no="5" name="Simba Pharmaceutical Ltd" tel="0719147687" email="simbapharmaceuticals@gmail.com" contact="Customer Service" />
                    <SupplierTableRow no="6" name="Dawa Limited" tel="0724 764748" email="customerservice@dawalimited.com" contact="Customer Service" />
                    <SupplierTableRow no="7" name="Cosmos Pharmaceutical Limited" tel="0709 864000" email="info@cosmos-pharm.com" contact="Customer Service" />
                 </tbody>
               </table>
             </div>

             <div className="text-[12px] text-gray-500 font-medium">Showing 1 to 7 of 7 entries</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SupplierField: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[12px] font-bold text-gray-700 leading-tight">{label}</label>
    <input 
      type="text" 
      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] outline-none focus:ring-1 focus:ring-cyan-400 transition-all bg-white"
    />
  </div>
);

const SupplierSelectField: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[12px] font-bold text-gray-700 leading-tight">{label}</label>
    <div className="flex gap-2">
      <select className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-[14px] outline-none focus:ring-1 focus:ring-cyan-400 bg-white">
        <option></option>
      </select>
      <button className="text-blue-600 hover:text-blue-800 transition-colors">
        <i className="fa-solid fa-plus-circle text-lg"></i>
      </button>
    </div>
  </div>
);

const SupplierTableRow: React.FC<{ no: string; name: string; tel: string; email: string; contact: string }> = ({ no, name, tel, email, contact }) => (
  <tr className="border-b hover:bg-gray-50 transition-colors">
    <td className="px-4 py-2 border-r">{no}</td>
    <td className="px-4 py-2 border-r font-medium">{name}</td>
    <td className="px-4 py-2 border-r">{tel}</td>
    <td className="px-4 py-2 border-r">{email}</td>
    <td className="px-4 py-2 border-r">{contact}</td>
    <td className="px-4 py-2">
       <button className="text-cyan-600 hover:text-cyan-800"><i className="fa-solid fa-edit"></i></button>
    </td>
  </tr>
);