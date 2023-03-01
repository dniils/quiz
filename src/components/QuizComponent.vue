<template>
  <div class="quiz-component">
    <form class="quiz" @submit.prevent="submitEventHandler">
      <div class="quiz__task" v-for="task in quizData" v-bind:key="task.id">
        <div class="quiz__content">
          <div class="quiz__question">{{ task.question }}</div>
          <div class="quiz__hint">{{ task.inputHint }}</div>
          <div class="quiz__options">
            <!-- input text answer -->
            <input
              class="quiz__input_text"
              type="text"
              v-if="task.type === 'text'"
            />

            <!-- single-choice question (radiobuttons) -->
            <div
              class="quiz__radiobuttons-wrapper"
              v-if="task.type === 'radiobutton'"
            >
              <div
                class="quiz__radiobuttons-options-wrapper"
                v-for="option in task.options"
                :key="option"
              >
                <input
                  @change="getSelectedOption"
                  class="quiz__input_radio"
                  type="radio"
                  :name="task.id.toString()"
                  :id="task.id + '_' + option"
                  :value="option"
                  :v-model="answer"
                />
                <label
                  class="quiz__radiobuttons-label"
                  :for="task.id + `_` + option"
                  >{{ option }}</label
                >
              </div>
              {{ answer }}
            </div>

            <!-- multiple-choice question (checkboxes) -->
            <div class="quiz__checkbox-wrapper" v-if="task.type === 'checkbox'">
              <div
                class="quiz__checkbox-option"
                v-for="option in task.options"
                :key="option"
              >
                <input
                  class="quiz__input_checkbox"
                  type="checkbox"
                  :name="task.id.toString()"
                  :id="option"
                  :value="option"
                />
                <label class="quiz__checkbox-label" :for="option">
                  {{ option }}
                </label>
              </div>
            </div>
          </div>
        </div>

        <img class="quiz__image" v-if="task.image" :src="task.image" alt="" />
        <div class="quiz__question-number">
          <!-- Make some el counter not dependent on questions id's (questions order will be randomized) -->
          <div>{{ task.id + 1 }}</div>
        </div>
      </div>
      <main-button>✨ Submit ✨</main-button>
    </form>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */

// todos:
// [x] make a function that randomizes elements order in Array
// [x] randomize answer options order ()
// [ ] make it ☝️ optional
// [ ] edit data first (arrays' elements order), then display it

// [ ] randomize questions order
// [ ] make it ☝️ optional

// [ ] store selected answers and compare them with correct ones

import { ref } from "vue";
import questionsData from "@/questions.json";
import MainButton from "@/components/MainButton.vue";
import { tsAnyKeyword } from "@babel/types";

const quizData = questionsData; //create TS Type to check data structure and types (?)

function mixArrayElements<T>(arr: T[]): T[] {
  return arr.sort((a, b) => 0.5 - Math.random());
}

const answer = ref();
// const answers = ref([]);
// function getSelectedOption(e) {
//   answers.value.push(e.target._value);
//   // console.log(answers.value);
//   console.log(e.target);
// }

function submitEventHandler() {
  console.log();
}
</script>

<style scoped lang="scss">
.quiz-component {
  width: 600px;
  margin: 0 auto;
}
</style>
