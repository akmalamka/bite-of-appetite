<!-- eslint-disable sonar/no-commented-code -->
<script lang="ts" setup>
// import { useError } from '#app';

// import { useSanityLayoutFetcher } from '~/sanity/sanity.fetcher';

// import LayoutFooter from './components/layout-footer.vue';
// import LayoutNavigationMenu from './components/layout-navigation-menu.vue';

// const error = useError();

// const { data } = await useSanityLayoutFetcher();
</script>

<template>
  <NuxtLoadingIndicator
    color="black"
    :height="5"
  />

  <!-- <LayoutNavigationMenu
    :data="{
      navigation: data!.navigation,
      socials: data!.socials,
    }"
    :has-errors="!!error"
  /> -->

  <main class="main z-content relative min-h-[100dvh] bg-white dark:bg-black">
    <slot />
  </main>

  <!-- <LayoutFooter
    :data="{ footer: data!.footer, socials: data!.socials }"
  /> -->
</template>
