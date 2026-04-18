import type { ProductType } from '@/types/database'

export interface FieldOption {
  value: string
  label: string
}

export interface FieldConfig {
  name: string
  label: string
  type: 'text' | 'tel' | 'email' | 'number' | 'select' | 'radio'
  options?: FieldOption[]
  placeholder?: string
  required?: boolean
  min?: number
  max?: number
}

export interface StepConfig {
  key: string
  title: string
  fields: FieldConfig[]
}

const PERSONAL_BASE: FieldConfig[] = [
  { name: 'full_name', label: 'שם מלא', type: 'text', placeholder: 'ישראל ישראלי', required: true },
  { name: 'phone', label: 'טלפון', type: 'tel', placeholder: '050-0000000', required: true },
  { name: 'email', label: 'אימייל', type: 'email', placeholder: 'name@example.com', required: true },
]

const MARITAL_STATUS_FIELD: FieldConfig = {
  name: 'marital_status',
  label: 'מצב משפחתי',
  type: 'radio',
  required: true,
  options: [
    { value: 'single', label: 'רווק/ה' },
    { value: 'married', label: 'נשוי/אה' },
    { value: 'divorced', label: 'גרוש/ה' },
  ],
}

const STEPS_NEW_MORTGAGE: StepConfig[] = [
  {
    key: 'personal',
    title: 'פרטים אישיים',
    fields: [
      ...PERSONAL_BASE,
      MARITAL_STATUS_FIELD,
      { name: 'children', label: 'מספר ילדים', type: 'number', min: 0, max: 10, placeholder: '0', required: false },
    ],
  },
  {
    key: 'employment',
    title: 'תעסוקה והכנסה',
    fields: [
      {
        name: 'employment_type',
        label: 'סטטוס תעסוקתי',
        type: 'radio',
        required: true,
        options: [
          { value: 'employee', label: 'שכיר/ה' },
          { value: 'self_employed', label: 'עצמאי/ת' },
          { value: 'both', label: 'שניהם' },
        ],
      },
      { name: 'monthly_income', label: 'הכנסה חודשית נטו (₪)', type: 'number', min: 0, placeholder: '15000', required: true },
      { name: 'partner_income', label: 'הכנסת בן/בת זוג (₪)', type: 'number', min: 0, placeholder: '0', required: false },
    ],
  },
  {
    key: 'financial',
    title: 'מצב פיננסי',
    fields: [
      { name: 'monthly_obligations', label: 'התחייבויות חודשיות קיימות (₪)', type: 'number', min: 0, placeholder: '0', required: true },
      {
        name: 'has_loans',
        label: 'האם יש הלוואות קיימות?',
        type: 'radio',
        required: true,
        options: [
          { value: 'yes', label: 'כן' },
          { value: 'no', label: 'לא' },
        ],
      },
      { name: 'loans_amount', label: 'סך הלוואות קיימות (₪)', type: 'number', min: 0, placeholder: '0', required: false },
      { name: 'equity', label: 'הון עצמי / חיסכון (₪)', type: 'number', min: 0, placeholder: '200000', required: true },
    ],
  },
  {
    key: 'property',
    title: 'פרטי הנכס',
    fields: [
      { name: 'property_price', label: 'מחיר הנכס המבוקש (₪)', type: 'number', min: 0, placeholder: '2000000', required: true },
      { name: 'property_area', label: 'אזור / עיר', type: 'text', placeholder: 'תל אביב', required: true },
      {
        name: 'property_type',
        label: 'סוג נכס',
        type: 'radio',
        required: true,
        options: [
          { value: 'apartment', label: 'דירה' },
          { value: 'house', label: 'בית פרטי' },
          { value: 'land', label: 'מגרש' },
          { value: 'other', label: 'אחר' },
        ],
      },
    ],
  },
  {
    key: 'summary',
    title: 'סיכום פרטים',
    fields: [],
  },
]

