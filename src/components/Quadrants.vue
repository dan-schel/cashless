<script setup lang="ts"></script>

<template>
  <div class="quadrants-container">
    <div class="quadrants-area">
      <div class="child top">
        <slot name="top"></slot>
      </div>
      <div class="child bottom">
        <slot name="bottom"></slot>
      </div>
      <div class="child left">
        <slot name="left"></slot>
      </div>
      <div class="child right">
        <slot name="right"></slot>
      </div>
      <div class="child center">
        <slot name="center"></slot>
      </div>
      <div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/css-template/import" as template;

.quadrants-container {
  justify-content: center;
}
.quadrants-area {
  position: relative;
  background-color: var(--color-paper-20);
  aspect-ratio: 1;
  align-self: center;

  height: min(100vh, 100vw);
  width: min(100vh, 100vw);
  height: min(100svh, 100svw);
  width: min(100svh, 100svw);
}
.child {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;

  --dist-from-center: min(50vh, 50vw);
  --dist-from-center: min(50svh, 50svw);

  &.top {
    transform: translate(-50%, -50%) rotate(180deg)
      translate(0, var(--dist-from-center)) translate(0, -50%);
  }
  &.bottom {
    transform: translate(-50%, -50%) rotate(0deg)
      translate(0, var(--dist-from-center)) translate(0, -50%);
  }
  &.left {
    transform: translate(-50%, -50%) rotate(90deg)
      translate(0, var(--dist-from-center)) translate(0, -50%);
  }
  &.right {
    transform: translate(-50%, -50%) rotate(270deg)
      translate(0, var(--dist-from-center)) translate(0, -50%);
  }
  &.center {
    transform: translate(-50%, -50%);
    z-index: 3;
  }
}
.line {
  position: absolute;
  top: 50%;
  left: -20.71%; // 41.42% / 2
  width: 141.42%; // sqrt(2)
  border-bottom: 1px solid var(--color-ink-20);
  z-index: 2;

  &:nth-child(1) {
    transform: rotate(45deg);
  }
  &:nth-child(2) {
    transform: rotate(-45deg);
  }
}
</style>
