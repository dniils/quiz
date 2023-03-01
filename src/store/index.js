import { defineStore } from "pinia";

export const quizStore = defineStore("quizStore", {
  state: () => ({
    questions: [],
  }),
  getters: {},
  actions: {},
});
