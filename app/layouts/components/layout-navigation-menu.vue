<script lang="ts" setup>
import type { LayoutNavigationMenu } from '~/sanity/sanity.entity';

defineProps<{
  data: {
    navigation: Array<LayoutNavigationMenu>;
  };
}>();
</script>

<template>
  <header
    class="z-header fixed left-0 top-0 w-screen transition-colors,opacity-280"
  >
    <div
      class="h-$navbar-height flex items-center justify-between container"
    >
      <NuxtLink
        to="/"
        aria-label="Go to homepage"
      >
        <CoreLogo
          class="color-primary h-60px transition-color-280"
        />
      </NuxtLink>

      <div
        class="hidden items-center justify-center gap-x-8 md:flex"
      >
        <NuxtLink
          v-for="menu in data.navigation"
          :key="menu._id"
          :to="menu.link"
          class="color-primary-light text-h6 transition-colors-280"
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
