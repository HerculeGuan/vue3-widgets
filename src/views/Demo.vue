<template>
  <div>{{ msg }}</div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  setup() {
    let msg = "msg";
    return { msg };
  },
  beforeCreate() {
    console.log("beforeCreate", this.$el, this.msg);
  },
  created() {
    console.log("created", this.$el, this.msg);
  },
  beforeMount() {
    console.log("beforeMount", this.$el, this.msg);
  },
  mounted() {
    console.log("mounted", this.$el, this.msg);
  },
  beforeUpdate() {
    console.log("beforeUpdate", this.$el, this.msg);
  },
  updated() {
    console.log("updated", this.$el, this.msg);
  },
};
</script>

<style lang="scss" scoped>
</style>