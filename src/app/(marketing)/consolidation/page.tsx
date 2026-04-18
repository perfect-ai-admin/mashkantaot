import Link from "next/link"
import {
  CreditCard,
  TrendingDown,
  LayoutList,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const WHO_ITS_FOR = [
  {
    icon: CreditCard,
    title: "בעלי כמה הלוואות",
    description: "הלוואות רכב, אשראי, אישיות — כאשר יש הרבה התחייבויות, קשה לעקוב ולנהל",
  },
  {
    icon: TrendingDown,
    title: "החזר חודשי גבוה מדי",
    description: "אם ההחזרים השוטפים מכבידים על התזרים החודשי — איחוד יכול להוריד משמעותית את הנטל",
  },
  {
    icon: LayoutList,
    title: "רוצים סדר פיננסי",
    description: "תשלום אחד, ריבית אחת, תאריך פירעון אחד — פשוט, ברור, ניתן לניהול",
  },
]

const REQUIRED_DOCS = [
  "תעודת זהות",
  "פירוט ויתרות לכל ההלוואות הקיימות",
  "3 תלושי שכר אחרונים",
  "דפי עו\"ש 3 חודשים אחרונים",
  "חוזי הלוואה קיימים (אם ישנם)",
]

const BEFORE_LOANS = [
  { label: "הלוואת רכב", amount: "₪1,400" },
  { label: "אשראי A", amount: "₪800" },
  { label: "הלוואה אישית", amount: "₪1,600" },
  { label: "הלוואת בנק", amount: "₪1,400" },
]

export default function ConsolidationPage() {
  return (
    <div className="flex flex-col" dir="rtl">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_65%_-5%,#2D4A7A55,transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-bl from-brand-orange/15 via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-28 lg:py-36 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/15 text-brand-orange text-xs font-medium px-3 py-1.5 rounded-full mb-8 tracking-wide backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              איחוד הלוואות
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-display font-bold leading-[1.1] tracking-tight mb-6">
              איחוד הלוואות שיכול{" "}
              <span className="text-brand-turquoise">להקל על ההחזר שלך</span>
            </h1>

            <p className="text-base sm:text-lg text-white/55 mb-10 leading-relaxed max-w-xl">
              רכז את ההתחייבויות למסלול אחד — פשוט יותר, זול יותר, ניהול נוח יותר
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                render={<Link href="/questionnaire?product=consolidation" />}
                className="h-12 bg-brand-turquoise hover:bg-[#2f9d97] text-white font-semibold text-base px-7 rounded-xl shadow-[0_1px_2px_0_rgb(0_0_0/0.05),0_4px_12px_-2px_rgb(58_175_169/0.3)] hover:shadow-[0_2px_4px_0_rgb(0_0_0/0.08),0_8px_20px_-4px_rgb(58_175_169/0.4)] transition-all duration-200 active:scale-[0.98] w-full sm:w-auto"
              >
                בדוק התאמה
              </Button>
              <Button
                render={<Link href="/calculator" />}
                className="h-12 border border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold text-base px-7 rounded-xl transition-all duration-200 w-full sm:w-auto"
              >
                מחשבון איחוד
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Before / After ───────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-3">
                דוגמה מהשטח
              </p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-navy tracking-tight">
                הדוגמה שמסבירה הכל
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
              {/* Before */}
              <div className="bg-red-50/60 border border-red-100/60 rounded-2xl p-6 text-center">
                <p className="text-xs font-medium uppercase tracking-widest text-brand-red mb-4">לפני האיחוד</p>
                <p className="text-4xl font-black text-brand-red tracking-tight tabular-nums mb-5">
                  ₪5,200<span className="text-lg font-semibold">/חודש</span>
                </p>
                <ul className="space-y-2 text-start">
                  {BEFORE_LOANS.map((loan) => (
                    <li key={loan.label} className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">{loan.label}</span>
                      <span className="font-semibold text-brand-navy tabular-nums">{loan.amount}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500 mt-4 pt-4 border-t border-red-100/40">
                  4 הלוואות, 4 מועדי פירעון
                </p>
              </div>

              {/* Arrow */}
              <div className="flex flex-row md:flex-col items-center justify-center gap-2 py-4 md:py-0 md:px-2">
                <ArrowLeft className="h-7 w-7 text-brand-turquoise hidden md:block" strokeWidth={1.5} />
                <ArrowRight className="h-7 w-7 text-brand-turquoise md:hidden" strokeWidth={1.5} />
                <span className="text-xs font-semibold text-brand-turquoise whitespace-nowrap">איחוד</span>
              </div>

              {/* After */}
              <div className="bg-emerald-50/60 border border-emerald-100/60 rounded-2xl p-6 text-center">
                <p className="text-xs font-medium uppercase tracking-widest text-brand-green mb-4">אחרי האיחוד</p>
                <p className="text-4xl font-black text-brand-green tracking-tight tabular-nums mb-5">
                  ₪3,800<span className="text-lg font-semibold">/חודש</span>
                </p>
                <ul className="space-y-2 text-start">
                  {["הלוואה אחת מאוחדת", "ריבית אחת", "תאריך פירעון אחד"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-500">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand-green flex-shrink-0" strokeWidth={2.5} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-emerald-100/40">
                  <p className="text-sm font-bold text-brand-green tabular-nums">
                    חיסכון: ₪1,400/חודש
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who It's For ─────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-gray-50/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 lg:mb-16">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-3">
              קהל היעד
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-brand-navy tracking-tight">
              למי מתאים איחוד הלוואות?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 max-w-4xl mx-auto">
            {WHO_ITS_FOR.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 shadow-[0_1px_3px_0_rgb(0_0_0/0.04),0_6px_16px_-2px_rgb(0_0_0/0.05)] hover:shadow-[0_2px_8px_0_rgb(0_0_0/0.06),0_12px_32px_-4px_rgb(0_0_0/0.08)] transition-all duration-300 hover:-translate-y-0.5 text-center"
              >
                <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-5 w-5 text-brand-turquoise" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-bold text-brand-navy mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
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
                  המסמך הכי חשוב הוא פירוט יתרות ההלוואות. ניתן לבקש מכל מלווה בנפרד — אנחנו נסייע לאסוף הכל.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_120%,#FF8C4215,transparent)]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight mb-4">
              מוכן לסדר את הכספים שלך?
            </h2>
            <p className="text-base text-white/50 mb-8 leading-relaxed">
              בדיקה חינם, ללא התחייבות. נבדוק עבורך אם איחוד כדאי — ובכמה תחסוך
            </p>
            <Button
              render={<Link href="/questionnaire?product=consolidation" />}
              className="h-12 bg-brand-turquoise hover:bg-[#2f9d97] text-white font-semibold text-base px-8 rounded-xl shadow-[0_1px_2px_0_rgb(0_0_0/0.05),0_4px_12px_-2px_rgb(58_175_169/0.3)] hover:shadow-[0_2px_4px_0_rgb(0_0_0/0.08),0_8px_20px_-4px_rgb(58_175_169/0.4)] transition-all duration-200 active:scale-[0.98] flex items-center gap-2 w-full sm:w-auto justify-center mx-auto"
            >
              בדוק התאמה
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
