
import { NavItem, QuickAction } from './types';

export const SIDEBAR_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'fa-home', color: 'text-slate-400' },
  { 
    id: 'billing', 
    label: 'Billing', 
    icon: 'fa-dollar-sign', 
    color: 'text-emerald-500',
    children: [
      { id: 'pharmacy_billing', label: 'Pharmacy', icon: 'fa-pills' },
      { id: 'otc_billing', label: 'Over The Counter', icon: 'fa-shopping-basket' },
      { id: 'patient_bills', label: 'Patients Bills', icon: 'fa-file-invoice-dollar' },
      { id: 'receipts', label: 'Receipts', icon: 'fa-receipt' },
      { id: 'ar_invoices', label: 'A/R Invoices', icon: 'fa-file-signature' },
      { id: 'gate_pass', label: 'Gate Pass', icon: 'fa-ticket-alt' },
      { id: 'proforma', label: 'Pro Forma Invoices', icon: 'fa-file-alt' },
      { id: 'refunds', label: 'Refunds on Advance', icon: 'fa-history' },
    ] 
  },
  { 
    id: 'clinical', 
    label: 'Clinical', 
    icon: 'fa-user-md', 
    color: 'text-rose-500',
    children: [
      { id: 'registry', label: 'Registry', icon: 'fa-address-book' },
      { id: 'triage', label: 'Triage', icon: 'fa-stethoscope' },
      { id: 'doctor', label: 'Doctor', icon: 'fa-user-doctor' },
      { id: 'doctor_new', label: 'Doctor', icon: 'fa-user-nurse', badge: 'New' },
      { id: 'special_clinics', label: 'Special Clinics', icon: 'fa-house-medical' },
      { id: 'patient_chart', label: 'Patient Chart', icon: 'fa-file-medical' },
      { id: 'laboratory', label: 'Laboratory', icon: 'fa-vials' },
      { id: 'radiology', label: 'Radiology', icon: 'fa-x-ray' },
      { id: 'theatre', label: 'Theatre', icon: 'fa-masks-theater' },
      { id: 'inpatient', label: 'Inpatient', icon: 'fa-bed-pulse' },
      { id: 'appointments_clinical', label: 'Appointments', icon: 'fa-calendar-day' },
      { id: 'referrals', label: 'Referrals', icon: 'fa-share-nodes' },
    ] 
  },
  { 
    id: 'cds', 
    label: 'CDS Tools', 
    icon: 'fa-clipboard-check', 
    color: 'text-violet-500',
    children: [
      { id: 'order_sets', label: 'Order Sets', icon: 'fa-hand-point-right' },
    ] 
  },
  { 
    id: 'maternity', 
    label: 'Maternity', 
    icon: 'fa-baby', 
    color: 'text-pink-500',
    children: [
      { id: 'maternity_main', label: 'Maternity', icon: 'fa-person-breastfeeding' },
      { id: 'milestones', label: 'Development Milestones', icon: 'fa-chart-line' },
      { id: 'immunization', label: 'Required Immunization', icon: 'fa-syringe' },
    ] 
  },
  { 
    id: 'dialysis', 
    label: 'Dialysis', 
    icon: 'fa-vial-circle-check', 
    color: 'text-blue-500',
    children: [
      { id: 'dialysis_orders', label: 'Dialysis Orders', icon: 'fa-file-waveform' },
      { id: 'dialysis_checklists', label: 'Dialysis Checklists', icon: 'fa-list-check' },
    ] 
  },
  { 
    id: 'htn', 
    label: 'HTN Clinic', 
    icon: 'fa-heart-pulse', 
    color: 'text-red-500',
    children: [
      { id: 'htn_registry', label: 'HTN Registry', icon: 'fa-id-card-clip' },
      { id: 'htn_visits', label: 'Patient Follow-up', icon: 'fa-user-clock' },
    ] 
  },
  { 
    id: 'cwc', 
    label: 'CWC', 
    icon: 'fa-child-reaching', 
    color: 'text-orange-500',
    children: [
      { id: 'cwc_registry', label: 'Child Registry', icon: 'fa-baby' },
      { id: 'growth_monitoring', label: 'Growth Monitoring', icon: 'fa-weight-scale' },
      { id: 'cwc_visits', label: 'CWC Visits', icon: 'fa-calendar-check' },
    ] 
  },
  { 
    id: 'icu', 
    label: 'ICU Clinic', 
    icon: 'fa-bed-pulse', 
    color: 'text-rose-600',
    children: [
      { id: 'icu_assessment', label: 'Assessment Form', icon: 'fa-clipboard-list' },
      { id: 'icu_examination', label: 'Examination Form', icon: 'fa-stethoscope' },
      { id: 'nicu_clinic', label: 'NICU Doctors clinic', icon: 'fa-user-nurse' },
    ] 
  },
  { 
    id: 'procurement', 
    label: 'Procurement', 
    icon: 'fa-shopping-cart', 
    color: 'text-indigo-500',
    children: [
      { id: 'suppliers', label: 'Suppliers', icon: 'fa-building-user' },
      { id: 'supplier_bills', label: 'Supplier Bills(A/P Invoices)', icon: 'fa-file-invoice-dollar' },
      { id: 'purchase_req', label: 'Purchase Requisition Note', icon: 'fa-clipboard-question' },
      { id: 'purchase_orders', label: 'Purchase Orders', icon: 'fa-file-signature' },
      { id: 'grn', label: 'Goods Received Notes', icon: 'fa-truck-ramp-box' },
      { id: 'ap_vouchers', label: 'A/P Payment Vouchers', icon: 'fa-money-bill-transfer' },
      { id: 'supplier_prepayments', label: 'Supplier Prepayments', icon: 'fa-wallet' },
    ] 
  },
  { 
    id: 'inventory', 
    label: 'Inventory', 
    icon: 'fa-boxes', 
    color: 'text-amber-500',
    children: [
      { id: 'inv_main', label: 'Inventory', icon: 'fa-boxes-stacked' },
      { id: 'int_orders', label: 'Internal Orders', icon: 'fa-file-import' },
      { id: 'branch_orders', label: 'Interbranch Orders', icon: 'fa-arrow-right-arrow-left' },
      { id: 'consumption', label: 'Material Consumption', icon: 'fa-flask-vial' },
      { id: 'stock_take', label: 'Stock Take', icon: 'fa-clipboard-check' },
      { id: 'uom', label: 'Unit Of Measure', icon: 'fa-ruler-combined' },
    ] 
  },
  { 
    id: 'accounts', 
    label: 'Accounts', 
    icon: 'fa-calculator', 
    color: 'text-green-600',
    children: [
      { id: 'fiscal_periods', label: 'Fiscal Periods', icon: 'fa-calendar-days' },
      { id: 'ledger', label: 'Ledger Accounts', icon: 'fa-book-journal-whills' },
      { id: 'pay_modes', label: 'Payment Modes', icon: 'fa-credit-card' },
      { id: 'banks', label: 'Banks', icon: 'fa-building-columns' },
      { id: 'schemes', label: 'Schemes', icon: 'fa-shield-halved' },
      { id: 'scheme_items', label: 'Scheme Items', icon: 'fa-list-ul' },
      { id: 'shifts', label: 'Cashier Shifts', icon: 'fa-clock-rotate-left' },
      { id: 'vouchers', label: 'Journal Vouchers', icon: 'fa-file-signature' },
      { id: 'taxes', label: 'Taxes', icon: 'fa-percent' },
      { id: 'transfers', label: 'Cash Transfers', icon: 'fa-money-bill-transfer' },
      { id: 'deposits', label: 'Bank Deposits', icon: 'fa-piggy-bank' },
      { id: 'cheques', label: 'Cheques', icon: 'fa-money-check' },
      { id: 'recon', label: 'Bank Reconciliation', icon: 'fa-scale-balanced' },
      { id: 'currency', label: 'Currency Units', icon: 'fa-coins' },
      { id: 'assets', label: 'Asset Management', icon: 'fa-vault' },
      { id: 'budgeting', label: 'Budgeting', icon: 'fa-chart-pie' },
      { id: 'capitations', label: 'Capitations', icon: 'fa-user-group' },
      { id: 'opening_bal', label: 'Opening Balances', icon: 'fa-door-open' },
    ] 
  },
  { 
    id: 'hr', 
    label: 'Human Resource', 
    icon: 'fa-users-cog', 
    color: 'text-teal-500',
    children: [
      { id: 'consultants', label: 'Consultants', icon: 'fa-user-doctor' },
      { id: 'employees', label: 'Employees', icon: 'fa-users' },
      { id: 'pay_periods', label: 'Pay Periods', icon: 'fa-calendar-days' },
      { id: 'payroll_params', label: 'Payroll Parameters', icon: 'fa-sliders' },
      { id: 'paye_ranges', label: 'PAYE Tax Ranges', icon: 'fa-percent' },
      { id: 'salary_advances', label: 'Salary Advances', icon: 'fa-money-bill-trend-up' },
      { id: 'payslips', label: 'Payslips', icon: 'fa-file-invoice-dollar' },
      { id: 'leave', label: 'Leaves', icon: 'fa-plane-departure' },
      { id: 'scheduling', label: 'Scheduling', icon: 'fa-calendar-week' },
      { id: 'attendance', label: 'Attendances', icon: 'fa-id-badge' },
    ] 
  },
  { 
    id: 'security', 
    label: 'Security', 
    icon: 'fa-lock', 
    color: 'text-slate-400',
    children: [
      { id: 'roles', label: 'User Roles', icon: 'fa-user-shield' },
      { id: 'privileges', label: 'Privileges', icon: 'fa-key' },
      { id: 'system_users', label: 'System Users', icon: 'fa-users-gear' },
    ] 
  },
  { 
    id: 'config', 
    label: 'Configuration', 
    icon: 'fa-cog', 
    color: 'text-blue-600',
    children: [
      { id: 'services', label: 'Services', icon: 'fa-bell-concierge' },
      { id: 'lab_test', label: 'Lab Test', icon: 'fa-microscope' },
      { id: 'rooms', label: 'Rooms', icon: 'fa-door-closed' },
      { id: 'ward_beds', label: 'Ward Beds', icon: 'fa-bed-pulse' },
      { id: 'departments', label: 'Departments', icon: 'fa-sitemap' },
      { id: 'storage_loc', label: 'Storage Location', icon: 'fa-warehouse' },
      { id: 'branch_profile', label: 'Branch Profile', icon: 'fa-building-circle-check' },
      { id: 'hospital_info', label: 'Hospital Info', icon: 'fa-circle-info' },
      { id: 'medical_clinics', label: 'Medical Clinics', icon: 'fa-clinic-medical' },
      { id: 'vitals_config', label: 'Vitals', icon: 'fa-heart-pulse' },
      { id: 'billables', label: 'Billables & Charges', icon: 'fa-file-invoice' },
      { id: 'notifications', label: 'Automated Notifications', icon: 'fa-robot' },
      { id: 'consent_forms', label: 'Consent Forms', icon: 'fa-file-signature' },
      { id: 'api_config', label: 'API Configurations', icon: 'fa-code' },
      { id: 'generic_modules', label: 'Generic Modules', icon: 'fa-cubes' },
      { id: 'icd_config', label: 'ICD Configuration', icon: 'fa-book-medical' },
      { id: 'barcodes', label: 'Barcodes', icon: 'fa-barcode' },
      { id: 'attach_storage', label: 'Attach Storage', icon: 'fa-paperclip' },
      { id: 'report_templates', label: 'Report Templates', icon: 'fa-file-lines' },
      { id: 'waiting_bays', label: 'Waiting Bays', icon: 'fa-couch' },
      { id: 'service_rules', label: 'Service Point Rules', icon: 'fa-gavel' },
    ] 
  },
  { 
    id: 'morgue', 
    label: 'Morgue', 
    icon: 'fa-house-chimney-medical', 
    color: 'text-purple-700',
    children: [
      { id: 'morgue_mgmt', label: 'Morgue', icon: 'fa-id-card' },
      { id: 'storage_areas', label: 'Storage Areas', icon: 'fa-boxes-packing' },
      { id: 'chambers', label: 'Chambers', icon: 'fa-door-open' },
    ] 
  },
  { 
    id: 'communication', 
    label: 'Communication', 
    icon: 'fa-comments', 
    color: 'text-sky-500',
    children: [
      { id: 'sms', label: 'SMS Service', icon: 'fa-comment-sms' },
      { id: 'sms_templates', label: 'SMS Templates', icon: 'fa-paste' },
    ] 
  },
  { 
    id: 'diary', 
    label: 'Diary', 
    icon: 'fa-book', 
    color: 'text-purple-500',
    children: [
      { id: 'personal_diary', label: 'Personal Diary', icon: 'fa-calendar-day' },
      { id: 'reminders', label: 'Reminders', icon: 'fa-bell-on' },
      { id: 'events', label: 'Events', icon: 'fa-star' },
    ] 
  },
  { 
    id: 'reports', 
    label: 'Reports', 
    icon: 'fa-file-alt', 
    color: 'text-indigo-600',
    children: [
      { id: 'fin_reports', label: 'Financial Reports', icon: 'fa-chart-pie' },
      { id: 'clinical_reports', label: 'Clinical Stats', icon: 'fa-chart-user' },
      { id: 'inventory_reports', label: 'Inventory Status', icon: 'fa-boxes-stacked' },
      { id: 'system_logs', label: 'System Logs', icon: 'fa-terminal' },
    ] 
  },
];

