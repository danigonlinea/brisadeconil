export async function POST({ request }: { request: Request }) {
  try {
    const body = await request.json();
    const {
      subject,
      from_name,
      name,
      email,
      checkin,
      checkout,
      guests,
      message,
    } = body || {};

    if (!name || !email) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing name or email" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      return new Response(
        JSON.stringify({ success: false, error: "Server misconfiguration" }),
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
        "Número de personas": guests || "No indicado",
        message: message || "(sin mensaje adicional)",
      }),
    });

    const data = await res.json();

    return new Response(JSON.stringify({ success: !!data.success, data }), {
      status: res.ok ? 200 : 502,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: String(err) }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
