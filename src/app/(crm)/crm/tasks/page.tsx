"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import {
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Pencil,
  Trash2,
  Link as LinkIcon,
  ClipboardList,
} from "lucide-react"
import Link from "next/link"
import type { TaskStatus } from "@/types/database"

type Priority = "urgent" | "high" | "normal" | "low"

interface MockTask {
  id: string
  title: string
  description: string | null
  caseNumber: string | null
  caseId: string | null
  assignee: { name: string; initials: string }
  priority: Priority
  status: TaskStatus
  dueDate: string
}

const TODAY = "2026-04-17"
const YESTERDAY = "2026-04-16"
const TOMORROW = "2026-04-18"
const NEXT_WEEK = "2026-04-24"

const MOCK_TASKS: MockTask[] = [
  {
    id: "1",
    title: "לחזור ללקוח — דוד כהן",
    description: "בדוק עניין הלוואת הגישור",
    caseNumber: "MC-2026-001",
    caseId: "case-1",
    assignee: { name: "יעל כהן", initials: "יכ" },
    priority: "urgent",
    status: "pending",
    dueDate: YESTERDAY,
  },
  {
    id: "2",
    title: "סקור דפי עו\"ש — מיכל לוי",
    description: "3 חודשים אחרונים",
    caseNumber: "MC-2026-002",
    caseId: "case-2",
    assignee: { name: "אורי לוי", initials: "אל" },
    priority: "urgent",
    status: "in_progress",
    dueDate: TODAY,
  },
  {
    id: "3",
    title: "הכן סימולציית מסלולים — אורן שמש",
    description: null,
    caseNumber: "MC-2026-003",
    caseId: "case-3",
    assignee: { name: "יעל כהן", initials: "יכ" },
    priority: "high",
    status: "in_progress",
    dueDate: TODAY,
  },
  {
    id: "4",
    title: "בקש אישור שכר מעדכן — ענת ברק",
    description: "מעסיק חדש מינואר",
    caseNumber: "MC-2026-004",
    caseId: "case-4",
    assignee: { name: "רן אביב", initials: "רא" },
    priority: "high",
    status: "pending",
    dueDate: TOMORROW,
  },
  {
    id: "5",
    title: "עדכן סטטוס תיק לבנק",
    description: null,
    caseNumber: "MC-2026-005",
    caseId: "case-5",
    assignee: { name: "אורי לוי", initials: "אל" },
    priority: "normal",
    status: "pending",
    dueDate: TOMORROW,
  },
  {
    id: "6",
    title: "שיחת ייעוץ ראשונית — משפחת גולן",
    description: "משכנתא חדשה, תקציב 2.5M",
    caseNumber: null,
    caseId: null,
    assignee: { name: "יעל כהן", initials: "יכ" },
    priority: "normal",
    status: "pending",
    dueDate: NEXT_WEEK,
  },
  {
    id: "7",
    title: "הגש בקשה לבנק מזרחי",
    description: null,
    caseNumber: "MC-2026-007",
    caseId: "case-7",
    assignee: { name: "רן אביב", initials: "רא" },
    priority: "high",
    status: "pending",
    dueDate: YESTERDAY,
  },
  {
    id: "8",
    title: "שלח הצעת מחיר ללקוח",
    description: "3 מסלולים שונים",
    caseNumber: "MC-2026-008",
    caseId: "case-8",
    assignee: { name: "אורי לוי", initials: "אל" },
    priority: "normal",
    status: "completed",
    dueDate: YESTERDAY,
  },
  {
    id: "9",
    title: "בדוק שמאות — תל אביב",
    description: null,
    caseNumber: "MC-2026-009",
    caseId: "case-9",
    assignee: { name: "יעל כהן", initials: "יכ" },
    priority: "normal",
    status: "completed",
    dueDate: TODAY,
  },
  {
    id: "10",
    title: "פגישת סיכום — רחל ומשה פרץ",
    description: "חתימה על הסכם שירות",
    caseNumber: "MC-2026-010",
    caseId: "case-10",
    assignee: { name: "רן אביב", initials: "רא" },
    priority: "low",
    status: "pending",
    dueDate: NEXT_WEEK,
  },
]

