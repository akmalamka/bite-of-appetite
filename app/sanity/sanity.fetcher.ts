import type { LayoutQueryResult, PageQueryResult, RecipesQueryResult } from './sanity.entity';

import { groq, useRoute, useSanityQuery } from '#imports';
import { pageQuery, recipesQuery } from './sanity.query';

export function useSanityLayoutFetcher() {
  const layoutQuery = groq`
    {
      'socials': *[_type == 'socialMedias'][0].socials,
      'navigation': *[
        _type == 'layoutNavigationMenu'
      ] | order(order asc)
    }
  `;

  return useSanityQuery<LayoutQueryResult>(layoutQuery);
}

export function useSanityPage() {
  const route = useRoute();

  return useSanityQuery<PageQueryResult>(pageQuery, {
    slug: route.path,
  });
}

export function useSanityRecipes() {
  return useSanityQuery<RecipesQueryResult>(recipesQuery);
}
