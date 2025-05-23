// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  output: 'server',
  adapter: vercel({
    //edgeMiddleware: true,
  }),
  site: 'https://www.natalieandchris2025.com/',
  security: {
		checkOrigin: true
	}
});