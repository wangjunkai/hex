<style lang='less' scoped>
  @import "../../static/styles/color";
  @import "../../static/styles/table";
  
  .trade {
    background-color: @cl_fff;
  }
  
  .trade-content {
    width: 1200px;
    min-width: 1200px;
    padding: 30px 0;
    margin: auto;
    table, thead, tbody, td, th {
      border: none !important;
    }
    table {
      tbody {
        tr {
          td {
            padding: 0;
          }
        }
      }
    }
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
      background-image: url("../../static/images/trade/tip-active.svg");
    }
    .trade-top_tip > i {
      display: inline-block;
      width: 16px;
      height: 32px;
      vertical-align: middle;
      background-repeat: no-repeat;
      background-size: 16px 16px;
      background-position: center;
      background-image: url("../../static/images/trade/tip.svg");
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
      height: 32px;
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
        background-image: url("../../static/images/trade/search-active.svg");
      }
      .input_icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: middle;
        background-repeat: no-repeat;
        background-image: url("../../static/images/trade/search.svg");
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
  @import "../../static/styles/color";
  @import "../../static/styles/transition";
  
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
    .button-buy.sell.islogin, .button-buy.buy.islogin {
      background: #bdbdbd;
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
      line-height: 80px;
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
        position: relative;
      }
      .photo:after {
        content: '';
        display: inline-block;
        width: 8px;
        position: absolute;
        height: 8px;
        border-radius: 50%;
        background-color: #DDDDDD;
        background-clip: content-box;
        border: 2px solid #ffffff;
        bottom: 0;
        right: 0;
      }
      .photo.online:after {
        background-color: #0ED12A;
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
        margin-bottom: 20px !important;
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
          background-image: url("../../static/images/trade/select.svg");
          vertical-align: middle;
          position: relative;
          top: -1px;
          margin-right: 10px;
        }
        .buy_protocol .checkbox.active {
          background-image: url("../../static/images/trade/select-active.svg");
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
  
  .buy-button.disabled {
    background: #d4d4d4 !important;
  }
  
  .paging-source-deal {
    padding: 10px 0;
    text-align: center;
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
        <div class="trade-sell-buttons">
          <span class="buttons_buy"
                :class="{'active':direction==-1}"
                @click="setdirection(-1)">{{$t('legalDeal.Buy')}}</span>
          <span class="buttons_sell"
                :class="{'active':direction==1}"
                @click="setdirection(1)">{{$t('legalDeal.Sell')}}</span>
        </div>
        <div class="trade-top clearfix">
          <ul class="trade-nav left clearfix">
            <li
              @click="setselectcurrencystate('')"
              :class="{'active':selectcurrencystate==''}">{{$t('legalTrad.Totalcurrencies')}}
            </li>
            <li
              :class="{'active':selectcurrencystate==item.id}"
              :key="item.id"
              @click="setselectcurrencystate(item.id)"
              v-for="(item) in currencyoption">
              {{global_get_uppercase(item.currencyname)}}
            </li>
          </ul>
          <div class="right clearfix">
            <div
              @mouseenter="showtip(true)"
              @mouseleave="showtip(false)"
              :class="{'active':tipstate}"
              class="trade-top_tip left">
              <i></i>
              <dl
                v-show="tipstate"
                @mouseenter="showtip(true)"
                @mouseleave="showtip(false)"
                class="tip_modal">
                <div class="row">
                  <dt></dt>
                  <dd>
                    {{$t('legalTrad.currencies')}}
                    <br>
                    {{$t('legalTrad.fee')}}
                  </dd>
                </div>
                <div class="row">
                  <dt></dt>
                  <dd>
                    {{$t('legalTrad.advertisement')}}
                  </dd>
                </div>
                <div class="row">
                  <dt></dt>
                  <dd>
                    {{$t('legalTrad.communication')}}
                  </dd>
                </div>
              </dl>
            </div>
            <div class="trade-entry-buttons left">
              <span class="buttons_create" @click="createorder"> {{$t('legalTrad.Create')}}</span>
              <nuxt-link v-if="!$userinfo.uid" to="/login" tab="span" class="buttons_manage">
                {{$t('legalTrad.Manage')}}
              </nuxt-link>
              <nuxt-link v-else to="/legal-orders" tab="span" class="buttons_manage">{{$t('legalTrad.Manage')}}
              </nuxt-link>
            </div>
            <div
              @click.stop="showsearch(true)"
              class="trade-search left">
              
              <div class="search-input">
                <div class="input_content">
                  <span class="block_tip"
                        :key="index"
                        v-for="(item,index) in copesearchcontent">
                    {{item.envalue&&lang!="zh_cn"?item.envalue:item.value}}
                  </span>
                </div>
                <i class="input_icon"></i>
              </div>
              <div
                v-show="searchstate"
                class="search-modal">
                <div class="search_group">
                  <span class="title">{{$t('formMenu.nation')}}</span>
                  <el-select class="content" v-model="searchmodel.countryid" :placeholder="$t('formMenu.select')">
                    <el-option
                      v-for="(item,index) in areaoption"
                      :key="index"
                      :label="item.name"
                      :value="item.countryid">
                    </el-option>
                  </el-select>
                </div>
                <div class="search_group">
                  <span class="title">{{$t('legalTrad.Fiat')}}</span>
                  <el-select class="content" v-model="searchmodel.legaltype" :placeholder="$t('formMenu.select')">
                    <el-option
                      v-for="item in $data.$legaltype_option"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="search_group">
                  <span class="title">{{$t('legalTrad.Paymentmethod')}}</span>
                  <el-select class="content" v-model="searchmodel.paytype" :placeholder="$t('formMenu.select')">
                    <el-option :label="$t('legalTrad.Totalmethods')" value=""></el-option>
                    <el-option
                      v-for="item in paytypeoption"
                      :key="item.typeid"
                      :label="item.typename"
                      :value="item.typeid">
                    </el-option>
                  </el-select>
                </div>
                <div class="button_group right">
                  <span class="cancel" @click.stop="showsearch(false)">{{$t('legalTrad.Cancel')}}</span>
                  <span class="search" @click.stop="search">{{$t('legalTrad.Search')}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-hex-loading="orderlistloading"
          class="trade-table hex-flex por">
          <div class="hex-flex_auto">
            <table
              class="hex_table">
              <thead class="hex_table_header">
              <tr>
                <th class="lt" width="40"></th>
                <th class="lt">
                  <span>{{$t('legalTrad.User')}}</span>
                </th>
                <th class="lt" width="200">
                  <span>{{$t('legalTrad.Unit')}}</span>
                </th>
                <th class="lt" width="150">
                  <span>{{$t('legalTrad.Quantity')}}</span>
                </th>
                <th class="lt" width="100">
                  <span>{{$t('legalTrad.Currencies')}}</span>
                </th>
                <th class="lt">
                  <span>{{$t('legalTrad.quota')}}</span>
                </th>
                
                <th class="lt" width="200">
                  <span>{{$t('c2c.PaymentMethod')}}</span>
                </th>
                <th class="ct" width="80">
                  <span>{{$t('home.tradeOperation')}}</span>
                </th>
              </tr>
              </thead>
              <tbody>
              <template v-for="(item,i) in orderlist">
                <tr class="hex_table_body br"
                    :key="`body-${i}`">
                  <td class="fw">
                    <div>
                      <span class="photo"
                            :class="{'online':item.online==1}"
                            :style="{'background-color':global_get_random_color(item.userid?item.userid.substring(item.userid.length-1):0)}">
                        {{getname(item.nikename)}}
                      </span>
                    </div>
                  </td>
                  <td class="fw">
                    <div class="nikename_group">
                      <p class="user">{{item.nikename}}</p>
                      <p class="comment">{{$t('home.tradDeal')}}{{item.tradenum}}
                        {{$t('legalTrad.Highpraise')}}{{item.goodcomment}}
                        {{$t('legalTrad.comments')}}{{item.badcomment}}</p>
                    </div>
                  </td>
                  <td class="lt">
                    <span class="price-odd">{{getprice(item)+' '+ global_get_legaltype(item.legaltype).name}}</span>
                  </td>
                  <td class="lt">
                    <span>{{global_get_tofixed(item.enableamount,c2cDecimal(item.currencyname))}}</span>
                  </td>
                  <td class="lt">
                    <span>{{global_get_uppercase(item.currencyname)}}</span>
                  </td>
                  <td class="lt">
                    <span>{{getminprice(item)}}</span>
                  </td>
                  
                  <td class="lt">
                    <div>
                      <img
                        class="pay_icon"
                        v-for="(payitem,payindex) in item.payconfiglist"
                        :key="payindex"
                        :src="payitem.icon"/>
                      <span v-if="item.payconfiglist.length<=0">--</span>
                    </div>
                  </td>
                  <td class="rt">
                  <span class="button-buy"
                        v-if="!iserrororder(item)"
                        :class="{'buy':direction==-1,'sell':direction==1}"
                        @click="showDetailRow(item.id)">{{direction==-1?$t('legalTrad.Buy'):$t('legalTrad.Sell')}}</span>
                    <span v-else
                          class="button-buy button-buy_error">
                    {{direction==-1?$t('legalDeal.Buy'):$t('legalDeal.Sell')}}
                  </span>
                  </td>
                </tr>
                <template v-if="isVisibleDetailRow(item.id)">
                  <hex-trdeinfo
                    v-if="direction==-1"
                    :item="item"
                    :key="`body2-${i}`"></hex-trdeinfo>
                  <hex-trdeinfo-sell
                    v-if="direction==1"
                    :item="item"
                    :paytypelist="getownpaytype"
                    :key="`body2-${i}`"></hex-trdeinfo-sell>
                </template>
              </template>
              </tbody>
            </table>
          </div>
          <div class="anonymous" v-if="found">
            <div class="anonymous-pic">
              <img src="~/static/images/user/anonymous.svg" alt="">
            </div>
            <!--<nuxt-link tag="p" to="/trade" class="anonymous-tip">-->
            <!--{{$t('legalTrad.record')}}，{{$t('legalTrad.Go')}}-->
            <!--<span>{{$t('legalTrad.Trade')}}</span>-->
            <!--{{$t('memberCenter.or')}}-->
            <!--<span> {{$t('legalTrad.Create')}}</span>-->
            <!--</nuxt-link>-->
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
      <el-dialog
        top="0"
        custom-class="trade-order-warn"
        :visible.sync="createorderstate">
        <div>
          <img class="icon" src="../../static/images/trade/warning.svg" alt="">
          <p class="tip">{{$t('c2c.intermediate')}}</p>
          <span class="create" @click="toauthleavel">{{$t('c2c.Immediate')}}</span>
        </div>
      </el-dialog>
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
    </div>
  </div>
</template>
<script>
  import trdeinfo from '@/components/legal/tradeinfo'
  import trdeinfosell from '@/components/legal/tradeinfosell'
  
  export default {
    name: "trade",
    components: {
      'hex-trdeinfo': trdeinfo,
      'hex-trdeinfo-sell': trdeinfosell
    },
    computed: {
      getownpaytype: function () {
        let ary = []
        this.paytypeoption.forEach((item) => {
          item.payconfig && ary.push(item)
        })
        return ary
      },
      searchcontent: function () {
        let ary = []
        const contry = this.areaoption.find((item) => {
          return item.countryid == this.searchmodel.countryid
        })
        contry && ary.push({
          value: contry.name,
          envalue: contry.engname
        })
        const legaltype = this.global_get_legaltype(this.searchmodel.legaltype)
        legaltype && ary.push({
          value: legaltype.label,
          envalue: this.$t('legalTrad.RMB') + " " + legaltype.name
        })
        const paytype = this.paytypeoption.find((item) => {
          return item.typeid == this.searchmodel.paytype
        })
        ary.push({
          value: paytype ? paytype.typename : this.$t('legalTrad.Totalmethods')
        })
        return ary
      }
    },
    data() {
      return {
        /*购买出售*/
        found: false,
        total: 0,
        direction: -1,
        nickname: '',
        /*选择的币种*/
        selectcurrencystate: '',
        /*筛选完成后选择内容*/
        copesearchcontent: [],
        /*币种列表*/
        currencyoption: [],
        searchstate: false,
        searchstatetimer: null,
        tipstatetimer: null,
        tipstate: false,
        ischecked: true,
        createorderstate: false,
        createordernamestate: false,
        nicknamestate: false,
        nicknameloading: false,
        orderlistloading: false,
        visibleDetailRows: [],
        orderlist: [],
        searchmodel: {},
        areaoption: [],
        paytypeoption: [],
        lang: this.$store.state.hex_lang.locale
      };
    },
    watch: {
      'nickname': function (val) {
        if (val && val.trim()) {
          this.nicknamestate = false
        }
      },
      '$store.state.hex_lang.locale': function (val) {
        this.lang = val;
      }
    },
    created() {
      this.searchmodel.legaltype = this.$data.$legaltype_option[0].value
      const direction = this.$route.query.direction ? this.$route.query.direction : -1
      this.setdirection(direction);
      this.changeselectcontent()
      
      /*获取收款账号*/
      this.$store.dispatch('user_user_payments_getlist').then(({data}) => {
        if (data) {
          this.paytypeoption = data
        }
      })
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
      /*判断是否是异常订单*/
      iserrororder(item) {
        if (item.minprice) {
          const price = this.$store.getters.get_exchange_torate(item.currencyname, item.enableamount, this.global_get_legaltype(item.legaltype).name)
          return item.minprice > parseFloat(price)
        }
        return false
      },
      /*切换买入卖出*/
      setdirection(val) {
        this.total = 0;
        if (this.orderlistloading) {
          return
        }
        this.direction = val
        this.initgetorderlist()
      },
      /*切换币种*/
      setselectcurrencystate(val) {
        this.total = 0;
        if (this.orderlistloading) {
          return
        }
        this.selectcurrencystate = val
        this.initgetorderlist()
      },
      initgetorderlist() {
        this.searchmodel.pageindex = 0
        this.visibleDetailRows = []
        this.getorderlist()
      },
      /*获取付款方式字符串*/
      getpaytypestring(item) {
        let str = []
        if (!item.payconfiglist) {
          str = ['--']
        } else {
          item.payconfiglist.forEach((i) => {
            this.lang == 'zh_cn' ? str.push(i.typename) : str.push(i.engtypename);
          })
        }
        return str.join('、')
      },
      getarea(item) {
        const area = this.areaoption.find((i) => {
          return i.countryid == item.countryid
        })
        return area ? `${area.engname} ${area.name}` : '--'
      },
      /*获取限额*/
      getminprice(item) {
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
      /*获取截取的昵称*/
      getname(val) {
        return val ? val.substring(0, 1) : '--'
      },
      /*搜索*/
      search() {
        this.changeselectcontent()
      },
      /*获取订单列表*/
      getorderlist(pageIndex) {
        if (this.orderlistloading) {
          return
        }
        this.found = false;
        this.orderlist = [];
        this.orderlistloading = true;
        const newsearchmodel = Object.assign({}, this.searchmodel);
        if (this.selectcurrencystate) {
          const thiscurrency = this.currencyoption.find((item) => {
            return item.id == this.selectcurrencystate
          })
          newsearchmodel.currencyid = thiscurrency.id;
          newsearchmodel.currencyname = thiscurrency.currencyname
        }
        newsearchmodel.areacode = newsearchmodel.countryid
        newsearchmodel.direction = this.direction;
        delete newsearchmodel.countryid
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
      handChange(val) {
        this.getorderlist(val);
      },
      changeselectcontent() {
        this.copesearchcontent = this.searchcontent;
        this.getorderlist()
        this.showsearch(false)
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
      
      toauthleavel() {
        this.$router.push('/person/authentication')
      },
      showsearch(e) {
        this.searchstate = e
      },
      showtip(e) {
        this.tipstatetimer && clearTimeout(this.tipstatetimer)
        if (!e) {
          this.tipstatetimer = setTimeout(() => {
            this.tipstate = e
          }, 300)
        } else {
          this.tipstate = e
        }
      },
      isVisibleDetailRow(id) {
        return this.visibleDetailRows.indexOf(id) >= 0
      },
      showDetailRow(id) {
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
        if (!this.isVisibleDetailRow(id)) {
          this.visibleDetailRows = []
          this.visibleDetailRows.push(id)
        } else {
          this.visibleDetailRows.splice(this.visibleDetailRows.indexOf(id), 1);
        }
        this.$forceUpdate()
      },
      /*获取订单*/
      getorderdetail(orderid) {
        const _self = this
        const im = this._data.$im
        return this.$store.dispatch('trading_c2c_order_pagedlist', {orderid: orderid})
          .then(({data}) => {
            if (data && data.pagedata.length > 0) {
              return data.pagedata[0]
            }
          })
          .then((orderdata) => {
            im.logininfo.identifier = _self.$userinfo.uid
            im.logininfo.userSig = _self.$store.state.hex_server_tencentim_sign.value
            /*登录im 并 发送 创建成功订单消息*/
            return im.login()
              .then(
                (resp) => {
                  return orderdata
                }
              )
          })
          .then((orderdata) => {
            if (!orderdata) {
              return
            }
            let msgobj = {
              message: '',
              desc: '',
              ext: '0' //订单的状态（0 为创建订单成功未支付）
            }
            im.friendid = orderdata.type < 0 ? orderdata.userid : orderdata.orderuserid
            return im.sendmessage(msgobj)
              .then(
                ({resp, msg}) => {
                  return true
                }
              )
          })
      }
    },
    async fetch({store, params}) {
      /*获取腾讯 im sign*/
      if(store.state.hex_uid.value){
        const tencentim_sign = await store.dispatch('trading_c2c_tencentim_sig_get')
        const _sign = tencentim_sign.data ? tencentim_sign.data : ''
        if (_sign) {
          store.commit('set_server_tencentim_sign', _sign)
        }
      }
    },
    async asyncData({store, params}) {
      let searchmodel = {
        countryid: '',
        paytype: '',
        legaltype: '',
        direction: 1,
        pageindex: 0,
        pagesize: 10,
      }
      /*过去国家列表*/
      const country = await store.dispatch('com_country_getlist', {c2cmarket: 1})
      const countrymodel = country.data ? {
        areaoption: country.data,
        searchmodel: Object.assign(searchmodel, {
          countryid: country.data[0].countryid
        })
      } : {}
      /*或许场外交易币种列表*/
      const assets = await store.dispatch('com_currency_getpagelist', {currencytype: 0})
      const assetsmodel = assets.data.pagedata.length > 0 ? {
        currencyoption: assets.data.pagedata,
        selectcurrencystate: assets.data.pagedata[0].id
      } : {}
      
      return Object.assign({}, countrymodel, assetsmodel)
    },
    mounted() {
      document.addEventListener('click', () => {
        this.searchstate = false
      })
    }
  }
</script>

