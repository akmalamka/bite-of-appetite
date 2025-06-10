import { linkSelectionSchema } from './fields/link-selection/link-selection.schema';
import { headerSchema } from './header.schema';
import { navigationMenuSchema } from './navigation-menu.schema';
import { socialMediasSchema } from './social-medias.schema';

export const schemaTypes = [
  navigationMenuSchema,
  socialMediasSchema,
  headerSchema,

  // Custom Fields
  linkSelectionSchema,
];
