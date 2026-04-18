"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowRight, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement Supabase password reset
    setTimeout(() => {
      setIsLoading(false)
      setSent(true)
    }, 1000)
  }

  if (sent) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-brand-green/10 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="h-8 w-8 text-brand-green" strokeWidth={1.75} />
        </div>
        <h1 className="text-2xl font-display font-bold text-brand-navy tracking-tight mb-2">
          נשלח בהצלחה
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-xs mx-auto">
          אם הכתובת קיימת במערכת, ישלח אליך מייל עם קישור לאיפוס סיסמה. בדוק גם בתיקיית הספאם.
        </p>
        <Button
          render={<Link href="/login" />}
          className="h-11 px-6 bg-gray-50 hover:bg-gray-100 text-gray-900 font-semibold rounded-xl border border-gray-200/60 transition-all duration-200 active:scale-[0.98] inline-flex items-center gap-2"
        >
          <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          חזור להתחברות
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-display font-bold text-brand-navy tracking-tight">
          שחזור סיסמה
        </h1>
        <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
          הזן את כתובת האימייל שלך ונשלח לך קישור לאיפוס
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
            אימייל
          </Label>
          <div className="relative">
            <Mail
              className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
              strokeWidth={1.75}
            />
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="ps-10 h-11 rounded-xl border-gray-200 bg-white focus-visible:border-brand-turquoise focus-visible:ring-brand-turquoise/20 text-sm"
              dir="ltr"
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-brand-turquoise hover:bg-[#329d97] text-white font-semibold rounded-xl shadow-[0_1px_3px_0_rgb(58_175_169/0.3)] hover:shadow-[0_4px_12px_0_rgb(58_175_169/0.35)] transition-all duration-200 active:scale-[0.98]"
          disabled={isLoading}
        >
          {isLoading ? "שולח..." : "שלח קישור איפוס"}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        <Link
          href="/login"
          className="text-brand-turquoise font-semibold hover:text-brand-turquoise/80 transition-colors inline-flex items-center gap-1.5"
        >
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
          חזור להתחברות
        </Link>
      </p>
    </>
  )
}
