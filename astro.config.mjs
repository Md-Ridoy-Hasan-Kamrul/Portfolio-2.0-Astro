import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [react()],
  site: 'https://portfolio-2-0-seven-opal.vercel.app',
  base: process.env.VERCEL ? '/' : '/Portfolio-2.0/',
  vite: {
    plugins: [tailwindcss()],
  },
});
