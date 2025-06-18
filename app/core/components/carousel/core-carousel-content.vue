<script setup lang="ts">
import { useCoreCarousel } from './use-core-carousel';

defineOptions({
  inheritAttrs: false,
});

const { carouselRef, orientation } = useCoreCarousel();
</script>

<template>
  <div
    ref="carouselRef"
    class="overflow-hidden"
  >
    <div
      class="flex"
      :class="{
        '-ml-4': orientation === 'horizontal',
        '-mt-4 flex-col': orientation === 'vertical',
      }"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </div>
</template>
