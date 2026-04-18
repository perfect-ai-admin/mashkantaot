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

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-36 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-brand-orange/15 border border-brand-orange/25 text-brand-orange text-xs font-semibold px-3 py-1.5 rounded-full mb-8 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              איחוד הלוואות
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight mb-6">
              איחוד הלוואות שיכול{" "}
              <span className="text-brand-turquoise">להקל על ההחזר שלך</span>
            </h1>

            <p className="text-lg md:text-xl text-white/65 mb-10 leading-relaxed">
              רכז את ההתחייבויות למסלול אחד — פשוט יותר, זול יותר, ניהול נוח יותר
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                render={<Link href="/questionnaire?product=consolidation" />}
                className="bg-brand-turquoise hover:bg-[#2f9d97] text-white font-semibold text-base px-7 h-12 rounded-xl shadow-[0_4px_14px_0_rgb(58_175_169/0.4)] hover:shadow-[0_6px_20px_0_rgb(58_175_169/0.5)] transition-all duration-200 active:scale-[0.98] w-full sm:w-auto"
              >
                בדוק התאמה
              </Button>
              <Button
                render={<Link href="/calculator" />}
                className="border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-base px-7 h-12 rounded-xl transition-all duration-200 w-full sm:w-auto"
              >
                מחשבון איחוד
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Before / After ───────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-turquoise mb-3">
                דוגמה מהשטח
              </p>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy tracking-tight">
                הדוגמה שמסבירה הכל
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
              {/* Before */}
              <div className="bg-brand-red/5 border border-brand-red/15 rounded-2xl p-6 text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-red mb-4">לפני האיחוד</p>
                <p className="text-4xl font-black text-brand-red tracking-tight tabular-nums mb-5">
                  ₪5,200<span className="text-lg font-semibold">/חודש</span>
                </p>
                <ul className="space-y-2 text-start">
                  {BEFORE_LOANS.map((loan) => (
                    <li key={loan.label} className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">{loan.label}</span>
                      <span className="font-semibold text-brand-navy tabular-nums">{loan.amount}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-brand-red/10">
                  4 הלוואות, 4 מועדי פירעון
                </p>
              </div>

              {/* Arrow */}
              <div className="flex flex-row md:flex-col items-center justify-center gap-2 py-4 md:py-0 md:px-2">
                <ArrowLeft className="h-7 w-7 text-brand-turquoise hidden md:block" strokeWidth={1.75} />
                <ArrowRight className="h-7 w-7 text-brand-turquoise md:hidden" strokeWidth={1.75} />
                <span className="text-xs font-semibold text-brand-turquoise whitespace-nowrap">איחוד</span>
              </div>

              {/* After */}
              <div className="bg-brand-green/5 border border-brand-green/15 rounded-2xl p-6 text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-green mb-4">אחרי האיחוד</p>
                <p className="text-4xl font-black text-brand-green tracking-tight tabular-nums mb-5">
                  ₪3,800<span className="text-lg font-semibold">/חודש</span>
                </p>
                <ul className="space-y-2 text-start">
                  {["הלוואה אחת מאוחדת", "ריבית אחת", "תאריך פירעון אחד"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand-green flex-shrink-0" strokeWidth={2.5} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-brand-green/10">
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
      <section className="py-16 md:py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-turquoise mb-3">
              קהל היעד
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy tracking-tight">
              למי מתאים איחוד הלוואות?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {WHO_ITS_FOR.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 shadow-[0_1px_3px_0_rgb(0_0_0/0.05),0_4px_12px_0_rgb(0_0_0/0.06)] hover:shadow-[0_8px_24px_-4px_rgb(0_0_0/0.1),0_4px_10px_-2px_rgb(0_0_0/0.05)] transition-all duration-200 hover:-translate-y-0.5 text-center"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-turquoise/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-5 w-5 text-brand-turquoise" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-bold text-brand-navy mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
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
            </div>

            <div className="bg-brand-cream rounded-2xl p-6 md:p-8">
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

              <div className="mt-6 pt-6 border-t border-white/60 flex items-start gap-3">
                <BadgeCheck className="h-5 w-5 text-brand-turquoise flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  המסמך הכי חשוב הוא פירוט יתרות ההלוואות. ניתן לבקש מכל מלווה בנפרד — אנחנו נסייע לאסוף הכל.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_120%,#FF8C4220,transparent)]" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center relative z-10">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">
              מוכן לסדר את הכספים שלך?
            </h2>
            <p className="text-base text-white/60 mb-8 leading-relaxed">
              בדיקה חינם, ללא התחייבות. נבדוק עבורך אם איחוד כדאי — ובכמה תחסוך
            </p>
            <Button
              render={<Link href="/questionnaire?product=consolidation" />}
              className="bg-brand-turquoise hover:bg-[#2f9d97] text-white font-semibold text-base px-8 h-12 rounded-xl shadow-[0_4px_14px_0_rgb(58_175_169/0.4)] hover:shadow-[0_6px_20px_0_rgb(58_175_169/0.5)] transition-all duration-200 active:scale-[0.98] flex items-center gap-2 w-full sm:w-auto justify-center mx-auto"
            >
              בדוק התאמה
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
