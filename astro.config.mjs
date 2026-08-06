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
  integrations: [
    react(),
  ],
  image: {
    // Use Astro's built-in image optimization
    remotePatterns: [],
  },
});
