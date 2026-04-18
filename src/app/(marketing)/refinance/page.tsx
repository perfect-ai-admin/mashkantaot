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

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-36 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-brand-green/15 border border-brand-green/25 text-brand-green text-xs font-semibold px-3 py-1.5 rounded-full mb-8 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
              מחזור משכנתא
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight mb-6">
              בדוק אם אפשר{" "}
              <span className="text-brand-turquoise">לחסוך במשכנתא הקיימת</span>
            </h1>

            <p className="text-lg md:text-xl text-white/65 mb-10 leading-relaxed">
              ייתכן שהריבית או ההחזר שלך ניתנים לשיפור — בדיקה חינם תוך דקות
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                render={<Link href="/questionnaire?product=refinance" />}
                className="bg-brand-turquoise hover:bg-[#2f9d97] text-white font-semibold text-base px-7 h-12 rounded-xl shadow-[0_4px_14px_0_rgb(58_175_169/0.4)] hover:shadow-[0_6px_20px_0_rgb(58_175_169/0.5)] transition-all duration-200 active:scale-[0.98] w-full sm:w-auto"
              >
                בדוק מחזור
              </Button>
              <Button
                render={<Link href="/calculator" />}
                className="border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-base px-7 h-12 rounded-xl transition-all duration-200 w-full sm:w-auto"
              >
                מחשבון מחזור
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Savings Highlight ────────────────────────────────── */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-brand-green/8 via-brand-green/5 to-transparent border border-brand-green/15 rounded-2xl p-8 text-center shadow-[0_1px_3px_0_rgb(0_0_0/0.04),0_4px_12px_0_rgb(0_0_0/0.06)]">
            <div className="w-12 h-12 rounded-2xl bg-brand-green/10 flex items-center justify-center mx-auto mb-4">
              <PiggyBank className="h-6 w-6 text-brand-green" strokeWidth={1.75} />
            </div>
            <h2 className="text-lg font-semibold text-brand-navy mb-2">
              לקוחות שלנו חוסכים בממוצע
            </h2>
            <p className="text-5xl font-display font-black text-brand-green tracking-tight tabular-nums mb-2">
              ₪500–₪1,200
            </p>
            <p className="text-sm text-muted-foreground">לחודש — לאורך כל חיי המשכנתא</p>
          </div>
        </div>
      </section>

      {/* ── Scenarios ────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-turquoise mb-3">
              מתי לבדוק
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy tracking-tight mb-4">
              מתי כדאי לבדוק מחזור?
            </h2>
            <p className="text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
              אם אחד מהמצבים הבאים מוכר לך — הגיע הזמן לבדוק
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {SCENARIOS.map((scenario) => (
              <div
                key={scenario.title}
                className="bg-white rounded-2xl p-6 shadow-[0_1px_3px_0_rgb(0_0_0/0.05),0_4px_12px_0_rgb(0_0_0/0.06)] hover:shadow-[0_8px_24px_-4px_rgb(0_0_0/0.1),0_4px_10px_-2px_rgb(0_0_0/0.05)] transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-turquoise/10 flex items-center justify-center flex-shrink-0">
                    <scenario.icon className="h-5 w-5 text-brand-turquoise" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-brand-navy mb-2">{scenario.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{scenario.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Required Docs ────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-turquoise mb-3">
                הכנה מראש
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy tracking-tight mb-4">
                מסמכים נדרשים
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                אסוף מסמכים אלה מראש כדי לזרז את בדיקת המחזור
              </p>
            </div>

            <div className="bg-brand-cream rounded-2xl p-6 md:p-8 border border-brand-cream">
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

              <div className="mt-6 pt-6 border-t border-brand-cream/80 flex items-start gap-3">
                <BadgeCheck className="h-5 w-5 text-brand-turquoise flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  המסמך החשוב ביותר הוא דו"ח יתרת משכנתא עדכני — ניתן לבקש מהבנק שלך. שאר המסמכים אפשר להשלים בהמשך.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_120%,#38B00020,transparent)]" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center relative z-10">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">
              כמה תוכל לחסוך?
            </h2>
            <p className="text-base text-white/60 mb-8 leading-relaxed">
              בדיקה חינם ללא התחייבות — גלה תוך דקות אם המחזור שווה לך
            </p>
            <Button
              render={<Link href="/questionnaire?product=refinance" />}
              className="bg-brand-turquoise hover:bg-[#2f9d97] text-white font-semibold text-base px-8 h-12 rounded-xl shadow-[0_4px_14px_0_rgb(58_175_169/0.4)] hover:shadow-[0_6px_20px_0_rgb(58_175_169/0.5)] transition-all duration-200 active:scale-[0.98] flex items-center gap-2 w-full sm:w-auto justify-center mx-auto"
            >
              בדוק מחזור
              <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            </Button>
            <p className="text-xs text-white/35 mt-4">
              חינם · ללא התחייבות · תשלום רק על הצלחה
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
