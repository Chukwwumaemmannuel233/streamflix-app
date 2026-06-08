import { NextResponse, type NextRequest } from "next/server"

const PUBLIC_FILE = /\.(.*)$/

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const waitlistOnly =
    process.env.WAITLIST_ONLY === "1" ||
    process.env.NEXT_PUBLIC_WAITLIST_ONLY === "1" ||
    (process.env.VERCEL === "1" && process.env.WAITLIST_ONLY !== "0")

  const isPublicAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/streamflix-favicon") ||
    pathname === "/logo.png" ||
    pathname === "/placeholder.svg" ||
    PUBLIC_FILE.test(pathname)

  if (!waitlistOnly || isPublicAsset || pathname === "/waitlist") {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = "/waitlist"
  url.search = ""

  return NextResponse.redirect(url)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
