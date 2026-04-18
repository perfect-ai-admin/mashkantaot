import type {
  ProductType,
  LeadStatus,
  CaseStatus,
  DocumentStatus,
  TaskStatus,
} from '@/types/database'

export const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
  new_mortgage: 'משכנתא חדשה',
  refinance: 'מחזור משכנתא',
  consolidation: 'איחוד הלוואות',
  complex: 'משכנתא למורכבים',
  other: 'אחר',
}

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'חדש',
  contacted: 'נוצר קשר',
  questionnaire: 'בתהליך שאלון',
  case_opened: 'פתח תיק',
  irrelevant: 'לא רלוונטי',
  frozen: 'קפוא',
}

export const CASE_STATUS_LABELS: Record<CaseStatus, string> = {
  new: 'חדש',
  awaiting_docs: 'ממתין למסמכים',
  partial_docs: 'מסמכים חלקיים',
  ready_for_review: 'מוכן לבדיקה',
  advisor_review: 'בבדיקת יועץ',
  building_options: 'נבנות אפשרויות',
  awaiting_client: 'ממתין ללקוח',
  submitted: 'הוגש',
  completed: 'הושלם',
  closed: 'נסגר',
}

export const DOCUMENT_STATUS_LABELS: Record<DocumentStatus, string> = {
  missing: 'חסר',
  uploaded: 'הועלה',
  reviewed: 'נבדק',
  invalid: 'לא תקין',
  needs_reupload: 'נדרש מחדש',
  approved: 'אושר',
}

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  pending: 'ממתין',
  in_progress: 'בטיפול',
  completed: 'הושלם',
  cancelled: 'בוטל',
}

export const REQUIRED_DOCUMENTS: Record<ProductType, { type: string; label: string }[]> = {
  new_mortgage: [
    { type: 'id_card', label: 'תעודת זהות' },
    { type: 'salary_slips', label: '3 תלושי שכר' },
    { type: 'bank_statements', label: 'דפי עו"ש 3 חודשים' },
    { type: 'equity_proof', label: 'אישור הון עצמי' },
    { type: 'property_docs', label: 'מסמכי נכס' },
  ],
  refinance: [
    { type: 'mortgage_balance', label: 'דו"ח יתרת משכנתא' },
    { type: 'bank_statements', label: 'דפי עו"ש' },
    { type: 'salary_slips', label: 'תלושי שכר' },
    { type: 'existing_terms', label: 'תנאי משכנתא קיימת' },
  ],
  consolidation: [
    { type: 'loan_list', label: 'רשימת הלוואות' },
    { type: 'loan_balances', label: 'יתרות הלוואה' },
    { type: 'monthly_payments', label: 'החזרים חודשיים' },
    { type: 'bank_statements', label: 'דפי עו"ש' },
    { type: 'salary_slips', label: 'תלושי שכר' },
    { type: 'property_docs', label: 'מסמכי נכס' },
  ],
  complex: [
    { type: 'id_card', label: 'תעודת זהות' },
    { type: 'salary_slips', label: 'תלושי שכר' },
    { type: 'bank_statements', label: 'דפי עו"ש' },
    { type: 'property_docs', label: 'מסמכי נכס' },
  ],
  other: [
    { type: 'id_card', label: 'תעודת זהות' },
    { type: 'bank_statements', label: 'דפי עו"ש' },
  ],
}

export const NAV_MARKETING = [
  { href: '/', label: 'דף הבית' },
  { href: '/about', label: 'אודות' },
  { href: '/services', label: 'שירותים' },
  { href: '/contact', label: 'צור קשר' },
]

export const NAV_PORTAL = [
  { href: '/portal', label: 'סקירה כללית' },
  { href: '/portal/questionnaire', label: 'שאלון' },
  { href: '/portal/documents', label: 'מסמכים' },
  { href: '/portal/status', label: 'סטטוס תיק' },
]

export const NAV_CRM = [
  { href: '/crm', label: 'דשבורד' },
  { href: '/crm/leads', label: 'לידים' },
  { href: '/crm/cases', label: 'תיקים' },
  { href: '/crm/customers', label: 'לקוחות' },
  { href: '/crm/tasks', label: 'משימות' },
]
