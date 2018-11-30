<style lang='less' scoped>
  @import "../static/styles/color";
  @import "../static/styles/table";
  
  .trade {
    background-color: @cl_fff;
  }
  
  .trade-content {
    width: 1200px;
    min-width: 1200px;
    padding: 30px 0;
    margin: auto;
  }
  
  .trade-sell-buttons {
    padding-left: 20px;
    text-align: center;
    .buttons_buy, .buttons_sell {
      display: inline-block;
      width: 100px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      font-weight: bold;
      border-radius: 3px;
      cursor: pointer;
      margin-right: 20px;
      background-color: @cl_f1f;
      color: @cl_212;
    }
    .buttons_buy.active, .buttons_sell.active {
      background-color: @cl_289;
      color: @cl_fff;
    }
  }
  
  .trade-top {
    line-height: 32px;
    height: 32px;
    margin-top: 40px;
    .trade-nav {
      li {
        font-size: 16px;
        color: @cl_212;
        font-weight: 600;
        margin-right: 26px;
        padding-bottom: 2px;
        float: left;
        cursor: pointer;
        transition: color .2s cubic-bezier(.645, .045, .355, 1);
      }
      li:hover, li.active {
        color: @cl_289;
        border-bottom: 2px solid @cl_289;
      }
    }
    .trade-top_tip {
      position: relative;
    }
    .trade-top_tip.active > i {
      background-image: url("../static/images/trade/tip-active.svg");
    }
    .trade-top_tip > i {
      display: inline-block;
      width: 16px;
      height: 32px;
      vertical-align: middle;
      background-repeat: no-repeat;
      background-size: 16px 16px;
      background-position: center;
      background-image: url("../static/images/trade/tip.svg");
      margin-right: 8px;
      cursor: pointer;
    }
    .trade-top_tip .tip_modal {
      padding: 10px;
      width: 320px;
      line-height: 18px;
      font-size: 12px;
      border-radius: 4px;
      background: rgba(33, 40, 62, 1);
      box-shadow: 0 2px 4px 0 rgba(100, 107, 140, 0.3);
      opacity: 0.9;
      position: absolute;
      top: 40px;
      left: -60px;
      z-index: 2001;
      .row {
        padding-left: 10px;
        position: relative;
        color: #dee0e6;
        dt {
          position: absolute;
          left: 0;
          top: 7px;
          display: inline-block;
          width: 4px;
          height: 4px;
          background-color: #9094a4;
          border-radius: 200px;
        }
      }
    }
    .trade-top_tip .tip_modal:before {
      content: '';
      display: inline-block;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 7.5px 8px 7.5px;
      border-color: transparent transparent @cl_212 transparent;
      position: absolute;
      top: -6px;
      left: 60px;
    }
    .trade-entry-buttons {
      .buttons_create, .buttons_manage {
        display: inline-block;
        width: 80px;
        height: 32px;
        border-radius: 3px;
        margin-right: 10px;
        color: @cl_fff;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
      }
      .buttons_create {
        background: @cl_37b_00a;
      }
      .buttons_manage {
        background: @cl_00e_24d;
      }
    }
    .trade-search {
      position: relative;
      .input_content {
        min-width: 222px;
        height: 100%;
        margin-right: 8px;
        .block_tip {
          display: inline-block;
          height: 22px;
          line-height: 22px;
          margin-right: 5px;
          border-radius: 2px;
          background-color: @cl_838;
          color: @cl_fff;
          font-size: 12px;
          padding: 0 10px;
          text-align: center;
        }
      }
      .search-input {
        padding: 4px 8px 4px 4px;
        height: 32px;
        border: 1px solid @cl_ddd;
        color: @cl_fff;
        font-size: 12px;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        line-height: normal;
      }
      .input_icon.active {
        background-image: url("../static/images/trade/search-active.svg");
      }
      .input_icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: middle;
        background-repeat: no-repeat;
        background-image: url("../static/images/trade/search.svg");
      }
      .search-modal {
        z-index: 10;
        width: 300px;
        position: absolute;
        top: 33px;
        right: 0;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 2px 4px 0 rgba(100, 107, 140, 0.3);
        border-radius: 3px;
        padding: 20px;
        color: @cl_212;
        .search_group {
          display: flex;
          flex-direction: row;
          margin-bottom: 20px;
          .input_tip {
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 4px;
            width: 160px;
            font-size: 14px;
            padding: 0 14px;
          }
          .title {
            flex: auto;
            font-size: 12px;
          }
          .content {
            width: 160px;
          }
          .content /deep/ .el-input__inner {
            height: 32px;
            line-height: 32px;
          }
          .content /deep/ .el-input__icon {
            line-height: 32px;
          }
        }
        .button_group {
          margin-top: 10px;
          .search, .cancel {
            display: inline-block;
            width: 60px;
            line-height: 32px;
            height: 30px;
            text-align: center;
            margin-left: 10px;
            font-size: 14px;
            border-radius: 3px;
            cursor: pointer;
          }
          .search {
            background: @cl_37b_00a;
            color: @cl_fff;
          }
          .cancel {
            background-color: @cl_f0e;
            color: @cl_212;
          }
        }
      }
    }
  }

