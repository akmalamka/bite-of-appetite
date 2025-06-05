import process from 'node:process';

const BASE_URL = 'https://biteofappetite.com';

export default defineNuxtConfig({
  // app: {
  //   head: {
  //     link: [
  //       {
  //         href: '/favicons/apple-touch-icon.png',
  //         rel: 'apple-touch-icon',
  //         sizes: '180x180',
  //       },
  //       {
  //         href: '/favicons/favicon-32x32.png',
  //         rel: 'icon',
  //         sizes: '32x32',
  //         type: 'image/png',
  //       },
  //       {
  //         href: '/favicons/favicon-16x16.png',
  //         rel: 'icon',
  //         sizes: '16x16',
  //         type: 'image/png',
  //       },
  //       {
  //         href: '/favicons/site.webmanifest',
  //         rel: 'manifest',
  //       },
  //       {
  //         color: '#5bbad5',
  //         href: '/favicons/safari-pinned-tab.svg',
  //         rel: 'mask-icon',
  //       },
  //     ],
  //     meta: [
  //       { content: '#411f3a', name: 'msapplication-TileColor' },
  //       { content: '#411f3a', name: 'theme-color' },
  //       { content: `${BASE_URL}/images/og-image.jpg`, name: 'og:image' },
  //     ],

  //     templateParams: {
  //       separator: '|',
  //     },

  //     titleTemplate: '%s %separator %siteName',
  //   },
  // },

  site: {
    url: BASE_URL,
    name: 'Bite of Appetite',
    defaultLocale: 'en',
    description: 'Bite of Appetite is a food blog made by Akmal',
  },

  image: {
    format: ['webp'],
  },

  compatibilityDate: '2025-06-05',

  components: {
    dirs: [
      './core/components',
    ],
  },

  // css: [
  //   '~/designs/styles/index.css',
  // ],

  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  imports: {
    autoImport: false,
  },

  modules: ['@unocss/nuxt', '@nuxtjs/sanity', '@nuxt/image'],

  postcss: {
    plugins: {
      'postcss-nested': {},
    },
  },

  nitro: {
    firebase: {
      gen: 2,
      httpsOptions: {
        maxInstances: 3,
        region: 'asia-east1',
      },
      nodeVersion: '20',
      serverFunctionName: `server_${process.env.DEPLOY_ENV}`,
    },
    preset: 'firebase',
  },

  sanity: {
    apiVersion: process.env.NUXT_SANITY_API_VERSION || '2024-03-15',
    dataset: process.env.NUXT_SANITY_DATASET,
    projectId: process.env.NUXT_SANITY_PROJECT_ID,
    useCdn: process.env.NODE_ENV === 'production',
    // visualEditing: {
    //   stega: true,
    //   studioUrl: process.env.NUXT_SANITY_STUDIO_URL || 'http://localhost:3333',
    //   token: process.env.NUXT_SANITY_API_READ_TOKEN,
    // },
    // TODO: add visual editing
  },

  typescript: {
    typeCheck: process.env.NODE_ENV === 'development',
  },
});
