"use client"

import { cn } from "@/lib/utils"
import {
  LEAD_STATUS_COLORS,
  STATUS_COLORS,
  DOCUMENT_STATUS_COLORS,
} from "@/lib/status-config"
import {
  LEAD_STATUS_LABELS,
  CASE_STATUS_LABELS,
  DOCUMENT_STATUS_LABELS,
} from "@/lib/constants"
import type { LeadStatus, CaseStatus, DocumentStatus } from "@/types/database"

type StatusBadgeProps =
  | { type: "lead"; status: LeadStatus }
  | { type: "case"; status: CaseStatus }
  | { type: "document"; status: DocumentStatus }

export function StatusBadge(props: StatusBadgeProps) {
  let colors: { bg: string; text: string; border: string }
  let label: string

  if (props.type === "lead") {
    colors = LEAD_STATUS_COLORS[props.status]
    label = LEAD_STATUS_LABELS[props.status]
  } else if (props.type === "case") {
    colors = STATUS_COLORS[props.status]
    label = CASE_STATUS_LABELS[props.status]
  } else {
    colors = DOCUMENT_STATUS_COLORS[props.status]
    label = DOCUMENT_STATUS_LABELS[props.status]
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        colors.bg,
        colors.text,
        colors.border,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", colors.text, "opacity-70 bg-current")} />
      {label}
    </span>
  )
}
