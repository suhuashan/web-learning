<template>
  <div v-show="show">
    <p>这是一个Model框</p>
    <p>{{ Bmsg }}</p>
    <button @click="closeModel">关闭model</button>
  </div>
</template>
<script>
import Bus from "./bus.js";
export default {
  props: ["show"],
  created() {
    Bus.$on("fromFirst", Amsg => {
      this.Bmsg = Amsg;
      console.log("同级组件交互成功");
    });
  },
  data() {
    return {
      Bmsg: ""
    };
  },
  methods: {
    closeModel() {
      this.$emit("update:show", false);
    }
  }
};
</script>
