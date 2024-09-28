<script setup lang="ts">
defineProps<{
  joined: boolean;
}>();
defineEmits<{
  (e: "toggle"): void;
}>();
</script>

<template>
  <div class="lobby-player">
    <button v-if="!joined" class="join" @click="() => $emit('toggle')">
      <p>Join game</p>
    </button>
    <button v-else class="leave" @click="() => $emit('toggle')">
      <p>Leave game</p>
    </button>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/css-template/import" as template;
@use "@/assets/utils" as utils;

.lobby-player {
  margin-bottom: 4rem;
}

button {
  @include utils.big-button;
  @include template.button-filled-neutral;
}
</style>
