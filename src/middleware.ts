// src/middleware.ts
import { defineMiddleware } from "astro:middleware";
import { COOKIE_ID } from "./auth";

export const onRequest = defineMiddleware(async (context, next) => {
	if ((context.request.method === 'POST' && context.url.pathname === '/api/auth')) {
		return next();
	}
	
	if (context.url.pathname.includes("/password")) {
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
});