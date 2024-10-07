/// <reference path="../.astro/types.d.ts" />

type EdgeLocals = import('@astrojs/vercel').EdgeLocals

declare namespace App {
  interface Locals extends EdgeLocals {
  }
}

interface ImportMetaEnv {
  readonly SITE_PASSWORD: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}