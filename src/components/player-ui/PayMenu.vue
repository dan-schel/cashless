<script setup lang="ts">
import { GameState } from "@/data/game-state";
import { getRelativePlayerLocations } from "@/data/board-utils";
import { Player } from "@/data/player";
import MoneyEntry from "./MoneyEntry.vue";
import { computed, ref } from "vue";

const props = defineProps<{
  player: Player;
  gameState: GameState;
}>();

const emit = defineEmits<{
  (e: "submit", to: Player | "bank" | "free-parking", amount: number): void;
  (e: "cancel"): void;
}>();

const to = ref<Player | "bank" | "free-parking" | null>();
const amount = ref(0);

const players = computed(() =>
  getRelativePlayerLocations(props.player.side, props.gameState.players),
);

function handleSelect(chosen: Player | "bank" | "free-parking") {
  to.value = chosen;
}

function handleSubmit() {
  if (to.value == null || amount.value <= 0) {
    return;
  }
  emit("submit", to.value!, amount.value);
}
</script>

<template>
  <div class="to-select" v-if="to == null">
    <p class="title">Pay who?</p>
    <div class="players">
      <button
        v-if="players.myLeft != null"
        @click="handleSelect(players.myLeft)"
      >
        <p>My left</p>
      </button>
      <button
        v-if="players.opposite != null"
        @click="handleSelect(players.opposite)"
      >
        <p>Opposite</p>
      </button>
      <button
        v-if="players.myRight != null"
        @click="handleSelect(players.myRight)"
      >
        <p>My right</p>
      </button>
    </div>
    <div class="secondary">
      <button @click="handleSelect('bank')"><p>The bank</p></button>
      <button @click="handleSelect('free-parking')">
        <p>Free parking</p>
      </button>
      <button @click="$emit('cancel')">
        <p>Cancel</p>
      </button>
    </div>
  </div>
  <div class="money-entry-page" v-else>
    <p class="title">How much?</p>
    <MoneyEntry class="money-entry" v-model="amount"></MoneyEntry>
    <div class="actions">
      <button class="cancel" @click="$emit('cancel')">
        <p>Cancel</p>
      </button>
      <button class="pay" @click="handleSubmit" :disabled="amount <= 0">
        <p>Pay</p>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/css-template/import" as template;
@use "@/assets/utils" as utils;

.to-select,
.money-entry-page {
  gap: 1rem;
  padding-bottom: 3rem;
}

.to-select {
  align-items: center;
}

.title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.players,
.secondary {
  @include template.row;
  gap: 1rem;
}

.players button,
.pay {
  @include utils.big-button;
  @include template.button-filled;
}
.secondary button {
  @include utils.small-button;
  @include template.button-filled-neutral;
}
.cancel {
  @include utils.big-button;
  @include template.button-filled-neutral;
}
.money-entry {
  margin-bottom: 2rem;
}
.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
</style>
