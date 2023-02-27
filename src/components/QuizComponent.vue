<template>
  <div class="quiz-component">
    <form class="quiz">
      <div class="quiz__task" v-for="task in quizData" :key="task">
        <div class="quiz__content">
          <div class="quiz__question">{{ task.question }}</div>
          <div class="quiz__hint">{{ task.inputHint }}</div>
          <div class="quiz__options">
            <!-- input text -->
            <input
              class="quiz__input_text"
              type="text"
              v-if="task.type === 'text'"
            />

            <!-- input radiobuttons -->
            <div
              class="quiz__radiobuttons-wrapper"
              v-if="task.type === 'radiobutton'"
            >
              <div
                class="quiz__radiobuttons-options-wrapper"
                v-for="option in mixArrayElements(task.options)"
                :key="option"
              >
                <input
                  class="quiz__input_radio"
                  type="radio"
                  :name="task.id"
                  :id="task.id + `_` + option"
                  :value="option"
                />
                <label
                  class="quiz__radiobuttons-label"
                  :for="task.id + `_` + option"
                  >{{ option }}</label
                >
              </div>
            </div>

            <!-- input checkboxes -->
            <div class="quiz__checkbox-wrapper" v-if="task.type === 'checkbox'">
              <div
                class="quiz__checkbox-option"
                v-for="option in task.options"
                :key="option"
              >
                <input
                  class="quiz__input_checkbox"
                  type="checkbox"
                  :name="task.id"
                  :id="option"
                  :value="option"
                />
                <label class="quiz__checkbox-label" :for="option">{{
                  makeFirstLetterToUpperCase(option)
                }}</label>
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
// [ ] randomize answer options order ()
// [ ] make it ☝️ optional
// [ ] randomize questions order
// [ ] make it ☝️ optional

import { ref } from "vue";
import questionsData from "@/questions.json";
import MainButton from "@/components/MainButton.vue";

const quizData = questionsData; //create TS Type to check data structure and types (?)
console.log(quizData);

const makeFirstLetterToUpperCase = (s: string): string => {
  return s[0].toUpperCase() + s.slice(1);
};

function mixArrayElements(arr: []): [] {
  return arr.sort((a, b) => 0.5 - Math.random());
}
</script>

<style scoped lang="scss">
.quiz-component {
  width: 600px;
  margin: 0 auto;
}

.quiz {
  padding: 10px;
  display: flex;
  flex-direction: column;

  &__task {
    margin-bottom: 40px;
    background-color: #f0f1ff;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 20px;
    position: relative;
  }

  &__image {
    height: 200px;
    width: 200px;
    object-fit: cover;
    border-radius: 20px;
    margin-left: 40px;
    align-self: center;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__question-number {
    position: absolute;
    top: -8px;
    left: -8px;
    background-color: #4f5bff;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: bold;
  }

  &__question {
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 10px;
  }

  &__hint {
    font-size: 18px;
    color: #4f5bff;
    margin-bottom: 10px;
  }

  &__options {
    // background-color: #4f5bff;
    margin-bottom: 10px;
  }

  &__input_text {
    border: none;
    border-radius: 20px;
    padding: 2px 10px;
    font-size: 18px;
    width: 70%;
  }

  &__input_radio {
    margin: 10px;
  }

  &__input_checkbox {
    margin: 10px;
  }

  &__radiobuttons-label {
    font-size: 16px;
    color: #424250;
  }

  &__checkbox-label {
    font-size: 16px;
    color: #424250;
  }

  .main-button {
    margin-top: 0;
  }
}
</style>
