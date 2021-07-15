<template>
  <!-- 虚拟长组件 -->
  <div class="container" ref="container" @scroll="onScroll">
    <div class="panel" ref="panel" :style="{ paddingTop: `${paddingTop}px` }">
      <div class="list" v-for="(list, index) in domList" :key="index">
        {{ list }}
      </div>
    </div>
  </div>
  <span>处理数据次数{{ runCount }}</span>
</template>

<script>
import { ref } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";
export default {
  name: "Virtual",
  props: {
    data: {
      type: Array,
      required: true,
    },
    buffTop: {
      type: Number,
      default: 100,
    },
    buffBottom: {
      type: Number,
      default: 100,
    },
  },

  setup(props) {
    const { data, buffTop, buffBottom } = props;
    let container = ref(null),
      panel = ref(null);
    let startIndex = ref(0),
      endIndex = ref(1),
      paddingTop = ref(0);
    let count = 0,
      itemHeight = 1;
    let domList = computed(() => data.slice(startIndex.value, endIndex.value));
    let runCount = ref(0);

    onMounted(() => {
      itemHeight = panel.value.firstElementChild.offsetHeight;
      panel.value.style.height = data.length * itemHeight + "px";
      count = Math.floor(container.value.offsetHeight / itemHeight);
      endIndex.value = count + buffBottom;
    });

    // 节流
    let timer = null;
    const onScroll = function (e) {
      let scrollValue = Math.floor(e.target.scrollTop / itemHeight);
      let mustScroll =
        (scrollValue <= startIndex.value ||
          scrollValue >= endIndex.value - count) &&
        Math.floor(scrollValue) !== 0;
      const run = () => {
        runCount.value += 1;
        let buff = scrollValue > buffTop ? buffTop : scrollValue;
        startIndex.value = scrollValue - buff;
        endIndex.value = scrollValue + count + buffBottom;
        paddingTop.value = startIndex.value * itemHeight;
      };

      if (mustScroll) run();
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        run();
      }, 100);
    };

    return {
      domList,
      panel,
      container,
      paddingTop,
      onScroll,
      runCount,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 600px;
  overflow: scroll;
  .panel {
    .list {
      border: 1px solid green;
      cursor: pointer;
      background: lightcyan;
    }
  }
}
</style>