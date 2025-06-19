<script lang="ts" setup>
import { showError } from '#imports';

import { useSanityArticle } from '~/sanity/sanity.fetcher';

const { data } = await useSanityArticle();

if (!data.value) {
  throw showError({
    statusCode: 404,
    statusMessage: 'Article Content Not Found',
  });
}
</script>

<template>
  <article class="mt-$navbar-height">
    <div class="text-h3">
      {{ data?.article?.title }}
    </div>
  </article>
</template>
