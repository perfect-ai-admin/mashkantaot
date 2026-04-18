import Link from "next/link"
import {
  ArrowRight,
  CircleDot,
  FileText,
  MessageSquare,
  CheckCircle2,
  Info,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"

type EntryType = "status" | "document" | "message" | "task" | "system" | "alert"

interface TimelineEntry {
  id: string
  type: EntryType
  title: string
  description?: string
  actor: string
  time: string
  isLast?: boolean
}

const ENTRY_CONFIG: Record<EntryType, { Icon: React.ElementType; color: string; bg: string; dot: string }> = {
  status: { Icon: CircleDot, color: "text-green-600", bg: "bg-green-50", dot: "bg-green-400" },
  document: { Icon: FileText, color: "text-blue-600", bg: "bg-blue-50", dot: "bg-blue-400" },
  message: { Icon: MessageSquare, color: "text-purple-600", bg: "bg-purple-50", dot: "bg-purple-400" },
  task: { Icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50", dot: "bg-green-400" },
  system: { Icon: Info, color: "text-gray-400", bg: "bg-gray-100", dot: "bg-gray-300" },
  alert: { Icon: AlertCircle, color: "text-orange-500", bg: "bg-orange-50", dot: "bg-orange-400" },
}

const MOCK_ENTRIES: TimelineEntry[] = [
  {
    id: "1",
    type: "status",
    title: "התיק נפתח",
    description: "תיק MC-2026-0042 נפתח בהצלחה. ברוכים הבאים לתהליך.",
    actor: "מערכת",
    time: "לפני 5 ימים",
  },
  {
    id: "2",
    type: "system",
    title: "שאלון הושלם",
    description: "הפרטים שמילאת נשמרו ויועברו ליועץ לבחינה.",
    actor: "מערכת",
    time: "לפני 5 ימים",
  },
  {
    id: "3",
    type: "document",
    title: "תעודת זהות הועלתה",
    actor: "ישראל ישראלי",
    time: "לפני 5 ימים",
  },
  {
    id: "4",
    type: "message",
    title: "הודעה מהיועץ: שרה כהן",
    description: "שלום! קיבלתי את הבקשה שלך. אנא העלה את שאר המסמכים הנדרשים כדי שנוכל להמשיך.",
    actor: "שרה כהן",
    time: "לפני 4 ימים",
  },
  {
    id: "5",
    type: "document",
    title: "אישור הון עצמי הועלה",
    actor: "ישראל ישראלי",
    time: "לפני 4 ימים",
  },
  {
    id: "6",
    type: "task",
    title: "משימה הושלמה: אישור פרטים אישיים",
    actor: "ישראל ישראלי",
    time: "לפני 3 ימים",
  },
  {
    id: "7",
    type: "document",
    title: "3 תלושי שכר הועלו",
    actor: "ישראל ישראלי",
    time: "אתמול",
  },
  {
    id: "8",
    type: "alert",
    title: 'דפי עו"ש נדרשים מחדש',
    description: "הקבצים שהועלו אינם ברמת איכות מספקת לבדיקה. אנא העלה גרסה ברורה יותר.",
    actor: "שרה כהן",
    time: "אתמול",
  },
  {
    id: "9",
    type: "status",
    title: "סטטוס עודכן: ממתין למסמכים",
    description: "נדרשים עדיין מסמכים להשלמת התיק.",
    actor: "מערכת",
    time: "לפני שעתיים",
  },
]

export default function TimelinePage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" size="sm" className="mb-4 -mr-2 text-gray-500" render={<Link href={`/cases/${params.id}`} />}>
          <ArrowRight className="size-3.5" />
          חזרה לתיק
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">ציר זמן</h1>
        <p className="text-sm text-gray-500 mt-0.5">תיק MC-2026-0042 — היסטוריית אירועים</p>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute right-[17px] top-4 bottom-4 w-px bg-gray-200" />

        <div className="space-y-0">
          {MOCK_ENTRIES.map((entry, idx) => {
            const cfg = ENTRY_CONFIG[entry.type]
            const { Icon } = cfg
            const isLast = idx === MOCK_ENTRIES.length - 1

            return (
              <div key={entry.id} className="relative flex gap-4 pr-1 pb-8">
                {/* Icon bubble */}
                <div
                  className={`relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full ${cfg.bg} ring-2 ring-white`}
                >
                  <Icon className={`size-4 ${cfg.color}`} />
                </div>

                {/* Content */}
                <div
                  className={`flex-1 rounded-xl bg-white px-4 py-3.5 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)] border border-gray-100 ${isLast ? "ring-1 ring-brand-turquoise/20" : ""}`}
                >
                  <p className="text-sm font-semibold text-gray-900 leading-snug">{entry.title}</p>
                  {entry.description && (
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{entry.description}</p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`inline-block size-1.5 rounded-full ${cfg.dot}`} />
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
    </div>
  )
}
