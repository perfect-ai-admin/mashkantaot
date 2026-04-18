import Link from "next/link"
import {
  Eye,
  Cpu,
  UserCheck,
  Users,
  Building2,
  ThumbsUp,
  Banknote,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const NUMBERS = [
  { value: "2,400+", label: "לקוחות", icon: Users },
  { value: "₪2.1B", label: "מימון שגויס", icon: Banknote },
  { value: "98%", label: "שביעות רצון", icon: ThumbsUp },
  { value: "50+", label: "גופי מימון", icon: Building2 },
]

const VALUES = [
  {
    icon: Eye,
    title: "שקיפות מלאה",
    description: "אתה יודע בכל רגע מה קורה בתיק שלך",
  },
  {
    icon: Cpu,
    title: "טכנולוגיה מתקדמת",
    description: "מערכת חכמה שבודקת מאות מסלולי מימון ברגע",
  },
  {
    icon: UserCheck,
    title: "ליווי אישי",
    description: "יועץ מקצועי צמוד לכל אורך הדרך",
  },
]

const TEAM = [
  { name: "יוסי כהן", title: "מנכ״ל", initials: "יכ" },
  { name: "שרה לוי", title: "סמנכ״לית טכנולוגיה", initials: "של" },
  { name: "דוד ישראלי", title: "ראש אגף משכנתאות", initials: "די" },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col" dir="rtl">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_-10%,#2D4A7A55,transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-bl from-brand-blue/30 via-transparent to-brand-turquoise/10" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-36 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-brand-turquoise/15 border border-brand-turquoise/25 text-brand-turquoise text-xs font-semibold px-3 py-1.5 rounded-full mb-8 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise animate-pulse" />
              אודות משכנתא חכמה
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight mb-6">
              המערכת הדיגיטלית{" "}
              <span className="text-brand-turquoise">המתקדמת בישראל</span>
            </h1>
            <p className="text-lg md:text-xl text-white/65 leading-relaxed">
              לניהול משכנתאות ואיחוד הלוואות
            </p>
          </div>
        </div>
      </section>

      {/* ── Story ────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-turquoise mb-3 text-center">
              הסיפור שלנו
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy tracking-tight mb-8 text-center">
              נולדנו מתוך תסכול
            </h2>
            <div className="space-y-5 text-base text-muted-foreground leading-relaxed">
              <p>
                תהליך המשכנתא בישראל מסורבל, אטי ולא שקוף. רצינו לשנות את זה.
              </p>
              <p>
                משכנתא חכמה היא פלטפורמה דיגיטלית שמחברת בין לקוחות לבין עשרות גופי
                מימון — ומנהלת את כל התהליך מקצה לקצה. בדיקת זכאות, השוואת מסלולים,
                העלאת מסמכים ומעקב שוטף — הכל בממשק אחד, בשקיפות מלאה.
              </p>
              <p>
                אנחנו מאמינים שכל אחד מגיע לתנאים הטובים ביותר שמגיעים לו, ולא
                למה שהבנק מציע לו ראשון.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Numbers Strip ─────────────────────────────────────── */}
      <section className="bg-white border-y border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-x-reverse lg:divide-gray-100">
            {NUMBERS.map((stat, index) => (
              <div key={index} className="flex flex-col items-center gap-2 text-center lg:px-8">
                <div className="w-10 h-10 rounded-xl bg-brand-turquoise/8 flex items-center justify-center mb-1">
                  <stat.icon className="w-5 h-5 text-brand-turquoise" strokeWidth={1.75} />
                </div>
                <span className="text-3xl font-black text-brand-turquoise tracking-tight tabular-nums leading-none">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground font-medium leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-turquoise mb-3">
              הערכים שלנו
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy tracking-tight">
              מה מנחה אותנו
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {VALUES.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_2px_8px_0_rgb(0_0_0/0.06)] hover:shadow-[0_8px_24px_-4px_rgb(0_0_0/0.1),0_4px_10px_-2px_rgb(0_0_0/0.05)] transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-turquoise/10 flex items-center justify-center mb-5">
                  <value.icon className="h-5 w-5 text-brand-turquoise" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-bold text-brand-navy mb-2 leading-tight">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-turquoise mb-3">
              הצוות
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy tracking-tight">
              האנשים מאחורי הפלטפורמה
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {TEAM.map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center bg-[#FAFAFA] rounded-2xl p-6 border border-gray-100"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-turquoise/80 to-brand-navy/80 flex items-center justify-center mb-4 shadow-[0_2px_8px_0_rgb(58_175_169/0.25)]">
                  <span className="text-white font-bold text-sm leading-none">
                    {member.initials}
                  </span>
                </div>
                <p className="font-bold text-sm text-brand-navy leading-tight">
                  {member.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1 leading-tight">
                  {member.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_120%,#3AAFA920,transparent)]" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center relative z-10">
          <div className="max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-brand-turquoise/15 border border-brand-turquoise/25 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-6 w-6 text-brand-turquoise" strokeWidth={1.75} />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">
              מוכנים להתחיל?
            </h2>
            <p className="text-base text-white/60 mb-8 leading-relaxed">
              בדיקת זכאות חינם תוך 2 דקות. ללא התחייבות.
            </p>
            <Button
              render={<Link href="/questionnaire" />}
              className="bg-brand-turquoise hover:bg-[#2f9d97] text-white font-semibold text-base px-8 h-12 rounded-xl shadow-[0_4px_14px_0_rgb(58_175_169/0.4)] hover:shadow-[0_6px_20px_0_rgb(58_175_169/0.5)] transition-all duration-200 active:scale-[0.98] w-full sm:w-auto"
            >
              בדוק זכאות עכשיו
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
