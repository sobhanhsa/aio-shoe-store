import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    if (request.cookies.has("access_token")) {
        return NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: '/auth/:path*',
}