<template>
  <div class="welcome-message">
    Hi, I am QuizApp built to test your knowledge! ✨
    <main-button> Ok, let's go 🔥</main-button>
  </div>
</template>

<script setup lang="ts">
import MainButton from "@/components/MainButton.vue";
</script>

<style scoped>
.welcome-message {
  margin-bottom: 50px;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
