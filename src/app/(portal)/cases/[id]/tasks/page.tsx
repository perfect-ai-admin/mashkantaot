import Link from "next/link"
import { ArrowRight, CheckCircle2, Circle, Calendar, CheckCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface TaskItem {
  id: string
  title: string
  description: string
  dueDate?: string
  completed: boolean
}

const MOCK_TASKS: TaskItem[] = [
  {
    id: "1",
    title: "העלה 3 תלושי שכר",
    description: "יש לצרף תלושי שכר מהשלושה חודשים האחרונים בפורמט PDF.",
    dueDate: "20/04/2026",
    completed: false,
  },
  {
    id: "2",
    title: 'העלה דפי עו"ש מחדש',
    description: 'דפי העו"ש שהועלו אינם קריאים. אנא העלה גרסה ברורה.',
    dueDate: "22/04/2026",
    completed: false,
  },
  {
    id: "3",
    title: "אשר פרטים אישיים",
    description: "סקור ואשר את הפרטים האישיים שמילאת בשאלון.",
    completed: true,
  },
  {
    id: "4",
    title: "קבע שיחה עם יועץ",
    description: "ניתן לתאם שיחה טלפונית עם היועץ שלך בכל עת.",
    completed: false,
  },
]

export default function TasksPage({ params }: { params: { id: string } }) {
  const pending = MOCK_TASKS.filter((t) => !t.completed)
  const completed = MOCK_TASKS.filter((t) => t.completed)
  const hasTasks = MOCK_TASKS.length > 0

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" size="sm" className="mb-4 -mr-2 text-gray-500" render={<Link href={`/cases/${params.id}`} />}>
          <ArrowRight className="size-3.5" />
          חזרה לתיק
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">המשימות שלי</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {pending.length} משימות ממתינות לטיפול
        </p>
      </div>

      {!hasTasks ? (
        <Card>
          <CardContent className="py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 mx-auto mb-4">
              <CheckCheck className="size-7 text-gray-300" strokeWidth={1.5} />
            </div>
            <p className="text-sm font-semibold text-gray-900">אין משימות כרגע</p>
            <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">
              נעדכן אותך כשיהיה משהו לטפל בו.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Pending tasks */}
          {pending.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="inline-flex size-5 items-center justify-center rounded-full bg-amber-100 text-[10px] font-bold text-amber-700">
                  {pending.length}
                </span>
                ממתינות לטיפול
              </h2>
              {pending.map((task) => (
                <Card key={task.id} className="border-l-4 border-l-brand-turquoise">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <button className="mt-0.5 shrink-0 text-gray-300 hover:text-brand-turquoise transition-colors">
                        <Circle className="size-5" />
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{task.title}</p>
                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">{task.description}</p>
                        {task.dueDate && (
                          <div className="flex items-center gap-1.5 mt-2.5">
                            <Calendar className="size-3 text-gray-400" />
                            <span className="text-xs text-gray-400">
                              יש לסיים עד {task.dueDate}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    {task.id === "1" || task.id === "2" ? (
                      <div className="mt-3 mr-8">
                        <Button
                          size="sm"
                          className="bg-brand-turquoise hover:bg-brand-turquoise/90 text-white"
                          render={<Link href={`/cases/${params.id}/documents`} />}
                        >
                          העלה מסמך
                        </Button>
                      </div>
                    ) : task.id === "4" ? (
                      <div className="mt-3 mr-8">
                        <Button size="sm" variant="outline">
                          קבע שיחה
                        </Button>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Completed tasks */}
          {completed.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-gray-400">הושלמו</h2>
              {completed.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3.5 opacity-70"
                >
                  <CheckCircle2 className="size-5 shrink-0 mt-0.5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 line-through">{task.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{task.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
