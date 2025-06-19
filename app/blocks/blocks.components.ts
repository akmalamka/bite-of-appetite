import {
  LazyBlockArticleList,
  LazyBlockHeroQuote,
  LazyBlockHeroTitle,
  LazyBlockImageCarousel,
} from '#components';
import BlockHeroImage from './components/block-hero-image.vue';

export const BLOCK_COMPONENTS = {
  heroTitle: LazyBlockHeroTitle,
  heroImage: BlockHeroImage,
  heroQuote: LazyBlockHeroQuote,
  imageCarousel: LazyBlockImageCarousel,
  articleList: LazyBlockArticleList,
};

export type BlockComponentsKeys = keyof typeof BLOCK_COMPONENTS;