</style>
<style lang='less'>
  @import "../static/styles/color";
  @import "../static/styles/transition";
  
  .trade-order-warn {
    width: 360px;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
    .icon {
      width: 36px;
      height: 36px;
      display: inline-block;
    }
    .tip {
      font-size: 14px;
      color: @cl_333;
      margin-top: 20px;
    }
    .create {
      display: inline-block;
      width: 180px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: @cl_fff;
      background: @cl_37b_00a;
      font-size: 14px;
      border-radius: 4px;
      margin-top: 30px;
      cursor: pointer;
    }
  }
  
  .trade-order-nike {
    width: 360px;
    top: 50%;
    transform: translateY(-50%);
    .el-dialog__title {
      font-size: 16px;
      font-weight: 600;
    }
    .el-dialog__body {
      padding: 15px 20px 30px 20px;
    }
    .tip {
      font-size: 12px;
      color: @cl_333;
      margin-bottom: 6px;
    }
    .nike {
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: #333333;
      border: 1px solid @cl_ddd;
      border-radius: 4px;
      padding: 0 7px;
      
    }
    .nike.error {
      border: 1px solid #ff3366;
    }
    .create {
      display: inline-block;
      width: 180px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: @cl_fff;
      background: @cl_37b_00a;
      font-size: 14px;
      border-radius: 4px;
      margin: 30px auto 0 auto;
      cursor: pointer;
    }
  }
  
  .trade-table {
    margin-top: 30px;
    min-height: 400px;
    .button-buy {
      width: 80px;
      height: 32px;
      line-height: 32px;
      display: inline-block;
      text-align: center;
      color: @cl_fff;
      border-radius: 3px;
      cursor: pointer;
    }
    .button-buy.buy {
      background: @cl_37b_00a;
    }
    .button-buy.sell {
      background: @cl_00e_24d;
    }
    .button-buy_error {
      background: #bdbdbd;
      cursor: no-drop;
    }
    th {
      height: 40px;
      line-height: 40px;
      background-color: @cl_faf;
      font-size: 14px;
      color: @cl_838;
    }
    .hex_table_body:hover {
      background-color: initial;
    }
    .hex_table_body {
      font-size: 14px;
      line-height: 60px;
      .nikename_group {
        line-height: 1.5;
      }
      .photo {
        display: inline-block;
        border-radius: 200px;
        text-align: center;
        width: 36px;
        height: 36px;
        line-height: 36px;
        vertical-align: middle;
        margin-right: 10px;
        color: @cl_fff;
      }
      .pay_icon {
        width: 18px;
        height: 18px;
        vertical-align: middle;
        margin-right: 10px;
      }
      .comment {
        display: inline-block;
        font-weight: normal;
        font-size: 12px;
        color: #A5A9BE;
      }
    }
    .hex_table_body:last-child {
      border-bottom: 1px solid @cl_f5f;
    }
    .trade-table-detail {
      padding: 20px;
      background-color: @cl_f5f;
      border-radius: 4px;
      font-size: 14px;
      color: @cl_646;
      line-height: 20px;
      .deal-info, .buy-info {
        float: left;
        width: 50%;
      }
      .info_title {
        font-size: 16px;
        font-weight: bold;
        color: @cl_212;
        margin-bottom: 20px;
      }
      .deal-info {
        padding-right: 120px;
        .deal_tip {
          color: @cl_e96;
          margin-bottom: 8px;
          margin-top: 20px;
        }
        .info_content {
          display: table;
        }
        .info_content .row {
          display: table-row;
        }
        .info_content .row dt, .info_content .row dd {
          display: table-cell;
        }
        .info_content .row .value {
          margin-left: 30px;
          margin-bottom: 10px;
          color: @cl_212;
          font-weight: 600;
        }
        .info_content .row .value.price {
          color: @cl_289;
        }
      }
      .buy-info {
        padding-left: 10px;
        .buy_buttons_group {
          width: 400px;
          margin-bottom: 20px;
          .buttons_title {
            font-size: 12px;
            color: @cl_646;
            margin-bottom: 6px;
          }
        }
        .buy_protocol {
          display: inline-block;
          cursor: pointer;
        }
        .buy_protocol .checkbox {
          display: inline-block;
          width: 14px;
          height: 14px;
          background-repeat: no-repeat;
          background-size: cover;
          background-image: url("../static/images/trade/select.svg");
          vertical-align: middle;
          position: relative;
          top: -1px;
          margin-right: 10px;
        }
        .buy_protocol .checkbox.active {
          background-image: url("../static/images/trade/select-active.svg");
        }
        .buy_protocol_tip {
          color: @cl_link;
        }
        .buy-button {
          cursor: pointer;
          display: inline-block;
          width: 180px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          color: @cl_fff;
          background: @cl_37b_00a;
          font-size: 14px;
          border-radius: 4px;
          margin-top: 30px;
        }
        .buy-button .el-loading-spinner {
          .circular {
            width: 30px;
          }
          .path {
            stroke: @cl_link;
          }
        }
      }
    }
  }
  
  .trade-content {
    .require_tip {
      opacity: 0;
      color: @cl_e96;
    }
    .group--error {
      .require_tip {
        opacity: 1;
      }
      .input-number, .select-account {
        border: 1px solid @cl_cd4;
      }
    }
  }
  
  .buttons-create {
    display: inline-block;
    width: 80px;
    height: 32px;
    border-radius: 3px;
    margin-right: 10px;
    color: #ffffff;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    background: linear-gradient(90deg, #37bff2 0%, #00aeef 100%);
  }
  
  td.direction .buy {
    color: rgba(3, 191, 123, 1);
  }
  
  td.direction .sell {
    color: rgba(233, 108, 66, 1);
  }
  
  .paging-source-deal {
    padding: 10px 0;
    text-align: center;
  }
  
  .soldOut {
    cursor: pointer;
    color: rgba(40, 149, 251, 1);
  }
  
  .legal-order-warn {
    width: 360px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    text-align: center;
    color: #333333;
    .icon {
      display: inline-block;
      width: 36px;
      height: 36px;
      margin-bottom: 10px;
    }
    .tip_h1 {
      font-weight: 600;
    }
    .tip_h2 {
      margin-top: 10px;
      margin-bottom: 20px;
    }
    .legal-button {
      display: inline-block;
      width: 180px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: @cl_fff;
      background: @cl_37b_00a;
      font-size: 14px;
      border-radius: 4px;
      margin-bottom: 40px;
      cursor: pointer;
    }
    .el-dialog__body {
      padding: 15px 20px 30px 20px;
      .legal-button {
        margin: 0;
      }
    }
  }
  
  .price-odd {
    color: rgba(40, 149, 251, 1);
    font-weight: bold
  }
