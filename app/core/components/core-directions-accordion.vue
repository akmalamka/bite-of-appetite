<script lang="ts" setup>
import type { Recipes } from '~/sanity/sanity.entity';
import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger } from 'radix-vue';

defineProps<{
  items: Recipes['directions'];
}>();
</script>

<template>
  <AccordionRoot
    type="single"
    collapsible
    class="accordion-root"
  >
    <AccordionItem
      v-for="item in items"
      :key="item.title"
      :value="item.title"
      class="accordion-item"
    >
      <AccordionHeader class="accordion-header">
        <AccordionTrigger
          class="accordion-trigger"
        >
          <span class="text-body-medium font-600">
            {{ item.title }}
          </span>
          <CorePlusMinus />
        </AccordionTrigger>
      </AccordionHeader>

      <AccordionContent class="accordion-content">
        <div class="px-5 py-4">
          <div
            class="flex-vertical flex-1 gap-2"
          >
            <span>
              {{ item.step }}
            </span>
            <span
              v-if="item.tips"
              class="font-600"
            >
              Tips: {{ item.tips }}
            </span>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>

<style lang="postcss" scoped>
</style>
