import { RiListView } from 'react-icons/ri';
import { defineField, defineType } from 'sanity';

export const articleListSchema = defineType({
  name: 'articleList',
  title: 'Article List',
  type: 'object',
  icon: RiListView,

  preview: {
    prepare() {
      return {
        title: 'Article List',
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
