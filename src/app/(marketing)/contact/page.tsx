"use client"

import { useState } from "react"
import Link from "next/link"
import { Phone, Mail, Clock, Send, ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "טלפון",
    value: "03-1234567",
    href: "tel:0312345678",
  },
  {
    icon: Mail,
    label: "אימייל",
    value: "info@mashkanta.co.il",
    href: "mailto:info@mashkanta.co.il",
  },
  {
    icon: Clock,
    label: "שעות פעילות",
    value: "ראשון–חמישי 09:00–18:00",
    href: null,
  },
]

const INQUIRY_TYPES = [
  { value: "mortgage", label: "משכנתא חדשה" },
  { value: "refinance", label: "מחזור משכנתא" },
  { value: "consolidation", label: "איחוד הלוואות" },
  { value: "other", label: "אחר" },
]

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    type: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)

  const set = (field: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.type) {
      toast.error("נא למלא שם, טלפון וסוג פנייה")
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    toast.success("הפנייה התקבלה! נחזור אליך תוך יום עסקים")
    setForm({ name: "", phone: "", email: "", type: "", message: "" })
  }

  return (
    <div dir="rtl" className="min-h-screen bg-white">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_-20%,#2D4A7A60,transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24 lg:py-28 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] text-brand-turquoise text-xs font-medium px-3 py-1.5 rounded-full mb-8 tracking-wide backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise" />
            נשמח לעזור
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-4">
            צור קשר
          </h1>
          <p className="text-base sm:text-lg text-white/50 max-w-md mx-auto leading-relaxed">
            יש שאלה? רוצה לדעת יותר? השאר פרטים ונחזור אליך תוך יום עסקים
          </p>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-[#FAFBFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-[0_1px_3px_0_rgb(0_0_0/0.04),0_6px_16px_-2px_rgb(0_0_0/0.05)]">
                <h2 className="text-xl font-bold text-brand-navy mb-1">
                  שלח פנייה
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  מלא את הפרטים ויועץ שלנו יחזור אליך בהקדם
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label="שם מלא" required>
                      <Input
                        placeholder="ישראל ישראלי"
                        value={form.name}
                        onChange={(e) => set("name")(e.target.value)}
                        className="h-11 bg-[#FAFBFC] border-gray-200/60 focus:bg-white transition-colors rounded-xl"
                        required
                      />
                    </FormField>
                    <FormField label="טלפון" required>
                      <Input
                        placeholder="050-0000000"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => set("phone")(e.target.value)}
                        className="h-11 bg-[#FAFBFC] border-gray-200/60 focus:bg-white transition-colors rounded-xl"
                        required
                        dir="ltr"
                      />
                    </FormField>
                  </div>

                  <FormField label="אימייל">
                    <Input
                      placeholder="email@example.com"
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email")(e.target.value)}
                      className="h-11 bg-[#FAFBFC] border-gray-200/60 focus:bg-white transition-colors rounded-xl"
                      dir="ltr"
                    />
                  </FormField>

                  <FormField label="סוג פנייה" required>
                    <Select value={form.type} onValueChange={(v) => v && set("type")(v)} required>
                      <SelectTrigger className="h-11 bg-[#FAFBFC] border-gray-200/60 rounded-xl">
                        <SelectValue placeholder="בחר סוג פנייה" />
                      </SelectTrigger>
                      <SelectContent>
                        {INQUIRY_TYPES.map((t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormField>

                  <FormField label="הודעה">
                    <Textarea
                      placeholder="ספר לנו איך נוכל לעזור..."
                      rows={4}
                      value={form.message}
                      onChange={(e) => set("message")(e.target.value)}
                      className="bg-[#FAFBFC] border-gray-200/60 focus:bg-white resize-none transition-colors rounded-xl"
                    />
                  </FormField>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-brand-turquoise hover:bg-[#2f9d97] text-white font-semibold rounded-xl shadow-[0_1px_2px_0_rgb(0_0_0/0.05),0_4px_12px_-2px_rgb(58_175_169/0.3)] hover:shadow-[0_2px_4px_0_rgb(0_0_0/0.08),0_8px_20px_-4px_rgb(58_175_169/0.4)] transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        שולח...
                      </span>
                    ) : (
                      <>
                        שלח פנייה
                        <Send className="h-4 w-4" strokeWidth={1.5} />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Contact info */}
              <div className="bg-white rounded-2xl p-6 shadow-[0_1px_3px_0_rgb(0_0_0/0.04),0_6px_16px_-2px_rgb(0_0_0/0.05)]">
                <h2 className="text-base font-bold text-brand-navy mb-5">
                  פרטי התקשרות
                </h2>
                <div className="space-y-4">
                  {CONTACT_INFO.map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-4 w-4 text-brand-turquoise" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-400 mb-0.5">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm font-semibold text-brand-navy hover:text-brand-turquoise transition-colors"
                            dir="ltr"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-semibold text-brand-navy">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick CTA card */}
              <div className="bg-brand-navy rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_0%_100%,#3AAFA915,transparent)]" />
                <div className="relative z-10">
                  <h3 className="font-bold text-base mb-2">לא רוצה לחכות?</h3>
                  <p className="text-sm text-white/50 mb-5 leading-relaxed">
                    בדוק זכאות תוך 2 דקות — חינם, ללא התחייבות
                  </p>
                  <Button
                    render={<Link href="/questionnaire" />}
                    className="w-full h-11 bg-brand-turquoise hover:bg-[#2f9d97] text-white font-semibold text-sm rounded-xl shadow-[0_2px_8px_0_rgb(58_175_169/0.3)] transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    בדוק עכשיו
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function FormField({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <Label className="text-sm font-medium text-brand-navy mb-1.5 block">
        {label}
        {required && <span className="text-brand-turquoise ms-0.5">*</span>}
      </Label>
      {children}
    </div>
  )
}
