<script lang="ts" setup>
import type { NuxtError } from '#app';

defineProps<{
  error: NuxtError;
}>();
</script>

<template>
  <div>
    <NuxtLayout>
      <div class="fixed inset-0 h-screen bg-red">
        <NuxtImg
          src="/images/coffee-pot.svg"
          alt="coffee pot"
          class="z-background fluid-h-200-400 fluid-top-160-240 fluid-left-200-350 absolute hidden rotate-5 md:block"
        />
        <div class="md:flex-center text-primary-light mt-164px h-full flex-col gap-y-4 text-center container md:(mt-0)">
          <h1 class="text-h1-sm md:text-h1">
            {{ error?.statusCode }}
          </h1>
          <p
            v-if="error.statusCode === 404"
            class="text-h5-sm md:text-h5 md:(max-w-110)"
          >
            Oops! Looks like you followed <span class="text-h5-accent"> a bad link.</span>
          </p>
          <!-- this is for internal display, to help debugging non-404 errors -->
          <div
            v-else
          >
            <p
              class="md:text-sh2 mt-4 md:(max-w-110)"
              v-html="error.message"
            />
            <p

              class="md:text-sh2 mt-4 md:(max-w-110)"
              v-html="error.stack"
            />
          </div>
          <CoreButton
            variant="filled"
            to="/"
          >
            Back Home
          </CoreButton>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<style lang="postcss" scoped>

</style>
