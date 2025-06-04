import { defineField, defineType } from 'sanity';

export const headerSchema = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',

  preview: {
    prepare() {
      return {
        title: 'Header',
      };
    },
  },

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
  ],
});
