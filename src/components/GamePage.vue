<script setup lang="ts">
import Quadrants from "./Quadrants.vue";
import PlayerUI from "./player-ui/PlayerUI.vue";
import GameMenu from "./GameMenu.vue";
import { GameState } from "@/data/game-state";
import { computed, ref } from "vue";

const props = defineProps<{
  gameState: GameState;
}>();

const emit = defineEmits<{
  (e: "update:gameState", value: GameState): void;
  (e: "undo"): void;
  (e: "redo"): void;
  (e: "exit"): void;
}>();

const menuOpen = ref(false);
const playerInControl = ref<string | null>(null);

const topPlayer = computed(
  () => props.gameState.players.find((p) => p.side === "top") ?? null,
);
const bottomPlayer = computed(
  () => props.gameState.players.find((p) => p.side === "bottom") ?? null,
);
const leftPlayer = computed(
  () => props.gameState.players.find((p) => p.side === "left") ?? null,
);
const rightPlayer = computed(
  () => props.gameState.players.find((p) => p.side === "right") ?? null,
);

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
        @update:game-state="($event) => emit('update:gameState', $event)"
        :player="topPlayer"
      ></PlayerUI>
    </template>
    <template #bottom v-if="bottomPlayer != null && !menuOpen">
      <PlayerUI
        v-model:player-in-control="playerInControl"
        :game-state="gameState"
        @update:game-state="($event) => emit('update:gameState', $event)"
        :player="bottomPlayer"
      ></PlayerUI>
    </template>
    <template #left v-if="leftPlayer != null && !menuOpen">
      <PlayerUI
        v-model:player-in-control="playerInControl"
        :game-state="gameState"
        @update:game-state="($event) => emit('update:gameState', $event)"
        :player="leftPlayer"
      ></PlayerUI>
    </template>
    <template #right v-if="rightPlayer != null && !menuOpen">
      <PlayerUI
        v-model:player-in-control="playerInControl"
        :game-state="gameState"
        @update:game-state="($event) => emit('update:gameState', $event)"
        :player="rightPlayer"
      ></PlayerUI>
    </template>
    <template #center v-if="playerInControl == null || menuOpen">
      <GameMenu
        v-if="menuOpen"
        @undo="$emit('undo')"
        @redo="$emit('redo')"
        @exit="$emit('exit')"
        @close="handleCloseMenu"
      ></GameMenu>
      <button v-else class="menu" @click="handleMenuButton"><p>Menu</p></button>
    </template>
  </Quadrants>
</template>

<style scoped lang="scss">
@use "@/assets/css-template/import" as template;

.menu {
  @include template.button-filled-neutral;
  @include template.content-text;
  padding: 1rem;

  p {
    font-size: 1.5rem;
  }
}
</style>
