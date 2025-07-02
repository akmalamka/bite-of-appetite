<script lang="ts" setup>
defineProps<{
  isOpen: boolean;
}>();
</script>

<template>
  <svg
    width="20"
    height="20"
    viewBox="0 0 100 100"
  >
    <!-- TODO: change animation for hamburger -->
    <path
      class="line transform-origin-[75%_30%] transition-transform-400"
      :class="{
        '-rotate-45 translate-y-5px -translate-x-5px': isOpen,
      }"
      d="M 20,30 H 80"
    />
    <path
      class="line transition-opacity-400"
      :class="{
        'opacity-100': !isOpen,
        'opacity-0': isOpen,
      }"
      d="M 20,50 H 80"
    />
    <path
      class="line transform-origin-[25%_70%] transition-transform-400"
      :class="{
        '-rotate-135 translate-x-45px': isOpen,
      }"
      d="M 20,70 H 80"
    />
  </svg>
</template>

<style lang="postcss" scoped>
.line {
  fill: none;
  stroke: currentColor;
  stroke-width: 8;
  stroke-linecap: round;
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
