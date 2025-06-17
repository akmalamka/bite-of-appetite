import {
  LazyBlockHeroQuote,
  LazyBlockHeroTitle,
} from '#components';
import BlockHeroImage from './components/block-hero-image.vue';

export const BLOCK_COMPONENTS = {
  heroTitle: LazyBlockHeroTitle,
  heroImage: BlockHeroImage,
  heroQuote: LazyBlockHeroQuote,
};

export type BlockComponentsKeys = keyof typeof BLOCK_COMPONENTS;
