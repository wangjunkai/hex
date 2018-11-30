<style lang="less" scoped>
  @import "../../static/styles/color";
  
  .new-money {
    height: 56px;
    position: relative;
    
    .select_background {
      display: inline-block;
      height: 24px;
      border: 1px solid #1E222A;
      background-color: #1E222A;
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
    .select_background .active {
      background-color: #15181F;
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
      background-image: url('../../static/images/collect.svg');
      background-size: 14px 14px;
      background-position: center;
      background-repeat: no-repeat;
    }
    
    .select_collect.active {
      background-image: url('../../static/images/collect-active.svg');
    }
    .money-type {
      float: left;
      height: 100%;
      margin-right: 60px;
      padding-right: 5px;
      .type-weight {
        font-size: 24px;
        color: @cl_fff;
        font-weight: bold;
      }
      
      .type-normal {
        color: @cl_c5c;
        font-size: 18px;
      }
      
      .icon-logo {
        width: 30px;
        height: 30px;
        position: relative;
        top: 9px;
        display: inline-block;
        border-radius: 50%;
        margin-right: 10px;
      }
      
      .type-logo {
        width: 30px;
        height: 30px;
        border: 0;
        margin: 3px;
      }
      
      .type-tip {
        color: @cl_c5c;
        font-size: 18px;
        margin: 6px;
      }
      
      .money-type {
        float: left;
        height: 100%;
        margin-right: 60px;
        padding-right: 5px;
        cursor: pointer;
      }
      
      .money-type:after {
        content: '';
        width: 6px;
        height: 4px;
        background-image: url("../../static/images/select_down.svg");
        background-size: cover;
        vertical-align: middle;
        display: inline-block;
        position: relative;
        right: -5px;
        top: -2px;
      }
    }
    
    .new-money-list {
      display: inline-block;
      height: 100%;
      padding-top: 7px;
    }
    
    .new-money-list:after {
      content: '';
      display: block;
      clear: both;
    }
    
    .new-money-list > li {
      float: left;
      padding-right: 45px;
    }
    .new-money-list > li:last-child {
      padding-right: 0;
    }
    
    .new-money-title {
      font-size: 12px;
      color: @cl_c5c;
      line-height: 1.5rem;
    }
    
    .new-money-num {
      line-height: 1rem;
    }
    
    .new-money-dot {
      color: @cl_fff;
      font-size: 14px;
      font-weight: 600;
    }
    .new-money-dot.rise {
      color: @cl_buy;
    }
    
    .new-money-dot.fall {
      color: @cl_sell;
    }
    .new-money-dot.rise:after,
    .new-money-dot.fall:after {
      content: '';
      display: inline-block;
      width: 8px;
      height: 10px;
      background-size: cover;
      vertical-align: middle;
      margin-left: 4px;
    }
    
    .new-money-dot.rise:after {
      background-image: url("../../static/images/rise.svg");
    }
    
    .new-money-dot.fall:after {
      background-image: url("../../static/images/decline.svg");
    }
    
    .new-money-price {
      color: @cl_c5c;
      font-size: 12px;
      margin-left: 10px;
    }
  }

</style>
<template>
  <div class="new-money">
    <div class="money-type">
      <span class="icon-logo">
           <img v-if="copeDailyDetail.logo" class="type-logo" :src="copeDailyDetail.logo" :alt="symblefrom">
       </span>
      <span class="type-weight">{{symblefrom}}</span>
      <span class="type-tip">/</span>
      <span class="type-normal">{{symbleto}}</span>
    </div>
    <ul class="new-money-list">
      <li>
        <span class="new-money-title">{{$t('deal.newPrice')}}</span>
        <p class="new-money-num" v-if="copeDailyDetail.symble">
          <span class="new-money-dot">{{global_get_tofixed(newmoney.price,dcs.p)}}</span>
          <span class="new-money-price">{{getNewMarketClientRate(newmoney.price)}} {{$store.getters.get_client_exchange_rate_name.name}}</span>
        </p>
        <p v-else>
          --
        </p>
      </li>
      <li>
        <span class="new-money-title">{{$t('deal.hourUps')}}</span>
        <p class="new-money-num" v-if="copeDailyDetail.symble">
          <span class="new-money-dot" :class="ubs>=0?'rise':'fall'">{{ubsPercent}}%</span>
        </p>
        <p v-else>
          --
        </p>
      </li>
      <li>
        <span class="new-money-title">{{$t('deal.hourHPrice')}}</span>
        <p class="new-money-num" v-if="copeDailyDetail.symble">
          <span class="new-money-dot">{{global_get_tofixed(copeDailyDetail.h,dcs.p)}}</span>
          <span class="new-money-price">{{getNewMarketClientRate(copeDailyDetail.h)}} {{$store.getters.get_client_exchange_rate_name.name}}</span>
        </p>
        <p v-else>
          --
        </p>
      </li>
      <li>
        <span class="new-money-title">{{$t('deal.hourLPrice')}}</span>
        <p class="new-money-num" v-if="copeDailyDetail.symble">
          <span class="new-money-dot">{{global_get_tofixed(copeDailyDetail.l,dcs.p)}}</span>
          <span class="new-money-price">{{getNewMarketClientRate(copeDailyDetail.l)}} {{$store.getters.get_client_exchange_rate_name.name}}</span>
        </p>
        <p v-else>
          --
        </p>
      </li>
      <li>
        <span class="new-money-title">{{$t('deal.hourNumber')}}</span>
        <p class="new-money-num" v-if="copeDailyDetail.symble">
          <span class="new-money-dot">{{global_get_tofixed(copeDailyDetail.v,dcs.a)}}</span>
        </p>
        <p v-else>
          --
        </p>
      </li>
    </ul>
    <div class="right-content">
      <div class="select_background">
        <span class="select_background_day" :class="{'active':background=='day'}" @click="setBackground('day')"></span>
        <span class="select_background_night" :class="{'active':background=='night'}"
              @click="setBackground('night')"></span>
      </div>
      <div class="select_background">
        <span class="select_collect" :class="{'active':iscollect}" @click="collect(copeDailyDetail)"></span>
      </div>
    </div>
  </div>
</template>
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
        if (ups.o == 0) return 0
        return ((this.newmoney.price - ups.o) / ups.o).toFixed(8)
      },
      //获取4小时涨跌百分比
      ubsPercent: function () {
        const ups = this.dailyDetail
        if (ups.o == 0) return 0
        const abs = (((this.newmoney.price - ups.o) / ups.o) * 100)
        return isNaN(abs) ? 0 : abs.toFixed(2)
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
      symbleParameString: '',
      symbleParameArray: '',
      dailyDetail: {
        type: Object,
        default: function () {
          return {}
        }
      },
      dcs: {
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
        collectState: false,
        iscollect: false,
        newmoney: {
          price: this.dailyDetail.c
        }
      }
    },
    mounted() {
      document.addEventListener('click', () => {
        this.setActiveCoin(false)
      })
      this.iscollect = this.copeDailyDetail.self
    },
    
    /*订阅消息*/
    subscribe() {
      return {
        /*订阅header自选*/
        changeHeaderCollect(res) {
          this.iscollect = res
        },
        /*订阅最新价*/
        changeNewMoney(res) {
          if (res.symble == this.symbleParameString) {
            this.newmoney = res
            if (res.price > this.copeDailyDetail.h) {
              this.copeDailyDetail.h = res.price
            }
            if (res.price < this.copeDailyDetail.l) {
              this.copeDailyDetail.l = res.price
            }
          }
        }
      }
    },
    created() {
    },
    methods: {
      setActiveCoin(e, delay) {
        if (!delay) {
          this.coinTitleActive = e
        } else {
          this.coinTitleActiveTimer && clearTimeout(this.coinTitleActiveTimer)
          if (!e) {
            this.coinTitleActiveTimer = setTimeout(() => {
              this.coinTitleActive = e
            }, 1000)
          } else {
            this.coinTitleActive = e
          }
        }
      },
      collect(val) {
        if (this.collectState) {
          return
        }
        this.collectState = true
        
        
        if (!this.$userinfo.uid) {
          /*设置本地自选*/
          this.$store.commit('set_client_collect', val.ctid)
          this.iscollect = this.copeDailyDetail.self = !this.iscollect
          /*推送自选*/
          this.$pubsub.publish(this.$pubsub.changeCollect, {
            key: val.ctid,
            value: this.iscollect
          })
          
          this.collectState = false
          return
        }
        
        let url;
        !this.iscollect ? url = 'user_self_selection_add' : url = 'user_self_selection_delete';
        this.$store.dispatch(url, {ctid: val.ctid}).then(({data}) => {
          if (data) {
            this.$store.commit('set_message', {
              type: 'ok',
              text: this.iscollect ? this.$t('c2c.unfavorite') : this.$t('c2c.favorite')
            });
            this.iscollect = this.copeDailyDetail.self = !this.iscollect
            
            /*推送自选*/
            this.$pubsub.publish(this.$pubsub.changeCollect, {
              key: val.ctid,
              value: this.iscollect
            })
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
