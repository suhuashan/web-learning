<template>
  <div class="hello">
    {{ msg }}
    <p @click="handleClick">hello组件</p>
  </div>
</template>

<script>
import Bus from "./bus.js";
export default {
  name: "HelloWorld",
  props: {
    msg: String
    //没有设置props 接收的属性，默认会成为子元素根标签的属性，并且被$attrs收集
  },
  mounted() {
    this.$emit("helloEvent", { a: 111 }, 111);
    console.log(this.$attrs, this.$$listeners);
    this.$listeners.helloEvent(111);
  },
  methods: {
    handleClick() {
      Bus.$emit("fromFirst", "来自A的组件");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello {
  font-size: 30px;
  font-weight: 500;
}
</style>
