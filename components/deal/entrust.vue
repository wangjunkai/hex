<style lang="less" scoped>
  @import "css/entrust";
  
  .body_full .entrust-list_content.sell_content .flex-to-bottom {
    display: flex !important;
    flex-direction: column;
    justify-content: flex-end;
  }
  
  .entrust-list .entrust-list_content.sell_content {
    .flex-to-bottom .body {
      margin: 0 0 2px 0;
    }
  }
  
  .entrust-list_body {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .entrust-list {
    display: flex;
    flex-direction: column;
  }
  
  .entrust-list_body.body_full {
    .entrust-list_content {
      height: 50%;
      overflow: hidden;
      .vb {
        height: 100%;
        .vb-content {
          position: relative;
        }
      }
    }
  }
  
  .entrust-list_body.body_single {
    .entrust-list_content {
      flex: 1;
      overflow: hidden;
      .vb {
        height: 100%;
      }
    }
  }
</style>
<template>
  <div class="entrust-list">
    <div class="entrust-list_title clearfix">
      <div class="select_list_tab left">
        <span class="all" :class="{'active':activelisttab==1}" @click="activelisttab=1"></span>
        <span class="buy" :class="{'active':activelisttab==2}" @click="activelisttab=2"></span>
        <span class="sell" :class="{'active':activelisttab==3}" @click="activelisttab=3"></span>
      </div>
      <div class="dot_right right">
        <span class="dot_tip">{{$t('deal.mergeDepth')}}</span>
        <div class="dot_tip_select">
          <span class="dot_tip_select_tip" @click.stop="showDot">{{dotType}}{{$t('deal.decimals')}}</span>
        </div>
      </div>
      <ul class="dot_tip_select_content"
          v-show="isshowDot">
        <li v-for="(m,index) in dotList"
            :key="index"
            :class="{'active':dotType==m}"
            @click="setDotType(m)">{{m}}{{$t('deal.decimals')}}
        </li>
      </ul>
    </div>
    
    <!--header-->
    <dl class="entrust-list_content_title entrust-list_content entrust-list_content_4">
      <dt class="header">
        <!--<span class="title tabhead"></span>-->
        <span class="price title-price">{{$t('deal.price')}} {{symbleto}}</span>
        <span class="num">{{$t('deal.count')}} {{symblefrom}}</span>
        <span class="money">{{$t('patch.total')}} {{symbleto}}</span>
      </dt>
    </dl>
    <div class="entrust-list_body" :class="{'body_full':activelisttab==1,'body_single':activelisttab!=1}">
      <!--卖盘-->
      <dl class="entrust-list_content entrust-list_content_4 sell_content" v-if="activelisttab!=2">
        <div v-bar ref="entrustsell">
          <div>
            <dd class="body buying"
                ref="selling"
                v-for="(m,i) in orderselllist"
                :class="{'first':i==0}"
                @click="getEntrustRate(m)"
                :key="i">
              <span class="progress" :style="{'width':`calc(${getsellprogress(m,orderselllist)}% - 4px)`}"></span>
              <span class="price title-price">{{m.p=='--'?m.p:getprice(m.p)}}</span>
              <span class="num">{{m.a=='--'?m.a:global_get_tofixed(m.a,dcs.a)}}</span>
              <span class="money">{{getSum(m)}}</span>
            </dd>
          </div>
        </div>
      </dl>
      <!--最新价-->
      <div class="entrust-list_content_center">
        <p class="price">
          <span class="new-money-dot" :class="newmoney.direction>0?'rise':'fall'">{{global_get_tofixed(newmoney.price,dcs.p)}}</span>
          <span class="tip" :class="newmoney.direction>0?'rise':'fall'">≈{{$store.getters.get_client_exchange_rate(symbleto,newmoney.price)}} {{$store.getters.get_client_exchange_rate_name.name}}</span>
        </p>
      </div>
      <!--买盘-->
      <dl class="entrust-list_content entrust-list_content_4" v-if="activelisttab!=3">
        <div v-bar>
          <div>
            <dd class="body average"
                v-for="(m,i) in orderbuylist"
                :class="{'first':i==0}"
                @click="getEntrustRate(m)"
                :key="i">
              <span class="progress" :style="{'width':`calc(${getprogress(m,orderbuylist)}% - 4px)`}"></span>
              <span class="price title-price">{{m.p=='--'?m.p:getprice(m.p)}}</span>
              <span class="num">{{m.a=='--'?m.a:global_get_tofixed(m.a,dcs.a)}}</span>
              <span class="money">{{getSum(m)}}</span>
            </dd>
          </div>
        </div>
      </dl>
    </div>
  </div>
</template>

<script>
  
  export default {
    name: 'articles',
    computed: {
      ubs: function () {
        const ups = this.dailyDetail
        return ((ups.c - ups.o) / ups.o).toFixed(8)
      },
      sub: function () {
        return `market.${this.symbleParameString}.depth.8`
      }
    },
    watch: {
      'orderDepthAverage': function (val) {
        //专业版买盘数量少时靠下显示
        this.$nextTick(() => {
          this.sellflexbottom()
        })
      },
      'activelisttab': function (val) {
        if (val == 3) {
          this.$nextTick(() => {
            this.resetscroll()
          })
        }
        this.orderDepthsell()
        this.orderDepthbuy()
        this.$nextTick(() => {
          this.sellflexbottom()
        })
        
      }
    },
    props: {
      dcs: {
        type: Object,
        default: function () {
          return {}
        }
      },
      dailyDetail: {
        type: Object,
        default: function () {
          return {}
        }
      },
      symbleParameString: '',
      symblefrom: '',
      symbleto: ''
    },
    data() {
      return {
        dotTypeLoading: true,
        entrustsaleFirst: false,
        entrustbuyFirst: false,
        activelisttab: 1,
        dotList: [4, 6, 8],
        dotType: 8,
        lastdotType: 8,
        isshowDot: false,
        //24小时行情数据
        depthBuying: [],
        depthAverage: [],
        newmoney: {},
        orderselllist: this.initDepth(),
        orderbuylist: this.initDepth(),
      }
    },
    mounted() {
      //市场深度
      this.getDaily()
      document.addEventListener('click', () => {
        this.isshowDot = false
      })
    },
    subscribe() {
      return {
        changeNewMoney(res) {
          /*更新最新价格*/
          if (res && (res.symble == this.symbleParameString)) {
            this.newmoney = res
          }
        }
      }
    },
    created() {
    },
    sockets() {
      return {
        /*订阅的类型*/
        type: this.$socket.type.quotation_marketing_depth_get,
        receive(data) {
          if (data && data.topic == this.sub) {
            this.callback(data)
          }
        },
        /*订阅轮询*/
        polling: {
          url: this.$socket.url.quotation_marketing_depth_get,
          callback: this._getDaily
        }
      }
      
    },
    methods: {
      /*根据最新价改变深度 暂时不用 后续观察是否合理*/
      changeDepth(res) {
        let _res = {
          asks: [],
          bids: []
        }
        const sellprice = this.$np.plus(res.price, this.$np.times(res.price, 0.001))
        const buyprice = this.$np.minus(res.price, this.$np.times(res.price, 0.001))
        
        _res.bids.push({
          p: this.global_get_tofixed(buyprice, this.dcs.p),
          a: res.amount
        })
        
        _res.asks.push({
          p: this.global_get_tofixed(sellprice, this.dcs.p),
          a: res.amount
        })
        
        this.newmoneychangeentrust(_res)
      },
      sellflexbottom() {
        const selling = this.$refs['selling']
        if (selling.length > 0) {
          const lastsell = selling[0]
          const margintop = parseInt(getComputedStyle(lastsell).marginTop.replace('px', ''))
          const marginbottom = parseInt(getComputedStyle(lastsell).marginBottom.replace('px', ''))
          const allheight = (lastsell.offsetHeight + margintop) * selling.length + marginbottom
          
          const isless = allheight < lastsell.offsetParent.offsetHeight
          
          if (isless) {
            lastsell.offsetParent.classList.add('flex-to-bottom')
          } else {
            lastsell.offsetParent.classList.remove('flex-to-bottom')
          }
        }
      },
      //倒序排列卖家委托列表
      orderDepthsell() {
        const num = this.activelisttab != 1 ? -this.depthAverage.length : -20
        const self = this
        if (!self.depthAverage || self.depthAverage.length <= 0) {
          return []
        }
        
        self.depthAverage = self.depthAverage.filter((item) => {
          return item.a > 0
        })
        
        let sell = self.depthAverage.sort(function (itema, itemb) {
          return itemb.p - itema.p
        }).slice(num)
        
        for (let i = 0, l = sell.length; i < l; i++) {
          let total = 0;
          for (let n = i; n < sell.length; n++) {
            total = this.$np.plus(total, sell[n]['a'])
          }
          sell[i]['sumtotal'] = total;
        }
        
        if (sell.length > 0 && !isNaN(Number(sell[0].p))) {
          if (!self.entrustsaleFirst) {
            self.entrustsaleFirst = true
            //初始化买入卖出价
            this.$pubsub.publish(this.$pubsub.entrustSaleRate, sell[sell.length - 1].p)
          }
        }
        
        this.orderselllist = sell
      },
      //倒叙排列买家委托列表
      orderDepthbuy: function () {
        const num = this.activelisttab != 1 ? this.depthBuying.length : 20
        const self = this
        if (!self.depthBuying || self.depthBuying.length <= 0) {
          return []
        }
        
        self.depthBuying = self.depthBuying.filter((item) => {
          return item.a > 0
        })
        
        const buy = self.depthBuying.sort(function (itema, itemb) {
          return itemb.p - itema.p
        }).slice(0, num)
        
        for (let i = 0, l = buy.length; i < l; i++) {
          let total = 0;
          for (let n = 0; n <= i; n++) {
            total = this.$np.plus(total, buy[n]['a'])
          }
          buy[i]['sumtotal'] = total;
        }
        
        if (buy.length > 0 && !isNaN(Number(buy[0].p))) {
          if (!self.entrustbuyFirst) {
            self.entrustbuyFirst = true
            //初始化买入卖出价
            this.$pubsub.publish(this.$pubsub.entrustBuyRate, buy[0].p)
          }
        }
        this.orderbuylist = buy
      },
      newmoneychangeentrust(res) {
        if (res.bids.length > 0) {
          /*处理买入的单子*/
          const bids = res.bids[0]
          for (let i = 0, len = this.depthBuying.length; i < len; i++) {
            const item = this.depthBuying[i]
            if (item.p.toString() == bids.p.toString()) {
              item.a = this.$np.minus(item.a, bids.a)
              this.orderDepthbuy()
              break
            }
          }
        }
        if (res.asks.length > 0) {
          /*处理卖出的单子*/
          const asks = res.asks[0]
          for (let i = 0, len = this.depthAverage.length; i < len; i++) {
            const item = this.depthAverage[i]
            if (item.p.toString() == asks.p.toString()) {
              item.a = this.$np.minus(item.a, asks.a)
              this.orderDepthsell()
              break
            }
          }
        }
      },
      resetscroll: function () {
        if (this.$vuebar && this.$refs.entrustsell) {
          let ref = this.$vuebar.getState(this.$refs.entrustsell);
          ref.el2.scrollTop = ref.el2.scrollHeight + 10;
        }
      },
      getprice(p) {
        const _dottype = this.dotTypeLoading ? this.dotType : this.lastdotType
        const _p = _dottype < this.dcs.p ? _dottype : this.dcs.p
        return this.global_get_tofixed(p, _p)
      },
      getsellprogress(m, all) {
        if (m.sumtotal) {
          return (m.sumtotal / all[0].sumtotal) * 100
        }
      },
      getprogress(m, all) {
        if (m.sumtotal) {
          return (m.sumtotal / all[all.length - 1].sumtotal) * 100
        }
      },
      //获取市场深度
      _getDaily() {
        this.$store.dispatch('getIntervalData', {
          url: this.$socket.url.quotation_marketing_depth_get,
          params: {
            symble: this.symbleParameString,
            pagesize: 100,
            pageindex: 0,
            decimaldigits: this.dotType
          },
          timer: this.$socket.timer.quotation_marketing_depth_get,
          callback: (res) => {
            if (res.params.decimaldigits == this.dotType) {
              this.callback(res)
            }
          }
        })
      },
      callback({data}) {
        if (data) {
          const {asks, bids} = data
          if ((asks.length == 1 || bids.length == 1) && this.dotType == 8) {
            if (asks.length == 1) {
              let iscount = 0
              for (let i = 0, len = this.depthAverage.length; i < len; i++) {
                let item = this.depthAverage[i]
                if (item.p == asks[0].p) {
                  iscount++
                  item.a = this.$np.plus(item.a, asks[0].a)
                  break
                }
              }
              if (iscount <= 0) {
                this.depthAverage.push(asks[0])
              }
              this.orderDepthsell()
            }
            if (bids.length == 1) {
              let iscount = 0
              
              for (let i = 0, len = this.depthBuying.length; i < len; i++) {
                let item = this.depthBuying[i]
                if (item.p == bids[0].p) {
                  iscount++
                  item.a = this.$np.plus(item.a, bids[0].a)
                  break
                }
              }
              
              if (iscount <= 0) {
                this.depthBuying.push(bids[0])
              }
              this.orderDepthbuy()
            }
          } else {
            this.depthBuying = data.bids//买入
            this.depthAverage = data.asks//卖出
            this.orderDepthbuy()
            this.orderDepthsell()
            this.$nextTick(() => {
              this.dotTypeLoading = true
            })
          }
          
          /*发布深度图数据*/
          this.$pubsub.publish(this.$pubsub.changeDepthChart, {
            sell: this.depthAverage,
            buy: this.depthBuying
          })
        }
      },
      /*订阅socket*/
      getDaily() {
        this.$store.dispatch(this.$socket.url.quotation_marketing_depth_get, {
          symble: this.symbleParameString,
          pagesize: 100,
          pageindex: 0,
          decimaldigits: this.dotType
        })
          .then((res) => {
            this.callback(res)
            this.$nextTick(() => {
              this.sellflexbottom()
              this.resetscroll()
            })
          })
          .then(() => {
            this.$socket.invoke({
              sub: this.sub,
              type: this.$socket.type.quotation_marketing_depth_get
            })
          })
      },
      setDotType(val) {
        /*请求的数据是否加载完*/
        this.dotTypeLoading = false
        this.lastdotType = this.dotType
        this.dotType = val
        this.showDot()
        this.$socket.cleartimer(this.$socket.url.quotation_marketing_depth_get)
        if (val != 8) {
          this.$socket.uninvoke(this.$socket.type.quotation_marketing_depth_get)
          this._getDaily()
        } else {
          this.getDaily()
        }
      },
      showDot(val) {
        if (typeof val == "boolean") {
          this.isshowDot = val
        } else {
          this.isshowDot = !this.isshowDot
        }
      },
      getEntrustRate(m) {
        this.$emit('entrust:getEntrustRate', m)
      },
      //获取委托金额
      getSum(m) {
        const sum = this.global_get_tofixed(this.$np.times(m.p, m.a), this.dcs.s)
        if (m.p == '--') {
          return '--'
        }
        return isNaN(sum) ? '--' : sum
      },
      initDepth() {
        const ary = []
        const obj = {
          p: '--',
          a: '--'
        }
        for (let i = 1; i <= 14; i++) {
          ary.push(obj)
        }
        return ary
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
