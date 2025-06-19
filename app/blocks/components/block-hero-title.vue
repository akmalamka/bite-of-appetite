<script lang="ts" setup>
import type { PickPageComponent } from '~/core/core.entity';

defineProps<{
  data: PickPageComponent<'heroTitle'>;
}>();
</script>

<template>
  <section class="border-b-primary my-4 border-b-2 md:my-8 first:mt-$navbar-height">
    <h1 class="color-primary text-h3-sm md:text-h3 container">
      {{ data.title }}
    </h1>
  </section>
</template>
