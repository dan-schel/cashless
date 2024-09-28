<script setup lang="ts">
import { useFullscreen } from "@/hooks/fullscreen";

defineProps<{
  canUndo: boolean;
  canRedo: boolean;
}>();

defineEmits<{
  (e: "undo"): void;
  (e: "redo"): void;
  (e: "exit"): void;
  (e: "close"): void;
}>();

const { isFullscreen, toggleFullscreen } = useFullscreen();
</script>

<template>
  <div class="game-menu">
    <div class="title-row">
      <p class="title">Game menu</p>
      <button @click="$emit('close')"><p>X</p></button>
    </div>
    <div class="options">
      <button @click="$emit('undo')" :disabled="!canUndo"><p>Undo</p></button>
      <button @click="$emit('redo')" :disabled="!canRedo"><p>Redo</p></button>
      <button @click="toggleFullscreen">
        <p>
          {{ !isFullscreen ? "Enter fullscreen" : "Exit fullscreen" }}
        </p>
      </button>
      <button @click="$emit('exit')"><p>Exit game</p></button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/css-template/import" as template;
@use "@/assets/utils" as utils;

.game-menu {
  gap: 2rem;
  padding: 2rem;
  background-color: var(--color-background-dialog);
  border-radius: 1rem;
}

.title-row {
  @include template.row;
  justify-content: space-between;

  button {
    @include template.button-hover;
    @include template.content-text;
    p {
      font-size: 1.5rem;
    }
  }
}
.title {
  text-align: center;
  font-size: 1.5rem;
}

.options {
  gap: 1rem;
}
.options button {
  @include utils.big-button;
  min-width: 15rem;

  &:nth-child(4) {
    @include template.button-filled;
    --color-accent: var(--color-error);
    --color-accent-hover: var(--color-error-hover);
    --color-accent-active: var(--color-error-active);
    margin-top: 2rem;
  }
  &:not(:nth-child(4)) {
    @include template.button-filled-neutral;
  }
}
</style>
