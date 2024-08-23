<script setup lang="ts">
import MoneyEntry from "./MoneyEntry.vue";
import { ref } from "vue";

const money = ref(0);
</script>

<template>
  <div class="menu">
    <MoneyEntry v-model="money"></MoneyEntry>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/css-template/import" as template;

// TODO: Add your code here.
</style>
