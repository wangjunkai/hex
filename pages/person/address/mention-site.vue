<style lang='less' scoped>
  @import "../../../static/styles/color";
  @import "../../../static/styles/person";
  @import "../../../static/styles/auth.less";

  .mention-site_tip {
    font-size: 18px;
    font-weight: bold;
    margin-right: 20px;
  }

  .mention-site_info {
    font-size: 14px;
  }

  .mention-site_info .btc {
    color: @cl_buy;
    font-size: 30px;
    font-weight: bold;
    margin-right: 5px;
  }

  .mention-site_info .cny {
    color: @cl_link;
    font-size: 30px;
    font-weight: bold;
    margin-right: 5px;
  }

  .mention-site_info .br {
    margin: 0 20px;
    border-right: 1px solid @cl_858;
    display: inline-block;
    height: 20px;
  }

  .mention-site_info_title {
    line-height: 36px;
    margin-bottom: 8px;
  }

  .mention-site_info_num {
    padding: 4px 0;
  }

  .mention-site_info_address_button {
    color: @cl_link;
    margin-top: 16px;
  }

  .mention-site-block {
    margin-top: 10px;
    background-color: @cl_fff;
  }

  .mention-site-block-title {
    padding: 18px 20px;
  }

  .mention-site-block-title .title_tip {
    font-size: 16px;
    font-weight: bold;
  }

  .hex_table_body .size0 {
    font-size: 0;
  }

  .hex_table_body .handle {
    color: @cl_link;
    font-size: 12px;
    margin-left: 30px;
  }

  .mention-site_address {
    font-size: 14px;
    width: 400px;
    display: inline-table;
    border-collapse: separate;
  }

  .mention-site_address input {
    height: 40px;
    line-height: 40px;
    border: 1px solid #DDDDDD;
    display: table-cell;
    width: 100%;
    padding: 5px 10px;
  }

  .mention-site_address .search-tip {
    display: table-cell;
    width: 80px;
    background-color: @cl_link;
    color: @cl_fff;
    border: 1px solid @cl_link;
    text-align: center;
  }

  .mention-site-block-search .search-tip::placeholder {
    color: @cl_bbb;
  }

  .mention-site_scan {
    display: inline-block;
  }

  .mention-site_scan span {
    line-height: 40px;
    height: 40px;
    margin-left: 10px;
    width: 100px;
    background-color: @cl_f0e;
    color: @cl_333;
    font-size: 14px;
    text-align: center;
    display: inline-block;
  }

  .mention-site_group {
    width: auto;
  }

  .mention-site_hint {
    padding: 10px;
    background-color: @cl_f9f;
    color: @cl_666;
    font-size: 12px;
    line-height: 24px;
    margin-top: 20px;
  }

  .mention-site_hint .title {
    color: @cl_999;
  }

  .mention-site_hint .tip {
    color: @cl_cd4;
    font-size: 14px;
    font-weight: 600;
  }

  .mention-site_hint .row {
    color: @cl_666;
  }

  .mention-site_button {
    line-height: 40px;
    background-color: @cl_ddd;
    color: @cl_bbb;
    font-size: 12px;
    text-align: center;
  }

  .mention-site_manage {
    margin-top: 15px;
  }

  .mention-site_manage .title {
    font-size: 12px;
    color: @cl_666;
    padding: 8px 0;
    border-bottom: 1px solid @cl_858_2;
  }

  .mention-site_manage_block {
    background-color: @cl_f9f;
    font-size: 14px;
    height: 140px;
    margin-top: 20px;
    padding: 10px;
    position: relative;
  }

  .mention-site_manage_block .name_tip {
    color: @cl_999;
  }

  .mention-site_manage_block .name {
    color: @cl_link;
    margin-left: 10px;
  }

  .mention-site_manage_block .address_code {
    margin-top: 20px;
    word-break: break-all;
    line-height: 20px;
    color: @cl_333;
  }

  .mention-site_manage_block .address_button {
    height: 30px;
    line-height: 30px;
    color: @cl_link;
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    font-size: 12px;
    background-color: @cl_f0e;
    cursor: pointer;
  }

  .mention-site_manage_block_add {
    border: 1px dashed;
    border-color: rgba(197, 195, 221, 1);
    font-size: 14px;
    color: @cl_858;
    text-align: center;
    background-color: @cl_fff;
  }

  .mention-site_manage_block_add .add_address .add-icon {
    display: block;
    margin-bottom: 10px;
  }

  .mention-site_manage_block_add .add_address .add-icon:before {
    content: '+';
    width: 30px;
    height: 30px;
    display: block;
    text-align: center;
    margin: auto;
    background: @cl_link;
    color: white;
    line-height: 30px;
    font-size: 20px;
    cursor: pointer;
  }

  .mention-site_manage_block_add .add_address {
    top: 50%;
    transform: translateY(-50%);
    position: relative;
  }

  .mention-site .person-block {
    min-height: 818px;
  }

  .white-list {
    margin-right: 10px;
  }

  .address-add {
    overflow: hidden;
  }

  .address-add li {
    float: left;
    width: 288px;
    margin-right: 15px;
  }

  .address-add li:nth-child(3n) {
    margin-right: 0px;
  }

  .el-select .el-input.is-focus .el-input__inner, .select_input.address .el-select-dropdown {
    border-radius: 0 !important;
  }

  .el-select.address .el-input.is-focus .el-input__inner {
    border-radius: 0;
  }

  .coinBtcTip {
    position: relative;
    /*display: inline-block;*/
    background: rgba(244, 246, 249, 1);
    line-height: 30px;
    padding: 0px 10px;
    color: rgba(135, 144, 161, 1);
    border-radius: 3px;
    top: 45px;
    left: 15px;
    max-width: 400px;
  }

  .coinBtcTip:before {
    content: '';
    display: inline-block;
    position: absolute;
    left: -5px;
    top: 7px;
    margin-left: -3px;
    width: 0;
    height: 0;
    border-top: 8px solid rgba(244, 246, 249, 1);
    border-top: 8px solid transparent;
    border-right: 8px solid rgba(244, 246, 249, 1);
    border-bottom: 8px solid transparent;

  }

