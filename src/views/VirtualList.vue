<template>
  <div>
    <span>虚拟长列表</span>
    <virtual-list :data="data" />
  </div>
</template>

<script>
import VirtualList from "../components/Virtual.vue";
export default {
  name: "ScrollList",
  components: {
    VirtualList,
  },
  setup() {
    const data = Array(100000)
      .fill(0)
      .map((v, i) => `数据${i + 1} `);
    return { data };
  },
};
</script>

<style lang="scss" scoped>
</style>