<template>
  <div
    class="single-chess"
    :style="{
      left: `${data.x * 50}px`,
      top: `${data.y * 50}px`,
      cursor: data.camp === bout ? 'pointer' : 'default',
    }"
    :class="{ campBlack: data.camp === 'black' }"
  >
    {{ data.name }}
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
export default {
  name: "SingleChess",
  props: {
    data: {
      required: true,
    },
    bout: {
      type: String,
    },
  },
  setup() {
    onMounted(() => {});
    return {};
  },
};
</script>

<style lang="scss" scoped>
.single-chess {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 44px;
  height: 44px;
  border: 1px solid gray;
  border-radius: 50%;
  font-size: 24px;
  font-weight: 500;
  background: #e69439;
  color: #ff1324;
  &.campBlack {
    background: #e79538;
    color: #16123c;
  }
}
</style>