<template>
  <p>
    <nuxt-link to="/financial" tag="span" class="item">{{$t('manage.Financialproduct')}}</nuxt-link>
    >
    <nuxt-link to="/financial/list" tag="span" class="item">{{$t('manage.ProductList')}}</nuxt-link>
  </p>
</template>

<script>
  export default {
    name: "map-list"
  }
</script>

<style lang='less' scoped>
  @import "../../static/styles/color";
  
  .item {
    font-size: 14px;
    color: @cl_link;
    cursor: pointer;
    padding: 0 5px;
  }
</style>
