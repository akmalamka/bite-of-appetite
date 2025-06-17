<script lang="ts" setup>
import type { LayoutNavigationMenu, SocialMedias } from '~/sanity/sanity.entity';

defineProps<{
  data?: {
    socials: null | SocialMedias['socials'];
    navigation: Array<LayoutNavigationMenu>;
  };
}>();
</script>

<template>
  <footer class="z-content bg-primary color-primary-light">
    <div class="inset-x-0 bottom-0 grid grid-cols-1 gap-4 py-12 container md:grid-cols-4">
      <div class="flex-vertical justify-center gap-y-4 md:(col-span-2 justify-start)">
        <CoreLogo
          class="h-full self-center md:(h-40px self-start)"
        />
        <span class="text-body-sm text-center md:text-start">
          Made with Love in Bogor, Indonesia <br>
          Branding and Design by
          <NuxtLink
            class="hover:offsetted-underline cursor-pointer"
            to="https://www.instagram.com/alnauval_/"
            target="_blank"
          >
            Muhammad Alnauval
          </NuxtLink>
          <br>
          Development by
          <NuxtLink
            class="hover:offsetted-underline cursor-pointer"
            to="https://www.instagram.com/akmaaaall___/"
            target="_blank"
          >
            Muhammad Akmal
          </NuxtLink>
          <br>
          © Bite of Appetite. {{ new Date().getFullYear() }}
        </span>
      </div>
      <div class="grid col-span-1 grid-cols-2 mx-12 flex justify-between gap-x-4 md:col-span-2">
        <div class="flex-vertical col-span-1 gap-y-3 md:items-start">
          <NuxtLink
            v-for="menu in data?.navigation"
            :key="menu._id"
            :to="menu.link"
            class="hover:offsetted-underline text-h6 cursor-pointer transition-colors-280"
          >
            {{ menu.text }}
          </NuxtLink>
        </div>
        <ul class="flex-vertical col-span-1 gap-y-3">
          <li
            v-for="social in data?.socials"
            :key="social._key"
            class="color-primary-light text-body-lg"
          >
            <NuxtLink
              :to="social.link"
              target="_blank"
              class="hover:offsetted-underline transition-colors-280"
              `
            >
              {{ social.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style lang="postcss" scoped>

</style>
