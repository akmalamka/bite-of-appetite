import { slugify } from '@vinicunca/perkakas';
import { RiPagesLine } from 'react-icons/ri';
import { defineField, defineType } from 'sanity';
import { componentMembers } from './components';
import { isUniqueAcrossAllDocuments } from './utils/is-unique-sanity';

const seoSchemas = [
  defineField({
    name: 'title',
    title: 'Site Title',
    description: 'The title of the site',
    type: 'string',
    group: 'seo',
  }),

  defineField({
    name: 'url',
    title: 'URL',
    type: 'slug',
    group: 'seo',
    validation: (rule) => [
      rule.required(),
      rule.custom((slug) => {
        if (!slug?.current?.startsWith('/')) {
          return 'URL must start with a forward slash';
        }

        return true;
      }),
    ],
    options: {
      source: 'title',
      slugify: (str) => `/${slugify(str)}`,
      isUnique: isUniqueAcrossAllDocuments,
    },
  }),

  defineField({
    name: 'description',
    title: 'Site Description',
    description: 'The description of the site, useful for SEO',
    type: 'text',
    group: 'seo',
  }),

  defineField({
    name: 'ogImage',
    title: 'Social Media Preview Image',
    description: 'This image will appear when your website link is shared on social media platforms.',
    type: 'image',
    group: 'seo',
  }),
];

const componentsSchemas = [
  defineField({
    name: 'components',
    type: 'array',
    group: 'components',
    of: componentMembers,
  }),
];

export const pagesSchema = defineType({
  name: 'pages',
  type: 'document',
  icon: RiPagesLine,
  groups: [
    {
      name: 'components',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    ...seoSchemas,
    ...componentsSchemas,
    defineField({
      name: 'navigationTextColor',
      type: 'simplerColor',
      options: {
        colorList: [
          /**
           * ! Do not remove `unoClass`.
           * We need the unoClass to be able to set the background color of the next element of the divider.
           * For reference, see `app/block/components/block-divider.vue`.
           */
          { label: 'Primary', value: '#664014', unoClass: 'color-primary' },
          { label: 'Primary Light', value: '#E9E5DA', unoClass: 'color-primary-light' },
        ],
      },
      validation: (rule) => [
        rule.required(),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      path: 'url.current',
      media: 'ogImage',
    },
    prepare({ title, path, media }) {
      return {
        title,
        subtitle: path,
        media,
      };
    },
  },
});
