import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Check for the auth token cookie
    const authToken = request.cookies.get('auth_token')

    // Check if the user is accessing the admin panel
    const isAdminPage = request.nextUrl.pathname.startsWith('/admin')

    // Check if the user is accessing the login page
    const isLoginPage = request.nextUrl.pathname === '/login'

    // If trying to access admin without a token, redirect to login
    if (isAdminPage && !authToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // If trying to access login WITH a token, redirect to admin (optional but good for UX)
    if (isLoginPage && authToken) {
        return NextResponse.redirect(new URL('/admin/hizmetler', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/login'
    ],
}
