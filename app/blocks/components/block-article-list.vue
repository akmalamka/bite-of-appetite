<script lang="ts" setup>
import type { PickPageComponent } from '~/core/core.entity';
import type { PaginatedArticlesQueryResult } from '~/sanity/sanity.entity';
import { useSanityQuery } from '#imports';
import { ref, watch } from 'vue';
import { paginatedArticlesQuery } from '~/sanity/sanity.query';

const { data } = defineProps<{
  data: PickPageComponent<'articleList'>;
}>();

const displayedArticles = ref(data.articles || []);

const currentPage = ref(1);

const isLoading = ref(false);

const ITEMS_PER_PAGE = data.itemsPerPage;

const currentOffset = ref(ITEMS_PER_PAGE);

const articleListRef = ref<HTMLElement>();

async function loadArticles() {
  isLoading.value = true;
  try {
    const { data } = await useSanityQuery<PaginatedArticlesQueryResult>(
      paginatedArticlesQuery,
      {
        start: currentOffset.value,
        end: currentOffset.value + ITEMS_PER_PAGE,
      },
    );

    if (data.value) {
      displayedArticles.value = data.value;
      currentOffset.value += ITEMS_PER_PAGE;
    }
  } catch (error: any) {
    throw new Error('Failed to load articles', { cause: error });
  } finally {
    isLoading.value = false;
  }
}

watch(currentPage, (newPage: number) => {
  currentOffset.value = (newPage - 1) * ITEMS_PER_PAGE;
  loadArticles();
});
</script>

<template>
  <CoreLoadingScreen
    v-if="isLoading"
    ref="articleListRef"
  />
  <section
    v-else
    ref="articleListRef"
    class="flex-vertical-center mb-8 gap-y-4 first:mt-$navbar-height"
  >
    <ul class="flex-vertical-center gap-y-4 container md:gap-y-8">
      <li
        v-for="(article, index) in displayedArticles"
        :key="article._id"
        class="grid grid-cols-1 items-center justify-center justify-items-center gap-4 md:grid-cols-2 md:gap-8"
      >
        <div
          class="flex-vertical-center gap-y-4 text-center"
          :class="{
            'order-2 md:order-1': index % 2 === 0,
            'order-2 md:order-2': index % 2 !== 0,
          }"
        >
          <h2 class="text-h3-sm color-primary md:text-h3 font-700">
            {{ article.title }}
          </h2>
          <h3 class="color-primary text-body-medium">
            {{ article.subtitle }}
          </h3>
          <CoreButton variant="filled">
            Read More
          </CoreButton>
        </div>
        <CoreSanityImage
          :image="article.image"
          class="size-75% rounded-12px object-cover object-center md:size-85%"
          :class="{
            'order-1 md:order-2': index % 2 === 0,
            'order-1 md:order-1': index % 2 !== 0,
          }"
        />
      </li>
    </ul>
    <CorePagination
      v-model:page="currentPage"
      :disabled="isLoading"
      :total-items="data.totalArticles"
      :items-per-page="ITEMS_PER_PAGE"
      :top-pagination-ref="articleListRef"
    />
  </section>
</template>
