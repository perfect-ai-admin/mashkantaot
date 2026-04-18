'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, AlertCircle, TrendingDown, Home } from 'lucide-react'
import { useQuestionnaireStore } from '@/stores/questionnaire-store'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface Indication {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  color: 'green' | 'orange'
  headline: string
  detail: string
  estimatedPayment?: number
}

function getIndication(
  productType: string,
  answers: Record<string, unknown>
): Indication {
  if (productType === 'new_mortgage') {
    const income = Number(answers.monthly_income ?? 0)
    const equity = Number(answers.equity ?? 0)
    const propertyPrice = Number(answers.property_price ?? 0)
    const obligations = Number(answers.monthly_obligations ?? 0)
    const isGood = income > 8000 && equity > 100000

    let estimatedPayment: number | undefined
    if (propertyPrice > 0 && equity > 0) {
      const loanAmount = propertyPrice - equity
      if (loanAmount > 0) {
        const monthlyRate = 0.035 / 12
        const months = 25 * 12
        estimatedPayment =
          (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1)
        estimatedPayment = Math.round(estimatedPayment)
      }
    }

    if (isGood) {
      const dsr = estimatedPayment
        ? ((estimatedPayment + obligations) / income) * 100
        : null
      return {
        icon: CheckCircle,
        color: 'green',
        headline: 'יש סבירות טובה להתאמה',
        detail: dsr && dsr < 40
          ? `יחס החזר-להכנסה משוער: ${dsr.toFixed(0)}% — בטווח הסביר לאישור`
          : 'בהתאם לנתונים שמסרתם, סביר שנוכל למצוא פתרון מימון מתאים.',
        estimatedPayment,
      }
    }
    return {
      icon: AlertCircle,
      color: 'orange',
      headline: 'נדרש בירור נוסף',
      detail: 'חלק מהנתונים מצריכים בחינה מעמיקה. יועץ שלנו יצור אתכם קשר לבדיקת האפשרויות.',
      estimatedPayment,
    }
  }

  if (productType === 'refinance') {
    const currentPayment = Number(answers.current_payment ?? 0)
    const remainingBalance = Number(answers.remaining_balance ?? 0)
    const yearsRemaining = Number(answers.years_remaining ?? 20)
    let estimatedPayment: number | undefined
    if (remainingBalance > 0) {
      const newRate = 0.03 / 12
      const months = yearsRemaining * 12
      estimatedPayment =
        (remainingBalance * newRate * Math.pow(1 + newRate, months)) /
        (Math.pow(1 + newRate, months) - 1)
      estimatedPayment = Math.round(estimatedPayment)
    }
    const saving = estimatedPayment && currentPayment ? currentPayment - estimatedPayment : null
    return {
      icon: TrendingDown,
      color: 'green',
      headline: 'נראה שיש מקום לבדוק חיסכון',
      detail:
        saving && saving > 0
          ? `חיסכון חודשי פוטנציאלי של כ-${formatCurrency(saving)} בהתאם לתנאי השוק הנוכחיים.`
          : 'בהתבסס על הנתונים, ייתכן שנוכל לשפר את תנאי המשכנתא שלכם.',
      estimatedPayment,
    }
  }

  if (productType === 'consolidation') {
    const loansCount = Number(answers.loans_count ?? 0)
    const totalMonthly = Number(answers.total_monthly_payment ?? 0)
    const estimatedNewPayment =
      totalMonthly > 0 ? Math.round(totalMonthly * 0.65) : undefined
    const isGood = loansCount > 2

    return {
      icon: isGood ? CheckCircle : AlertCircle,
      color: isGood ? 'green' : 'orange',
      headline: isGood
        ? 'איחוד הלוואות עשוי להקטין את ההחזר'
        : 'נבדוק את כדאיות האיחוד',
      detail:
        estimatedNewPayment
          ? `החזר חודשי משוער לאחר איחוד: כ-${formatCurrency(estimatedNewPayment)} — חיסכון אפשרי של ${formatCurrency(totalMonthly - estimatedNewPayment)} בחודש.`
          : 'ייתכן שאיחוד ההלוואות יפשט את ניהול ההחזרים שלכם.',
      estimatedPayment: estimatedNewPayment,
    }
  }

  return {
    icon: CheckCircle,
    color: 'green',
    headline: 'קיבלנו את הפרטים',
    detail: 'יועץ שלנו יצור אתכם קשר בהקדם.',
  }
}

const PRODUCT_LABELS: Record<string, string> = {
  new_mortgage: 'משכנתא חדשה',
  refinance: 'מחזור משכנתא',
  consolidation: 'איחוד הלוואות',
}

