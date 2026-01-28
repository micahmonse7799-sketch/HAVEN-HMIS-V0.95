
import React from 'react';

interface EmployeesProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

export const Employees: React.FC<EmployeesProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
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
          <span className="text-blue-500 cursor-pointer hover:underline">HR</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Employees</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Employee Details Form Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="px-4 py-2 border-b bg-[#f8f9fa] flex items-center justify-between">
          <h2 className="text-[16px] font-medium text-gray-600 uppercase tracking-tight">Employee Details</h2>
          <button className="bg-[#5bc0de] text-white px-3 py-1 rounded-sm text-[11px] font-bold flex items-center gap-2 hover:bg-[#31b0d5]">
            Actions <i className="fa-solid fa-caret-down text-[9px]"></i>
          </button>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
           {/* Col 1 */}
           <EmpField label="Staff Number" required />
           <EmpField label="Surname" required />
           <EmpField label="Other Names" required />
           <EmpSelect label="Sex" required options={['Male', 'Female']} />
           <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase">Date Of Birth <span className="text-red-500">*</span></label>
              <div className="flex gap-1 shadow-xs">
                 <input type="text" placeholder="mm/dd/yyyy" className="flex-1 border border-gray-300 rounded-l px-3 py-1.5 text-[13px] outline-none" />
                 <button className="bg-white border border-gray-300 border-l-0 rounded-r px-2 text-blue-500 hover:text-blue-700 transition-colors">
                    <i className="fa-solid fa-calendar-days text-[11px]"></i>
                 </button>
                 <button className="text-blue-600 hover:text-blue-800 ml-1"><i className="fa-solid fa-edit text-sm"></i></button>
              </div>
           </div>
           <EmpSelect label="ID Type" required />
           <EmpField label="ID Number" required />
           <EmpSelect label="Marital Status" required />
           <EmpField label="Telephone 1" required />
           <EmpField label="Telephone 2" />

           {/* Col 2 */}
           <EmpField label="Email" />
           <EmpField label="Postal Address" />
           <EmpField label="Postal Code" />
           <EmpField label="Physical Address" required />
           <EmpField label="Current Residence" />
           <EmpField label="Street And House No" />
           <EmpSelect label="Town/City" required hasPlus />
           <EmpSelect label="Nationality" required hasPlus />
           <EmpField label="Next Of Kin" />
           <EmpField label="Relationship" />

           {/* Col 3 */}
           <EmpField label="NOK Contact" />
           <EmpField label="NOK Place Of Work" />
           <EmpField label="NOK Occupation" />
           <EmpSelect label="NOK ID Type" options={['None']} />
           <EmpField label="NOK ID Number" />
           <EmpSelect label="Department" required />
           <EmpField label="Designation" placeholder="Designation..." />
           <EmpSelect label="Employment Type" required />
           <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase">Date Employed <span className="text-red-500">*</span></label>
              <div className="flex gap-1 shadow-xs">
                 <input type="text" placeholder="mm/dd/yyyy" className="flex-1 border border-gray-300 rounded-l px-3 py-1.5 text-[13px] outline-none" />
                 <button className="bg-white border border-gray-300 border-l-0 rounded-r px-2 text-gray-500 hover:text-gray-700 transition-colors">
                    <i className="fa-solid fa-calendar-days text-[11px]"></i>
                 </button>
              </div>
           </div>
           <EmpSelect label="Mode of Payment" required />

           {/* Col 4 */}
           <EmpField label="Payment Ref" />
           <EmpField label="Bank" />
           <EmpField label="Bank Branch" />
           <EmpField label="Branch Code" />
           <EmpField label="Bank Account No" />
           <EmpField label="Payroll No" />
           <EmpField label="KRA PIN Number" placeholder="KRA PIN Number." />
           <EmpField label="NSSF No" placeholder="NSSF No..." />
           <EmpField label="SHA No" placeholder="SHA No..." />
           <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase">Link To System User</label>
              <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none bg-white">
                 <option></option>
              </select>
           </div>
           <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 pt-2">
                 <input type="checkbox" id="portal" className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer" />
                 <label htmlFor="portal" className="text-[12px] text-gray-700 font-medium cursor-pointer">Can Access the Portal</label>
              </div>
              <div className="flex justify-end">
                 <button className="bg-[#17a2b8] text-white w-10 h-10 rounded flex items-center justify-center hover:bg-[#138496] shadow-md transition-all active:scale-95">
                    <i className="fa-solid fa-plus text-lg"></i>
                 </button>
              </div>
           </div>
        </div>

        {/* View Section */}
        <div className="border-t border-gray-200">
           <div className="px-4 py-2 bg-[#f8f9fa] border-b">
             <h2 className="text-[15px] font-medium text-gray-600 uppercase tracking-tight">View: Employees</h2>
           </div>
           <div className="p-4 flex flex-col gap-4">
              <div className="flex justify-end items-center gap-2">
                 <span className="text-[12px] text-gray-500">Search:</span>
                 <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[11px] outline-none w-[200px]" />
              </div>

              <div className="border border-gray-200 rounded-sm overflow-x-auto">
                <table className="w-full text-left text-[12px] whitespace-nowrap">
                   <thead className="bg-[#f8f9fa] text-gray-600 border-b">
                      <tr>
                         <th className="px-3 py-2 w-[40px] text-center border-r"><input type="checkbox" className="w-3.5 h-3.5" /></th>
                         <th className="px-3 py-2 font-bold border-r">Staff No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Surname <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">Other Names <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r text-blue-800">Sex <i className="fa-solid fa-arrows-up-down text-[8px] opacity-40 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold border-r">ID No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                         <th className="px-3 py-2 font-bold">Telephone No <i className="fa-solid fa-arrows-up-down text-[8px] opacity-30 ml-1"></i></th>
                      </tr>
                   </thead>
                   <tbody className="bg-white">
                      <EmpRow id="1" surname="Kehiu" other="Kelvin Doe" sex="Male" idno="31990314" tel="0701355459" />
                      <EmpRow id="2" surname="Doe" other="Jane" sex="Female" idno="1234567" tel="12345678" />
                      <EmpRow id="344" surname="Evans" other="Mwaura" sex="Male" idno="29473419" tel="07344xxxxxx" />
                      <EmpRow id="205" surname="WAFULA" other="EDWARD KACHAPIN" sex="Male" idno="11200012" tel="0730000000" isRed />
                      <EmpRow id="123456789" surname="Mondiek" other="Daniel" sex="Male" idno="123456789" tel="0732495996" />
                      <EmpRow id="10" surname="Dummy Doe" other="Abel" sex="Male" idno="57585960" tel="07339181100" />
                      <EmpRow id="90" surname="Ndiritu" other="Denis" sex="Male" idno="30184328" tel="0708227568" />
                      <EmpRow id="235789" surname="Ndegwa" other="Martha" sex="Female" idno="29603663" tel="0718850735" />
                      <EmpRow id="254" surname="Kizito" other="Sabato Magero" sex="Male" idno="0970709709" tel="97078790" isRed />
                      <EmpRow id="900" surname="evans" other="k" sex="Male" idno="00000000" tel="00000000" isRed />
                   </tbody>
                </table>
              </div>

              {/* Bottom UI Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
                 <div className="flex items-center gap-4">
                    <span className="text-[12px] text-gray-500">Showing 1 to 117 of 117 entries</span>
                    <div className="flex items-center gap-2">
                       <span className="text-[13px] font-bold text-gray-700">View:</span>
                       <select className="border border-gray-300 rounded px-3 py-1.5 text-[14px] bg-white text-green-700 font-bold min-w-[150px]">
                          <option>Current Employees</option>
                          <option>Archived</option>
                          <option>All</option>
                       </select>
                       <button className="bg-[#5bc0de] text-white px-6 py-1.5 rounded-sm text-[13px] font-bold hover:bg-[#31b0d5] transition-colors shadow-sm">
                          View
                       </button>
                    </div>
                    <span className="text-[13px] text-blue-800 font-bold ml-4">117 Employee(s) Found</span>
                 </div>

                 <div className="flex gap-2">
                    <button className="bg-[#17a2b8] text-white px-4 py-1.5 rounded-sm text-[11px] font-bold hover:bg-[#138496] shadow-sm uppercase">
                       Update Payroll parameters For Selected
                    </button>
                    <button className="bg-[#17a2b8] text-white px-4 py-1.5 rounded-sm text-[11px] font-bold hover:bg-[#138496] shadow-sm uppercase">
                       Generate Payslip(s)
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const EmpField: React.FC<{ label: string; required?: boolean; placeholder?: string }> = ({ label, required, placeholder }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-bold text-gray-500 uppercase">{label} {required && <span className="text-red-500">*</span>}</label>
    <input 
      type="text" 
      className="w-full border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white shadow-xs"
      placeholder={placeholder || ''}
    />
  </div>
);

const EmpSelect: React.FC<{ label: string; required?: boolean; options?: string[]; hasPlus?: boolean }> = ({ label, required, options = [], hasPlus = false }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-bold text-gray-500 uppercase">{label} {required && <span className="text-red-500">*</span>}</label>
    <div className="flex gap-2">
      <select className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-cyan-500 bg-white">
        <option></option>
        {options.map(opt => <option key={opt}>{opt}</option>)}
      </select>
      {hasPlus && (
        <button className="text-blue-600 hover:text-blue-800 transition-colors">
          <i className="fa-solid fa-plus-circle text-lg"></i>
        </button>
      )}
    </div>
  </div>
);

const EmpRow: React.FC<{ id: string; surname: string; other: string; sex: string; idno: string; tel: string; isRed?: boolean }> = ({ id, surname, other, sex, idno, tel, isRed }) => (
  <tr className={`border-b hover:bg-gray-50 transition-colors ${isRed ? 'text-red-600' : 'text-gray-700'}`}>
    <td className="px-3 py-2 text-center border-r"><input type="checkbox" className="w-3.5 h-3.5" /></td>
    <td className="px-3 py-2 border-r">{id}</td>
    <td className="px-3 py-2 border-r font-medium">{surname}</td>
    <td className="px-3 py-2 border-r">{other}</td>
    <td className="px-3 py-2 border-r">{sex}</td>
    <td className="px-3 py-2 border-r">{idno}</td>
    <td className="px-3 py-2">{tel}</td>
  </tr>
);
