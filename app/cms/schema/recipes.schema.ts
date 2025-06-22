import { RiBook2Line } from 'react-icons/ri';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { CATEGORIES_SCHEMA, RECIPES_SCHEMA } from '../sanity.constant';

export const recipesSchema = defineType({
  name: RECIPES_SCHEMA,
  title: 'Recipes',
  type: 'document',
  icon: RiBook2Line,
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
      name: 'categories',
      type: 'array',
      group: 'general',
      of: [
        defineArrayMember({
          name: 'category',
          type: 'reference',
          to: [
            { type: CATEGORIES_SCHEMA },
          ],
        }),
      ],
      validation: (rule) => rule.min(1).required().error('There must be at least 1 category'),
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
      name: 'time',
      type: 'string',
      group: 'details',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'recipeBy',
      type: 'string',
      group: 'details',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'inspiredBy',
      type: 'array',
      group: 'details',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'foodPhotographyBy',
      type: 'string',
      group: 'details',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'foodStylingBy',
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
