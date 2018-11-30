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

  .hex_table_body td {
    padding: 0 7px;
  }

  .hex_table_header th {
    padding: 0 7px;
  }
</style>
<template>
  <div class="traded">
    <div class="traded-block">
      <div class="left search-market  clearfix" v-if="isSelect">
        <div class="traded-block-search">
          <hex-select ref="ordertype"
                      :type="$i18n.t('patch.Type')"
                      :order="ordertype"
                      :market="ordertypetext"
                      @searchData="searchData"
                      @change="change"
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
          <hex-select ref="market"
                      :type="$i18n.t('patch.Market')"
                      :order="market"
                      :market="markettext"
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
        <thead class="hex_table_header padding br">
        <tr>
          <th class="lt">
            <div>{{$t('memberCenter.orderTime')}}</div>
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
            <div>{{$t('deal.entrustPrices')}}</div>
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
            <div>{{$t('memberCenter.makeprices')}}</div>
          </th>
          <th class="rt">
            <div>{{$t('memberCenter.statue')}}</div>
          </th>
          <th class="rt">
            <div>{{$t('home.tradeOperation')}}</div>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr class="hex_table_body padding"
            v-for="(coins,index) in orderDetail"
            :key="index">
          <td class="lt">
            {{global_get_local_time(coins.createtime).format('YYYY-MM-DD HH:mm:ss')}}
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
          <td class="rt" v-if=" coins.ordertype==1"> {{global_get_tofixed(coins.price,global_get_decimal(coins.symble).p)}}</td>
          <td class="rt" v-else>--</td>
          <td class="rt">
            {{global_get_tofixed(coins.amount,global_get_decimal(coins.symble).a)}}
          </td>
          <td class="rt">
            {{global_get_tofixed(coins.transactionamount,global_get_decimal(coins.symble).a)}}
          </td>
          <td class="rt">
            {{global_get_tofixed(getavgprice(coins),global_get_decimal(coins.symble).p)}}
          </td>
          <td class="rt">
            {{global_get_tofixed((coins.ordertype==2?coins.transactionamount:coins.tradeavgprice*coins.transactionamount),global_get_decimal(coins.symble).p)}}
          </td>
          <td class="rt">
            {{coins.orderstatus==0?$t('memberCenter.unturn'):$t('memberCenter.sectionunturn')}}
          </td>
          <td class="rt repeal" @click="upPop(coins)">
            {{$t('memberCenter.revoke')}}
          </td>
        </tr>
        </tbody>
      </table>
      <div class="loadingPic por" v-hex-loading="loading" v-if="loading"></div>
      <div class="anonymous" v-if="found">
        <div class="anonymous-pic">
          <img src="~/static/images/user/anonymous.svg" alt="">
        </div>
        <nuxt-link tag="p" to="/deal/eth_btc" class="anonymous-tip">{{$t('legalTrad.record')}}，{{$t('legalTrad.Go')}}<span> {{$t('legalTrad.Trade')}}</span>
        </nuxt-link>
      </div>
      <div class="paging-source" v-if="total>0">
        <el-pagination
          background
          @current-change="handChange"
          :page-size="20"
          popper-class="paging"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
      <hex-delete v-show="popupstate"
                  ref="popname"
                  @closePopup="popup"
                  @deleteAddress="repeal"/>
    </div>
  </div>
</template>

