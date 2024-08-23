<script setup lang="ts">
import GamePage from "./components/GamePage.vue";
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
    <MainMenu
      v-if="state == null"
      class="main-menu"
      @game-ready="handleGameReady"
    ></MainMenu>
    <GamePage v-else class="game-page" :game-state="state" />
  </main>
</template>

<style scoped lang="scss">
@use "@/assets/css-template/import" as template;

main {
  height: 100vh;
  height: 100svh;
}

.main-menu,
.game-page {
  @include template.flex-grow;
}
</style>
