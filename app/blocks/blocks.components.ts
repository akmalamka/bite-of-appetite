import {
  LazyBlockArticleList,
  LazyBlockHeroQuote,
  LazyBlockImageCarousel,
  LazyBlockRecipeList,
} from '#components';
import BlockHeroImage from './components/block-hero-image.vue';

export const BLOCK_COMPONENTS = {
  heroImage: BlockHeroImage,
  heroQuote: LazyBlockHeroQuote,
  imageCarousel: LazyBlockImageCarousel,
  articleList: LazyBlockArticleList,
  recipeList: LazyBlockRecipeList,
};

export type BlockComponentsKeys = keyof typeof BLOCK_COMPONENTS;
