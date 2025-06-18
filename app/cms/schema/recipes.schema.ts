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
      image: 'image',
    },
    prepare({ title, image }) {
      return {
        title,
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
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
  ],
});
