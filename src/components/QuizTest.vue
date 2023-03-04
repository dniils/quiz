<template>
  <div class="quiz-test">
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
                v-for="option in mixArrayElements(task.options)"
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
                v-for="option in mixArrayElements(task.options)"
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
          <div>{{ questionNumber + 1 }}</div>
        </div>
        <span class="quiz__question-weight"> weight: {{ task.weight }} </span>
      </div>
      <main-button>✨ Submit ✨</main-button>
    </form>
  </div>
</template>

<script setup lang="ts">
// todos:
// [x] make a function that randomizes elements order in Array
// [x] randomize answer options order ()
// [ ] make it ☝️ optional

// [ ] edit data first (arrays' elements order), then display it

// [x] randomize questions order
// [ ] make it ☝️ optional

// [x] get selected answers and compare them with correct ones
// [x] get questions id's with incorrect answer
// [x] calculate points according to the questions weight

// [ ] add regExp check for text inputs
// [ ] add store

import { ref, defineEmits } from "vue";
import questionsData from "@/questions.json";
import MainButton from "@/components/MainButton.vue";

const quizData = ref(mixArrayElements(questionsData));
const answers = ref({});
let total = ref(0);
let result = ref(0);

const emit = defineEmits("submit-form");

function getTotalScore() {
  total.value = 0;
  for (let taskId = 0; taskId < Object.keys(answers.value).length; taskId++) {
    total.value = total.value + answers.value[taskId].weight;
  }
}

function mixArrayElements<T>(arr: T[]): T[] {
  return arr.sort((a, b) => 0.5 - Math.random());
}

// Get all the selected/written answers into the 'answers' object by task id
function getSelectedOption(taskId, e) {
  if (e.target.type === "radio") {
    answers.value[taskId]["answer"] = e.target._value;
  }

  if (e.target.type === "checkbox") {
    // answers.value[taskId]["answer"] = []; // fix checkboxes

    e.target.checked
      ? answers.value[taskId]["answer"].push(e.target.value)
      : (answers.value[taskId]["answer"] = answers.value[taskId][
          "answer"
        ].filter((el) => el !== e.target.value));
  }

  if (e.target.type === "text") {
    answers.value[taskId]["answer"] = e.target.value;
  }
}

// get questions ids & corresponding correct answers from data
(function getCorrectAnswers() {
  quizData.value.map((task) => {
    answers.value[task.id] = {
      answer: [],
      correct: task.correct,
      weight: task.weight,
    };
  });
})();

function compareTwoArrays(a: Array<string>, b: Array<string>) {
  return a.length === b.length && a.sort().every((el, i) => el === b.sort()[i]);
}

// compare correct answers with the given ones by answer type
function compareAnswers() {
  result.value = 0;

  for (let id = 0; id < Object.keys(answers.value).length; id++) {
    if (typeof answers.value[id].answer === "string") {
      answers.value[id]["result"] =
        answers.value[id].answer.toLowerCase().trim() ===
        answers.value[id].correct.toLowerCase().trim();
    } else if (Array.isArray(answers.value[id].answer)) {
      answers.value[id]["result"] = compareTwoArrays(
        answers.value[id].answer,
        answers.value[id].correct
      );
    }

    if (answers.value[id].result) {
      result.value += answers.value[id].weight;
    }
  }
}

function checkIfAllTasksDone() {
  let arr = [];
  for (let id = 0; id < Object.keys(answers.value).length; id++) {
    arr.push(answers.value[id].answer);
  }
  return !arr.some((el) => el.length === 0);
}

function submitEventHandler() {
  getTotalScore();
  if (checkIfAllTasksDone()) {
    compareAnswers();
    emit("submit-form", { result: result.value, total: total.value });
  } else console.log("Please, provide answers to all the questions");
}
</script>

<style scoped lang="scss">
.quiz-test {
  width: 600px;
  margin: 0 auto;
}
</style>
