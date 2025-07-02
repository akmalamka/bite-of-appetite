import { RiArticleLine } from 'react-icons/ri';
import { defineField, defineType } from 'sanity';
import { ARTICLES_SCHEMA } from '../sanity.constant';

export const articlesSchema = defineType({
  name: ARTICLES_SCHEMA,
  title: 'Articles',
  type: 'document',
  icon: RiArticleLine,
  groups: [
    { name: 'general' },
    { name: 'details' },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      image: 'image',
    },
    prepare({ title, subtitle, image }) {
      return {
        title,
        subtitle,
        media: image,
      };
    },
  },
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'general',

      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'general',

      validation: (rule) => rule.required(),
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'publishedDate',
      type: 'date',
      group: 'general',

      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      group: 'general',

      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
      group: 'general',

      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'writingBy',
      type: 'string',
      group: 'details',

      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photoBy',
      type: 'string',
      group: 'details',

      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'story',
      type: 'array',
      group: 'details',

      of: [{ type: 'block' }],
      validation: (rule) => rule.required(),
    }),
  ],
});
