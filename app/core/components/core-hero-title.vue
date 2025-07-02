<script lang="ts" setup>
import { computed, useSlots } from 'vue';

defineProps<{
  title: string;
}>();

const slots = useSlots();

const hasPrepend = computed(() =>
  Boolean(slots.prepend),
);
</script>

<template>
  <div class="border-b-primary w-full border-b-2 py-4 md:(py-8)">
    <div class="grid grid-cols-1 w-full items-center gap-4 container lg:grid-cols-3 md:grid-cols-2">
      <h1 class="text-h3-sm color-primary md:text-h3 col-span-1 text-center md:(text-start)">
        {{ title }}
      </h1>
      <div
        v-if="hasPrepend"
        class="col-span-1 lg:(col-span-1 col-start-3)"
      >
        <slot name="prepend" />
      </div>
    </div>
  </div>
</template>
