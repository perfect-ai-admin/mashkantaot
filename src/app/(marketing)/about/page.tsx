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
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-28 lg:py-36 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] text-brand-turquoise text-xs font-medium px-3 py-1.5 rounded-full mb-8 tracking-wide backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise animate-pulse" />
              אודות משכנתא חכמה
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-display font-bold leading-[1.1] tracking-tight mb-6">
              המערכת הדיגיטלית{" "}
              <span className="text-brand-turquoise">המתקדמת בישראל</span>
            </h1>
            <p className="text-base sm:text-lg text-white/55 leading-relaxed">
              לניהול משכנתאות ואיחוד הלוואות
            </p>
          </div>
        </div>
      </section>

      {/* ── Story ────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-3 text-center">
              הסיפור שלנו
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-brand-navy tracking-tight mb-8 text-center">
              נולדנו מתוך תסכול
            </h2>
            <div className="space-y-5 text-base text-gray-500 leading-relaxed">
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
      <section className="bg-white border-y border-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-x-reverse lg:divide-gray-100">
            {NUMBERS.map((stat, index) => (
              <div key={index} className="flex flex-col items-center gap-2 text-center lg:px-8">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mb-1">
                  <stat.icon className="w-5 h-5 text-brand-turquoise" strokeWidth={1.5} />
                </div>
                <span className="text-3xl font-black text-brand-navy tracking-tight tabular-nums leading-none">
                  {stat.value}
                </span>
                <span className="text-sm text-gray-400 font-medium leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-gray-50/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 lg:mb-16">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-3">
              הערכים שלנו
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-brand-navy tracking-tight">
              מה מנחה אותנו
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 max-w-4xl mx-auto">
            {VALUES.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 lg:p-8 shadow-[0_1px_3px_0_rgb(0_0_0/0.04),0_6px_16px_-2px_rgb(0_0_0/0.05)] hover:shadow-[0_2px_8px_0_rgb(0_0_0/0.06),0_12px_32px_-4px_rgb(0_0_0/0.08)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center mb-5">
                  <value.icon className="h-5 w-5 text-brand-turquoise" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-bold text-brand-navy mb-2 leading-tight">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 lg:mb-16">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-3">
              הצוות
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-brand-navy tracking-tight">
              האנשים מאחורי הפלטפורמה
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6 max-w-3xl mx-auto">
            {TEAM.map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center bg-white rounded-2xl p-6 shadow-[0_1px_3px_0_rgb(0_0_0/0.04),0_6px_16px_-2px_rgb(0_0_0/0.05)]"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-turquoise/80 to-brand-navy/80 flex items-center justify-center mb-4 shadow-[0_2px_8px_0_rgb(58_175_169/0.2)]">
                  <span className="text-white font-bold text-sm leading-none">
                    {member.initials}
                  </span>
                </div>
                <p className="font-bold text-sm text-brand-navy leading-tight">
                  {member.name}
                </p>
                <p className="text-xs text-gray-500 mt-1 leading-tight">
                  {member.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_120%,#3AAFA915,transparent)]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-brand-turquoise/10 border border-brand-turquoise/15 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-6 w-6 text-brand-turquoise" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight mb-4">
              מוכנים להתחיל?
            </h2>
            <p className="text-base text-white/50 mb-8 leading-relaxed">
              בדיקת זכאות חינם תוך 2 דקות. ללא התחייבות.
            </p>
            <Button
              render={<Link href="/questionnaire" />}
              className="h-12 bg-brand-turquoise hover:bg-[#2f9d97] text-white font-semibold text-base px-8 rounded-xl shadow-[0_1px_2px_0_rgb(0_0_0/0.05),0_4px_12px_-2px_rgb(58_175_169/0.3)] hover:shadow-[0_2px_4px_0_rgb(0_0_0/0.08),0_8px_20px_-4px_rgb(58_175_169/0.4)] transition-all duration-200 active:scale-[0.98] w-full sm:w-auto"
            >
              בדוק זכאות עכשיו
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
