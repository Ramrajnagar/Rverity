import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const PROTECTED_ROUTES = ['/dashboard', '/graph', '/settings', '/onboarding'];
const AUTH_ROUTES = ['/login', '/signup'];

export async function middleware(req: NextRequest) {
    let response = NextResponse.next({ request: { headers: req.headers } });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return req.cookies.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    req.cookies.set({ name, value, ...options });
                    response = NextResponse.next({ request: { headers: req.headers } });
                    response.cookies.set({ name, value, ...options });
                },
                remove(name: string, options: CookieOptions) {
                    req.cookies.set({ name, value: '', ...options });
                    response = NextResponse.next({ request: { headers: req.headers } });
                    response.cookies.set({ name, value: '', ...options });
                },
            },
        }
    );

    const { data: { session } } = await supabase.auth.getSession();
    const path = req.nextUrl.pathname;

    const isProtected = PROTECTED_ROUTES.some(route => path.startsWith(route));
    const isAuth = AUTH_ROUTES.some(route => path.startsWith(route));

    if (isProtected && !session) {
        const url = new URL('/login', req.url);
        url.searchParams.set('redirect', path);
        return NextResponse.redirect(url);
    }

    if (isAuth && session) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (isProtected) {
        response.headers.set('Cache-Control', 'no-store, max-age=0');
    }

    return response;
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/graph/:path*',
        '/settings/:path*',
        '/onboarding/:path*',
        '/login',
        '/signup'
    ],
};
