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
        'h2': ['54px', { 'font-family': RECOLETA_ALT_STR, 'font-weight': '600' }],
        'h3': ['44px', { 'font-family': RECOLETA_ALT_STR, 'font-weight': '600' }],
        'h4': ['30px', { 'font-family': RECOLETA_ALT_STR, 'font-weight': '600' }],
        'h4-accent': ['30px', { 'font-family': YOURNOTES_STR, 'font-weight': '400' }],
        'h5': ['24px', { 'font-family': RECOLETA_ALT_STR, 'font-weight': '300' }],
        'h6': ['20px', { 'font-family': RECOLETA_ALT_STR, 'font-weight': '600' }],
        'sh1': ['24px', { 'font-family': INTER_STR }],
        'sh2': ['20px', { 'font-family': INTER_STR }],
        'body-large': ['18px', { 'line-height': '28px', 'font-family': INTER_STR }],
        'body-medium': ['16px', { 'line-height': '28px', 'font-family': INTER_STR }],
        'body-small': ['14px', { 'font-family': INTER_STR }],
        'body-xs': ['12px', { 'font-family': INTER_STR }],
        'button': ['14px', { 'text-transform': 'uppercase', 'font-family': INTER_STR }],

        // Mobile
        'h1-sm': ['80px', { 'font-family': RECOLETA_ALT_STR, 'font-weight': '700' }],
        'h2-sm': ['40px', { 'font-family': RECOLETA_ALT_STR, 'font-weight': '600' }],
        'h3-sm': ['30px', { 'font-family': RECOLETA_ALT_STR, 'font-weight': '600' }],
        'h4-accent-sm': ['25px', { 'font-family': YOURNOTES_STR, 'font-weight': '400' }],
        'h4-sm': ['25px', { 'font-family': RECOLETA_ALT_STR, 'font-weight': '600' }],
        'h5-sm': ['20px', { 'font-family': RECOLETA_ALT_STR, 'font-weight': '300' }],
        'h6-sm': ['18px', { 'font-family': INTER_STR }],
        'sh1-sm': ['20px', { 'font-family': INTER_STR }],
        'sh2-sm': ['18px', { 'font-family': INTER_STR }],
        'body-large-sm': ['16px', { 'font-family': INTER_STR }],
      },

      zIndex: {
        background: '-10',
        base: '0',
        content: '10',
        popover: '20',
        header: '30',
        dialog: '40',
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
        green: '#A7B264',
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
