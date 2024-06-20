import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z
    .object({
      tags: z.optional(z.array(z.string())),
    })
});

const listsCollection = defineCollection({
  schema: z
    .object({
      tags: z.optional(z.array(z.string())),
    })
});

export const collection = {
  blog: blogCollection,
  lists: listsCollection,
}
