<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld
      msg="Welcome to Your Vue.js App"
      ref="hello"
      v-on:helloEvent="helloEvent"
      password="password"
    />
    <!-- v-model 的语法糖实现-->
    <input
      type="text"
      v-bind:value="modelValue"
      v-on:input="modelValue = $event.target.value"
    />
    <input type="text" v-model="modelValue" />
    <Sync :show.sync="show"></Sync>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Sync from "@/components/Sync.vue";
export default {
  name: "home",
  components: {
    HelloWorld,
    Sync
  },
  data() {
    return {
      name: "jgchen",
      modelValue: "jgchen",
      show: true
    };
  },
  mounted() {
    //this.$refs取到的是组件 this.$el 取到的是组件挂载的元素
    console.log("home attrs listeners", this.$attrs, this.$listeners);
    console.log("this.$refs.hello", this.$refs.hello);
    console.log("this.$refs.hello.$el", this.$refs.hello.$el);
    console.log(this.$children[0] === this.$refs.hello);
  },
  methods: {
    helloEvent(...args) {
      console.log("helloevent data", args);
    },
    // 当value绑定为一个定值，那么第一次输入只会触发第一次的改变，因为后面value没变，就不会触发input事件了。
    InputChange(e) {
      console.log(e.target.value);
    }
  }
};
</script>
