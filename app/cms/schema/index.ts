import { heroImageSchema } from './components/hero-image.schema';
import { heroQuoteSchema } from './components/hero-quote.schema';
import { heroTitleSchema } from './components/hero-title.schema';
import { imageWithAltSchema } from './fields/image-with-alt';
import { linkSelectionSchema } from './fields/link-selection/link-selection.schema';
import { headerSchema } from './header.schema';
import { navigationMenuSchema } from './navigation-menu.schema';
import { pagesSchema } from './pages.schema';
import { socialMediasSchema } from './social-medias.schema';

export const schemaTypes = [
  pagesSchema,
  navigationMenuSchema,
  socialMediasSchema,
  headerSchema,
  // Blocks Components
  heroTitleSchema,
  heroImageSchema,
  heroQuoteSchema,

  // Custom Fields
  linkSelectionSchema,
  imageWithAltSchema,
];
