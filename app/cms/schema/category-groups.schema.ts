import { RiPriceTag2Line } from 'react-icons/ri';
import { defineField, defineType } from 'sanity';
import { CATEGORY_GROUPS_SCHEMA } from '../sanity.constant';

export const categoryGroupsSchema = defineType({
  name: CATEGORY_GROUPS_SCHEMA,
  title: 'Category Groups',
  type: 'document',
  icon: RiPriceTag2Line,
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
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
