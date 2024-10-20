<script setup lang="ts">
import { Player } from "@/data/player";

defineProps<{
  player: Player;
}>();
defineEmits<{
  (e: "pay"): void;
  (e: "earn"): void;
  (e: "freeParking"): void;
  (e: "go"): void;
  (e: "mortgage"): void;
  (e: "unmortgage"): void;
}>();
</script>

<template>
  <div class="controls">
    <p class="balance">
      {{
        player.balance >= 0
          ? `$${player.balance.toFixed()}`
          : `-$${Math.abs(player.balance).toFixed()}`
      }}
    </p>
    <div class="primary-actions">
      <button @click="() => $emit('pay')">
        <p>Pay</p>
      </button>
      <button @click="() => $emit('earn')"><p>Earn</p></button>
    </div>
    <div class="secondary-actions">
      <button @click="() => $emit('freeParking')"><p>Free parking</p></button>
      <button @click="() => $emit('go')"><p>Go</p></button>
      <button @click="() => $emit('mortgage')"><p>Mortgage</p></button>
      <button @click="() => $emit('unmortgage')"><p>Unmortgage</p></button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/css-template/import" as template;
@use "@/assets/utils" as utils;

.controls {
  align-items: center;
  gap: 1rem;
  padding-bottom: 3rem;
}

.primary-actions,
.secondary-actions {
  @include template.row;
  gap: 1rem;
}

.primary-actions {
  button {
    @include template.button-filled;
    @include utils.big-button;
  }
}
.secondary-actions {
  button {
    @include template.button-filled-neutral;
    @include utils.small-button;
  }
}

.balance {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 1rem;
}
</style>
