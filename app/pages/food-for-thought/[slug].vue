<script lang="ts" setup>
import { showError } from '#imports';
import { Separator } from 'radix-vue';
import { useDateFormatter } from '~/core/composables/use-date-formatter';
import { useSanityArticle } from '~/sanity/sanity.fetcher';

const { data } = await useSanityArticle();

if (!data.value) {
  throw showError({
    statusCode: 404,
    statusMessage: 'Article Content Not Found',
  });
}

const { formatDate } = useDateFormatter();
</script>

<template>
  <article
    class="grid grid-cols-1 md:grid-cols-2"
  >
    <CoreSanityImage
      :image="data?.article?.image"
      class="col-span-1 h-75dvh object-cover object-center md:(size-full max-h-full)"
    />
    <div
      class="color-primary-light col-span-1 bg-green"
    >
      <div
        class="flex-vertical size-full items-center justify-around gap-y-4 py-8 container md:(px-8 pb-8) first:pt-$navbar-height"
      >
        <span class="text-body-medium uppercase">Food for Thought</span>
        <h2 class="text-h4-sm md:text-h4 text-center">
          {{ data?.article?.subtitle }}
        </h2>
        <div class="flex-vertical-center gap-y-4 md:gap-y-8">
          <div class="flex justify-between text-center">
            <h3 class="text-body-small uppercase">
              By {{ data?.article?.writingBy }}
            </h3>
            <Separator
              class="bg-primary-light mx-[15px] data-[orientation=vertical]:w-2px"
              orientation="vertical"
            />
            <h3 class="text-body-small uppercase">
              Photo by {{ data?.article?.photoBy }}
            </h3>
          </div>
          <h4
            v-if="data?.article?.publishedDate"
            class="text-body-medium font-500 uppercase"
          >
            {{ formatDate(data?.article?.publishedDate, { dateStyle: 'long' }) }}
          </h4>
        </div>
      </div>
    </div>
    <div class="flex-vertical-center color-primary col-span-1 my-4 gap-y-4 container md:(col-span-2 my-8 max-w-640px gap-y-8)">
      <h1 class="text-h2-sm md:text-h2 text-center">
        {{ data?.article?.title }}
      </h1>
      <CorePortableText
        v-if="data?.article?.story"
        :value="data.article.story"
        class="mb-6"
      />
    </div>
  </article>
</template>
