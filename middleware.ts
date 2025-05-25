// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-url', request.url)
    requestHeaders.set('x-pathname', request.nextUrl.pathname)
    requestHeaders.set('host', request.nextUrl.host)
    requestHeaders.set('x-forwarded-proto', request.nextUrl.protocol.replace(':', ''))

    return NextResponse.next({
        request: {
        headers: requestHeaders,
        },
    })
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}