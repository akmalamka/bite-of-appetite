<script lang="ts" setup>
import type { LayoutNavigationMenu } from '~/sanity/sanity.entity';
import { useIntersectionObserver } from '@vueuse/core';
import { ref } from 'vue';

defineProps<{
  data: {
    navigation: Array<LayoutNavigationMenu>;
  };
}>();

const refSentinel = ref();

const hasScrolled = ref(false);

useIntersectionObserver(
  refSentinel,
  ([elSentinel]) => {
    if (!elSentinel) {
      return;
    }

    hasScrolled.value = !elSentinel.isIntersecting;
  },
  {
    root: null,
    threshold: 0,
    // This is the height of the navbar in mobile. It's too complicated to calculate it dynamically, so we just hardcode it.
    rootMargin: '80px',
  },
);
</script>

<template>
  <header
    class="z-header fixed left-0 top-0 w-screen transition-colors,opacity-280"
    :class="{
      'bg-white': hasScrolled,
      'bg-transparent': !hasScrolled,
    }"
  >
    <div
      class="h-$navbar-height flex items-center justify-between container"
    >
      <NuxtLink
        to="/"
        aria-label="Go to homepage"
      >
        <CoreLogo
          class="color-primary h-40px transition-color-280"
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
  <div
    ref="refSentinel"
    class="absolute h-1px w-full"
  />
</template>

<style lang="postcss" scoped>
</style>
