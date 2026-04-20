"use client"

import Link from "next/link"
import { useState } from "react"
import { Clock, Calendar, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { BLOG_POSTS, CATEGORIES } from "@/lib/blog-data"

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("he-IL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateStr))
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  "מדריכים": "from-brand-turquoise/10 to-brand-blue/10",
  "מחזור": "from-brand-orange/10 to-amber-50",
  "איחוד הלוואות": "from-brand-blue/10 to-indigo-50",
  "טיפים": "from-brand-green/10 to-emerald-50",
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("הכל")

  const filtered =
    activeCategory === "הכל"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeCategory)

  return (
    <div className="flex flex-col" dir="rtl">
      {/* Hero */}
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,#2D4A7A55,transparent)]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 lg:py-28 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] text-brand-turquoise text-xs font-medium px-3 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise" />
              מאמרים וטיפים
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 leading-[1.1]">
              כל מה שצריך לדעת{" "}
              <span className="text-brand-turquoise">על משכנתאות</span>
            </h1>
            <p className="text-base sm:text-lg text-white/50 leading-relaxed">
              מדריכים, טיפים ומידע מקצועי על משכנתאות, מחזור ואיחוד הלוואות — בעברית פשוטה
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 lg:py-20 bg-[#FAFBFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                  activeCategory === cat
                    ? "bg-brand-turquoise text-white border-brand-turquoise shadow-[0_2px_8px_-2px_rgb(58_175_169/0.4)]"
                    : "bg-white text-gray-500 border-gray-200 hover:border-brand-turquoise/40 hover:text-brand-turquoise"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_1px_4px_0_rgb(0_0_0/0.06)] hover:shadow-[0_8px_24px_-4px_rgb(0_0_0/0.1),0_4px_8px_-2px_rgb(0_0_0/0.06)] hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Image placeholder */}
                <div
                  className={cn(
                    "h-48 bg-gradient-to-br relative flex items-end p-4",
                    CATEGORY_GRADIENTS[post.category] ?? "from-gray-50 to-gray-100"
                  )}
                >
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 text-brand-turquoise border border-brand-turquoise/20 backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-xs font-medium text-brand-turquoise uppercase tracking-wide mb-2">
                    {post.category}
                  </p>
                  <h2 className="text-lg font-semibold text-gray-900 tracking-tight leading-snug group-hover:text-brand-turquoise transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
                        {post.readTime} דקות קריאה
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
                        {formatDate(post.publishedAt)}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-medium text-brand-turquoise opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      קרא עוד
                      <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-base">אין מאמרים בקטגוריה זו כרגע.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
