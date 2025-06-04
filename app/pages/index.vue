<script lang="ts" setup>
import { useSanityHeader } from '~/sanity/sanity.fetcher';

const { data } = await useSanityHeader();
</script>

<template>
  <div>
    {{ data?.title }}
    <span>
      aaa
    </span>
  </div>
</template>

<style lang="postcss" scoped></style>
