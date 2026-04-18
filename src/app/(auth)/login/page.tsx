"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement Supabase auth
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-display font-bold text-brand-navy tracking-tight">
          ברוך הבא
        </h1>
        <p className="text-sm text-gray-500 mt-1.5">
          היכנס לאזור האישי שלך
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

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
              סיסמה
            </Label>
            <Link
              href="/forgot-password"
              className="text-xs text-brand-turquoise font-semibold hover:text-brand-turquoise/80 transition-colors"
            >
              שכחתי סיסמה
            </Link>
          </div>
          <div className="relative">
            <Lock
              className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
              strokeWidth={1.75}
            />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="ps-10 pe-11 h-11 rounded-xl border-gray-200 bg-white focus-visible:border-brand-turquoise focus-visible:ring-brand-turquoise/20 text-sm"
              dir="ltr"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "הסתר סיסמה" : "הצג סיסמה"}
              className="absolute end-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-150 focus-visible:ring-2 focus-visible:ring-brand-turquoise focus-visible:ring-offset-1"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" strokeWidth={1.75} />
              ) : (
                <Eye className="h-4 w-4" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-brand-turquoise hover:bg-[#329d97] text-white font-semibold rounded-xl shadow-[0_1px_3px_0_rgb(58_175_169/0.3)] hover:shadow-[0_4px_12px_0_rgb(58_175_169/0.35)] transition-all duration-200 active:scale-[0.98] mt-2"
          disabled={isLoading}
        >
          {isLoading ? "מתחבר..." : "התחבר"}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100" />
        </div>
      </div>

      <p className="text-center text-sm text-gray-500">
        אין לך חשבון?{" "}
        <Link
          href="/register"
          className="text-brand-turquoise font-semibold hover:text-brand-turquoise/80 transition-colors"
        >
          הרשם עכשיו
        </Link>
      </p>
    </>
  )
}
