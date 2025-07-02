import { RiBook2Line, RiBreadLine, RiDirectionLine, RiSeedlingLine } from 'react-icons/ri';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { CATEGORIES_SCHEMA, RECIPES_SCHEMA } from '../sanity.constant';

export const recipesSchema = defineType({
  name: RECIPES_SCHEMA,
  title: 'Recipes',
  type: 'document',
  icon: RiBook2Line,
  groups: [
    { name: 'general' },
    { name: 'details' },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      image: 'image',
    },
    prepare({ title, subtitle, image }) {
      return {
        title,
        subtitle,
        media: image,
      };
    },
  },
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'general',
      validation: (rule) => rule.required(),
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'publishedDate',
      type: 'date',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categories',
      type: 'array',
      group: 'general',
      of: [
        defineArrayMember({
          name: 'category',
          type: 'reference',
          to: [
            { type: CATEGORIES_SCHEMA },
          ],
        }),
      ],
      validation: (rule) => rule.min(1).required().error('There must be at least 1 category'),
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'time',
      type: 'string',
      group: 'details',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'recipeBy',
      type: 'string',
      group: 'details',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'inspiredBy',
      type: 'array',
      group: 'details',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'foodPhotographyBy',
      type: 'string',
      group: 'details',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'foodStylingBy',
      type: 'string',
      group: 'details',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'story',
      type: 'array',
      group: 'details',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'isIngredientWithComponent',
      type: 'boolean',
      title: 'Use Components for Ingredients?',
      initialValue: false,
      group: 'details',
    }),
    defineField({
      name: 'servings',
      type: 'string',
      group: 'details',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ingredientsWithComponent',
      type: 'array',
      hidden: ({ parent }) => !parent?.isIngredientWithComponent,
      of: [
        defineArrayMember({
          name: 'component',
          type: 'object',
          icon: RiBreadLine,
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'ingredients',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'ingredient',
                  type: 'object',
                  icon: RiSeedlingLine,
                  fields: [
                    defineField({
                      name: 'name',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'measurement',
                      description: 'Typically a number, of if it cannot, use estimation like a pinch, etc',
                      type: 'string',
                    }),
                    defineField({
                      name: 'unit',
                      description: 'Unit of weight, e.g. ml, L, pinch, tbsp, tsp, etc',
                      type: 'string',
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'name',
                      unit: 'unit',
                      measurement: 'measurement',
                    },
                    prepare({ title, unit, measurement }) {
                      let ingredient;
                      if (unit && measurement) {
                        ingredient = `${measurement} ${unit} of ${title}`;
                      } else if (measurement) {
                        ingredient = `${measurement} ${title}`;
                      } else {
                        ingredient = title;
                      }
                      return {
                        title: ingredient,
                      };
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              ingredients: 'ingredients',
            },
            prepare({ title, ingredients }) {
              const count = Array.isArray(ingredients) ? ingredients.length : 0;
              return {
                title,
                subtitle: `${count} ingredient${count !== 1 ? 's' : ''}`,

              };
            },
          },
        }),
      ],
      group: 'details',
    }),
    defineField({
      name: 'ingredientsWithoutComponent',
      type: 'array',
      hidden: ({ parent }) => parent?.isIngredientWithComponent,
      of: [
        defineArrayMember({
          name: 'ingredient',
          type: 'object',
          icon: RiSeedlingLine,
          fields: [
            defineField({
              name: 'name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'measurement',
              description: 'Typically a number, of if it cannot, use estimation like a pinch, etc',
              type: 'string',
            }),
            defineField({
              name: 'unit',
              description: 'Unit of weight, e.g. ml, L, pinch, tbsp, tsp, etc',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              unit: 'unit',
              measurement: 'measurement',
            },
            prepare({ title, unit, measurement }) {
              let ingredient;
              if (unit && measurement) {
                ingredient = `${measurement} ${unit} of ${title}`;
              } else if (measurement) {
                ingredient = `${measurement} ${title}`;
              } else {
                ingredient = title;
              }
              return {
                title: ingredient,
              };
            },
          },
        }),
      ],
      group: 'details',
    }),
    defineField({
      name: 'directions',
      type: 'array',
      validation: (rule) => rule.required().min(1).error('Direction must have at least 1 direction'),
      of: [
        defineArrayMember({
          name: 'direction',
          type: 'object',
          icon: RiDirectionLine,
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'step',
              type: 'text',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'tips',
              description: 'Share if you have some tips about the step',
              type: 'text',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              step: 'step',
            },
            prepare({ title, step }) {
              return {
                title,
                subtitle: step,
              };
            },
          },
        }),
      ],
      group: 'details',
    }),

  ],
});
