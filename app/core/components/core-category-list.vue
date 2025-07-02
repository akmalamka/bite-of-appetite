<script lang="ts" setup>
import type { Category, PickPageComponent } from '~/core/core.entity';
import { useVModel } from '@vueuse/core';
import { CheckboxIndicator, CheckboxRoot } from 'radix-vue';

const props = defineProps<{
  categories: Array<Category>;
  categoryGroups: PickPageComponent<'recipeList'>['categoryGroups'];
}>();

const emits = defineEmits<{
  'update:categories': [value: Array<Category>];
}>();

const selectedCategories = useVModel(props, 'categories', emits);

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
</script>

<template>
  <div class="color-primary flex flex-col gap-6 md:flex-row">
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
</template>

<style lang="postcss" scoped>

</style>
