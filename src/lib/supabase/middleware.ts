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

  // Define public routes
  const publicRoutes = ['/', '/login', '/signup', '/forgot-password', '/pricing', '/use-cases']
  const isPublicRoute = publicRoutes.some(route => 
    route === '/' ? pathname === '/' : pathname === route || pathname.startsWith(route + '/')
  )

  // Block unauthenticated users from protected routes
  if (!user && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect authenticated users away from auth pages
  if (user && ['/login', '/signup', '/forgot-password'].some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  return supabaseResponse
}