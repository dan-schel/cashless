<script setup lang="ts">
import MoneyEntry from "./MoneyEntry.vue";
import { ref } from "vue";

const emit = defineEmits<{
  (e: "submit", amount: number): void;
  (e: "cancel"): void;
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
    <div class="actions">
      <button class="cancel" @click="$emit('cancel')">
        <p>Cancel</p>
      </button>
      <button class="pay" @click="handleSubmit" :disabled="amount <= 0">
        <p>Earn</p>
      </button>
    </div>
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

.money-entry {
  margin-bottom: 3rem;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

button {
  @include template.content-text;
  padding: 1rem;
  align-items: center;
  p {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
  }
}
.cancel {
  @include template.button-filled-neutral;
}
.pay {
  @include template.button-filled;
}
</style>