</style>
<template>
  <div class="mention-site">
    <isopenWhiteList
      @closepopup='popups(0)'
      @confirm="confirm"
      v-show="whitepopupstate"
      ref="child"
    />
    <div class="person-block">
      <span class="person-block_icon wallet"></span>
      <div class="person-block_info mention-site_info">
        <p class="mention-site_info_title">
          <span class="mention-site_tip">{{$t("Waddress.manageAddress")}}</span>
        </p>
        <div class="clearfix flex">
          <div class="auth-content_group fl">
            <p class="title">{{$t("Waddress.selectCion")}}</p>
            <el-select
              filterable
              style="width:400px;"
              class="select_input address"
              popper-class="select_input_popper"
              v-model="coin"
              :popper-append-to-body="false"
              @change="addressInquire"
              :loading="loading"
              :loading-text="$t('home.headDataLoad')"
              :placeholder="$t('formMenu.select')">
              <el-option
                v-for="item in getCurrencyList"
                :key="item.currency.id"
                :label="global_get_uppercase(item.currency.currencyname)"
                :value="item.currency.currencyname+','+item.currency.id+','+item.assetsid+','+item.currency.istagrequired"
              >
              </el-option>
            </el-select>
          </div>
          <p v-if="coinBtcTip" class="coinBtcTip fl">{{$t('c2c.quarantine')}}</p>
        </div>
        <div class="mention-site_manage">
          <p class="title">{{$t("Waddress.addressManage")}}</p>
          <ul class="address-add">
            <li
              v-for="address in data"
              :key="address.id">
              <div class="mention-site_manage_block">
                <p class="clearfix">
                  <span class="left">
                    <span class="name_tip">{{$t("Waddress.nickname")}}</span>
                    <span class="name">{{address.remark}}</span>
                  </span>

                  <span class="right"
                        @click="deletepopup(address,'deleteAddress')">
                     <img src="~/static/images/user/icon_delete.svg" alt="">
                  </span>
                  <span class="right white-list" @click="popups(1,address)">
                  <!--<span class="right white-list">-->
                     <img v-if="address.iswhitelist"
                          src="~/static/images/security/white_list_check.svg"
                          alt="">
                     <img v-else
                          src="~/static/images/security/white_list.svg" alt="">
                  </span>
                </p>
                <p class="address_code">{{address.address}}</p>
                <p class="address_button" @click="toWithdraw">
                  {{$t("Waddress.mentionMoney")}}
                </p>
              </div>
            </li>
            <li>
              <div class="mention-site_manage_block mention-site_manage_block_add"
                   @click="popup(1)">
                <p class="add_address">
                  <span class="add-icon"></span>
                  <span class="tip">{{$t("wallet.addressManageAdd")}}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <addressselect
        v-if="popupState"
        @closePopup="popup"
        :currency='currency'
        @address="addressInquire"/>
      <popupstair
        v-show="deleteState"
        @closePopup="deletePopupState"
        @deleteAddress="deleteAddress"
        ref="popname"/>
    </div>

  </div>
