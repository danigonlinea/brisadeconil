/**
 * generate-pdf.mjs — Generate a print-ready PDF of the WiFi poster.
 *
 * Serves `dist/` over a local HTTP server (the built HTML uses absolute
 * paths like /logos/... which would not resolve under file://), renders
 * the poster in headless Chrome and exports it as an exact 140×230 mm PDF.
 *
 * NOTE: page margins must be 0 — the `.poster` element is styled at
 * exactly 14×23 cm and fills the whole page. Non-zero page margins shrink
 * the content box, and Chrome clips the poster at the content-box boundary,
 * leaving white strips on the right/bottom edges.
 */
import http from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = resolve(__dirname, "../../../dist");
const POSTER_PATH = "/wifi-poster/";
const OUT_PATH = resolve(__dirname, "../../../dist/wifi-poster.pdf");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".avif": "image/avif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

/** Minimal static file server rooted at DIST_DIR. */
function createStaticServer() {
  return http.createServer(async (req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    let filePath = join(DIST_DIR, urlPath);

    // Directory → serve index.html (mirrors a static host).
    try {
      const stats = await stat(filePath);
      if (stats.isDirectory()) filePath = join(filePath, "index.html");
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
      return;
    }

    const mime = MIME_TYPES[extname(filePath)] ?? "application/octet-stream";
    res.writeHead(200, { "Content-Type": mime, "Cache-Control": "no-store" });
    createReadStream(filePath).pipe(res);
  });
}

async function main() {
  const server = createStaticServer();
  await new Promise((resolveListen) => server.listen(0, "127.0.0.1", resolveListen));
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  console.log(`Serving ${DIST_DIR} at ${baseUrl}${POSTER_PATH}`);

  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.goto(`${baseUrl}${POSTER_PATH}`, { waitUntil: "networkidle0" });

    await page.pdf({
      path: OUT_PATH,
      width: "140mm",
      height: "230mm",
      printBackground: true,
      margin: { top: "0", bottom: "0", left: "0", right: "0" },
    });

    console.log(`PDF generated: ${OUT_PATH}`);
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
