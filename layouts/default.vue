<script>
  import _default from '@/components/public/default'
  import Vue from 'vue'
  
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
        meta: [{name: 'viewport', content: 'width=1240'}]
      }
    },
    mounted() {
      Vue.$scrollContent = this.$refs.content
    }
  }
</script>
<template>
  <div id="app" :class="{'day':$store.state.hex_client_background.active=='day'}" ref="app">
    <hex-header/>
    <div class="content" v-bar ref="content">
      <div>
        <nuxt/>
        <hex-footer/>
      </div>
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

