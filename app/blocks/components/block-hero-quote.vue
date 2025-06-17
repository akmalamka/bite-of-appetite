<script lang="ts" setup>
import type { PickPageComponent } from '~/core/core.entity';

defineProps<{
  data: PickPageComponent<'heroQuote'>;
}>();
</script>

<template>
  <section class="color-primary-light fluid-py-32-64 bg-green first:mt-$navbar-height">
    <div class="flex-vertical-center text-h5-sm md:text-h5 gap-y-4 container">
      <h3 class="text-center">
        ❝ {{ data.quote }} ❞
      </h3>
      <h4
        v-if="data.author"
        class="font-500"
      >
        ～ {{ data.author }} ～
      </h4>
    </div>
  </section>
</template>
