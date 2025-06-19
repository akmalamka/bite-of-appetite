import { articlesSchema } from './articles.schema';
import { articleListSchema } from './components/article-list.schema';
import { heroImageSchema } from './components/hero-image.schema';
import { heroQuoteSchema } from './components/hero-quote.schema';
import { heroTitleSchema } from './components/hero-title.schema';
import { imageCarouselSchema } from './components/image-carousel.schema';
import { recipeListSchema } from './components/recipe-list.schema';
import { imageWithAltSchema } from './fields/image-with-alt';
import { linkSelectionSchema } from './fields/link-selection/link-selection.schema';
import { navigationMenuSchema } from './navigation-menu.schema';
import { pagesSchema } from './pages.schema';
import { recipesSchema } from './recipes.schema';
import { socialMediasSchema } from './social-medias.schema';

export const schemaTypes = [
  pagesSchema,
  navigationMenuSchema,
  recipesSchema,
  articlesSchema,
  socialMediasSchema,

  // Blocks Components
  heroTitleSchema,
  heroImageSchema,
  heroQuoteSchema,
  imageCarouselSchema,
  articleListSchema,
  recipeListSchema,

  // Custom Fields
  linkSelectionSchema,
  imageWithAltSchema,
];
