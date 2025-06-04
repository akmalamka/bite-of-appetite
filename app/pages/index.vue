<script lang="ts" setup>
import { useSanityHeader } from '~/sanity/sanity.fetcher';

const { data } = await useSanityHeader();
</script>

<template>
  {{ data?.title }}
</template>

<style lang="postcss" scoped></style>
