'use client'

import { use, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ChevronRight, ChevronLeft, Send } from 'lucide-react'
import { useQuestionnaireStore } from '@/stores/questionnaire-store'
import { getStepsForProduct, type FieldConfig, type StepConfig } from '@/lib/questionnaire-config'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatCurrency } from '@/lib/utils'
import { cn } from '@/lib/utils'

function buildSchema(fields: FieldConfig[]) {
  const shape: Record<string, z.ZodTypeAny> = {}
  for (const field of fields) {
    let schema: z.ZodTypeAny
    if (field.type === 'number') {
      let num = z.coerce.number({ message: 'יש להזין מספר' })
      if (field.min !== undefined) num = num.min(field.min, `מינימום ${field.min}`) as typeof num
      if (field.max !== undefined) num = num.max(field.max, `מקסימום ${field.max}`) as typeof num
      schema = field.required ? num : num.optional()
    } else if (field.type === 'email') {
      schema = field.required
        ? z.string().email('אימייל לא תקין')
        : z.string().email('אימייל לא תקין').optional().or(z.literal(''))
    } else {
      schema = field.required
        ? z.string().min(1, 'שדה חובה')
        : z.string().optional()
    }
    shape[field.name] = schema
  }
  return z.object(shape)
}

const LABEL_MAP: Record<string, string> = {
  full_name: 'שם מלא',
  phone: 'טלפון',
  email: 'אימייל',
  marital_status: 'מצב משפחתי',
  children: 'ילדים',
  employment_type: 'סטטוס תעסוקתי',
  monthly_income: 'הכנסה חודשית',
  partner_income: 'הכנסת בן/בת זוג',
  monthly_obligations: 'התחייבויות חודשיות',
  has_loans: 'הלוואות קיימות',
  loans_amount: 'סך הלוואות',
  equity: 'הון עצמי',
  property_price: 'מחיר נכס',
  property_area: 'אזור',
  property_type: 'סוג נכס',
  remaining_balance: 'יתרת משכנתא',
  current_payment: 'החזר חודשי נוכחי',
  interest_rate: 'ריבית משוערת',
  years_remaining: 'שנים שנותרו',
  current_bank: 'בנק נוכחי',
  has_early_repayment_fee: 'קנסות פירעון מוקדם',
  loans_count: 'מספר הלוואות',
  total_debt: 'סך חוב כולל',
  total_monthly_payment: 'החזר חודשי כולל',
  has_property: 'נכס קיים',
  property_value: 'שווי נכס',
}

const OPTION_LABEL_MAP: Record<string, string> = {
  single: 'רווק/ה',
  married: 'נשוי/אה',
  divorced: 'גרוש/ה',
  employee: 'שכיר/ה',
  self_employed: 'עצמאי/ת',
  both: 'שניהם',
  yes: 'כן',
  no: 'לא',
  unknown: 'לא יודע/ת',
  apartment: 'דירה',
  house: 'בית פרטי',
  land: 'מגרש',
  other: 'אחר',
  leumi: 'בנק לאומי',
  hapoalim: 'בנק הפועלים',
  discount: 'בנק דיסקונט',
  mizrahi: 'מזרחי טפחות',
  jerusalem: 'בנק ירושלים',
}

function formatAnswerValue(key: string, value: unknown): string {
  if (value === undefined || value === null || value === '') return '—'
  const optLabel = OPTION_LABEL_MAP[String(value)]
  if (optLabel) return optLabel
  const numericKeys = [
    'monthly_income', 'partner_income', 'monthly_obligations', 'loans_amount',
    'equity', 'property_price', 'remaining_balance', 'current_payment',
    'total_debt', 'total_monthly_payment', 'property_value',
  ]
  if (numericKeys.includes(key) && typeof value === 'number') return formatCurrency(value)
  return String(value)
}

