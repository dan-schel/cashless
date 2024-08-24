<script setup lang="ts">
import MoneyEntry from "./MoneyEntry.vue";
import { ref } from "vue";

const emit = defineEmits<{
  (e: "submit", amount: number): void;
}>();

const amount = ref(0);

function handleSubmit() {
  if (amount.value <= 0) {
    return;
  }
  emit("submit", amount.value);
}
</script>

<template>
  <div class="earn-menu">
    <p class="title">How much?</p>
    <MoneyEntry class="money-entry" v-model="amount"></MoneyEntry>
    <button @click="handleSubmit" :disabled="amount <= 0">
      <p>Earn</p>
    </button>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/css-template/import" as template;

.earn-menu {
  gap: 1rem;
  padding-bottom: 4rem;
}

.title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.earn-menu button {
  @include template.content-text;
  @include template.button-filled;
  padding: 1rem;
  align-items: center;
  text-align: center;
  p {
    font-size: 1.5rem;
    font-weight: bold;
  }
}

.money-entry {
  margin-bottom: 3rem;
}
</style>
