import { defineArrayMember, defineField, defineType } from 'sanity';
import { SOCIAL_MEDIAS_SCHEMA } from '../sanity.constant';

export const socialMediasSchema = defineType({
  name: SOCIAL_MEDIAS_SCHEMA,
  title: 'Social Medias',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: 'Social Medias',
      };
    },
  },
  fields: [
    defineField({
      name: 'socials',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'social',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
            }),
            defineField({
              name: 'link',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'link',
            },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1).error('You must add at least one social media'),
    }),
  ],
});
