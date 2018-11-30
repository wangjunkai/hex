<style lang='less' scoped>
  @import "../../static/styles/color";
  @import "../../static/styles/person";
  @import "../../static/styles/table";
  
  .traded_tip {
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
  }
  
  .traded_info {
    font-size: 14px;
  }
  
  .traded_info .btc {
    color: @cl_buy;
    font-size: 30px;
    font-weight: bold;
    margin-right: 5px;
  }
  
  .traded_info .cny {
    color: @cl_link;
    font-size: 30px;
    font-weight: bold;
    margin-right: 5px;
  }
  
  .traded_info .br {
    margin: 0 20px;
    border-right: 1px solid @cl_858;
    display: inline-block;
    height: 20px;
  }
  
  .traded_info_title {
  }
  
  .traded_info_num {
    padding: 4px 0;
  }
  
  .traded_info_address_button {
    color: @cl_link;
    margin-top: 16px;
  }
  
  .traded-block {
    margin-top: 10px;
    background-color: @cl_fff;
  }
  
  .traded-block-title {
    padding: 18px 20px 8px 20px;
  }
  
  .traded-block-title .title_tip {
    font-size: 16px;
    font-weight: bold;
  }
  
  .traded-block-search {
    margin-right: 10px;
    font-size: 14px;
    width: 130px;
    display: inline-table;
    border-collapse: separate;
  }
  
  .traded-block-search input {
    height: 30px;
    line-height: 30px;
    border: 1px solid #DDDDDD;
    display: table-cell;
    width: 100%;
    padding: 5px 10px;
  }
  
  .traded-block-search .search-tip {
    display: table-cell;
    width: 60px;
    background-color: @cl_link;
    color: @cl_fff;
    border: 1px solid @cl_link;
    text-align: center;
  }
  
  .traded-block-search .search-tip::placeholder {
    color: @cl_bbb;
  }
  
  .traded-block-search_button {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: @cl_fff;
    background-color: @cl_link;
    font-size: 14px;
    width: 60px;
    cursor: pointer;
  }
  
  .traded-block-reset_button {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: @cl_link;
    font-size: 14px;
    width: 60px;
    margin-left: 10px;
    cursor: pointer;
    
  }
  
  .traded .person-block_info {
    line-height: 36px;
  }
  
  .person-block {
    padding: 18px 20px 16px 20px;
  }
  
  .traded-block .search-market {
    margin: 14px 0 10px 20px;
  }
  
  .ordertab {
    padding: 10px 20px;
  }
  
  .ordertab span {
    font-size: 14px;
    padding-bottom: 3px;
    
  }
  
  .ordertab span.entrust {
    margin-right: 20px;
  }
  
  .ordertab span.cur {
    color: rgba(40, 149, 251, 1);
    border-bottom: 2px solid rgba(40, 149, 251, 1);
  }
  
  td.repeal {
    color: rgba(40, 149, 251, 1);
    cursor: pointer;
  }
  
  .hex_table_body {
    line-height: 32px;
  }
  
  .hex_table_body td {
    padding: 10px 7px;
  }
  
  .hex_table_header th {
    padding: 0 7px;
  }
  
  .hex_table td.fw {
    padding-left: 20px;
  }
  
  .hex_table td.orderdetail {
    width: 257px;
  }
  
  .orderType > span {
    display: block;
    font-size: 14px;
  }
  
  .orderType .type {
    width: 36px;
    height: 20px;
    text-align: center;
    color: white;
    line-height: 20px;
    border-radius: 3px;
  }
  
  .orderType .type.sell {
    background: rgba(3, 191, 123, 1);
  }
  
  .orderType .type.buy {
    background: rgba(233, 108, 66, 1);
  }
  
  .orderType .coinNane {
    font-size: 18px;
    color: rgba(33, 40, 62, 1);
  }
  
  table tbody, table tbody tr {
    border-top: 1px solid rgba(133, 131, 172, .2);
  }
  
  .hex_table .hex_table_body td .dealType span {
    margin-right: 10px;
  }
  
  td .dealType img {
    width: 18px;
    margin-right: 10px;
  }
  
  .soldOut {
    cursor: pointer;
    color: rgba(40, 149, 251, 1);
  }
  
  .hex_table_body td.lt .gray {
    color: rgba(153, 153, 153, 1);
  }


