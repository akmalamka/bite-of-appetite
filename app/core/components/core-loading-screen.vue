<template>
  <div
    class="h-[100dvh] min-h-[6rem] flex items-center justify-center p-4"
  >
    <div class="flex flex-col items-center justify-center gap-2">
      <CoreLoadingSpinner
        class="color-primary h-10 w-10 animate-spin animate-reverse md:h-16 md:w-16"
      />
      <p class="mt-2 text-center text-sm sm:mt-4 md:text-lg sm:text-base">
        <slot />
      </p>
    </div>
  </div>
</template>
