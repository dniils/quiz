<template>
  <div class="welcome-message">
    Hi, I am QuizApp built to test your knowledge! ✨
    <main-button @click="$emit('show-test')"> Ok, let's go 🔥</main-button>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import { ref, defineEmits } from "vue";
import MainButton from "@/components/MainButton.vue";

// const emit = defineEmits("someEvent");
// let testDisplayed = ref(false);
</script>

<style scoped>
.welcome-message {
  margin-bottom: 50px;
  font-size: var(--fs-l);
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