</style>

<template>
  <div class="traded">
    <div class="traded-block">
      <div class="left search-market  clearfix">
        <div class="traded-block-search">
          <hex-select ref="market"
                      :type="$i18n.t('patch.Market')"
                      :order="market"
                      :market="markettext"
                      @searchData="searchData"
                      @change="change"
                      :frenchcurrency="'frenchcurrency'"
                      @clearCurrentState="clearCurrentState"/>
        </div>
        <div class="traded-block-search">
          <hex-select ref="dirction"
                      :type="$i18n.t('patch.Side')"
                      :order="direction"
                      :market="directiontext"
                      @searchData="searchData"
                      @change="change"
                      @clearCurrentState="clearCurrentState"/>
        </div>
        <div class="traded-block-search">
          <hex-select ref="orderstatus"
                      :type="$i18n.t('patch.Status')"
                      :order="orderstatusselect"
                      :market="orderstatusselecttext"
                      @searchData="searchData"
                      @change="change"
                      @clearCurrentState="clearCurrentState"/>
        </div>
        <span class="traded-block-search_button" @click="getUserDeal(false)">{{$t('wallet.inquire')}}</span>
        <span class="traded-block-reset_button" @click="resetSelect">{{$t('memberCenter.reset')}}</span>
      
      </div>
      <table class="hex_table">
        <tbody>
        <tr class="hex_table_body"
            v-for="(a,index) in orderDetail"
            :key="index">
          <td class="fw">
            <div class="orderType">
              <span :class="['type',a.direction==-1?'buy':'sell']">{{a.direction==-1?$t('legalTrad.Sell'):$t('legalTrad.Buy')}}</span>
              <span class="coinNane">{{global_get_uppercase(a.currencyname)}}</span>
            </div>
          </td>
          <td class="lt ">
            <div><span class="gray">{{$t('legalDeal.Order')}}ID</span></div>
            <div><span class="gray">{{$t('legalTrad.Region')}}</span></div>
            <div><span class="gray">{{$t('c2c.CreateTime')}}</span></div>
          </td>
          <td class="lt ">
            <div><span>{{a.id}}</span></div>
            <div><span v-if="a.areaname">{{a.areaname}}</span>
              <span v-else>--</span></div>
            <div><span>{{global_get_local_time(a.createtime).format('YYYY-MM-DD HH:mm:ss')}}</span></div>
          </td>
          <td class="lt ">
            <div><span class="gray">{{$t('legalTrad.Unitprice')}}</span></div>
            <div><span class="gray">{{$t('legalTrad.quota')}}</span></div>
            <div><span class="gray">{{$t('c2c.Dealed')}}/{{$t('deal.count')}}</span></div>
          </td>
          <td class="lt ">
            <div><span>{{getprice(a)}}</span></div>
            <div>
              <span>{{global_get_tofixed(a.minprice,2)}} - {{global_get_tofixed(a.maxprice,2)}}</span>
            </div>
            <div><span>{{global_get_tofixed(a.transactionamount,c2cDecimal(a.currencyname))}}/{{global_get_tofixed(a.amount,c2cDecimal(a.currencyname))}}</span>
            </div>
          </td>
          <td class="lt ">
            <div class="gray">{{$t('c2c.PaymentMethod')}}</div>
            <div class="gray">{{$t('memberCenter.statue')}}</div>
            <div class="gray" v-if="!a.orderstatus">{{$t('home.tradeOperation')}}</div>
          </td>
          <td class="lt ">
            
            <div class="dealType">
              <img
                class="pay_icon"
                v-for="(payitem,payindex) in a.payconfiglist"
                :key="payindex"
                :src="payitem.icon"/>
              <span v-if="a.payconfiglist.length<=0">--</span>
            </div>
            <div>
              <span>{{a.orderstatus==0?$t('legalDeal.Normal'):$t('legalDeal.Unshelved')}}</span>
            </div>
            <div v-if="!a.orderstatus">
              <span class="soldOut" @click="soldOut(a.id)">{{$t('legalDeal.Unshevling')}}</span>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <!--取消订单-->
      <el-dialog
        top="0"
        custom-class="soldout-order-warn"
        :visible.sync="dialogVisible">
        <div>
          <img class="icon" src="../../static/images/trade/warning.svg" alt="">
          <p class="tip_h2">{{$t('c2c.operate')}}</p>
          <span class="soldout-button button-loading--por"
                v-loading="soldoutloading"
                @click="soldOutRequest">{{$t('c2c.ConfirmRemoval')}}</span>
        </div>
      </el-dialog>
    </div>
    <div class="anonymous" v-if="found">
      <div class="anonymous-pic">
        <img src="~/static/images/user/anonymous.svg" alt="">
      </div>
      <nuxt-link tag="p" to="/trade" class="anonymous-tip">{{$t('legalTrad.record')}}，{{$t('legalTrad.Go')}}<span> {{$t('legalTrad.Trade')}}</span>
      </nuxt-link>
    </div>
    <div class="paging-source" v-if="total>0">
      <el-pagination
        background
        @current-change="handChange"
        :page-size="10"
        popper-class="paging"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <div class="loadingPic por" v-hex-loading="loading" v-if="loading"></div>
  </div>