const ADVISORS = [
  { id: "me", name: "אני" },
  { id: "yael", name: "יעל כהן" },
  { id: "uri", name: "אורי לוי" },
  { id: "ran", name: "רן אביב" },
]

const CASES = [
  { id: "case-1", number: "MC-2026-001", name: "דוד כהן" },
  { id: "case-2", number: "MC-2026-002", name: "מיכל לוי" },
  { id: "case-3", number: "MC-2026-003", name: "אורן שמש" },
  { id: "case-4", number: "MC-2026-004", name: "ענת ברק" },
  { id: "case-5", number: "MC-2026-005", name: "משפחת גולן" },
]

const PRIORITY_CONFIG: Record<Priority, { label: string; dot: string; badge: string }> = {
  urgent: { label: "דחוף", dot: "bg-red-500", badge: "bg-red-50 text-red-600 border-red-100/80" },
  high: { label: "גבוה", dot: "bg-brand-orange", badge: "bg-amber-50 text-amber-600 border-amber-100/80" },
  normal: { label: "רגיל", dot: "bg-brand-blue", badge: "bg-blue-50 text-blue-600 border-blue-100/80" },
  low: { label: "נמוך", dot: "bg-gray-300", badge: "bg-gray-50 text-gray-500 border-gray-100/80" },
}

const STATUS_CONFIG: Record<TaskStatus, { label: string; style: string }> = {
  pending: { label: "ממתין", style: "bg-amber-50 text-amber-600 border-amber-100/80" },
  in_progress: { label: "בטיפול", style: "bg-blue-50 text-blue-600 border-blue-100/80" },
  completed: { label: "הושלם", style: "bg-green-50 text-green-600 border-green-100/80" },
  cancelled: { label: "בוטל", style: "bg-gray-50 text-gray-500 border-gray-100/80" },
}

function getDueDateStyle(dueDate: string, status: TaskStatus) {
  if (status === "completed") return "text-gray-400"
  if (dueDate < TODAY) return "text-red-600 font-semibold"
  if (dueDate === TODAY) return "text-brand-orange font-semibold"
  return "text-gray-400"
}

function formatDueDate(dueDate: string) {
  if (dueDate === TODAY) return "היום"
  if (dueDate === YESTERDAY) return "אתמול"
  if (dueDate === TOMORROW) return "מחר"
  return new Intl.DateTimeFormat("he-IL", { day: "numeric", month: "short" }).format(new Date(dueDate))
}

