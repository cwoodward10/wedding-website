// src/middleware.ts
import { defineMiddleware } from "astro:middleware";
import { COOKIE_ID } from "./auth";

export const onRequest = defineMiddleware(async (context, next) => {
	if (context.url.pathname.includes("/password")) {
		return next();
	}

    const cookie = context.cookies.get(COOKIE_ID);
	if (cookie === undefined || cookie.value === undefined) {
		const redirect = context.redirect(`${context.url.origin}/password`);
		redirect.headers.set("x-redirect-to", context.url.pathname);

		return redirect;
    }
	return next();
});