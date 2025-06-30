<script lang="ts" setup>
import type { Category, PickPageComponent } from '~/core/core.entity';
import { navigateTo } from '#imports';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useIsDesktop } from '~/core/composables/use-is-desktop';

const { data } = defineProps<{
  data: PickPageComponent<'recipeList'>;
}>();
const ITEMS_PER_PAGE = 2;

const route = useRoute();
const isDesktop = useIsDesktop();

const currentPage = ref(1);

const isLoading = ref(false);

const search = ref('');

const draftCategories = ref<Array<Category>>([]);
const selectedCategories = ref<Array<Category>>([]);

const applyFilter = ref(false);

const isDrawerOpen = ref(false);

const isPopoverOpen = ref(false);

const filteredRecipes = computed(() => {
  const filtered = data.recipes.filter(
    (recipe) => {
      const hasText = recipe.title?.toLowerCase().includes(search.value.toLowerCase());
      const recipeCategoryIds = new Set(recipe.categories.map((cat) => cat._id));
      const isAllCategorySelected = selectedCategories.value.every((selCat) => recipeCategoryIds.has(selCat._id));
      return hasText && (isAllCategorySelected || selectedCategories.value.length === 0);
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

function onCloseChip(category: Category) {
  selectedCategories.value = selectedCategories.value.filter((item) => item._id !== category._id);
  draftCategories.value = draftCategories.value.filter((item) => item._id !== category._id);
}

function onApplyFilter() {
  applyFilter.value = !applyFilter.value;
  isDrawerOpen.value = false;
}

function onClearAll() {
  selectedCategories.value = [];
  draftCategories.value = [];
}

watch(applyFilter, () => {
  selectedCategories.value = [...draftCategories.value];
  applyFilter.value = false;
});

/* We need to close the mobile menu if screensize is larger than md (768px), and close the popover if screensize is lower than md (768px) */
watch(
  isDesktop,
  (isDesktop_) => {
    if (isDesktop_) {
      if (isDrawerOpen.value) {
        isDrawerOpen.value = false;
        isPopoverOpen.value = true;
      }
    } else {
      if (isPopoverOpen.value) {
        isPopoverOpen.value = false;
        isDrawerOpen.value = true;
      }
    }
  },
);

// Close the mobile menu when route changes
watch(
  () => route.path,
  () => {
    isDrawerOpen.value = false;
    isPopoverOpen.value = false;
  },
);

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
    <!-- Title and Search and Filter Bar -->
    <CoreHeroTitle :title=" data.title">
      <template #prepend>
        <CoreSearchFilterBar
          v-model:search="search"
          v-model:categories="draftCategories"
          v-model:apply-filter="applyFilter"
          v-model:is-drawer-open="isDrawerOpen"
          v-model:is-popover-open="isPopoverOpen"
          class-wrapper="flex-1 bg-primary-light"
          placeholder="Try 'scrambled egg'"
          :category-groups="data.categoryGroups"
        />
        <div class="mt-4 flex flex-wrap gap-2">
          <CoreChip
            v-for="selectedCategory in selectedCategories"
            :key="selectedCategory._id"
            with-button
          >
            {{ selectedCategory.title }}
            <button
              class="flex-center bg-primary-light/70 size-6 rounded-full hover:opacity-90"
              @click="onCloseChip(selectedCategory)"
            >
              <i
                class="color-primary i-material-symbols:close-rounded p-1"
              />
            </button>
          </CoreChip>
          <CoreChip
            v-if="selectedCategories.length > 0"
            as="button"
            class="hover:bg-white/20"
            @click="onClearAll"
          >
            Clear All
          </CoreChip>
        </div>
      </template>
    </CoreHeroTitle>

    <!-- Recipe List -->
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
            <h2 class="color-primary text-h3-sm md:text-h3 font-700">
              {{ recipe.title }}
            </h2>
            <h3 class="color-primary text-body-medium">
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

    <!-- Filter Drawer on Mobile -->
    <CoreDrawer
      v-model="isDrawerOpen"
      bg-content="bg-primary-light"
    >
      <div class="mb-8 h-80dvh overflow-y-auto container">
        <CoreCategoryList
          v-model:categories="draftCategories"
          :category-groups="data.categoryGroups"
        />
      </div>
      <CoreButton
        variant="filled"
        class="absolute bottom-1 mt-4 container"
        full-width
        @click="onApplyFilter"
      >
        Apply Filter
      </CoreButton>
    </CoreDrawer>
  </section>
</template>
