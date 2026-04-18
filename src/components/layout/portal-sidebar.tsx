"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  CheckSquare,
  MessageSquare,
  Settings,
  ChevronRight,
  X,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "דשבורד", href: "/portal/dashboard", icon: LayoutDashboard, badge: null },
  { label: "התיקים שלי", href: "/portal/cases", icon: Briefcase, badge: null },
  { label: "מסמכים", href: "/portal/documents", icon: FileText, badge: 3 },
  { label: "משימות", href: "/portal/tasks", icon: CheckSquare, badge: null },
  { label: "הודעות", href: "/portal/messages", icon: MessageSquare, badge: null },
  { label: "הגדרות", href: "/portal/settings", icon: Settings, badge: null },
]

// Placeholder user — replace with real auth data
const mockUser = {
  name: "ישראל ישראלי",
  email: "israel@example.com",
  initials: "יי",
}

interface PortalSidebarProps {
  className?: string
}

type NavItem = { label: string; href: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; badge: number | null }

export function PortalSidebar({ className }: PortalSidebarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* User avatar */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-turquoise via-brand-turquoise to-brand-navy flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_0_rgb(58_175_169/0.3)]">
            <span className="text-white font-bold text-sm">{mockUser.initials}</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{mockUser.name}</p>
            <p className="text-xs text-gray-500 truncate">{mockUser.email}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 flex flex-col gap-1 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon, badge }: NavItem) => {
          const isActive = pathname === href || pathname.startsWith(href + "/")
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-turquoise focus-visible:ring-offset-2",
                isActive
                  ? "bg-brand-turquoise/10 text-brand-turquoise"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 flex-shrink-0 transition-colors duration-200",
                  isActive ? "text-brand-turquoise" : "text-gray-400"
                )}
                strokeWidth={1.75}
              />
              <span className="flex-1">{label}</span>
              {badge !== null && badge > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 rounded-full bg-brand-orange text-white text-[10px] font-bold tabular-nums px-1">
                  {badge}
                </span>
              )}
              {isActive && !badge && (
                <ChevronRight className="w-4 h-4 text-brand-turquoise/50" strokeWidth={1.75} />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom brand */}
      <div className="p-5 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-brand-turquoise to-brand-navy flex items-center justify-center">
            <span className="text-white font-black text-[10px]">מ</span>
          </div>
          <span className="text-xs font-semibold text-gray-400">משכנתא חכמה</span>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="פתח תפריט"
        className="lg:hidden fixed top-4 end-4 z-50 w-10 h-10 rounded-xl bg-white shadow-[0_2px_8px_0_rgb(0_0_0/0.1)] flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-all duration-200"
      >
        <Menu className="w-5 h-5" strokeWidth={1.75} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        dir="rtl"
        className={cn(
          "lg:hidden fixed top-0 end-0 z-50 h-full w-72 bg-white shadow-[0_8px_32px_0_rgb(0_0_0/0.12)] transform transition-transform duration-300 ease-in-out",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button
          onClick={() => setMobileOpen(false)}
          aria-label="סגור תפריט"
          className="absolute top-4 start-4 w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-all duration-200"
        >
          <X className="w-4 h-4" strokeWidth={1.75} />
        </button>
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <aside
        dir="rtl"
        className={cn(
          "hidden lg:flex flex-col w-64 bg-white border-e border-gray-100 h-screen sticky top-0",
          "shadow-[1px_0_0_0_rgb(0_0_0/0.04)]",
          className
        )}
      >
        <SidebarContent />
      </aside>
    </>
  )
}
