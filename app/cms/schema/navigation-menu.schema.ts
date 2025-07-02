import { BsFillMenuButtonWideFill } from 'react-icons/bs';
import { defineField, defineType } from 'sanity';

import { NAVIGATION_MENU_SCHEMA } from '../sanity.constant';

export const navigationMenuSchema = defineType({
  name: NAVIGATION_MENU_SCHEMA,
  title: 'Navigation Menu',
  type: 'document',
  icon: BsFillMenuButtonWideFill,

  preview: {
    select: {
      title: 'text',
    },
  },

  fields: [
    defineField({
      name: 'order',
      type: 'number',
    }),

    defineField({
      name: 'text',
      type: 'string',
    }),

    defineField({
      name: 'link',
      type: 'linkSelection',
    }),
  ],
});
