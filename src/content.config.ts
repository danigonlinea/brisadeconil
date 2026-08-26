/**
 * Content collections config — Astro content layer (glob loader).
 *
 * One collection per locale so each language ships its own markdown files and
 * therefore its own localised slugs:
 *   src/content/blog/guia-playas.md       → /blog/guia-playas/
 *   src/content/blog-en/beaches-guide.md  → /en/blog/beaches-guide/
 *   src/content/blog-de/straende.md       → /de/blog/straende/
 */
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const postSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    /**
     * Slug of this post's sibling in another language, used to emit hreflang
     * alternates. Only declare languages the post actually exists in; slugs
     * are localised per collection so they usually differ across locales.
     */
    translations: z
      .object({ es: z.string(), en: z.string(), de: z.string() })
      .partial()
      .optional(),
  })
  // Fail fast at load time when an image is declared without its alt text.
  .refine((data) => data.image === undefined || data.imageAlt !== undefined, {
    message: 'imageAlt es obligatorio cuando se define image',
    path: ['imageAlt'],
  });

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '*.md' }),
  schema: postSchema,
});

const blogEn = defineCollection({
  loader: glob({ base: './src/content/blog-en', pattern: '*.md' }),
  schema: postSchema,
});

const blogDe = defineCollection({
  loader: glob({ base: './src/content/blog-de', pattern: '*.md' }),
  schema: postSchema,
});

export const collections = { blog, blogEn, blogDe };
