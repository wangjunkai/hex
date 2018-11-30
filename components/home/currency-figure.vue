<template>
  <div class="currency-figure">
    <div class="w1200">
      <ul>
        <li :class="{
        'coin_compair_animation_down':a.equality>0,
        'coin_compair_animation_up':a.equality<0}"
            v-for="a in currency"
            :ref="`animation${a.symble}`"
            @click="goDeal(a.symble)"
            :key="a.id">
          <div :class='limitPrice(a.c,a.o)<0?"img_down":"img_up"'>
            <div class="currency-ups">
              <span class="currency-cion"><span class="coin">{{getSymble(a.symble).from}}</span>/{{getSymble(a.symble).to}}</span>
              <span class="currency-pricelimit "
                    :class='limitPrice(a.c,a.o)<0?"down":"up"'>{{limitPrice(a.c,a.o)}}%</span>
            </div>
            <div class="ovh">
              <span class="currency-usdollar fl"
                    :class='limitPrice(a.c,a.o)<0?"down":"up"'>{{global_get_tofixed(a.c,global_get_decimal(a.symble).p)}}</span>
              <span class="currency-cny fr">{{$store.getters.get_client_exchange_rate_name.mark}}{{getClientExchangeRate(a)}}</span>
            </div>
            <div class="currency-curve">
              <canvas class="curve" :ref="`${a.symble}`"></canvas>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: "currency-figure",
    data() {
      return {
        currency: [],
        canvasary: [],
        bg: {
          buy: 'rgba(3,191,123,0.05)',
          buyline: 'rgba(3,191,123,0.5)',
          sell: 'rgba(233,108,66,0.05)',
          sellline: 'rgba(233,108,66,0.5)'
        }
      }
    },
    created() {
      if (process.client) {
        this.getall()
      }
    },
    mounted() {
      const _self = this
    },
    watch: {
      'currency': function (val) {
        if (!val) return
        this.$nextTick(() => {
          val.forEach((item, index) => {
            if (item.equality) {
              setTimeout(() => {
                try {
                  let content = this.$refs[`animation${item.symble}`][0].classList
                  content.add('isanimation')
                  setTimeout(() => {
                    content.remove('isanimation')
                  }, 1000)
                } catch (e) {
                }
              }, Math.random() * 300)
            }
          })
        })
      }
    },
    methods: {
      getall() {
        const _self = this
        this.$store.dispatch('quotation_daily_getall', {
          displaylocation: 1,
          displaylows: 5,
          size: 100
        }).then(({data}) => {
          let ary = {}
          data && data.forEach((item, i) => {
            ary[item.symble] = {
              data: item
            }
            
            data[i].equality = false
          })
          this.currency = data ? data : []
          this.canvasary = ary
          
          this.$nextTick(() => {
            for (const i in _self.canvasary) {
              if (this.$refs[i]) {
                _self.canvasary[i]['canvas'] = this.$refs[i][0]
                _self.drawline(_self.canvasary[i])
              }
            }
            this.getCurrency();
          })
        })
      },
      goDeal(coinid) {
        coinid = coinid.replace('/', '_');
        this.$router.push({path: '/deal/' + coinid})
      },
      getClientExchangeRate(tradeData) {
        if (tradeData.symble) {
          let symble = tradeData.symble.split('/');
          if (symble.length > 1) {
            symble = symble[1]
          }
          return this.$store.getters.get_client_exchange_rate(symble, tradeData.c)
        }
      },
      getSymble(s) {
        s = this.global_get_uppercase(s);
        const symble = s.split('/');
        return {
          from: symble[0],
          to: symble[1]
        }
      },
      limitPrice: function (c, o) {
        let limit_price = Number((((c - o) / o) * 100).toFixed(2));
        return isNaN(limit_price) ? 0 : limit_price;
      },
      //获取24小时行情
      getCurrency() {
        const _self = this;
        let entrustFirst = false;
        _self.$store.dispatch('getIntervalData', {
          type: this.$socket.type.quotation_daily_getall_figure,
          url: this.$socket.url.quotation_daily_getall_figure,
          params: {
            displaylocation: 1,
            displaylows: 5,
            size: 100
          },
          timer: this.$socket.timer.quotation_daily_getall_figure,
          callback: ({data}) => {
            if (data) {
              data.forEach((item, i) => {
                _self.canvasary[item.symble] = {
                  data: item
                }
                data[i].equality = 0
                if (item.c != _self.currency[i].c) {
                  data[i].equality = item.c < _self.currency[i].c ? -1 : 1
                }
              });
              _self.currency = data;
              
              if (!entrustFirst) {
                entrustFirst = true;
              }
              _self.$nextTick(() => {
                for (const i in _self.canvasary) {
                  _self.canvasary[i]['canvas'] = this.$refs[i][0]
                  _self.drawline(_self.canvasary[i])
                }
              })
            }
          }
        })
      },
      //绘制行情曲线
      drawline({data, canvas}) {
        if (!canvas) return
        const k = data.kdata
        const _length = k.length
        if (_length <= 0) return
        const isup = this.limitPrice(data.c, data.o) >= 0
        const {offsetHeight, offsetWidth} = canvas.parentElement
        canvas.width = offsetWidth
        canvas.height = offsetHeight
        const width = offsetWidth
        const height = offsetHeight
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, width, height);
        
        const _sort = k.sort((a, b) => {
          return b.c - a.c
        })
        let _max = _sort[0].c
        let _min = _sort[_sort.length - 1].c
        let _range = _max - _min
        
        const _k = k.sort((a, b) => {
          return a.t - b.t
        })
        context.beginPath();
        context.fillStyle = isup ? this.bg.buy : this.bg.sell;
        context.strokeStyle = isup ? this.bg.buyline : this.bg.sellline
        let last = {}
        const getxy = function (item, index) {
          const x = width / _length * index
          const _y = 2 * ((item.c - _min) / _range - 0.5)
          const y = -_y * height * 0.8 / 2 + height / 2
          return {x, y}
        }
        
        _k.forEach((item, index) => {
          const {x, y} = getxy(item, index)
          context.fillRect(x, y, width / _length, height - y);
          context.lineTo(x, y);
          if (index == _length - 1)
            context.stroke()
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .currency-figure {
    margin-top: 30px;
    min-height: 136px;
    width: 100%;
    background: rgba(34, 38, 48, 1);
    .currency-curve {
      width: 100%;
      height: 68px;
      position: absolute;
      bottom: 0;
      canvas {
        width: 100%;
        height: 100%;
      }
    }
    ul {
      overflow: hidden;
      li:first-child {
        border-left: 1px solid rgba(41, 46, 57, 1);
      }
      li:hover {
        background: #191D24 !important;
      }
      li {
        cursor: pointer;
        position: relative;
        float: left;
        width: 240px;
        height: 136px;
        border-right: 1px solid rgba(41, 46, 57, 1);
        padding: 12px 15px 0;
        text-align: left;
        .img_up, .img_down {
          position: relative;
        }
        .img_up {
          height: 100%;
          //background: url("../../static/images/img_up.svg") no-repeat left bottom;
          background-size: 100% auto;
        }
        .img_down {
          height: 100%;
          //background: url("../../static/images/img_down.svg") no-repeat left bottom;
          background-size: 100% auto;
        }
        .currency-ups {
          overflow: hidden;
          .currency-cion {
            float: left;
            font-size: 14px;
            color: white;
            .coin {
              font-weight: 600;
              font-size: 16px;
            }
          }
          .currency-pricelimit {
            float: right;
            display: inline-block;
            font-size: 14px;
            color: rgba(255, 255, 255, 1);
          }
          .currency-pricelimit.up {
            color: rgba(3, 191, 123, 1);
          }
          .currency-pricelimit.down {
            color: rgba(233, 108, 66, 1);
          }
        }
        .currency-usdollar {
          margin-top: 10px;
          font-size: 20px;
          color: rgba(3, 191, 123, 1);
          line-height: 18px;
          font-weight: 600;
        }
        .currency-usdollar.up {
          color: rgba(3, 191, 123, 1);
        }
        .currency-usdollar.down {
          color: rgba(233, 108, 66, 1);
        }
        .currency-cny {
          margin-top: 14px;
          font-size: 14px;
          color: rgba(165, 169, 190, 1);
          line-height: 14px;
        }
      }
      li.coin_compair_animation_up {
        background: url("../../static/images/image_red.svg") -385px 0px no-repeat;
        background-size: auto 100%;
      }
      
      li.coin_compair_animation_down {
        background: url("../../static/images/image_green.svg") -385px 0px no-repeat;
        background-size: auto 100%;
      }
      
      li.isanimation {
        animation: backgroundPo 1s;
      }
      
      @keyframes backgroundPo {
        from {
          background-position: -240px 0px;
        }
        to {
          background-position: 240px 0px;
        }
      }
      li.up {
        
        /*background:  url('../../static/images/drop.svg') no-repeat left bottom;*/
        background-size: auto 100%;
      }
      li.down {
        /*background:  url('../../static/images/rise.svg') no-repeat left bottom;*/
        background-size: auto 100%;
      }
      li:last-child {
        margin-right: 0;
      }
    }
  }

</style>
