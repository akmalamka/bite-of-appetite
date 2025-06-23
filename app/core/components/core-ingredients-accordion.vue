<script lang="ts" setup>
import type { Recipes } from '~/sanity/sanity.entity';
import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger } from 'radix-vue';

defineProps<{
  items: Recipes['ingredientsWithComponent'];
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
      <AccordionHeader class="flex">
        <AccordionTrigger
          class="accordion-trigger"
        >
          <span class="text-body-medium">
            {{ item.title }}
          </span>
          <CorePlusMinus />
        </AccordionTrigger>
      </AccordionHeader>

      <AccordionContent class="accordion-content">
        <div class="px-5 py-4">
          <div
            v-for="ingredient in item.ingredients"
            :key="ingredient._key"
            class="flex flex-1 items-center justify-between py-1"
          >
            <span>
              {{ ingredient.name }}
            </span>
            <span>
              {{ ingredient.measurement }} {{ ingredient.unit }}
            </span>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>

<style lang="postcss" scoped>

</style>
