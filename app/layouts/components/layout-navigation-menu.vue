<script lang="ts" setup>
import type { LayoutNavigationMenu, SocialMedias } from '~/sanity/sanity.entity';
import { useIntersectionObserver } from '@vueuse/core';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useIsDesktop } from '~/core/composables/use-is-desktop';
import LayoutHamburgerMenu from './layout-hamburger-menu.vue';
import LayoutNavigationMenuMobile from './layout-navigation-menu-mobile.vue';

defineProps<{
  data: {
    navigation: Array<LayoutNavigationMenu>;
    socials: null | SocialMedias['socials'];
  };
}>();

const route = useRoute();
const isDesktop = useIsDesktop();

const isNavOpen = ref(false);

function handleCloseNav() {
  isNavOpen.value = false;
}

/* We need to close the mobile menu if screensize is larger than md (768px) */
watch(
  isDesktop,
  (isDesktop_) => {
    if (isDesktop_) {
      isNavOpen.value = false;
    }
  },
);

// Close the mobile menu when route changes
watch(
  () => route.path,
  () => {
    isNavOpen.value = false;
  },
);

const refSentinel = ref();

const hasScrolled = ref(false);

useIntersectionObserver(
  refSentinel,
  ([elSentinel]) => {
    if (!elSentinel) {
      return;
    }

    hasScrolled.value = !elSentinel.isIntersecting;
  },
  {
    root: null,
    threshold: 0,
    // This is the height of the navbar in mobile. It's too complicated to calculate it dynamically, so we just hardcode it.
    rootMargin: '80px',
  },
);
</script>

<template>
  <header
    class="z-header fixed left-0 top-0 w-screen transition-colors,opacity-280"
    :class="{
      'bg-primary': hasScrolled,
      'bg-transparent': !hasScrolled,
    }"
  >
    <div
      class="h-$navbar-height flex items-center justify-between container"
    >
      <NuxtLink
        to="/"
        aria-label="Go to homepage"
      >
        <CoreLogo
          class="h-40px transition-color-280"
          :class="{
            'color-primary-light': hasScrolled,
            'color-primary': !hasScrolled,
          }"
        />
      </NuxtLink>

      <div
        class="hidden items-center justify-center gap-x-8 md:flex"
      >
        <NuxtLink
          v-for="menu in data.navigation"
          :key="menu._id"
          :to="menu.link"
          class="text-h6 color-primary-light transition-colors-280"
          active-class=" decoration-1 offsetted-underline"
        >
          {{ menu.text }}
        </NuxtLink>
      </div>
      <button
        class="flex-center relative size-40px rounded-full transition-colors-280 md:hidden"
        :class="{
          'bg-primary-light color-primary': hasScrolled,
          'bg-primary color-primary-light': !hasScrolled || isNavOpen,
        }"
        @click="isNavOpen = !isNavOpen"
      >
        <LayoutHamburgerMenu
          :is-open="isNavOpen"
        />
      </button>

      <CoreDrawer v-model="isNavOpen">
        <LayoutNavigationMenuMobile
          :data="data"
          @close-nav="handleCloseNav"
        />
      </CoreDrawer>
    </div>
  </header>
  <div
    ref="refSentinel"
    class="absolute h-1px w-full"
  />
</template>

<style lang="postcss" scoped>
</style>