const EMPTY_FORM = {
  title: "",
  description: "",
  caseId: "",
  assigneeId: "",
  priority: "normal" as Priority,
  dueDate: "",
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<MockTask[]>(MOCK_TASKS)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)

  const filtered = tasks.filter((t) => {
    if (statusFilter !== "all" && t.status !== statusFilter) return false
    if (priorityFilter !== "all" && t.priority !== priorityFilter) return false
    if (assigneeFilter === "me" && t.assignee.name !== "יעל כהן") return false
    if (assigneeFilter !== "all" && assigneeFilter !== "me") {
      const advisor = ADVISORS.find((a) => a.id === assigneeFilter)
      if (advisor && t.assignee.name !== advisor.name) return false
    }
    return true
  })

  const total = tasks.length
  const pending = tasks.filter((t) => t.status === "pending" || t.status === "in_progress").length
  const overdue = tasks.filter((t) => t.dueDate < TODAY && t.status !== "completed" && t.status !== "cancelled").length
  const completedToday = tasks.filter((t) => t.status === "completed" && t.dueDate === TODAY).length

  function markComplete(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "completed" as TaskStatus } : t))
    )
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim()) return
    const selectedCase = CASES.find((c) => c.id === form.caseId)
    const selectedAdvisor = ADVISORS.find((a) => a.id === form.assigneeId)
    const newTask: MockTask = {
      id: String(Date.now()),
      title: form.title,
      description: form.description || null,
      caseNumber: selectedCase?.number ?? null,
      caseId: selectedCase?.id ?? null,
      assignee: {
        name: selectedAdvisor?.name ?? "יעל כהן",
        initials: selectedAdvisor?.name
          ? selectedAdvisor.name.split(" ").map((w) => w[0]).join("")
          : "יכ",
      },
      priority: form.priority,
      status: "pending",
      dueDate: form.dueDate || NEXT_WEEK,
    }
    setTasks((prev) => [newTask, ...prev])
    setForm(EMPTY_FORM)
    setDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            ניהול משימות
          </h1>
          <p className="text-sm text-gray-500 mt-1">{total} משימות סה"כ</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger
            render={
              <Button className="gap-1.5 bg-brand-navy hover:bg-brand-blue text-white shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_1px_3px_0_rgb(0_0_0/0.08)]" />
            }
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            הוסף משימה
          </DialogTrigger>
          <DialogContent className="sm:max-w-md" dir="rtl">
            <DialogHeader>
              <DialogTitle className="text-brand-navy font-bold text-base">משימה חדשה</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-1">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">כותרת</Label>
                <Input
                  placeholder="תיאור קצר של המשימה"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">תיאור</Label>
                <Textarea
                  placeholder="פרטים נוספים..."
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">תיק קשור</Label>
                  <Select value={form.caseId} onValueChange={(v) => setForm((f) => ({ ...f, caseId: v ?? "" }))}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="בחר תיק" />
                    </SelectTrigger>
                    <SelectContent>
                      {CASES.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.number} — {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">שייך ל</Label>
                  <Select value={form.assigneeId} onValueChange={(v) => setForm((f) => ({ ...f, assigneeId: v ?? "" }))}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="בחר יועץ" />
                    </SelectTrigger>
                    <SelectContent>
                      {ADVISORS.filter((a) => a.id !== "me").map((a) => (
                        <SelectItem key={a.id} value={a.id}>
                          {a.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">עדיפות</Label>
                <RadioGroup
                  value={form.priority}
                  onValueChange={(v) => setForm((f) => ({ ...f, priority: v as Priority }))}
                  className="grid-cols-4 gap-2"
                >
                  {(["urgent", "high", "normal", "low"] as Priority[]).map((p) => (
                    <label
                      key={p}
                      className={cn(
                        "flex items-center gap-1.5 px-2.5 py-2 rounded-lg border cursor-pointer text-xs font-medium transition-colors",
                        form.priority === p
                          ? PRIORITY_CONFIG[p].badge + " border-current"
                          : "border-gray-200/60 text-gray-500 hover:border-gray-200"
                      )}
                    >
                      <RadioGroupItem value={p} className="sr-only" />
                      <span className={cn("w-2 h-2 rounded-full shrink-0", PRIORITY_CONFIG[p].dot)} />
                      {PRIORITY_CONFIG[p].label}
                    </label>
                  ))}
                </RadioGroup>
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">תאריך יעד</Label>
                <Input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
                />
              </div>
              <DialogFooter className="gap-2">
                <DialogClose render={<Button variant="outline" type="button" />}>
                  ביטול
                </DialogClose>
                <Button
                  type="submit"
                  className="bg-brand-navy hover:bg-brand-blue text-white"
                >
                  שמור משימה
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "סה\"כ משימות", value: total, icon: ClipboardList, color: "text-brand-navy", bg: "bg-brand-navy/8" },
          { label: "בטיפול / ממתינות", value: pending, icon: Clock, color: "text-brand-blue", bg: "bg-brand-blue/10" },
          { label: "באיחור", value: overdue, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
          { label: "הושלמו היום", value: completedToday, icon: CheckCircle2, color: "text-brand-green", bg: "bg-brand-green/10" },
        ].map((s) => (
          <Card
            key={s.label}
            className="p-4 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_2px_8px_0_rgb(0_0_0/0.06)]"
          >
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-3", s.bg)}>
              <s.icon className={cn("h-4 w-4", s.color)} strokeWidth={1.75} />
            </div>
            <p className="text-2xl font-bold text-gray-900 tabular-nums tracking-tight leading-none mb-1">{s.value}</p>
            <p className="text-xs text-gray-500 font-medium">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Filter Bar */}
      <Card className="p-4 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_2px_8px_0_rgb(0_0_0/0.06)]">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <Label className="text-xs text-gray-500 whitespace-nowrap">סטטוס:</Label>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
              <SelectTrigger size="sm" className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">הכל</SelectItem>
                <SelectItem value="pending">ממתין</SelectItem>
                <SelectItem value="in_progress">בטיפול</SelectItem>
                <SelectItem value="completed">הושלם</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-xs text-gray-500 whitespace-nowrap">עדיפות:</Label>
            <Select value={priorityFilter} onValueChange={(v) => setPriorityFilter(v ?? "all")}>
              <SelectTrigger size="sm" className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">הכל</SelectItem>
                <SelectItem value="urgent">דחוף</SelectItem>
                <SelectItem value="high">גבוה</SelectItem>
                <SelectItem value="normal">רגיל</SelectItem>
                <SelectItem value="low">נמוך</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-xs text-gray-500 whitespace-nowrap">יועץ:</Label>
            <Select value={assigneeFilter} onValueChange={(v) => setAssigneeFilter(v ?? "all")}>
              <SelectTrigger size="sm" className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">הכל</SelectItem>
                <SelectItem value="me">שלי</SelectItem>
                {ADVISORS.filter((a) => a.id !== "me").map((a) => (
                  <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {(statusFilter !== "all" || priorityFilter !== "all" || assigneeFilter !== "all") && (
            <button
              onClick={() => { setStatusFilter("all"); setPriorityFilter("all"); setAssigneeFilter("all") }}
              className="text-xs text-brand-turquoise hover:underline font-medium"
            >
              נקה פילטרים
            </button>
          )}
          <span className="text-xs text-gray-400 mr-auto">{filtered.length} תוצאות</span>
        </div>
      </Card>

      {/* Task List */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <Card className="p-12 text-center shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_1px_3px_0_rgb(0_0_0/0.08)]">
            <ClipboardList className="h-10 w-10 text-gray-200 mx-auto mb-3" />
            <p className="text-sm text-gray-400 font-medium">אין משימות תואמות</p>
          </Card>
        ) : (
          filtered.map((task) => (
            <Card
              key={task.id}
              className={cn(
                "px-4 py-3.5 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_2px_8px_0_rgb(0_0_0/0.06)] hover:shadow-[0_4px_12px_-2px_rgb(0_0_0/0.08)] transition-all duration-150 group",
                task.status === "completed" && "opacity-60"
              )}
            >
              <div className="flex items-center gap-3">
                {/* Priority Dot */}
                <span
                  className={cn(
                    "w-2.5 h-2.5 rounded-full shrink-0",
                    PRIORITY_CONFIG[task.priority].dot
                  )}
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 flex-wrap">
                    <p className={cn(
                      "text-sm font-semibold text-gray-900 leading-snug",
                      task.status === "completed" && "line-through text-gray-400"
                    )}>
                      {task.title}
                    </p>
                    {task.description && (
                      <span className="text-xs text-gray-400 mt-0.5 leading-snug">{task.description}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    {/* Case Link */}
                    {task.caseNumber && (
                      <Link
                        href={`/crm/cases/${task.caseId}`}
                        className="flex items-center gap-1 text-xs text-brand-turquoise hover:underline font-medium"
                      >
                        <LinkIcon className="h-3 w-3" />
                        {task.caseNumber}
                      </Link>
                    )}
                    {/* Assignee */}
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-navy/10 to-brand-blue/10 flex items-center justify-center text-[9px] font-bold text-brand-navy shrink-0">
                        {task.assignee.initials}
                      </div>
                      <span className="text-xs text-gray-500">{task.assignee.name}</span>
                    </div>
                    {/* Due Date */}
                    <span className={cn("text-xs tabular-nums", getDueDateStyle(task.dueDate, task.status))}>
                      {task.dueDate < TODAY && task.status !== "completed" && "⚠ "}
                      {formatDueDate(task.dueDate)}
                    </span>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className={cn(
                    "hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border",
                    STATUS_CONFIG[task.status].style
                  )}>
                    {STATUS_CONFIG[task.status].label}
                  </span>

                  {/* Quick Actions */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    {task.status !== "completed" && (
                      <button
                        onClick={() => markComplete(task.id)}
                        title="סמן כהושלם"
                        className="w-7 h-7 rounded-lg bg-brand-green/10 hover:bg-brand-green/20 flex items-center justify-center transition-colors"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand-green" strokeWidth={2} />
                      </button>
                    )}
                    <button
                      title="ערוך"
                      className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                      <Pencil className="h-3 w-3 text-gray-500" strokeWidth={2} />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      title="מחק"
                      className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors"
                    >
                      <Trash2 className="h-3 w-3 text-red-500" strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
