/**
 * POST /api/contact — server-side relay for the contact form → Web3Forms.
 *
 * Anti-spam / anti-bot:
 * - Rate limiting: sliding-window, 5 requests / 10 min per client IP → 429.
 *   Uses an in-memory map (process-local; if /api/contact ever runs on a
 *   shared / multi-instance backend, replace with Redis or a DB counter).
 * - Honeypot: a hidden "website" input. Humans never fill it; bots do. A
 *   non-empty value is answered with a fake success and NO email is sent.
 * - Input validation: length caps + email format check (defense in depth).
 *
 * Note: this site is deployed to GitHub Pages (static hosting), so this
 * endpoint does NOT run in production there. The protections that actually
 * execute in production are the client-side honeypot in ContactForm.tsx
 * plus Web3Forms' own server-side filtering.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;
const FIELD_MAX = 500;

/** Attempt timestamps per client key (in-memory, sliding window). */
const attempts: Record<string, number[]> = {};

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function clientIp(request: Request): string {
  const raw =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for") ||
    "unknown";
  return raw.split(",")[0]?.trim() || "unknown";
}

/** Trim and cap an incoming form string (defense in depth). */
function trimmed(value: unknown): string {
  const s = typeof value === "string" ? value : "";
  const t = s.trim();
  return t.length > FIELD_MAX ? t.slice(0, FIELD_MAX) : t;
}

/** Honeypot: a hidden "website" field being filled marks a bot. */
function isBot(body: Record<string, unknown>): boolean {
  const hp = body.website;
  return typeof hp === "string" && hp.trim() !== "";
}

export async function POST({ request }: { request: Request }) {
  try {
    // 1) Rate limit: prune old attempts, count the current window, block over.
    const key = clientIp(request);
    const now = Date.now();
    const recent = (attempts[key] ?? []).filter((t) => now - t < WINDOW_MS);
    if (recent.length >= MAX_PER_WINDOW) {
      attempts[key] = recent;
      return json({ success: false, error: "Too many requests" }, 429);
    }
    recent.push(now);
    attempts[key] = recent;

    // 2) Parse body (invalid JSON → 400, not 500).
    let body: Record<string, unknown>;
    try {
      const raw = await request.json();
      body = raw && typeof raw === "object" ? raw : {};
    } catch {
      return json({ success: false, error: "Invalid JSON body" }, 400);
    }

    // 3) Honeypot: fake success so bots don't learn the trap; send nothing.
    if (isBot(body)) {
      return json({ success: true }, 200);
    }

    // 4) Required fields + lightweight validation.
    const name = trimmed(body.name);
    const email = trimmed(body.email).toLowerCase();
    if (!name || !email) {
      return json({ success: false, error: "Missing name or email" }, 400);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ success: false, error: "Invalid email" }, 400);
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      return json({ success: false, error: "Server misconfiguration" }, 500);
    }

    // 5) Relay to Web3Forms.
    const { subject, from_name, checkin, checkout, message } = body;
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: trimmed(subject) || "Nueva consulta — Brisa de Conil",
        from_name: trimmed(from_name) || "Brisa de Conil Web",
        name,
        email,
        "Fecha de entrada": trimmed(checkin) || "No indicada",
        "Fecha de salida": trimmed(checkout) || "No indicada",
        message: trimmed(message) || "(sin mensaje adicional)",
      }),
    });

    const data = await res.json();
    return json({ success: !!data.success, data }, res.ok ? 200 : 502);
  } catch (err) {
    return json({ success: false, error: String(err) }, 500);
  }
}
