import { vinicuncaESLint } from '@vinicunca/eslint-config';

export default vinicuncaESLint(
  {
    formatters: {
      css: true,
    },
    typescript: true,
    unocss: true,
    vue: true,
  },

  {
    rules: {
      'perfectionist/sort-objects': 'off',
      'perfectionist/sort-interfaces': 'off',
      'perfectionist/sort-classes': 'off',
    },
  },

  {
    files: ['**/sanity.entity.ts'],
    rules: {
      'ts/consistent-type-definitions': 'off',
      'ts/no-use-before-define': 'off',
      'sonar/redundant-type-aliases': 'off',
    },
  },
);
