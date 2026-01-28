
import React from 'react';

interface SpecialClinicsProps {
  onBack: () => void;
  currentRoom: string;
  onOpenRoomModal: () => void;
}

const CLINICS = [
  { id: 'hypertension', label: 'Hypertension', icon: 'fa-heart-pulse', color: 'text-cyan-800' },
  { id: 'eye_exam', label: 'Eye Examination', icon: 'fa-eye', color: 'text-cyan-800' },
  { id: 'tb_clinic', label: 'T.B Clinic', icon: 'fa-lungs', color: 'text-cyan-800' },
  { id: 'cancer_screening', label: 'Cancer Screening', icon: 'fa-ribbon', color: 'text-cyan-800' },
  { id: 'mch', label: 'MCH', icon: 'fa-baby-carriage', color: 'text-cyan-800' },
  { id: 'dermatology', label: 'Dermatology', icon: 'fa-hand-dots', color: 'text-cyan-800' },
  { id: 'hypertension_v2', label: 'Hypertension', icon: 'fa-stethoscope', color: 'text-cyan-800' },
  { id: 'immunization', label: 'Immunization', icon: 'fa-syringe', color: 'text-cyan-800' },
  { id: 'antenatal', label: 'Antenatal', icon: 'fa-person-pregnant', color: 'text-cyan-800' },
  { id: 'physiotherapy', label: 'Physiotherapy', icon: 'fa-person-walking-with-cane', color: 'text-cyan-800' },
  { id: 'dental', label: 'Dental', icon: 'fa-tooth', color: 'text-cyan-800' },
  { id: 'tb_screening', label: 'TB Screening', icon: 'fa-magnifying-glass-chart', color: 'text-cyan-800' },
  { id: 'diabetes', label: 'Diabetes', icon: 'fa-droplet', color: 'text-cyan-800' },
  { id: 'nutrition_paeds', label: 'Nutrition - Paeds', icon: 'fa-bowl-food', color: 'text-cyan-800' },
  { id: 'eye_exam_v2', label: 'Eye Examination', icon: 'fa-eye-low-vision', color: 'text-cyan-800' },
  { id: 'paed_oncology', label: 'Paediatric Oncology', icon: 'fa-child-reaching', color: 'text-cyan-800' },
  { id: 'ent', label: 'ENT', icon: 'fa-head-side-ear-listen', color: 'text-cyan-800' },
  { id: 'urology', label: 'Urology', icon: 'fa-bacteria', color: 'text-cyan-800' },
  { id: 'emergency', label: 'Emergency Clinic', icon: 'fa-truck-medical', color: 'text-cyan-800' },
  { id: 'nutrition', label: 'Nutrition', icon: 'fa-carrot', color: 'text-cyan-800' },
  { id: 'hiv', label: 'HIV', icon: 'fa-biohazard', color: 'text-cyan-800' },
  { id: 'diabetic_clinic', label: 'Diabetic Clinic', icon: 'fa-snowflake', color: 'text-cyan-800' },
  { id: 'psychology', label: 'Psychology', icon: 'fa-brain', color: 'text-cyan-800' },
  { id: 'triage_screening', label: 'Triage/Screening', icon: 'fa-wave-square', color: 'text-cyan-800' },
  { id: 'gynae', label: 'Obstetrics/Gynaecology', icon: 'fa-venus', color: 'text-cyan-800' },
];

export const SpecialClinics: React.FC<SpecialClinicsProps> = ({ onBack, currentRoom, onOpenRoomModal }) => {
  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-10">
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
          <span className="text-blue-500 cursor-pointer hover:underline">Clinical</span>
          <span className="opacity-50">/</span>
          <span className="text-gray-400 font-medium">Special Clinics</span>
        </div>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
          <i className="fa-solid fa-question-circle"></i>
          <span>Guide</span>
        </div>
      </div>

      {/* Clinics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-6 pt-6 px-2">
        {CLINICS.map((clinic) => (
          <div 
            key={clinic.id} 
            className="group relative bg-white rounded-[32px] p-6 flex flex-col items-center justify-between aspect-square shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all cursor-pointer transform hover:-translate-y-1 active:scale-95 border border-transparent hover:border-cyan-100"
          >
            {/* Unique Stylized Icon Wrapper */}
            <div className="flex-1 flex items-center justify-center">
                <div className="relative">
                    {/* Shadow/Decorative Background element for icon depth */}
                    <div className="absolute inset-0 bg-cyan-50/50 rounded-full scale-150 blur-xl group-hover:bg-cyan-100/60 transition-colors"></div>
                    <i className={`fa-solid ${clinic.icon} text-[48px] ${clinic.color} relative z-10 transition-transform group-hover:scale-110 duration-300`}></i>
                </div>
            </div>
            
            {/* Label */}
            <span className="text-[12px] font-bold text-gray-700 text-center uppercase tracking-tight leading-tight mt-4">
              {clinic.label}
            </span>

            {/* Subtle overlay effect on hover */}
            <div className="absolute inset-0 rounded-[32px] bg-cyan-600/0 group-hover:bg-cyan-600/5 transition-colors pointer-events-none"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
