<script lang="ts" setup>
import type { Category, PickPageComponent } from '~/core/core.entity';
import { useVModel } from '@vueuse/core';
import { CheckboxIndicator, CheckboxRoot, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'radix-vue';
import { ref, useAttrs } from 'vue';

defineOptions({
  // Since the input field is wrapped with a div, we want to place the attributes not in the root element
  inheritAttrs: false,
});

const props = withDefaults(defineProps<{
  classWrapper?: string;
  search?: string;
  categories: Array<Category>;
  applyFilter: boolean;
  placeholder?: string;
  categoryGroups: PickPageComponent<'recipeList'>['categoryGroups'];
}>(), {
  classWrapper: 'bg-white dark:bg-transparent',
});

const emits = defineEmits<{
  'update:search': [value: string];
  'update:categories': [value: Array<Category>];
  'update:applyFilter': [value: Array<Category>];
}>();

const attrs = useAttrs();

const isPopoverOpen = ref(false);

const search = useVModel(props, 'search', emits);

const selectedCategories = useVModel(props, 'categories', emits);

const applyFilter = useVModel(props, 'applyFilter', emits);

function isCategorySelected(category: Category) {
  return selectedCategories.value.some((category_) => category_._id === category._id);
}

function toggleCategory({ category, val }: { category: Category; val: boolean }) {
  if (val) {
    selectedCategories.value.push(category);
  } else {
    selectedCategories.value = selectedCategories.value.filter((item) => item._id !== category._id);
  }
}

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

    <PopoverRoot
      v-model:open="isPopoverOpen"
    >
      <PopoverTrigger aria-label="Filter categories">
        <i class="color-primary i-material-symbols:filter-alt-outline size-6 pl-4" />
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent
          class="border-primary shadow-popover z-popover bg-primary-light border border-2 rounded-2 px-5 py-4 data-[state=closed]:(animate-fade-out animate-duration-300) data-[state=open]:(animate-fade-in animate-duration-300)"
          side="bottom"
          :side-offset="20"
          align="end"
        >
          <div class="color-primary flex gap-6">
            <div
              v-for="categoryGroup in categoryGroups"
              :key="categoryGroup._id"
              class="flex-vertical gap-2"
            >
              <span class="text-body-medium font-600">
                {{ categoryGroup.title }}
              </span>
              <ul class="flex-vertical gap-4">
                <li
                  v-for="category in categoryGroup.categories"
                  :key="category._id"
                  class="text-body-small flex items-center gap-2"
                >
                  <CheckboxRoot
                    class="border-primary data-[state=checked]:bg-primary size-5 border rounded"
                    :checked="isCategorySelected(category)"
                    @update:checked="(val) => toggleCategory({ category, val })"
                  >
                    <CheckboxIndicator
                      class="flex-center h-full w-full rounded-1 color-white"
                    >
                      <i
                        class="i-material-symbols:check-rounded size-3/4"
                      />
                    </CheckboxIndicator>
                  </CheckboxRoot>
                  {{ category.title }}
                </li>
              </ul>
            </div>
          </div>
          <CoreButton
            variant="filled"
            class="mt-4"
            full-width
            @click="onApplyFilter()"
          >
            Apply Filter
          </CoreButton>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  </div>
</template>
