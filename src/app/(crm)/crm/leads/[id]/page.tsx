"use client"

import { useState } from "react"
import Link from "next/link"
import { use } from "react"
import {
  ChevronRight,
  Phone,
  Mail,
  Globe,
  Tag,
  User,
  Calendar,
  MessageSquare,
  FolderOpen,
  PhoneCall,
  Clock,
  FileText,
  CheckCircle2,
  Edit3,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { StatusBadge } from "@/components/ui/status-badge"
import { cn, formatPhone, formatDate } from "@/lib/utils"
import { PRODUCT_TYPE_LABELS, LEAD_STATUS_LABELS } from "@/lib/constants"
import type { LeadStatus } from "@/types/database"

const LEAD_TRANSITIONS: Record<LeadStatus, LeadStatus[]> = {
  new: ["contacted", "irrelevant"],
  contacted: ["questionnaire", "irrelevant", "frozen"],
  questionnaire: ["case_opened", "contacted", "frozen"],
  case_opened: [],
  irrelevant: ["new"],
  frozen: ["new", "irrelevant"],
}

const MOCK_LEAD = {
  id: "3",
  full_name: "אורן שמש",
  initials: "אש",
  phone: "0501112233",
  email: "oren@gmail.com",
  source: "גוגל",
  product_type: "consolidation" as const,
  status: "questionnaire" as LeadStatus,
  score: 91,
  advisor: "יונתן לוי",
  advisor_initials: "יל",
  created_at: "2026-04-16T14:00:00",
  utm_source: "google",
  utm_medium: "cpc",
  utm_campaign: "mortgage_il_2026",
  notes: "",
}

const QUESTIONNAIRE = [
  { label: "סוג נכס", value: "דירה יד שנייה" },
  { label: "שווי נכס משוער", value: "₪1,850,000" },
  { label: "סכום מבוקש", value: "₪900,000" },
  { label: "הון עצמי", value: "₪950,000" },
  { label: "תעסוקה", value: "שכיר — היי-טק" },
  { label: "הכנסה חודשית נטו", value: "₪32,000" },
  { label: "התחייבויות קיימות", value: "₪2,200 / חודש" },
  { label: "תקופת הלוואה", value: "25 שנה" },
]

const ACTIVITY = [
  {
    id: 1,
    icon: Star,
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
    title: "ליד נוצר",
    desc: "ליד נוצר מגוגל ADS",
    actor: "מערכת",
    time: "16 באפריל, 14:00",
  },
  {
    id: 2,
    icon: PhoneCall,
    color: "text-brand-turquoise",
    bg: "bg-brand-turquoise/10",
    title: "נוצר קשר ראשוני",
    desc: "שיחה של 12 דקות, הלקוח מעוניין",
    actor: "יונתן לוי",
    time: "16 באפריל, 16:30",
  },
  {
    id: 3,
    icon: FileText,
    color: "text-purple-600",
    bg: "bg-purple-100",
    title: "שאלון החל",
    desc: "הלקוח התחיל למלא את השאלון המקוון",
    actor: "אורן שמש",
    time: "16 באפריל, 20:15",
  },
  {
    id: 4,
    icon: CheckCircle2,
    color: "text-brand-green",
    bg: "bg-brand-green/10",
    title: "שאלון הושלם חלקית",
    desc: "6 מתוך 8 שלבים הושלמו",
    actor: "מערכת",
    time: "17 באפריל, 09:00",
  },
  {
    id: 5,
    icon: Edit3,
    color: "text-brand-orange",
    bg: "bg-brand-orange/10",
    title: "הערה נוספה",
    desc: "הלקוח ביקש לחכות לסוף החודש לפני פתיחת תיק",
    actor: "יונתן לוי",
    time: "17 באפריל, 11:45",
  },
]

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const lead = { ...MOCK_LEAD, id }
  const [status, setStatus] = useState<LeadStatus>(lead.status)
  const [note, setNote] = useState("")

  const transitions = LEAD_TRANSITIONS[status]

  return (
    <div className="space-y-6">
      {/* Back */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/crm/leads" className="hover:text-brand-navy transition-colors flex items-center gap-1">
          <ChevronRight className="h-4 w-4" />
          לידים
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{lead.full_name}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-brand-navy/10 to-brand-blue/10 flex items-center justify-center text-lg font-bold text-brand-navy">
            {lead.initials}
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-brand-navy tracking-tight">
              {lead.full_name}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-gray-500 tabular-nums">{formatPhone(lead.phone)}</span>
              <span className="text-gray-300">·</span>
              <span className="text-sm text-gray-500">{lead.email}</span>
              <span className="text-gray-300">·</span>
              <StatusBadge type="lead" status={status} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 tabular-nums">
            נוצר {formatDate(lead.created_at)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main — 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Info */}
          <Card className="p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 mb-4">פרטי קשר</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Phone, label: "טלפון", value: formatPhone(lead.phone) },
                { icon: Mail, label: "אימייל", value: lead.email },
                { icon: Tag, label: "מקור", value: lead.source },
                { icon: Globe, label: "מוצר", value: PRODUCT_TYPE_LABELS[lead.product_type] },
                { icon: Globe, label: "utm_source", value: lead.utm_source },
                { icon: Globe, label: "utm_medium", value: lead.utm_medium },
                { icon: Globe, label: "utm_campaign", value: lead.utm_campaign },
                { icon: Calendar, label: "תאריך כניסה", value: formatDate(lead.created_at) },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className="h-3.5 w-3.5 text-gray-400" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                    <p className="text-sm text-gray-800 font-medium mt-0.5 tabular-nums">{item.value ?? "—"}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Questionnaire */}
          <Card className="p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 mb-4">תשובות שאלון</h2>
            <div className="divide-y divide-gray-50">
              {QUESTIONNAIRE.map((q) => (
                <div key={q.label} className="flex items-center justify-between py-2.5">
                  <span className="text-sm text-gray-500">{q.label}</span>
                  <span className="text-sm font-semibold text-gray-900 tabular-nums">{q.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Activity */}
          <Card className="p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 mb-5">ציר זמן פעילות</h2>
            <div className="relative">
              <div className="absolute end-3.5 top-0 bottom-0 w-px bg-gray-100" />
              <div className="space-y-5">
                {ACTIVITY.map((a, i) => (
                  <div key={a.id} className="flex items-start gap-4 relative">
                    <div className={cn("h-8 w-8 rounded-xl flex items-center justify-center shrink-0 z-10", a.bg)}>
                      <a.icon className={cn("h-4 w-4", a.color)} strokeWidth={1.75} />
                    </div>
                    <div className="flex-1 min-w-0 pb-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="text-sm font-semibold text-gray-900">{a.title}</p>
                        <span className="text-xs text-gray-400 tabular-nums shrink-0">{a.time}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">{a.desc}</p>
                      <p className="text-xs text-gray-400 mt-1">{a.actor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Status */}
          <Card className="p-5 shadow-sm">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">סטטוס</h3>
            <div className="mb-3">
              <StatusBadge type="lead" status={status} />
            </div>
            {transitions.length > 0 && (
              <Select onValueChange={(v) => setStatus(v as LeadStatus)}>
                <SelectTrigger className="text-sm w-full">
                  <SelectValue placeholder="שנה סטטוס..." />
                </SelectTrigger>
                <SelectContent>
                  {transitions.map((t) => (
                    <SelectItem key={t} value={t}>{LEAD_STATUS_LABELS[t]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </Card>

          {/* Advisor */}
          <Card className="p-5 shadow-sm">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">יועץ מטפל</h3>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-brand-navy/10 flex items-center justify-center text-xs font-bold text-brand-navy">
                {lead.advisor_initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{lead.advisor}</p>
                <p className="text-xs text-gray-400">יועץ משכנתאות</p>
              </div>
            </div>
          </Card>

          {/* Score */}
          <Card className="p-5 shadow-sm">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">ציון ליד</h3>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-3xl font-black text-brand-navy tabular-nums leading-none">
                {lead.score}
              </span>
              <span className="text-sm text-gray-400 mb-0.5">/ 100</span>
            </div>
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-brand-green transition-all"
                style={{ width: `${lead.score}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">ציון גבוה — לקוח עם פוטנציאל גבוה</p>
          </Card>

          {/* Quick Actions */}
          <Card className="p-5 shadow-sm">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">פעולות מהירות</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-brand-navy/20 bg-brand-navy/5 hover:bg-brand-navy/10 transition-colors text-sm font-semibold text-brand-navy">
                <FolderOpen className="h-4 w-4" strokeWidth={1.75} />
                פתח תיק
              </button>
              <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                <MessageSquare className="h-4 w-4" strokeWidth={1.75} />
                שלח הודעה
              </button>
              <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                <Clock className="h-4 w-4" strokeWidth={1.75} />
                קבע שיחה
              </button>
            </div>
          </Card>

          {/* Notes */}
          <Card className="p-5 shadow-sm">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">הערות</h3>
            <Textarea
              placeholder="הוסף הערה..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="text-sm resize-none min-h-[80px]"
            />
            {note && (
              <Button className="mt-2 w-full h-8 text-xs">שמור הערה</Button>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
