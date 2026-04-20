"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "משכנתא חדשה", href: "/mortgage" },
  { label: "מחזור", href: "/refinance" },
  { label: "איחוד הלוואות", href: "/consolidation" },
  { label: "מחשבונים", href: "/calculator" },
  { label: "מאמרים", href: "/blog" },
  { label: "אודות", href: "/about" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  // Only the homepage has a dark hero — everywhere else the header needs a solid bg
  const isHomepage = pathname === "/"
  const showDarkMode = isHomepage && !isScrolled

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      dir="rtl"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        showDarkMode
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-xl shadow-[0_1px_3px_0_rgb(0_0_0/0.06)] border-b border-gray-200/60"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-turquoise to-[#2a8f8a] flex items-center justify-center shadow-[0_2px_8px_0_rgb(58_175_169/0.35)]">
              <span className="text-white font-black text-sm leading-none">מ</span>
            </div>
            <span
              className={cn(
                "font-bold text-lg tracking-tight transition-colors duration-200",
                showDarkMode ? "text-white" : "text-gray-900"
              )}
            >
              משכנתא חכמה
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200",
                  showDarkMode
                    ? "text-white/70 hover:text-white hover:bg-white/10"
                    : pathname === link.href
                    ? "text-brand-turquoise bg-brand-turquoise/5"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link
              href="/login"
              className={cn(
                "h-10 px-5 rounded-xl text-sm font-semibold transition-all duration-200 inline-flex items-center border",
                showDarkMode
                  ? "text-white/80 hover:text-white border-white/20 hover:bg-white/10"
                  : "text-gray-700 hover:text-gray-900 border-gray-200 hover:bg-gray-50"
              )}
            >
              התחברות
            </Link>
            <Link
              href="/questionnaire"
              className="h-10 px-6 rounded-xl text-sm font-semibold text-white bg-brand-turquoise hover:bg-[#2f9d97] shadow-[0_0_0_1px_rgb(58_175_169/0.5),0_2px_4px_0_rgb(0_0_0/0.1),0_4px_16px_-2px_rgb(58_175_169/0.35)] hover:shadow-[0_0_0_1px_rgb(47_157_151/0.5),0_4px_8px_0_rgb(0_0_0/0.12),0_8px_24px_-4px_rgb(58_175_169/0.45)] transition-all duration-200 active:scale-[0.97] inline-flex items-center gap-2"
            >
              בדוק זכאות
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileOpen((v) => !v)}
            aria-label={isMobileOpen ? "סגור תפריט" : "פתח תפריט"}
            className={cn(
              "lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200",
              showDarkMode ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"
            )}
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-0.5 shadow-[0_8px_24px_-4px_rgb(0_0_0/0.1)]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-150",
                pathname === link.href
                  ? "text-brand-turquoise bg-brand-turquoise/5"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 mt-2 border-t border-gray-100 flex flex-col gap-2.5">
            <Link
              href="/login"
              onClick={() => setIsMobileOpen(false)}
              className="h-12 rounded-xl text-[15px] font-semibold text-gray-700 border border-gray-200 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center"
            >
              התחברות
            </Link>
            <Link
              href="/questionnaire"
              onClick={() => setIsMobileOpen(false)}
              className="h-12 rounded-xl text-[15px] font-semibold text-white bg-brand-turquoise hover:bg-[#2f9d97] shadow-[0_2px_8px_-2px_rgb(58_175_169/0.4)] transition-all duration-200 flex items-center justify-center gap-2"
            >
              בדוק זכאות — חינם
              <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