</template>
<script>
  import coinSelect from '@/components/security/coin-select'
  import addressselect from '@/components/security/popup-add-mantion-address'
  import popupstair from '@/components/security/popup-only-google'
  import isopenWhiteList from '@/components/security/popup-public'

  export default {
    name: 'mention-site',
    components: {
      coinSelect,
      addressselect,
      popupstair,
      isopenWhiteList
    },
    data() {
      return {
        loading: false,
        coinBtcTip: false,
        coin: '',
        getCurrencyList: [],
        deleteId: {},
        deleteState: false,
        popupState: false,
        addressList: '',//用于分页
        data: '',//展示数据
        currency: {
          currencyname: '',
          id: '',
          page: "site",
          assetsid: '',
          istagrequired: false
        },
        editwhitelist: {},
        isGooglePopup: true,
        whitepopupstate: 0,
      }
    },
    mounted() {
      this.loading = true;
      this.getCion();
    },
    methods: {
      popups(val, address) {
        if (val) {
          if (this.$userinfo.isopengoogleverify) {
            this.$refs.child.isgooglepopup(this.isGooglePopup);
            this.editwhitelist = address;
            this.whitepopupstate = val;
          } else {
            this.$store.commit('set_message', {type: 'error', text: '请开启谷歌验证码'});
            this.$router.push('/person/security');
          }
        } else {
          this.whitepopupstate = 0;
        }
      },
      confirm(_this) {
        const _self = this;
        const _user = _self.$userinfo;
        const childThis = _this;
        var postData = {};
        if (_user.isopengoogleverify) {
          postData.googleverifycode = childThis.googleverifycode;
        }
        if (_user.isphoneauthed) {
          postData.smsverifycode = childThis.smsverifycode;
        }
        if (_user.isemailauthed) {
          postData.emailverifycode = childThis.emailverifycode;
        }
        postData.withdrawaddressid = _self.editwhitelist.id;
        postData.isopen = _self.editwhitelist.iswhitelist ? false : true;
        this.$store.dispatch("user_withdraw_address_whitelist_edit", postData).then((res) => {
          if (res.data) {
            _self.$refs.child.resetvalidateWhite();//将弹窗清空
            _self.$store.commit('set_message', {type: 'ok', text: res.msg});
            //更改状态后 刷新数据
            _self.whitepopupstate = !this.whitepopupstate;
            _self.addressInquire(this.currency.currencyname + ',' + this.currency.id + ',' + this.currency.assetsid + ',' + this.currency.istagrequired)
          }
          _self.$refs.child.clearTime();//清楚获取验证码的倒计时
          _self.$refs.child.clearstate();

        })
      },
      toWithdraw() {
        if (this.currency.assetsid != '1539675127412308215') {//cnyt 只有出售和购买
          this.$router.push({name: "person-wallet", params: {withdraw: this.currency.id}});
        }
      },
      getCion() {
        this.$store.dispatch('user_assets_get',
          {
            assetstype: 1,
            rows: 100
          }
        ).then(({data}) => {
          if (data) {
            this.getCurrencyList = data.filter(item => item.currency.currencyname != 'cnyt');
            this.loading = false;
          }
        })
      },
      deletePopupState() {
        this.deleteState = !this.deleteState;
      },
      addressInquire(val) {//地址查询
        let selectVal = val.split(',');
        this.currency.currencyname = selectVal[0];
        this.currency.id = selectVal[1];
        this.currency.assetsid = selectVal[2];
        if (selectVal[3] == 'true') {
          this.currency.istagrequired = true;
        } else {
          this.currency.istagrequired = false;
        }
        if (selectVal[0] == "btc") {
          this.coinBtcTip = true;
        } else {
          this.coinBtcTip = false;
        }
        this.$store.dispatch("user_withdraw_address_search",
          {currencyid: selectVal[1]}
        ).then((res) => {
          if (res.data) {
            this.addressList = res;
            this.data = res.data.pagedata;
          } else {
            this.data = [];
          }
        })
      }
      ,
      deletepopup(vid, m) {
        this.deleteId = vid;
        this.deleteState = !this.deleteState;
        this.$refs.popname.ShowPopup(vid, m);
      },
      deleteAddress(id) {
        this.$store.dispatch("user_withdraw_address_delete",
          {id: id}
        )
          .then((res) => {
            if (res.data) {
              this.deleteState = !this.deleteState;
              this.data = this.data.filter((item) => item.id != id);
              this.$store.commit('set_message',
                {type: 'ok', text: res.msg});
            }
          })
      },
      popup() {
        if (this.currency.currencyname) {
          this.popupState = !this.popupState;
        } else {
          this.$store.commit('set_message',
            {type: 'error', text: this.$t("Waddress.selectCion")}
          );
        }
      }
    }
  }
</script>

