<template>
  <div>
    <WelcomeMessage @show-test="showTestEventHandler" v-if="!testDisplayed" />
    <QuizTest
      v-if="testDisplayed && !testResult"
      @submit-form="submitFormEventHandler"
    />
    <QuizResults
      @back-to-welcome-message="backToWelcomeMessageEventHandler"
      :result="testResult"
      v-if="testResult"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import QuizTest from "@/components/QuizTest.vue";
import WelcomeMessage from "@/components/WelcomeMessage.vue";
import QuizResults from "./components/QuizResults.vue";

let testDisplayed = ref(false);
let testResult = ref(null);

const showTestEventHandler = () => (testDisplayed.value = !testDisplayed.value);
const submitFormEventHandler = (result: object) => (testResult.value = result);
const backToWelcomeMessageEventHandler = () => {
  testDisplayed.value = false;
  testResult.value = null;
};
</script>

<style lang="scss"></style>
