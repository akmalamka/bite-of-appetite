<script lang="ts" setup>
import type { PickPageComponent } from '~/core/core.entity';
import { showError } from '#app';
import CoreCarouselContent from '~/core/components/carousel/core-carousel-content.vue';
import CoreCarouselItem from '~/core/components/carousel/core-carousel-item.vue';
import CoreCarouselNext from '~/core/components/carousel/core-carousel-next.vue';
import CoreCarouselPrevious from '~/core/components/carousel/core-carousel-previous.vue';
import CoreCarousel from '~/core/components/carousel/core-carousel.vue';
import { useSanityRecipes } from '~/sanity/sanity.fetcher';

defineProps<{
  data: PickPageComponent<'imageCarousel'>;
}>();

const { data: recipes } = await useSanityRecipes();

if (!recipes.value) {
  showError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  });
}
</script>

<template>
  <section class="bg-primary-light color-primary py-4 first:mt-$navbar-height md:py-8">
    <div class="flex-vertical-center gap-y-4 container">
      <h3 class="text-body-large font-500 uppercase">
        {{ data.contentReference }}
      </h3>
      <h4 class="text-h3-sm md:text-h3">
        {{ data.title }}
      </h4>
      <CoreCarousel
        class="relative w-full"
        :opts="{
          align: 'center',
          loop: true,
        }"
      >
        <CoreCarouselContent class="-ml-4 md:-ml-8">
          <CoreCarouselItem
            v-for="recipe in recipes"
            :key="recipe.title"
            class="flex-vertical basis-full items-center gap-y-4 pl-4 lg:basis-1/4 md:(basis-1/3 pl-8) sm:(basis-1/2 items-start)"
          >
            <CoreSanityImage
              :image="recipe.image"
              class="fluid-w-400-300 fluid-h-450-350 rounded-16px object-cover object-center"
            />
            <span class="text-h5 text-center font-700 md:text-start">
              {{ recipe.title }}
            </span>
          </CoreCarouselItem>
        </CoreCarouselContent>
        <CoreCarouselPrevious />
        <CoreCarouselNext />
      </CoreCarousel>
      <CoreButton
        variant="outlined"
        class="mt-4 uppercase md:mt-8"
        :to="data.ctaButton?.ctaLink"
      >
        {{ data.ctaButton?.ctaText }}
      </CoreButton>
    </div>
  </section>
</template>
