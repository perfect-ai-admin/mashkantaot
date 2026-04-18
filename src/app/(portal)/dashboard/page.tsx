import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
  FileText,
  Upload,
  Clock,
  CheckCircle,
  AlertCircle,
  Phone,
  MessageSquare,
} from "lucide-react"

// TODO: Replace with real data from Supabase
const MOCK_CASE = {
  case_number: "MC-2026-0042",
  product_type: "משכנתא חדשה",
  status: "ממתין למסמכים",
  progress: 35,
  advisor: "שרה כהן",
  missing_docs: [
    { type: "תלושי שכר", count: 3 },
    { type: "דפי עו\"ש" },
    { type: "אישור הון עצמי" },
  ],
  timeline: [
    { date: "17/04/2026", title: "התיק נפתח", status: "done" },
    { date: "17/04/2026", title: "שאלון הושלם", status: "done" },
    { date: "—", title: "ממתין למסמכים", status: "current" },
    { date: "—", title: "בדיקת יועץ", status: "pending" },
    { date: "—", title: "בניית אפשרויות", status: "pending" },
    { date: "—", title: "הגשה", status: "pending" },
  ],
}

export default function PortalDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-brand-navy tracking-tight">
          שלום, ישראל
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          הנה מצב תיק ה{MOCK_CASE.product_type} שלך
        </p>
      </div>

      {/* Status Card — prominent */}
      <Card className="p-6 bg-gradient-to-bl from-brand-navy/5 via-brand-turquoise/5 to-transparent border-brand-turquoise/15 shadow-[0_1px_3px_0_rgb(0_0_0/0.04),0_4px_16px_0_rgb(58_175_169/0.08)]">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-xs text-gray-500 font-medium tabular-nums mb-1">
              תיק {MOCK_CASE.case_number}
            </p>
            <h2 className="text-xl font-bold text-brand-navy tracking-tight">
              {MOCK_CASE.product_type}
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-orange/10 text-brand-orange border border-brand-orange/15">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
            {MOCK_CASE.status}
          </span>
        </div>

        <div className="space-y-2.5">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">התקדמות התיק</span>
            <span className="font-bold text-brand-navy tabular-nums">{MOCK_CASE.progress}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-l from-brand-turquoise via-[#3AAFA9] to-brand-turquoise/80 rounded-full transition-all duration-700"
              style={{ width: `${MOCK_CASE.progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-400">
            35% הושלם &middot; נותר עוד 65% להגשה
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100/80 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-turquoise/10 flex items-center justify-center">
            <span className="text-[10px] font-black text-brand-turquoise">שכ</span>
          </div>
          <p className="text-sm text-gray-600">
            יועץ מטפל: <span className="font-semibold text-brand-navy">{MOCK_CASE.advisor}</span>
          </p>
        </div>
      </Card>

      {/* Missing Docs + Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Missing Documents — urgent */}
        <Card className="p-6 border-brand-orange/15 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_2px_8px_0_rgb(0_0_0/0.06)]">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center">
              <AlertCircle className="h-4 w-4 text-brand-orange" strokeWidth={1.75} />
            </div>
            <h3 className="font-bold text-brand-navy">מסמכים חסרים</h3>
            <span className="ms-auto inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-orange text-white text-[10px] font-bold tabular-nums">
              {MOCK_CASE.missing_docs.length}
            </span>
          </div>
          <p className="text-xs text-gray-500 mb-4 me-10">
            כדי להתקדם, נדרש להעלות {MOCK_CASE.missing_docs.length} מסמכים
          </p>

          <ul className="space-y-2.5 mb-5">
            {MOCK_CASE.missing_docs.map((doc, i) => (
              <li key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-brand-orange/4 border border-brand-orange/8">
                <div className="w-8 h-8 rounded-lg bg-brand-orange/12 flex items-center justify-center shrink-0">
                  <FileText className="h-4 w-4 text-brand-orange" strokeWidth={1.75} />
                </div>
                <span className="text-sm font-medium text-gray-800">
                  {doc.type}
                  {doc.count ? <span className="text-xs text-gray-400 font-normal"> ({doc.count})</span> : ""}
                </span>
              </li>
            ))}
          </ul>

          <Button
            render={<Link href="/cases/mock-id/documents" />}
            className="w-full h-10 bg-brand-turquoise hover:bg-[#329d97] text-white font-semibold rounded-xl text-sm shadow-[0_1px_3px_0_rgb(58_175_169/0.25)] hover:shadow-[0_4px_12px_0_rgb(58_175_169/0.3)] transition-all duration-200 active:scale-[0.98]"
          >
            <Upload className="me-2 h-4 w-4" strokeWidth={1.75} />
            העלה מסמכים
          </Button>
        </Card>

        {/* Timeline */}
        <Card className="p-6 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_2px_8px_0_rgb(0_0_0/0.06)]">
          <h3 className="font-bold text-brand-navy mb-5">מצב התיק</h3>
          <div className="flex flex-col gap-0">
            {MOCK_CASE.timeline.map((step, i) => (
              <div key={i} className="flex gap-4">
                {/* Dot + line column */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ${
                      step.status === "done"
                        ? "bg-brand-green shadow-[0_0_0_3px_rgb(56_176_0/0.15)]"
                        : step.status === "current"
                        ? "bg-brand-turquoise shadow-[0_0_0_3px_rgb(58_175_169/0.2)]"
                        : "bg-gray-100 border-2 border-gray-200"
                    }`}
                  >
                    {step.status === "done" ? (
                      <CheckCircle className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                    ) : step.status === "current" ? (
                      <Clock className="h-3.5 w-3.5 text-white" strokeWidth={2} />
                    ) : (
                      <span className="text-[10px] font-bold text-gray-400">{i + 1}</span>
                    )}
                  </div>
                  {i < MOCK_CASE.timeline.length - 1 && (
                    <div
                      className={`w-0.5 flex-1 min-h-[20px] my-1 rounded-full ${
                        step.status === "done" ? "bg-brand-green/40" : "bg-gray-100"
                      }`}
                    />
                  )}
                </div>

                {/* Content */}
                <div className={`pb-4 ${i === MOCK_CASE.timeline.length - 1 ? "pb-0" : ""}`}>
                  <p
                    className={`text-sm font-semibold leading-tight ${
                      step.status === "current"
                        ? "text-brand-turquoise"
                        : step.status === "done"
                        ? "text-gray-900"
                        : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 tabular-nums">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_2px_8px_0_rgb(0_0_0/0.06)]">
        <h3 className="font-bold text-brand-navy mb-4">פעולות מהירות</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Upload, label: "העלה מסמך", href: "/cases/mock-id/documents", color: "text-brand-turquoise", bg: "bg-brand-turquoise/8" },
            { icon: MessageSquare, label: "שלח הודעה", href: "#", color: "text-brand-blue", bg: "bg-brand-blue/8" },
            { icon: Phone, label: "קבע שיחה", href: "#", color: "text-brand-green", bg: "bg-brand-green/8" },
            { icon: FileText, label: "צפה בתיק", href: "/cases/mock-id", color: "text-gray-600", bg: "bg-gray-100" },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex flex-col items-center gap-2.5 p-4 rounded-xl bg-gray-50/80 hover:bg-gray-100/80 border border-gray-100 hover:border-gray-200/60 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_0_rgb(0_0_0/0.06)] group min-h-[80px] justify-center"
            >
              <div className={`w-10 h-10 rounded-xl ${action.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                <action.icon className={`h-5 w-5 ${action.color}`} strokeWidth={1.75} />
              </div>
              <span className="text-xs font-semibold text-gray-700 text-center leading-tight">{action.label}</span>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  )
}
