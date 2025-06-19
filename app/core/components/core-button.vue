<script setup lang="ts">
import { NuxtLink } from '#components';

interface CoreButtonProps {
  to?: string;
  variant?: 'filled' | 'outlined';
  disabled?: boolean;
  fullWidth?: boolean;
}

withDefaults(defineProps<CoreButtonProps>(), {
  variant: 'filled',
  disabled: false,
  fullWidth: false,
});
</script>

<template>
  <Component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    :target="to?.startsWith('/') ? undefined : '_blank'"
    class="core-button w-fit flex items-center gap-2 rounded-full text-center outline-none"
    :class="[
      `core-button--${variant}`, {
        'pointer-events-none opacity-50': disabled,
        'w-full justify-center': fullWidth,
      }]"
    :tabindex="disabled ? -1 : 0"
    :aria-disabled="disabled ? 'true' : 'false'"
  >
    <slot />
  </Component>
</template>

<style lang="postcss" scoped>
.core-button {
  @apply px-4 py-2.5 text-button transition-colors transition-transform duration-280 hover:scale-110;
  &--filled {
    @apply bg-green color-white border-transparent border-1 hover:(border-white);
  }

  &--outlined {
    @apply bg-primary-light color-primary border border-2 border-primary hover:(border-primary);
  }
}
</style>
