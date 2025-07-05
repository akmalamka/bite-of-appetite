<script lang="ts" setup>
import { CoreIngredientsAccordion } from '#components';
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
    class="grid grid-cols-1 mb-8 gap-4 md:grid-cols-2 md:mb-12"
  >
    <!-- Image and General Description -->
    <CoreSanityImage
      :image="data?.recipe?.image"
      class="col-span-1 h-100dvh object-cover object-center"
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
        <h2 class="text-sh2-sm md:text-sh2 text-center">
          {{ data?.recipe?.subtitle }}
        </h2>
        <h3 class="text-body-medium text-center">
          Time needed: {{ data?.recipe?.time }}
        </h3>
        <h4 class="text-body-small text-center italic">
          {{
            data?.recipe?.foodPhotographyBy === data?.recipe?.foodStylingBy
              ? `Food Photography and Food Styling by ${data?.recipe?.foodPhotographyBy}`
              : `Food Photography by ${data?.recipe?.foodPhotographyBy} and Food Styling by ${data?.recipe?.foodStylingBy}` }}
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

    <!-- Story -->
    <div
      v-if="data?.recipe?.story"
      class="flex-vertical-center color-primary col-span-1 my-4 gap-y-4 container md:(col-span-2 my-8 gap-y-8)"
    >
      <Separator
        class="bg-primary my-2 data-[orientation=horizontal]:(h-0.5px w-full)"
        orientation="horizontal"
      />
      <CorePortableText
        :value="data.recipe.story"
        class="md:max-w-640px"
      />
      <Separator
        class="bg-primary my-2 data-[orientation=horizontal]:(h-0.5px w-full)"
        orientation="horizontal"
      />
    </div>

    <!-- Ingredients and Directions -->
    <div class="grid col-span-1 grid-cols-1 gap-4 container md:(col-span-2 grid-cols-3 gap-8)">
      <div class="col-span-1">
        <div class="flex-vertical color-primary flex-1 items-center justify-between">
          <div class="w-full flex items-center px-5">
            <span class="text-h6-sm md:text-h6 grow">
              Ingredients
            </span>
            <span class="text-body-xs grow-0 uppercase">
              Serves {{ data?.recipe?.servings }}
            </span>
          </div>
          <Separator
            class="bg-primary my-2 data-[orientation=horizontal]:(h-1px w-full)"
            orientation="horizontal"
          />
        </div>
        <CoreIngredientsAccordion
          v-if="data?.recipe?.isIngredientWithComponent"
          :items="data?.recipe?.ingredientsWithComponent!"
        />
        <div
          v-else
          class="color-primary px-5 py-4"
        >
          <div
            v-for="ingredient in data?.recipe?.ingredientsWithoutComponent"
            :key="ingredient._key"
            class="flex flex-1 items-center justify-between py-1"
          >
            <span>
              {{ ingredient.name }}
            </span>
            <span>
              {{ ingredient.measurement }} {{ ingredient.unit }}
            </span>
          </div>
        </div>
      </div>

      <div class="col-span-1 md:col-span-2">
        <div class="flex-vertical color-primary flex-1 items-center justify-between">
          <span class="text-h6-sm md:text-h6 w-full px-5">
            Directions
          </span>
          <Separator
            class="bg-primary my-2 data-[orientation=horizontal]:(h-1px w-full)"
            orientation="horizontal"
          />
        </div>
        <CoreDirectionsAccordion
          :items="data?.recipe?.directions!"
        />
      </div>
    </div>
    <BlockImageCarousel
      :data="{
        _key: 'Try Another Recipes',
        _type: 'imageCarousel',
        title: 'Try Another Recipes',
        contentReference: 'recipes',
        ctaButton: {
          ctaText: 'View More Recipes',
          ctaLink: '/recipes',
        },
        recipes: data?.recipe?.nextRecipes!,
      }"
      class="col-span-1 md:col-span-2"
    />
  </article>
</template>
