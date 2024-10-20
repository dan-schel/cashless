<script setup lang="ts">
import Lobby from "./Lobby.vue";
import { GameState } from "@/data/game-state";
import { GameStateHistory } from "@/data/game-state-history";
import { Player } from "@/data/player";
import { onMounted, ref } from "vue";
import { uuid } from "@dan-schel/js-utils";
import { isSavedStateAvailable, loadState } from "@/data/persistence";
import { useFullscreen } from "@/hooks/fullscreen";

const emit = defineEmits<{
  (e: "gameReady", gameState: GameStateHistory): void;
}>();

const showLobby = ref(false);
const hasSavedGame = ref(false);

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

  const newGame = new GameStateHistory(new GameState(players, 0, 0), [], []);

  emit("gameReady", newGame);
}

function handleLoadGame() {
  const loadedGame = loadState();

  if (loadedGame == null) {
    alert("Failed to load save game.");
    return;
  }

  emit("gameReady", loadedGame);
}

function handleCancelLobby() {
  showLobby.value = false;
}

onMounted(() => {
  hasSavedGame.value = isSavedStateAvailable();
});

const { isFullscreen, toggleFullscreen } = useFullscreen();
</script>

<template>
  <Lobby
    v-if="showLobby"
    class="lobby"
    @submit="handleSubmitLobby"
    @cancel="handleCancelLobby"
  />
  <div v-else class="menu">
    <p class="title">Cashless</p>
    <button class="new-game" @click="handleNewGame"><p>New game</p></button>
    <button class="load-game" @click="handleLoadGame" :disabled="!hasSavedGame">
      <p>Load game</p>
    </button>
    <button class="toggle-fullscreen" @click="toggleFullscreen">
      <p>
        {{ !isFullscreen ? "Enter fullscreen" : "Exit fullscreen" }}
      </p>
    </button>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/css-template/import" as template;
@use "@/assets/utils" as utils;

.menu {
  @include template.flex-grow;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.title {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 1rem;
}

button {
  @include template.content-text;
  padding: 1rem;
}

.new-game {
  @include template.button-filled;
  @include utils.big-button;
}

.load-game,
.toggle-fullscreen {
  @include template.button-filled-neutral;
  @include utils.small-button;
}
</style>
