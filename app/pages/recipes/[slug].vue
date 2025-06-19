<script lang="ts" setup>
import { showError } from '#imports';

import { useSanityRecipe } from '~/sanity/sanity.fetcher';

const { data } = await useSanityRecipe();

if (!data.value) {
  throw showError({
    statusCode: 404,
    statusMessage: 'Recipe Content Not Found',
  });
}
</script>

<template>
  <article class="mt-$navbar-height">
    <div class="text-h3">
      {{ data?.recipe?.title }}
    </div>
  </article>
</template>
