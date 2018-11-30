<template>
  <div class="new-money">
    <div class="money-type"
         @mouseenter="setActiveCoin(true)"
         @mouseleave="setActiveCoin(false)">
      <span class="select_collect" :class="{'active':copeDailyDetail.self}" @click="collect(dailyDetail)"></span>
      <span class="type-weight">{{symblefrom}}</span>
      <span class="type-tip">/</span>
      <span class="type-normal">{{symbleto}}</span>
    </div>
    <ul class="new-money-list">
      <li>
        <span class="new-money-title">{{$t('deal.newPrice')}}</span>
        <p class="new-money-num" v-if="dailyDetail.symble">
          <span class="new-money-dot">{{global_get_tofixed(dailyDetail.c)}}</span>
          <span class="new-money-price">{{getNewMarketClientRate(dailyDetail.c)}} {{$store.getters.get_client_exchange_rate_name.name}}</span>
        </p>
        <p v-else>
          --
        </p>
      </li>
      <li>
        <span class="new-money-title">{{$t('deal.hourHPrice')}}</span>
        <p class="new-money-num" v-if="dailyDetail.symble">
          <span class="new-money-dot">{{global_get_tofixed(dailyDetail.h)}}</span>
          <span class="new-money-price">{{getNewMarketClientRate(dailyDetail.h)}} {{$store.getters.get_client_exchange_rate_name.name}}</span>
        </p>
        <p v-else>
          --
        </p>
      </li>
      <li>
        <span class="new-money-title">{{$t('deal.hourLPrice')}}</span>
        <p class="new-money-num" v-if="dailyDetail.symble">
          <span class="new-money-dot">{{global_get_tofixed(dailyDetail.l)}}</span>
          <span class="new-money-price">{{getNewMarketClientRate(dailyDetail.l)}} {{$store.getters.get_client_exchange_rate_name.name}}</span>
        </p>
        <p v-else>
          --
        </p>
      </li>
      <li>
        <span class="new-money-title">{{$t('deal.hourUps')}}</span>
        <p class="new-money-num" v-if="dailyDetail.symble">
          <span class="new-money-dot" :class="ubs>=0?'rise':'fall'">{{ubsPercent}}%</span>
        </p>
        <p v-else>
          --
        </p>
      </li>
      <li>
        <span class="new-money-title">{{$t('deal.hourNumber')}}</span>
        <p class="new-money-num" v-if="dailyDetail.symble">
          <span class="new-money-dot">{{dailyDetail.v.toFixed(2)}}</span>
        </p>
        <p v-else>
          --
        </p>
      </li>
    </ul>
    <div class="coin"
         @mouseenter="setActiveCoin(true)"
         @mouseleave="setActiveCoin(false)"
         v-show="coinTitleActive">
      <hex-coin ref="hexCoin"></hex-coin>
    </div>
  </div>
</template>
<style lang="less">
  .new-money-dot.rise {
    color: rgba(70, 176, 93, 1);
  }
  
  .new-money-dot.fall {
    color: rgba(205, 69, 89, 1);
  }
  
  .new-money {
    height: 60px;
    position: relative;
    background: #1A2134;
  }
  
  .select_background {
    display: inline-block;
    height: 24px;
    border: 1px solid #1A2134;
    background-color: #1A2134;
    line-height: 24px;
    border-radius: 2px;
    text-align: center;
    margin-left: 10px;
    vertical-align: middle;
  }
  
  .select_background .select_background_day,
  .select_background .select_background_night {
    display: inline-block;
    height: 22px;
    width: 24px;
    background-size: 14px 14px;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
  }
  
  .select_background_day {
    background-image: url("../../static/images/day.svg");
  }
  
  .select_background_day.active {
    background-image: url("../../static/images/day-active.svg");
  }
  
  .select_background_night {
    background-image: url("../../static/images/night.svg");
  }
  
  .select_background_night.active {
    background-image: url("../../static/images/night-active.svg");
  }
  
  .right-content {
    height: 100%;
    line-height: 56px;
    position: relative;
    float: right;
  }
  
  .select_collect {
    cursor: pointer;
    width: 22px;
    height: 22px;
    display: inline-block;
    background-image: url('../../static/images/cancle_collect.svg');
    background-size: 14px 14px;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    top: 2px;
  }
  
  .select_collect.active {
    background-image: url('../../static/images/collect-active.svg');
  }
</style>
<script>
  import coin from '@/components/public/coin'
  import * as jsCokie from 'js-cookie'
  
  
  export default {
    name: 'articles',
    components: {
      'hex-coin': coin
    },
    computed: {
      //获取24小时涨跌
      ubs: function () {
        const ups = this.dailyDetail
        return ((ups.c - ups.o) / ups.o).toFixed(8)
      },
      //获取4小时涨跌百分比
      ubsPercent: function () {
        const ups = this.dailyDetail
        const abs = (((ups.c - ups.o) / ups.o) * 100).toFixed(2)
        return isNaN(abs) ? 0 : abs
      }
    },
    watch: {
      'dailyDetail': function (val) {
        if (val) {
          this.copeDailyDetail = val
        }
      }
    },
    props: {
      symbleParameArray: '',
      dailyDetail: {
        type: Object,
        default: function () {
          return {}
        }
      },
      symblefrom: '',
      symbleto: ''
    },
    data() {
      return {
        copeDailyDetail: this.dailyDetail,
        background: this.$store.state.hex_client_background.active,
        coinTitleActive: false,
        coinTitleActiveTimer: null,
        coinSearchString: '',
        collectState: false
      }
    },
    mounted() {
    },
    methods: {
      setActiveCoin(e) {
        this.coinTitleActiveTimer && clearTimeout(this.coinTitleActiveTimer)
        if (!e) {
          this.coinTitleActiveTimer = setTimeout(() => {
            this.coinTitleActive = e
          }, 300)
        } else {
          this.coinTitleActive = e
        }
      },
      collect(val) {
        if (!this.$userinfo.uid) {
          this.$router.push({path: '/login'})
          return
        }
        if (this.collectState) {
          return
        }
        this.collectState = true
        let url;
        !val.self ? url = 'user_self_selection_add' : url = 'user_self_selection_delete';
        this.$store.dispatch(url, {ctid: val.ctid}).then(({data}) => {
          if (data) {
            this.$store.commit('set_message', {
              type: 'ok',
              text: val.self ? this.$t('c2c.unfavorite') : this.$t('c2c.favorite')
            });
            this.copeDailyDetail.self = !this.copeDailyDetail.self
            /*更新Header 自选*/
            this.$pubsub.publish(this.$pubsub.changeHeaderSelfCollect, true)
            this.$forceUpdate()
          }
          this.collectState = false
        })
      },
      setBackground(val) {
        if (this.$store.state.hex_client_background.active == val) {
          return
        }
        this.background = val
        this.$store.commit('set_client_background', val)
        jsCokie.set(this.$store.state.hex_client_background.type, val)
      },
      getNewMarketClientRate(num) {
        if (this.symbleParameArray) {
          return this.$store.getters.get_client_exchange_rate(this.symbleto, num)
        }
        return 0
      }
    }
  }
</script>
