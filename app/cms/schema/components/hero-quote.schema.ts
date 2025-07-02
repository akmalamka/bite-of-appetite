import { RiChat1Line } from 'react-icons/ri';
import { defineField, defineType } from 'sanity';

export const heroQuoteSchema = defineType({
  name: 'heroQuote',
  title: 'Hero Quote',
  type: 'object',
  icon: RiChat1Line,
  preview: {
    select: {
      author: 'author',
    },
    prepare({ author }) {
      return {
        title: 'Hero Quote',
        subtitle: author ? `by ${author}` : 'No author provided',
      };
    },
  },
  fields: [
    defineField({
      name: 'quote',
      type: 'text',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'author',
      description: 'Author will not exist if it is empty',
      type: 'string',
    }),
  ],
});
