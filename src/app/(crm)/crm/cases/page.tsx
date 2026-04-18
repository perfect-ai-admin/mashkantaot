"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Plus,
  MoreHorizontal,
  Eye,
  ArrowRightLeft,
  UserCog,
  ChevronRight,
  ChevronLeft,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { StatusBadge } from "@/components/ui/status-badge"
import { EmptyState } from "@/components/ui/empty-state"
import { cn, formatDate } from "@/lib/utils"
import { PRODUCT_TYPE_LABELS, CASE_STATUS_LABELS } from "@/lib/constants"
import type { CaseStatus, ProductType } from "@/types/database"

interface MockCase {
  id: string
  case_number: string
  customer_name: string
  customer_initials: string
  product_type: ProductType
  status: CaseStatus
  advisor: string
  docs_done: number
  docs_total: number
  priority: "urgent" | "high" | "normal" | "low"
  updated_at: string
}

const MOCK_CASES: MockCase[] = [
  {
    id: "1",
    case_number: "MC-2026-001",
    customer_name: "ענת ברק",
    customer_initials: "עב",
    product_type: "new_mortgage",
    status: "advisor_review",
    advisor: "שרה גולד",
    docs_done: 5,
    docs_total: 7,
    priority: "urgent",
    updated_at: "2026-04-17T10:00:00",
  },
  {
    id: "2",
    case_number: "MC-2026-002",
    customer_name: "אורן שמש",
    customer_initials: "אש",
    product_type: "consolidation",
    status: "awaiting_docs",
    advisor: "יונתן לוי",
    docs_done: 2,
    docs_total: 6,
    priority: "high",
    updated_at: "2026-04-16T15:30:00",
  },
  {
    id: "3",
    case_number: "MC-2026-003",
    customer_name: "רוני בן דוד",
    customer_initials: "רב",
    product_type: "refinance",
    status: "building_options",
    advisor: "שרה גולד",
    docs_done: 4,
    docs_total: 4,
    priority: "normal",
    updated_at: "2026-04-16T09:00:00",
  },
  {
    id: "4",
    case_number: "MC-2026-004",
    customer_name: "לימור חדד",
    customer_initials: "לח",
    product_type: "new_mortgage",
    status: "partial_docs",
    advisor: "אבי כהן",
    docs_done: 3,
    docs_total: 5,
    priority: "high",
    updated_at: "2026-04-15T14:20:00",
  },
  {
    id: "5",
    case_number: "MC-2026-005",
    customer_name: "שי מנשה",
    customer_initials: "שמ",
    product_type: "complex",
    status: "submitted",
    advisor: "יונתן לוי",
    docs_done: 7,
    docs_total: 7,
    priority: "normal",
    updated_at: "2026-04-15T11:00:00",
  },
  {
    id: "6",
    case_number: "MC-2026-006",
    customer_name: "דנה ירדן",
    customer_initials: "די",
    product_type: "new_mortgage",
    status: "awaiting_client",
    advisor: "שרה גולד",
    docs_done: 5,
    docs_total: 5,
    priority: "low",
    updated_at: "2026-04-14T16:45:00",
  },
  {
    id: "7",
    case_number: "MC-2026-007",
    customer_name: "אמיר טל",
    customer_initials: "אט",
    product_type: "refinance",
    status: "completed",
    advisor: "אבי כהן",
    docs_done: 4,
    docs_total: 4,
    priority: "low",
    updated_at: "2026-04-13T10:00:00",
  },
  {
    id: "8",
    case_number: "MC-2026-008",
    customer_name: "נילי שפר",
    customer_initials: "נש",
    product_type: "consolidation",
    status: "new",
    advisor: "יונתן לוי",
    docs_done: 0,
    docs_total: 6,
    priority: "normal",
    updated_at: "2026-04-17T08:00:00",
  },
]

const PRIORITY_STYLES: Record<MockCase["priority"], { label: string; className: string }> = {
  urgent: { label: "דחוף", className: "bg-red-50 text-red-600" },
  high: { label: "גבוה", className: "bg-amber-50 text-amber-600" },
  normal: { label: "רגיל", className: "bg-gray-50 text-gray-600" },
  low: { label: "נמוך", className: "bg-slate-50 text-slate-500" },
}

const ADVISORS = ["כל היועצים", "יונתן לוי", "שרה גולד", "אבי כהן"]
const PAGE_SIZE = 6

function relativeDate(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const hours = Math.floor(diff / 3600000)
  if (hours < 1) return "זה עתה"
  if (hours < 24) return `לפני ${hours} שעות`
  const days = Math.floor(hours / 24)
  if (days === 1) return "אתמול"
  return `לפני ${days} ימים`
}

