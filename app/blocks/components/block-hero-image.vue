<script lang="ts" setup>
import type { PickPageComponent } from '~/core/core.entity';

defineProps<{
  data: PickPageComponent<'heroImage'>;
}>();
</script>

<template>
  <section
    class="grid grid-cols-1 md:grid-cols-2"
  >
    <CoreSanityImage
      :image="data.image!"
      class="grid-cols-1 max-h-75dvh object-cover object-center md:(size-full max-h-full)"
      :class="{
        'order-1': data.imagePosition === 'left',
        'order-2': data.imagePosition === 'right',
      }"
    />
    <div
      class="grid-cols-1"
      :class="{
        'order-1 bg-primary-light': data.imagePosition === 'right',
        'order-2 bg-primary': data.imagePosition === 'left',
      }"
    >
      <div
        class="flex-vertical size-full gap-y-4 py-8 container md:(px-8 pb-8) first:pt-$navbar-height"
        :class="{
          'justify-between color-primary-light': data.imagePosition === 'left',
          'color-primary': data.imagePosition === 'right',
        }"
      >
        <h1 class="text-h2-sm md:text-h2 md:(pt-12)">
          {{ data.title }}
          <br>
          <CoreTypingTexts
            v-if="data.typingTexts"
            :text="data.typingTexts"
          />
        </h1>
        <h2
          class="text-body-medium text-justify"
          :class="{
            'w-1/2': data.imagePosition === 'left',
            'w-full': data.imagePosition === 'right',
          }"
        >
          {{ data.subtitle }}
        </h2>
        <CoreButton
          v-if="data.ctaButton"
          :to="data.ctaButton.ctaLink"
          variant="filled"
        >
          {{ data.ctaButton.ctaText }}
        </CoreButton>
      </div>
    </div>
  </section>
</template>