export const QUICK_ACTIONS: QuickAction[] = [
  { id: 'patient_registry', label: 'Patient Registry', icon: 'fa-clipboard-list', color: 'text-blue-500' },
  { id: 'doctor', label: 'Doctor', icon: 'fa-user-nurse', color: 'text-rose-500' },
  { id: 'inpatient', label: 'Inpatient', icon: 'fa-bed', color: 'text-indigo-500' },
  { id: 'triage', label: 'Triage', icon: 'fa-stethoscope', color: 'text-rose-400' },
  { id: 'appointments', label: 'Appointments', icon: 'fa-calendar-check', color: 'text-sky-500' },
  { id: 'pharmacy', label: 'Pharmacy', icon: 'fa-pills', color: 'text-emerald-500' },
  { id: 'laboratory', label: 'Laboratory', icon: 'fa-vials', color: 'text-amber-500' },
  { id: 'otc', label: 'Over the Counter', icon: 'fa-money-bill-wave', color: 'text-emerald-600' },
  { id: 'bills', label: 'Customer Bills', icon: 'fa-file-invoice-dollar', color: 'text-green-600' },
  { id: 'inventory_action', label: 'Inventory', icon: 'fa-clipboard-check', color: 'text-amber-600' },
  { id: 'reports_action', label: 'Reports', icon: 'fa-file-medical', color: 'text-indigo-600' },
];
