<template>
  <button class="main-button">
    <slot />
  </button>
</template>

<script setup></script>

<style lang="scss" scoped>
.main-button {
  border: none;
  // width: 100%;
  padding: 10px;
  background-color: #4f5bff;
  color: #fff;
  border-radius: 5px;
  transition: all 0.15s ease-out;
  font-size: 16px;
  margin: 20px 0;

  &:hover {
    cursor: pointer;
    background-color: #3840b8;
  }
}
</style>