export default function ResultPage() {
  const router = useRouter()
  const { productType, answers, reset } = useQuestionnaireStore()

  useEffect(() => {
    if (!productType) {
      router.replace('/questionnaire')
    }
  }, [productType, router])

  if (!productType) return null

  const indication = getIndication(productType, answers)
  const Icon = indication.icon
  const isGreen = indication.color === 'green'

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="text-center">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500 mb-3">
          {PRODUCT_LABELS[productType]}
        </span>
        <h1 className="text-2xl font-display font-bold text-brand-navy tracking-tight">
          תוצאת הבדיקה הראשונית
        </h1>
      </div>

      {/* Result Card */}
      <div
        className={cn(
          'rounded-2xl border p-8 flex flex-col items-center gap-4 text-center',
          isGreen
            ? 'border-brand-green/20 bg-gradient-to-b from-brand-green/8 to-brand-green/3 shadow-[0_4px_20px_0_rgb(56_176_0/0.08)]'
            : 'border-brand-orange/20 bg-gradient-to-b from-brand-orange/8 to-brand-orange/3 shadow-[0_4px_20px_0_rgb(255_140_66/0.08)]'
        )}
      >
        {/* Icon with ring */}
        <div className={cn(
          'w-20 h-20 rounded-2xl flex items-center justify-center mb-1',
          isGreen
            ? 'bg-brand-green/15 shadow-[0_0_0_8px_rgb(56_176_0/0.08)]'
            : 'bg-brand-orange/15 shadow-[0_0_0_8px_rgb(255_140_66/0.08)]'
        )}>
          <Icon
            className={cn('w-10 h-10', isGreen ? 'text-brand-green' : 'text-brand-orange')}
            strokeWidth={1.75}
          />
        </div>

        <h2 className={cn(
          'text-xl font-bold tracking-tight',
          isGreen ? 'text-brand-green' : 'text-brand-orange'
        )}>
          {indication.headline}
        </h2>
        <p className="text-gray-600 text-sm max-w-sm leading-relaxed">
          {indication.detail}
        </p>

        {indication.estimatedPayment && indication.estimatedPayment > 0 && (
          <div className="mt-2 rounded-2xl bg-white border border-gray-100 px-8 py-5 shadow-[0_1px_4px_0_rgb(0_0_0/0.06)]">
            <p className="text-xs text-gray-400 font-medium mb-1">
              {productType === 'refinance' ? 'החזר חודשי משוער לאחר מחזור' : 'החזר חודשי משוער'}
            </p>
            <p className="text-3xl font-black text-brand-navy tabular-nums tracking-tight">
              {formatCurrency(indication.estimatedPayment)}
            </p>
            <p className="text-xs text-gray-400 mt-1.5">* הערכה בלבד, בכפוף לתנאי הבנק</p>
          </div>
        )}
      </div>

      {/* Next Steps */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_2px_8px_0_rgb(0_0_0/0.04)]">
        <h3 className="font-bold text-brand-navy text-sm tracking-tight mb-4">מה הלאה?</h3>
        <ul className="flex flex-col gap-3">
          {[
            'פתחו תיק ואנחנו נתחיל לעבד את הבקשה',
            'יועץ מוסמך יצור אתכם קשר תוך יום עסקים',
            'נבנה יחד תמהיל מותאם ונגיש לבנקים',
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-brand-turquoise/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[11px] font-bold text-brand-turquoise tabular-nums">{i + 1}</span>
              </div>
              <span className="text-sm text-gray-600 leading-relaxed">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <Button
          render={<Link href="/register" />}
          className="w-full h-12 bg-brand-turquoise hover:bg-[#329d97] text-white font-semibold rounded-xl text-base shadow-[0_2px_8px_0_rgb(58_175_169/0.3)] hover:shadow-[0_6px_20px_0_rgb(58_175_169/0.35)] transition-all duration-200 active:scale-[0.98] flex items-center gap-2 justify-center"
        >
          <FolderOpen className="w-5 h-5" strokeWidth={1.75} />
          פתח תיק להמשך בדיקה
        </Button>
        <Button
          render={<Link href="/" />}
          onClick={reset}
          className="w-full h-11 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border border-gray-200 shadow-[0_1px_2px_0_rgb(0_0_0/0.04)] transition-all duration-200 active:scale-[0.98] flex items-center gap-2 justify-center"
        >
          <Home className="w-4 h-4" strokeWidth={1.75} />
          חזור לדף הבית
        </Button>
      </div>

      <p className="text-center text-xs text-gray-400">
        המידע שמסרת מאובטח ומוצפן &middot; לא נשתף עם צד ג'
      </p>
    </div>
  )
}

function FolderOpen({ className, strokeWidth }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth ?? 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
    </svg>
  )
}
