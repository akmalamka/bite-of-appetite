import { RiImage2Line } from 'react-icons/ri';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const heroImageSchema = defineType({
  name: 'heroImage',
  title: 'Hero Image',
  type: 'object',
  icon: RiImage2Line,

  preview: {
    select: {
      title: 'title',
      image: 'image',
    },
    prepare({ title, image }) {
      return {
        title: 'Hero Image',
        subtitle: title,
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
      name: 'typingTexts',
      description: 'These texts will appear one by one as a typing text',
      type: 'array',
      validation: (rule) => rule.required().min(1).error('Typing texts must have at least 1 text'),
      of: [
        defineArrayMember({
          name: 'typingText',
          title: 'Typing Text',
          type: 'string',
        }),
      ],
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
