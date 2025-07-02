import type {
  UnwrapRefCoreCarouselApi as CarouselApi,
  CoreCarouselEmits,
  CoreCarouselProps,
} from './entity.carousel';
import { createInjectionState } from '@vueuse/core';
import emblaCarouselVue from 'embla-carousel-vue';

import { onMounted, ref } from 'vue';

const [
  useProvideCoreCarousel,
  useInjectCoreCarousel,
] = createInjectionState(
  ({
    opts,
    orientation,
    plugins,
  }: CoreCarouselProps, emits: CoreCarouselEmits) => {
    const [emblaNode, emblaApi] = emblaCarouselVue({
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    }, plugins);

    function scrollPrev() {
      emblaApi.value?.scrollPrev();
    }

    function scrollNext() {
      emblaApi.value?.scrollNext();
    }

    const canScrollNext = ref(false);
    const canScrollPrev = ref(false);

    function onSelect(api: CarouselApi) {
      canScrollNext.value = api?.canScrollNext() || false;
      canScrollPrev.value = api?.canScrollPrev() || false;
    }

    onMounted(() => {
      if (!emblaApi.value) {
        return;
      }

      emblaApi.value?.on('init', onSelect);
      emblaApi.value?.on('reInit', onSelect);
      emblaApi.value?.on('select', onSelect);

      emits('init-api', emblaApi.value);
    });

    return {
      carouselRef: emblaNode,
      carouselApi: emblaApi,
      canScrollPrev,
      canScrollNext,
      scrollPrev,
      scrollNext,
      orientation,
    };
  },
);

function useCoreCarousel() {
  const carouselState = useInjectCoreCarousel();

  if (!carouselState) {
    throw new Error('useCoreCarousel must be used within a <CoreCarousel />');
  }

  return carouselState;
}

export { useCoreCarousel, useProvideCoreCarousel };
