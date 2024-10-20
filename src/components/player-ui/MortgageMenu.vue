<script setup lang="ts">
import { GameState } from "@/data/game-state";
import Board from "../board/Board.vue";

defineProps<{
  gameState: GameState;
}>();

const emit = defineEmits<{
  (e: "cancel"): void;
  (e: "submit"): void;
}>();
</script>

<template>
  <Board>
    <template #center>
      <p class="title">Mortgage</p>
      <button class="cancel-button" @click="emit('cancel')">
        <p>Cancel</p>
      </button>
    </template>
  </Board>
</template>

<style scoped lang="scss">
@use "@/assets/css-template/import" as template;
@use "@/assets/utils" as utils;

.cancel-button {
  @include utils.big-button;
  @include template.button-filled-neutral;
}
</style>
