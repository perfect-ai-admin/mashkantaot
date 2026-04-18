"use client"

import { useState } from "react"
import { use } from "react"
import Link from "next/link"
import {
  ChevronRight,
  Upload,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Plus,
  Circle,
  FileText,
  MessageSquare,
  ArrowRightLeft,
  Star,
  PhoneCall,
  Edit3,
  Trash2,
  TrendingUp,
  Building2,
  Check,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { StatusBadge } from "@/components/ui/status-badge"
import { EmptyState } from "@/components/ui/empty-state"
import { cn, formatCurrency, formatDate } from "@/lib/utils"
import {
  PRODUCT_TYPE_LABELS,
  CASE_STATUS_LABELS,
  REQUIRED_DOCUMENTS,
} from "@/lib/constants"
import { CASE_TRANSITIONS, STATUS_COLORS } from "@/lib/status-config"
import type { CaseStatus, DocumentStatus, TaskStatus } from "@/types/database"

// ── Mock data ──────────────────────────────────────────────────────────────

const MOCK_CASE = {
  id: "1",
  case_number: "MC-2026-001",
  product_type: "new_mortgage" as const,
  status: "advisor_review" as CaseStatus,
  priority: "urgent" as const,
  advisor: "שרה גולד",
  advisor_initials: "שג",
  customer: {
    full_name: "ענת ברק",
    initials: "עב",
    phone: "0549876543",
    email: "anat@hotmail.com",
    id_number: "012345678",
    employment_type: "שכירה",
    monthly_income: 28000,
    partner_monthly_income: 22000,
    existing_obligations: 3200,
  },
  property: {
    value: 2200000,
    requested_amount: 1100000,
    ltv_ratio: 50,
    term_years: 25,
  },
  created_at: "2026-04-15T10:20:00",
  updated_at: "2026-04-17T10:00:00",
}

const ALL_STATUSES: CaseStatus[] = [
  "new",
  "awaiting_docs",
  "partial_docs",
  "ready_for_review",
  "advisor_review",
  "building_options",
  "awaiting_client",
  "submitted",
  "completed",
]

const MOCK_DOCUMENTS: Array<{
  type: string
  label: string
  status: DocumentStatus
  uploaded_at?: string
  reviewer?: string
}> = [
  { type: "id_card", label: "תעודת זהות", status: "approved", uploaded_at: "2026-04-15", reviewer: "שרה גולד" },
  { type: "salary_slips", label: "3 תלושי שכר", status: "approved", uploaded_at: "2026-04-15", reviewer: "שרה גולד" },
  { type: "bank_statements", label: 'דפי עו"ש 3 חודשים', status: "reviewed", uploaded_at: "2026-04-16" },
  { type: "equity_proof", label: "אישור הון עצמי", status: "needs_reupload", uploaded_at: "2026-04-16", reviewer: "שרה גולד" },
  { type: "property_docs", label: "מסמכי נכס", status: "missing" },
]

const MOCK_TASKS = [
  { id: "t1", title: "לבקש מסמכי נכס מהלקוחה", assignee: "שרה גולד", due: "2026-04-18", status: "pending" as TaskStatus, priority: 2 },
  { id: "t2", title: "לבדוק דפי עו״ש — חודש מרץ", assignee: "שרה גולד", due: "2026-04-17", status: "completed" as TaskStatus, priority: 1 },
  { id: "t3", title: "לקבוע שיחה עם ועדת אשראי", assignee: "יונתן לוי", due: "2026-04-20", status: "in_progress" as TaskStatus, priority: 3 },
  { id: "t4", title: "לשלוח הצעה ראשונית ללקוחה", assignee: "שרה גולד", due: "2026-04-22", status: "pending" as TaskStatus, priority: 2 },
]

const MOCK_ACTIVITIES = [
  { id: 1, icon: Star, color: "text-brand-blue", bg: "bg-brand-blue/10", title: "תיק נפתח", desc: "תיק נפתח מליד MC-L-003", actor: "מערכת", time: "15 באפריל, 10:20" },
  { id: 2, icon: ArrowRightLeft, color: "text-purple-600", bg: "bg-purple-100", title: 'סטטוס שונה ל"ממתין למסמכים"', desc: "", actor: "שרה גולד", time: "15 באפריל, 10:25" },
  { id: 3, icon: FileText, color: "text-brand-turquoise", bg: "bg-brand-turquoise/10", title: "תעודת זהות הועלתה", desc: "id_card.pdf · 1.2MB", actor: "ענת ברק", time: "15 באפריל, 14:00" },
  { id: 4, icon: CheckCircle2, color: "text-brand-green", bg: "bg-brand-green/10", title: "תעודת זהות אושרה", desc: "", actor: "שרה גולד", time: "15 באפריל, 16:30" },
  { id: 5, icon: PhoneCall, color: "text-brand-orange", bg: "bg-brand-orange/10", title: "שיחה עם הלקוחה", desc: "דיון על לוח זמנים ומסמכים חסרים", actor: "שרה גולד", time: "16 באפריל, 10:00" },
  { id: 6, icon: ArrowRightLeft, color: "text-indigo-600", bg: "bg-indigo-100", title: 'סטטוס שונה ל"בבדיקת יועץ"', desc: "", actor: "שרה גולד", time: "17 באפריל, 09:00" },
  { id: 7, icon: Edit3, color: "text-gray-500", bg: "bg-gray-100", title: "הערה נוספה", desc: "הלקוחה מבקשת לסיים עד סוף אפריל", actor: "שרה גולד", time: "17 באפריל, 10:00" },
]

const MOCK_OFFERS = [
  {
    id: "o1",
    bank_name: "בנק לאומי",
    tracks: [
      { name: "פריים 30%", rate: "פריים + 0.5%", amount: 330000, monthly: 1650 },
      { name: "קל״צ 30%", rate: "4.2% קבוע", amount: 330000, monthly: 1820 },
      { name: "ק\"מ 40%", rate: "3.8% משתנה", amount: 440000, monthly: 2200 },
    ],
    total_amount: 1100000,
    monthly_payment: 5670,
    total_interest: 612000,
    status: "pending",
  },
  {
    id: "o2",
    bank_name: "הפועלים",
    tracks: [
      { name: "פריים 25%", rate: "פריים + 0.4%", amount: 275000, monthly: 1380 },
      { name: "קל״צ 35%", rate: "4.0% קבוע", amount: 385000, monthly: 2100 },
      { name: "ק\"מ 40%", rate: "3.6% משתנה", amount: 440000, monthly: 2180 },
    ],
    total_amount: 1100000,
    monthly_payment: 5660,
    total_interest: 598000,
    status: "approved",
  },
]

// ── Priority badge ─────────────────────────────────────────────────────────

const PRIORITY_LABELS = { urgent: "דחוף", high: "גבוה", normal: "רגיל", low: "נמוך" }
const PRIORITY_CLASSES = {
  urgent: "bg-red-50 text-red-600",
  high: "bg-amber-50 text-amber-600",
  normal: "bg-gray-50 text-gray-600",
  low: "bg-slate-50 text-slate-500",
}

const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  pending: "ממתין",
  in_progress: "בטיפול",
  completed: "הושלם",
  cancelled: "בוטל",
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const c = { ...MOCK_CASE, id }

  const [status, setStatus] = useState<CaseStatus>(c.status)
  const [taskFilter, setTaskFilter] = useState<"all" | "pending" | "completed">("all")
  const [newNote, setNewNote] = useState("")
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskAssignee, setNewTaskAssignee] = useState("שרה גולד")
  const [newTaskDue, setNewTaskDue] = useState("")

  const transitions = CASE_TRANSITIONS[status]
  const currentStatusIdx = ALL_STATUSES.indexOf(status)

  const approvedDocs = MOCK_DOCUMENTS.filter((d) => d.status === "approved").length
  const totalDocs = MOCK_DOCUMENTS.length

  const filteredTasks = MOCK_TASKS.filter((t) => {
    if (taskFilter === "pending") return t.status !== "completed"
    if (taskFilter === "completed") return t.status === "completed"
    return true
  })

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/crm/cases" className="hover:text-brand-navy transition-colors flex items-center gap-1">
          <ChevronRight className="h-4 w-4" />
          תיקים
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-mono font-semibold tabular-nums">{c.case_number}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-brand-navy/10 to-brand-blue/10 flex items-center justify-center text-lg font-bold text-brand-navy">
            {c.customer.initials}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold tracking-tight text-gray-900">
                {c.customer.full_name}
              </h1>
              <span className="font-mono text-sm text-gray-400 tabular-nums">{c.case_number}</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap mt-1">
              <span className="inline-flex items-center rounded-lg bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                {PRODUCT_TYPE_LABELS[c.product_type]}
              </span>
              <StatusBadge type="case" status={status} />
              <span className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                PRIORITY_CLASSES[c.priority],
              )}>
                {PRIORITY_LABELS[c.priority]}
              </span>
              <span className="text-xs text-gray-400">{c.advisor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status Progress */}
      <Card className="p-5 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_1px_3px_0_rgb(0_0_0/0.08)]">
        <div className="flex items-center gap-1 overflow-x-auto pb-1">
          {ALL_STATUSES.map((s, i) => {
            const isCompleted = i < currentStatusIdx
            const isCurrent = i === currentStatusIdx
            const colors = STATUS_COLORS[s]
            return (
              <div key={s} className="flex items-center gap-1 shrink-0">
                <div className={cn(
                  "flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl transition-all",
                  isCurrent ? cn(colors.bg, "ring-1", colors.border) : "",
                )}>
                  <div className={cn(
                    "h-5 w-5 rounded-full flex items-center justify-center",
                    isCompleted ? "bg-brand-green" :
                    isCurrent ? cn(colors.bg, "ring-2", colors.border) : "bg-gray-100",
                  )}>
                    {isCompleted ? (
                      <Check className="h-3 w-3 text-white" strokeWidth={2.5} />
                    ) : (
                      <Circle className={cn("h-2 w-2", isCurrent ? colors.text : "text-gray-300")} fill="currentColor" />
                    )}
                  </div>
                  <span className={cn(
                    "text-[10px] font-medium whitespace-nowrap",
                    isCurrent ? colors.text : isCompleted ? "text-brand-green" : "text-gray-400",
                  )}>
                    {CASE_STATUS_LABELS[s]}
                  </span>
                </div>
                {i < ALL_STATUSES.length - 1 && (
                  <div className={cn("h-px w-4 shrink-0", i < currentStatusIdx ? "bg-brand-green" : "bg-gray-100")} />
                )}
              </div>
            )
          })}
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="details">
        <TabsList className="mb-4">
          <TabsTrigger value="details">פרטים</TabsTrigger>
          <TabsTrigger value="documents">
            מסמכים
            <span className="ms-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-gray-200 px-1 text-[10px] font-bold tabular-nums">
              {approvedDocs}/{totalDocs}
            </span>
          </TabsTrigger>
          <TabsTrigger value="tasks">משימות</TabsTrigger>
          <TabsTrigger value="timeline">ציר זמן</TabsTrigger>
          <TabsTrigger value="offers">הצעות</TabsTrigger>
        </TabsList>

        {/* ── Tab 1: Details ── */}
        <TabsContent value="details">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-5">
              {/* Customer */}
              <Card className="p-6 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_1px_3px_0_rgb(0_0_0/0.08)]">
                <h2 className="text-sm font-bold text-gray-900 mb-4">פרטי לקוח</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "שם מלא", value: c.customer.full_name },
                    { label: "טלפון", value: c.customer.phone },
                    { label: "אימייל", value: c.customer.email },
                    { label: "ת.ז.", value: c.customer.id_number },
                    { label: "תעסוקה", value: c.customer.employment_type },
                    { label: "הכנסה חודשית (שכיר)", value: formatCurrency(c.customer.monthly_income!) },
                    { label: "הכנסת בן/בת זוג", value: formatCurrency(c.customer.partner_monthly_income!) },
                    { label: "התחייבויות", value: formatCurrency(c.customer.existing_obligations!) + " / חודש" },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                      <p className="text-sm font-semibold text-gray-900 mt-0.5 tabular-nums">{item.value}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Property */}
              <Card className="p-6 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_1px_3px_0_rgb(0_0_0/0.08)]">
                <h2 className="text-sm font-bold text-gray-900 mb-4">פרטי נכס ומשכנתא</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "שווי נכס", value: formatCurrency(c.property.value) },
                    { label: "סכום מבוקש", value: formatCurrency(c.property.requested_amount) },
                    { label: "אחוז מימון (LTV)", value: `${c.property.ltv_ratio}%` },
                    { label: "תקופת הלוואה", value: `${c.property.term_years} שנה` },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                      <p className="text-sm font-semibold text-gray-900 mt-0.5 tabular-nums">{item.value}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Status Change */}
              <Card className="p-5 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_1px_3px_0_rgb(0_0_0/0.08)]">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">שנה סטטוס</h3>
                <div className="mb-3">
                  <StatusBadge type="case" status={status} />
                </div>
                {transitions.length > 0 ? (
                  <Select onValueChange={(v) => { if (v) setStatus(v as CaseStatus) }}>
                    <SelectTrigger className="text-sm w-full">
                      <SelectValue placeholder="בחר סטטוס..." />
                    </SelectTrigger>
                    <SelectContent>
                      {transitions.map((t) => (
                        <SelectItem key={t} value={t}>{CASE_STATUS_LABELS[t]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-xs text-gray-400">אין מעברים זמינים</p>
                )}
              </Card>

              {/* Advisor */}
              <Card className="p-5 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_1px_3px_0_rgb(0_0_0/0.08)]">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">יועץ מטפל</h3>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-brand-navy/10 flex items-center justify-center text-xs font-bold text-brand-navy">
                    {c.advisor_initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{c.advisor}</p>
                    <p className="text-xs text-gray-400">יועץ משכנתאות</p>
                  </div>
                </div>
              </Card>

              {/* Docs Summary */}
              <Card className="p-5 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_1px_3px_0_rgb(0_0_0/0.08)]">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">מסמכים</h3>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-2xl font-bold text-gray-900 tabular-nums tracking-tight leading-none">{approvedDocs}</span>
                  <span className="text-sm text-gray-400 mb-0.5">/ {totalDocs}</span>
                </div>
                <Progress value={(approvedDocs / totalDocs) * 100} className="h-1.5" />
                <p className="text-xs text-gray-400 mt-2">{totalDocs - approvedDocs} מסמכים ממתינים לאישור</p>
              </Card>

              {/* Dates */}
              <Card className="p-5 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_1px_3px_0_rgb(0_0_0/0.08)]">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">תאריכים</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-400">תאריך פתיחה</p>
                    <p className="text-sm font-medium text-gray-900 tabular-nums">{formatDate(c.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">עדכון אחרון</p>
                    <p className="text-sm font-medium text-gray-900 tabular-nums">{formatDate(c.updated_at)}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* ── Tab 2: Documents ── */}
        <TabsContent value="documents">
          <Card className="shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_1px_3px_0_rgb(0_0_0/0.08)]">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-gray-900">מסמכים נדרשים</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {approvedDocs} מתוך {totalDocs} מסמכים הושלמו
                </p>
              </div>
              <Progress value={(approvedDocs / totalDocs) * 100} className="h-2 w-32" />
            </div>
            <div className="divide-y divide-gray-50">
              {MOCK_DOCUMENTS.map((doc) => (
                <div key={doc.type} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "h-9 w-9 rounded-xl flex items-center justify-center",
                      doc.status === "approved" ? "bg-brand-green/10" :
                      doc.status === "missing" ? "bg-gray-100" :
                      doc.status === "needs_reupload" ? "bg-amber-50" : "bg-blue-50"
                    )}>
                      <FileText className={cn(
                        "h-4 w-4",
                        doc.status === "approved" ? "text-brand-green" :
                        doc.status === "missing" ? "text-gray-300" :
                        doc.status === "needs_reupload" ? "text-amber-500" : "text-blue-500"
                      )} strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{doc.label}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {doc.uploaded_at && (
                          <span className="text-xs text-gray-400 tabular-nums">הועלה {doc.uploaded_at}</span>
                        )}
                        {doc.reviewer && (
                          <span className="text-xs text-gray-400">· בדיקה: {doc.reviewer}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge type="document" status={doc.status} />
                    {doc.status === "missing" && (
                      <button className="flex items-center gap-1.5 rounded-lg bg-brand-blue/10 px-3 py-1.5 text-xs font-semibold text-brand-blue hover:bg-brand-blue/20 transition-colors">
                        <Upload className="h-3.5 w-3.5" />
                        העלה
                      </button>
                    )}
                    {doc.status === "uploaded" || doc.status === "reviewed" ? (
                      <div className="flex items-center gap-1">
                        <button className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-brand-green/10 transition-colors" title="אשר">
                          <CheckCircle2 className="h-4 w-4 text-gray-400 hover:text-brand-green" />
                        </button>
                        <button className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors" title="דחה">
                          <XCircle className="h-4 w-4 text-gray-400 hover:text-red-500" />
                        </button>
                        <button className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-amber-50 transition-colors" title="בקש העלאה מחדש">
                          <RefreshCw className="h-3.5 w-3.5 text-gray-400 hover:text-amber-500" />
                        </button>
                      </div>
                    ) : null}
                    {doc.status === "needs_reupload" && (
                      <button className="flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 hover:bg-amber-100 transition-colors">
                        <RefreshCw className="h-3.5 w-3.5" />
                        העלה מחדש
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* ── Tab 3: Tasks ── */}
        <TabsContent value="tasks">
          <div className="space-y-4">
            {/* Add Task */}
            <Card className="p-5 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_1px_3px_0_rgb(0_0_0/0.08)]">
              <h3 className="text-sm font-bold text-gray-900 mb-4">הוסף משימה</h3>
              <div className="flex flex-wrap gap-3">
                <Input
                  placeholder="כותרת המשימה..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="flex-1 min-w-48 text-sm"
                />
                <Select value={newTaskAssignee} onValueChange={(v) => { if (v) setNewTaskAssignee(v) }}>
                  <SelectTrigger className="w-36 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="שרה גולד">שרה גולד</SelectItem>
                    <SelectItem value="יונתן לוי">יונתן לוי</SelectItem>
                    <SelectItem value="אבי כהן">אבי כהן</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  value={newTaskDue}
                  onChange={(e) => setNewTaskDue(e.target.value)}
                  className="w-40 text-sm"
                />
                <Button className="h-9 px-4 bg-brand-navy text-white text-sm rounded-xl gap-1.5 flex items-center">
                  <Plus className="h-4 w-4" strokeWidth={2.5} />
                  הוסף
                </Button>
              </div>
            </Card>

            {/* Filter + List */}
            <div className="flex items-center gap-2 mb-2">
              {(["all", "pending", "completed"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setTaskFilter(f)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                    taskFilter === f
                      ? "bg-brand-navy text-white"
                      : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-200/60",
                  )}
                >
                  {f === "all" ? "הכל" : f === "pending" ? "פתוחות" : "הושלמו"}
                </button>
              ))}
            </div>

            <Card className="shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_1px_3px_0_rgb(0_0_0/0.08)] divide-y divide-gray-50">
              {filteredTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50">
                  <button className={cn(
                    "h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                    task.status === "completed"
                      ? "border-brand-green bg-brand-green"
                      : "border-gray-200/60 hover:border-brand-green",
                  )}>
                    {task.status === "completed" && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-sm font-medium",
                      task.status === "completed" ? "line-through text-gray-400" : "text-gray-900",
                    )}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-400">{task.assignee}</span>
                      {task.due && (
                        <span className="text-xs text-gray-400 tabular-nums">· {task.due}</span>
                      )}
                    </div>
                  </div>
                  <span className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full",
                    task.status === "completed" ? "bg-brand-green/10 text-brand-green" :
                    task.status === "in_progress" ? "bg-brand-blue/10 text-brand-blue" :
                    "bg-gray-100 text-gray-500",
                  )}>
                    {TASK_STATUS_LABELS[task.status]}
                  </span>
                  <button className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 className="h-3.5 w-3.5 text-gray-300 hover:text-red-400" />
                  </button>
                </div>
              ))}
            </Card>
          </div>
        </TabsContent>

        {/* ── Tab 4: Timeline ── */}
        <TabsContent value="timeline">
          <div className="space-y-4">
            {/* Add Note */}
            <Card className="p-5 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_1px_3px_0_rgb(0_0_0/0.08)]">
              <Textarea
                placeholder="הוסף הערה לציר הזמן..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="text-sm resize-none min-h-[72px] mb-3"
              />
              <Button
                disabled={!newNote.trim()}
                className="h-8 px-4 bg-brand-navy text-white text-xs rounded-xl flex items-center gap-1.5"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                הוסף הערה
              </Button>
            </Card>

            {/* Timeline */}
            <Card className="p-6 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_1px_3px_0_rgb(0_0_0/0.08)]">
              <div className="relative">
                <div className="absolute end-4 top-0 bottom-0 w-px bg-gray-100" />
                <div className="space-y-6">
                  {MOCK_ACTIVITIES.map((a) => (
                    <div key={a.id} className="flex items-start gap-4 relative">
                      <div className={cn("h-8 w-8 rounded-xl flex items-center justify-center shrink-0 z-10", a.bg)}>
                        <a.icon className={cn("h-4 w-4", a.color)} strokeWidth={1.75} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <p className="text-sm font-semibold text-gray-900">{a.title}</p>
                          <span className="text-xs text-gray-400 tabular-nums shrink-0">{a.time}</span>
                        </div>
                        {a.desc && <p className="text-sm text-gray-500 mt-0.5">{a.desc}</p>}
                        <p className="text-xs text-gray-400 mt-1">{a.actor}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* ── Tab 5: Offers ── */}
        <TabsContent value="offers">
          {MOCK_OFFERS.length === 0 ? (
            <EmptyState
              icon={TrendingUp}
              title="אין הצעות עדיין"
              description="לאחר בניית אפשרויות, ההצעות יוצגו כאן"
              action={
                <Button className="h-9 px-4 bg-brand-navy text-white text-sm rounded-xl gap-2 flex items-center">
                  <Plus className="h-4 w-4" />
                  הוסף הצעה
                </Button>
              }
            />
          ) : (
            <div className="space-y-5">
              {MOCK_OFFERS.map((offer) => (
                <Card key={offer.id} className="shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_1px_3px_0_rgb(0_0_0/0.08)] overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-white border border-gray-200/60 flex items-center justify-center">
                        <Building2 className="h-4 w-4 text-brand-navy" strokeWidth={1.75} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{offer.bank_name}</p>
                        <p className="text-xs text-gray-400">{offer.tracks.length} מסלולים</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-left">
                        <p className="text-xs text-gray-400">החזר חודשי</p>
                        <p className="text-base font-bold text-gray-900 tabular-nums tracking-tight">
                          {formatCurrency(offer.monthly_payment!)}
                        </p>
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-gray-400">סה״כ ריבית</p>
                        <p className="text-base font-black text-brand-orange tabular-nums">
                          {formatCurrency(offer.total_interest!)}
                        </p>
                      </div>
                      <span className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
                        offer.status === "approved"
                          ? "bg-brand-green/10 text-brand-green border-brand-green/30"
                          : "bg-gray-100 text-gray-600 border-gray-200/60"
                      )}>
                        {offer.status === "approved" ? "אושר" : "ממתין"}
                      </span>
                    </div>
                  </div>

                  {/* Tracks */}
                  <div className="divide-y divide-gray-50">
                    {(offer.tracks as Array<{ name: string; rate: string; amount: number; monthly: number }>).map((track) => (
                      <div key={track.name} className="flex items-center justify-between px-6 py-3">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center rounded-lg bg-brand-blue/8 px-2.5 py-1 text-xs font-semibold text-brand-blue">
                            {track.name}
                          </span>
                          <span className="text-sm text-gray-500">{track.rate}</span>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-left">
                            <p className="text-xs text-gray-400">סכום</p>
                            <p className="text-sm font-semibold text-gray-900 tabular-nums">{formatCurrency(track.amount)}</p>
                          </div>
                          <div className="text-left">
                            <p className="text-xs text-gray-400">החזר / חודש</p>
                            <p className="text-sm font-semibold text-brand-navy tabular-nums">{formatCurrency(track.monthly)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}

              {/* Comparison summary */}
              <Card className="p-5 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_1px_3px_0_rgb(0_0_0/0.08)] bg-gradient-to-l from-brand-green/5 to-transparent border-brand-green/20">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-brand-green" strokeWidth={1.75} />
                  <h3 className="text-sm font-bold text-gray-900">השוואה מהירה</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {MOCK_OFFERS.map((o) => (
                    <div key={o.id} className={cn(
                      "rounded-xl p-4 border",
                      o.status === "approved"
                        ? "bg-brand-green/8 border-brand-green/20"
                        : "bg-white border-gray-200/60"
                    )}>
                      <p className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                        {o.bank_name}
                        {o.status === "approved" && (
                          <span className="text-brand-green text-[10px] font-semibold">✓ מומלץ</span>
                        )}
                      </p>
                      <p className="text-xl font-bold text-gray-900 tabular-nums tracking-tight">{formatCurrency(o.monthly_payment!)}</p>
                      <p className="text-xs text-gray-400 mt-0.5">/ חודש</p>
                      <p className="text-xs text-gray-500 mt-2">
                        ריבית סה״כ: <span className="font-semibold tabular-nums">{formatCurrency(o.total_interest!)}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
