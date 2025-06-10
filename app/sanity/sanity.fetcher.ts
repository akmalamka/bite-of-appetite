import type { Header, LayoutQueryResult } from './sanity.entity';

import { groq, useSanityQuery } from '#imports';

export function useSanityLayoutFetcher() {
  const layoutQuery = groq`
    {
      'footer': *[_type == 'layoutFooter'][0],
      'socials': *[_type == 'socialMedias'][0].socials,
      'navigation': *[
        _type == 'layoutNavigationMenu'
      ] | order(order asc)
    }
  `;

  return useSanityQuery<LayoutQueryResult>(layoutQuery);
}

export function useSanityHeader() {
  const pageQuery = groq`
    *[
      _type == 'header'
    ][0]
  `;

  return useSanityQuery<Header>(pageQuery);
}
