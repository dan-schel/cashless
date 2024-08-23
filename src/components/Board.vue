<script setup lang="ts">
import PlayerControls from "./PlayerControls.vue";
import { GameState } from "@/data/game-state";

defineProps<{
  gameState: GameState;
}>();
</script>

<template>
  <div class="board-container">
    <div class="board">
      <PlayerControls
        v-for="(player, i) of gameState.players"
        :key="i"
        :class="{
          player: true,
          top: player.side === 'top',
          bottom: player.side === 'bottom',
          left: player.side === 'left',
          right: player.side === 'right',
        }"
        :player="player"
      />
      <div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/css-template/import" as template;

.board {
  @include template.flex-grow;
  position: relative;
  background-color: var(--color-paper-20);
  aspect-ratio: 1;
  align-self: center;

  height: min(100vh, 100vw);
  width: min(100vh, 100vw);
  height: min(100svh, 100svw);
  width: min(100svh, 100svw);
}
.player {
  position: absolute;
  left: 50%;
  top: 50%;

  --dist-from-center: min(32vh, 32vw);
  --dist-from-center: min(32svh, 32svw);

  &.top {
    transform: translate(-50%, -50%) rotate(180deg)
      translate(0, var(--dist-from-center));
  }
  &.bottom {
    transform: translate(-50%, -50%) rotate(0deg)
      translate(0, var(--dist-from-center));
  }
  &.left {
    transform: translate(-50%, -50%) rotate(90deg)
      translate(0, var(--dist-from-center));
  }
  &.right {
    transform: translate(-50%, -50%) rotate(270deg)
      translate(0, var(--dist-from-center));
  }
}
.line {
  position: absolute;
  top: 50%;
  left: -20.71%; // 41.42% / 2
  width: 141.42%; // sqrt(2)
  border-bottom: 1px solid var(--color-ink-20);

  &:nth-child(1) {
    transform: rotate(45deg);
  }
  &:nth-child(2) {
    transform: rotate(-45deg);
  }
}
</style>
