<script lang="ts" setup>
import { useSanityHeader } from '~/sanity/sanity.fetcher';

const { data } = await useSanityHeader();
</script>

<template>
  <div class="color-primary text-h1">
    {{ data?.title }}
    <span>
      aaa
    </span>
  </div>
</template>

<style lang="postcss" scoped></style>
