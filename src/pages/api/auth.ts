import type { APIRoute } from "astro"
import { COOKIE_ID } from "src/auth";

export const POST: APIRoute = async ({ request, cookies, redirect, url }) => {
    const data = await request.formData();
    const password = data.get('password');

    const serverPassword = import.meta.env.SITE_PASSWORD;
    if (password === serverPassword) {
        cookies.set(COOKIE_ID, 'wooo', {
            httpOnly: true,
            path: '/',
            secure: true,
            expires: new Date('Sun, 21 Sep 2025 12:00:00 GMT')
        })
        
        const response = redirect(url.searchParams.get("redirect") ?? '/', 307);
        return response;
    } else {
        return new Response(
            JSON.stringify({
                message: "Invalid password",
            }),
            { status: 400 }
        );
    }
}