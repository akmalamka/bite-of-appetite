import {
  LazyBlockHeroTitle,
} from '#components';

export const BLOCK_COMPONENTS = {
  heroTitle: LazyBlockHeroTitle,
};

export type BlockComponentsKeys = keyof typeof BLOCK_COMPONENTS;
