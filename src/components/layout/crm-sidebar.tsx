"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CheckSquare,
  Settings,
  Menu,
  X,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const sections = [
  {
    title: "ראשי",
    items: [
      { label: "דשבורד", href: "/crm/dashboard", icon: LayoutDashboard, badge: null },
    ],
  },
  {
    title: "ניהול",
    items: [
      { label: "לידים", href: "/crm/leads", icon: Users, badge: 12 },
      { label: "תיקים", href: "/crm/cases", icon: Briefcase, badge: 4 },
      { label: "משימות", href: "/crm/tasks", icon: CheckSquare, badge: 7 },
    ],
  },
  {
    title: "הגדרות",
    items: [
      { label: "הגדרות", href: "/crm/settings", icon: Settings, badge: null },
    ],
  },
]

interface CrmSidebarProps {
  className?: string
}

export function CrmSidebar({ className }: CrmSidebarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-turquoise via-brand-turquoise to-[#2f9d97] flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_0_rgb(58_175_169/0.4)]">
            <span className="text-white font-black text-sm leading-none">מ</span>
          </div>
          <div>
            <p className="text-sm font-bold text-white tracking-tight leading-tight">
              משכנתא חכמה
            </p>
            <p className="text-[11px] font-medium text-white/40 leading-tight">
              פנל ניהול
            </p>
          </div>
        </div>
      </div>

      {/* Nav sections */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-6 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-widest text-white/25">
              {section.title}
            </p>
            <div className="flex flex-col gap-0.5">
              {section.items.map(({ label, href, icon: Icon, badge }) => {
                const isActive = pathname === href || pathname.startsWith(href + "/")
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 h-9 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950",
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/55 hover:bg-white/5 hover:text-white/85"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5 flex-shrink-0",
                        isActive ? "text-brand-turquoise" : "text-white/40"
                      )}
                      strokeWidth={1.75}
                    />
                    <span className="flex-1">{label}</span>
                    {badge !== null && badge > 0 && (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-turquoise text-white text-[10px] font-bold tabular-nums">
                        {badge > 99 ? "99+" : badge}
                      </span>
                    )}
                    {isActive && !badge && (
                      <ChevronRight className="w-3.5 h-3.5 text-white/30" strokeWidth={1.75} />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Advisor info */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xs">יכ</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white truncate">יועץ כהן</p>
            <p className="text-[11px] text-white/40 truncate">יועץ משכנתאות</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="פתח תפריט ניהול"
        className="lg:hidden fixed top-4 end-4 z-50 w-10 h-10 rounded-xl bg-gray-950 shadow-[0_2px_8px_0_rgb(0_0_0/0.3)] flex items-center justify-center text-white hover:bg-gray-800 transition-all duration-200"
      >
        <Menu className="w-5 h-5" strokeWidth={1.75} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        dir="rtl"
        className={cn(
          "lg:hidden fixed top-0 end-0 z-50 h-full w-72 bg-gray-950 transform transition-transform duration-300 ease-in-out",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button
          onClick={() => setMobileOpen(false)}
          aria-label="סגור תפריט"
          className="absolute top-4 start-4 w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:bg-white/10 transition-all duration-200"
        >
          <X className="w-4 h-4" strokeWidth={1.75} />
        </button>
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <aside
        dir="rtl"
        className={cn(
          "hidden lg:flex flex-col w-64 bg-gray-950 h-screen sticky top-0",
          "shadow-[1px_0_0_0_rgb(255_255_255/0.04)]",
          className
        )}
      >
        <SidebarContent />
      </aside>
    </>
  )
}
