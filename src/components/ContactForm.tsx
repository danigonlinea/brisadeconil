/**
 * ContactForm — React island.
 * Service: Web3Forms (https://web3forms.com)
 * Form submits to the server-side `/api/contact` endpoint.
 *
 * Submission strategy:
 * 1. POST to /api/contact (server-side endpoint; requires WEB3FORMS_ACCESS_KEY).
 * 2. If that fails (e.g. GitHub Pages static hosting where the endpoint does
 *    not exist at runtime), fall back to a direct POST to api.web3forms.com
 *    using the client-safe PUBLIC_WEB3FORMS_KEY (it only routes emails).
 */
import { useEffect, useMemo, useState, useId } from "react";
import type { Locale } from "../i18n/translations";
import { t as translations } from "../i18n/translations";
import { trackEvent } from "../lib/analytics";

type FormState = "idle" | "sending" | "success" | "error";

interface ContactField {
  label: string;
  placeholder: string;
}

interface ContactText {
  formAriaLabel: string;
  fields: {
    name: ContactField;
    email: ContactField;
    checkin: ContactField;
    checkout: ContactField;
    message: ContactField;
  };
  submit: string;
  sending: string;
  successHeadline: string;
  successButton: string;
  successMessage: string;
  errorMessage: string;
  privacy: string;
  errors: {
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    checkoutAfterCheckin: string;
  };
}

interface FormData {
  name: string;
  email: string;
  checkin: string;
  checkout: string;
  message: string;
  /** Honeypot anti-bot: invis para humanos, los bots lo rellenan. */
  website: string;
}

interface FieldError {
  name?: string;
  email?: string;
  checkin?: string;
  checkout?: string;
}

function validateForm(data: FormData, contact: ContactText): FieldError {
  const errors: FieldError = {};
  if (!data.name.trim()) errors.name = contact.errors.nameRequired;
  if (!data.email.trim()) {
    errors.email = contact.errors.emailRequired;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = contact.errors.emailInvalid;
  }
  if (data.checkin && data.checkout && data.checkout <= data.checkin) {
    errors.checkout = contact.errors.checkoutAfterCheckin;
  }
  return errors;
}

function translate(key: string, locale: Locale): string {
  return translations[key]?.[locale] ?? translations[key]?.["es"] ?? "";
}

function buildContactText(locale: Locale): ContactText {
  return {
    formAriaLabel: translate("contact.formAriaLabel", locale),
    fields: {
      name: {
        label: translate("contact.fields.name.label", locale),
        placeholder: translate("contact.fields.name.placeholder", locale),
      },
      email: {
        label: translate("contact.fields.email.label", locale),
        placeholder: translate("contact.fields.email.placeholder", locale),
      },
      checkin: {
        label: translate("contact.fields.checkin.label", locale),
        placeholder: translate("contact.fields.checkin.placeholder", locale),
      },
      checkout: {
        label: translate("contact.fields.checkout.label", locale),
        placeholder: translate("contact.fields.checkout.placeholder", locale),
      },
      message: {
        label: translate("contact.fields.message.label", locale),
        placeholder: translate("contact.fields.message.placeholder", locale),
      },
    },
    submit: translate("contact.submit", locale),
    sending: translate("contact.sending", locale),
    successHeadline: translate("contact.successHeadline", locale),
    successButton: translate("contact.successButton", locale),
    successMessage: translate("contact.successMessage", locale),
    errorMessage: translate("contact.errorMessage", locale),
    privacy: translate("contact.privacy", locale),
    errors: {
      nameRequired: translate("contact.errors.nameRequired", locale),
      emailRequired: translate("contact.errors.emailRequired", locale),
      emailInvalid: translate("contact.errors.emailInvalid", locale),
      checkoutAfterCheckin: translate(
        "contact.errors.checkoutAfterCheckin",
        locale,
      ),
    },
  };
}

const SERVER_ENDPOINT = "/api/contact";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

interface ContactPayload {
  subject: string;
  from_name: string;
  name: string;
  email: string;
  checkin: string;
  checkout: string;
  message: string;
  website: string;
}

function buildContactPayload(form: FormData): ContactPayload {
  return {
    subject: `Nueva consulta de ${form.name} — Brisa de Conil`,
    from_name: "Brisa de Conil Web",
    name: form.name,
    email: form.email,
    checkin: form.checkin || "No indicada",
    checkout: form.checkout || "No indicada",
    message: form.message || "(sin mensaje adicional)",
    website: form.website,
  };
}

function toWeb3FormsBody(
  payload: ContactPayload,
  accessKey: string,
): Record<string, string> {
  return {
    access_key: accessKey,
    subject: payload.subject,
    from_name: payload.from_name,
    name: payload.name,
    email: payload.email,
    "Fecha de entrada": payload.checkin,
    "Fecha de salida": payload.checkout,
    message: payload.message,
    website: payload.website,
  };
}

async function postJson(url: string, body: unknown): Promise<Response> {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
}

/**
 * Why a submission attempt failed.
 * - "server": an HTTP endpoint responded but with a non-OK status or a
 *   non-success body (e.g. /api/contact 404, or Web3Forms 4xx/5xx).
 * - "network": the request itself threw (unreachable, DNS, CORS) or the body
 *   wasn't JSON (e.g. an HTML error page).
 */
type FailureReason = "network" | "server";

/** Reason attached to a submit result: the path that succeeded, or why it failed. */
type SubmitReason = FailureReason | "fallback";

interface SubmitResult {
  ok: boolean;
  /** "server"/"fallback" when ok (which path delivered it); failure cause when !ok. */
  reason: SubmitReason;
}

