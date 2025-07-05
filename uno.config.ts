import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { presetVinicunca } from '@vinicunca/unocss-preset-vinicunca';
import {
  defineConfig,
  presetTypography,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
// TODO: fix eslint error issue for presetCore
import { presetCore } from '~/designs/presets';

export default defineConfig({
  configDeps: getAllConfigFiles('app/designs/presets'),

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

function getAllConfigFiles(dir: string) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const dirFull = path.join(__dirname, dir);
  const files = fs.readdirSync(dirFull);
  return files.filter((file) => path.extname(file) === '.ts').map((file) => path.join(dir, file));
}
