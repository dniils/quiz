<template>
  <button class="main-button">
    <slot />
  </button>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "@/assets/style/_variables";
.main-button {
  color: var(--white);
  font-size: var(--fs-m);
  background-color: var(--blue-200);
  border: none;
  padding: 10px;
  border-radius: 50px;
  transition: all 0.15s ease-out;
  margin: 20px 0;

  &:hover {
    cursor: pointer;
    background-color: var(--blue-300);
  }
}
</style>
