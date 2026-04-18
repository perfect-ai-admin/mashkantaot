import { Card } from "@/components/ui/card"
import {
  Users,
  Briefcase,
  FileText,
  TrendingUp,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// TODO: Replace with real data
const STATS = [
  {
    label: "לידים חדשים",
    value: 12,
    icon: Users,
    color: "text-brand-turquoise",
    bg: "bg-brand-turquoise/10",
    change: "+3 היום",
    changePositive: true,
  },
  {
    label: "תיקים פתוחים",
    value: 28,
    icon: Briefcase,
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
    change: "5 חדשים השבוע",
    changePositive: true,
  },
  {
    label: "ממתין למסמכים",
    value: 8,
    icon: FileText,
    color: "text-brand-orange",
    bg: "bg-brand-orange/10",
    change: "דורש טיפול",
    changePositive: false,
  },
  {
    label: "תיקים פעילים",
    value: 15,
    icon: TrendingUp,
    color: "text-brand-green",
    bg: "bg-brand-green/10",
    change: "3 בבדיקה",
    changePositive: true,
  },
]

const LEAD_STATUS_STYLES: Record<string, string> = {
  "חדש": "bg-brand-turquoise/10 text-brand-turquoise",
  "נוצר קשר": "bg-brand-blue/10 text-brand-blue",
  "בתהליך שאלון": "bg-brand-orange/10 text-brand-orange",
}

const RECENT_LEADS = [
  { name: "דוד כהן", initials: "דכ", product: "משכנתא חדשה", status: "חדש", time: "לפני 2 שעות" },
  { name: "מיכל לוי", initials: "מל", product: "מחזור", status: "נוצר קשר", time: "לפני 5 שעות" },
  { name: "אורן שמש", initials: "אש", product: "איחוד הלוואות", status: "בתהליך שאלון", time: "אתמול" },
  { name: "ענת ברק", initials: "עב", product: "משכנתא חדשה", status: "חדש", time: "אתמול" },
]

const PENDING_TASKS = [
  { title: "חזור לדוד כהן", due: "היום", priority: "high" },
  { title: "בדוק דפי עו\"ש — מיכל לוי", due: "היום", priority: "high" },
  { title: "בנה סימולציה — אורן שמש", due: "מחר", priority: "normal" },
  { title: "עדכן סטטוס — ענת ברק", due: "מחר", priority: "normal" },
]

export default function CrmDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-brand-navy tracking-tight">
          דשבורד
        </h1>
        <p className="text-sm text-gray-500 mt-1">סיכום פעילות &middot; 17 באפריל 2026</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <Card
            key={stat.label}
            className="p-5 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_2px_8px_0_rgb(0_0_0/0.06)] hover:shadow-[0_4px_16px_-4px_rgb(0_0_0/0.08),0_2px_8px_-2px_rgb(0_0_0/0.04)] transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} strokeWidth={1.75} />
              </div>
            </div>
            <p className="text-3xl font-black text-brand-navy tabular-nums tracking-tight leading-none mb-1">
              {stat.value}
            </p>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            {stat.change && (
              <p className={cn(
                "text-xs font-semibold mt-2",
                stat.changePositive ? "text-brand-green" : "text-brand-orange"
              )}>
                {stat.change}
              </p>
            )}
          </Card>
        ))}
      </div>

      {/* Stuck Cases Alert */}
      <div className="rounded-2xl border border-brand-orange/20 bg-gradient-to-l from-brand-orange/6 to-brand-orange/3 p-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-orange/15 flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="h-5 w-5 text-brand-orange" strokeWidth={1.75} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-brand-navy text-sm">תיקים שדורשים תשומת לב</h3>
            <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">
              3 תיקים לא עודכנו מעל 5 ימים &middot; 2 תיקים ממתינים למסמכים מעל שבוע
            </p>
          </div>
          <Button
            render={<Link href="/crm/cases?filter=stuck" />}
            className="h-8 px-3 bg-white hover:bg-gray-50 text-brand-orange font-semibold text-xs rounded-lg border border-brand-orange/20 shadow-[0_1px_2px_0_rgb(0_0_0/0.04)] transition-all duration-200 shrink-0 flex items-center gap-1"
          >
            צפה
            <ArrowLeft className="h-3 w-3" strokeWidth={2} />
          </Button>
        </div>
      </div>

      {/* Recent Leads + Pending Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <Card className="p-6 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_2px_8px_0_rgb(0_0_0/0.06)]">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-brand-navy">לידים אחרונים</h3>
            <Button
              render={<Link href="/crm/leads" />}
              className="h-7 px-3 bg-transparent hover:bg-gray-50 text-brand-turquoise font-semibold text-xs rounded-lg transition-all duration-200 flex items-center gap-1"
            >
              הצג הכל
              <ArrowLeft className="h-3 w-3" strokeWidth={2} />
            </Button>
          </div>
          <div className="flex flex-col gap-1">
            {RECENT_LEADS.map((lead, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-navy/8 to-brand-blue/8 flex items-center justify-center text-xs font-bold text-brand-navy shrink-0">
                    {lead.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{lead.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5 tabular-nums">
                      {lead.product} &middot; {lead.time}
                    </p>
                  </div>
                </div>
                <span className={cn(
                  "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold",
                  LEAD_STATUS_STYLES[lead.status] ?? "bg-gray-100 text-gray-600"
                )}>
                  {lead.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Tasks */}
        <Card className="p-6 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_2px_8px_0_rgb(0_0_0/0.06)]">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-brand-navy">משימות לטיפול</h3>
            <Button
              render={<Link href="/crm/tasks" />}
              className="h-7 px-3 bg-transparent hover:bg-gray-50 text-brand-turquoise font-semibold text-xs rounded-lg transition-all duration-200 flex items-center gap-1"
            >
              הצג הכל
              <ArrowLeft className="h-3 w-3" strokeWidth={2} />
            </Button>
          </div>
          <div className="flex flex-col gap-1">
            {PENDING_TASKS.map((task, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors duration-150 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                    task.priority === "high" ? "bg-brand-orange/10" : "bg-gray-100"
                  )}>
                    {task.priority === "high" ? (
                      <AlertTriangle className="h-4 w-4 text-brand-orange" strokeWidth={1.75} />
                    ) : (
                      <Clock className="h-4 w-4 text-gray-400" strokeWidth={1.75} />
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-800">{task.title}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={cn(
                    "text-xs font-semibold tabular-nums",
                    task.due === "היום" ? "text-brand-orange" : "text-gray-400"
                  )}>
                    {task.due}
                  </span>
                  <div className="w-6 h-6 rounded-lg bg-gray-100 group-hover:bg-brand-green/10 flex items-center justify-center transition-colors duration-150">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gray-300 group-hover:text-brand-green transition-colors duration-150" strokeWidth={2} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
