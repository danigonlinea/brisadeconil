/**
 * ContactForm — React island.
 * Service: Web3Forms (https://web3forms.com)
 * Set WEB3FORMS_ACCESS_KEY in your environment or replace the placeholder below.
 * The access key is public-safe (it only controls where emails go, not sensitive data).
 */
import { useState, useId } from "react";

// The form now posts to a server-side endpoint (`/api/contact`) which
// forwards the submission to Web3Forms using a server-only env var.
// Do NOT include secret keys in client-side code.

type FormState = "idle" | "sending" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  checkin: string;
  checkout: string;
  guests: string;
  message: string;
}

interface FieldError {
  name?: string;
  email?: string;
  checkin?: string;
  checkout?: string;
}

function validateForm(data: FormData): FieldError {
  const errors: FieldError = {};
  if (!data.name.trim()) errors.name = "El nombre es obligatorio.";
  if (!data.email.trim()) {
    errors.email = "El email es obligatorio.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Introduce un email válido.";
  }
  if (data.checkin && data.checkout && data.checkout <= data.checkin) {
    errors.checkout = "La fecha de salida debe ser posterior a la de entrada.";
  }
  return errors;
}

function addDaysToDate(value: string, days: number) {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  const nextYear = date.getFullYear();
  const nextMonth = String(date.getMonth() + 1).padStart(2, "0");
  const nextDay = String(date.getDate()).padStart(2, "0");
  return `${nextYear}-${nextMonth}-${nextDay}`;
}

export default function ContactForm() {
  const id = useId();
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    checkin: "",
    checkout: "",
    guests: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldError>({});
  const [state, setState] = useState<FormState>("idle");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;
    setForm((prev) => {
      if (name === "checkin") {
        const nextDay = value ? addDaysToDate(value, 1) : "";
        if (!prev.checkout || (prev.checkout && value >= prev.checkout)) {
          return { ...prev, checkin: value, checkout: nextDay };
        }
        return { ...prev, checkin: value };
      }
      return { ...prev, [name]: value };
    });
    // Clear error on change
    if (errors[name as keyof FieldError]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fieldErrors = validateForm(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      // Focus first error field
      const firstErrorKey = Object.keys(fieldErrors)[0];
      document.getElementById(`${id}-${firstErrorKey}`)?.focus();
      return;
    }

    setState("sending");
    try {
      // Post to the local server endpoint which holds the access key
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          subject: `Nueva consulta de ${form.name} — Brisa de Conil`,
          from_name: "Brisa de Conil Web",
          name: form.name,
          email: form.email,
          checkin: form.checkin || "No indicada",
          checkout: form.checkout || "No indicada",
          guests: form.guests || "No indicado",
          message: form.message || "(sin mensaje adicional)",
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setState("success");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="contact-success" role="alert" aria-live="polite">
        <div className="contact-success-icon" aria-hidden="true">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="contact-success-headline">¡Mensaje enviado!</h3>
        <p className="contact-success-message">
          Gracias por contactarnos. Te respondemos a la mayor brevedad posible.
        </p>
        <button
          className="btn btn--outline"
          onClick={() => {
            setState("idle");
            setForm({
              name: "",
              email: "",
              checkin: "",
              checkout: "",
              guests: "",
              message: "",
            });
          }}
          type="button"
        >
          Enviar otra consulta
        </button>
      </div>
    );
  }

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Formulario de contacto para reservas"
    >
      <div className="contact-form-grid">
        {/* Name */}
        <div className="form-group">
          <label className="form-label" htmlFor={`${id}-name`}>
            Tu nombre <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${id}-name`}
            className="form-input"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ana García"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${id}-name-error` : undefined}
          />
          {errors.name && (
            <span className="form-error" id={`${id}-name-error`} role="alert">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {errors.name}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label" htmlFor={`${id}-email`}>
            Email de contacto <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${id}-email`}
            className="form-input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="ana@ejemplo.com"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${id}-email-error` : undefined}
          />
          {errors.email && (
            <span className="form-error" id={`${id}-email-error`} role="alert">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {errors.email}
            </span>
          )}
        </div>

        {/* Check-in */}
        <div className="form-group">
          <label className="form-label" htmlFor={`${id}-checkin`}>
            Fecha de entrada
          </label>
          <input
            id={`${id}-checkin`}
            className="form-input"
            type="date"
            name="checkin"
            value={form.checkin}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        {/* Check-out */}
        <div className="form-group">
          <label className="form-label" htmlFor={`${id}-checkout`}>
            Fecha de salida
          </label>
          <input
            id={`${id}-checkout`}
            className="form-input"
            type="date"
            name="checkout"
            value={form.checkout}
            onChange={handleChange}
            min={form.checkin || new Date().toISOString().split("T")[0]}
            aria-invalid={!!errors.checkout}
            aria-describedby={
              errors.checkout ? `${id}-checkout-error` : undefined
            }
          />
          {errors.checkout && (
            <span
              className="form-error"
              id={`${id}-checkout-error`}
              role="alert"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {errors.checkout}
            </span>
          )}
        </div>

        {/* Guests */}
        <div className="form-group">
          <label className="form-label" htmlFor={`${id}-guests`}>
            Número de personas
          </label>
          <select
            id={`${id}-guests`}
            className="form-input form-select"
            name="guests"
            value={form.guests}
            onChange={handleChange}
          >
            <option value="">Selecciona…</option>
            <option value="1">1 persona</option>
            <option value="2">2 personas</option>
            <option value="3">3 personas (máximo)</option>
          </select>
        </div>

        {/* Message — spans full width */}
        <div className="form-group contact-form-message">
          <label className="form-label" htmlFor={`${id}-message`}>
            Mensaje (opcional)
          </label>
          <textarea
            id={`${id}-message`}
            className="form-input form-textarea"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="¿Tienes alguna pregunta o petición especial?"
            rows={4}
          />
        </div>
      </div>

      {/* Error banner */}
      {state === "error" && (
        <div
          className="contact-error-banner"
          role="alert"
          aria-live="assertive"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          Ha ocurrido un error al enviar. Por favor, inténtalo de nuevo.
        </div>
      )}

      <div className="contact-form-footer">
        <button
          className="btn btn--primary btn--lg contact-submit"
          type="submit"
          disabled={state === "sending"}
          aria-busy={state === "sending"}
        >
          {state === "sending" ? (
            <>
              <svg
                className="contact-spinner"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Enviando…
            </>
          ) : (
            "Enviar consulta"
          )}
        </button>
        <p className="contact-privacy">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Tus datos solo se usarán para responder a tu consulta.
        </p>
      </div>
    </form>
  );
}
