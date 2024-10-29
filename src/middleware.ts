// src/middleware.ts
import { defineMiddleware, sequence } from "astro:middleware";
import { COOKIE_ID } from "./auth";
import type { APIContext, MiddlewareNext } from "astro";

const APIs = [
	'/api/auth',
	'/api/login'
]
const checkSearchParams = defineMiddleware(async (context: APIContext, next: MiddlewareNext) => {
	if ((context.request.method === 'POST' && APIs.includes(context.url.pathname))) {
		return next();
	}

	const cookie = context.cookies.get(COOKIE_ID);
	if (cookie === undefined || cookie.value === undefined) {
		const paramPassword = context.url.searchParams.get('pw');
		if (paramPassword) {
			const options: RequestInit = {
				method: "POST",
				body: JSON.stringify({ password: paramPassword}),
				redirect: 'follow'
			}

			const response = await fetch(`${context.url.origin}/api/auth`, options);
			if (response.ok) {
				const data = await response.json();
				context.cookies.set(data.name, data.value, {
					httpOnly: true,
					path: '/',
					secure: true,
					expires: new Date(data.date),
					sameSite: 'strict'
				})
			}
		}
    }

	return next();
})

const handleRoute = defineMiddleware((context: APIContext, next: MiddlewareNext) => {
	if ((context.request.method === 'POST' && APIs.includes(context.url.pathname))) {
		return next();
	}
	
	if (context.url.pathname.includes("/password")) {
		return next();
	} 

	if (context.url.pathname.includes("/_image")) {
		return next();
	}

	const cookie = context.cookies.get(COOKIE_ID);
	if (cookie === undefined || cookie.value === undefined) {
		return context.rewrite(new Request(`${context.url.origin}/password`, {
			headers: {
				"x-redirect-to": context.url.pathname
			}
		}));
    }

	return next();
})

export const onRequest = sequence(checkSearchParams, handleRoute);