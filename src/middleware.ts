import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Skip Supabase auth if env vars are not configured (demo mode)
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL === "https://your-project.supabase.co"
  ) {
    return NextResponse.next()
  }

  // When Supabase is configured, use session management
  const { updateSession } = await import("@/lib/supabase/middleware")
  return await updateSession(request)
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
