import { presetVinicunca } from '@vinicunca/unocss-preset-vinicunca';
import {
  defineConfig,
  presetTypography,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import { presetCore } from './app/designs/presets';

export default defineConfig({

  layers: {
    fonts: -20,
    preflights: -10,
  },

  presets: [
    presetVinicunca({
      fluidOptions: {
        minWidth: 360,
      },
      icons: {
        extraProperties: {
          'display': 'inline-block',
          'vertical-align': 'middle',
        },
        scale: 1.25,
        warn: true,
      },
    }),
    presetWind3(),
    presetCore(),
    presetTypography(),
  ],

  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
});
