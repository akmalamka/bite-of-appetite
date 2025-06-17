<script lang="ts" setup>
import { useSanityLayoutFetcher } from '~/sanity/sanity.fetcher';

import LayoutFooter from './components/layout-footer.vue';
import LayoutNavigationMenu from './components/layout-navigation-menu.vue';

const { data } = await useSanityLayoutFetcher();
</script>

<template>
  <NuxtLoadingIndicator
    color="black"
    :height="5"
  />

  <LayoutNavigationMenu
    :data="{
      navigation: data!.navigation,
      socials: data!.socials,
    }"
  />

  <main class="z-content">
    <slot />
  </main>

  <LayoutFooter
    :data="{
      socials: data!.socials,
      navigation: data!.navigation,
    }"
  />
</template>
