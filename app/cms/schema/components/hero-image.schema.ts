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
      validation: (rule) => rule.min(1).error('Typing texts must have at least 1 text'),
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
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          {
            title: 'Left',
            value: 'left',
          },
          {
            title: 'Right',
            value: 'right',
          },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
      validation: (rule) => rule.required().error('Please select an image position.'),
    }),
    defineField({
      name: 'ctaButton',
      description: 'If this field is left empty, there will be no buttons displayed',
      type: 'object',
      fields: [
        defineField({
          name: 'ctaText',
          type: 'string',
          title: 'CTA Text',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'ctaLink',
          title: 'CTA Link',
          type: 'linkSelection',
          validation: (rule) => rule.required(),
        }),
      ],
      title: 'CTA Button',
    }),
  ],
});
