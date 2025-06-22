<script lang="ts" setup>
import { showError } from '#imports';
import { Separator } from 'radix-vue';
import { useDateFormatter } from '~/core/composables/use-date-formatter';
import { useSanityRecipe } from '~/sanity/sanity.fetcher';

const { data } = await useSanityRecipe();

if (!data.value) {
  throw showError({
    statusCode: 404,
    statusMessage: 'Recipe Content Not Found',
  });
}

const { formatDate } = useDateFormatter();
</script>

<template>
  <article
    class="grid grid-cols-1 md:grid-cols-2"
  >
    <CoreSanityImage
      :image="data?.recipe?.image"
      class="col-span-1 h-75dvh object-cover object-center md:(size-full max-h-full)"
    />
    <div
      class="color-primary col-span-1"
    >
      <div
        class="flex-vertical size-full items-center justify-around gap-y-4 py-8 container md:(px-8 pb-8) first:pt-$navbar-height"
      >
        <span class="text-body-medium uppercase">Recipes</span>
        <h1 class="text-h4-sm md:text-h4 text-center">
          {{ data?.recipe?.title }}
        </h1>
        <h3 class="text-body-medium text-center">
          Time needed: {{ data?.recipe?.time }}
        </h3>
        <h4 class="text-body-small text-center italic">
          {{
            data?.recipe?.foodPhotographyBy === data?.recipe?.foodStylingBy
              ? `Food Photography and Food Styling by ${data?.recipe?.foodPhotographyBy}` : `Food Photography by ${data?.recipe?.foodPhotographyBy} and Food Styling by ${data?.recipe?.foodStylingBy}` }}
        </h4>
        <div class="flex-vertical-center gap-y-4 md:gap-y-8">
          <div class="flex justify-between text-center">
            <h5 class="text-body-small self-center uppercase">
              By {{ data?.recipe?.recipeBy }}
            </h5>
            <Separator
              v-if="data?.recipe?.inspiredBy"
              class="bg-primary mx-[15px] data-[orientation=vertical]:w-2px"
              orientation="vertical"
            />
            <h5
              v-if="data?.recipe?.inspiredBy"
            >
              Inspired by <CorePortableText
                v-if="data?.recipe?.inspiredBy"
                :value="data.recipe.inspiredBy"
                class="md:max-w-640px"
                text-size="small"
              />
            </h5>
          </div>
          <h6
            v-if="data?.recipe?.publishedDate"
            class="text-body-medium font-500 uppercase"
          >
            {{ formatDate(data?.recipe?.publishedDate, { dateStyle: 'long' }) }}
          </h6>
        </div>
      </div>
    </div>
    <div class="flex-vertical-center color-primary col-span-1 my-4 gap-y-4 container md:(col-span-2 my-8 gap-y-8)">
      <Separator
        class="bg-primary my-[15px] data-[orientation=horizontal]:(h-2px w-full)"
        orientation="horizontal"
      />
      <CorePortableText
        v-if="data?.recipe?.story"
        :value="data.recipe.story"
        class="mb-24px md:max-w-640px"
      />
      <Separator
        class="bg-primary my-[15px] data-[orientation=horizontal]:(h-2px w-full)"
        orientation="horizontal"
      />
    </div>
  </article>
</template>
