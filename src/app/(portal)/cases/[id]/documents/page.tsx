import Link from "next/link"
import {
  ArrowRight,
  UploadCloud,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  FileText,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type DocStatus = "missing" | "uploaded" | "approved" | "invalid"

interface DocItem {
  id: string
  label: string
  status: DocStatus
  fileName?: string
  fileSize?: string
  date?: string
  reviewNote?: string
}

const MOCK_DOCUMENTS: DocItem[] = [
  { id: "1", label: "תעודת זהות", status: "approved", fileName: "id_card.pdf", fileSize: "1.2 MB", date: "12/04/2026" },
  { id: "2", label: "3 תלושי שכר", status: "uploaded", fileName: "salary_slips.pdf", fileSize: "3.4 MB", date: "15/04/2026" },
  { id: "3", label: 'דפי עו"ש 3 חודשים', status: "invalid", fileName: "bank_statements.pdf", fileSize: "2.1 MB", date: "14/04/2026", reviewNote: "הקבצים אינם קריאים. אנא סרוק מחדש באיכות גבוהה יותר." },
  { id: "4", label: "אישור הון עצמי", status: "approved", fileName: "equity_proof.pdf", fileSize: "0.8 MB", date: "12/04/2026" },
  { id: "5", label: "מסמכי נכס", status: "missing" },
  { id: "6", label: "הסכם מכר", status: "missing" },
]

const RECENTLY_UPLOADED = [
  { name: "salary_slips.pdf", size: "3.4 MB", date: "15/04/2026 14:32" },
  { name: "bank_statements.pdf", size: "2.1 MB", date: "14/04/2026 09:15" },
  { name: "equity_proof.pdf", size: "0.8 MB", date: "12/04/2026 16:48" },
]

const STATUS_CONFIG = {
  approved: {
    label: "אושר",
    cardClass: "bg-green-50 border border-green-100",
    iconColor: "text-green-600",
    Icon: CheckCircle2,
  },
  uploaded: {
    label: "הועלה — ממתין לבדיקה",
    cardClass: "bg-blue-50 border border-blue-100",
    iconColor: "text-blue-500",
    Icon: Clock,
  },
  invalid: {
    label: "לא תקין",
    cardClass: "bg-red-50 border border-red-100",
    iconColor: "text-red-500",
    Icon: XCircle,
  },
  missing: {
    label: "חסר",
    cardClass: "bg-gray-50 border border-gray-200",
    iconColor: "text-gray-300",
    Icon: AlertCircle,
  },
}

export default function DocumentsPage({ params }: { params: { id: string } }) {
  const completed = MOCK_DOCUMENTS.filter((d) => d.status === "approved").length
  const total = MOCK_DOCUMENTS.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button variant="ghost" size="sm" className="mb-4 -mr-2 text-gray-500" render={<Link href={`/cases/${params.id}`} />}>
          <ArrowRight className="size-3.5" />
          חזרה לתיק
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">מסמכים</h1>
        <p className="text-sm text-gray-500 mt-0.5">תיק MC-2026-0042</p>
      </div>

      {/* Progress Bar */}
      <Card className="bg-gradient-to-bl from-cyan-50/60 to-transparent border-brand-turquoise/15">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">התקדמות מסמכים</span>
            <span className="text-sm font-bold text-brand-turquoise tabular-nums">
              {completed} / {total}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-brand-turquoise transition-all"
              style={{ width: `${(completed / total) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">{completed} מתוך {total} מסמכים הושלמו</p>
        </CardContent>
      </Card>

      {/* Documents List */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-700">רשימת מסמכים נדרשים</h2>
        {MOCK_DOCUMENTS.map((doc) => {
          const cfg = STATUS_CONFIG[doc.status]
          const { Icon } = cfg
          return (
            <div key={doc.id} className={`rounded-xl p-4 ${cfg.cardClass}`}>
              <div className="flex items-start gap-3">
                <Icon className={`size-5 shrink-0 mt-0.5 ${cfg.iconColor}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-900">{doc.label}</p>
                    <span className={`text-xs font-medium shrink-0 ${cfg.iconColor}`}>{cfg.label}</span>
                  </div>
                  {doc.fileName && (
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                      <FileText className="size-3" />
                      {doc.fileName}
                      {doc.fileSize && <span className="text-gray-400">· {doc.fileSize}</span>}
                      {doc.date && <span className="text-gray-400">· {doc.date}</span>}
                    </p>
                  )}
                  {doc.reviewNote && (
                    <p className="text-xs text-red-600 mt-2 leading-relaxed bg-red-50 rounded-lg px-2.5 py-2">
                      {doc.reviewNote}
                    </p>
                  )}
                </div>
              </div>
              {(doc.status === "missing" || doc.status === "invalid") && (
                <div className="mt-3 flex gap-2 mr-8">
                  <Button
                    size="sm"
                    className="bg-brand-turquoise hover:bg-brand-turquoise/90 text-white gap-1.5"
                  >
                    <UploadCloud className="size-3.5" />
                    {doc.status === "invalid" ? "העלה מחדש" : "העלה"}
                  </Button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Upload Zone */}
      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">העלאת קבצים</h2>
        <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-10 text-center hover:border-brand-turquoise/40 hover:bg-cyan-50/30 transition-colors cursor-pointer">
          <div className="flex flex-col items-center gap-3">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-white shadow-sm">
              <UploadCloud className="size-7 text-brand-turquoise" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">גרור קבצים לכאן</p>
              <p className="text-sm text-gray-500 mt-0.5">או לחץ לבחירה מהמכשיר</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>PDF, JPG, PNG</span>
              <span>·</span>
              <span>עד 10MB לקובץ</span>
            </div>
            <Button size="sm" variant="outline" className="mt-1">
              בחר קבצים
            </Button>
          </div>
        </div>
      </div>

      {/* Recently Uploaded */}
      <Card>
        <CardHeader className="border-b pb-3">
          <CardTitle className="text-sm font-semibold text-gray-700">קבצים שהועלו לאחרונה</CardTitle>
        </CardHeader>
        <CardContent className="pt-3 divide-y divide-gray-100">
          {RECENTLY_UPLOADED.map((file) => (
            <div key={file.name} className="flex items-center gap-3 py-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                <FileText className="size-4 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                <p className="text-xs text-gray-400">{file.size} · {file.date}</p>
              </div>
              <Button variant="ghost" size="icon-sm" className="text-gray-300 hover:text-red-400">
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
