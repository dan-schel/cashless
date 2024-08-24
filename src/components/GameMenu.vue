<script setup lang="ts">
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
</script>

<template>
  <div class="game-menu">
    <button @click="$emit('undo')" :disabled="!canUndo"><p>Undo</p></button>
    <button @click="$emit('redo')" :disabled="!canRedo"><p>Redo</p></button>
    <button @click="$emit('close')"><p>Close menu</p></button>
    <button @click="$emit('exit')"><p>Exit game</p></button>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/css-template/import" as template;

.game-menu {
  gap: 1rem;
  padding: 2rem;
  background-color: var(--color-paper-30);
  border-radius: 1rem;
}

button {
  @include template.button-filled-neutral;
  @include template.content-text;
  padding: 1rem;
  align-items: center;
  min-width: 15rem;
  p {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
  }

  &:nth-child(4) {
    @include template.button-filled;
    margin-top: 2rem;
  }
}
</style>
