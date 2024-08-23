<script setup lang="ts">
import Board from "./components/Board.vue";
import { GameState } from "./data/game-state";
import { Player } from "./data/player";
import { ref } from "vue";

const state = ref<GameState | null>(null);

function handleStart() {
  state.value = new GameState([
    new Player(1500, "bottom"),
    new Player(1500, "top"),
  ]);
}
</script>

<template>
  <main>
    <div v-if="state == null" class="menu">
      <button @click="handleStart"><p>Start</p></button>
    </div>
    <Board v-else class="board" :game-state="state" />
  </main>
</template>

<style scoped lang="scss">
@use "@/assets/css-template/import" as template;

main {
  height: 100vh;
  height: 100svh;
}
.menu {
  @include template.flex-grow;
}
button {
  @include template.button-hover;
  font-size: 2rem;
}
.board {
  @include template.flex-grow;
}
</style>
