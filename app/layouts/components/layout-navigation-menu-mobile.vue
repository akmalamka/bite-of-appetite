<script lang="ts" setup>
import type { LayoutNavigationMenu, SocialMedias } from '~/sanity/sanity.entity';
import { useRoute } from 'vue-router';

defineProps<{
  data: {
    navigation: Array<LayoutNavigationMenu>;
    socials: null | SocialMedias['socials'];
  };
}>();

const emit = defineEmits<{
  (e: 'closeNav'): void;
}>();

const route = useRoute();

function handleMenuClick(menuLink: string) {
  if (route.path === menuLink) {
    emit('closeNav');
  }
}
</script>

<template>
  <div class="flex-vertical size-full justify-between px-5 pb-5 pt-88px container md:hidden">
    <div class="flex-vertical gap-y-8">
      <NuxtLink
        v-for="menu in data.navigation"
        :key="menu._id"
        :to="menu.link"
        class="color-primary-light text-h6"
        active-class="decoration-1 offsetted-underline"
        @click="handleMenuClick(menu.link!)"
      >
        {{ menu.text }}
      </NuxtLink>
    </div>

    <div class="color-primary-light text-body-large flex justify-between">
      <NuxtLink
        v-for="social in data.socials"
        :key="social._key"
        :to="social.link"
        target="_blank"
        class="hover:offsetted-underline transition-colors-280"
      >
        {{ social.title }}
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="postcss" scoped>

</style>
