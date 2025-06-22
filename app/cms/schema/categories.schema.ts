import { RiPriceTag3Line } from 'react-icons/ri';
import { defineField, defineType } from 'sanity';
import { CATEGORIES_SCHEMA, CATEGORY_GROUPS_SCHEMA } from '../sanity.constant';

export const categoriesSchema = defineType({
  name: CATEGORIES_SCHEMA,
  title: 'Categories',
  type: 'document',
  icon: RiPriceTag3Line,
  preview: {
    select: {
      title: 'title',
      subtitle: 'categoryGroup.title',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle,
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
      name: 'categoryGroup',
      type: 'reference',
      to: [
        { type: CATEGORY_GROUPS_SCHEMA },
      ],
    }),
  ],
});
