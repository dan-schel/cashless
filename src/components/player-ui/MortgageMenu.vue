<script setup lang="ts">
import { GameState } from "@/data/game-state";
import Board from "../board/Board.vue";
import type { BoardSpaceId } from "../board/spaces";
import { computed, ref } from "vue";
import { mortgagePrices } from "../board/prices";
import type { Player } from "@/data/player";
import { formatMoney } from "../utils";
import { chooseRotation } from "../board/rotation";

const props = defineProps<{
  player: Player;
  gameState: GameState;
}>();

const selectedSpaces = ref<BoardSpaceId[]>([]);

const earnings = computed(() => {
  return selectedSpaces.value.reduce((total, space) => {
    return total + mortgagePrices[space];
  }, 0);
});

const boardRotation = computed(() => {
  return chooseRotation(props.gameState, props.player);
});

const emit = defineEmits<{
  (e: "cancel"): void;
  (e: "submit", earnings: number): void;
  (e: "rotate-board"): void;
}>();
</script>

<template>
  <Board
    v-model="selectedSpaces"
    :rotation="boardRotation"
    @rotate="emit('rotate-board')"
  >
    <template #center>
      <div class="controls">
        <p class="title">Mortgage</p>
        <p class="instructions" v-if="selectedSpaces.length == 0">
          (Choose the spaces on the board you wish to mortgage.)
        </p>
        <template v-else>
          <p class="mortgage-sentence">
            By mortgaging
            {{
              selectedSpaces.length > 1
                ? `these ${selectedSpaces.length} properties`
                : "this property"
            }}, you will earn:
          </p>
          <p class="money">${{ earnings }}</p>
        </template>
        <p class="balance-sentence">
          {{
            selectedSpaces.length == 0
              ? "Your current balance is:"
              : "This brings your total balance to:"
          }}
        </p>
        <p class="money">{{ formatMoney(player.balance + earnings) }}</p>
        <div class="actions">
          <button class="cancel" @click="emit('cancel')">
            <p>Cancel</p>
          </button>
          <button
            class="submit"
            @click="emit('submit', earnings)"
            :disabled="selectedSpaces.length == 0"
          >
            <p>Mortgage</p>
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
