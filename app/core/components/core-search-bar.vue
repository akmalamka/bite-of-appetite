<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import { useAttrs } from 'vue';

defineOptions({
  // Since the input field is wrapped with a div, we want to place the attributes not in the root element
  inheritAttrs: false,
});

const props = withDefaults(defineProps<{
  classWrapper?: string;
  defaultValue?: number | string;
  hasErrors?: boolean;
  modelValue?: number | string;
  placeholder?: string;
}>(), {
  classWrapper: 'bg-white dark:bg-transparent',
});

const emits = defineEmits<{
  'update:modelValue': [value: number | string];
}>();

const attrs = useAttrs();

const modelValue = useVModel(
  props,
  'modelValue',
  emits,
  {
    passive: true,
    defaultValue: props.defaultValue,
  },
);

const inputClasses = 'w-full bg-transparent text-body-medium color-primary outline-none placeholder-color-primary/50 rounded-6px';
const errorClasses = 'border-red border-2';
</script>

<template>
  <div
    class="border-primary focus-within:shadow-input flex items-center gap-2 border-2 rounded-full px-4 py-3"
    :class="[
      classWrapper,
      {
        [errorClasses]: hasErrors,
      },
    ]"
  >
    <i class="color-primary i-material-symbols:search size-6 pl-4" />

    <input
      v-model="modelValue"
      v-bind="attrs"
      type="text"
      :placeholder="placeholder"
      :class="[
        inputClasses,
      ]"
      class="h-9 pl-0 pr-4"
    >

    <i class="color-primary i-material-symbols:filter-alt-outline size-6 pl-4" />
  </div>
</template>
