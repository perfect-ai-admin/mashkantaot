"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  ArrowRightLeft,
  FolderOpen,
  Trash2,
  Users,
  TrendingUp,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  DropdownMenuSeparator,
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
import { cn, formatPhone } from "@/lib/utils"
import { PRODUCT_TYPE_LABELS } from "@/lib/constants"
import type { LeadStatus, ProductType } from "@/types/database"

interface MockLead {
  id: string
  full_name: string
  initials: string
  phone: string
  email: string
  product_type: ProductType
  source: string
  status: LeadStatus
  score: number
  advisor: string
  created_at: string
}

const MOCK_LEADS: MockLead[] = [
  {
    id: "1",
    full_name: "דוד כהן",
    initials: "דכ",
    phone: "0521234567",
    email: "david@gmail.com",
    product_type: "new_mortgage",
    source: "אתר",
    status: "new",
    score: 87,
    advisor: "יונתן לוי",
    created_at: "2026-04-17T08:30:00",
  },
  {
    id: "2",
    full_name: "מיכל אברמוביץ",
    initials: "מא",
    phone: "0537654321",
    email: "michal@walla.co.il",
    product_type: "refinance",
    source: "פייסבוק",
    status: "contacted",
    score: 72,
    advisor: "שרה גולד",
    created_at: "2026-04-17T06:15:00",
  },
  {
    id: "3",
    full_name: "אורן שמש",
    initials: "אש",
    phone: "0501112233",
    email: "oren@gmail.com",
    product_type: "consolidation",
    source: "גוגל",
    status: "questionnaire",
    score: 91,
    advisor: "יונתן לוי",
    created_at: "2026-04-16T14:00:00",
  },
  {
    id: "4",
    full_name: "ענת ברק",
    initials: "עב",
    phone: "0549876543",
    email: "anat@hotmail.com",
    product_type: "new_mortgage",
    source: "המלצה",
    status: "case_opened",
    score: 95,
    advisor: "שרה גולד",
    created_at: "2026-04-15T10:20:00",
  },
  {
    id: "5",
    full_name: "רון פרץ",
    initials: "רפ",
    phone: "0523334455",
    email: "ron@gmail.com",
    product_type: "complex",
    source: "אתר",
    status: "new",
    score: 55,
    advisor: "אבי כהן",
    created_at: "2026-04-16T09:45:00",
  },
  {
    id: "6",
    full_name: "נועה שפירא",
    initials: "נש",
    phone: "0506667788",
    email: "noa@gmail.com",
    product_type: "refinance",
    source: "יוטיוב",
    status: "contacted",
    score: 63,
    advisor: "אבי כהן",
    created_at: "2026-04-15T16:30:00",
  },
  {
    id: "7",
    full_name: "יוסי מזרחי",
    initials: "ימ",
    phone: "0528889900",
    email: "yossi@gmail.com",
    product_type: "new_mortgage",
    source: "פייסבוק",
    status: "irrelevant",
    score: 22,
    advisor: "יונתן לוי",
    created_at: "2026-04-14T11:00:00",
  },
  {
    id: "8",
    full_name: "תמר לוינסון",
    initials: "תל",
    phone: "0511122334",
    email: "tamar@gmail.com",
    product_type: "consolidation",
    source: "גוגל",
    status: "questionnaire",
    score: 78,
    advisor: "שרה גולד",
    created_at: "2026-04-14T08:00:00",
  },
  {
    id: "9",
    full_name: "גיל אדרי",
    initials: "גא",
    phone: "0545556677",
    email: "gil@gmail.com",
    product_type: "other",
    source: "המלצה",
    status: "frozen",
    score: 38,
    advisor: "אבי כהן",
    created_at: "2026-04-13T13:15:00",
  },
]

const SOURCE_OPTIONS = ["כל המקורות", "אתר", "פייסבוק", "גוגל", "המלצה", "יוטיוב"]

function relativeDate(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const hours = Math.floor(diff / 3600000)
  if (hours < 1) return "זה עתה"
  if (hours < 24) return `לפני ${hours} שעות`
  const days = Math.floor(hours / 24)
  if (days === 1) return "אתמול"
  return `לפני ${days} ימים`
}

const PAGE_SIZE = 7

