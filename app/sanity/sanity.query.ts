import { groq } from '#imports';

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
    },
  }
`;
