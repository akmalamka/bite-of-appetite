import { groq } from '#imports';
import { IMAGE_ASSET_QUERY, PAGE_IMAGE_QUERY } from './image-query';

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

export const recipesQuery = groq`
  *[
    _type == 'recipes'
  ] {
    title,
    image {
      ${IMAGE_ASSET_QUERY}
    },
  }
`;
