/**
 * Content collections config — Astro content layer (glob loader).
 *
 * The blog is Spanish-only for now and ships markdown posts under
 * src/content/blog/. Each file's name (without extension) becomes the entry
 * id and therefore the public slug:
 *   src/content/blog/guia-playas.md → /blog/guia-playas/
 */
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '*.md' }),
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).optional(),
      image: z.string().optional(),
      imageAlt: z.string().optional(),
    })
    // Fail fast at load time when an image is declared without its alt text.
    .refine((data) => data.image === undefined || data.imageAlt !== undefined, {
      message: 'imageAlt es obligatorio cuando se define image',
      path: ['imageAlt'],
    }),
});

export const collections = { blog };
