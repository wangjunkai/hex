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
  
  td .dealType {
    .Unionpay:before {
      content: '';
      background: url('../../static/images/legal/Unionpay.svg') no-repeat;
      vertical-align: middle;
      width: 18px;
      height: 18px;
      background-size: cover;
      display: inline-block;
    }
    .Alipay:before {
      content: '';
      background: url('../../static/images/legal/Alipay.svg') no-repeat;
      vertical-align: middle;
      width: 18px;
      height: 18px;
      background-size: cover;
      display: inline-block;
    }
    .wechat:before {
      content: '';
      background: url('../../static/images/legal/wechat.svg') no-repeat;
      vertical-align: middle;
      width: 18px;
      height: 18px;
      background-size: cover;
      display: inline-block;
    }
    .Wumis:before {
      content: '';
      background: url('../../static/images/legal/Wumis.svg') no-repeat;
      vertical-align: middle;
      width: 18px;
      height: 18px;
      background-size: cover;
      display: inline-block;
    }
    .money-gram:before {
      content: '';
      background: url('../../static/images/legal/money-gram.svg') no-repeat;
      vertical-align: middle;
      width: 18px;
      height: 18px;
      background-size: cover;
      display: inline-block;
    }
    .Paypal:before {
      content: '';
      background: url('../../static/images/legal/Paypal.svg') no-repeat;
      vertical-align: middle;
      width: 18px;
      height: 18px;
      background-size: cover;
      display: inline-block;
    }
  }
  
  .soldOut {
    cursor: pointer;
    color: rgba(40, 149, 251, 1);
    margin-right: 10px;
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
            v-for="a in orderDetail"
            :key="a.id">
          <td class="fw">
            <div class="orderType">
              <span :class="['type',a.direction==1?'sell':'buy']">{{a.direction==1?$t('memberCenter.buy'):$t('memberCenter.sell')}}</span>
              <span class="coinNane">{{global_get_uppercase(a.currencyname)}}</span>
            </div>
          </td>
          <td class="lt ">
            <div><span class="gray">{{$t('legalDeal.Order')}}ID</span></div>
            <div><span class="gray">{{$t('legalDeal.Ordertime')}}</span></div>
            <div><span class="gray">{{$t('legalDeal.Dealtime')}}</span></div>
          </td>
          <td class="lt ">
            <div><span>{{a.id}}</span></div>
            <div><span>{{global_get_local_time(a.createtime).format('YYYY-MM-DD HH:mm:ss')}}</span></div>
            <div>
              <span v-if="a.complettime">{{global_get_local_time(a.complettime).format('YYYY-MM-DD HH:mm:ss')}}</span>
              <span v-else>--</span>
            </div>
          </td>
          <td class="lt ">
            <div><span class="gray">{{$t('legalTrad.Quantity')}}</span></div>
            <div><span class="gray">{{$t('legalTrad.Unit')}}</span></div>
            <div><span class="gray">{{$t('legalTrad.Totalprice')}}</span></div>
          </td>
          <td class="lt ">
            <div><span>{{global_get_tofixed(a.amount,c2cDecimal(a.currencyname))}}</span></div>
            <div><span>{{global_get_tofixed(a.price,2)}}</span></div>
            <div><span>{{global_get_tofixed(a.amount*a.price,2)}}</span></div>
          </td>
          <td class="lt ">
            <div class="gray">{{$t('c2c.Transaction')}}</div>
            <div class="gray">{{$t('legalDeal.Status')}}</div>
            <div class="gray">{{$t('home.tradeOperation')}}</div>
          </td>
          <td class="lt ">
            <div class="dealType">{{a.nikename}}</div>
            <div>
              <span v-if="a.orderstatus==0">
                {{$t('c2c.buyers')}}
              </span>
              <span v-else-if="a.orderstatus==4">
                {{$t('c2c.seller')}}
              </span>
              <span v-else-if="a.orderstatus==1||a.orderstatus==5||a.orderstatus==7">
                {{$t('legalDeal.completed')}}
              </span>
              <span v-else-if="a.orderstatus==2||a.orderstatus==3">
                {{$t('c2c.Cancelled')}}
              </span>
              <span v-else-if="a.orderstatus==6">
                {{$t('c2c.Appealing')}}
              </span>
            </div>
            <div>
              <!--买家-->
              <template v-if="a.direction>0">
                <template v-if="a.orderstatus==0">
                  <span class="soldOut" @click="changeusercancel(a)">{{$t('legalDeal.Withdraw')}}</span>
                  <span class="soldOut" @click="paybuyaffirm(a)">{{$t('legalDeal.confimation')}}</span>
                </template>
                <template v-if="a.orderstatus==4">
                  <span class="soldOut" @click="changeappealstate(a)">{{$t('legalDeal.Complaint')}}</span>
                  <span class="soldOut"
                        onclick="_MEIQIA('showPanel')">{{$t('patch.ContactService')}}</span>
                </template>
                <span v-if="a.orderstatus==5"
                      @click="gotrade(a)"
                      class="soldOut">{{$t('c2c.comment')}}</span>
                <span v-if="a.orderstatus==6"
                      onclick="_MEIQIA('showPanel')"
                      class="soldOut">{{$t('patch.ContactService')}}</span>
              </template>
              <template v-else>
                <template v-if="a.orderstatus==4">
                  <span class="soldOut" @click="changeappealstate(a)">{{$t('legalDeal.Complaint')}}</span>
                  <span class="soldOut" @click="paysellaffirm(a)">{{$t('c2c.Confirmpayment')}}</span>
                  <span class="soldOut"
                        onclick="_MEIQIA('showPanel')">{{$t('patch.ContactService')}}</span>
                </template>
                <span v-if="a.orderstatus==5"
                      @click="gotrade(a)"
                      class="soldOut">{{$t('c2c.comment')}}</span>
                <span class="soldOut"
                      v-if="a.orderstatus==6"
                      onclick="_MEIQIA('showPanel')">{{$t('patch.ContactService')}}</span>
              </template>
              <span class="soldOut" @click="gotrade(a)">{{$t('legalDeal.detailed')}}</span>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <hex-delete v-show="popupstate"
                  ref="popname"
                  @closePopup="popup"
                  @deleteAddress="repeal"/>
      
      <div class="anonymous" v-if="found">
        <div class="anonymous-pic">
          <img src="~/static/images/user/anonymous.svg" alt="">
        </div>
        <nuxt-link tag="p" to="/trade" class="anonymous-tip">
          {{$t('legalTrad.record')}}，{{$t('legalTrad.Go')}}<span> {{$t('legalTrad.Trade')}}</span>
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
    
    <!--确认支付-->
    <el-dialog
      top="0"
      custom-class="soldout-order-warn"
      :visible.sync="confirmorderbuystate">
      <div>
        <img class="icon" src="../../static/images/trade/warning.svg" alt="">
        <p class="tip_h2">{{$t('c2c.success')}}</p>
        <span class="soldout-button button-loading--por"
              v-loading="affirmbuyloading"
              @click="confirmreceipt">{{$t('legalTrad.Paymentconfimation')}}</span>
      </div>
    </el-dialog>
    <!--确认收款-->
    <el-dialog
      top="0"
      custom-class="soldout-order-warn"
      :visible.sync="confirmordersellstate">
      <div>
        <img class="icon" src="../../static/images/trade/warning.svg" alt="">
        <p class="tip_h1">{{$t('c2c.2')}}</p>
        <p class="tip_h2">{{$t('c2c.3')}}</p>
        <span class="soldout-button button-loading--por"
              v-loading="affirmsellloading"
              @click="confirmreceiptsell">{{$t('c2c.Confirmpayment')}}</span>
      </div>
    </el-dialog>
    <!--申诉订单-->
    <el-dialog
      top="0"
      custom-class="soldout-order-warn"
      :visible.sync="userappealstate">
      <div>
        <img class="icon" src="../../static/images/trade/warning.svg" alt="">
        <p class="tip_h2">{{$t('c2c.Appeal')}}</p>
        <span class="soldout-button button-loading--por"
              v-loading="userappealloading"
              @click="userappeal">{{$t('c2c.Confirmation')}}</span>
      </div>
    </el-dialog>
    <!--取消订单-->
    <el-dialog
      top="0"
      custom-class="soldout-order-warn"
      :visible.sync="usercancelstate">
      <div>
        <img class="icon" src="../../static/images/trade/warning.svg" alt="">
        <p class="tip_h2">{{$t('legalTrad.surecancel')}}？</p>
        <span class="soldout-button button-loading--por"
              v-loading="usercancelloading"
              @click="usercancel">{{$t('legalTrad.Cancellorder')}}</span>
      </div>
    </el-dialog>
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
      //     未付款： 0
      // 已付款：4
      // 已完成：1、5
      // 已取消：2、3
      // 申诉：6
      orderstatusselect: function () {
        return [
          {
            id: 0,
            value: this.$t('legalDeal.Unpaid'),//未付款
            type: 'orderstatus'
          },
          {
            id: 4,
            value: this.$t('legalDeal.Paid'),//已付款
            type: 'orderstatus'
          },
          {
            id: '1,5',
            value: this.$t('legalDeal.Complete'),//已完成
            type: 'orderstatus'
          },
          {
            id: '2,3',
            value: this.$t('legalDeal.Cancelled'),//已取消
            type: 'orderstatus'
          },
          {
            id: 6,
            value: this.$t('legalDeal.Complaint'),//申诉
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
        popupstate: false,
        orderState: true,
        serachOrder: {
          pagesize: 10,
          pageindex: 1,
        },
        searchParam: {},
        directiontext: "direction",
        ordertypetext: "ordertype",
        markettext: "symble",
        orderstatusselecttext: "orderstatus",
        orderDetail: [],
        market: [],
        total: 0,
        found: false,
        /*state*/
        activeorder: '',
        confirmorderbuystate: false,
        affirmbuyloading: false,
        confirmordersellstate: false,
        affirmsellloading: false,
        userappealstate: false,
        userappealloading: false,
        usercancelstate: false,
        usercancelloading: false
      }
    },
    mounted() {
      this.getUserDeal();
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
      gotrade(order) {
        this.$router.push({path: '/trade/' + order.id})
      },
      /*买家确认支付*/
      paybuyaffirm(item) {
        this.confirmorderbuystate = true
        this.activeorder = item
      },
      paysellaffirm(item) {
        this.confirmordersellstate = true
        this.activeorder = item
      },
      /*用户订单申诉*/
      changeappealstate(item) {
        this.userappealstate = true
        this.activeorder = item
      },
      /*取消订单*/
      changeusercancel(item) {
        this.usercancelstate = true
        this.activeorder = item
      },
      /*买家确认支付*/
      confirmreceipt() {
        if (this.affirmbuyloading) {
          return
        }
        this.affirmbuyloading = true
        this.$store.dispatch('trading_c2c_order_comfirmpay', {ordercompleteid: this.activeorder.id})
          .then((res) => {
            if (res.code == '200') {
              this.getorderdetail(4).then((data) => {
                this.$store.commit('set_message', {type: 'ok', text: this.$t('c2c.Confirmed')})
                this.affirmbuyloading = false
                this.confirmorderbuystate = false
              })
            } else {
              this.affirmbuyloading = false
            }
          })
      },
      /*卖家确认收款*/
      confirmreceiptsell() {
        if (this.affirmsellloading) {
          return
        }
        this.affirmsellloading = true
        this.$store.dispatch('trading_c2c_order_receivables', {ordercompleteid: this.activeorder.id})
          .then((res) => {
            if (res.code == '200') {
              this.getorderdetail(1).then((data) => {
                this.$store.commit('set_message', {type: 'ok', text: this.$t('c2c.ConfirmedR')})
                this.affirmsellloading = false
                this.confirmordersellstate = false
              })
            } else {
              this.affirmsellloading = false
            }
          })
      },
      /*用户取消订单*/
      usercancel() {
        if (this.usercancelloading) {
          return
        }
        this.usercancelloading = true
        this.$store.dispatch('trading_c2c_order_cancel', {ordercompleteid: this.activeorder.id})
          .then((res) => {
            if (res.code == '200') {
              this.getorderdetail(2).then((data) => {
                this.usercancelstate = false
                this.usercancelloading = false
                this.$store.commit('set_message', {type: 'ok', text: this.$t('c2c.Successfully')})
              })
            } else {
              this.usercancelloading = false
            }
          })
      },
      
      /*订单申诉*/
      userappeal() {
        if (this.userappealloading) {
          return
        }
        this.userappealloading = true
        this.$store.dispatch('trading_c2c_order_appeal', {ordercompleteid: this.activeorder.id})
          .then((res) => {
            if (res.code == '200') {
              this.getorderdetail(6).then((data) => {
                this.userappealstate = false
                this.userappealloading = false
                this.$store.commit('set_message', {type: 'ok', text: this.$t('c2c.Submitted')})
              })
            } else {
              this.userappealloading = false
            }
          })
      },
      /*获取订单*/
      getorderdetail(state) {
        const im = this._data.$im
        const _self = this
        im.logininfo.identifier = _self.$userinfo.uid
        im.logininfo.userSig = _self.$store.state.hex_server_tencentim_sign.value
        
        im.friendid = _self.activeorder.type < 0 ? _self.activeorder.userid : _self.activeorder.orderuserid
        /*登录im 并 发送 创建成功订单消息*/
        this.getUserDeal(false, this.serachOrder.pageindex)
        return im.login()
          .then(
            (resp) => {
              return true
            },
            (err) => {
              console.log(err.ErrorInfo, 'im----------error-----:');
            }
          )
          .then((orderdata) => {
            if (!orderdata) {
              return
            }
            let msgobj = {
              message: '',
              desc: '',
              ext: state.toString() //订单的状态（0 为创建订单成功未支付）
            }
            return im.sendmessage(msgobj)
              .then(
                ({resp, msg}) => {
                  return true
                },
                (err) => {
                }
              )
          })
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
      upPop(val) {
        this.popupstate = !this.popupstate;
        this.$refs.popname.ShowPopup(val, 'repeal');
      },
      popup() {
        this.popupstate = !this.popupstate;
      },
      repeal(id) {//订单撤销
        this.$store.dispatch('trading_order_cancel', {orderId: id}).then((res) => {
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
        this.$store.dispatch('trading_c2c_order_pagedlist', serachOrder).then(({data}) => {
          if (data) {
            if (data.pagedata.length > 0) {
              this.total = data.totalitemcount;
              this.orderDetail = data.pagedata;
              this.found = false;
            } else {
              this.total = 0;
              this.found = true;
              this.orderDetail = [];
            }
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

