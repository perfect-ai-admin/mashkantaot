import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Phone,
  MessageSquare,
  FileText,
  AlertCircle,
  Upload,
  CheckCheck,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { formatCurrency, formatDate } from "@/lib/utils"
import { CASE_STATUS_LABELS } from "@/lib/constants"
import type { CaseStatus } from "@/types/database"

const STATUS_STEPS: CaseStatus[] = [
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

const MOCK_CASE = {
  id: "case-1",
  case_number: "MC-2026-0042",
  product_type: "משכנתא חדשה",
  status: "awaiting_docs" as CaseStatus,
  progress: 35,
  requested_amount: 1200000,
  property_value: 2000000,
  monthly_income: 22000,
  existing_obligations: 3500,
  equity: 800000,
  property_address: "רחוב הרצל 12, תל אביב",
  advisor: { name: "שרה כהן", phone: "054-123-4567" },
  updated_at: "2026-04-17",
}

const DOC_STATUS_CONFIG = {
  approved: { label: "אושר", color: "text-green-600", bg: "bg-green-50", icon: CheckCheck },
  uploaded: { label: "הועלה, ממתין לבדיקה", color: "text-blue-600", bg: "bg-blue-50", icon: Clock },
  needs_reupload: { label: "נדרש מחדש", color: "text-orange-600", bg: "bg-orange-50", icon: AlertCircle },
  missing: { label: "חסר", color: "text-gray-400", bg: "bg-gray-50", icon: Circle },
}

const MOCK_DOCUMENTS = [
  { id: "1", label: "תעודת זהות", status: "approved", date: "12/04/2026" },
  { id: "2", label: "3 תלושי שכר", status: "uploaded", date: "15/04/2026" },
  { id: "3", label: 'דפי עו"ש 3 חודשים', status: "needs_reupload", date: "14/04/2026" },
  { id: "4", label: "אישור הון עצמי", status: "approved", date: "12/04/2026" },
  { id: "5", label: "מסמכי נכס", status: "missing", date: null },
  { id: "6", label: "הסכם מכר", status: "missing", date: null },
] as { id: string; label: string; status: keyof typeof DOC_STATUS_CONFIG; date: string | null }[]

const MOCK_TIMELINE = [
  { id: "1", type: "status", title: "התיק נפתח", desc: "ברוכים הבאים! תיק המשכנתא שלך נפתח בהצלחה.", time: "לפני 5 ימים", actor: "מערכת" },
  { id: "2", type: "doc", title: "תעודת זהות הועלתה", desc: null, time: "לפני 5 ימים", actor: "ישראל ישראלי" },
  { id: "3", type: "msg", title: "הודעה מהיועץ", desc: "שלום! קיבלתי את הבקשה שלך. אשמח לעמוד לרשותך. אנא העלה את שאר המסמכים הנדרשים.", time: "לפני 4 ימים", actor: "שרה כהן" },
  { id: "4", type: "doc", title: "אישור הון עצמי הועלה ואושר", desc: null, time: "לפני 4 ימים", actor: "ישראל ישראלי" },
  { id: "5", type: "doc", title: "3 תלושי שכר הועלו", desc: null, time: "אתמול", actor: "ישראל ישראלי" },
  { id: "6", type: "alert", title: 'דפי עו"ש נדרשים מחדש', desc: "הקבצים שהועלו אינם קריאים. אנא העלה מחדש.", time: "אתמול", actor: "שרה כהן" },
]

const WHAT_NEXT: Record<CaseStatus, { title: string; desc: string }> = {
  new: { title: "התיק חדש", desc: "הצוות שלנו יעבור על הפרטים ויצור איתך קשר בקרוב." },
  awaiting_docs: { title: "נדרשים מסמכים", desc: "יש להעלות את המסמכים החסרים כדי להמשיך בטיפול בתיק." },
  partial_docs: { title: "מסמכים חלקיים", desc: "חלק מהמסמכים התקבלו. אנא השלם את הנדרשים." },
  ready_for_review: { title: "הכל מוכן לבדיקה", desc: "כל המסמכים התקבלו. היועץ יתחיל לבדוק את התיק בקרוב." },
  advisor_review: { title: "בבדיקת היועץ", desc: "היועץ בוחן את התיק. נחזור אליך עם האפשרויות בהקדם." },
  building_options: { title: "נבנות הצעות", desc: "אנחנו מרכיבים עבורך את ההצעות הטובות ביותר מהבנקים." },
  awaiting_client: { title: "ממתינים לך", desc: "יש לך הצעה לאישור. אנא בדוק ואשר או פנה ליועץ לשאלות." },
  submitted: { title: "הבקשה הוגשה", desc: "הבקשה הוגשה לבנק. ננדכן אותך עם תגובת הבנק." },
  completed: { title: "הושלם!", desc: "תהליך המשכנתא הושלם בהצלחה. ברכות!" },
  closed: { title: "תיק סגור", desc: "תיק זה נסגר." },
}

export default function CaseDetailPage({ params }: { params: { id: string } }) {
  const currentStepIdx = STATUS_STEPS.indexOf(MOCK_CASE.status)
  const approvedDocs = MOCK_DOCUMENTS.filter((d) => d.status === "approved").length
  const nextStep = WHAT_NEXT[MOCK_CASE.status]

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <div>
        <Button variant="ghost" size="sm" className="mb-4 -mr-2 text-gray-500" render={<Link href="/cases" />}>
          <ArrowRight className="size-3.5" />
          חזרה לתיקים
        </Button>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-gray-400 tabular-nums mb-1">תיק {MOCK_CASE.case_number}</p>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">{MOCK_CASE.product_type}</h1>
          </div>
          <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-600">
            {CASE_STATUS_LABELS[MOCK_CASE.status]}
          </span>
        </div>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center gap-0 overflow-x-auto">
            {STATUS_STEPS.map((step, idx) => {
              const isDone = idx < currentStepIdx
              const isCurrent = idx === currentStepIdx
              return (
                <div key={step} className="flex items-center shrink-0">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`flex size-7 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                        isDone
                          ? "bg-brand-turquoise text-white"
                          : isCurrent
                          ? "bg-brand-turquoise/20 text-brand-turquoise ring-2 ring-brand-turquoise"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="size-4" /> : idx + 1}
                    </div>
                    <span
                      className={`text-[10px] text-center max-w-[60px] leading-tight ${
                        isCurrent ? "text-brand-turquoise font-semibold" : isDone ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      {CASE_STATUS_LABELS[step]}
                    </span>
                  </div>
                  {idx < STATUS_STEPS.length - 1 && (
                    <div
                      className={`h-0.5 w-8 mx-1 mt-[-14px] rounded-full transition-colors ${
                        isDone ? "bg-brand-turquoise" : "bg-gray-100"
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* What's Next */}
      <Card className="border-brand-turquoise/20 bg-gradient-to-bl from-cyan-50/50 to-transparent">
        <CardContent className="pt-5 pb-5">
          <div className="flex gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-turquoise/10 text-brand-turquoise">
              <AlertCircle className="size-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{nextStep.title}</h3>
              <p className="text-sm text-gray-600">{nextStep.desc}</p>
              {MOCK_CASE.status === "awaiting_docs" && (
                <Button
                  size="sm"
                  className="mt-3 bg-brand-turquoise hover:bg-brand-turquoise/90 text-white"
                  render={<Link href={`/cases/${params.id}/documents`} />}
                >
                  <Upload className="size-3.5" />
                  העלה מסמכים
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="w-full justify-start bg-gray-50/80">
          <TabsTrigger value="overview">סקירה</TabsTrigger>
          <TabsTrigger value="documents">
            מסמכים
            <span className="mr-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-100 px-1 text-[10px] font-semibold text-amber-700">
              {MOCK_DOCUMENTS.filter((d) => d.status === "missing" || d.status === "needs_reupload").length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="timeline">ציר זמן</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="border-b pb-3">
              <CardTitle className="text-sm font-semibold text-gray-700">סיכום פיננסי</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {[
                  { label: "הכנסה חודשית", val: formatCurrency(MOCK_CASE.monthly_income) },
                  { label: "התחייבויות", val: formatCurrency(MOCK_CASE.existing_obligations) },
                  { label: "הון עצמי", val: formatCurrency(MOCK_CASE.equity) },
                  { label: "סכום מבוקש", val: formatCurrency(MOCK_CASE.requested_amount) },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                    <p className="text-base font-semibold text-gray-900 tabular-nums">{item.val}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b pb-3">
              <CardTitle className="text-sm font-semibold text-gray-700">פרטי נכס</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">כתובת</p>
                <p className="text-sm font-medium text-gray-900">{MOCK_CASE.property_address}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">שווי נכס</p>
                <p className="text-sm font-medium text-gray-900 tabular-nums">{formatCurrency(MOCK_CASE.property_value)}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b pb-3">
              <CardTitle className="text-sm font-semibold text-gray-700">היועץ שלך</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-brand-turquoise/10 text-brand-turquoise font-bold text-sm">
                    {MOCK_CASE.advisor.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{MOCK_CASE.advisor.name}</p>
                    <p className="text-xs text-gray-400 tabular-nums">{MOCK_CASE.advisor.phone}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="size-8">
                    <Phone className="size-3.5" />
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <MessageSquare className="size-3.5" />
                    שלח הודעה
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-3 pt-4">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-900">{approvedDocs}</span> מתוך {MOCK_DOCUMENTS.length} מסמכים הושלמו
            </p>
            <Button variant="outline" size="sm" render={<Link href={`/cases/${params.id}/documents`} />}>
              נהל מסמכים
            </Button>
          </div>
          {MOCK_DOCUMENTS.map((doc) => {
            const cfg = DOC_STATUS_CONFIG[doc.status]
            const Icon = cfg.icon
            return (
              <div key={doc.id} className={`flex items-center gap-3 rounded-xl p-3.5 ${cfg.bg}`}>
                <Icon className={`size-4 shrink-0 ${cfg.color}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{doc.label}</p>
                  {doc.date && <p className="text-xs text-gray-400 mt-0.5">{doc.date}</p>}
                </div>
                <span className={`text-xs font-medium ${cfg.color}`}>{cfg.label}</span>
                {(doc.status === "missing" || doc.status === "needs_reupload") && (
                  <Button size="xs" className="bg-brand-turquoise hover:bg-brand-turquoise/90 text-white">
                    העלה
                  </Button>
                )}
              </div>
            )
          })}
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="pt-4">
          <div className="relative">
            <div className="absolute right-[17px] top-0 bottom-0 w-px bg-gray-100" />
            <div className="space-y-6">
              {MOCK_TIMELINE.map((entry) => {
                const iconMap = {
                  status: { Icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
                  doc: { Icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
                  msg: { Icon: MessageSquare, color: "text-purple-600", bg: "bg-purple-50" },
                  alert: { Icon: AlertCircle, color: "text-orange-600", bg: "bg-orange-50" },
                }
                const { Icon, color, bg } = iconMap[entry.type as keyof typeof iconMap]
                return (
                  <div key={entry.id} className="relative flex gap-4 pr-1">
                    <div className={`relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full ${bg}`}>
                      <Icon className={`size-4 ${color}`} />
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-sm font-semibold text-gray-900">{entry.title}</p>
                      {entry.desc && <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{entry.desc}</p>}
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs text-gray-400">{entry.actor}</span>
                        <span className="text-gray-300">·</span>
                        <span className="text-xs text-gray-400">{entry.time}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
