<script lang="ts" setup>
import { useSanityHeader } from '~/sanity/sanity.fetcher';

const { data } = await useSanityHeader();
</script>

<template>
  <div class="color-primary">
    <span class="text-h1-inter">
      {{ data?.title }}
    </span>
    <span class="text-h1-recoleta">
      {{ data?.title }}
    </span>
    <span class="text-h1-yournotes">
      {{ data?.title }}
    </span>
  </div>
</template>

<style lang="postcss" scoped></style>
