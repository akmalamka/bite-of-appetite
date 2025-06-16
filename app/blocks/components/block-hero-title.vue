<script lang="ts" setup>
import type { PickPageComponent } from '~/core/core.entity';

defineProps<{
  data: PickPageComponent<'heroTitle'>;
}>();
</script>

<template>
  <section class="first:mt-$navbar-height">
    <h1 class="text-h1-inter">
      {{ data.title }}
    </h1>

    <h2
      v-if="data.subtitle"
    >
      {{ data.subtitle }}
    </h2>
  </section>
</template>
