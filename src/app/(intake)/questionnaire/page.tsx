'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Home, RefreshCw, Layers } from 'lucide-react'
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
    <div className="flex flex-col gap-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
          מה מעניין אותך?
        </h1>
        <p className="text-sm text-gray-500">
          בחר מסלול ונתחיל בשאלון קצר
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {PRODUCTS.map(({ type, icon: Icon, title, description, badge }) => (
          <button
            key={type}
            onClick={() => handleSelect(type)}
            className={cn(
              'relative flex flex-col bg-white rounded-2xl p-6 text-start cursor-pointer',
              'border border-gray-100 transition-all duration-200',
              'hover:border-brand-turquoise/30 hover:shadow-[0_4px_20px_-4px_rgb(58_175_169/0.15)]',
              'shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_1px_3px_0_rgb(0_0_0/0.08)]',
              'focus-visible:ring-2 focus-visible:ring-brand-turquoise focus-visible:ring-offset-2',
              'group'
            )}
          >
            {badge && (
              <span className="absolute top-3 start-3 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-turquoise text-white">
                {badge}
              </span>
            )}
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
              <Icon className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mt-4">
              {title}
            </h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              {description}
            </p>
          </button>
        ))}
      </div>

      <p className="text-center text-xs text-gray-400">
        השאלון לוקח כ-2 דקות &middot; המידע מאובטח
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
