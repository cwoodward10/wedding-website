import { z, defineCollection } from 'astro:content';

const galleryCollection = defineCollection({
  type: 'data', // v2.5.0 and later
  schema: ({image}) => z.object({
    src: image(),
    alt: z.string(),
    direction: z.enum(['horizontal', 'vertical'])
  }),
});

export const collections = {
  'gallery': galleryCollection,
};