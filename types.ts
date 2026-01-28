
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  color?: string;
  badge?: string;
  children?: NavItem[];
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  color?: string;
}

export interface PatientScheme {
  id?: string;
  patient_id: string;
  scheme_name: string;
  principal_member: string;
  membership_no: string;
  is_principal: boolean;
  notes?: string;
}

export interface QueueRecord {
  id?: string;
  patient_id: string;
  previous_room: string;
  current_room: string;
  note?: string;
  is_emergency: boolean;
  is_revisit: boolean;
  status: 'Waiting' | 'In Progress' | 'Completed';
}
