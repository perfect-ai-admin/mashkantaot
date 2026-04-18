import Link from "next/link"
import { FolderOpen, ArrowLeft, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { EmptyState } from "@/components/ui/empty-state"
import { formatDate } from "@/lib/utils"
import { CASE_STATUS_LABELS, PRODUCT_TYPE_LABELS } from "@/lib/constants"
import type { CaseStatus, ProductType } from "@/types/database"

const STATUS_COLORS: Record<CaseStatus, string> = {
  new: "bg-gray-100 text-gray-600",
  awaiting_docs: "bg-amber-50 text-amber-700",
  partial_docs: "bg-orange-50 text-orange-700",
  ready_for_review: "bg-blue-50 text-blue-700",
  advisor_review: "bg-purple-50 text-purple-700",
  building_options: "bg-indigo-50 text-indigo-700",
  awaiting_client: "bg-cyan-50 text-cyan-700",
  submitted: "bg-teal-50 text-teal-700",
  completed: "bg-green-50 text-green-700",
  closed: "bg-gray-100 text-gray-500",
}

const MOCK_CASES = [
  {
    id: "case-1",
    case_number: "MC-2026-0042",
    product_type: "new_mortgage" as ProductType,
    status: "awaiting_docs" as CaseStatus,
    progress: 35,
    updated_at: "2026-04-17T10:30:00",
  },
  {
    id: "case-2",
    case_number: "MC-2026-0031",
    product_type: "refinance" as ProductType,
    status: "advisor_review" as CaseStatus,
    progress: 65,
    updated_at: "2026-04-15T14:00:00",
  },
]

export default function CasesPage() {
  const hasCases = MOCK_CASES.length > 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">התיקים שלי</h1>
          <p className="text-sm text-gray-500 mt-1">כל תיקי המשכנתא שלך במקום אחד</p>
        </div>
        {hasCases && (
          <Button
            className="bg-brand-turquoise hover:bg-brand-turquoise/90 text-white"
            render={<Link href="/questionnaire" />}
          >
            תיק חדש
          </Button>
        )}
      </div>

      {!hasCases ? (
        <Card className="py-0">
          <CardContent className="px-0">
            <EmptyState
              icon={FolderOpen}
              title="אין תיקים פתוחים"
              description="עדיין לא פתחת תיק משכנתא. לחץ להתחיל בשאלון קצר."
              action={
                <Button
                  className="bg-brand-turquoise hover:bg-brand-turquoise/90 text-white"
                  render={<Link href="/questionnaire" />}
                >
                  התחל בדיקה חדשה
                </Button>
              }
            />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {MOCK_CASES.map((c) => (
            <Card key={c.id} className="shadow-[0_1px_3px_0_rgb(0_0_0/0.04),0_6px_16px_-2px_rgb(0_0_0/0.05)] hover:shadow-[0_8px_16px_-4px_rgb(0_0_0/0.08),0_4px_8px_-2px_rgb(0_0_0/0.04)] transition-all duration-200 border border-gray-100/80">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 font-medium tabular-nums mb-1">
                      תיק {c.case_number}
                    </p>
                    <h2 className="text-base font-semibold text-gray-900 mb-3">
                      {PRODUCT_TYPE_LABELS[c.product_type]}
                    </h2>

                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[c.status]}`}
                      >
                        {CASE_STATUS_LABELS[c.status]}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>התקדמות</span>
                        <span className="tabular-nums font-medium">{c.progress}%</span>
                      </div>
                      <Progress value={c.progress} className="gap-0">
                        <div className="relative flex h-2 w-full items-center overflow-hidden rounded-full bg-gray-100">
                          <div
                            className="h-full bg-brand-turquoise transition-all rounded-full"
                            style={{ width: `${c.progress}%` }}
                          />
                        </div>
                      </Progress>
                    </div>

                    <div className="flex items-center gap-1 mt-3 text-xs text-gray-400">
                      <Clock className="size-3" />
                      <span>עודכן {formatDate(c.updated_at)}</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="shrink-0 gap-1.5"
                    render={<Link href={`/cases/${c.id}`} />}
                  >
                    צפה בתיק
                    <ArrowLeft className="size-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
