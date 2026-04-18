import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ProductType } from '@/types/database'

interface QuestionnaireState {
  productType: ProductType | null
  currentStep: number
  answers: Record<string, unknown>
  setProductType: (type: ProductType) => void
  setAnswer: (key: string, value: unknown) => void
  setAnswers: (answers: Record<string, unknown>) => void
  nextStep: () => void
  prevStep: () => void
  reset: () => void
}

export const useQuestionnaireStore = create<QuestionnaireState>()(
  persist(
    (set) => ({
      productType: null,
      currentStep: 1,
      answers: {},
      setProductType: (type) => set({ productType: type, currentStep: 1, answers: {} }),
      setAnswer: (key, value) =>
        set((state) => ({ answers: { ...state.answers, [key]: value } })),
      setAnswers: (answers) =>
        set((state) => ({ answers: { ...state.answers, ...answers } })),
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      prevStep: () =>
        set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) })),
      reset: () => set({ productType: null, currentStep: 1, answers: {} }),
    }),
    { name: 'questionnaire-store' }
  )
)
