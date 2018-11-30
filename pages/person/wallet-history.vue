<style lang='less' scoped>
  @import "../../static/styles/color";
  @import "../../static/styles/person";
  @import "../../static/styles/table";
  
  .balance_tip {
    font-size: 18px;
    font-weight: bold;
    margin-right: 20px;
  }
  
  .balance_info {
    font-size: 14px;
  }
  
  .balance_info .btc {
    color: @cl_buy;
    font-size: 30px;
    font-weight: bold;
    margin-right: 5px;
  }
  
  .balance_info .cny {
    color: @cl_link;
    font-size: 30px;
    font-weight: bold;
    margin-right: 5px;
  }
  
  .balance_info .br {
    margin: 0 20px;
    border-right: 1px solid @cl_858;
    display: inline-block;
    height: 20px;
  }
  
  .balance_info_title {
    line-height: 36px;
  }
  
  .balance_info_num {
    padding: 4px 0;
  }
  
  .balance_info_address_button {
    color: @cl_link;
    margin-top: 16px;
    cursor: pointer;
  }
  
  .balance-block {
    margin-top: 10px;
    background-color: @cl_fff;
  }
  
  .balance-block-title {
    padding: 18px 20px 8px 20px;
  }
  
  .balance-block-title .title_tip {
    font-size: 16px;
    font-weight: bold;
  }
  
  .balance-block-search {
    margin-left: 20px;
    font-size: 14px;
    width: 220px;
    display: inline-table;
    border-collapse: separate;
  }
  
  .balance-block-search input {
    height: 30px;
    line-height: 30px;
    border: 1px solid #DDDDDD;
    display: table-cell;
    width: 100%;
    padding: 5px 10px;
  }
  
  .balance-block-search .search-tip {
    display: table-cell;
    width: 60px;
    background-color: @cl_link;
    color: @cl_fff;
    border: 1px solid @cl_link;
    text-align: center;
  }
  
  .balance-block-search .search-tip::placeholder {
    color: @cl_bbb;
  }
  
  .hex_table_action {
    position: relative;
  }
  
  .hex_table_action .deal_buttons {
    position: absolute;
    color: @cl_link;
    font-size: 12px;
    padding: 5px 0;
    bottom: -35px;
    right: -5px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
    z-index: 1;
    background-color: #fff;
  }
  
  .hex_table_action .deal_buttons li {
    line-height: 32px;
    text-align: left;
    padding: 0 10px;
    cursor: pointer;
  }
  
  .hex_table_action .deal_buttons li:hover {
    background-color: @cl_f0e;
  }
  
  .person-block {
    padding-bottom: 16px;
  }
  
  .hex_table_row .hash_code_tip {
    display: inline-block;
    min-width: 400px;
    a {
      text-decoration: underline;
      color: #6f8ff1
    }
  }
  
  .hex_table_row .fee_tip {
    display: inline-block;
    min-width: 100px;
  }
  
  .hex_table_row .hash_code_tip,
  .hex_table_row .time_tip,
  .hex_table_row .fee_tip {
    color: @cl_333;
  }
  
  .hex_table_row_tip {
    width: 990px;
    top: 0;
    padding: 0 25px;
    border-bottom: 1px solid @cl_858_2;
  }
  
  .balance-block-title span.title_tip {
    padding: 0 12px;
    font-size: 14px;
    border: 1px solid #dddde4;
    height: 30px;
    cursor: pointer;
    line-height: 28px;
  }
  
  .balance-block-title span.title_tip.cur {
    color: white;
    background: @cl_link;
    border: 1px solid @cl_link;
  }
  
  .hex_table_row {
    height: 40px;
    line-height: 40px;
  }
  
  .lookover span {
    cursor: pointer;
  }
