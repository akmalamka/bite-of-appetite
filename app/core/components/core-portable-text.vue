<script lang="ts" setup>
import { PortableText, type PortableTextProps, type PortableTextVueComponents } from '@portabletext/vue';
import { computed, h, useAttrs, type VNode } from 'vue';

const props = withDefaults(defineProps<PortableTextProps & {
  textSize?: 'large' | 'medium' | 'small';
}>(), {
  textSize: 'large',
});

const attrs = useAttrs();

const TEXT_STYLE = computed(() => {
  if (props.textSize === 'large') {
    return 'text-body-large-sm md:text-body-large';
  } else if (props.textSize === 'medium') {
    return 'text-body-medium-sm md:text-body-medium';
  } else {
    return 'text-body-small-sm md:text-body-small';
  }
});

const components: Partial<PortableTextVueComponents> = {
  block: {
    normal: (_, { slots }) => {
      const content = slots.default?.();
      if (content && content.length > 0) {
        const hasNonWhitespaceContent = content.some((node: VNode) => {
          if (node.props) {
            return node.props.text && node.props.text.length > 0;
          } else if (typeof node.children === 'string') {
            return node.children.trim().length > 0;
          }
          return node.children && (node.children as Array<any>).length > 0;
        });

        if (hasNonWhitespaceContent) {
          return h(
            'p',
            {
              class: [TEXT_STYLE, attrs.class],
            },
            content,
          );
        }
      }
      return null;
    },
  },
  list: {
    bullet: (_, { slots }) => h('ul', { class: [TEXT_STYLE] }, slots.default?.()),
    number: (_, { slots }) => h('ol', { class: [TEXT_STYLE] }, slots.default?.()),
  },
  listItem: {
    bullet: (_, { slots }) =>
      h('li', { class: 'list-circle ml-24px' }, slots.default?.()),
    number: (_, { slots }) => h('li', {
      class: 'list-decimal ml-24px',
    }, slots.default?.()),
  },
  marks: {
    link: ({ value }, { slots }) => {
      const rel = !value.href.startsWith('/')
        ? 'noreferrer noopener'
        : undefined;

      return h(
        'a',
        {
          href: value.href,
          rel,
          class: 'offsetted-underline',
          target: '__blank',
        },
        slots.default?.(),
      );
    },
  },
};
</script>

<template>
  <PortableText
    v-if="value"
    :value="value"
    :components="components"
  />
</template>
