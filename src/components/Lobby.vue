<script setup lang="ts">
import Quadrants from "./Quadrants.vue";
import LobbyPlayer from "./LobbyPlayer.vue";
import { ref, computed } from "vue";

const emit = defineEmits<{
  (
    e: "submit",
    players: { top: boolean; bottom: boolean; left: boolean; right: boolean },
  ): void;
}>();

const topJoined = ref(false);
const bottomJoined = ref(false);
const leftJoined = ref(false);
const rightJoined = ref(false);

const playerCount = computed(() => {
  return [topJoined, bottomJoined, leftJoined, rightJoined].filter(
    (p) => p.value,
  ).length;
});

function toggleTop() {
  topJoined.value = !topJoined.value;
}
function toggleBottom() {
  bottomJoined.value = !bottomJoined.value;
}
function toggleLeft() {
  leftJoined.value = !leftJoined.value;
}
function toggleRight() {
  rightJoined.value = !rightJoined.value;
}

function handleStart() {
  if (playerCount.value < 2) {
    return;
  }

  emit("submit", {
    top: topJoined.value,
    bottom: bottomJoined.value,
    left: leftJoined.value,
    right: rightJoined.value,
  });
}
</script>

<template>
  <Quadrants>
    <template #top>
      <LobbyPlayer :joined="topJoined" @toggle="toggleTop"></LobbyPlayer>
    </template>
    <template #bottom>
      <LobbyPlayer :joined="bottomJoined" @toggle="toggleBottom"></LobbyPlayer>
    </template>
    <template #left>
      <LobbyPlayer :joined="leftJoined" @toggle="toggleLeft"></LobbyPlayer>
    </template>
    <template #right>
      <LobbyPlayer :joined="rightJoined" @toggle="toggleRight"></LobbyPlayer>
    </template>
    <template #center>
      <button v-if="playerCount >= 2" class="start" @click="handleStart">
        <p>Start</p>
      </button>
    </template>
  </Quadrants>
</template>

<style scoped lang="scss">
@use "@/assets/css-template/import" as template;

.start {
  @include template.content-text;
  @include template.button-filled;
  padding: 1rem;
  p {
    font-size: 1.5rem;
    font-weight: bold;
  }
}
</style>
