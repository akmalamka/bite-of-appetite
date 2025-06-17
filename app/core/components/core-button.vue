<script setup lang="ts">
import { NuxtLink } from '#components';

interface CoreButtonProps {
  to?: string;
  variant?: 'filled';
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
    class="group w-fit flex items-center gap-2 rounded-full text-center outline-none transition-colors duration-300"
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
  &--filled {
    @apply px-4 py-2.5 bg-green color-white border-transparent border-1 text-button hover:(border-white bg-opacity-90);
  }
  &--text {
    @apply bg-transparent text-eyebrow;

    &:hover .arrow-icon {
      transform: translateX(8px);
    }
  }

  &--cta {
    @apply bg-transparent text-body-links decoration-1 offsetted-underline hover:color-grey-dark;
  }
}
</style>
