<template>
  <div class="quiz-results">
    <div class="quiz-results__emoji">
      <div class="quiz-results__emoji-sad" v-if="scoreReaction.sad">🥴</div>
      <div class="quiz-results__emoji-neutral" v-if="scoreReaction.neutral">
        😐
      </div>
      <div class="quiz-results__emoji-ok" v-if="scoreReaction.ok">👌</div>
      <div class="quiz-results__emoji-happy" v-if="scoreReaction.happy">🤩</div>
    </div>
    <div class="quiz-results__result">
      You have scored
      <span class="quiz-results__score">{{ props.result.score }}</span>
      out of
      <span class="quiz-results__total">
        {{ props.result.total }}
      </span>
    </div>
    <MainButton @click="emit('back-to-welcome-message')"
      >Continue ➡️</MainButton
    >
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import MainButton from "@/components/MainButton.vue";

const emit = defineEmits("back-to-welcome-message");

let scoreReaction = ref({
  sad: false,
  neutral: false,
  ok: false,
  happy: false,
});

(function pushScoreReaction() {
  const percent = (props.result.score / props.result.total) * 100;
  if (percent >= 0 && percent <= 40) scoreReaction.value.sad = true;
  if (percent > 40 && percent <= 60) scoreReaction.value.neutral = true;
  if (percent > 60 && percent <= 80) scoreReaction.value.ok = true;
  if (percent > 80 && percent <= 100) scoreReaction.value.happy = true;
})();

const props = defineProps({
  result: Object,
});
</script>

<style lang="scss">
.quiz-results {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: var(--fs-l);

  &__emoji {
    font-size: var(--fs-xxxl);
    margin-bottom: 20px;
  }

  &__score,
  &__total {
    font-size: var(--fs-xl);
    color: var(--blue-200);
  }
}
</style>
