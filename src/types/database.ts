export type UserRole = 'customer' | 'advisor' | 'admin'
export type ProductType = 'new_mortgage' | 'refinance' | 'consolidation' | 'complex' | 'other'
export type LeadStatus = 'new' | 'contacted' | 'questionnaire' | 'case_opened' | 'irrelevant' | 'frozen'
export type CaseStatus =
  | 'new'
  | 'awaiting_docs'
  | 'partial_docs'
  | 'ready_for_review'
  | 'advisor_review'
  | 'building_options'
  | 'awaiting_client'
  | 'submitted'
  | 'completed'
  | 'closed'
export type DocumentStatus = 'missing' | 'uploaded' | 'reviewed' | 'invalid' | 'needs_reupload' | 'approved'
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled'
export type TaskType = 'document_request' | 'follow_up' | 'review' | 'call' | 'internal'
export type ActivityType = 'status_change' | 'note' | 'document' | 'task' | 'message' | 'system'

export interface Profile {
  id: string
  role: UserRole
  full_name: string
  phone: string | null
  email: string
  avatar_url: string | null
  created_at: Date | string
  updated_at: Date | string
}

export interface Lead {
  id: string
  full_name: string
  phone: string
  email: string | null
  source: string | null
  product_type: ProductType
  status: LeadStatus
  assigned_advisor_id: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  notes: string | null
  score: number | null
  created_at: Date | string
  updated_at: Date | string
}

export interface Customer {
  id: string
  user_id: string | null
  lead_id: string | null
  full_name: string
  id_number: string
  phone: string
  email: string | null
  date_of_birth: Date | string | null
  marital_status: string | null
  employment_type: string | null
  monthly_income: number | null
  partner_monthly_income: number | null
  existing_obligations: number | null
  created_at: Date | string
  updated_at: Date | string
}

export interface MortgageCase {
  id: string
  case_number: string
  customer_id: string
  lead_id: string | null
  assigned_advisor_id: string | null
  product_type: ProductType
  status: CaseStatus
  property_value: number | null
  requested_amount: number | null
  ltv_ratio: number | null
  term_years: number | null
  priority: number | null
  notes: string | null
  created_at: Date | string
  updated_at: Date | string
}

export interface Document {
  id: string
  case_id: string
  customer_id: string
  document_type: string
  file_name: string
  file_path: string
  file_size: number | null
  mime_type: string | null
  status: DocumentStatus
  reviewer_id: string | null
  review_note: string | null
  uploaded_at: Date | string
  reviewed_at: Date | string | null
}

export interface Task {
  id: string
  case_id: string | null
  assigned_to: string | null
  created_by: string
  title: string
  description: string | null
  type: TaskType
  priority: number | null
  status: TaskStatus
  due_date: Date | string | null
  completed_at: Date | string | null
  created_at: Date | string
}

export interface Activity {
  id: string
  case_id: string | null
  lead_id: string | null
  actor_id: string
  type: ActivityType
  title: string
  description: string | null
  metadata: Record<string, unknown> | null
  created_at: Date | string
}

export interface QuestionnaireAnswer {
  id: string
  lead_id: string | null
  customer_id: string | null
  step_key: string
  answers: Record<string, unknown>
  completed: boolean
  created_at: Date | string
  updated_at: Date | string
}

export interface Offer {
  id: string
  case_id: string
  bank_name: string
  tracks: unknown[]
  total_amount: number | null
  monthly_payment: number | null
  total_interest: number | null
  status: string
  notes: string | null
  created_at: Date | string
}
