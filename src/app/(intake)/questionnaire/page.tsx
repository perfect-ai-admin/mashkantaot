'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Home, RefreshCw, Layers, ChevronLeft } from 'lucide-react'
import { useQuestionnaireStore } from '@/stores/questionnaire-store'
import type { ProductType } from '@/types/database'
import { cn } from '@/lib/utils'

const PRODUCTS: {
  type: ProductType
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  title: string
  description: string
  badge?: string
}[] = [
  {
    type: 'new_mortgage',
    icon: Home,
    title: 'משכנתא חדשה',
    description: 'קונים נכס? נבדוק את הזכאות, נבנה תמהיל אופטימלי ונלווה אתכם בתהליך מול הבנק.',
    badge: 'הכי נפוץ',
  },
  {
    type: 'refinance',
    icon: RefreshCw,
    title: 'מחזור משכנתא',
    description: 'יש לכם משכנתא קיימת? ייתכן שתוכלו לחסוך אלפי שקלים בשינוי התנאים.',
  },
  {
    type: 'consolidation',
    icon: Layers,
    title: 'איחוד הלוואות',
    description: 'כמה הלוואות? נאחד אותן להחזר חודשי אחד נמוך יותר ופשוט לניהול.',
  },
]

function QuestionnaireContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setProductType } = useQuestionnaireStore()

  const queryProduct = searchParams.get('product') as ProductType | null

  useEffect(() => {
    if (queryProduct && ['new_mortgage', 'refinance', 'consolidation'].includes(queryProduct)) {
      setProductType(queryProduct)
      router.push('/questionnaire/1')
    }
  }, [queryProduct, setProductType, router])

  function handleSelect(type: ProductType) {
    setProductType(type)
    router.push('/questionnaire/1')
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
          איזה שירות מתאים לך?
        </h1>
        <p className="text-gray-500 leading-relaxed">
          בחרו את הסיוע שאתם מחפשים ונתחיל בשאלון קצר
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {PRODUCTS.map(({ type, icon: Icon, title, description, badge }) => (
          <button
            key={type}
            onClick={() => handleSelect(type)}
            className={cn(
              'relative flex items-start gap-5 rounded-2xl border bg-white p-6 text-right transition-all duration-200',
              'border-gray-100 hover:border-brand-turquoise/40 hover:shadow-[0_4px_20px_0_rgb(58_175_169/0.12)] cursor-pointer',
              'shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_2px_8px_0_rgb(0_0_0/0.04)]',
              'hover:-translate-y-0.5 active:translate-y-0 group'
            )}
          >
            {badge && (
              <span className="absolute top-4 start-4 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-turquoise text-white">
                {badge}
              </span>
            )}
            <div className="flex w-14 h-14 shrink-0 items-center justify-center rounded-2xl bg-brand-turquoise/10 group-hover:bg-brand-turquoise/15 transition-colors duration-200">
              <Icon className="w-7 h-7 text-brand-turquoise" strokeWidth={1.75} />
            </div>
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <span className="text-base font-semibold text-gray-900 tracking-tight">{title}</span>
              <span className="text-sm text-gray-500 leading-relaxed">{description}</span>
            </div>
            <div className="w-8 h-8 rounded-xl bg-gray-50 group-hover:bg-brand-turquoise/10 flex items-center justify-center shrink-0 mt-3 transition-colors duration-200">
              <ChevronLeft className="w-4 h-4 text-gray-400 group-hover:text-brand-turquoise transition-colors duration-200" strokeWidth={2} />
            </div>
          </button>
        ))}
      </div>

      <p className="text-center text-xs text-gray-400">
        השאלון לוקח כ-3 דקות &middot; המידע מאובטח ומוצפן
      </p>
    </div>
  )
}

export default function QuestionnairePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-16">
        <div className="w-8 h-8 rounded-full border-2 border-brand-turquoise border-t-transparent animate-spin" />
      </div>
    }>
      <QuestionnaireContent />
    </Suspense>
  )
}
