<script lang="ts" setup>
import { VisuallyHidden } from 'radix-vue';
import { DrawerClose, DrawerContent, DrawerDescription, DrawerOverlay, DrawerPortal, DrawerRoot, DrawerTitle } from 'vaul-vue';
import { watch } from 'vue';

const modelValue = defineModel({ default: false });

watch(modelValue, () => {
  if (modelValue.value) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
});
</script>

<template>
  <DrawerRoot
    v-model:open="modelValue"
    direction="right"
  >
    <DrawerPortal>
      <DrawerOverlay
        class="z-dialog fixed inset-0 data-[state=closed]:animate-out data-[state=open]:animate-in bg-black/80 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0"
      />

      <DrawerContent
        class="z-dialog bg-primary fixed bottom-0 left-0 right-0 top-0 md:(left-unset w-45%)"
      >
        <!-- To prevent dialog description missing warning, dialog description must be added -->
        <VisuallyHidden>
          <DrawerDescription />
        </VisuallyHidden>

        <DrawerTitle>
          <div class="md:flex-center md:text-body-small flex items-center justify-between py-5 container md:(self-end justify-end gap-x-4)">
            <NuxtLink
              to="/"
              aria-label="Go to homepage"
              class="relative cursor-pointer"
            >
              <CoreLogo
                class="color-primary-light h-40px transition-color-280 md:hidden"
              />
            </NuxtLink>

            <span class="hidden md:block">Close</span>

            <DrawerClose class="flex-center color-primary border-primary size-10 border rounded-full bg-white">
              <i
                class="color-primary i-material-symbols:close-rounded size-4"
              />
            </DrawerClose>
          </div>
        </DrawerTitle>

        <div class="h-[calc(100dvh-var(--navbar-height))] overflow-y-auto">
          <slot />
        </div>
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>