function SummaryView({ steps, answers }: { steps: StepConfig[]; answers: Record<string, unknown> }) {
  const contentSteps = steps.filter((s) => s.key !== 'summary')
  return (
    <div className="flex flex-col gap-4">
      {contentSteps.map((step) => (
        <div key={step.key} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_2px_8px_0_rgb(0_0_0/0.04)]">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">{step.title}</h3>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
            {step.fields.map((field) => (
              <div key={field.name} className="flex flex-col gap-0.5">
                <dt className="text-xs text-gray-400 font-medium">{LABEL_MAP[field.name] ?? field.label}</dt>
                <dd className="text-sm font-semibold text-gray-900 tabular-nums">
                  {formatAnswerValue(field.name, answers[field.name])}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  )
}

function FieldRenderer({
  field,
  control,
  error,
  register,
}: {
  field: FieldConfig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any
  error?: string
}) {
  if (field.type === 'radio') {
    return (
      <Controller
        name={field.name}
        control={control}
        render={({ field: f }) => (
          <RadioGroup value={f.value ?? ''} onValueChange={f.onChange} className="flex flex-wrap gap-2.5">
            {field.options?.map((opt) => (
              <label
                key={opt.value}
                className={cn(
                  'flex items-center gap-2.5 cursor-pointer rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-150',
                  'has-[input[data-checked]]:border-brand-turquoise has-[input[data-checked]]:bg-brand-turquoise/8 has-[input[data-checked]]:text-brand-turquoise has-[input[data-checked]]:shadow-[0_0_0_3px_rgb(58_175_169/0.12)]',
                  'border-gray-200/60 hover:border-gray-200 hover:bg-gray-50 text-gray-700'
                )}
              >
                <RadioGroupItem value={opt.value} />
                <span>{opt.label}</span>
              </label>
            ))}
          </RadioGroup>
        )}
      />
    )
  }

  if (field.type === 'select') {
    return (
      <Controller
        name={field.name}
        control={control}
        render={({ field: f }) => (
          <Select value={f.value ?? ''} onValueChange={f.onChange}>
            <SelectTrigger className="w-full h-11 rounded-xl border-gray-200 text-sm focus-visible:border-brand-turquoise focus-visible:ring-brand-turquoise/20">
              <SelectValue placeholder="בחר..." />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    )
  }

  return (
    <Input
      type={field.type}
      placeholder={field.placeholder}
      min={field.min}
      max={field.max}
      className="h-11 rounded-xl border-gray-200 text-sm focus-visible:border-brand-turquoise focus-visible:ring-brand-turquoise/20"
      aria-invalid={!!error}
      {...register(field.name, { valueAsNumber: field.type === 'number' })}
    />
  )
}

export default function StepPage({ params }: { params: Promise<{ step: string }> }) {
  const { step: stepParam } = use(params)
  const stepNumber = parseInt(stepParam, 10)
  const router = useRouter()
  const { productType, answers, setAnswers, currentStep, nextStep, prevStep } = useQuestionnaireStore()

  useEffect(() => {
    if (!productType) {
      router.replace('/questionnaire')
    }
  }, [productType, router])

  const steps = productType ? getStepsForProduct(productType) : []
  const stepIndex = stepNumber - 1
  const stepConfig = steps[stepIndex]
  const isSummary = stepConfig?.key === 'summary'
  const isLastStep = stepNumber === steps.length

  const schema = stepConfig && !isSummary ? buildSchema(stepConfig.fields) : z.object({})

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Record<string, unknown>>({
    resolver: zodResolver(schema) as never,
    defaultValues: answers as Record<string, unknown>,
  })

  if (!productType || !stepConfig) return null

  function onNext(data: Record<string, unknown>) {
    setAnswers(data)
    if (isLastStep) {
      router.push('/questionnaire/result')
    } else {
      nextStep()
      router.push(`/questionnaire/${stepNumber + 1}`)
    }
  }

  function handlePrev() {
    prevStep()
    if (stepNumber === 1) {
      router.push('/questionnaire')
    } else {
      router.push(`/questionnaire/${stepNumber - 1}`)
    }
  }

  function handleSummarySubmit() {
    router.push('/questionnaire/result')
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Step header */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-gray-900">
          {stepConfig.title}
        </h2>
        {!isSummary && (
          <p className="text-sm text-gray-500 mt-1.5">
            {stepConfig.fields.filter((f) => f.required).length > 0
              ? 'שדות המסומנים ב-* הם חובה'
              : 'מלאו את הפרטים הבאים'}
          </p>
        )}
      </div>

      {isSummary ? (
        <div className="flex flex-col gap-6">
          <SummaryView steps={steps} answers={answers} />
          <div className="flex gap-3 justify-between pt-2">
            <Button
              onClick={handlePrev}
              className="h-11 px-5 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border border-gray-200 shadow-[0_1px_2px_0_rgb(0_0_0/0.04)] transition-all duration-200 active:scale-[0.98] flex items-center gap-2"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={2} />
              הקודם
            </Button>
            <Button
              onClick={handleSummarySubmit}
              className="h-11 px-6 bg-brand-turquoise hover:bg-[#329d97] text-white font-semibold rounded-xl shadow-[0_1px_3px_0_rgb(58_175_169/0.3)] hover:shadow-[0_4px_12px_0_rgb(58_175_169/0.35)] transition-all duration-200 active:scale-[0.98] flex items-center gap-2"
            >
              שלח בקשה
              <Send className="w-4 h-4" strokeWidth={1.75} />
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onNext as Parameters<typeof handleSubmit>[0])} className="flex flex-col gap-6">
          {stepConfig.fields.map((field) => (
            <div key={field.name} className="flex flex-col gap-2">
              <Label htmlFor={field.name} className="text-sm font-semibold text-gray-700">
                {field.label}
                {field.required && <span className="text-brand-red ms-1">*</span>}
              </Label>
              <FieldRenderer
                field={field}
                control={control}
                register={register}
                error={(errors[field.name]?.message as string) ?? undefined}
              />
              {errors[field.name] && (
                <p className="text-xs text-brand-red font-medium flex items-center gap-1">
                  {errors[field.name]?.message as string}
                </p>
              )}
            </div>
          ))}

          {/* Navigation buttons — sticky on mobile */}
          <div className="flex gap-3 justify-between pt-4 sticky bottom-0 bg-brand-cream/95 backdrop-blur-sm py-4 -mx-4 px-4 md:static md:bg-transparent md:backdrop-blur-none md:mx-0 md:px-0 md:py-0 border-t border-gray-100 md:border-0 mt-2">
            <Button
              type="button"
              onClick={handlePrev}
              className="h-11 px-5 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border border-gray-200 shadow-[0_1px_2px_0_rgb(0_0_0/0.04)] transition-all duration-200 active:scale-[0.98] flex items-center gap-2"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={2} />
              {stepNumber === 1 ? 'חזרה' : 'הקודם'}
            </Button>
            <Button
              type="submit"
              className="h-11 px-6 bg-brand-turquoise hover:bg-[#329d97] text-white font-semibold rounded-xl shadow-[0_1px_3px_0_rgb(58_175_169/0.3)] hover:shadow-[0_4px_12px_0_rgb(58_175_169/0.35)] transition-all duration-200 active:scale-[0.98] flex items-center gap-2 flex-1 md:flex-none justify-center"
            >
              {isLastStep ? 'שלח בקשה' : 'הבא'}
              <ChevronLeft className="w-4 h-4" strokeWidth={2} />
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
