<template>
  <div class="down">
    <nuxt-link to="/mobile/download"><img src="../../static/images/guide/down-item.png" alt=""></nuxt-link>
  </div>
</template>

<script>
  export default {
    name: "downitem"
  }
</script>

<style lang="less" scoped>
  .down {
    width: 100%;
    height: auto;
    position: absolute;
    bottom: -5px;
    z-index: 10;
  }
</style>
