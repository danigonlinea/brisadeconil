// Flat config ESLint (ESLint >=9). El proyecto usa "type": "module", así que este .js es ESM.
// Sin reglas de estilo/formato: solo corrección y seguridad de código.
import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import astroEslintPlugin from "eslint-plugin-astro";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default defineConfig(
  // Config base de ESLint
  eslint.configs.recommended,

  // Config recomendada de TypeScript (parser + plugin)
  ...tseslint.configs.recommended,

  // Reglas del proyecto
  {
    rules: {
      // Convención del proyecto: prohibido `any` explícito (AGENTS.md)
      "@typescript-eslint/no-explicit-any": "error",

      // Variables sin usar como error; `_prefijo` permite intencionalmente sin usar
      "no-unused-vars": "off", // desactivar la regla base en favor de la variante TS
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },

  // Islas React: reglas de hooks
  {
    files: ["src/components/*.tsx"],
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  // Scripts Node del repo (p. ej. optimize-gallery.mjs): exponen globals de Node
  {
    files: ["scripts/**/*.mjs"],
    languageOptions: {
      globals: globals.node,
    },
  },

  // Ficheros Astro
  ...astroEslintPlugin.configs["flat/recommended"],

  // Ignorar directorios/ficheros generados y assets
  {
    ignores: [
      "dist/**",
      ".astro/**",
      "node_modules/**",
      "public/**",
      "src/data/gallery-manifest.ts", // auto-generado por npm run optimize:gallery
    ],
  },
);
