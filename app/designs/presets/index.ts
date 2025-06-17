import type { Preset } from 'unocss';
import type { Theme } from 'unocss/preset-uno';
import { preflightFont } from './font.preset';

const INTER_STR = 'Inter, sans-serif';
const RECOLETA_ALT_STR = 'Recoleta Alt, serif';
const YOURNOTES_STR = 'Yournotes, sans-serif';

export function presetCore(): Preset<Theme> {
  return {
    name: 'preset-core',
    preflights: [
      preflightFont,
    ],

    theme: {
      container: {
        center: true,
        padding: '1rem',
      },

      fontFamily: {
        inter: INTER_STR,
        recoletaAlt: RECOLETA_ALT_STR,
        yournotes: YOURNOTES_STR,
      },

      fontSize: {
        // Desktop
        'h1': ['150px', { 'font-family': RECOLETA_ALT_STR, 'font-weight': '700' }],
        'h4': ['54px', { 'font-family': RECOLETA_ALT_STR, 'font-weight': '600' }],
        'h5': ['30px', { 'font-family': RECOLETA_ALT_STR, 'font-weight': '600' }],
        'h5-accent': ['30px', { 'font-family': YOURNOTES_STR, 'font-weight': '400' }],
        'h6': ['20px', { 'font-family': RECOLETA_ALT_STR, 'font-weight': '600' }],
        'body-large': ['18px', { 'font-family': INTER_STR }],
        'body-medium': ['16px', { 'line-height': '28px', 'font-family': INTER_STR }],
        'body-small': ['14px', { 'font-family': INTER_STR }],
        'button': ['14px', { 'text-transform': 'uppercase', 'font-family': INTER_STR }],

        // Mobile
        'h1-sm': ['80px', { 'font-family': RECOLETA_ALT_STR, 'font-weight': '700' }],
        'h4-sm': ['40px', { 'font-family': RECOLETA_ALT_STR, 'font-weight': '600' }],
        'h5-sm': ['25px', { 'font-family': RECOLETA_ALT_STR, 'font-weight': '600' }],
        'h6-sm': ['18px', { 'font-family': INTER_STR }],
      },

      zIndex: {
        background: '-10',
        base: '0',
        content: '10',
        header: '20',
        dialog: '30',
      },

      colors: {
        primary: {
          DEFAULT: '#664014',
          light: '#E9E5DA',
        },
        secondary: {
          DEFAULT: '#99A85A',
        },
        white: '#FFFFFF',
        black: '#000000',
        red: '#FF8361',
        green: '#92A64E',
      },
    },

    shortcuts: [
      {
        'wh-full': 'w-full h-full',
      },
      {
        'flex-center': 'flex justify-center items-center',
        'flex-vertical-center': 'flex flex-col justify-center items-center',
        'flex-vertical': 'flex flex-col',
        'flex-y-center': 'flex items-center',
      },
      {
        'offsetted-underline': 'underline underline-offset-3',
      },
    ],
  };
}
