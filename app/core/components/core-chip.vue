<script lang="ts" setup>
import type { PrimitiveProps } from 'radix-vue';

withDefaults(defineProps<PrimitiveProps & {
  withButton?: boolean;
}>(), {
  withButton: false,
  as: 'div',
});
</script>

<template>
  <component
    :is="as"
    class="border-primary text-body-small w-max inline-flex cursor-default items-center gap-2 border border-1 rounded-16px px-4 py-1"
    :class="{
      'cursor-default': as !== 'button',
      'cursor-pointer': as === 'button',
      'color-primary-light bg-primary pr-2': withButton,
      'color-primary': !withButton,
    }"
  >
    <slot />
  </component>
</template>

<style lang="postcss" scoped>

</style>
