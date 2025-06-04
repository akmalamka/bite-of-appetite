import {
  defineConfig,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

// import { presetCore } from './app/designs/presets';

export default defineConfig({
  // configDeps: getAllConfigFiles('app/designs/presets'),

  layers: {
    fonts: -30,
    preflights: -10,
  },

  presets: [
    // presetVinicunca({
    //   fluidOptions: {
    //     minWidth: 360,
    //   },
    //   icons: {
    //     extraProperties: {
    //       'display': 'inline-block',
    //       'vertical-align': 'middle',
    //     },
    //     scale: 1.25,
    //     warn: true,
    //   },
    // }),
    presetUno(),
    // presetCore(),
    presetTypography({
      cssExtend: {
        'h1': {
          /**
           * Since the title of the article is separated by the grid's gap,
           *  we need to remove the margin.
           */
          margin: '0',
        },

        'blockquote': {
          'margin-top': '3rem',
          'margin-bottom': '3rem',
          'padding': '0.5rem 1rem',
          'font-size': '1.7em',
          'font-style': 'italic',
          'border-left-width': '0.25rem',
        },

        'h5+p': {
          'margin-top': '0.25rem',
        },
      },
    }),
  ],

  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
});
