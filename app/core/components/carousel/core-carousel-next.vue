<script setup lang="ts">
import { useCoreCarousel } from './use-core-carousel';

const { canScrollNext, scrollNext } = useCoreCarousel();
</script>

<template>
  <button
    :disabled="!canScrollNext"
    class="flex-center bg-primary color-primary-light absolute top-1/2 mr-2 size-8 touch-manipulation rounded-full p-0 -right-4 sm:mr-0 -translate-y-1/2 md:-right-12 sm:-right-8"
    @click="scrollNext"
  >
    <i
      class="i-material-symbols:chevron-right-rounded size-6"
    />
    <span class="sr-only">Next Slide</span>
  </button>
</template>
