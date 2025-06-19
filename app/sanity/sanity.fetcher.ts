import type { LayoutQueryResult, PageQueryResult } from './sanity.entity';

import { groq, useRoute, useSanityQuery } from '#imports';
import { pageQuery } from './sanity.query';

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
