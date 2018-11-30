<script>
  import _default from '@/components/public/default'
  
  export default {
    name: 'error',
    data() {
      return {
        timer: null,
        title: 'HEX | ',
      }
    },
    components: {
      Default: _default
    },
    head() {
      return {
        title: this.title + this.$t('c2c.hexTitle'),
        meta: [{name: 'viewport', content: "width=device-width, initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0"}]
      }
    }
  }

</script>
<template>
  <div id="app" :class="{'day':$store.state.hex_client_background.active=='day'}" ref="app">
    <div class="content">
      <nuxt/>
    </div>
    <Default></Default>
  </div>
</template>
<style lang="less" scoped>
  .content {
    overflow: auto;
    height: 100%;
  }
</style>
