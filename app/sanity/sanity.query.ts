import { groq } from '#imports';
import { PAGE_IMAGE_QUERY } from './image-query';

export const pageQuery = groq`
  *[
    _type == 'pages'
    && url.current == $slug
  ][0] {
    title,
    description,
    ogImage,
    components[] {
      ...,
      ${PAGE_IMAGE_QUERY}
    },
  }
`;
