<script setup lang="ts">
import GamePage from "./components/GamePage.vue";
import MainMenu from "./components/MainMenu.vue";
import { GameStateHistory } from "./data/game-state-history";
import { ref } from "vue";
import { persistState } from "./data/persistence";

const stateHistory = ref<GameStateHistory | null>(null);

function handleGameReady(newStateHistory: GameStateHistory) {
  stateHistory.value = newStateHistory;
  persistState(newStateHistory);
}

function handleStateHistoryUpdate(newStateHistory: GameStateHistory) {
  stateHistory.value = newStateHistory;
  persistState(newStateHistory);
}

function handleExit() {
  stateHistory.value = null;
}
</script>

<template>
  <main>
    <MainMenu
      v-if="stateHistory == null"
      class="main-menu"
      @game-ready="handleGameReady"
    ></MainMenu>
    <GamePage
      v-else
      class="game-page"
      :game-state-history="stateHistory"
      @update:game-state-history="handleStateHistoryUpdate"
      @exit="handleExit"
    />
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
