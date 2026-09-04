/**
 * post-build.mjs
 *
 * Post-build script to copy sitemap-index.xml to sitemap.xml for Google Search Console compatibility.
 * 
 * @astrojs/sitemap always generates sitemap-index.xml as the main file, but Google Search Console
 * expects sitemap.xml at the root URL. This script copies the generated index file to maintain
 * the existing URL configured in GSC.
 *
 * Usage: Automatically runs after npm run build (configured in package.json)
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST_DIR = path.join(ROOT, "dist");

async function main() {
  const srcPath = path.join(DIST_DIR, "sitemap-index.xml");
  const destPath = path.join(DIST_DIR, "sitemap.xml");

  try {
    await fs.copyFile(srcPath, destPath);
    console.log("✓ Copied sitemap-index.xml to sitemap.xml for GSC compatibility");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error("✗ sitemap-index.xml not found in dist/. Ensure @astrojs/sitemap is configured.");
    } else {
      console.error("✗ Failed to copy sitemap:", error.message);
    }
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});