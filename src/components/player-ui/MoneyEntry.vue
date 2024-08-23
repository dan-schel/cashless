<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: number;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const valueString = computed(() =>
  props.modelValue === 0 ? "" : props.modelValue.toFixed(),
);

function handleNum(num: string) {
  if (props.modelValue.toFixed().length >= 6) {
    return;
  }
  emit("update:modelValue", parseInt(valueString.value + num));
}
function handleBackspace() {
  const string = valueString.value.slice(0, -1);
  emit("update:modelValue", parseInt(string.length > 0 ? string : "0"));
}
</script>

<template>
  <div class="grid">
    <div class="value">
      <p v-if="valueString.length > 0">${{ valueString }}</p>
    </div>
    <button class="num-0" @click="() => handleNum('0')"><p>0</p></button>
    <button class="num-1" @click="() => handleNum('1')"><p>1</p></button>
    <button class="num-2" @click="() => handleNum('2')"><p>2</p></button>
    <button class="num-3" @click="() => handleNum('3')"><p>3</p></button>
    <button class="num-4" @click="() => handleNum('4')"><p>4</p></button>
    <button class="num-5" @click="() => handleNum('5')"><p>5</p></button>
    <button class="num-6" @click="() => handleNum('6')"><p>6</p></button>
    <button class="num-7" @click="() => handleNum('7')"><p>7</p></button>
    <button class="num-8" @click="() => handleNum('8')"><p>8</p></button>
    <button class="num-9" @click="() => handleNum('9')"><p>9</p></button>
    <button class="backspace" @click="handleBackspace"><p>&lt;</p></button>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/css-template/import" as template;

.grid {
  display: grid;
  grid-template-columns: 8rem 8rem 8rem;
  grid-template-rows: auto 6rem 6rem 6rem 6rem;
  grid-template-areas:
    "value value value"
    "num-7 num-8 num-9"
    "num-4 num-5 num-6"
    "num-1 num-2 num-3"
    "num-0 num-0 backspace";
  column-gap: 1rem;
  row-gap: 1rem;
  margin-bottom: 4rem;
}

.value {
  grid-area: value;
  margin-bottom: 1rem;
  align-items: flex-end;
  justify-content: center;
  background-color: var(--color-ink-20);
  padding: 0 1rem;
  border-radius: 0.5rem;
  height: 6rem;

  p {
    font-size: 4rem;
  }
}

button {
  @include template.button-filled-neutral;
  align-items: center;
  justify-content: center;
  p {
    font-size: 3rem;
  }
}

.num-0 {
  grid-area: num-0;
}
.num-1 {
  grid-area: num-1;
}
.num-2 {
  grid-area: num-2;
}
.num-3 {
  grid-area: num-3;
}
.num-4 {
  grid-area: num-4;
}
.num-5 {
  grid-area: num-5;
}
.num-6 {
  grid-area: num-6;
}
.num-7 {
  grid-area: num-7;
}
.num-8 {
  grid-area: num-8;
}
.num-9 {
  grid-area: num-9;
}
.backspace {
  grid-area: backspace;
}
</style>
