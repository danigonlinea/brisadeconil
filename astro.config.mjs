// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// When you buy a custom domain, change these two values:
//   site: 'https://brisadeconil.com'
//   base: '/'
// And add a CNAME file to the public/ folder with content: brisadeconil.com

export default defineConfig({
  site: "https://www.brisadeconil.com",
  base: "/",
  trailingSlash: "always",
  integrations: [
    react(),
    // Sitemap options: freshness + priority signals for crawlers and answer engines.
    sitemap({
      lastmod: new Date(),
      changefreq: "monthly",
      priority: 0.7,
    }),
  ],
  build: {
    // Inline all CSS into the HTML <head>. Removes the two render-blocking
    // <link rel="stylesheet"> requests flagged in the Core Web Vitals audit
    // (global base + page bundle). CSS is small enough (~50KB total) that
    // inlining wins on slow mobile connections vs. extra blocking round-trips.
    inlineStylesheets: "always",
  },
  image: {
    // Use Astro's built-in image optimization
    remotePatterns: [],
  },
});
