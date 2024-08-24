<script setup lang="ts">
import { Player } from "@/data/player";

defineProps<{
  player: Player;
}>();
defineEmits<{
  (e: "pay"): void;
  (e: "earn"): void;
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
      <button><p>Free Parking</p></button>
      <button><p>Mortgage</p></button>
      <button><p>Unmortgage</p></button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/css-template/import" as template;

.controls {
  align-items: center;
  gap: 1rem;
  padding-bottom: 4rem;
}

.primary-actions,
.secondary-actions {
  @include template.row;
  gap: 1rem;
}

button {
  @include template.content-text;
  padding: 1rem;
}
.primary-actions {
  button {
    @include template.button-filled;
    p {
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
}
.secondary-actions {
  button {
    @include template.button-filled-neutral;
  }
}

.balance {
  text-align: center;
  font-size: 4rem;
  margin-bottom: 1rem;
}
</style>
