import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { CreateCookieString } from 'src/auth';

export const server = {
  checkPassword: defineAction({
    accept: 'form',
    input: z.object({
        password: z.string()
    }),
    handler: async ({password}) => {
        const serverPassword = import.meta.env.SITE_PASSWORD;
        return {
            success: password === serverPassword,
            cookie: CreateCookieString()
        }
    },
  })
}