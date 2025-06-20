import { RiArticleLine } from 'react-icons/ri';
import { defineField, defineType } from 'sanity';
import { ARTICLES_SCHEMA } from '../sanity.constant';

export const articlesSchema = defineType({
  name: ARTICLES_SCHEMA,
  title: 'Articles',
  type: 'document',
  icon: RiArticleLine,
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (rule) => rule.required(),
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'publishedDate',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'writingBy',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photoBy',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'story',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (rule) => rule.required(),
    }),
  ],
});