</style>
<template>
  <div class="hex-flex">
    <div class="trade hex-flex_auto">
      <div class="trade-content">
        <div class="trade-top clearfix">
          <span @click="createorder" class="buttons-create">{{$t('legalTrad.Create')}}</span>
          <ul class="trade-nav right clearfix">
            <li :class="{'active':!selectcurrencystate}"
                @click="setselectcurrencystate('')">{{$t('legalTrad.Totalcurrencies')}}
            </li>
            <li
              :class="{'active':selectcurrencystate==item.id}"
              :key="item.id"
              @click="setselectcurrencystate(item.id)"
              v-for="(item) in currencyoption">
              {{global_get_uppercase(item.currencyname)}}
            </li>
          </ul>
        </div>
        <div
          v-hex-loading="orderlistloading"
          class="trade-table hex-flex por">
          <div class="hex-flex_auto">
            <table
              class="hex_table">
              <thead class="hex_table_header">
              <tr>
                <th class="lt">
                  <span>{{$t('legalTrad.IDAds')}}</span>
                </th>
                <th class="lt">
                  <span>{{$t('c2c.CreateTime')}}</span>
                </th>
                <th class="lt">
                  <span>{{$t('memberCenter.direction')}}</span>
                </th>
                <th class="lt">
                  <span>{{$t('wallet.coin')}}</span>
                </th>
                <th class="lt">
                  <span>{{$t('legalTrad.quota')}}</span>
                </th>
                <th class="lt">
                  <span>{{$t('legalTrad.Unit')}}</span>
                </th>
                <th class="lt">
                  <span>{{$t('person.traded')}}/{{$t('deal.count')}}</span>
                </th>
                <th class="lt">
                  <span>{{$t('c2c.PaymentMethod')}} </span>
                </th>
                <th class="lt">
                  <span>{{$t('legalTrad.Region')}}</span>
                </th>
                <th class="lt">
                  <span>{{$t('memberCenter.statue')}}</span>
                </th>
                <th class="lt">
                  <span>{{$t('home.tradeOperation')}}</span>
                </th>
              </tr>
              </thead>
              <tbody>
              <template v-for="(item,i) in orderlist">
                <tr class="hex_table_body br"
                    :key="i">
                  <td class="lt">
                    <span>
                    {{item.id}}
                    </span>
                  </td>
                  <td>
                    <span>
                    {{global_get_local_time(item.createtime).format('YYYY-MM-DD HH:mm:ss')}}
                    </span>
                  </td>
                  <td class="lt direction">
                    <span :class="item.direction==1?'buy':'sell'">
                    {{item.direction==1?$t('memberCenter.buy'):$t('memberCenter.sell')}}
                    </span>
                  </td>
                  <td class="lt">
                    <span>
                    {{global_get_uppercase(item.currencyname)}}
                    </span>
                  </td>
                  <td class="lt">
                    <span>
                {{getminprice(item)}}
                    </span>
                  </td>
                  <td class="lt">
                    <span>

                   <span class="price-odd">{{getprice(item)+' '+ global_get_legaltype(item.legaltype).name}}</span>
                    </span>
                  </td>
                  <td class="lt">
                    <span>
                 {{item.transactionamount}}/{{item.enableamount}}
                    </span>
                  </td>
                  <td class="lt">
                    <div class="dealType">
                      <img class="pay_icon"
                           v-for="(payitem,payindex) in item.payconfiglist"
                           :key="payindex"
                           :src="payitem.icon"/>
                      <span v-if="item.payconfiglist.length<=0">--</span>
                    </div>
                  </td>
                  <td class="lt">
                    <span>
                 {{item.areaname?item.areaname:'--'}}
                    </span>
                  </td>
                  <td class="lt">
                    <span>
               {{item.orderstatus==0?$t('legalDeal.Normal'):$t('legalDeal.Unshelved')}}
                    </span>
                  </td>
                  <td class="lt">
                    <span @click="soldOut(item.id)"
                          :class="{'soldOut':!item.orderstatus}">
                 {{item.orderstatus==0?$t('legalDeal.Unshevling'):'--'}}
                    </span>
                  </td>
                </tr>
              </template>
              </tbody>
            </table>
          </div>
          <div class="anonymous" v-if="found">
            <div class="anonymous-pic">
              <img src="~/static/images/user/anonymous.svg" alt="">
            </div>
            <p class="anonymous-tip">{{$t('legalTrad.record')}}，{{$t('legalTrad.Go')}}
              <nuxt-link to="trade" tag="span">{{$t('legalTrad.Trade')}}</nuxt-link>
              {{$t('memberCenter.or')}}
              <span @click="createorder">{{$t('legalTrad.Create')}}</span>
            </p>
          </div>
          <div class="paging-source-deal" v-if="total>0">
            <el-pagination
              background
              @current-change="handChange"
              :page-size="10"
              popper-class="paging"
              layout="prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
      <!--取消订单-->
      <el-dialog
        top="0"
        custom-class="legal-order-warn"
        :visible.sync="dialogVisible">
        <div>
          <img class="icon" src="../static/images/trade/warning.svg" alt="">
          <p class="tip_h2">{{$t('c2c.operate')}}</p>
          <span class="legal-button"
                v-loading="dialogVisibleloading"
                @click="soldOutRequest">{{$t('c2c.ConfirmRemoval')}}</span>
        </div>
      </el-dialog>
    </div>
    <el-dialog
      top="0"
      :title="$t('c2c.Nickname')"
      custom-class="trade-order-nike"
      :visible.sync="createordernamestate">
      <div>
        <p class="tip">{{$t('c2c.changed')}}</p>
        <input class="nike"
               :class="{'error':nicknamestate}"
               type="text" v-model="nickname">
        <div style="text-align: center">
          <span class="create" @click="savenikename">{{$t('c2c.Save')}}</span>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      top="0"
      custom-class="trade-order-warn"
      :visible.sync="createorderstate">
      <div>
        <img class="icon" src="../static/images/trade/warning.svg" alt="">
        <p class="tip">{{$t('c2c.intermediate')}}</p>
        <span class="create" @click="toauthleavel">{{$t('c2c.Immediate')}}</span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: "legal-orders",
    data() {
      return {
        nickname: '',
        nicknameloading: false,
        nicknamestate: false,
        createordernamestate: false,
        createorderstate: false,
        selectcurrencystate: '',
        currencyoption: [],
        orderlistloading: false,
        orderlist: [],
        found: false,
        total: 0,
        dialogVisible: false,//弹窗状态
        soldOutId: '',
        searchmodel: {
          pageindex: 0,
          pagesize: 10,
          type: 1
        },
        dialogVisibleloading: false
      }
    },
    mounted() {
      this.getCurrency();
      this.getorderlist();
    },
    watch: {
      'nickname': function (val) {
        if (val && val.trim()) {
          this.nicknamestate = false
        }
      }
    },
    methods: {
      /*获取限额*/
      getminprice(item) {
        // return `${item.minprice} - ${item.maxprice} ${this.global_get_legaltype(item.legaltype).name}`
        return this.global_get_tofixed(item.minprice, 2) + ` - ` + this.global_get_tofixed(item.maxprice, 2) + ` ${this.global_get_legaltype(item.legaltype).name}`
        
      },
      /*获取单价*/
      getprice(item) {
        const toname = this.global_get_legaltype(item.legaltype).name
        let qua = this.$store.getters.get_exchange_rate_by_name(item.currencyname, toname)
        qua = parseFloat(qua) + parseFloat(this.$np.times(qua, item.premium))
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
      /*设置昵称*/
      savenikename() {
        if (!this.nickname) {
          this.nicknamestate = true
          return
        }
        if (this.nicknameloading) {
          return
        }
        this.nicknameloading = true
        this.$store.dispatch('user_user_nickname_save', {
          nickname: this.nickname
        })
          .then(({data}) => {
            if (data) {
              const info = this.global_refresh_user_info()
              info.then((fo) => {
                this.createordernamestate = false
                this.$store.commit('set_message', {type: 'ok', text: this.$t('c2c.NicknameSet')})
                this.nicknameloading = false
              })
            } else {
              this.nicknameloading = false
              this.$store.commit('set_message', {type: 'error', text: this.$t('c2c.NicknameFailed')})
            }
          })
      },
      toauthleavel() {
        this.$router.push('/person/authentication')
      },
      /*是否能下单*/
      createorder() {
        if (!this.$userinfo.uid) {
          this.$router.push('/login')
          return
        }
        if (this.$userinfo.securitylevel < 2) {
          this.createorderstate = true
          return
        }
        if (!this.$userinfo.nickname) {
          this.createordernamestate = true
          return
        }
        this.$router.push({path: '/trade/create'})
      },
      soldOut(id) {
        this.dialogVisible = true;
        this.soldOutId = id;
      },
      soldOutRequest() {//订单下架
        if (this.dialogVisibleloading) {
          return
        }
        this.dialogVisibleloading = true
        this.$store.dispatch('trading_c2c_goods_offline', {orderid: this.soldOutId})
          .then((res) => {
            if (res.code == '200') {
              let fliterData = [];
              this.orderlist.forEach((item) => {
                if (item.id != this.soldOutId) {
                  fliterData.push(item);
                }
              });
              this.orderlist = fliterData;
              this.total = fliterData.length;
              this.$store.commit('set_message', {type: 'ok', text: res.msg});
            }
            this.dialogVisibleloading = false
            this.dialogVisible = false;
            this.soldOutId = '';
          })
      },
      handChange(val) {
        this.getorderlist(val);
      },
      //获取币种列表
      getCurrency() {
        this.$store.dispatch('com_currency_getpagelist', {currencytype: 0}).then(({data}) => {
          if (data) {
            if (data.pagedata.length > 0) {
              this.currencyoption = data.pagedata;
              
            }
          }
        })
      },
      /*切换币种*/
      setselectcurrencystate(val) {
        this.total = 0;
        if (this.orderlistloading) {
          return
        }
        this.selectcurrencystate = val;
        this.getorderlist();
      },
      /*获取订单列表*/
      getorderlist(pageIndex) {
        const userinfo = this.$userinfo;
        if (!userinfo.uid) this.$router.push('/login');
        if (this.orderlistloading) {
          return
        }
        this.found = false;
        this.orderlist = [];
        this.orderlistloading = true;
        const newsearchmodel = Object.assign({}, this.searchmodel);
        if (this.selectcurrencystate) {
          const thiscurrency = this.currencyoption.find((item) => {
            return item.id == this.selectcurrencystate;
          });
          newsearchmodel.currencyid = thiscurrency.id;
          newsearchmodel.currencyname = thiscurrency.currencyname;
        }
        pageIndex ? newsearchmodel.pageindex = pageIndex : newsearchmodel.pageindex = 1;
        this.$store.dispatch('trading_c2c_market_pagedlist', newsearchmodel).then(({data}) => {
          if (data) {
            this.orderlist = data.pagedata;
            this.total = data.totalitemcount;
          }
          this.$nextTick(() => {
            this.orderlistloading = false;
            this.total > 0 ? this.found = false : this.found = true;
            this.total >= 10 ? this.total = this.total : this.total = 0;
          })
        })
      },
      
    }
  };

</script>

