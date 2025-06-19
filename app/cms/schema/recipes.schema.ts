import { RiBook2Line } from 'react-icons/ri';
import { defineField, defineType } from 'sanity';
import { RECIPES_SCHEMA } from '../sanity.constant';

export const recipesSchema = defineType({
  name: RECIPES_SCHEMA,
  title: 'Recipes',
  type: 'document',
  icon: RiBook2Line,
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
  ],
});
