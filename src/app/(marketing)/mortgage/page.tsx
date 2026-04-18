import Link from "next/link"
import {
  Banknote,
  Users,
  TrendingUp,
  Briefcase,
  ClipboardCheck,
  FileSearch,
  Upload,
  CheckCircle2,
  ArrowLeft,
  BadgeCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const AUDIENCE_CARDS = [
  {
    icon: Users,
    title: "זוגות צעירים",
    description: "רוכשים דירה ראשונה ומחפשים את המסלול המשתלם ביותר לפתיחת חיים משותפים",
  },
  {
    icon: TrendingUp,
    title: "משפרי דיור",
    description: "עוברים לדירה גדולה יותר ורוצים למנף את ההון העצמי שצברו",
  },
  {
    icon: Banknote,
    title: "משקיעים",
    description: "רוכשים נכס להשקעה ומחפשים מינוף אופטימלי עם תנאי ריבית טובים",
  },
  {
    icon: Briefcase,
    title: "עצמאים",
    description: "גם עם הכנסה לא שכירה — נמצא עבורכם את הפתרון המתאים",
  },
]

const PROCESS_STEPS = [
  {
    icon: ClipboardCheck,
    title: "שאלון קצר",
    description: "ענה על מספר שאלות בסיסיות על הכנסותיך, ההון העצמי וסוג הנכס",
  },
  {
    icon: FileSearch,
    title: "בדיקת זכאות",
    description: "המערכת בודקת מיידית את ההתאמה שלך ומחזירה אינדיקציה ראשונית",
  },
  {
    icon: Upload,
    title: "העלאת מסמכים",
    description: "העלה את המסמכים הנדרשים ישירות דרך המערכת — ללא ניירת",
  },
  {
    icon: CheckCircle2,
    title: "אישור ומימון",
    description: "היועץ שלנו מנהל את המו\"מ מול הבנקים ומשיג עבורך את התנאים הטובים ביותר",
  },
]

const REQUIRED_DOCS = [
  "תעודת זהות",
  "3 תלושי שכר אחרונים",
  "דפי עו\"ש 3 חודשים אחרונים",
  "אישור הון עצמי (חיסכון, מתנה, קרן פנסיה)",
  "מסמכי הנכס (חוזה / נסח טאבו)",
  "אישור מס הכנסה / שומה (לעצמאים)",
]

export default function MortgagePage() {
  return (
    <div className="flex flex-col" dir="rtl">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_65%_-5%,#2D4A7A55,transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-bl from-brand-turquoise/15 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-36 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-brand-turquoise/15 border border-brand-turquoise/25 text-brand-turquoise text-xs font-semibold px-3 py-1.5 rounded-full mb-8 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise" />
              משכנתא חדשה
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight mb-6">
              בדיקת זכאות והערכת{" "}
              <span className="text-brand-turquoise">יכולת החזר</span>
            </h1>

            <p className="text-lg md:text-xl text-white/65 mb-10 leading-relaxed">
              בדוק כמה תוכל לקבל ומה החזר חודשי מתאים לך — חינם, תוך דקות, ללא התחייבות
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                render={<Link href="/questionnaire?product=new_mortgage" />}
                className="bg-brand-turquoise hover:bg-[#2f9d97] text-white font-semibold text-base px-7 h-12 rounded-xl shadow-[0_4px_14px_0_rgb(58_175_169/0.4)] hover:shadow-[0_6px_20px_0_rgb(58_175_169/0.5)] transition-all duration-200 active:scale-[0.98] w-full sm:w-auto"
              >
                התחל בדיקה
              </Button>
              <Button
                render={<Link href="/calculator" />}
                className="border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-base px-7 h-12 rounded-xl transition-all duration-200 w-full sm:w-auto"
              >
                מחשבון משכנתא
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Audience ─────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-turquoise mb-3">
              קהל היעד
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy tracking-tight mb-4">
              למי זה מתאים?
            </h2>
            <p className="text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
              המוצר שלנו מותאם למגוון רחב של לווים
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {AUDIENCE_CARDS.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-6 shadow-[0_1px_3px_0_rgb(0_0_0/0.05),0_4px_12px_0_rgb(0_0_0/0.06)] hover:shadow-[0_8px_24px_-4px_rgb(0_0_0/0.1),0_4px_10px_-2px_rgb(0_0_0/0.05)] transition-all duration-200 hover:-translate-y-0.5 text-center"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-turquoise/10 flex items-center justify-center mx-auto mb-4">
                  <card.icon className="h-5 w-5 text-brand-turquoise" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-bold text-brand-navy mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-turquoise mb-3">
              שלבי התהליך
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy tracking-tight">
              מה כולל התהליך?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-[0_1px_3px_0_rgb(0_0_0/0.05),0_4px_12px_0_rgb(0_0_0/0.06)] hover:shadow-[0_8px_24px_-4px_rgb(0_0_0/0.09)] transition-all duration-200 hover:-translate-y-0.5"
              >
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-brand-navy text-white text-xs font-bold mb-4 tabular-nums">
                  {index + 1}
                </span>
                <div className="w-11 h-11 rounded-xl bg-brand-turquoise/10 flex items-center justify-center mb-4">
                  <step.icon className="h-5 w-5 text-brand-turquoise" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-bold text-brand-navy mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Required Docs ────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-brand-cream">
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
                אסוף את המסמכים הבאים מראש כדי להאיץ את התהליך
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_1px_3px_0_rgb(0_0_0/0.05),0_4px_12px_0_rgb(0_0_0/0.06)]">
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
                <BadgeCheck className="h-5 w-5 text-brand-turquoise flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  לא צריך את הכל מראש — ניתן להתחיל את התהליך גם עם מסמכים חלקיים. יועץ שלנו יסביר בדיוק מה נדרש.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_120%,#3AAFA920,transparent)]" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center relative z-10">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">
              מוכן לבדוק את הזכאות שלך?
            </h2>
            <p className="text-base text-white/60 mb-8 leading-relaxed">
              בדיקה חינם תוך 2 דקות. ללא התחייבות. יועץ יחזור אליך תוך יום עסקים.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                render={<Link href="/questionnaire?product=new_mortgage" />}
                className="bg-brand-turquoise hover:bg-[#2f9d97] text-white font-semibold text-base px-8 h-12 rounded-xl shadow-[0_4px_14px_0_rgb(58_175_169/0.4)] hover:shadow-[0_6px_20px_0_rgb(58_175_169/0.5)] transition-all duration-200 active:scale-[0.98] flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                התחל בדיקה
                <ArrowLeft className="h-4 w-4" strokeWidth={2} />
              </Button>
            </div>
            <p className="text-xs text-white/35 mt-4">
              חינם · ללא התחייבות · תשלום רק על הצלחה
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
