import type { Metadata } from "next"
import { getBlogPost } from "@/lib/blog-data"

interface Props {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) {
    return { title: "מאמר לא נמצא | משכנתא חכמה" }
  }
  return {
    title: `${post.title} | משכנתא חכמה`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  }
}

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
