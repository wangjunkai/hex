<template>
  <div class="nuxt-progress" :style="{
    'width': percent + '%',
    'height': height,
    'background-color': canSuccess ? color : failedColor,
    'opacity': show ? 1 : 0
  }"></div>
</template>

<script>
  import Vue from 'vue'
  
  export default {
    name: 'loading',
    data() {
      return {
        percent: 0,
        show: false,
        canSuccess: true,
        throttle: 0,
        duration: 2000,
        height: 2,
        color: 0,
        failedColor: 'red',
      }
    },
    methods: {
      start() {
        this.canSuccess = true
        if (this._throttle) {
          clearTimeout(this._throttle)
        }
        if (this._timer) {
          clearInterval(this._timer)
          this._timer = null
          this.percent = 0
        }
        this._throttle = setTimeout(() => {
          this.show = true
          this._cut = 10000 / Math.floor(this.duration)
          this._timer = setInterval(() => {
            if (this.percent < 95) {
              this.increase(this._cut * Math.random())
            }
          }, 100)
        }, this.throttle)
      },
      /*禁止 ajax 调用*/
      /*      set(num) {
              this.show = true
              this.canSuccess = true
              this.percent = Math.floor(num)
            },*/
      get() {
        return Math.floor(this.percent)
      },
      increase(num) {
        this.percent = this.percent + Math.floor(num)
      },
      decrease(num) {
        this.percent = this.percent - Math.floor(num)
      },
      finish() {
        this.percent = 100
        this.hide()
      },
      pause() {
        clearInterval(this._timer)
        return this
      },
      hide() {
        clearInterval(this._timer)
        this._timer = null
        clearTimeout(this._throttle)
        this._throttle = null
        setTimeout(() => {
          /*初始化滚动条*/
          if (Vue.$scrollContent) {
            let ref = Vue.vuebar.getState(Vue.$scrollContent);
            ref && ref.el2 && (ref.el2.scrollTop = 0)
          }
        }, 50)
        setTimeout(() => {
          this.show = false
          Vue.nextTick(() => {
            setTimeout(() => {
              this.percent = 0
            }, 200)
          })
        }, 500)
      },
      fail() {
        this.canSuccess = false
      }
    }
  }
</script>

<style>
  .nuxt-progress {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    width: 0;
    transition: width 0.2s, opacity 0.4s;
    opacity: 1;
    background-color: #6f8ff1;
    z-index: 999999;
  }
</style>
