<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const { text } = defineProps<{
  text: Array<string>;
}>();
// Received from https://dev.to/gayathri_r/how-to-add-a-typewriter-animation-in-vuejs-43kj

const typeValue = ref<string | undefined>('');
const typeStatus = ref(false);

// Constants

const typingSpeed: number = 100;
const erasingSpeed: number = 100;
const newTextDelay: number = 2000;

// Mutable indices
let textIndex: number = 0;
let charIndex: number = 0;

// Typing function
function typeText(): void {
  const currentText: string | undefined = text[textIndex];
  if (!currentText) {
    return;
  }
  if (charIndex < currentText.length) {
    if (!typeStatus.value) {
      typeStatus.value = true;
    }
    typeValue.value += currentText.charAt(charIndex);
    charIndex++;
    setTimeout(typeText, typingSpeed);
  } else {
    typeStatus.value = false;
    setTimeout(eraseText, newTextDelay);
  }
}

// Erasing function
function eraseText(): void {
  if (charIndex > 0) {
    if (!typeStatus.value) {
      typeStatus.value = true;
    }
    typeValue.value = text[textIndex]?.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseText, erasingSpeed);
  } else {
    typeStatus.value = false;
    textIndex = (textIndex + 1) % text.length;
    setTimeout(typeText, typingSpeed + 1000);
  }
}

// Start typing after initial delay
onMounted((): void => {
  setTimeout(typeText, newTextDelay + 200);
});
</script>

<template>
  <span class="typed-text">{{ typeValue }}</span>
  <span class="blinking-cursor">|</span>
  <span
    class="cursor"
    :class="{ typing: typeStatus }"
  >&nbsp;</span>
</template>

<style lang="postcss" scoped>
.blinking-cursor {
  animation: blink 1s step-end infinite;
}

/* Keyframes */
@keyframes blink {
  0%,
  100% {
    color: transparent;
  }
  50% {
    @apply color-primary-light;
  }
}
</style>
