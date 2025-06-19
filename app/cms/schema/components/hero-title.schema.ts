import { RiHeading } from 'react-icons/ri';
import { defineField, defineType } from 'sanity';

export const heroTitleSchema = defineType({
  name: 'heroTitle',
  title: 'Hero Title',
  type: 'object',
  icon: RiHeading,

  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'Hero Title',
        subtitle: title,
      };
    },
  },

  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
});
