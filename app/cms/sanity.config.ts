/* eslint-disable node/prefer-global/process */
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { media } from 'sanity-plugin-media';
import { simplerColorInput } from 'sanity-plugin-simpler-color-input';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';

import { schemaTypes } from './schema';

export const projectId = process.env.SANITY_STUDIO_PROJECT_ID as string;
export const dataset = process.env.SANITY_STUDIO_DATASET as string;

export default defineConfig({
  name: 'default',
  title: 'biteofappetite',

  projectId,
  dataset,

  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000',
        previewMode: {
          enable: '/preview/enable',
          disable: '/preview/disable',
        },
      },
    }),
    visionTool(),
    media(),
    simplerColorInput({
      defaultColorFormat: 'rgba',
      defaultColorList: [
        { label: 'Primary Base', value: '#664014' },
        { label: 'Primary Light', value: '#E9E5DA' },
      ],
      enableSearch: true,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
