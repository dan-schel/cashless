<script setup lang="ts">
import { GameState } from "@/data/game-state";

defineProps<{
  gameState: GameState;
}>();

const emit = defineEmits<{
  (e: "cancel"): void;
  (e: "submit"): void;
}>();
</script>

<template>
  <div class="free-parking-page">
    <p class="title">Free parking</p>
    <p class="balance">${{ gameState.freeParkingBalance.toFixed() }}</p>
    <div class="actions">
      <button class="cancel" @click="() => emit('cancel')">
        <p>Cancel</p>
      </button>
      <button
        class="collect"
        @click="() => emit('submit')"
        :disabled="gameState.freeParkingBalance <= 0"
      >
        <p>Collect</p>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/css-template/import" as template;

.free-parking-page {
  align-items: center;
  gap: 1rem;
  padding-bottom: 4rem;
}

.title {
  text-align: center;
  font-size: 2rem;
}

.balance {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.actions {
  @include template.row;
  gap: 1rem;
}

button {
  @include template.content-text;
  @include template.button-filled;
  padding: 1rem;
  p {
    font-size: 1.5rem;
    font-weight: bold;
  }
}
.cancel {
  @include template.button-filled-neutral;
}
.collect {
  @include template.button-filled;
}
</style>
