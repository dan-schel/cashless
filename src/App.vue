<script setup lang="ts">
import Board from "./components/Board.vue";
import MainMenu from "./components/MainMenu.vue";
import { GameState } from "./data/game-state";
import { ref } from "vue";

const state = ref<GameState | null>(null);

function handleGameReady(newState: GameState) {
  state.value = newState;
}
</script>

<template>
  <main>
    <MainMenu v-if="state == null" @game-ready="handleGameReady"></MainMenu>
    <Board v-else class="board" :game-state="state" /> -->
  </main>
</template>

<style scoped lang="scss">
@use "@/assets/css-template/import" as template;

main {
  height: 100vh;
  height: 100svh;
}

.board {
  @include template.flex-grow;
}
</style>
