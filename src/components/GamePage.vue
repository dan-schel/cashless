<script setup lang="ts">
import Quadrants from "./Quadrants.vue";
import PlayerUI from "./player-ui/PlayerUI.vue";
import GameMenu from "./GameMenu.vue";
import { GameState } from "@/data/game-state";
import { GameStateHistory } from "@/data/game-state-history";
import { computed, ref } from "vue";

const props = defineProps<{
  gameStateHistory: GameStateHistory;
}>();

const emit = defineEmits<{
  (e: "update:gameStateHistory", value: GameStateHistory): void;
  (e: "exit"): void;
}>();

const menuOpen = ref(false);
const playerInControl = ref<string | null>(null);

const gameState = computed(() => props.gameStateHistory.current);

const topPlayer = computed(
  () => gameState.value.players.find((p) => p.side === "top") ?? null,
);
const bottomPlayer = computed(
  () => gameState.value.players.find((p) => p.side === "bottom") ?? null,
);
const leftPlayer = computed(
  () => gameState.value.players.find((p) => p.side === "left") ?? null,
);
const rightPlayer = computed(
  () => gameState.value.players.find((p) => p.side === "right") ?? null,
);

function handleNewGameState(newState: GameState) {
  emit(
    "update:gameStateHistory",
    props.gameStateHistory.afterNewState(newState),
  );
}

function handleUndo() {
  if (props.gameStateHistory.canUndo) {
    emit("update:gameStateHistory", props.gameStateHistory.afterUndo());
  }
}

function handleRedo() {
  if (props.gameStateHistory.canRedo) {
    emit("update:gameStateHistory", props.gameStateHistory.afterRedo());
  }
}

function handleMenuButton() {
  menuOpen.value = true;
}

function handleCloseMenu() {
  menuOpen.value = false;
}
</script>

<template>
  <Quadrants>
    <template #top v-if="topPlayer != null && !menuOpen">
      <PlayerUI
        v-model:player-in-control="playerInControl"
        :game-state="gameState"
        @update:game-state="handleNewGameState"
        :player="topPlayer"
      ></PlayerUI>
    </template>
    <template #bottom v-if="bottomPlayer != null && !menuOpen">
      <PlayerUI
        v-model:player-in-control="playerInControl"
        :game-state="gameState"
        @update:game-state="handleNewGameState"
        :player="bottomPlayer"
      ></PlayerUI>
    </template>
    <template #left v-if="leftPlayer != null && !menuOpen">
      <PlayerUI
        v-model:player-in-control="playerInControl"
        :game-state="gameState"
        @update:game-state="handleNewGameState"
        :player="leftPlayer"
      ></PlayerUI>
    </template>
    <template #right v-if="rightPlayer != null && !menuOpen">
      <PlayerUI
        v-model:player-in-control="playerInControl"
        :game-state="gameState"
        @update:game-state="handleNewGameState"
        :player="rightPlayer"
      ></PlayerUI>
    </template>
    <template #center v-if="playerInControl == null || menuOpen">
      <GameMenu
        v-if="menuOpen"
        :can-undo="props.gameStateHistory.canUndo"
        :can-redo="props.gameStateHistory.canRedo"
        @undo="handleUndo"
        @redo="handleRedo"
        @exit="$emit('exit')"
        @close="handleCloseMenu"
      ></GameMenu>
      <div v-else class="menu-button-container">
        <button class="menu" @click="handleMenuButton"><p>Menu</p></button>
      </div>
    </template>
  </Quadrants>
</template>

<style scoped lang="scss">
@use "@/assets/css-template/import" as template;

.menu-button-container {
  background-color: var(--color-paper-20);
  padding: 0.5rem;
}

.menu {
  @include template.button-filled-neutral;
  @include template.content-text;
  padding: 1rem;

  p {
    font-size: 1.5rem;
  }
}
</style>
