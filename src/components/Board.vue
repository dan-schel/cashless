<script setup lang="ts">
import Quadrants from "./Quadrants.vue";
import PlayerControls from "./PlayerControls.vue";
import { GameState } from "@/data/game-state";
import { computed } from "vue";

const props = defineProps<{
  gameState: GameState;
}>();

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
</script>

<template>
  <Quadrants>
    <template #top v-if="topPlayer != null">
      <PlayerControls :player="topPlayer"></PlayerControls>
    </template>
    <template #bottom v-if="bottomPlayer != null">
      <PlayerControls :player="bottomPlayer"></PlayerControls>
    </template>
    <template #left v-if="leftPlayer != null">
      <PlayerControls :player="leftPlayer"></PlayerControls>
    </template>
    <template #right v-if="rightPlayer != null">
      <PlayerControls :player="rightPlayer"></PlayerControls>
    </template>
    <template #center>
      <button class="menu"><p>Menu</p></button>
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
