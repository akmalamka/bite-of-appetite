<script setup lang="ts">
import { useCoreCarousel } from './use-core-carousel';

const { canScrollPrev, scrollPrev } = useCoreCarousel();
</script>

<template>
  <button
    :disabled="!canScrollPrev"
    class="flex-center bg-primary color-primary-light absolute top-1/2 ml-2 size-8 touch-manipulation rounded-full p-0 -left-4 sm:ml-0 -translate-y-1/2 md:-left-12 sm:-left-8"
    @click="scrollPrev"
  >
    <i
      class="i-material-symbols:chevron-left-rounded size-6"
    />
    <span class="sr-only">Previous Slide</span>
  </button>
</template>
