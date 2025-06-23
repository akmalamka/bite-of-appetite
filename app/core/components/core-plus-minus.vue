<script lang="ts" setup>

</script>

<template>
  <i
    class="plusminus"
    aria-label="Expand/Collapse"
  />
</template>

<style lang="postcss" scoped>
.plusminus {
  @apply relative size-4 cursor-pointer transition-transform;

  &::before,
  &::after {
    @apply content-[''] block bg-primary absolute top-1/2 left-0 w-full h-0.5 transition-280;
  }

  &::before {
    transform: translatey(-50%);
  }

  &::after {
    transform: translatey(-50%) rotate(90deg);
  }
}
</style>
