/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Key pública de Web3Forms (client-safe); inyectada por el build desde PUBLIC_WEB3FORMS_KEY. */
  readonly PUBLIC_WEB3FORMS_KEY?: string;
}
