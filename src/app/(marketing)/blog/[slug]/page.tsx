import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Clock, Calendar, User, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { getBlogPost, getRelatedPosts } from "@/lib/blog-data"

interface Props {
  params: Promise<{ slug: string }>
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("he-IL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateStr))
}

const CATEGORY_COLORS: Record<string, string> = {
  "מדריכים": "bg-brand-turquoise/10 text-brand-turquoise",
  "מחזור": "bg-amber-50 text-amber-700",
  "איחוד הלוואות": "bg-indigo-50 text-indigo-700",
  "טיפים": "bg-emerald-50 text-emerald-700",
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  "מדריכים": "from-brand-turquoise/10 to-brand-blue/10",
  "מחזור": "from-amber-50 to-orange-50",
  "איחוד הלוואות": "from-indigo-50 to-blue-50",
  "טיפים": "from-emerald-50 to-green-50",
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) notFound()

  const related = getRelatedPosts(slug, 3)

  return (
    <div className="flex flex-col" dir="rtl">
      {/* Hero strip */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-brand-turquoise transition-colors duration-200"
          >
            <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            כל המאמרים
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="py-12 lg:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Category */}
          <span
            className={cn(
              "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold",
              CATEGORY_COLORS[post.category] ?? "bg-gray-100 text-gray-600"
            )}
          >
            {post.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 leading-[1.15] mt-4 mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 pb-8 border-b border-gray-100">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" strokeWidth={1.5} />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" strokeWidth={1.5} />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" strokeWidth={1.5} />
              {post.readTime} דקות קריאה
            </span>
          </div>

          {/* Content */}
          <div
            className={cn(
              "mt-8 text-base text-gray-600 leading-relaxed",
              "[&>p]:mb-6 [&>p:last-child]:mb-0",
              "[&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-10 [&>h2]:mb-4",
              "[&>ul]:list-disc [&>ul]:ps-6 [&>ul]:mb-6 [&>ul>li]:mb-2",
              "[&>ol]:list-decimal [&>ol]:ps-6 [&>ol]:mb-6 [&>ol>li]:mb-2",
              "[&>strong]:font-semibold [&>strong]:text-gray-800"
            )}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA box */}
          <div className="mt-12 rounded-2xl bg-gradient-to-br from-brand-turquoise/5 to-brand-blue/5 border border-brand-turquoise/15 p-6 lg:p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              רוצה לבדוק מה מתאים לך?
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              מלא שאלון קצר וקבל המלצה מותאמת אישית — חינם וללא התחייבות.
            </p>
            <Link
              href="/questionnaire"
              className="inline-flex items-center gap-2 bg-brand-turquoise hover:bg-[#2f9d97] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-[0_2px_8px_-2px_rgb(58_175_169/0.4)]"
            >
              בדוק זכאות — חינם
              <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </article>

      {/* Related articles */}
      <section className="py-14 lg:py-20 bg-[#FAFBFC] border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-8">
            מאמרים נוספים
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((relPost) => (
              <Link
                key={relPost.slug}
                href={`/blog/${relPost.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_1px_4px_0_rgb(0_0_0/0.06)] hover:shadow-[0_8px_24px_-4px_rgb(0_0_0/0.1),0_4px_8px_-2px_rgb(0_0_0/0.06)] hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Thumbnail */}
                <div
                  className={cn(
                    "h-32 bg-gradient-to-br relative flex items-end p-3",
                    CATEGORY_GRADIENTS[relPost.category] ?? "from-gray-50 to-gray-100"
                  )}
                >
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 text-brand-turquoise border border-brand-turquoise/20">
                    {relPost.category}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-brand-turquoise transition-colors duration-200 line-clamp-2 mb-2">
                    {relPost.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock className="w-3 h-3" strokeWidth={1.5} />
                    {relPost.readTime} דקות
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    {formatDate(relPost.publishedAt)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
