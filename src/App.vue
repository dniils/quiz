<template>
  <WelcomeMessage />
  <QuizComponent />
</template>

<script setup lang="ts">
import QuizComponent from "@/components/QuizComponent.vue";
import WelcomeMessage from "@/components/WelcomeMessage.vue";
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  margin-top: 60px;
}
</style>
