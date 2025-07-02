<script setup lang="ts">
import type { CoreCarouselEmits, CoreCarouselProps } from './entity.carousel';

import { useProvideCoreCarousel } from './use-core-carousel';

const props = withDefaults(
  defineProps<CoreCarouselProps>(),
  {
    orientation: 'horizontal',
  },
);

const emits = defineEmits<CoreCarouselEmits>();

const {
  canScrollNext,
  canScrollPrev,
  carouselApi,
  carouselRef,
  orientation,
  scrollNext,
  scrollPrev,
} = useProvideCoreCarousel(props, emits);

defineExpose({
  canScrollNext,
  canScrollPrev,
  carouselApi,
  carouselRef,
  orientation,
  scrollNext,
  scrollPrev,
});

function onKeyDown(event: KeyboardEvent) {
  const prevKey = props.orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';
  const nextKey = props.orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';

  if (event.key === prevKey) {
    event.preventDefault();
    scrollPrev();

    return;
  }

  if (event.key === nextKey) {
    event.preventDefault();
    scrollNext();
  }
}
</script>

<template>
  <div
    class="relative"
    role="region"
    aria-roledescription="carousel"
    tabindex="0"
    @keydown="onKeyDown"
  >
    <slot
      :can-scroll-next
      :can-scroll-prev
      :carousel-api
      :carousel-ref
      :orientation
      :scroll-next
      :scroll-prev
    />
  </div>
</template>
