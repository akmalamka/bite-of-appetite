import { defineType } from 'sanity';

export const imageWithAltSchema = defineType({
  name: 'imageWithAlt',
  type: 'image',
  fields: [
    {
      name: 'alt',
      type: 'string',
      description: 'Alt text helps partially visible people understand the image and improves how search engines find your content',
      validation: (rule) => rule.required(),
    },
  ],
  options: {
    hotspot: true,
  },
});
