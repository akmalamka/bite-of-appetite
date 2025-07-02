import { RiListView } from 'react-icons/ri';
import { defineField, defineType } from 'sanity';

export const recipeListSchema = defineType({
  name: 'recipeList',
  title: 'Recipe List',
  type: 'object',
  icon: RiListView,

  preview: {
    prepare() {
      return {
        title: 'Recipe List',
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
