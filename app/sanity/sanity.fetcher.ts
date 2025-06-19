import type { ArticleQueryResult, LayoutQueryResult, PageQueryResult, RecipeQueryResult } from './sanity.entity';

import { groq, useRoute, useSanityQuery } from '#imports';
import { articleQuery, pageQuery, recipeQuery } from './sanity.query';

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

export function useSanityArticle() {
  const route = useRoute();

  return useSanityQuery<ArticleQueryResult>(articleQuery, {
    slug: route.params.slug,
  });
}

export function useSanityRecipe() {
  const route = useRoute();

  return useSanityQuery<RecipeQueryResult>(recipeQuery, {
    slug: route.params.slug,
  });
}
