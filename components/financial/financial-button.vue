<template>

    <button class="rush" v-if="copeProduct.prostatus==1&&!getSur" @click="goRush">
      {{text?text:$t('manage.Buynow')}}
    </button>
    <button class="rush no_rush" v-else-if="copeProduct.prostatus==1&&getSur">{{$t('manage.soldOut')}}</button>
    <button class="rush no_rush" v-else-if="copeProduct.prostatus==2||copeProduct.prostatus==3">
      {{$t('manage.Over')}}
    </button>
    <button class="rush no_rush" v-else-if="copeProduct.prostatus==0">{{countDown}}</button>
  
</template>

<script>
  import moment from 'moment'
  
  export default {
    name: "finbutton",
    props: {
      text: '',
      isBuy: {
        type: Boolean,
        default: false
      },
      product: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data() {
      return {
        lang: this.$store.state.hex_lang.locale,
        countDown: '--',
        timer: null,
        copeProduct: Object.assign({}, this.product)
      };
    },
    computed: {
      /*计算剩余额度*/
      getSur: function () {
        return this.$np.minus(this.product.expectamount, this.product.selledamount) <= 0
      },
    },
    watch: {
      '$store.state.hex_lang.locale': function (val) {
        this.lang = val;
        this.startDown();
      }
    },
    methods: {
      
      startDown() {
        const time = this.global_get_local_time(this.copeProduct.startselltime)
        const thistime = this.global_get_local_time(new Date())
        const dur = moment.duration(time - thistime)
        const day = dur.asDays()
        const hours = dur.asHours()
        if (dur.asSeconds() > 0) {
          let m = dur.minutes()
          m = m < 10 ? '0' + m : m
          let h = dur.hours()
          h = h < 10 ? '0' + h : h
          let d = dur.days()
          if (day > 7) {
            // this.countDown = time.format('YYYY-MM-DD HH:mm:ss') + '开始'
            this.countDown = time.format('YYYY-MM-DD HH:mm:ss') + this.$t('manage.BStart')
          } else if (hours > 24) {
            // this.countDown = d + '天后开始'
            this.lang == 'en_us' ? this.countDown = this.$t('manage.Starts') + d + this.$t('manage.Startdays') : this.countDown = d + this.$t('manage.Startdays') + this.$t('manage.Starts');
            
          } else if (hours > 1) {
            // this.countDown = `${h}小时${m}` + '分钟后开始'
            this.lang == 'en_us' ? this.countDown = this.$t('manage.Starts') + ` ${h} ` + this.$t('deal.hour') + ` ${m} ` + this.$t('deal.minutes') : this.countDown = `${h} ` + this.$t('deal.hour') + ` ${m} ` + this.$t('manage.minutes') + this.$t('manage.Starts');
            
          } else {
            // this.countDown = `00小时${m}` + '分钟后开始'
            this.lang == 'en_us' ? this.countDown = this.$t('manage.Starts') + ` 00 ` + this.$t('deal.hour') + ` ${m} ` + this.$t('deal.minutes') : this.countDown = `00 ` + this.$t('deal.hour') + `${m} ` + this.$t('manage.minutes') + this.$t('manage.Starts');
            
          }
        } else {
          this.copeProduct.prostatus = 1
          clearTimeout(this.timer)
        }
      },
      goRush() {
        if (this.isBuy) {
          this.$emit('financial:buy')
        }
      }
    },
    mounted() {
      if (this.copeProduct.prostatus == 0) {
        this.startDown()
        this.timer = setTimeout(() => {
          this.startDown()
        }, 30 * 1000)
      }
    },
    beforeDestroy() {
      clearTimeout(this.timer)
    }
  }
</script>

<style scoped>

</style>
