import { RiCarouselView } from 'react-icons/ri';
import { defineField, defineType } from 'sanity';

export const imageCarouselSchema = defineType({
  name: 'imageCarousel',
  title: 'Image Carousel',
  type: 'object',
  icon: RiCarouselView,

  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'Image Carousel',
        subtitle: title,
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
      name: 'contentReference',
      title: 'Content Reference',
      type: 'string',
      options: {
        list: [
          {
            title: 'Recipes',
            value: 'recipes',
          },
          {
            title: 'Food for Thought',
            value: 'foodForThought',
          },
        ],
        layout: 'radio',
      },
      initialValue: 'recipes',
      validation: (rule) => rule.required().error('Please select a content reference.'),
    }),
  ],
});
