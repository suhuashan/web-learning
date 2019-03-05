<template>
  <div class="select">
    <button @click="show = !show">点击显示下拉菜单</button>
    <div class="dropdown" v-show="show">
      <p>下拉框内容，点击外面区域可以关闭</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