<script>
  import more from '@/components/public/more'
  import select from '@/components/security/deal_select'
  import deleteOrder from '@/components/security/popup-only-google'


  export default {
    name: 'articles',
    props:['isSelect'],
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
            value: this.$t('memberCenter.unturn'),//未成交
            type: 'orderstatus'
          },
          {
            id: 1,
            value: this.$t('memberCenter.sectionunturn'),//部分成交
            type: 'orderstatus'
          },
        ]
      },
      ordertype: function () {
        return [
          {//类型

            id: 1,//状态
            value: this.$t('deal.limitedDeal'),//限价交易
            type: 'ordertype'
          }, {
            id: 2,
            value: this.$t('deal.marketDeal'),//市价交易
            type: 'ordertype'
          }]
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
        popupstate: false,
        orderState: true,
        serachOrder: {
          pageindex: 0,
          pagesize: 20,
        },
        searchParam: {},
        directiontext: "direction",
        ordertypetext: "ordertype",
        markettext: "symble",
        orderstatusselecttext: "orderstatus",
        orderDetail: [],
        market: [],
        total: 0,
        found: false
      }
    },
    mounted() {
      this.getUserDeal(true);
    },
    methods: {
      handChange(val) {
        this.getUserDeal(false, val);
      },
      change(val) {
        const _self = this;
        switch (val) {
          case 'direction':
            _self.$refs.ordertype.changeBack();
            _self.$refs.market.changeBack();
            _self.$refs.orderstatus.changeBack();
            break;
          case 'ordertype':
            _self.$refs.dirction.changeBack();
            _self.$refs.market.changeBack();
            _self.$refs.orderstatus.changeBack();
            break;
          case 'symble':
            _self.$refs.dirction.changeBack();
            _self.$refs.ordertype.changeBack();
            _self.$refs.orderstatus.changeBack();
            break;
          case 'orderstatus':
            _self.$refs.dirction.changeBack();
            _self.$refs.ordertype.changeBack();
            _self.$refs.market.changeBack();
            break;
        }
      },
      getavgprice(m) {
        const ary = [1, 3, 4]
        if (ary.indexOf(m.orderstatus) < 0) {
          return '--'
        } else {
          return this.global_get_tofixed(m.tradeavgprice)
        }
      },
      upPop(val) {
        this.popupstate = !this.popupstate;
        this.$refs.popname.ShowPopup(val, 'repeal');
      },
      popup() {
        this.popupstate = !this.popupstate;
      },
      repeal(id) {//订单撤销
        this.$store.dispatch('trading_order_cancel', {orderid: id}).then((res) => {
          if (res.data) {
            let fliterData = [];
            this.orderDetail.forEach((item) => {
              if (item.id != id) {
                fliterData.push(item);
              }
            });
            this.popupstate = !this.popupstate;
            this.orderDetail = fliterData;
            this.$store.commit('set_message', {type: 'ok', text: res.msg})
          }
          this.$refs.popname.closeLoading();
        })
      },
      clearCurrentState(id) {
        this.searchParam[id] = {};

      },
      resetSelect() {
        this.$refs.dirction.clearStatus();
        this.$refs.ordertype.clearStatus();
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
        if(this.isSelect){
          this.$refs.dirction.changeBack();
          this.$refs.ordertype.changeBack();
          this.$refs.market.changeBack();
          this.$refs.orderstatus.changeBack();
        }
        let serachOrder = this.serachOrder;
        this.orderState = true;
        const _params = this.searchParam;
        val || !pageIndex ? serachOrder.pageindex = 1 : serachOrder.pageindex = pageIndex;
        let symbles, direction, orderstatus,ordertype;
        _params.direction == undefined ? direction = [] : direction = Object.getOwnPropertyNames(_params.direction);
        _params.ordertype == undefined ? ordertype = [] : ordertype = Object.getOwnPropertyNames(_params.ordertype);
        _params.symble == undefined ? symbles = [] : symbles = Object.getOwnPropertyNames(_params.symble);
        _params.orderstatus == undefined ? orderstatus = [] : orderstatus = Object.getOwnPropertyNames(_params.orderstatus);
        if (direction.length > 0) {
          serachOrder[_params.direction.type] = _params.direction.id;
        } else {
          delete serachOrder.direction;
        }
        if (ordertype.length > 0) {
          serachOrder[_params.ordertype.type] = _params.ordertype.id;
        } else {
          delete serachOrder.ordertype;
        }
        if (symbles.length > 0) {
          serachOrder['symble'] = _params.symble.value;
        } else {
          delete serachOrder.currencyname;
        }
        if (orderstatus.length > 0) {
          serachOrder[_params.orderstatus.type] = _params.orderstatus.id;
        } else {
          serachOrder.orderstatus = '0,1';
        }
        this.$store.dispatch('trading_order_search', serachOrder).then(({data}) => {
          if (data) {
            this.total = data.totalitemcount;
            this.orderDetail=data.pagedata;
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

