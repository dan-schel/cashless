<script setup lang="ts">
import Lobby from "./Lobby.vue";
import { GameState } from "@/data/game-state";
import { Player } from "@/data/player";
import { ref } from "vue";
import { uuid } from "@dan-schel/js-utils";

const emit = defineEmits<{
  (e: "gameReady", gameState: GameState): void;
}>();

const showLobby = ref(false);

function handleNewGame() {
  showLobby.value = true;
}
function handleSubmitLobby(requestedPlayers: {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
}) {
  const players: Player[] = [];

  if (requestedPlayers.top) {
    players.push(new Player(uuid(), 1500, "top"));
  }
  if (requestedPlayers.bottom) {
    players.push(new Player(uuid(), 1500, "bottom"));
  }
  if (requestedPlayers.left) {
    players.push(new Player(uuid(), 1500, "left"));
  }
  if (requestedPlayers.right) {
    players.push(new Player(uuid(), 1500, "right"));
  }

  emit("gameReady", new GameState(players));
}
</script>

<template>
  <Lobby v-if="showLobby" class="lobby" @submit="handleSubmitLobby" />
  <div v-else class="menu">
    <button class="new-game" @click="handleNewGame"><p>New game</p></button>
    <button class="load-game"><p>Load game</p></button>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/css-template/import" as template;

.menu {
  @include template.flex-grow;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

button {
  @include template.content-text;
  padding: 1rem;
}

.new-game {
  @include template.button-filled;
  p {
    font-size: 2rem;
    font-weight: bold;
  }
}

.load-game {
  @include template.button-filled-neutral;
  p {
    font-size: 1.5rem;
  }
}
</style>
