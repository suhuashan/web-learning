<template>
  <div class="hello">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello {
  font-size: 30px;
  font-weight: 500;
}
</style>
