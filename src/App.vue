<template>
  <WelcomeMessage @show-test="showTestEventHandler" v-if="!testDisplayed" />
  <QuizComponent v-else />
</template>

<script setup lang="ts">
// /* eslint-disable */
import { ref } from "vue";
import QuizComponent from "@/components/QuizComponent.vue";
import WelcomeMessage from "@/components/WelcomeMessage.vue";

let testDisplayed = ref(false);
const showTestEventHandler = () => (testDisplayed.value = !testDisplayed.value);
</script>

<style lang="scss"></style>
