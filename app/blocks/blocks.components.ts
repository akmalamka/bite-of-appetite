import {
  LazyBlockHeroTitle,
} from '#components';
import BlockHeroImage from './components/block-hero-image.vue';

export const BLOCK_COMPONENTS = {
  heroTitle: LazyBlockHeroTitle,
  heroImage: BlockHeroImage,
};

export type BlockComponentsKeys = keyof typeof BLOCK_COMPONENTS;
