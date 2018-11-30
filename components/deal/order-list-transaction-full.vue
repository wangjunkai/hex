<style scoped lang="less">
  @import "css/order-list";
  
  .scroll-bar {
    height: 200px;
  }
  
  .hex_table_header.padding th:first-child,
  .hex_table_body.padding td:first-child {
    padding-left: 10px !important;
  }
  
  .hex_table_header.padding th:last-child,
  .hex_table_body.padding td:last-child {
    padding-right: 10px !important;
  }
</style>

<template>
  <div class="traded">
    <div class="traded-block">
      <div class="traded_table_content">
        <div class='scroll-bar' v-bar>
          <div>
            <table class="hex_table">
              <thead class="hex_table_header padding br">
              <tr>
                <th class="lt">
                  <div>{{$t('memberCenter.dealTime')}}</div>
                </th>
                <th class="lt">
                  <div>{{$t('memberCenter.market')}}</div>
                </th>
                <th class="rt">
                  <div>{{$t('memberCenter.type')}}</div>
                </th>
                <th class="rt">
                  <div>{{$t('memberCenter.direction')}}</div>
                </th>
                <th class="rt">
                  <div>{{$t("deal.entrustPrices")}}</div>
                </th>
                <th class="rt">
                  <div>{{$t('deal.entrustNumber')}}</div>
                </th>
                <th class="rt">
                  <div>{{$t('memberCenter.turnover')}}</div>
                </th>
                <th class="rt">
                  <div>{{$t('deal.bargainPrice')}}</div>
                </th>
                <th class="rt">
                  <div>{{$t('wallet.serviceCharge')}}</div>
                </th>
                <th class="rt">
                  <div>{{$t('memberCenter.statue')}}</div>
                </th>
              </tr>
              </thead>
              <tbody class="deal-tbody">
              <tr class="hex_table_body padding"
                  v-for="(coins,index) in orderDetail"
                  :key="index">
                <td class="lt">
                  {{global_get_local_time(coins.updatetime).format('YYYY-MM-DD HH:mm:ss')}}
                </td>
                <td class="lt">
                  {{global_get_uppercase(coins.symble)}}
                </td>
                <td class="rt">
                  {{global_get_order_type(coins.ordertype)}}
                </td>
                <td class="rt" :class="{'success':coins.direction==1,'fail':coins.direction==-1}">
                  {{global_get_order_direction(coins.direction)}}
                </td>
                <td class="rt" v-if=" coins.ordertype==1">
                  {{global_get_tofixed(coins.price,global_get_decimal(coins.symble).p)}}
                </td>
                <td class="rt" v-else>--</td>
                <td class="rt" v-if="coins.ordertype==2&&coins.direction==1">
                  {{global_get_tofixed(coins.amount,global_get_decimal(symbleto).a)}}
                </td>
                <td class="rt" v-else>
                  {{global_get_tofixed(coins.amount,global_get_decimal(coins.symble).a)}}
                </td>
                <td class="rt" v-if="coins.ordertype==2&&coins.direction==1">
                  {{global_get_tofixed(getVolume(coins),global_get_decimal(coins.symble).a)}}
                </td>
                <td class="rt" v-else>
                  {{global_get_tofixed(coins.transactionamount,global_get_decimal(coins.symble).a)}}
                </td>
                <td class="rt">
                  {{global_get_tofixed(getavgprice(coins),global_get_decimal(coins.symble).p)}}
                </td>
                <td class="rt">
                  {{global_get_tofixed(global_get_fee(coins),8)}}
                </td>
                <td class="rt orderstatus">
                  {{global_get_order_state(coins.orderstatus)}}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="loadingPic deal" v-hex-loading="loading" v-if="loading"></div>
      <div class="anonymous" v-if="found">
        <div v-if="$userinfo.uid">
          <div class="anonymous-pic">
            <img src="~/static/images/user/anonymous.svg" alt=""
                 v-if="$store.state.hex_client_background.active=='day'">
            <img src="~/static/images/user/anonymous_black.svg" v-else alt="">
          </div>
          <!--<nuxt-link tag="p" to="/deal/eth_btc" class="anonymous-tip">-->
          <!--{{$t('legalTrad.record')}}，{{$t('legalTrad.Go')}}<span> {{$t('legalTrad.Trade')}}</span>-->
          <!--</nuxt-link>-->
        </div>
        <div v-else class="islogin">
          <nuxt-link to="/login">{{$t('home.headLogin')}}</nuxt-link>
          /
          <nuxt-link to="/register"> {{$t('home.headRegister')}}</nuxt-link>
        </div>
      </div>
      <div class="deal-paging-source" v-if="total>0">
        <el-pagination
          background
          @current-change="handChange"
          :page-size="20"
          popper-class="paging"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
  
  </div>
</template>

<script>
  
  export default {
    name: 'articles',
    props: ['isSelect', 'symbleto', 'changeState'],
    data() {
      return {
        loading: true,
        found: false,
        total: 0,
        serachOrder: {
          pagesize: 20,
          pageindex: 1,
          orderstatus: '2,3,4'
        },
        searchParam: {},
        orderDetail: [],
        market: [],
      }
    },
    watch: {
      'isSelect': function (val) {
        this.getUserDeal();
      },
      'changeState': function (val) {
        if (val == 2) {
          this.getUserDeal();
        }
      }
    },
    mounted() {
      this.getUserDeal();
    },
    subscribe() {
      return {
        //订阅更新orderlist 消息
        getOrderList() {
          this.getUserDeal();
        }
      }
    },
    created() {
    },
    methods: {
      handChange(val) {
        this.serachOrder.pageindex = val
        this.getUserDeal()
      },
      getavgprice(m) {
        const ary = [1, 3, 4];
        if (ary.indexOf(m.orderstatus) < 0) {
          return '--'
        } else {
          return this.global_get_tofixed(m.tradeavgprice)
        }
      },
      getVolume(coin) {// 已成交=委托量/成交均价
        return this.$np.divide(coin.amount, this.getavgprice(coin))
      },
      getAllPrice(coins) {
        const p = this.$np.times(coins.tradeavgprice, coins.transactionamount)
        if (!p) return p.toFixed(2);
        return this.global_get_tofixed(p);
      },
      // 过去用户交易记录
      getUserDeal() {
        if (this.$userinfo.uid) {
          let serachOrder = Object.assign({}, this.serachOrder)
          this.isSelect ? serachOrder.symble = this.isSelect : delete serachOrder.symble;
          
          this.$store.dispatch('trading_order_search', serachOrder).then(({data}) => {
            if (data) {
              this.total = data.totalitemcount;
              this.orderDetail = data.pagedata;
              this.found = false;
            } else {
              this.found = true;
              this.total = 0;
              this.orderDetail = [];
            }
            this.loading = false;
          })
        } else {
          this.$nextTick(() => {
            this.total = 0;
            this.loading = false;
            this.found = true;
          })
        }
      }
    }
  }
</script>




