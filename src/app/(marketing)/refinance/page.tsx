import Link from "next/link"
import {
  TrendingDown,
  Baby,
  Wallet,
  Clock,
  CheckCircle2,
  ArrowLeft,
  PiggyBank,
  BadgeCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const SCENARIOS = [
  {
    icon: TrendingDown,
    title: "ריבית ירדה בשוק",
    description: "אם לקחת את המשכנתא לפני כמה שנים, ייתכן שהריבית הנוכחית נמוכה בהרבה ממה שאתה משלם",
  },
  {
    icon: Baby,
    title: "שינוי מצב משפחתי",
    description: "לידת ילד, שינוי עבודה, ירושה — שינויים בחיים משפיעים על יכולת ההחזר ועל הצורך לשנות מסלול",
  },
  {
    icon: Wallet,
    title: "רצון להקטין החזר חודשי",
    description: "מרגיש שההחזר הנוכחי כבד מדי? מחזור יכול לפרוס מחדש ולהוריד את ההחזר החודשי",
  },
  {
    icon: Clock,
    title: "קיצור תקופת המשכנתא",
    description: "אם הכנסתך עלתה, כדאי לבחון האם להגדיל החזר ולסיים את המשכנתא מוקדם יותר",
  },
]

const REQUIRED_DOCS = [
  'דו"ח יתרת משכנתא מהבנק (מסמך עדכני)',
  "3 תלושי שכר אחרונים",
  "דפי עו\"ש 3 חודשים אחרונים",
  "תנאי המשכנתא הקיימת (לוח סילוקין)",
  "תעודת זהות",
]

export default function RefinancePage() {
  return (
    <div className="flex flex-col" dir="rtl">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_65%_-5%,#2D4A7A55,transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-bl from-brand-green/15 via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-28 lg:py-36 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/15 text-brand-green text-xs font-medium px-3 py-1.5 rounded-full mb-8 tracking-wide backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
              מחזור משכנתא
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-display font-bold leading-[1.1] tracking-tight mb-6">
              בדוק אם אפשר{" "}
              <span className="text-brand-turquoise">לחסוך במשכנתא הקיימת</span>
            </h1>

            <p className="text-base sm:text-lg text-white/55 mb-10 leading-relaxed max-w-xl">
              ייתכן שהריבית או ההחזר שלך ניתנים לשיפור — בדיקה חינם תוך דקות
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                render={<Link href="/questionnaire?product=refinance" />}
                className="h-12 bg-brand-turquoise hover:bg-[#2f9d97] text-white font-semibold text-base px-7 rounded-xl shadow-[0_1px_2px_0_rgb(0_0_0/0.05),0_4px_12px_-2px_rgb(58_175_169/0.3)] hover:shadow-[0_2px_4px_0_rgb(0_0_0/0.08),0_8px_20px_-4px_rgb(58_175_169/0.4)] transition-all duration-200 active:scale-[0.98] w-full sm:w-auto"
              >
                בדוק מחזור
              </Button>
              <Button
                render={<Link href="/calculator" />}
                className="h-12 border border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold text-base px-7 rounded-xl transition-all duration-200 w-full sm:w-auto"
              >
                מחשבון מחזור
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Savings Highlight ────────────────────────────────── */}
      <section className="py-14 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-emerald-50/80 via-emerald-50/40 to-transparent border border-gray-100 rounded-2xl p-6 lg:p-8 text-center shadow-[0_1px_3px_0_rgb(0_0_0/0.04),0_6px_16px_-2px_rgb(0_0_0/0.05)]">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
              <PiggyBank className="h-6 w-6 text-emerald-600" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg font-semibold text-brand-navy mb-2">
              לקוחות שלנו חוסכים בממוצע
            </h2>
            <p className="text-5xl font-display font-black text-brand-green tracking-tight tabular-nums mb-2">
              ₪500–₪1,200
            </p>
            <p className="text-sm text-gray-500">לחודש — לאורך כל חיי המשכנתא</p>
          </div>
        </div>
      </section>

      {/* ── Scenarios ────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-gray-50/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 lg:mb-16">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-3">
              מתי לבדוק
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-brand-navy tracking-tight mb-4">
              מתי כדאי לבדוק מחזור?
            </h2>
            <p className="text-base text-gray-500 max-w-md mx-auto leading-relaxed">
              אם אחד מהמצבים הבאים מוכר לך — הגיע הזמן לבדוק
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 max-w-4xl mx-auto">
            {SCENARIOS.map((scenario) => (
              <div
                key={scenario.title}
                className="bg-white rounded-2xl p-6 shadow-[0_1px_3px_0_rgb(0_0_0/0.04),0_6px_16px_-2px_rgb(0_0_0/0.05)] hover:shadow-[0_2px_8px_0_rgb(0_0_0/0.06),0_12px_32px_-4px_rgb(0_0_0/0.08)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                    <scenario.icon className="h-5 w-5 text-brand-turquoise" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-brand-navy mb-2">{scenario.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{scenario.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Required Docs ────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-3">
                הכנה מראש
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-brand-navy tracking-tight mb-4">
                מסמכים נדרשים
              </h2>
              <p className="text-base text-gray-500 leading-relaxed">
                אסוף מסמכים אלה מראש כדי לזרז את בדיקת המחזור
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-[0_1px_3px_0_rgb(0_0_0/0.04),0_6px_16px_-2px_rgb(0_0_0/0.05)]">
              <ul className="space-y-3">
                {REQUIRED_DOCS.map((doc) => (
                  <li key={doc} className="flex items-center gap-3 py-1">
                    <div className="w-6 h-6 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand-green" strokeWidth={2.5} />
                    </div>
                    <span className="text-sm font-medium text-brand-navy">{doc}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-gray-100 flex items-start gap-3">
                <BadgeCheck className="h-5 w-5 text-brand-turquoise flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-xs text-gray-500 leading-relaxed">
                  המסמך החשוב ביותר הוא דו"ח יתרת משכנתא עדכני — ניתן לבקש מהבנק שלך. שאר המסמכים אפשר להשלים בהמשך.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_120%,#38B00015,transparent)]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight mb-4">
              כמה תוכל לחסוך?
            </h2>
            <p className="text-base text-white/50 mb-8 leading-relaxed">
              בדיקה חינם ללא התחייבות — גלה תוך דקות אם המחזור שווה לך
            </p>
            <Button
              render={<Link href="/questionnaire?product=refinance" />}
              className="h-12 bg-brand-turquoise hover:bg-[#2f9d97] text-white font-semibold text-base px-8 rounded-xl shadow-[0_1px_2px_0_rgb(0_0_0/0.05),0_4px_12px_-2px_rgb(58_175_169/0.3)] hover:shadow-[0_2px_4px_0_rgb(0_0_0/0.08),0_8px_20px_-4px_rgb(58_175_169/0.4)] transition-all duration-200 active:scale-[0.98] flex items-center gap-2 w-full sm:w-auto justify-center mx-auto"
            >
              בדוק מחזור
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            </Button>
            <p className="text-xs text-white/30 mt-4">
              חינם · ללא התחייבות · תשלום רק על הצלחה
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
