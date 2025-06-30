<script lang="ts" setup>
import type { Category, PickPageComponent } from '~/core/core.entity';
import { useVModel } from '@vueuse/core';
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'radix-vue';
import { useAttrs } from 'vue';

defineOptions({
  // Since the input field is wrapped with a div, we want to place the attributes not in the root element
  inheritAttrs: false,
});

const props = withDefaults(defineProps<{
  classWrapper?: string;
  search?: string;
  categories: Array<Category>;
  applyFilter: boolean;
  isDrawerOpen: boolean;
  isPopoverOpen: boolean;
  placeholder?: string;
  categoryGroups: PickPageComponent<'recipeList'>['categoryGroups'];
}>(), {
  classWrapper: 'bg-white dark:bg-transparent',
});

const emits = defineEmits<{
  'update:search': [value: string];
  'update:categories': [value: Array<Category>];
  'update:applyFilter': [value: boolean];
  'update:isDrawerOpen': [value: boolean];
  'update:isPopoverOpen': [value: boolean];
}>();

const attrs = useAttrs();

// Popover for screen more than md (768 px) and drawer for lower than md
const isPopoverOpen = useVModel(props, 'isPopoverOpen', emits);

const isDrawerOpen = useVModel(props, 'isDrawerOpen', emits);

const search = useVModel(props, 'search', emits);

const categories = useVModel(props, 'categories', emits);

const applyFilter = useVModel(props, 'applyFilter', emits);

function onApplyFilter() {
  applyFilter.value = !applyFilter.value;
  isPopoverOpen.value = false;
}

const inputClasses = 'w-full bg-transparent text-body-medium color-primary outline-none placeholder-color-primary/50 rounded-6px';
</script>

<template>
  <div
    class="border-primary focus-within:shadow-input flex items-center gap-2 border-2 rounded-full px-4 py-3"
    :class="[
      classWrapper,
    ]"
  >
    <i class="color-primary i-material-symbols:search size-6 pl-4" />

    <input
      v-model="search"
      v-bind="attrs"
      type="text"
      :placeholder="placeholder"
      :class="[
        inputClasses,
      ]"
      class="h-9 pl-0 pr-4"
    >

    <div class="hidden md:block">
      <PopoverRoot
        v-model:open="isPopoverOpen"
      >
        <PopoverTrigger
          aria-label="Filter categories"
        >
          <i class="color-primary i-material-symbols:filter-alt-outline size-6 pl-4" />
        </PopoverTrigger>
        <PopoverPortal>
          <PopoverContent
            class="border-primary shadow-popover z-popover bg-primary-light border border-2 rounded-2 px-5 py-4 data-[state=closed]:(animate-fade-out animate-duration-300) data-[state=open]:(animate-fade-in animate-duration-300)"
            side="bottom"
            :side-offset="20"
            align="end"
          >
            <CoreCategoryList
              v-model:categories="categories"
              :category-groups
            />
            <CoreButton
              variant="filled"
              class="mt-4"
              full-width
              @click="onApplyFilter"
            >
              Apply Filter
            </CoreButton>
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>
    </div>

    <button
      class="md:hidden"
      @click="isDrawerOpen = true"
    >
      <i class="i-material-symbols:filter-alt-outline color-primary size-6 pl-4" />
    </button>
  </div>
</template>