const STEPS_REFINANCE: StepConfig[] = [
  {
    key: 'personal',
    title: 'פרטים אישיים',
    fields: PERSONAL_BASE,
  },
  {
    key: 'current_mortgage',
    title: 'פרטי המשכנתא הנוכחית',
    fields: [
      { name: 'remaining_balance', label: 'יתרת משכנתא (₪)', type: 'number', min: 0, placeholder: '800000', required: true },
      { name: 'current_payment', label: 'החזר חודשי נוכחי (₪)', type: 'number', min: 0, placeholder: '4500', required: true },
      { name: 'interest_rate', label: 'ריבית משוערת (%)', type: 'number', min: 0, max: 20, placeholder: '3.5', required: true },
      { name: 'years_remaining', label: 'שנים שנותרו', type: 'number', min: 1, max: 30, placeholder: '20', required: true },
      {
        name: 'current_bank',
        label: 'בנק נוכחי',
        type: 'select',
        required: true,
        options: [
          { value: 'leumi', label: 'בנק לאומי' },
          { value: 'hapoalim', label: 'בנק הפועלים' },
          { value: 'discount', label: 'בנק דיסקונט' },
          { value: 'mizrahi', label: 'מזרחי טפחות' },
          { value: 'jerusalem', label: 'בנק ירושלים' },
          { value: 'other', label: 'אחר' },
        ],
      },
    ],
  },
  {
    key: 'financial',
    title: 'מצב פיננסי',
    fields: [
      { name: 'monthly_income', label: 'הכנסה חודשית נטו (₪)', type: 'number', min: 0, placeholder: '15000', required: true },
      { name: 'monthly_obligations', label: 'התחייבויות חודשיות נוספות (₪)', type: 'number', min: 0, placeholder: '0', required: true },
      {
        name: 'has_early_repayment_fee',
        label: 'האם יש קנסות פירעון מוקדם?',
        type: 'radio',
        required: true,
        options: [
          { value: 'yes', label: 'כן' },
          { value: 'no', label: 'לא' },
          { value: 'unknown', label: 'לא יודע/ת' },
        ],
      },
    ],
  },
  {
    key: 'summary',
    title: 'סיכום פרטים',
    fields: [],
  },
]

const STEPS_CONSOLIDATION: StepConfig[] = [
  {
    key: 'personal',
    title: 'פרטים אישיים',
    fields: PERSONAL_BASE,
  },
  {
    key: 'loans',
    title: 'פרטי ההלוואות',
    fields: [
      { name: 'loans_count', label: 'מספר הלוואות', type: 'number', min: 2, max: 10, placeholder: '3', required: true },
      { name: 'total_debt', label: 'סך חוב כולל (₪)', type: 'number', min: 0, placeholder: '150000', required: true },
      { name: 'total_monthly_payment', label: 'החזר חודשי כולל (₪)', type: 'number', min: 0, placeholder: '3500', required: true },
    ],
  },
  {
    key: 'financial',
    title: 'מצב פיננסי',
    fields: [
      { name: 'monthly_income', label: 'הכנסה חודשית נטו (₪)', type: 'number', min: 0, placeholder: '12000', required: true },
      {
        name: 'has_property',
        label: 'האם יש נכס בבעלותך?',
        type: 'radio',
        required: true,
        options: [
          { value: 'yes', label: 'כן' },
          { value: 'no', label: 'לא' },
        ],
      },
      { name: 'property_value', label: 'שווי נכס משוער (₪)', type: 'number', min: 0, placeholder: '1500000', required: false },
    ],
  },
  {
    key: 'summary',
    title: 'סיכום פרטים',
    fields: [],
  },
]

const STEPS_MAP: Record<string, StepConfig[]> = {
  new_mortgage: STEPS_NEW_MORTGAGE,
  refinance: STEPS_REFINANCE,
  consolidation: STEPS_CONSOLIDATION,
}

export function getStepsForProduct(productType: ProductType): StepConfig[] {
  return STEPS_MAP[productType] ?? []
}