</style>
<template>
  <div class="balance">
    <div class="person-block">
      <span class="person-block_icon wallet"></span>
      <div class="person-block_info balance_info">
        <p class="balance_info_title">
          <span class="balance_tip">{{$t('wallet.allMention')}}</span>
        </p>
      </div>
    </div>
    <div class="balance-block">
      <div class="balance-block-title clearfix">
        <span class="title_tip left"
              :class="records==1?'cur':''"
              @click="getUserCoin(1)">{{$t('wallet.moneyRecord')}}</span>
        <span class="title_tip left"
              :class="records==2?'cur':''"
              @click="getUserCoin(2)">{{$t('wallet.mentionRecord')}}</span>
      </div>
      <template v-if="records==1">
        <table class="hex_table">
          <thead class="hex_table_header padding br">
          <tr>
            <th class="lt">
              <div>{{$t('wallet.chargeTime')}}</div>
            </th>
            <th class="lt">
              <div>ID</div>
            </th>
            <th class="lt">
              <div>{{$t('legalTrad.Currencies')}}</div>
            </th>
            <th class="lt">
              <div>{{$t('wallet.moneyRecord')}}</div>
            </th>
            <th class="rt">
              <div>{{$t('wallet.chargeCount')}}</div>
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
          <template v-for="(coins,index) in chargeRecord">
            <tr class="hex_table_body padding"
                :class="{'active':isVisibleDetailRow(coins.id)}"
                :key="index">
              <td class="fw lt">
                {{getRecordTime(coins)}}
              </td>
              <td class="lt">
                {{coins.id}}
              </td>
              <td class="lt">
                {{global_get_uppercase(coins.currencyname)}}
              </td>
              <td class="lt">
                {{coins.address}}
              </td>
              <td class="rt">
                {{coins.amount}}
              </td>
              <td class="rt" :class="{'success':coins.status==1}">
                {{global_get_charge_state(coins.status)}}
              </td>
              <td class="rt lookover">
                <span @click="showDetailRow(coins)">{{$t('wallet.lookOver')}}TXID</span>
              </td>
            </tr>
            <template v-if="isVisibleDetailRow(coins.id)">
              <tr class="hex_table_row" :key="`row-${index}`">
                <td colspan="6" class="por">
                  <div class="hex_table_row_tip poa">
                    TXID：
                    <span class="hash_code_tip"><a :href="`${coins.blockchainexplorer}${coins.moneyhashcode}`"
                                                   target="_blank">{{coins.moneyhashcode}}</a></span>
                    
                    {{$t('wallet.handlingTime')}}：<span class="time_tip">{{getRecordTime(coins)}}</span>
                  </div>
                </td>
              </tr>
            </template>
          </template>
          </tbody>
        </table>
        <div class="anonymous" v-if="found">
          <div class="anonymous-pic">
            <img src="~/static/images/user/anonymous.svg" alt="">
          </div>
          <nuxt-link tag="p" to="/deal/eth_btc" class="anonymous-tip">
            {{$t('legalTrad.record')}}，{{$t('legalTrad.Go')}}<span> {{$t('legalTrad.Trade')}}</span>
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
        <div class="loadingPic por" v-hex-loading="loading" v-if="loading"></div>
      </template>
      <template v-else>
        <table class="hex_table">
          <thead class="hex_table_header padding br">
          <tr>
            <th class="lt">
              <div>{{$t('wallet.mentionTime')}}</div>
            </th>
            <th class="lt">
              <div>ID</div>
            </th>
            <th class="lt">
              <div>{{$t('legalTrad.Currencies')}}</div>
            </th>
            <th class="lt">
              <div>{{$t('wallet.address')}}</div>
            </th>
            <th class="rt">
              <div>{{$t('wallet.mentionCount')}}</div>
            </th>
            <th class="rt">
              <div>{{$t('wallet.actual')}}</div>
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
          <template v-for="(coins,index) in mentionRecord">
            <tr class="hex_table_body padding"
                :class="{'active':isVisibleDetailRow(coins.id)}"
                :key="index">
              <td class="fw lt">
                {{getRecordTime(coins)}}
              </td>
              <td class="lt">
                {{coins.id}}
              </td>
              <td class="lt">
                {{global_get_uppercase(coins.currencyname)}}
              </td>
              <td class="lt">
                {{coins.address}}
              </td>
              <td class="rt">
                {{coins.amount}}
              </td>
              <td class="rt">
                {{coins.withdrawamountfact}}
              </td>
              <td class="rt" :class="{'success':coins.status==1}">
                {{global_get_mention_state(coins.status)}}
              </td>
              <td class="rt lookover">
                <span v-if="coins.status==3"
                      @click="upPop(coins)">{{$t('memberCenter.revoke')}}</span>
                <span v-else @click="showDetailRow(coins)">{{$t('wallet.lookOver')}}TXID</span>
              </td>
            </tr>
            <template v-if="isVisibleDetailRow(coins.id)">
              <tr class="hex_table_row" :key="`row-${index}`">
                <td colspan="6" class="por">
                  <div class="hex_table_row_tip poa">
                    TXID：
                    <span class="hash_code_tip">
                        <a :href="`${coins.blockchainexplorer}${coins.moneyhashcode}`" target="_blank">{{coins.moneyhashcode}}</a>
                      </span>
                    {{$t('wallet.serviceCharge')}}：<span class="fee_tip">{{coins.withdrawfee}}</span>
                    {{$t('wallet.handlingTime')}}：<span class="time_tip">{{getRecordTime(coins)}}</span>
                  </div>
                </td>
              </tr>
            </template>
          </template>
          </tbody>
        </table>
        <hex-deletepopup
          v-show="popupstate"
          @closePopup="closePopup"
          ref="popname"
          @deleteAddress="repealCoins"
        />
        <div class="anonymous" v-if="found">
          <div class="anonymous-pic">
            <img src="~/static/images/user/anonymous.svg" alt="">
          </div>
          <nuxt-link tag="p" to="/deal/eth_btc" class="anonymous-tip">
            {{$t('legalTrad.record')}}，{{$t('legalTrad.Go')}}<span> {{$t('legalTrad.Trade')}}</span>
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
        <div class="loadingPic por" v-hex-loading="loading" v-if="loading"></div>
      </template>
    </div>
  </div>