/**
 * Classify a submission response: "ok" on HTTP 2xx + { success: true },
 * otherwise the granular failure reason.
 */
async function classifyResponse(res: Response): Promise<"ok" | FailureReason> {
  if (!res.ok) return "server";
  try {
    const data = await res.json();
    return data.success ? "ok" : "server";
  } catch {
    return "network";
  }
}

async function submitViaServer(payload: ContactPayload): Promise<SubmitResult> {
  const res = await postJson(SERVER_ENDPOINT, payload).catch(() => null);
  if (!res) return { ok: false, reason: "network" };
  const outcome = await classifyResponse(res);
  return outcome === "ok"
    ? { ok: true, reason: "server" }
    : { ok: false, reason: outcome };
}

async function submitViaWeb3Forms(
  payload: ContactPayload,
  accessKey: string,
): Promise<SubmitResult> {
  const res = await postJson(
    WEB3FORMS_ENDPOINT,
    toWeb3FormsBody(payload, accessKey),
  ).catch(() => null);
  if (!res) return { ok: false, reason: "network" };
  const outcome = await classifyResponse(res);
  return outcome === "ok"
    ? { ok: true, reason: "fallback" }
    : { ok: false, reason: outcome };
}

async function submitContact(payload: ContactPayload): Promise<SubmitResult> {
  // 1) Server-side endpoint first (needs WEB3FORMS_ACCESS_KEY at runtime).
  const serverResult = await submitViaServer(payload);
  if (serverResult.ok) return serverResult;

  // 2) Static-hosting fallback: direct Web3Forms POST with the client-safe key.
  //
  // Tradeoff: on a future server host, if /api/contact forwards the lead but
  // responds non-OK/non-JSON, the fallback re-sends the same lead (duplicate
  // email risk). Accepted for the two-step design; dormant on GitHub Pages,
  // where the endpoint never runs.
  const publicKey = import.meta.env.PUBLIC_WEB3FORMS_KEY;
  if (!publicKey) return serverResult;
  return submitViaWeb3Forms(payload, publicKey);
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
  const [locale, setLocale] = useState<Locale>("es");
  const contact = useMemo(() => buildContactText(locale), [locale]);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    checkin: "",
    checkout: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<FieldError>({});
  const [state, setState] = useState<FormState>("idle");

  useEffect(() => {
    const currentLocale = (window.__brisaGetLocale?.() ?? "es") as Locale;
    setLocale(currentLocale);

    const handleLocaleChange = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      if (detail?.locale) {
        setLocale(detail.locale);
      }
    };

    window.addEventListener("brisa:locale-change", handleLocaleChange);
    return () =>
      window.removeEventListener("brisa:locale-change", handleLocaleChange);
  }, []);

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

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    // Honeypot anti-bot: si el campo oculto "website" viene relleno es un bot.
    // Fingimos éxito para que el bot no insista, pero NO enviamos nada (ni vía
    // server-side ni al fallback de Web3Forms), evitando spam y coste.
    if (form.website.trim() !== "") {
      setState("success");
      return;
    }
    const fieldErrors = validateForm(form, contact);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      trackEvent("form_submit_error", {
        form: "contact",
        reason: "validation",
      });
      // Focus first error field
      const firstErrorKey = Object.keys(fieldErrors)[0];
      document.getElementById(`${id}-${firstErrorKey}`)?.focus();
      return;
    }

    trackEvent("form_submit", { form: "contact" });
    setState("sending");
    const result = await submitContact(buildContactPayload(form));
    if (result.ok) {
      trackEvent("generate_lead", { form: "contact", method: "Web3Forms" });
      setState("success");
    } else {
      trackEvent("form_submit_error", {
        form: "contact",
        reason: result.reason,
      });
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
        <h3 className="contact-success-headline">{contact.successHeadline}</h3>
        <p className="contact-success-message">{contact.successMessage}</p>
        <button
          className="btn btn--outline"
          onClick={() => {
            setState("idle");
            setForm({
              name: "",
              email: "",
              checkin: "",
              checkout: "",
              message: "",
              website: "",
            });
          }}
          type="button"
        >
          {contact.successButton}
        </button>
      </div>
    );
  }

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label={contact.formAriaLabel}
    >
      <div className="contact-form-grid">
        {/* Campo invisible honeypot: los bots lo rellenan, los humanos no lo
            ven. Si trae texto, handleSubmit finge éxito sin enviar nada. */}
        <input
          type="text"
          name="website"
          id={`${id}-website`}
          value={form.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-9999px",
            width: "1px",
            height: "1px",
          }}
        />

        {/* Name */}
        <div className="form-group">
          <label className="form-label" htmlFor={`${id}-name`}>
            {contact.fields.name.label} <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${id}-name`}
            className="form-input"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={contact.fields.name.placeholder}
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
            {contact.fields.email.label} <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${id}-email`}
            className="form-input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder={contact.fields.email.placeholder}
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
            {contact.fields.checkin.label}
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
            {contact.fields.checkout.label}
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

        {/* Message — spans full width */}
        <div className="form-group contact-form-message">
          <label className="form-label" htmlFor={`${id}-message`}>
            {contact.fields.message.label}
          </label>
          <textarea
            id={`${id}-message`}
            className="form-input form-textarea"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder={contact.fields.message.placeholder}
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
          {contact.errorMessage}
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
              {contact.sending}
            </>
          ) : (
            contact.submit
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
          {contact.privacy}
        </p>
      </div>
    </form>
  );
}
