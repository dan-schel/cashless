<script setup lang="ts">
import { Player } from "@/data/player";
import { GameState } from "@/data/game-state";
import { ref } from "vue";
import MainControls from "./MainControls.vue";
import PayMenu from "./PayMenu.vue";
import EarnMenu from "./EarnMenu.vue";
import FreeParkingMenu from "./FreeParkingMenu.vue";

const props = defineProps<{
  player: Player;
  playerInControl: string | null;
  gameState: GameState;
}>();

const emit = defineEmits<{
  (e: "update:playerInControl", value: string | null): void;
  (e: "update:gameState", value: GameState): void;
}>();

const menuOpen = ref<
  "pay" | "earn" | "free-parking" | "mortgage" | "unmortgage" | null
>(null);

function openMenu(
  menu: "pay" | "earn" | "free-parking" | "mortgage" | "unmortgage",
) {
  emit("update:playerInControl", props.player.id);
  menuOpen.value = menu;
}

function closeMenu(newGameState?: GameState) {
  if (newGameState != null) {
    emit("update:gameState", newGameState);
  }
  emit("update:playerInControl", null);
  menuOpen.value = null;
}
</script>

<template>
  <div
    v-if="playerInControl == null || playerInControl === player.id"
    class="player-ui"
  >
    <PayMenu
      v-if="menuOpen === 'pay'"
      :player="player"
      :gameState="gameState"
      @submit="
        (to, amount) => {
          closeMenu(gameState.afterPayment(player, to, amount));
        }
      "
    ></PayMenu>
    <EarnMenu
      v-else-if="menuOpen === 'earn'"
      @submit="
        (amount) => {
          closeMenu(gameState.afterEarning(player, amount));
        }
      "
    ></EarnMenu>
    <FreeParkingMenu
      v-else-if="menuOpen === 'free-parking'"
      :game-state="gameState"
      @cancel="closeMenu()"
      @submit="closeMenu(gameState.afterCollectingFreeParking(player))"
    ></FreeParkingMenu>
    <MainControls
      v-else
      :player="player"
      @pay="openMenu('pay')"
      @earn="openMenu('earn')"
      @free-parking="openMenu('free-parking')"
    ></MainControls>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/css-template/import" as template;
</style>
