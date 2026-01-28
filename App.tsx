
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { Dashboard } from './components/Dashboard';
import { PatientRegistry } from './components/PatientRegistry';
import { InpatientAdmissions } from './components/InpatientAdmissions';
import { DoctorsPanel } from './components/DoctorsPanel';
import { Triage } from './components/Triage';
import { Appointments } from './components/Appointments';
import { Pharmacy } from './components/Pharmacy';
import { Laboratory } from './components/Laboratory';
import { OverTheCounter } from './components/OverTheCounter';
import { PatientBills } from './components/PatientBills';
import { ARInvoices } from './components/ARInvoices';
import { GatePass } from './components/GatePass';
import { ProFormaInvoices } from './components/ProFormaInvoices';
import { RefundsOnAdvance } from './components/RefundsOnAdvance';
import { Reports } from './components/Reports';
import { SpecialClinics } from './components/SpecialClinics';
import { PatientChart } from './components/PatientChart';
import { Radiology } from './components/Radiology';
import { Theatre } from './components/Theatre';
import { Referrals } from './components/Referrals';
import { OrderSets } from './components/OrderSets';
import { Maternity } from './components/Maternity';
import { DevelopmentMilestones } from './components/DevelopmentMilestones';
import { RequiredImmunization } from './components/RequiredImmunization';
import { Receipts } from './components/Receipts';
import { DialysisOrders } from './components/DialysisOrders';
import { DialysisChecklists } from './components/DialysisChecklists';
import { HTNRegistry } from './components/HTNRegistry';
import { CWCVisits } from './components/CWCVisits';
import { ICUAssessmentForm } from './components/ICUAssessmentForm';
import { ICUExaminationForm } from './components/ICUExaminationForm';
import { NICUDoctorsClinic } from './components/NICUDoctorsClinic';
import { Suppliers } from './components/Suppliers';
import { SupplierBills } from './components/SupplierBills';
import { PurchaseRequisitionNote } from './components/PurchaseRequisitionNote';
import { PurchaseOrders } from './components/PurchaseOrders';
import { GoodsReceivedNotes } from './components/GoodsReceivedNotes';
import { APPaymentVouchers } from './components/APPaymentVouchers';
import { SupplierPrepayments } from './components/SupplierPrepayments';
import { Inventory } from './components/Inventory';
import { InternalOrders } from './components/InternalOrders';
import { InterbranchOrders } from './components/InterbranchOrders';
import { MaterialConsumption } from './components/MaterialConsumption';
import { StockTake } from './components/StockTake';
import { UOM } from './components/UOM';
import { FiscalPeriods } from './components/FiscalPeriods';
import { LedgerAccounts } from './components/LedgerAccounts';
import { PaymentModes } from './components/PaymentModes';
import { Banks } from './components/Banks';
import { Schemes } from './components/Schemes';
import { SchemeItems } from './components/SchemeItems';
import { CashierShifts } from './components/CashierShifts';
import { JournalVouchers } from './components/JournalVouchers';
import { Taxes } from './components/Taxes';
import { CashTransfers } from './components/CashTransfers';
import { BankDeposits } from './components/BankDeposits';
import { Cheques } from './components/Cheques';
import { BankReconciliation } from './components/BankReconciliation';
import { CurrencyUnits } from './components/CurrencyUnits';
import { AssetManagement } from './components/AssetManagement';
import { Budgeting } from './components/Budgeting';
import { Capitations } from './components/Capitations';
import { OpeningBalances } from './components/OpeningBalances';
import { Consultants } from './components/Consultants';
import { Employees } from './components/Employees';
import { PayPeriods } from './components/PayPeriods';
import { PayrollParameters } from './components/PayrollParameters';
import { PAYETaxRanges } from './components/PAYETaxRanges';
import { SalaryAdvances } from './components/SalaryAdvances';
import { Payslips } from './components/Payslips';
import { Leaves } from './components/Leaves';
import { Scheduling } from './components/Scheduling';
import { Attendances } from './components/Attendances';
import { UserRoles } from './components/UserRoles';
import { Privileges } from './components/Privileges';
import { SystemUsers } from './components/SystemUsers';
import { Services } from './components/Services';
import { LabTests } from './components/LabTests';
import { Rooms } from './components/Rooms';
import { WardBeds } from './components/WardBeds';
import { Departments } from './components/Departments';
import { StorageLocation } from './components/StorageLocation';
import { BranchProfile } from './components/BranchProfile';
import { HospitalInfo } from './components/HospitalInfo';
import { MedicalClinics } from './components/MedicalClinics';
import { VitalsConfig } from './components/VitalsConfig';
import { BillablesAndCharges } from './components/BillablesAndCharges';
import { AutomatedNotifications } from './components/AutomatedNotifications';
import { ConsentForms } from './components/ConsentForms';
import { APIConfiguration } from './components/APIConfiguration';
import { GenericModules } from './components/GenericModules';
import { ICDConfiguration } from './components/ICDConfiguration';
import { Barcodes } from './components/Barcodes';
import { AttachedStorage } from './components/AttachedStorage';
import { ReportTemplates } from './components/ReportTemplates';
import { RoomSignInModal } from './components/RoomSignInModal';

