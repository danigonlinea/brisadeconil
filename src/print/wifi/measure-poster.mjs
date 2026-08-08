/**
 * measure-poster.mjs — Print-emulation layout measurement (dev utility).
 */
import http from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = resolve(__dirname, "../../../dist");
const MIME = { ".html": "text/html", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".css": "text/css", ".webp": "image/webp", ".avif": "image/avif", ".woff2": "font/woff2", ".woff": "font/woff" };

const server = http.createServer(async (req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  let filePath = join(DIST_DIR, urlPath);
  try {
    const stats = await stat(filePath);
    if (stats.isDirectory()) filePath = join(filePath, "index.html");
  } catch { res.writeHead(404); res.end("nf"); return; }
  res.writeHead(200, { "Content-Type": MIME[extname(filePath)] ?? "application/octet-stream" });
  createReadStream(filePath).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.goto(`${base}/wifi-poster/`, { waitUntil: "networkidle0" });
await page.emulateMediaType("print");

const metrics = await page.evaluate(() => {
  const rect = (el) => {
    const r = el.getBoundingClientRect();
    return { x: +r.x.toFixed(2), y: +r.y.toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(2) };
  };
  const images = [...document.images].map((img) => ({
    src: img.src.replace(/^http:\/\/127\.0\.0\.1:\d+/, ""),
    complete: img.complete,
    naturalWidth: img.naturalWidth,
    rendered: rect(img),
  }));
  return {
    viewport: { w: innerWidth, h: innerHeight },
    poster: rect(document.querySelector(".poster")),
    qr: rect(document.querySelector(".poster-qr")),
    qrImg: rect(document.querySelector(".poster-qr img")),
    images,
    bodyScroll: { w: document.body.scrollWidth, h: document.body.scrollHeight },
    docScroll: { w: document.documentElement.scrollWidth, h: document.documentElement.scrollHeight },
  };
});
console.log(JSON.stringify(metrics, null, 2));

await browser.close();
server.close();
