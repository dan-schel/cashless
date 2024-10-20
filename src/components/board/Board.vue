<script setup lang="ts">
import { computed } from "vue";
import { spaces } from "./spaces";
import { getBoardEdge, rotatePosition } from "./rotation";
import MdiTrainCrossingLight from "../icons/MdiTrainCrossingLight.vue";
import MdiTap from "../icons/MdiTap.vue";
import HeroiconsBoltSolid from "../icons/HeroiconsBoltSolid.vue";

const rotatedSpaces = computed(() => {
  return spaces.map((space) => {
    const position = rotatePosition(0, space);
    const cssClasses = ["space"];

    if (space.category !== null) {
      cssClasses.push(space.category);
    }

    const boardEdge = getBoardEdge(position);
    if (boardEdge !== null) {
      cssClasses.push(boardEdge);
    }

    const isHouse =
      space.category != null &&
      [
        "brown",
        "light-blue",
        "pink",
        "orange",
        "red",
        "yellow",
        "green",
        "dark-blue",
      ].includes(space.category);
    if (isHouse) {
      cssClasses.push("house");
    }

    return {
      ...space,
      row: position.row,
      column: position.column,
      cssClasses,
      isHouse,
    };
  });
});

// TODO: Add your code here.
</script>

<template>
  <div class="board-container">
    <div class="board">
      <div class="center">
        <slot name="center"></slot>
      </div>
      <div
        v-for="space in rotatedSpaces"
        :key="space.id"
        :class="space.cssClasses"
        :style="`grid-column: ${space.column + 1}; grid-row: ${space.row + 1};`"
      >
        <div class="house-bar" v-if="space.isHouse"></div>
        <MdiTrainCrossingLight
          v-if="space.category === 'station'"
        ></MdiTrainCrossingLight>
        <HeroiconsBoltSolid
          v-if="space.id === 'utility-1'"
        ></HeroiconsBoltSolid>
        <MdiTap v-if="space.id === 'utility-2'"></MdiTap>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/css-template/import" as template;

.board-container {
  display: grid;
  padding: 2rem;

  height: min(100vh, 100vw);
  width: min(100vh, 100vw);
  height: min(100svh, 100svw);
  width: min(100svh, 100svw);
}
.board {
  border: 4px solid var(--color-soft-border);
  background-color: var(--color-board);
  display: grid;
  gap: 0.25rem;
  padding: 0.25rem;
  grid-template-columns: 5fr repeat(9, 4fr) 5fr;
  grid-template-rows: 5fr repeat(9, 4fr) 5fr;
}
.center {
  grid-column: 2 / span 9;
  grid-row: 2 / span 9;
}
.space {
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 0.4rem,
    var(--color-soft) 0.4rem,
    var(--color-soft) 0.6rem
  );

  &.house,
  &.station,
  &.utility {
    background: var(--color-soft);
  }

  &.house {
    display: grid;

    .house-bar {
      background-color: var(--color-accent);
      grid-area: house-bar;
    }

    &.top {
      grid-template-rows: 3fr 1fr;
      grid-template-areas: "." "house-bar";
    }
    &.bottom {
      grid-template-rows: 1fr 3fr;
      grid-template-areas: "house-bar" ".";
    }
    &.left {
      grid-template-columns: 3fr 1fr;
      grid-template-areas: ". house-bar";
    }
    &.right {
      grid-template-columns: 1fr 3fr;
      grid-template-areas: "house-bar .";
    }

    &.brown {
      --color-accent: var(--color-brown);
    }
    &.light-blue {
      --color-accent: var(--color-light-blue);
    }
    &.pink {
      --color-accent: var(--color-pink);
    }
    &.orange {
      --color-accent: var(--color-orange);
    }
    &.red {
      --color-accent: var(--color-red);
    }
    &.yellow {
      --color-accent: var(--color-yellow);
    }
    &.green {
      --color-accent: var(--color-green);
    }
    &.dark-blue {
      --color-accent: var(--color-dark-blue);
    }
  }

  &.station,
  &.utility {
    align-items: center;
    justify-content: center;
    svg {
      font-size: 3rem;
      color: var(--color-text-weak);
    }
  }
}
</style>
