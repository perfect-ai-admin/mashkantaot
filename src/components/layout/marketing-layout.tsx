import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-brand-cream" dir="rtl">
      <Header />
      <main className="flex-1 pt-16 lg:pt-18">{children}</main>
      <Footer />
    </div>
  )
}
