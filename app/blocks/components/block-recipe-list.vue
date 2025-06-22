<script lang="ts" setup>
import type { PickPageComponent } from '~/core/core.entity';
import type { PaginatedRecipesQueryResult } from '~/sanity/sanity.entity';
import { navigateTo, useSanityQuery } from '#imports';
import { ref, watch } from 'vue';
import { paginatedRecipesQuery } from '~/sanity/sanity.query';

const { data } = defineProps<{
  data: PickPageComponent<'recipeList'>;
}>();

const displayedRecipes = ref(data.recipes || []);

const currentPage = ref(1);

const isLoading = ref(false);

const ITEMS_PER_PAGE = 5;

const currentOffset = ref(ITEMS_PER_PAGE);

const recipeListRef = ref<HTMLElement>();

async function loadRecipes() {
  isLoading.value = true;
  try {
    const { data } = await useSanityQuery<PaginatedRecipesQueryResult>(
      paginatedRecipesQuery,
      {
        start: currentOffset.value,
        end: currentOffset.value + ITEMS_PER_PAGE,
      },
    );

    if (data.value) {
      displayedRecipes.value = data.value;
      currentOffset.value += ITEMS_PER_PAGE;
    }
  } catch (error: any) {
    throw new Error('Failed to load articles', { cause: error });
  } finally {
    isLoading.value = false;
  }
}

watch(currentPage, async (newPage: number) => {
  currentOffset.value = (newPage - 1) * ITEMS_PER_PAGE;

  await loadRecipes();
});
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
      :total-items="data.totalRecipes"
      :items-per-page="ITEMS_PER_PAGE"
      :top-pagination-ref="recipeListRef"
    />
  </section>
</template>
