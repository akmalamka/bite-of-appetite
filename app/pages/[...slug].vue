<script lang="ts" setup>
import { showError, useHead } from '#imports';
import { BLOCK_COMPONENTS, type BlockComponentsKeys } from '~/blocks/blocks.components';

import { useSanityPage } from '~/sanity/sanity.fetcher';

const { data } = await useSanityPage();

if (!data.value) {
  showError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  });
}

useHead({
  title: data.value?.title,
});
</script>

<template>
  <component
    :is="BLOCK_COMPONENTS[component._type as BlockComponentsKeys]"
    v-for="component in data?.components"
    :key="component._key"
    :data="component as any"
  />
</template>
