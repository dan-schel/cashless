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
@use "@/assets/utils" as utils;

.free-parking-page {
  align-items: center;
  gap: 1rem;
  padding-bottom: 3rem;
}

.title {
  text-align: center;
  font-size: 1.5rem;
}

.balance {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.actions {
  @include template.row;
  gap: 1rem;
}

.cancel {
  @include template.button-filled-neutral;
  @include utils.big-button;
}
.collect {
  @include template.button-filled;
  @include utils.big-button;
}
</style>