</template>
<script>
  import deletePopup from '@/components/security/popup-only-google'
  
  export default {
    name: 'articles',
    computed: {},
    components: {
      'hex-deletepopup': deletePopup
    },
    data() {
      return {
        loading: true,
        popupstate: false,//撤销弹窗
        chargeRecordStatus: true,
        mentionRecordStatus: true,
        records: '1',
        chargeRecord: [],
        mentionRecord: [],
        visibleDetailRows: [],
        chargeText: true,
        total: 0,
        found: false,
        page: {
          pageindex: 1,
          pagesize: 20,
        }
      }
    },
    mounted() {
      this.getUserCoin(1);
    },
    methods: {
      closePopup() {
        this.popupstate = !this.popupstate;
      },
      upPop(val) {
        this.popupstate = !this.popupstate;
        this.$refs.popname.ShowPopup(val, 'repeal');
      },
      repealCoins(id) {//提币撤销
        this.$store.dispatch("user_assets_withdraw_revoke", {withdrawid: id}).then(({data}) => {
          if (data) {
            this.popupstate = !this.popupstate;
            let fliterData = [];
            this.mentionRecord.forEach((item) => {
              if (item.id != id) {
                fliterData.push(item);
              }
            });
            this.mentionRecord = fliterData;
            this.total = fliterData.length;
            this.total ? this.found = false : this.found = true;
            this.$store.commit('set_message', {type: 'ok', text: res.msg})
          }
          this.$refs.popname.closeLoading();
        })
      },
      getRecordTime: function (coins) {
        return (coins.updatetime && coins.status == 1) ? this.global_get_local_time(coins.updatetime).format('YYYY-MM-DD HH:mm:ss') : '--'
      },
      isVisibleDetailRow(rowid) {
        return this.visibleDetailRows.indexOf(rowid) >= 0
      },
      handChange(val) {
        this.getUserCoin(this.records, val);
      },
      getUserCoin(val, pageIndex) {
        this.loading = true;
        this.records = val;
        this.found = false;
        this.mentionRecord = [];
        this.chargeRecord = [];
        this.total = 0;
        if (val == 1) {
          this.chargeRecordStatus = true;
          this.chargeText = true;
        } else {
          this.mentionRecordStatus = true;
          this.chargeText = false;
        }
        const postData = this.page;
        postData.type = val;
        pageIndex ? postData.pageindex = pageIndex : postData.pageindex = 1;
        this.$store.dispatch("user_assets_exchange_record", postData)
          .then(({data}) => {
            if (data) {
              if (val == 1) {
                this.total = data.totalitemcount;
                this.chargeRecord = data.pagedata;
                this.total ? this.found = false : this.found = true;
              } else {
                this.total = data.totalitemcount;
                this.mentionRecord = data.pagedata;
                this.total ? this.found = false : this.found = true;
              }
            } else {
              this.total = 0;
              this.found = true;
            }
            this.loading = false;
            this.chargeRecordStatus = false;
            this.mentionRecordStatus = false;
          })
      },
      showDetailRow(row) {
        if (!this.isVisibleDetailRow(row.id)) {
          this.visibleDetailRows.push(row.id)
        } else {
          this.visibleDetailRows.splice(this.visibleDetailRows.indexOf(row.id), 1);
        }
        this.$forceUpdate()
      },
    },
  }
</script>

