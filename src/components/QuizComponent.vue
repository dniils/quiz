<template>
  <div class="quiz-component">
    <form class="quiz" @submit.prevent="submitEventHandler">
      <div
        class="quiz__task"
        v-for="(task, questionNumber) in quizData"
        v-bind:key="task.id"
      >
        <div class="quiz__content">
          <div class="quiz__question">{{ task.question }}</div>
          <div class="quiz__hint">{{ task.inputHint }}</div>
          <div class="quiz__options">
            <!-- input text answer -->
            <input
              @input="getSelectedOption(task.id, $event)"
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
                  @change="getSelectedOption(task.id, $event)"
                  class="quiz__input_radio"
                  type="radio"
                  :name="task.id.toString()"
                  :id="task.id.toString()"
                  :value="option"
                />
                <label
                  class="quiz__radiobuttons-label"
                  :for="task.id + `_` + option"
                  >{{ option }}</label
                >
              </div>
            </div>

            <!-- multiple-choice question (checkboxes) -->
            <div class="quiz__checkbox-wrapper" v-if="task.type === 'checkbox'">
              <div
                class="quiz__checkbox-option"
                v-for="option in task.options"
                :key="option"
              >
                <input
                  @change="getSelectedOption(task.id, $event)"
                  class="quiz__input_checkbox"
                  type="checkbox"
                  :name="task.id.toString()"
                  :id="task.id.toString()"
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
          <div>{{ questionNumber + 1 }}</div>
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

// [ ] edit data first (arrays' elements order), then display it

// [x] randomize questions order
// [ ] make it ☝️ optional

// [x] get selected answers and compare them with correct ones
// [ ] get questions id's with incorrect answer
// [ ] calculate points according to the questions weight

import { ref } from "vue";
import questionsData from "@/questions.json";
import MainButton from "@/components/MainButton.vue";

const quizData = mixArrayElements(questionsData); //create TS Type to check data structure and types (?)
const answers = ref({});
let checkboxAnswers = ref([]);

function mixArrayElements<T>(arr: T[]): T[] {
  return arr.sort((a, b) => 0.5 - Math.random());
}

// Get all the selected/written answers into the 'answers' object by task id
function getSelectedOption(taskId, e) {
  if (e.target.type === "radio") {
    answers.value[taskId] = e.target._value;
  }

  if (e.target.type === "checkbox") {
    if (e.target.checked) checkboxAnswers.value.push(e.target.value);
    if (!e.target.checked) {
      checkboxAnswers.value = checkboxAnswers.value.filter(
        (el) => el !== e.target.value
      );
    }

    checkboxAnswers.value.filter((el) => el !== e.target.checked);
    answers.value[taskId] = checkboxAnswers.value;
  }

  if (e.target.type === "text") {
    answers.value[taskId] = e.target.value;
  }
}

// get questions ids & corresponding correct answers from data
function getCorrectAnswers() {
  let correctAnswersWithIds = {};
  quizData.map((task) => {
    correctAnswersWithIds[task.id] = task.correct;
  });

  return correctAnswersWithIds;
}
getCorrectAnswers();

function compareTwoArrays(a: Array<string>, b: Array<string>) {
  return a.length === b.length && a.sort().every((el, i) => el === b.sort()[i]);
}

// compare correct answers with the given ones (answers.value ~ getCorrectAnswers())
function compareAnswers(given, correct) {
  let results = [];
  for (let id = 0; id < Object.keys(given).length; id++) {
    if (typeof Object.entries(given)[id][1] === "string") {
      results.push(
        given[Object.keys(given)[id]].toLowerCase() ===
          correct[Object.keys(correct)[id]].toLowerCase()
      );
    } else if (typeof Object.entries(given)[id][1] === "object") {
      const givenAnswersArray = given[Object.keys(given)[id]];
      const correctAnswersArray = correct[Object.keys(correct)[id]];
      results.push(compareTwoArrays(givenAnswersArray, correctAnswersArray));
    }
  }

  console.log("All correct? ", !results.some((el) => el === false));
}

function submitEventHandler() {
  compareAnswers(answers.value, getCorrectAnswers());
}
</script>

<style scoped lang="scss">
.quiz-component {
  width: 600px;
  margin: 0 auto;
}
</style>
