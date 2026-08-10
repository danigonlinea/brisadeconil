const SUBMISSIONS = new Map<string, number[]>();

function getClientIp(request: Request): string {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const limit = 3;

  const timestamps = SUBMISSIONS.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    return false;
  }

  recent.push(now);
  SUBMISSIONS.set(ip, recent);
  return true;
}

export async function POST({ request }: { request: Request }) {
  try {
    const body = await request.json();
    const { subject, from_name, name, email, checkin, checkout, message, website } =
      body || {};

    if (website) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!name || !email) {
      return new Response(
        JSON.stringify({ success: false, error: "Datos incompletos" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const ip = getClientIp(request);
    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({ success: false, error: "Demasiados intentos" }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      return new Response(
        JSON.stringify({ success: false, error: "Error del servidor" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: subject || "Nueva consulta — Brisa de Conil",
        from_name: from_name || "Brisa de Conil Web",
        name,
        email,
        "Fecha de entrada": checkin || "No indicada",
        "Fecha de salida": checkout || "No indicada",
        message: message || "(sin mensaje adicional)",
      }),
    });

    const data = await res.json();

    return new Response(JSON.stringify({ success: !!data.success }), {
      status: res.ok ? 200 : 502,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: "Error del servidor" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
