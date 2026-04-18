import type { CaseStatus, LeadStatus, DocumentStatus } from '@/types/database'

export const CASE_TRANSITIONS: Record<CaseStatus, CaseStatus[]> = {
  new: ['awaiting_docs', 'closed'],
  awaiting_docs: ['partial_docs', 'ready_for_review', 'closed'],
  partial_docs: ['awaiting_docs', 'ready_for_review', 'closed'],
  ready_for_review: ['advisor_review', 'awaiting_docs', 'closed'],
  advisor_review: ['building_options', 'awaiting_docs', 'closed'],
  building_options: ['awaiting_client', 'advisor_review'],
  awaiting_client: ['submitted', 'building_options', 'closed'],
  submitted: ['completed', 'closed'],
  completed: ['closed'],
  closed: [],
}

export const STATUS_COLORS: Record<CaseStatus, { bg: string; text: string; border: string }> = {
  new: {
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    border: 'border-slate-300',
  },
  awaiting_docs: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    border: 'border-amber-300',
  },
  partial_docs: {
    bg: 'bg-orange-100',
    text: 'text-orange-700',
    border: 'border-orange-300',
  },
  ready_for_review: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-300',
  },
  advisor_review: {
    bg: 'bg-indigo-100',
    text: 'text-indigo-700',
    border: 'border-indigo-300',
  },
  building_options: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    border: 'border-purple-300',
  },
  awaiting_client: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
    border: 'border-yellow-300',
  },
  submitted: {
    bg: 'bg-cyan-100',
    text: 'text-cyan-700',
    border: 'border-cyan-300',
  },
  completed: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-300',
  },
  closed: {
    bg: 'bg-gray-100',
    text: 'text-gray-500',
    border: 'border-gray-300',
  },
}

export const LEAD_STATUS_COLORS: Record<LeadStatus, { bg: string; text: string; border: string }> = {
  new: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-300',
  },
  contacted: {
    bg: 'bg-indigo-100',
    text: 'text-indigo-700',
    border: 'border-indigo-300',
  },
  questionnaire: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    border: 'border-purple-300',
  },
  case_opened: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-300',
  },
  irrelevant: {
    bg: 'bg-gray-100',
    text: 'text-gray-500',
    border: 'border-gray-300',
  },
  frozen: {
    bg: 'bg-slate-100',
    text: 'text-slate-500',
    border: 'border-slate-300',
  },
}

export const DOCUMENT_STATUS_COLORS: Record<DocumentStatus, { bg: string; text: string; border: string }> = {
  missing: {
    bg: 'bg-red-100',
    text: 'text-red-700',
    border: 'border-red-300',
  },
  uploaded: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-300',
  },
  reviewed: {
    bg: 'bg-indigo-100',
    text: 'text-indigo-700',
    border: 'border-indigo-300',
  },
  invalid: {
    bg: 'bg-orange-100',
    text: 'text-orange-700',
    border: 'border-orange-300',
  },
  needs_reupload: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    border: 'border-amber-300',
  },
  approved: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-300',
  },
}
