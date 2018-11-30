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
    width: 155px;
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

  .ordertab span {
    font-size: 14px;
    padding-bottom: 3px;
    cursor: pointer;
  }

  .ordertab span.entrust {
    margin-right: 20px;
  }

  .ordertab span.cur {
    color: rgba(40, 149, 251, 1);
    border-bottom: 2px solid rgba(40, 149, 251, 1);
  }

  .person-block .person-block_icon.wallet {
    background: url("../../static/images/user/exchange_icon.svg");
  }

  .search {
    background: @cl_link;
    padding: 5px 16px;
    display: inline-table;
    color: white;
    font-size: 14px;
  }

  .hex_table {
    border-top: 1px solid #dbdaea;
  }

  .filter-information {
    padding: 11px 20px;
  }

  .loadingPic {
    width: 100%;
    top: 0;
    background: white;
  }

  .near {
    color: #EF2E5A;
  }
</style>
<template>
  <div class="traded">
    <div class="person-block">
      <span class="person-block_icon wallet"></span>
      <div class="person-block_info clearfix">
        <p class="traded_info_title left">
          <span class="traded_tip">{{$t('manage.transaction')}}</span>
        </p>
      </div>
    </div>
    <div class="traded-block">
      <div class="filter-information">
        <div class="ordertab traded-block-search">
          <hex-select ref="stetus"
                      :type="$i18n.t('manage.all')"
                      :order="dealstate"
                      :market="dealstatetext"
                      @searchData="searchData"
                      @change="change"
                      @clearCurrentState="clearCurrentState"/>
        </div>
        <div class="ordertab traded-block-search">
          <hex-select ref="financial"
                      :type="$i18n.t('legalTrad.Currencies')"
                      :order="financial"
                      :market="financialtext"
                      @searchData="searchData"
                      @change="change"
                      @clearCurrentState="clearCurrentState"/>
        </div>

        <div class="ordertab traded-block-search">
          <hex-select ref="cycleend"
                      :type="$i18n.t('manage.cycle')"
                      :order="cycleend"
                      :market="cycletext"
                      @searchData="searchData"
                      @change="change"
                      @clearCurrentState="clearCurrentState"/>
        </div>
        <div class=" search" @click="getpagelist(0)">
          {{$t('wallet.inquire')}}
        </div>
      </div>
      <div class="por">
        <table class="hex_table">
          <thead class="hex_table_header padding br">
          <tr>
            <th class="lt">
              {{$t('manage.Financialname')}}
            <th class="lt">
              <div>{{$t('legalTrad.Currencies')}}</div>
            </th>
            <th class="lt">
              {{$t('manage.Purchase')}}
            </th>
            <th class="lt">
              {{$t('manage.Fcycle')}}
            </th>
            <th class="lt">
              {{$t('manage.Annualized')}}
            <th class="lt">
              {{$t('manage.Expected')}}
            </th>
            <th class="lt">
              {{$t('manage.Actual')}}
            </th>
            <th class="lt">
              {{$t('manage.Purchasetime')}}
            </th>
            <th class="lt">
              {{$t('manage.Interest')}}
            </th>
            <th class="lt">
              {{$t('manage.Unlocktime')}}
            </th>
            <th class="lt">
              {{$t('manage.Loantime')}}
            </th>
            <th class="lt">
              {{$t('memberCenter.statue')}}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr class="hex_table_body padding"
              v-for="item in dataList"
              :key="item.id">
            <td class="lt" v-if="item.productinfo.pronames">
            {{lang=='en_us'?item.productinfo.pronames.en_us:item.productinfo.pronames.zh_cn}}
          </td>
            <td class="lt" v-else>
              {{item.productinfo.name}}
            </td>
            <td class="lt">
              {{global_get_uppercase(item.productinfo.currencyname)}}
            </td>
            <td class="lt">
              {{item.amount}}
            </td>
            <td class="lt">
              {{item.productinfo.cycle}}{{$t('manage.Day')}}
            </td>
            <td class="lt near">
              {{yearlyrate(item.productinfo.yearlyrate)}}%
            </td>
            <td class="lt">
              {{item.expectaccrual}}
            </td>
            <td class="lt">
              {{item.realaccrual}}
            </td>
            <td class="lt">
              {{(item.createtime).slice(0,10)}}
            </td>
            <td class="lt">
              {{(global_get_local_time(item.productinfo.startaccrualtime).format("YYYY-MM-DD HH:mm:ss")).slice(0,10)}}
            </td>
            <td class="lt">
              {{(global_get_local_time(item.productinfo.statementtime).format("YYYY-MM-DD HH:mm:ss")).slice(0,10)}}
            </td>
            <td class="lt">
              {{(global_get_local_time(item.productinfo.loantime).format("YYYY-MM-DD HH:mm:ss")).slice(0,10)}}
            </td>
            <td class="lt">
              {{getorderState(item.orderstatus)}}
            </td>
          </tr>
          </tbody>
        </table>
        <div class="anonymous" v-if="found">
          <div class="anonymous-pic">
            <img src="~/static/images/user/anonymous.svg" alt="">
          </div>
          <p class="anonymous-tip">
            {{$t('legalTrad.record')}}
          </p>
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
        <div class="loadingPic poa" v-hex-loading="loading" v-if="loading"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import select from '@/components/security/deal_select'

  export default {
    name: 'financial-deal',
    components: {
      "hex-select": select,
    },
    computed: {

      cycleend: function () {//周期
        return [
          {
            id: 30,
            value: '0~30' + this.$t('manage.Day'),
            type: 'cycleend'//小于等于x天数
          },
          {
            id: 60,
            value: '30~60' + this.$t('manage.Day'),
            type: 'cycleend'
          },
          {
            id: 90,
            value: '60~90' + this.$t('manage.Day'),
            type: 'cycleend'
          },
          {
            id: 180,
            value: '90~180' + this.$t('manage.Day'),
            type: 'cycleend'
          },
          {
            id: 181,
            value: '180' + this.$t('manage.Moredays'),
            type: 'cycleend'
          }
        ]
      },
      dealstate: function () {//状态
        return [
          {
            id: -1,
            value: this.$t('manage.all'),
            type: 'status'
          },
          {
            id: 0,
            value: this.$t('manage.placed'),
            type: 'status'
          },
          {
            id: 1,
            value: this.$t('manage.force'),
            type: 'status'
          },
          {
            id: 2,
            value: this.$t('manage.released'),
            type: 'status'
          },
          {
            id: 3,
            value: this.$t('manage.refunded'),
            type: 'status'
          },
        ]
      }
    },
    watch: {
      '$store.state.hex_lang.locale': function (val) {
        this.lang = val;
      }
    },
    data() {
      return {
        lang: this.$store.state.hex_lang.locale,
        found: false,
        total: 0,
        loading: false,
        financialtext: "financial",//币种
        cycletext: "cycleend",//周期
        dealstatetext: 'status',//状态
        searchParam: {},
        dataList: [],
        postData: {
          pageindex: 1,
          pagesize: 20,
        },
        financial: []
      }
    },
    mounted() {
      this.loading = true;
      this.getpagelist(0);
    },
    methods: {
      getorderState(n) {
        let s;
        switch (n) {
          case 0:
            s = this.$t('manage.place');
            break;
          case 1:
            s = this.$t('manage.force');
            break;
          case 2:
            s = this.$t('manage.released');
            break;
          case 3:
            s = this.$t('legalDeal.Cancelled');
            break;
        }
        return s;
      },
      yearlyrate(val) {
        let rate = val * 100;
        return rate.toFixed(2);
      },
      handChange(val) {
        this.getpagelist(val);
      },

      change(val) {
        const _self = this;
        switch (val) {
          case 'financial':
            _self.$refs.stetus.changeBack();
            _self.$refs.cycleend.changeBack();
            break;
          case 'status':
            _self.$refs.cycleend.changeBack();
            _self.$refs.financial.changeBack();
            break;
          case 'cycleend':
            _self.$refs.financial.changeBack();
            _self.$refs.stetus.changeBack();
            break;
        }
      },
      searchData(val) {//用于存子组件传过来数据
        this.searchParam[val.type] = val;
      },
      clearCurrentState(id) {
        this.searchParam[id] = {};
      },

      getpagelist(pageIndex) {
        const _this = this;
        _this.loading = true;
        _this.dataList = [];
        _this.$refs.financial.changeBack();
        _this.$refs.stetus.changeBack();
        _this.$refs.cycleend.changeBack();
        let serachPost = {};
        for (let k  in _this.searchParam) {
          if (Object.getOwnPropertyNames(_this.searchParam[k]).length > 0 && _this.searchParam[k].id != -1) {
            if (_this.searchParam[k].type == 'financial') {
              serachPost['currencyid'] = _this.searchParam[k].id;
            } else {
              serachPost[_this.searchParam[k].type] = _this.searchParam[k].id;
            }
          } else {
            if (_this.searchParam[k].id == 0) {
              serachPost[_this.searchParam[k].type] = 0;
            } else {
              delete serachPost[k];
            }
          }
        }
        switch (serachPost.cycleend) {
          case 30:
            serachPost.cyclestart = 0;
            break;
          case 60:
            serachPost.cyclestart = 30;
            break;
          case 90:
            serachPost.cyclestart = 60;
            break;
          case 180:
            serachPost.cyclestart = 90;
            break;
          case 181:
            serachPost.cyclestart = 180;//cyclestart:大于等于x天数
            delete serachPost.cycleend;//cycleend:小于等于x天数
            break;
        }
        pageIndex ? this.postData.pageindex = pageIndex : this.postData.pageindex = 1;
        let serachOrder = Object.assign({}, this.postData, serachPost);
        this.$store.dispatch('finance_user_order_getlist', serachOrder).then(({data}) => {
          console.log(data)
          if (data && data.pagedata.length > 0) {
            this.dataList = data.pagedata;
            this.total = data.totalitemcount >= 20 ? data.totalitemcount : 0;//20条内部不显示分页
            this.found = false;
          } else {
            this.dataList = [];
            this.found = true;
          }
          this.loading = false;
        })
      }
    }
  }
</script>

