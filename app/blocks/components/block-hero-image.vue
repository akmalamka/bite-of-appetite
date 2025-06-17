<script lang="ts" setup>
import type { PickPageComponent } from '~/core/core.entity';

defineProps<{
  data: PickPageComponent<'heroImage'>;
}>();
</script>

<template>
  <section class="grid grid-cols-1 md:grid-cols-2">
    <CoreSanityImage
      :image="data.image!"
      class="grid-cols-1 max-h-75dvh object-cover object-center md:(size-full max-h-full)"
    />
    <div class="bg-primary grid-cols-1">
      <div class="flex-vertical color-primary-light size-full justify-between py-8 container md:(px-8 pb-8 pt-$navbar-height)">
        <h1 class="text-h4-sm md:text-h4 md:(pt-12)">
          {{ data.title }}
          <br>
          <CoreTypingTexts
            :text="data.typingTexts"
          />
        </h1>
        <h2
          class="text-body-medium w-1/2"
        >
          {{ data.subtitle }}
        </h2>
      </div>
    </div>
  </section>
</template>
