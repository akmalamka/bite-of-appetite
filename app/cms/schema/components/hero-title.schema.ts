import { RiFlashlightLine } from 'react-icons/ri';
import { defineField, defineType } from 'sanity';

export const heroTitleSchema = defineType({
  name: 'heroTitle',
  title: 'Hero Title',
  type: 'object',
  icon: RiFlashlightLine,

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

    defineField({
      name: 'subtitle',
      description: 'Subtitle will not exist if it is empty',
      type: 'text',
    }),
  ],
});
