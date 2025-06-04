import type { Header } from './sanity.entity';

import { groq, useSanityQuery } from '#imports';

export function useSanityHeader() {
  const pageQuery = groq`
    *[
      _type == 'header'
    ][0]
  `;

  return useSanityQuery<Header>(pageQuery);
}
