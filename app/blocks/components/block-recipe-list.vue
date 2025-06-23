<script lang="ts" setup>
import type { PickPageComponent } from '~/core/core.entity';
import { navigateTo } from '#imports';
import { computed, ref } from 'vue';

const { data } = defineProps<{
  data: PickPageComponent<'recipeList'>;
}>();
const ITEMS_PER_PAGE = 2;

const currentPage = ref(1);

const isLoading = ref(false);

const search = ref('');

const filteredRecipes = computed(() => {
  const filtered = data.recipes.filter(
    (recipe) => {
      const hasText = recipe.title?.toLowerCase().includes(search.value.toLowerCase());
      return hasText;
    },
  ) ?? [];
  return filtered;
});

const displayedRecipes = computed(() => {
  return filteredRecipes.value.slice(
    (currentPage.value - 1) * ITEMS_PER_PAGE,
    currentPage.value * ITEMS_PER_PAGE,
  );
});

const recipeListRef = ref<HTMLElement>();
</script>

<template>
  <CoreLoadingScreen
    v-if="isLoading"
    ref="recipeListRef"
  />
  <section
    v-else
    ref="recipeListRef"
    class="flex-vertical-center mb-8 gap-y-4 first:mt-$navbar-height"
  >
    <CoreHeroTitle :title=" data.title">
      <template #prepend>
        <CoreSearchBar
          v-model="search"
          class-wrapper="flex-1 bg-primary-light"
          placeholder="Try 'scrambled egg'"
        />
      </template>
    </CoreHeroTitle>
    <template v-if="filteredRecipes.length > 0">
      <ul class="flex-vertical-center gap-y-4 container md:gap-y-8">
        <li
          v-for="(recipe, index) in displayedRecipes"
          :key="recipe._id"
          class="grid grid-cols-1 items-center justify-center justify-items-center gap-4 md:grid-cols-2 md:gap-8"
        >
          <div
            class="flex-vertical-center gap-y-4 text-center"
            :class="{
              'order-2 md:order-1': index % 2 === 0,
              'order-2 md:order-2': index % 2 !== 0,
            }"
          >
            <div class="flex gap-2">
              <CoreChip
                v-for="category in recipe.categories"
                :key="category._id"
              >
                {{ category.title }}
              </CoreChip>
            </div>
            <h2 class="text-h3-sm color-primary md:text-h3 font-700">
              {{ recipe.title }}
            </h2>
            <h3 class="text-body-medium color-primary">
              {{ recipe.subtitle }}
            </h3>
            <CoreButton
              variant="filled"
              :to="`/recipes/${recipe.slug.current}`"
            >
              See Recipe
            </CoreButton>
          </div>
          <CoreSanityImage
            :image="recipe.image"
            class="size-75% cursor-pointer rounded-12px object-cover object-center transition-transform duration-280 md:size-85% hover:scale-105"
            :class="{
              'order-1 md:order-2': index % 2 === 0,
              'order-1 md:order-1': index % 2 !== 0,
            }"
            @click="navigateTo(`/recipes/${recipe.slug.current}`)"
          />
        </li>
      </ul>
      <CorePagination
        v-model:page="currentPage"
        :disabled="isLoading"
        :total-items="filteredRecipes.length"
        :items-per-page="ITEMS_PER_PAGE"
        :top-pagination-ref="recipeListRef"
      />
    </template>
    <div
      v-else
      class="flex-vertical-center color-primary relative my-4 gap-y-4 container md:my-8"
    >
      <NuxtImg
        src="/images/ceramic-glass.svg"
        alt="ceramic glass"
        class="z-background fluid-h-140-177 fluid-right-180-220 absolute hidden rotate-30 -fluid-top-0-14 md:block"
      />
      <span class="text-h2-sm md:text-h2">
        Oops!
      </span>
      <span class="text-sh1-sm md:text-sh1 text-center">
        Sorry, looks like there's no such recipe you're looking for :(
      </span>
    </div>
  </section>
</template>
