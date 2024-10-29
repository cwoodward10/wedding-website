import type { APIRoute } from "astro"
import { COOKIE_ID } from "src/auth";

export const POST: APIRoute = async ({ request }) => {
    const jsonData = await request.json();
    const password = (jsonData as any).password;

    const serverPassword = import.meta.env.SITE_PASSWORD;
    if (password === serverPassword) {
        return new Response(JSON.stringify({
            name: COOKIE_ID,
            value: 'wooo',
            date: 'Sun, 21 Sep 2025 12:00:00 GMT'
        }),
        { status: 200 })
    } else {
        console.error(`Tried: ${password}. Expected: ${serverPassword}`)
        return new Response(
            JSON.stringify({
                message: "Invalid password",
            }),
            { status: 400 }
        );
    }
}