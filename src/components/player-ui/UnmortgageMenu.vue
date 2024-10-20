<script setup lang="ts">
import { GameState } from "@/data/game-state";
import Board from "../board/Board.vue";
import type { BoardSpaceId } from "../board/spaces";
import { computed, ref } from "vue";
import { unmortgagePrices } from "../board/prices";
import type { Player } from "@/data/player";
import { formatMoney } from "../utils";

defineProps<{
  player: Player;
  gameState: GameState;
}>();

const selectedSpaces = ref<BoardSpaceId[]>([]);

const payment = computed(() => {
  return selectedSpaces.value.reduce((total, space) => {
    return total + unmortgagePrices[space];
  }, 0);
});

const emit = defineEmits<{
  (e: "cancel"): void;
  (e: "submit", payment: number): void;
}>();
</script>

<template>
  <Board v-model="selectedSpaces">
    <template #center>
      <div class="controls">
        <p class="title">Unmortgage</p>
        <p class="instructions" v-if="selectedSpaces.length == 0">
          (Choose the spaces on the board you wish to unmortgage.)
        </p>
        <template v-else>
          <p class="mortgage-sentence">
            Unmortgaging
            {{
              selectedSpaces.length > 1
                ? `these ${selectedSpaces.length} properties`
                : "this property"
            }}
            costs:
          </p>
          <p class="money">${{ payment }}</p>
        </template>
        <p class="balance-sentence">
          {{
            selectedSpaces.length == 0
              ? "Your current balance is:"
              : "This brings your total balance to:"
          }}
        </p>
        <p class="money">{{ formatMoney(player.balance - payment) }}</p>
        <div class="actions">
          <button class="cancel" @click="emit('cancel')">
            <p>Cancel</p>
          </button>
          <button
            class="submit"
            @click="emit('submit', payment)"
            :disabled="selectedSpaces.length == 0"
          >
            <p>Unmortgage</p>
          </button>
        </div>
      </div>
    </template>
  </Board>
</template>

<style scoped lang="scss">
@use "@/assets/css-template/import" as template;
@use "@/assets/utils" as utils;

.controls {
  align-items: center;
  justify-content: center;
}

.title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.actions {
  @include template.row;
  gap: 1rem;
}

.cancel {
  @include utils.big-button;
  @include template.button-filled-neutral;
}

.submit {
  @include utils.big-button;
  @include template.button-filled;
}

.instructions {
  text-align: center;
  margin-bottom: 2rem;
}
.mortgage-sentence,
.balance-sentence {
  text-align: center;
  margin-bottom: 1rem;
}

.money {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 2rem;
}
</style>
