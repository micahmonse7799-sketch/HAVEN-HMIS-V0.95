
import React, { useState, useEffect } from 'react';
import { SIDEBAR_ITEMS } from '../constants';
import { ViewType } from '../App';

interface SidebarProps {
  isOpen: boolean;
  onNavigate: (view: ViewType) => void;
  currentView: ViewType;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onNavigate, currentView }) => {
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  // Automatically expand the parent category if the current view belongs to it
  useEffect(() => {
    const parent = SIDEBAR_ITEMS.find(item => 
      item.children?.some(child => {
        // Map subId to the actual ViewType string logic used in onNavigate
        const mappedView = getMappedView(child.id);
        return mappedView === currentView;
      })
    );
    if (parent) {
      setActiveItemId(parent.id);
    }
  }, [currentView]);

  const toggleExpand = (id: string) => {
    setActiveItemId(prev => (prev === id ? null : id));
  };

  const getMappedView = (id: string): ViewType => {
    const map: Record<string, ViewType> = {
      'registry': 'patient_registry',
      'inpatient': 'inpatient_admissions',
      'doctor': 'doctors_panel',
      'doctor_new': 'doctors_panel',
      'triage': 'triage',
      'appointments_clinical': 'appointments',
      'pharmacy_billing': 'pharmacy',
      'pharmacy': 'pharmacy',
      'laboratory': 'laboratory',
      'otc_billing': 'over_the_counter',
      'patient_bills': 'patient_bills',
      'receipts': 'receipts',
      'ar_invoices': 'ar_invoices',
      'gate_pass': 'gate_pass',
      'proforma': 'proforma',
      'refunds': 'refunds',
      'special_clinics': 'special_clinics',
      'patient_chart': 'patient_chart',
      'radiology': 'radiology',
      'theatre': 'theatre',
      'referrals': 'referrals',
      'order_sets': 'order_sets',
      'maternity_main': 'maternity_main',
      'milestones': 'milestones',
      'immunization': 'immunization',
      'dialysis_orders': 'dialysis_orders',
      'dialysis_checklists': 'dialysis_checklists',
      'htn_registry': 'htn_registry',
      'htn_visits': 'htn_visits',
      'cwc_registry': 'cwc_registry',
      'cwc_visits': 'cwc_visits',
      'icu_assessment': 'icu_assessment',
      'icu_examination': 'icu_examination',
      'nicu_clinic': 'nicu_clinic',
      'suppliers': 'suppliers',
      'supplier_bills': 'supplier_bills',
      'purchase_req': 'purchase_requisition_note',
      'purchase_orders': 'purchase_orders',
      'grn': 'grn',
      'ap_vouchers': 'ap_payment_vouchers',
      'supplier_prepayments': 'supplier_prepayments',
      'inv_main': 'inv_main',
      'int_orders': 'int_orders',
      'branch_orders': 'branch_orders',
      'consumption': 'consumption',
      'stock_take': 'stock_take',
      'uom': 'uom',
      'fiscal_periods': 'fiscal_periods',
      'ledger': 'ledger',
      'pay_modes': 'pay_modes',
      'banks': 'banks',
      'schemes': 'schemes',
      'scheme_items': 'scheme_items',
      'shifts': 'shifts',
      'vouchers': 'vouchers',
      'taxes': 'taxes',
      'transfers': 'transfers',
      'deposits': 'deposits',
      'cheques': 'cheques',
      'recon': 'recon',
      'currency': 'currency',
      'assets': 'assets',
      'budgeting': 'budgeting',
      'capitations': 'capitations',
      'opening_bal': 'opening_bal',
      'consultants': 'consultants',
      'employees': 'employees',
      'pay_periods': 'pay_periods',
      'payroll_params': 'payroll_params',
      'paye_ranges': 'paye_ranges',
      'salary_advances': 'salary_advances',
      'payslips': 'payslips',
      'leave': 'leaves',
      'scheduling': 'scheduling',
      'attendance': 'attendance',
      'roles': 'user_roles',
      'privileges': 'privileges',
      'system_users': 'system_users',
      'services': 'services',
      'lab_test': 'lab_tests',
      'rooms': 'rooms',
      'ward_beds': 'ward_beds',
      'departments': 'departments',
      'storage_loc': 'storage_loc',
      'branch_profile': 'branch_profile',
      'hospital_info': 'hospital_info',
      'medical_clinics': 'medical_clinics',
      'vitals_config': 'vitals_config',
      'billables': 'billables',
      'notifications': 'notifications',
      'consent_forms': 'consent_forms',
      'api_config': 'api_config',
      'generic_modules': 'generic_modules',
      'icd_config': 'icd_config',
      'barcodes': 'barcodes',
      'attach_storage': 'attach_storage',
      'report_templates': 'report_templates',
      'fin_reports': 'reports',
      'clinical_reports': 'reports',
      'inventory_reports': 'reports',
      'system_logs': 'reports',
      'home': 'dashboard'
    };
    return map[id] || 'other';
  };

  const handleSubItemClick = (subId: string) => {
    onNavigate(getMappedView(subId));
  };

  if (!isOpen) return null;

  return (
    <aside className="w-64 bg-[#212529] text-gray-300 flex flex-col border-r border-gray-800 h-full select-none">
      <div className="h-10 px-3 flex items-center gap-2 bg-[#212529]">
        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
          <i className="fa-solid fa-h text-white text-[10px]"></i>
        </div>
        <span className="text-sm font-semibold tracking-tight text-gray-200">
          Haven MIS
        </span>
      </div>

      <div className="px-2 py-2">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Find a panel"
            className="w-full bg-white text-xs py-1.5 px-3 rounded-sm border-none focus:outline-none text-gray-800 placeholder-gray-400"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto custom-scrollbar pt-1">
        <div 
          onClick={() => { onNavigate('dashboard'); setActiveItemId(null); }}
          className={`flex items-center gap-3 px-3 py-2 hover:bg-[#343a40] cursor-pointer transition-colors ${currentView === 'dashboard' ? 'text-white bg-[#343a40]' : 'text-gray-400'}`}
        >
          <i className="fa-solid fa-home text-center text-xs w-4"></i>
          <span className="text-[13px] font-medium">Home</span>
        </div>

        {SIDEBAR_ITEMS.filter(item => item.id !== 'home').map((item) => (
          <div key={item.id} className="mb-0.5">
            <div 
              onClick={() => toggleExpand(item.id)}
              className={`flex items-center justify-between px-3 py-2 hover:bg-[#343a40] cursor-pointer transition-colors ${activeItemId === item.id ? 'text-white bg-[#343a40]' : 'text-gray-400'}`}
            >
              <div className="flex items-center gap-3">
                <i className={`fa-solid ${item.icon} w-4 text-center text-xs`}></i>
                <span className="text-[13px] font-medium">{item.label}</span>
              </div>
              {item.children && item.children.length > 0 && (
                <i className={`fa-solid fa-chevron-down text-[9px] transition-transform ${activeItemId === item.id ? 'rotate-180' : ''}`}></i>
              )}
            </div>
            
            {activeItemId === item.id && item.children && item.children.length > 0 && (
              <div className="bg-[#1a1e22] py-1 border-l-2 border-cyan-700 ml-4">
                {item.children.map(sub => {
                  const mappedSubView = getMappedView(sub.id);
                  const isActive = currentView === mappedSubView && mappedSubView !== 'other';
                  
                  return (
                    <div 
                      key={sub.id} 
                      onClick={(e) => { e.stopPropagation(); handleSubItemClick(sub.id); }}
                      className={`flex items-center justify-between pl-4 pr-3 py-1.5 text-[12px] hover:text-white hover:bg-[#343a40] cursor-pointer transition-colors ${isActive ? 'text-white bg-[#343a40]' : 'text-gray-400'}`}
                    >
                      <div className="flex items-center gap-3">
                        <i className={`fa-solid ${sub.icon} w-4 text-center opacity-80`}></i>
                        <span>{sub.label}</span>
                      </div>
                      {sub.badge && (
                        <span className="text-[10px] text-gray-200 opacity-60 font-light italic">
                          {sub.badge}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-gray-700 bg-[#1a1e22]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <i className="fa-solid fa-user text-xs"></i>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-200">System Admin</span>
            <span className="text-[10px] text-gray-500">Connected</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
