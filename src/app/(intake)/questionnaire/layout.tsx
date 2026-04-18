'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useQuestionnaireStore } from '@/stores/questionnaire-store'
import { getStepsForProduct } from '@/lib/questionnaire-config'

export default function QuestionnaireLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { productType, currentStep } = useQuestionnaireStore()

  const steps = productType ? getStepsForProduct(productType) : []
  const totalSteps = steps.length
  const isStepPage = /\/questionnaire\/\d+/.test(pathname)
  const progress = totalSteps > 0 && isStepPage ? (currentStep / totalSteps) * 100 : 0

  return (
    <div className="min-h-screen bg-[#FAFBFC] flex flex-col" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-[0_1px_0_0_rgb(0_0_0/0.04)]">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-turquoise via-[#2fa9a3] to-brand-navy flex items-center justify-center shadow-[0_2px_8px_0_rgb(58_175_169/0.3)]">
              <span className="text-white font-black text-xs leading-none">מ</span>
            </div>
            <span className="font-bold text-base text-gray-900 tracking-tight">
              משכנתא חכמה
            </span>
          </Link>

          {isStepPage && totalSteps > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-400 tabular-nums">
                {currentStep} / {totalSteps}
              </span>
              <div className="flex gap-1">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-5 rounded-full transition-all duration-300 ${
                      i < currentStep
                        ? 'bg-brand-turquoise'
                        : i === currentStep - 1
                        ? 'bg-brand-turquoise/60'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Progress bar */}
        {isStepPage && totalSteps > 0 && (
          <div className="h-0.5 bg-gray-100 w-full">
            <div
              className="h-full bg-brand-turquoise transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col items-center justify-start py-10 px-4">
        <div className="w-full max-w-2xl">
          {children}
        </div>
      </main>
    </div>
  )
}
