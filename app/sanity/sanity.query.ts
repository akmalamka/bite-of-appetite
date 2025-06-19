import { groq } from '#imports';
import { IMAGE_ASSET_QUERY } from './image-query';

const COMPONENT_IMAGE_CAROUSEL = `
  _type == 'imageCarousel' => {
    ...,
    'recipes': *[
      _type == 'recipes'
    ] | order(date desc) [0...8] {
      _id,
      title,
      subtitle,
      image {
        ${IMAGE_ASSET_QUERY}
      },
    },
  }
`;

const COMPONENT_ARTICLE_LIST = `
  _type == 'articleList' => {
    ...,
    'articles': *[
      _type == 'articles'
    ] | order(date desc) [0...5] {
      _id,
      slug,
      title,
      subtitle,
      image {
        ${IMAGE_ASSET_QUERY}
      },
    },
    'totalArticles': count(*[_type == 'articles']),
  }
`;

const COMPONENT_RECIPE_LIST = `
  _type == 'recipeList' => {
    ...,
    'recipes': *[
      _type == 'recipes'
    ] | order(date desc) [0...5] {
      _id,
      slug,
      title,
      subtitle,
      image {
        ${IMAGE_ASSET_QUERY}
      },
    },
    'totalRecipes': count(*[_type == 'recipes']),
  }
`;

export const COMPONENT_HERO_IMAGE = `
  _type == 'heroImage' => {
    ...,
    image {
      ${IMAGE_ASSET_QUERY}
    },
  }
`;

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

      ${COMPONENT_IMAGE_CAROUSEL},

      ${COMPONENT_ARTICLE_LIST},

      ${COMPONENT_RECIPE_LIST},

      ${COMPONENT_HERO_IMAGE},

    },
  }
`;

export const paginatedArticlesQuery = groq`
  *[_type == 'articles'] | order(date desc) [$start...$end] {
    _id,
    slug,
    title,
    subtitle,
    image {
      ${IMAGE_ASSET_QUERY}
    },
  }
`;

export const paginatedRecipesQuery = groq`
  *[_type == 'recipes'] | order(date desc) [$start...$end] {
    _id,
    slug,
    title,
    subtitle,
    image {
      ${IMAGE_ASSET_QUERY}
    },
  }
`;

export const articleQuery = groq`
  {
    'article': *[
      _type == 'articles'
      && slug.current == $slug
    ][0] {
      _id,
      title,
      subtitle,
      image {
        ${IMAGE_ASSET_QUERY}
      },
    },
  }
`;

export const recipeQuery = groq`
  {
    'recipe': *[
      _type == 'recipes'
      && slug.current == $slug
    ][0] {
      _id,
      title,
      subtitle,
      image {
        ${IMAGE_ASSET_QUERY}
      },
    },
  }
`;
