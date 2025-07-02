<script lang="ts" setup>
import type { RequestSizeProps } from '~/plugins/sanity-image';
import type { SanityImageDimensions } from '~/sanity/sanity.entity';
import { ref } from 'vue';

const props = withDefaults(defineProps<{
  image?: {
    asset: {
      _ref: string;
      altText: null | string;
      dimensions: null | SanityImageDimensions;
      lqip: null | string;
    } | null;
  } | null;
  loading?: 'eager' | 'lazy';
  placeholder?: null | string;
  preload?: {
    fetchPriority: 'auto' | 'high' | 'low';
  } | boolean;
  size?: RequestSizeProps;
}>(), {
  loading: 'lazy',
  preload: false,
});

const imageRef = ref();
</script>

<template>
  <NuxtImg
    ref="imageRef"
    :preload="preload"
    :loading="loading"
    :src="$sanityImageUrlFor(image, size)"
    :height="image?.asset?.dimensions?.height"
    :width="image?.asset?.dimensions?.width"
    :alt="image?.asset?.altText || ''"
    :placeholder="props.placeholder === null || !image?.asset?.lqip ? undefined : image.asset.lqip"
  />
</template>
