import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const { pathname } = request.nextUrl

  // Early returns for better performance and readability
  if (user) {
    // Authenticated users: redirect from auth pages to home
    if (['/login', '/signup', '/forgot-password'].some(path => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return supabaseResponse
  }

  // Unauthenticated users: handle redirects
  if (pathname === '/') {
    const referer = request.headers.get('referer')
    // Only redirect if coming from outside the site
    if (!referer || !referer.includes(request.nextUrl.origin)) {
      return NextResponse.redirect(new URL('/landing', request.url))
    }
  }

  // Redirect to login for protected routes
  const publicRoutes = ['/login', '/signup', '/forgot-password', '/auth', '/landing']
  if (!publicRoutes.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return supabaseResponse
}