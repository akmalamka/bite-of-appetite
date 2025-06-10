<script lang="ts" setup>
import type { LayoutNavigationMenu, SocialMedias } from '~/sanity/sanity.entity';

withDefaults(defineProps<{
  data: {
    navigation: Array<LayoutNavigationMenu>;
    socials: null | SocialMedias['socials'];
  };
  hasErrors?: boolean;
}>(), {
  hasErrors: false,
});
</script>

<template>
  <header
    class="z-header fixed left-0 top-0 w-screen transition-colors,opacity-280"
  >
    <div
      class="h-$navbar-height flex items-center justify-between container lg:(grid grid-cols-12)"
    >
      <NuxtLink
        to="/"
        aria-label="Go to homepage"
        class="lg:(col-span-2)"
      >
        <CoreLogo
          class="h-60px transition-color-280"
        />
      </NuxtLink>

      <div
        class="links-container hidden items-center justify-center gap-x-8 lg:(col-span-7) md:(flex flex-1)"
      >
        <NuxtLink
          v-for="menu in data.navigation"
          :key="menu._id"
          :to="menu.link"
          class="text-body-large transition-colors-280"
          active-class=" decoration-1 offsetted-underline"
        >
          {{ menu.text }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<style lang="postcss" scoped>
</style>
