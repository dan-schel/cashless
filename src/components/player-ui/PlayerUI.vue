<script setup lang="ts">
import { Player } from "@/data/player";
import { GameState } from "@/data/game-state";
import { ref } from "vue";
import MainControls from "./MainControls.vue";
import PayMenu from "./PayMenu.vue";

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

function handlePay() {
  emit("update:playerInControl", props.player.id);
  menuOpen.value = "pay";
}
</script>

<template>
  <div
    v-if="playerInControl == null || playerInControl === player.id"
    class="player-ui"
  >
    <PayMenu v-if="menuOpen === 'pay'"></PayMenu>
    <MainControls v-else :player="player" @pay="handlePay"></MainControls>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/css-template/import" as template;
</style>
