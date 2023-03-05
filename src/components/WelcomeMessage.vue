<template>
  <div class="welcome-message">
    Hi, I am QuizApp built to test your knowledge! ✨
    <main-button @click="emit('show-test')"> Ok, let's go 🔥</main-button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
import MainButton from "@/components/MainButton.vue";

const emit = defineEmits("show-test");
</script>

<style scoped>
.welcome-message {
  font-size: var(--fs-l);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
