<template>
  <div class="home">
    <div class="title">Vue3小组件</div>
    <router-link
      class="link"
      :to="item.url"
      v-for="(item, index) in routeList"
      :key="index"
      >{{ item.name }}</router-link
    >
  </div>
</template>

<script>
export default {
  setup() {
    const routeList = [
      { name: "demo", url: "/demo" },
      { name: "虚拟长列表", url: "/virtualList" },
      { name: "chess", url: "/chess" },
    ];
    return { routeList };
  },
};
</script>

<style lang="scss" scoped>
.home {
  .title {
    font-size: 30px;
    margin-bottom: 50px;
  }
  .link {
    text-decoration: none;
    font-size: 20px;
    color: gray;
    margin: 20px;
  }
}
</style>