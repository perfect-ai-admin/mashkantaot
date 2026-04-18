import { PortalSidebar } from "@/components/layout/portal-sidebar"

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#FAFBFC]" dir="rtl">
      <PortalSidebar />
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-16 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  )
}