export type ViewType = 
  | 'dashboard' 
  | 'patient_registry' 
  | 'inpatient_admissions' 
  | 'doctors_panel' 
  | 'triage' 
  | 'appointments' 
  | 'pharmacy' 
  | 'laboratory' 
  | 'over_the_counter' 
  | 'patient_bills' 
  | 'receipts'
  | 'ar_invoices'
  | 'gate_pass'
  | 'proforma'
  | 'refunds'
  | 'reports' 
  | 'special_clinics'
  | 'patient_chart'
  | 'radiology'
  | 'theatre'
  | 'referrals'
  | 'order_sets'
  | 'maternity_main'
  | 'milestones'
  | 'immunization'
  | 'dialysis_orders'
  | 'dialysis_checklists'
  | 'htn_registry'
  | 'htn_visits'
  | 'cwc_registry'
  | 'cwc_visits'
  | 'growth_monitoring'
  | 'icu_assessment'
  | 'icu_examination'
  | 'nicu_clinic'
  | 'suppliers'
  | 'supplier_bills'
  | 'purchase_requisition_note'
  | 'purchase_orders'
  | 'grn'
  | 'ap_payment_vouchers'
  | 'supplier_prepayments'
  | 'inv_main'
  | 'int_orders'
  | 'branch_orders'
  | 'consumption'
  | 'stock_take'
  | 'uom'
  | 'fiscal_periods'
  | 'ledger'
  | 'pay_modes'
  | 'banks'
  | 'schemes'
  | 'scheme_items'
  | 'shifts'
  | 'vouchers'
  | 'taxes'
  | 'transfers'
  | 'deposits'
  | 'cheques'
  | 'recon'
  | 'currency'
  | 'assets'
  | 'budgeting'
  | 'capitations'
  | 'opening_bal'
  | 'consultants'
  | 'employees'
  | 'pay_periods'
  | 'payroll_params'
  | 'paye_ranges'
  | 'salary_advances'
  | 'payslips'
  | 'leaves'
  | 'scheduling'
  | 'attendance'
  | 'user_roles'
  | 'privileges'
  | 'system_users'
  | 'services'
  | 'lab_tests'
  | 'rooms'
  | 'ward_beds'
  | 'departments'
  | 'storage_loc'
  | 'branch_profile'
  | 'hospital_info'
  | 'medical_clinics'
  | 'vitals_config'
  | 'billables'
  | 'notifications'
  | 'consent_forms'
  | 'api_config'
  | 'generic_modules'
  | 'icd_config'
  | 'barcodes'
  | 'attach_storage'
  | 'report_templates'
  | 'other';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [currentRoom, setCurrentRoom] = useState('Consultation Room 1');
  const [currentStatus, setCurrentStatus] = useState('Available');
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  
  // Persist doctor session across views
  const [doctorSession, setDoctorSession] = useState<any>(null);

  const navigateTo = (view: ViewType) => {
    setCurrentView(view);
  };

  const handleRoomUpdate = (room: string, status: string) => {
    setCurrentRoom(room);
    setCurrentStatus(status);
    setIsRoomModalOpen(false);
  };

  return (
    <div className="flex h-screen w-full bg-[#f4f7f9] overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onNavigate={navigateTo} 
        currentView={currentView}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          {currentView === 'dashboard' ? (
            <Dashboard onNavigate={navigateTo} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'patient_registry' ? (
            <PatientRegistry 
              onBack={() => navigateTo('dashboard')} 
              onNavigate={navigateTo}
              setCurrentRoom={setCurrentRoom}
              currentRoom={currentRoom} 
              onOpenRoomModal={() => setIsRoomModalOpen(true)} 
            />
          ) : currentView === 'inpatient_admissions' ? (
            <InpatientAdmissions onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'doctors_panel' ? (
            <DoctorsPanel 
              onBack={() => navigateTo('dashboard')} 
              currentRoom={currentRoom} 
              onOpenRoomModal={() => setIsRoomModalOpen(true)} 
              session={doctorSession}
              setSession={setDoctorSession}
            />
          ) : currentView === 'triage' ? (
            <Triage onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'appointments' ? (
            <Appointments onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'pharmacy' ? (
            <Pharmacy onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'laboratory' ? (
            <Laboratory onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'over_the_counter' ? (
            <OverTheCounter onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'patient_bills' ? (
            <PatientBills onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'receipts' ? (
            <Receipts onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'ar_invoices' ? (
            <ARInvoices onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'gate_pass' ? (
            <GatePass onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'proforma' ? (
            <ProFormaInvoices onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'refunds' ? (
            <RefundsOnAdvance onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'reports' ? (
            <Reports onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'special_clinics' ? (
            <SpecialClinics onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'patient_chart' ? (
            <PatientChart onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'radiology' ? (
            <Radiology onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'theatre' ? (
            <Theatre onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'referrals' ? (
            <Referrals onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'order_sets' ? (
            <OrderSets onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'maternity_main' ? (
            <Maternity onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'milestones' ? (
            <DevelopmentMilestones onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'immunization' ? (
            <RequiredImmunization onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'dialysis_orders' ? (
            <DialysisOrders onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'dialysis_checklists' ? (
            <DialysisChecklists onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'htn_registry' ? (
            <HTNRegistry onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'cwc_visits' ? (
            <CWCVisits onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'icu_assessment' ? (
            <ICUAssessmentForm onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'icu_examination' ? (
            <ICUExaminationForm onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'nicu_clinic' ? (
            <NICUDoctorsClinic onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'suppliers' ? (
            <Suppliers onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'supplier_bills' ? (
            <SupplierBills onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'purchase_requisition_note' ? (
            <PurchaseRequisitionNote onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'purchase_orders' ? (
            <PurchaseOrders onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'grn' ? (
            <GoodsReceivedNotes onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'ap_payment_vouchers' ? (
            <APPaymentVouchers onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'supplier_prepayments' ? (
            <SupplierPrepayments onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'inv_main' ? (
            <Inventory onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'int_orders' ? (
            <InternalOrders onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'branch_orders' ? (
            <InterbranchOrders onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'consumption' ? (
            <MaterialConsumption onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'stock_take' ? (
            <StockTake onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'uom' ? (
            <UOM onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'fiscal_periods' ? (
            <FiscalPeriods onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'ledger' ? (
            <LedgerAccounts onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'pay_modes' ? (
            <PaymentModes onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'banks' ? (
            <Banks onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'schemes' ? (
            <Schemes onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'scheme_items' ? (
            <SchemeItems onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'shifts' ? (
            <CashierShifts onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'vouchers' ? (
            <JournalVouchers onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'taxes' ? (
            <Taxes onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'transfers' ? (
            <CashTransfers onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'deposits' ? (
            <BankDeposits onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'cheques' ? (
            <Cheques onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'recon' ? (
            <BankReconciliation onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'currency' ? (
            <CurrencyUnits onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'assets' ? (
            <AssetManagement onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'budgeting' ? (
            <Budgeting onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'capitations' ? (
            <Capitations onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'opening_bal' ? (
            <OpeningBalances onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'consultants' ? (
            <Consultants onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'employees' ? (
            <Employees onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'pay_periods' ? (
            <PayPeriods onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'payroll_params' ? (
            <PayrollParameters onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'paye_ranges' ? (
            <PAYETaxRanges onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'salary_advances' ? (
            <SalaryAdvances onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'payslips' ? (
            <Payslips onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'leaves' ? (
            <Leaves onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'scheduling' ? (
            <Scheduling onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'attendance' ? (
            <Attendances onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'user_roles' ? (
            <UserRoles onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'privileges' ? (
            <Privileges onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'system_users' ? (
            <SystemUsers onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'services' ? (
            <Services onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'lab_tests' ? (
            <LabTests onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'rooms' ? (
            <Rooms onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'ward_beds' ? (
            <WardBeds onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'departments' ? (
            <Departments onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'storage_loc' ? (
            <StorageLocation onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'branch_profile' ? (
            <BranchProfile onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'hospital_info' ? (
            <HospitalInfo onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'medical_clinics' ? (
            <MedicalClinics onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'vitals_config' ? (
            <VitalsConfig onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'billables' ? (
            <BillablesAndCharges onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'notifications' ? (
            <AutomatedNotifications onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'consent_forms' ? (
            <ConsentForms onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'api_config' ? (
            <APIConfiguration onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'generic_modules' ? (
            <GenericModules onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'icd_config' ? (
            <ICDConfiguration onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'barcodes' ? (
            <Barcodes onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'attach_storage' ? (
            <AttachedStorage onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : currentView === 'report_templates' ? (
            <ReportTemplates onBack={() => navigateTo('dashboard')} currentRoom={currentRoom} onOpenRoomModal={() => setIsRoomModalOpen(true)} />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500">
              <div className="text-center bg-white p-12 rounded-2xl shadow-xl border border-slate-100">
                <i className="fa-solid fa-screwdriver-wrench text-6xl mb-6 text-slate-200"></i>
                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Component Sandbox</h2>
                <p className="mt-2 text-slate-400 font-medium">This module is currently being optimized for Haven MIS.</p>
                <button 
                  onClick={() => navigateTo('dashboard')}
                  className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                >
                  Return to Command Center
                </button>
              </div>
            </div>
          )}
          
          {isRoomModalOpen && (
            <RoomSignInModal 
              currentRoom={currentRoom}
              currentStatus={currentStatus}
              onClose={() => setIsRoomModalOpen(false)}
              onUpdate={handleRoomUpdate}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
