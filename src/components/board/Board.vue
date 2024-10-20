<script setup lang="ts">
import { computed } from "vue";
import {
  houseCategories,
  mortgagableCategories,
  spaces,
  type BoardSpaceId,
} from "./spaces";
import { getBoardEdge, rotatePosition } from "./rotation";
import MdiTrainCrossingLight from "../icons/MdiTrainCrossingLight.vue";
import MdiTap from "../icons/MdiTap.vue";
import HeroiconsBoltSolid from "../icons/HeroiconsBoltSolid.vue";
import MdiCheckBold from "../icons/MdiCheckBold.vue";
import type { BoardRotation } from "@/data/game-state";
import GridIconsRotate from "../icons/GridIconsRotate.vue";

const props = defineProps<{
  rotation: BoardRotation;
  modelValue: BoardSpaceId[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: BoardSpaceId[]): void;
  (e: "rotate"): void;
}>();

const rotatedSpaces = computed(() => {
  return spaces.map((space) => {
    const position = rotatePosition(props.rotation, space);
    const cssClasses = ["space"];

    if (space.category !== null) {
      cssClasses.push(space.category);
    }

    const boardEdge = getBoardEdge(position);
    if (boardEdge !== null) {
      cssClasses.push(boardEdge);
    }

    const isHouse = houseCategories.includes(space.category);
    if (isHouse) {
      cssClasses.push("house");
    }

    const isMortgagable = mortgagableCategories.includes(space.category);
    if (isMortgagable) {
      cssClasses.push("mortgagable");
    }

    const isSelected = props.modelValue.includes(space.id);

    const isRotateButtonSpace = position.column === 10 && position.row === 0;
    if (isRotateButtonSpace) {
      cssClasses.push("rotate-button-space");
    }

    return {
      ...space,
      row: position.row,
      column: position.column,
      cssClasses,
      isHouse,
      isMortgagable,
      isSelected,
      isRotateButtonSpace,
    };
  });
});

function handleSpaceClick(id: BoardSpaceId) {
  if (props.modelValue.includes(id)) {
    emit(
      "update:modelValue",
      props.modelValue.filter((i) => i !== id),
    );
  } else {
    emit("update:modelValue", [...props.modelValue, id]);
  }
}
</script>

<template>
  <div class="board-container">
    <div class="board">
      <div class="center">
        <slot name="center"></slot>
      </div>
      <button
        v-for="space in rotatedSpaces"
        :key="space.id"
        :class="space.cssClasses"
        :style="`grid-column: ${space.column + 1}; grid-row: ${space.row + 1};`"
        :disabled="!space.isMortgagable"
        @click="handleSpaceClick(space.id)"
      >
        <div class="house-bar" v-if="space.isHouse"></div>
        <MdiTrainCrossingLight
          v-if="space.category === 'station'"
        ></MdiTrainCrossingLight>
        <HeroiconsBoltSolid
          v-if="space.id === 'utility-1'"
        ></HeroiconsBoltSolid>
        <MdiTap v-if="space.id === 'utility-2'"></MdiTap>
        <div class="selected-check" v-if="space.isSelected">
          <MdiCheckBold></MdiCheckBold>
        </div>
        <div class="rotate-button-container" v-if="space.isRotateButtonSpace">
          <button class="rotate-button" @click="emit('rotate')">
            <GridIconsRotate></GridIconsRotate>
          </button>
        </div>
      </button>
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
  display: grid;
  grid-column: 2 / span 9;
  grid-row: 2 / span 9;
}
.space {
  // For the selected-check.
  position: relative;

  &.mortgagable {
    @include template.button-filled-neutral;
  }
  &:not(.mortgagable) {
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 0.4rem,
      var(--color-soft) 0.4rem,
      var(--color-soft) 0.6rem
    );
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

  .selected-check {
    position: absolute;
    width: 3rem;
    height: 3rem;
    background-color: var(--color-white);
    border-radius: 1.5rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    align-items: center;
    justify-content: center;
    svg {
      font-size: 2.5rem;
      color: var(--color-on-accent);
    }
  }

  &.rotate-button-space {
    align-items: center;
    justify-content: center;
  }
  .rotate-button-container {
    background-color: var(--color-board);
    border-radius: 50%;
    padding: 0.5rem;
  }
  .rotate-button {
    @include template.button-filled-neutral;
    width: 3rem;
    height: 3rem;
    --button-rounding: 1.5rem;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 1.5rem;

      // Makes the icon look more centered.
      margin-left: -0.1em;
      margin-top: -0.1em;
    }
  }
}
</style>
