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
    class="grid w-full shadow-[0_2px_10px]"
  >
    <AccordionItem
      v-for="item in items"
      :key="item.title"
      :value="item.title"
      class="color-primary focus-within:z-content focus-within:shadow-primary/80 mt-px w-full focus-within:(relative z-10 shadow-[0_0_0_2px]) first:mt-0 first:rounded-t last:rounded-b"
    >
      <AccordionHeader class="flex">
        <AccordionTrigger
          class="group shadow-primary/80 h-12 w-full flex flex-1 cursor-default items-center justify-between px-5 shadow-[0_0.5px_0] outline-none hover:bg-white/10"
        >
          <span class="text-body-medium">
            {{ item.title }}
          </span>
          <i
            class="i-material-symbols:add-2-rounded size-6 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
            aria-label="Expand/Collapse"
          />
        </AccordionTrigger>
      </AccordionHeader>

      <AccordionContent class="accordion-content text-body-medium overflow-hidden">
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
.accordion-content {
  transition: all 500ms cubic-bezier(0.87, 0, 0.13, 1);
}

.accordion-content[data-state='open'] {
  animation: slideDown 500ms cubic-bezier(0.87, 0, 0.13, 1);
}

.accordion-content[data-state='closed'] {
  animation: slideUp 500ms cubic-bezier(0.87, 0, 0.13, 1);
}

@keyframes slideDown {
  from {
    height: 0;
  }
  to {
    height: var(--radix-accordion-content-height);
  }
}

@keyframes slideUp {
  from {
    height: var(--radix-accordion-content-height);
  }
  to {
    height: 0;
  }
}
</style>