</template>
<script>
  import more from '@/components/public/more'
  import select from '@/components/security/deal_select'
  import deleteOrder from '@/components/security/popup-only-google'
  
  export default {
    name: 'articles',
    components: {
      'hex-more': more,
      "hex-select": select,
      "hex-delete": deleteOrder
    },
    computed: {
      orderstatusselect: function () {
        return [
          {
            id: 0,
            value: this.$t('legalDeal.Normal'),//未成交
            type: 'orderstatus'
          },
          {
            id: 1,
            value: this.$t('legalDeal.Unshelved'),//部分成交
            type: 'orderstatus'
          },
          {
            id: 2,
            value: this.$t('legalDeal.completed'),//交易完成
            type: 'orderstatus'
          },
        ]
      },
      direction: function () {
        return [
          {//方向
            id: 1,
            value: this.$t('memberCenter.buy'),//买入
            type: 'direction'
          }, {
            id: -1,
            value: this.$t('memberCenter.sell'),//卖出
            type: 'direction'
          }]
      }
    },
    data() {
      return {
        loading: true,
        soldOutId: '',//下架id
        dialogVisible: false,//弹窗状态
        popupstate: false,
        orderState: true,
        searchParam: {},
        serachOrder: {
          pagesize: 10,
          pageindex: 1,
          type: 1,
          orderstatus: -1
        },
        directiontext: "direction",
        markettext: "symble",
        orderstatusselecttext: "orderstatus",
        orderDetail: [],
        market: [],
        total: 0,
        found: false,
        soldoutloading: false
      }
    },
    mounted() {
      this.getUserDeal(true);
    },
    methods: {
      c2cDecimal(val) {
        let digits;
        switch (val) {
          case 'btc':
            digits = 6;
            break;
          case 'eth':
            digits = 4;
            break;
          case 'usdt':
            digits = 2;
            break;
          case 'cnyt':
            digits = 2;
            break;
        }
        return digits;
      },
      getprice(item) {
        const toname = this.global_get_legaltype(item.legaltype).name
        let qua = this.$store.getters.get_exchange_rate_by_name(item.currencyname, toname)
        qua = parseFloat(qua) + parseFloat(this.$np.times(qua , item.premium))
        let price = item.limitprice
        /*买单最高限价，卖单最低限价*/
        if (item.direction == 1) {
          if (qua < parseFloat(price)) {
            price = qua
          }
        } else {
          if (qua >= parseFloat(price)) {
            price = qua
          }
        }
        return this.global_get_tofixed(price, 2)
      },
      handChange(val) {
        this.getUserDeal(false, val);
      },
      change(val) {
        const _self = this;
        switch (val) {
          case 'direction':
            _self.$refs.market.changeBack();
            _self.$refs.orderstatus.changeBack();
            break;
          case 'symble':
            _self.$refs.dirction.changeBack();
            _self.$refs.orderstatus.changeBack();
            break;
          case 'orderstatus':
            _self.$refs.dirction.changeBack();
            _self.$refs.market.changeBack();
            break;
        }
      },
      popup() {
        this.popupstate = !this.popupstate;
      },
      soldOut(id) {
        this.dialogVisible = true;
        this.soldOutId = id;
      },
      soldOutRequest() {//订单下架
        if (this.soldoutloading) {
          return
        }
        this.soldoutloading = true
        this.$store.dispatch('trading_c2c_goods_offline', {orderid: this.soldOutId})
          .then((res) => {
            if (res.code == '200') {
              let fliterData = [];
              this.orderDetail.forEach((item) => {
                if (item.id != this.soldOutId) {
                  fliterData.push(item);
                }
              });
              this.orderDetail = fliterData;
              this.total = fliterData.length;
              this.$store.commit('set_message', {type: 'ok', text: res.msg});
            }
            this.dialogVisible = false
            this.soldoutloading = false
            this.soldOutId = '';
          })
      },
      clearCurrentState(id) {
        this.searchParam[id] = {};
      },
      resetSelect() {
        this.$refs.dirction.clearStatus();
        this.$refs.market.clearStatus();
        this.$refs.orderstatus.clearStatus();
        this.searchParam = {};
      },
      searchData(val) {//用于存子组件传过来数据
        this.searchParam[val.type] = val;
      },
      getAllPrice(coins) {
        const p = coins.tradeavgprice * coins.transactionamount;
        if (!p) return p.toFixed(2)
        return p.toFixed(8)
      },
      // 过去用户交易记录
      getUserDeal(val, pageIndex) {
        this.$refs.dirction.changeBack();
        this.$refs.market.changeBack();
        this.$refs.orderstatus.changeBack();
        let serachOrder = this.serachOrder;
        this.orderState = true;
        const _params = this.searchParam;
        val || !pageIndex ? serachOrder.pageindex = 1 : serachOrder.pageindex = pageIndex;
        let symbles, direction, orderstatus;
        _params.direction == undefined ? direction = [] : direction = Object.getOwnPropertyNames(_params.direction);
        _params.symble == undefined ? symbles = [] : symbles = Object.getOwnPropertyNames(_params.symble);
        _params.orderstatus == undefined ? orderstatus = [] : orderstatus = Object.getOwnPropertyNames(_params.orderstatus);
        if (direction.length > 0) {
          serachOrder[_params.direction.type] = _params.direction.id;
        } else {
          delete serachOrder.direction;
        }
        if (symbles.length > 0) {
          serachOrder['currencyname'] = _params.symble.value;
        } else {
          delete serachOrder.currencyname;
        }
        if (orderstatus.length > 0) {
          serachOrder[_params.orderstatus.type] = _params.orderstatus.id;
        } else {
          delete serachOrder.orderstatus;
        }
        this.$store.dispatch('trading_c2c_market_pagedlist', serachOrder).then(({data}) => {
          if (data && data.pagedata.length > 0) {
            this.total = data.totalitemcount;
            this.orderDetail = data.pagedata;
            this.found = false;
          } else {
            this.total = 0;
            this.found = true;
            this.orderDetail = [];
          }
          this.loading = false;
        })
      }
    }
  }
</script>

