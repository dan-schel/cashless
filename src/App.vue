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
    new Player(1500, "left"),
    new Player(1500, "right"),
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
  justify-content: center;
  align-items: center;
}
button {
  @include template.button-filled;
  @include template.content-text;
  padding: 1rem;
  p {
    font-size: 2rem;
    font-weight: bold;
  }
}
.board {
  @include template.flex-grow;
}
</style>
