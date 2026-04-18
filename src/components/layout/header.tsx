"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "דף הבית", href: "/" },
  { label: "משכנתא חדשה", href: "/mortgage" },
  { label: "מחזור", href: "/refinance" },
  { label: "איחוד הלוואות", href: "/consolidation" },
  { label: "מחשבונים", href: "/calculator" },
  { label: "אודות", href: "/about" },
  { label: "צור קשר", href: "/contact" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      dir="rtl"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 h-16",
        isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_3px_0_rgb(0_0_0/0.02)] border-b border-gray-100"
          : "bg-brand-navy/10 backdrop-blur-sm"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus-visible:ring-2 focus-visible:ring-brand-turquoise focus-visible:ring-offset-2 rounded-xl"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-turquoise via-brand-turquoise to-brand-navy flex items-center justify-center shadow-[0_2px_8px_0_rgb(58_175_169/0.3)]">
              <span className="text-white font-black text-xs leading-none">מ</span>
            </div>
            <span
              className={cn(
                "font-bold text-lg tracking-tight transition-colors duration-200",
                isScrolled ? "text-brand-navy" : "text-white"
              )}
            >
              משכנתא חכמה
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-turquoise focus-visible:ring-offset-2",
                  isScrolled
                    ? "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/login"
              className={cn(
                "h-9 px-4 rounded-xl text-xs font-semibold border transition-all duration-200 inline-flex items-center focus-visible:ring-2 focus-visible:ring-brand-turquoise focus-visible:ring-offset-2",
                isScrolled
                  ? "text-gray-700 hover:bg-gray-50 border-gray-200/60"
                  : "text-white/80 hover:text-white border-white/20 hover:bg-white/10"
              )}
            >
              כניסה
            </Link>
            <Link
              href="/questionnaire"
              className="h-9 px-4 rounded-xl text-xs font-semibold text-white bg-brand-turquoise hover:bg-[#2f9d97] shadow-[0_1px_2px_0_rgb(0_0_0/0.05),0_4px_12px_-2px_rgb(58_175_169/0.3)] hover:shadow-[0_2px_4px_0_rgb(0_0_0/0.08),0_8px_20px_-4px_rgb(58_175_169/0.4)] transition-all duration-200 active:scale-[0.98] inline-flex items-center focus-visible:ring-2 focus-visible:ring-brand-turquoise focus-visible:ring-offset-2"
            >
              בדוק זכאות
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileOpen((v) => !v)}
            aria-label={isMobileOpen ? "סגור תפריט" : "פתח תפריט"}
            className={cn(
              "lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-turquoise focus-visible:ring-offset-2",
              isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
            )}
          >
            {isMobileOpen ? (
              <X className="w-5 h-5" strokeWidth={1.5} />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="bg-white/98 backdrop-blur-xl border-t border-gray-100 px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:text-brand-navy hover:bg-gray-50 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 mt-2 border-t border-gray-100 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setIsMobileOpen(false)}
              className="h-11 px-4 rounded-xl text-sm font-semibold text-center text-gray-700 border border-gray-200/60 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center"
            >
              כניסה
            </Link>
            <Link
              href="/questionnaire"
              onClick={() => setIsMobileOpen(false)}
              className="h-11 px-4 rounded-xl text-sm font-semibold text-center text-white bg-brand-turquoise hover:bg-[#2f9d97] transition-all duration-200 shadow-[0_1px_2px_0_rgb(0_0_0/0.05),0_4px_12px_-2px_rgb(58_175_169/0.3)] flex items-center justify-center"
            >
              בדוק זכאות
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
