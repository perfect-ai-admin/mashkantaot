import Link from "next/link"
import {
  ClipboardCheck,
  FileSearch,
  Upload,
  Banknote,
  Calculator,
  Shield,
  Clock,
  Users,
  ArrowLeft,
  Star,
  CheckCircle2,
  TrendingDown,
  Building2,
  Smartphone,
  ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const PROCESS_STEPS = [
  {
    icon: ClipboardCheck,
    title: "שאלון קצר",
    description: "ענה על מספר שאלות ונבדוק את ההתאמה שלך",
  },
  {
    icon: FileSearch,
    title: "בחירת מסלול",
    description: "נמצא עבורך את המסלול המשתלם ביותר מתוך עשרות אפשרויות",
  },
  {
    icon: Upload,
    title: "העלאת מסמכים",
    description: "העלה מסמכים בקלות דרך המערכת — בלי ניירת",
  },
  {
    icon: Banknote,
    title: "הכסף בבנק",
    description: "אנחנו מנהלים את התהליך מולך עד לסגירה מוצלחת",
  },
]

const PRODUCTS = [
  {
    title: "משכנתא חדשה",
    description: "בדוק כמה תוכל לקבל ומה ההחזר החודשי המתאים לך — חינם ותוך דקות",
    href: "/mortgage",
    icon: Banknote,
    badge: "הכי פופולרי",
    color: "text-brand-turquoise",
    bg: "bg-brand-turquoise/8",
  },
  {
    title: "מחזור משכנתא",
    description: "בדוק אם אפשר לחסוך בהחזר החודשי של המשכנתא הקיימת שלך",
    href: "/refinance",
    icon: TrendingDown,
    badge: null,
    color: "text-brand-green",
    bg: "bg-brand-green/8",
  },
  {
    title: "איחוד הלוואות",
    description: "רכז את כל ההתחייבויות למסלול אחד וחסוך בהחזר החודשי",
    href: "/consolidation",
    icon: Users,
    badge: null,
    color: "text-brand-orange",
    bg: "bg-brand-orange/8",
  },
]

const FEATURES = [
  {
    icon: Shield,
    title: "בדיקה חינם",
    description: "בדיקת זכאות ראשונית ללא עלות וללא התחייבות",
  },
  {
    icon: Clock,
    title: "תוצאה תוך 2 דקות",
    description: "קבל אינדיקציה ראשונית על ההתאמה שלך במהירות",
  },
  {
    icon: Users,
    title: "ליווי מקצועי",
    description: "יועץ אישי מלווה אותך לאורך כל התהליך",
  },
]

const TRUST_STATS = [
  { value: "2 דקות", label: "לאישור עקרוני", icon: Clock },
  { value: "50+", label: "גופי מימון", icon: Building2 },
  { value: "100%", label: "דיגיטלי", icon: Smartphone },
  { value: "₪0", label: "עד לאישור", icon: ShieldCheck },
]

const TESTIMONIALS = [
  {
    name: "דוד ומיכל כ.",
    text: "התהליך היה פשוט ומהיר. תוך שבועיים קיבלנו אישור למשכנתא בתנאים מצוינים.",
    amount: "1,800,000",
    product: "משכנתא חדשה",
    rating: 5,
  },
  {
    name: "אורן ש.",
    text: "חסכנו כמעט 800 ש״ח בחודש במחזור המשכנתא. ממליץ בחום!",
    amount: "950,000",
    product: "מחזור משכנתא",
    rating: 5,
  },
  {
    name: "ענת ב.",
    text: "איחדנו 4 הלוואות להחזר אחד נוח. סוף סוף סדר בכסף.",
    amount: "420,000",
    product: "איחוד הלוואות",
    rating: 5,
  },
  {
    name: "רועי ונועה א.",
    text: "רכשנו דירה ראשונה בתל אביב — הצוות ליווה אותנו מהרגע הראשון. שקיפות מלאה לאורך כל הדרך.",
    amount: "3,200,000",
    product: "משכנתא חדשה",
    rating: 5,
  },
  {
    name: "יעל ד.",
    text: "המערכת מצאה לנו ריבית נמוכה ב-0.4% מהבנק שלנו. החיסכון לאורך השנים מדהים.",
    amount: "2,100,000",
    product: "מחזור משכנתא",
    rating: 5,
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

const PARTNERS = [
  "בנק הפועלים",
  "בנק לאומי",
  "בנק דיסקונט",
  "מזרחי טפחות",
  "בנק הבינלאומי",
  "כלל ביטוח",
  "הראל",
  "מגדל",
]

export default function HomePage() {
  return (
    <div className="flex flex-col" dir="rtl">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-brand-navy text-white overflow-hidden">
        {/* layered gradient for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_-10%,#2D4A7A55,transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-bl from-brand-blue/30 via-transparent to-brand-turquoise/10" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-36 relative z-10">
          <div className="max-w-2xl">
            {/* eyebrow */}
            <div className="inline-flex items-center gap-2 bg-brand-turquoise/15 border border-brand-turquoise/25 text-brand-turquoise text-xs font-semibold px-3 py-1.5 rounded-full mb-8 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise animate-pulse" />
              פלטפורמת המשכנתאות החכמה
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight mb-6">
              מערכת חכמה למשכנתא,{" "}
              <span className="text-brand-turquoise">מחזור ואיחוד</span>
            </h1>

            <p className="text-lg md:text-xl text-white/65 mb-10 leading-relaxed">
              בדיקה ראשונית, איסוף מסמכים, מעקב תהליך וניהול מלא — הכל במקום
              אחד. בדיקה חינם, תשלום רק על הצלחה.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                render={<Link href="/questionnaire" />}
                className="bg-brand-turquoise hover:bg-[#2f9d97] text-white font-semibold text-base px-7 h-12 rounded-xl shadow-[0_4px_14px_0_rgb(58_175_169/0.4)] hover:shadow-[0_6px_20px_0_rgb(58_175_169/0.5)] transition-all duration-200 active:scale-[0.98] w-full sm:w-auto"
              >
                בדוק זכאות עכשיו
              </Button>
              <Button
                render={<Link href="/calculator" />}
                className="border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-base px-7 h-12 rounded-xl transition-all duration-200 w-full sm:w-auto flex items-center gap-2"
              >
                מחשבון משכנתא
                <Calculator className="h-4 w-4" strokeWidth={1.75} />
              </Button>
            </div>

            {/* social proof strip */}
            <div className="flex flex-wrap items-center gap-6 mt-10 pt-10 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5 space-x-reverse">
                  {["ד", "מ", "א", "ו"].map((l, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-turquoise/80 to-brand-blue/80 border-2 border-brand-navy flex items-center justify-center text-[10px] font-bold text-white"
                    >
                      {l}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-white/50 font-medium">+2,400 לקוחות מרוצים</span>
              </div>
              <div className="flex items-center gap-1.5">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-brand-orange text-brand-orange" strokeWidth={0} />
                ))}
                <span className="text-xs text-white/50 font-medium ms-1">4.9 ממוצע</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Strip ──────────────────────────────────────── */}
      <section className="bg-white border-y border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-x-reverse lg:divide-gray-100">
            {TRUST_STATS.map((stat, index) => (
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

      {/* ── Process Steps ────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-turquoise mb-3">
              התהליך שלנו
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy tracking-tight mb-4">
              איך זה עובד?
            </h2>
            <p className="text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
              תהליך פשוט ב-4 שלבים — מהבדיקה הראשונית ועד המשכנתא
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl p-6 shadow-[0_1px_3px_0_rgb(0_0_0/0.05),0_4px_12px_0_rgb(0_0_0/0.06)] hover:shadow-[0_4px_16px_-2px_rgb(0_0_0/0.08),0_2px_8px_-2px_rgb(0_0_0/0.04)] transition-all duration-200 hover:-translate-y-0.5"
              >
                {/* step number */}
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-brand-navy text-white text-xs font-bold mb-4 tabular-nums">
                  {index + 1}
                </span>
                {/* icon */}
                <div className="w-11 h-11 rounded-xl bg-brand-turquoise/10 flex items-center justify-center mb-4">
                  <step.icon className="h-5 w-5 text-brand-turquoise" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-bold text-brand-navy mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                {/* connector */}
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -start-3 w-6 border-t-2 border-dashed border-brand-turquoise/25 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products ─────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-turquoise mb-3">
              המוצרים שלנו
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy tracking-tight mb-4">
              בחר את המסלול המתאים לך
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRODUCTS.map((product) => (
              <div
                key={product.href}
                className="group bg-white rounded-2xl p-6 md:p-8 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_2px_8px_0_rgb(0_0_0/0.06)] hover:shadow-[0_8px_24px_-4px_rgb(0_0_0/0.1),0_4px_10px_-2px_rgb(0_0_0/0.05)] transition-all duration-200 hover:-translate-y-0.5 flex flex-col"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-11 h-11 rounded-xl ${product.bg} flex items-center justify-center`}>
                    <product.icon className={`h-5 w-5 ${product.color}`} strokeWidth={1.75} />
                  </div>
                  {product.badge && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-brand-turquoise/10 text-brand-turquoise">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise" />
                      {product.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-brand-navy mb-2 leading-tight">
                  {product.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                  {product.description}
                </p>

                <Link
                  href={product.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy hover:text-brand-turquoise transition-colors duration-200 group-hover:gap-2.5"
                >
                  למידע נוסף
                  <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" strokeWidth={2} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {FEATURES.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-brand-navy/5 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-5 w-5 text-brand-navy" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-bold text-brand-navy mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-turquoise mb-3">
              ביקורות
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy tracking-tight">
              לקוחות מספרים
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TESTIMONIALS.slice(0, 3).map((t, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-[0_1px_3px_0_rgb(0_0_0/0.05),0_4px_12px_0_rgb(0_0_0/0.06)] flex flex-col"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-brand-orange text-brand-orange"
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <p className="text-sm text-foreground mb-5 leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="font-bold text-sm text-brand-navy">{t.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t.product}
                    <span className="mx-1.5 text-gray-300">·</span>
                    <span className="tabular-nums">₪{t.amount}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-6">
            {TESTIMONIALS.slice(3).map((t, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-[0_1px_3px_0_rgb(0_0_0/0.05),0_4px_12px_0_rgb(0_0_0/0.06)] flex flex-col"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-brand-orange text-brand-orange"
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <p className="text-sm text-foreground mb-5 leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="font-bold text-sm text-brand-navy">{t.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t.product}
                    <span className="mx-1.5 text-gray-300">·</span>
                    <span className="tabular-nums">₪{t.amount}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partners ─────────────────────────────────────────── */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-8">
            עובדים מול הגופים הפיננסיים המובילים בישראל
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {PARTNERS.map((name) => (
              <div
                key={name}
                className="bg-[#FAFAFA] border border-gray-100 rounded-xl px-5 py-2.5 text-xs font-semibold text-gray-400 hover:text-gray-600 hover:border-gray-200 transition-all duration-200"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-turquoise mb-3">
                שאלות ותשובות
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy tracking-tight">
                שאלות נפוצות
              </h2>
            </div>

            <Accordion className="space-y-3">
              {FAQS.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="bg-white rounded-xl border-0 px-6 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_1px_4px_0_rgb(0_0_0/0.06)]"
                >
                  <AccordionTrigger className="text-brand-navy font-semibold text-start hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_120%,#3AAFA920,transparent)]" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center relative z-10">
          <div className="max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-brand-turquoise/15 border border-brand-turquoise/25 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-6 w-6 text-brand-turquoise" strokeWidth={1.75} />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">
              מוכן להתחיל?
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
