import Link from "next/link"
import {
  ClipboardCheck,
  FileSearch,
  Upload,
  Banknote,
  TrendingDown,
  Layers,
  Star,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const PROCESS_STEPS = [
  {
    title: "שאלון קצר",
    description: "ענה על מספר שאלות פשוטות ונבדוק את ההתאמה שלך",
  },
  {
    title: "בחירת מסלול",
    description: "נמצא עבורך את המסלול המשתלם ביותר מתוך עשרות אפשרויות",
  },
  {
    title: "העלאת מסמכים",
    description: "העלה מסמכים בקלות דרך המערכת — בלי ניירת",
  },
  {
    title: "אישור וסגירה",
    description: "אנחנו מנהלים את התהליך מולך עד לסגירה מוצלחת",
  },
]

const PRODUCTS = [
  {
    title: "משכנתא חדשה",
    description: "בדוק כמה תוכל לקבל ומה ההחזר החודשי המתאים לך — חינם ותוך דקות",
    href: "/questionnaire?product=new_mortgage",
    icon: Banknote,
    popular: true,
  },
  {
    title: "מחזור משכנתא",
    description: "בדוק אם אפשר לחסוך בהחזר החודשי של המשכנתא הקיימת שלך",
    href: "/questionnaire?product=refinance",
    icon: TrendingDown,
    popular: false,
  },
  {
    title: "איחוד הלוואות",
    description: "רכז את כל ההתחייבויות למסלול אחד וחסוך בהחזר החודשי",
    href: "/questionnaire?product=consolidation",
    icon: Layers,
    popular: false,
  },
]

const TESTIMONIALS = [
  {
    name: "דוד ומיכל כ.",
    text: "התהליך היה פשוט ומהיר. תוך שבועיים קיבלנו אישור למשכנתא בתנאים מצוינים.",
    amount: "1,800,000",
    product: "משכנתא חדשה",
  },
  {
    name: "אורן ש.",
    text: "חסכנו כמעט 800 ש״ח בחודש במחזור המשכנתא. ממליץ בחום!",
    amount: "950,000",
    product: "מחזור משכנתא",
  },
  {
    name: "ענת ב.",
    text: "איחדנו 4 הלוואות להחזר אחד נוח. סוף סוף סדר בכסף.",
    amount: "420,000",
    product: "איחוד הלוואות",
  },
]

const FAQS = [
  {
    q: "כמה עולה השירות?",
    a: "הבדיקה הראשונית חינם לחלוטין וללא התחייבות. עמלה נגבית רק במקרה של הצלחה ואישור מימון.",
  },
  {
    q: "כמה זמן לוקח התהליך?",
    a: "תהליך טיפוסי אורך בין 2 ל-4 שבועות, תלוי בסוג המוצר ובמהירות העלאת המסמכים.",
  },
  {
    q: "מה אם נדחיתי בבנק?",
    a: "אנחנו עובדים מול עשרות גופי מימון. גם אם נדחית בבנק אחד, יש לנו אפשרויות נוספות.",
  },
  {
    q: "האם המידע שלי מאובטח?",
    a: "המערכת שלנו מאובטחת בתקן הגבוה ביותר. המידע שלך מוגן ולא מועבר לצדדים שלישיים ללא הסכמתך.",
  },
  {
    q: "האם אפשר לעקוב אחרי התהליך?",
    a: "בוודאי! באזור האישי תוכל לראות בכל רגע מה סטטוס התיק שלך, מה חסר ומה השלב הבא.",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col" dir="rtl">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0c1929] via-[#0f2035] to-[#0c1929] -mt-[72px] pt-[72px]">
        {/* Radial glow at top center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-5%,rgba(58,175,169,0.12),transparent)]" />
        {/* Secondary warm glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_70%_60%,rgba(45,74,122,0.15),transparent)]" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-28 lg:py-36 relative z-10">
          <div className="max-w-2xl">
            {/* Eyebrow pill */}
            <div className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/[0.07] text-brand-turquoise text-xs font-medium px-3 py-1.5 rounded-full mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise animate-pulse" />
              מופעל בטכנולוגיית AI
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
              המשכנתא שלך.
              <br />
              <span className="bg-gradient-to-l from-cyan-400 via-brand-turquoise to-brand-turquoise text-transparent bg-clip-text">
                פשוט חכם.
              </span>
            </h1>

            <p className="text-lg text-white/50 max-w-lg leading-relaxed mb-10">
              בדיקת זכאות, השוואת מסלולים ואיסוף מסמכים — הכל באוטומציה מלאה. בדיקה חינם.
            </p>

            <Button
              render={<Link href="/questionnaire" />}
              className="h-13 bg-brand-turquoise hover:bg-[#2f9d97] text-white font-semibold text-base px-8 rounded-xl shadow-[0_2px_4px_0_rgb(0_0_0/0.1),0_8px_24px_-4px_rgb(58_175_169/0.4)] hover:shadow-[0_4px_8px_0_rgb(0_0_0/0.12),0_12px_32px_-4px_rgb(58_175_169/0.5)] transition-all duration-200 active:scale-[0.98]"
            >
              בדוק זכאות — חינם
            </Button>

            <p className="text-xs text-white/30 mt-4">
              ללא התחייבות &middot; 2 דקות &middot; 100% דיגיטלי
            </p>

            {/* Social proof */}
            <div className="flex flex-wrap items-center gap-6 mt-12 pt-10 border-t border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2 space-x-reverse">
                  {["ד", "מ", "א", "ר"].map((l, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-turquoise/80 to-brand-blue/80 border-2 border-[#0c1929] flex items-center justify-center text-[10px] font-bold text-white"
                    >
                      {l}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-white/40 font-medium">2,400+ לקוחות כבר בדקו</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" strokeWidth={0} />
                ))}
                <span className="text-xs text-white/40 font-medium ms-1.5 tabular-nums">4.9</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Numbers ────────────────────────────────────── */}
      <section className="bg-white border-y border-gray-100 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-x-reverse lg:divide-gray-100">
            {[
              { value: "2 דקות", label: "לאישור עקרוני" },
              { value: "50+", label: "גופי מימון" },
              { value: "100%", label: "דיגיטלי" },
              { value: "₪0", label: "עד לאישור" },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center gap-1.5 text-center lg:px-8">
                <span className="text-2xl font-bold text-gray-900 tabular-nums tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs text-gray-400">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 text-center mb-4">
            איך זה עובד
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] tracking-tight text-center mb-16">
            תהליך פשוט ב-4 שלבים
          </h2>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Dashed connector line — desktop only */}
            <div className="hidden lg:block absolute top-4 start-[calc(12.5%+16px)] end-[calc(12.5%+16px)] border-t border-dashed border-gray-200" />

            {PROCESS_STEPS.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center relative z-10 mb-5 tabular-nums">
                  {index + 1}
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products ─────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-[#FAFBFC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 text-center mb-4">
            המוצרים שלנו
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] tracking-tight text-center mb-16">
            בחר את המסלול המתאים לך
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {PRODUCTS.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                className={`group relative bg-white rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_1px_3px_0_rgb(0_0_0/0.08)] hover:shadow-[0_8px_16px_-4px_rgb(0_0_0/0.08),0_4px_8px_-2px_rgb(0_0_0/0.04)] ${
                  product.popular
                    ? "ring-1 ring-brand-turquoise/20"
                    : ""
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mb-4">
                  <product.icon className="h-5 w-5 text-gray-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1.5">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">
                  {product.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-turquoise group-hover:gap-2 transition-all duration-200">
                  התחל בדיקה
                  <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
                </span>
                {product.popular && (
                  <span className="absolute top-4 start-4 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-turquoise/10 text-brand-turquoise">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise" />
                    הכי פופולרי
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 text-center mb-4">
            ביקורות
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] tracking-tight text-center mb-16">
            לקוחות מספרים
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {TESTIMONIALS.map((t, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_1px_3px_0_rgb(0_0_0/0.08)] flex flex-col"
              >
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 italic leading-relaxed mb-5 flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {t.product}
                    <span className="mx-1.5 text-gray-200">&middot;</span>
                    <span className="tabular-nums">{t.amount} &#8362;</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partners ─────────────────────────────────────────── */}
      <section className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-center text-sm text-gray-300 font-medium">
            בנק הפועלים &middot; בנק לאומי &middot; מזרחי טפחות &middot; בנק דיסקונט &middot; כלל &middot; הראל &middot; מגדל
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-[#FAFBFC]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 text-center mb-4">
            שאלות ותשובות
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] tracking-tight text-center mb-16">
            שאלות נפוצות
          </h2>

          <Accordion className="space-y-0">
            {FAQS.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border-0 border-b border-gray-100 last:border-0"
              >
                <AccordionTrigger className="text-sm font-medium text-gray-900 text-start hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-500 leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0c1929] via-[#0f2035] to-[#0c1929] py-24 lg:py-32">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_100%,rgba(58,175,169,0.08),transparent)]" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
            מוכן להתחיל?
          </h2>
          <p className="text-base text-white/40 mb-8">
            בדיקת זכאות חינם — תוך 2 דקות
          </p>
          <Button
            render={<Link href="/questionnaire" />}
            className="h-13 bg-brand-turquoise hover:bg-[#2f9d97] text-white font-semibold text-base px-8 rounded-xl shadow-[0_2px_4px_0_rgb(0_0_0/0.1),0_8px_24px_-4px_rgb(58_175_169/0.4)] hover:shadow-[0_4px_8px_0_rgb(0_0_0/0.12),0_12px_32px_-4px_rgb(58_175_169/0.5)] transition-all duration-200 active:scale-[0.98]"
          >
            בדוק זכאות — חינם
          </Button>
          <p className="text-xs text-white/25 mt-4">
            ללא התחייבות &middot; תשלום רק על הצלחה
          </p>
        </div>
      </section>
    </div>
  )
}