export default function LeadsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [productFilter, setProductFilter] = useState("all")
  const [sourceFilter, setSourceFilter] = useState("כל המקורות")
  const [page, setPage] = useState(1)

  const filtered = MOCK_LEADS.filter((l) => {
    const matchSearch =
      !search ||
      l.full_name.includes(search) ||
      l.phone.includes(search) ||
      l.email.includes(search)
    const matchStatus = statusFilter === "all" || l.status === statusFilter
    const matchProduct = productFilter === "all" || l.product_type === productFilter
    const matchSource = sourceFilter === "כל המקורות" || l.source === sourceFilter
    return matchSearch && matchStatus && matchProduct && matchSource
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const newToday = MOCK_LEADS.filter((l) => {
    const d = new Date(l.created_at)
    const now = new Date()
    return d.toDateString() === now.toDateString()
  }).length

  const conversionRate = Math.round(
    (MOCK_LEADS.filter((l) => l.status === "case_opened").length / MOCK_LEADS.length) * 100,
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            ניהול לידים
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">{MOCK_LEADS.length} לידים במערכת</p>
        </div>
        <Button
          render={<Link href="/crm/leads/new" />}
          className="h-9 px-4 bg-brand-navy hover:bg-brand-navy/90 text-white font-semibold text-sm rounded-xl shadow-[0_1px_2px_0_rgb(0_0_0/0.04)] gap-2 flex items-center"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          הוסף ליד
        </Button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "סה״כ לידים", value: MOCK_LEADS.length, icon: Users, color: "text-brand-blue", bg: "bg-brand-blue/10" },
          { label: "חדשים היום", value: newToday, icon: Sparkles, color: "text-brand-turquoise", bg: "bg-brand-turquoise/10" },
          { label: "שיעור המרה", value: `${conversionRate}%`, icon: TrendingUp, color: "text-brand-green", bg: "bg-brand-green/10" },
        ].map((s) => (
          <Card key={s.label} className="p-4 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_1px_3px_0_rgb(0_0_0/0.08)] flex items-center gap-3">
            <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", s.bg)}>
              <s.icon className={cn("h-5 w-5", s.color)} strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 tabular-nums tracking-tight leading-none">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_1px_3px_0_rgb(0_0_0/0.08)]">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute end-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" strokeWidth={1.75} />
            <Input
              placeholder="חיפוש לפי שם, טלפון..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="pe-9 text-sm"
            />
          </div>
          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v ?? "all"); setPage(1) }}>
            <SelectTrigger className="w-44 text-sm">
              <SelectValue placeholder="כל הסטטוסים" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">כל הסטטוסים</SelectItem>
              <SelectItem value="new">חדש</SelectItem>
              <SelectItem value="contacted">נוצר קשר</SelectItem>
              <SelectItem value="questionnaire">בתהליך שאלון</SelectItem>
              <SelectItem value="case_opened">פתח תיק</SelectItem>
              <SelectItem value="irrelevant">לא רלוונטי</SelectItem>
              <SelectItem value="frozen">קפוא</SelectItem>
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
              <SelectItem value="other">אחר</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sourceFilter} onValueChange={(v) => { setSourceFilter(v ?? "כל המקורות"); setPage(1) }}>
            <SelectTrigger className="w-40 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SOURCE_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Table */}
      <Card className="shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_1px_3px_0_rgb(0_0_0/0.08)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50">
              <TableHead className="text-xs font-medium uppercase tracking-wider text-gray-400 pe-4">שם</TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-gray-400">טלפון</TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-gray-400">מוצר</TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-gray-400">מקור</TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-gray-400">סטטוס</TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-gray-400 w-28">ציון</TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-gray-400">מטפל</TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-gray-400">תאריך</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="py-16 text-center text-sm text-gray-400">
                  לא נמצאו לידים תואמים
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((lead) => (
                <TableRow
                  key={lead.id}
                  className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 cursor-pointer"
                >
                  <TableCell className="pe-4">
                    <Link href={`/crm/leads/${lead.id}`} className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-navy/8 to-brand-blue/8 flex items-center justify-center text-xs font-bold text-brand-navy shrink-0">
                        {lead.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{lead.full_name}</p>
                        <p className="text-xs text-gray-400">{lead.email}</p>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600 tabular-nums">
                    {formatPhone(lead.phone)}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-lg bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                      {PRODUCT_TYPE_LABELS[lead.product_type]}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{lead.source}</TableCell>
                  <TableCell>
                    <StatusBadge type="lead" status={lead.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 flex-1 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            lead.score >= 80 ? "bg-brand-green" :
                            lead.score >= 60 ? "bg-brand-orange" : "bg-gray-300"
                          )}
                          style={{ width: `${lead.score}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-gray-700 tabular-nums w-6 text-left">
                        {lead.score}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{lead.advisor}</TableCell>
                  <TableCell className="text-xs text-gray-400 tabular-nums">
                    {relativeDate(lead.created_at)}
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
                          render={<Link href={`/crm/leads/${lead.id}`} className="flex items-center gap-2 w-full" />}
                        >
                          <Eye className="h-3.5 w-3.5" />
                          צפה בליד
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <ArrowRightLeft className="h-3.5 w-3.5" />
                          שנה סטטוס
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <FolderOpen className="h-3.5 w-3.5" />
                          פתח תיק
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-red-600 focus:text-red-600">
                          <Trash2 className="h-3.5 w-3.5" />
                          מחק
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
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
