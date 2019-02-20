<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" ref="hello" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  mounted() {
    console.log(this.$refs.hello);
    console.log(this.$refs.hello.$el);
    console.log(this.$children[0] === this.$refs.hello);
  }
};
</script>
