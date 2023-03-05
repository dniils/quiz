<template>
  <div class="quiz-test">
    <form class="quiz" @submit.prevent="submitEventHandler">
      <h1 class="quiz__header">{{ "📝" + quizData.quizName }}</h1>
      <div
        class="quiz__task"
        v-for="(task, questionNumber) in mixQuestionsOrder(quizData.data)"
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
                v-for="option in mixAnswersOrder(task.options)"
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
                v-for="option in mixAnswersOrder(task.options)"
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
// [x] randomize answer options order
// [x] make it optional

// [x] randomize questions order
// [x] make it optional

// [x] get selected answers and compare them with correct ones
// [x] get questions id's with incorrect answer
// [x] calculate points according to the questions weight

// [ ] add regExp check for text inputs
// [ ] add store
// if user refreshed the page by accident, would be nice to have his answers saved

// [ ] add popup/alert on submit, ask user if he would like to submit unfinished test (not all answers provided case)
// [ ] show right/wrong answers
// [ ] allow question ids to be nonconsecutive numbers

import { ref, defineEmits } from "vue";
import questionsData from "@/questions.json";
import MainButton from "@/components/MainButton.vue";

const quizData = ref(questionsData);
const answers = ref({});
let result = ref({
  score: 0,
  total: 0,
});

const emit = defineEmits("submit-form");

// get questions ids & corresponding correct answers from data
quizData.value["data"].map((task) => {
  if (task.type === "checkbox") {
    answers.value[task.id] = {
      answer: [],
      correct: task.correct,
      weight: task.weight,
    };
  } else {
    answers.value[task.id] = {
      answer: undefined,
      correct: task.correct,
      weight: task.weight,
    };
  }
});

function getTotalScore() {
  result.value.total = 0;
  for (let taskId = 0; taskId < Object.keys(answers.value).length; taskId++) {
    result.value.total += answers.value[taskId].weight;
  }
}

function mixArrayElements<T>(arr: T[]): T[] {
  return arr.sort(() => 0.5 - Math.random());
}

function mixQuestionsOrder<T>(arr: T[]): T[] {
  if (quizData.value.mixQuestions == true) return mixArrayElements(arr);
  else return arr;
}

function mixAnswersOrder<T>(arr: T[]): T[] {
  if (quizData.value.mixAnswerOptions == true) return mixArrayElements(arr);
  else return arr;
}

// Get all the selected/written answers into the 'answers' object by task id
function getSelectedOption(taskId, e) {
  if (e.target.type === "radio") {
    answers.value[taskId]["answer"] = e.target._value;
  }

  if (e.target.type === "checkbox") {
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

function compareTwoArrays(a: Array<string>, b: Array<string>) {
  return a.length === b.length && a.sort().every((el, i) => el === b.sort()[i]);
}

// compare correct answers with the given ones by answer type
function compareAnswers() {
  result.value.score = 0;

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
      result.value.score += answers.value[id].weight;
    }
  }
}

function checkIfAllTasksDone() {
  let arr = [];
  for (let id = 0; id < Object.keys(answers.value).length; id++) {
    arr.push(answers.value[id].answer);
  }
  return !arr.some((el) => el?.length === 0 || typeof el === undefined);
}

function submitEventHandler() {
  getTotalScore();
  if (checkIfAllTasksDone()) {
    compareAnswers();
    emit("submit-form", result.value);
  } else console.log("Please, provide answers to all the questions");
}
</script>

<style scoped lang="scss">
.quiz-test {
  width: 600px;
  margin: 40px auto;
}
</style>