export default function CasesPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [productFilter, setProductFilter] = useState("all")
  const [advisorFilter, setAdvisorFilter] = useState("כל היועצים")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [page, setPage] = useState(1)

  const filtered = MOCK_CASES.filter((c) => {
    const matchStatus = statusFilter === "all" || c.status === statusFilter
    const matchProduct = productFilter === "all" || c.product_type === productFilter
    const matchAdvisor = advisorFilter === "כל היועצים" || c.advisor === advisorFilter
    const matchPriority = priorityFilter === "all" || c.priority === priorityFilter
    return matchStatus && matchProduct && matchAdvisor && matchPriority
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">ניהול תיקים</h1>
          <p className="text-sm text-gray-500 mt-0.5">{MOCK_CASES.length} תיקים פעילים</p>
        </div>
        <Button
          render={<Link href="/crm/cases/new" />}
          className="h-9 px-4 bg-brand-navy hover:bg-brand-navy/90 text-white font-semibold text-sm rounded-xl shadow-[0_1px_2px_0_rgb(0_0_0/0.04)] gap-2 flex items-center"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          פתח תיק חדש
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_1px_3px_0_rgb(0_0_0/0.08)]">
        <div className="flex flex-wrap gap-3">
          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v ?? "all"); setPage(1) }}>
            <SelectTrigger className="w-48 text-sm">
              <SelectValue placeholder="כל הסטטוסים" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">כל הסטטוסים</SelectItem>
              {(Object.keys(CASE_STATUS_LABELS) as CaseStatus[]).map((s) => (
                <SelectItem key={s} value={s}>{CASE_STATUS_LABELS[s]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={productFilter} onValueChange={(v) => { setProductFilter(v ?? "all"); setPage(1) }}>
            <SelectTrigger className="w-44 text-sm">
              <SelectValue placeholder="כל המוצרים" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">כל המוצרים</SelectItem>
              <SelectItem value="new_mortgage">משכנתא חדשה</SelectItem>
              <SelectItem value="refinance">מחזור משכנתא</SelectItem>
              <SelectItem value="consolidation">איחוד הלוואות</SelectItem>
              <SelectItem value="complex">משכנתא למורכבים</SelectItem>
            </SelectContent>
          </Select>
          <Select value={advisorFilter} onValueChange={(v) => { setAdvisorFilter(v ?? "כל היועצים"); setPage(1) }}>
            <SelectTrigger className="w-40 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ADVISORS.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={(v) => { setPriorityFilter(v ?? "all"); setPage(1) }}>
            <SelectTrigger className="w-36 text-sm">
              <SelectValue placeholder="כל העדיפויות" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">כל העדיפויות</SelectItem>
              <SelectItem value="urgent">דחוף</SelectItem>
              <SelectItem value="high">גבוה</SelectItem>
              <SelectItem value="normal">רגיל</SelectItem>
              <SelectItem value="low">נמוך</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Table */}
      <Card className="shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_1px_3px_0_rgb(0_0_0/0.08)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50">
              <TableHead className="text-xs font-medium uppercase tracking-wider text-gray-400">מספר תיק</TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-gray-400">לקוח</TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-gray-400">סוג</TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-gray-400">סטטוס</TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-gray-400">יועץ</TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-gray-400 w-32">מסמכים</TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-gray-400">עדיפות</TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-gray-400">עדכון אחרון</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9}>
                  <EmptyState
                    icon={Briefcase}
                    title="אין תיקים תואמים"
                    description="נסה לשנות את הפילטרים כדי למצוא תיקים"
                  />
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((c) => {
                const priority = PRIORITY_STYLES[c.priority]
                const docPct = c.docs_total > 0 ? (c.docs_done / c.docs_total) * 100 : 0
                return (
                  <TableRow
                    key={c.id}
                    className="hover:bg-gray-50/50 transition-colors border-b border-gray-50"
                  >
                    <TableCell>
                      <Link
                        href={`/crm/cases/${c.id}`}
                        className="text-sm font-mono font-semibold text-brand-blue hover:underline tabular-nums"
                      >
                        {c.case_number}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/crm/cases/${c.id}`} className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-brand-navy/8 to-brand-blue/8 flex items-center justify-center text-xs font-bold text-brand-navy shrink-0">
                          {c.customer_initials}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{c.customer_name}</span>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-lg bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                        {PRODUCT_TYPE_LABELS[c.product_type]}
                      </span>
                    </TableCell>
                    <TableCell>
                      <StatusBadge type="case" status={c.status} />
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{c.advisor}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-gray-700 tabular-nums">
                            {c.docs_done}/{c.docs_total}
                          </span>
                        </div>
                        <div className="h-1.5 w-24 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              docPct === 100 ? "bg-brand-green" :
                              docPct >= 60 ? "bg-brand-orange" : "bg-red-400"
                            )}
                            style={{ width: `${docPct}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={cn(
                        "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium",
                        priority.className,
                      )}>
                        {priority.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-gray-400 tabular-nums">
                      {relativeDate(c.updated_at)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={<button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors" />}
                        >
                          <MoreHorizontal className="h-4 w-4 text-gray-400" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem
                            render={<Link href={`/crm/cases/${c.id}`} className="flex items-center gap-2 w-full" />}
                          >
                            <Eye className="h-3.5 w-3.5" />
                            צפה בתיק
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <ArrowRightLeft className="h-3.5 w-3.5" />
                            שנה סטטוס
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <UserCog className="h-3.5 w-3.5" />
                            הקצה יועץ
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
          <p className="text-xs text-gray-500">
            מציג {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} מתוך {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </button>
            <span className="text-xs font-medium text-gray-600 px-2 tabular-nums">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}
