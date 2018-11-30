<template>
  <div class="baseselect">
    <div @click='showdown' :class='["ipt_hover",inputStyle?"cl_333":"",ulShow?"hovers":""]'>
      <div class='choice'>{{selectVal?selectVal:$t('formMenu.select')}}</div>
      <span class="tip" v-show="remark">{{remark}}</span>
    </div>
    <div v-show='ulShow' class="skill">
      <div class="set" v-if="iswhitelistAddress">{{$t('patch.iswhitelistAddress')}}
        <nuxt-link to="/person/address/mention-site">{{$t('patch.set')}}</nuxt-link>
      </div>
      <div class='skill-ipt' @click='addMantionCion'>
        {{$t('wallet.addressManageAdd')}}
      </div>
      <ul v-loading="loading" class='por'>
        <li v-if="loading"></li>
        <li v-if='statusa'>{{$t("home.headDataNone")}}</li>
        <template v-if='!statusa'>
          <li v-for="(item , i) in getCurrencyList" :key="i">
            <div class='addressState clearfix' @click='changeVal(item)'>
              <p class="left">{{item.address}}</p>
              <span class="addressState_tip">{{item.remark}}</span>
            </div>
            <div class='delete' @click='deleteUppop(item,"deleteAddress")'></div>
          </li>
        </template>
      </ul>
    </div>
    <deleteAddressPop
      v-show="deleteAddressState"
      @closePopup="closePopup"
      @deleteAddress="deleteAddress"
      ref="popname"
    />
  </div>
</template>
<script>
  import popup from '@/components/security/popup-add-mantion-address'
  import deleteAddressPop from '@/components/security/popup-only-google'

  export default {
    name: 'hex-select',
    props: ['currency', 'mentionCoin'],//用户已有的地址，用户选择的币种
    components: {
      popup, deleteAddressPop
    },
    data() {
      return {
        iswhitelistAddress: false,
        loading: false,
        deleteAddressState: false,
        choiceCion: '',//用户选中的币种
        popupState: 0,//弹窗的状态
        data: '',
        ulShow: false, //下拉状态
        remark: '', //备注
        selectVal: '', //模拟select获取到option的值
        searchCoin: '', //搜索币种的input
        statusa: false, //没有搜到显示‘暂无改币种’的状态
        active: '',
        inputStyle: false,
        getCurrencyList: [],
        deleteId: {},
        isOpenList: false
      }
    },

    subscribe() {
      return {
        addAddress() {
          this.isOpenWhiteList();
        }
      }
    },
    mounted() {
      this.isOpenWhiteList();
    },
    methods: {
      isOpenWhiteList() {
        const _this = this;
        _this.loading = true;
        _this.$store.dispatch("user_withdraw_address_whitelist_check").then((res) => {
          if (res.code == '200') {
            _this.isOpenList = res.data;
            return _this.$store.dispatch('user_withdraw_address_search', {currencyid: _this.currency.id});
          }
        })
          .then(({data}) => {
            if (data) {
              if (_this.isOpenList) {
                let whiteList = [];
                data.pagedata.forEach((item) => {
                  if (item.iswhitelist) {
                    whiteList.push(item);
                  }
                });
                //开启白名单，但是提币地址不在白名单内 提示用户将该地址添加到白名单内
                this.iswhitelistAddress = whiteList.length > 0 ? false : true;
                _this.getCurrencyList = whiteList;
              } else {//没开白名单  展示当前币种的所有地址
                _this.getCurrencyList = data.pagedata;
              }
            }
            _this.loading = false;
          })
      },
      closePopup() {
        this.deleteAddressState = !this.deleteAddressState;
      },
      deleteUppop(val, m) {
        this.deleteId = val;
        this.deleteAddressState = !this.deleteAddressState;
        this.$refs.popname.ShowPopup(val, m);
      },
      addMantionCion() {
        this.$parent.showAddress()
      },
      deleteAddress(id) {
        this.$store.dispatch("user_withdraw_address_delete", {id: id})
          .then((res) => {
            if (res.data) {
              this.closePopup();
              const removecurrency = this.getCurrencyList.find((item) => {
                return item.id == id
              })
              if (removecurrency) {
                this.selectVal = ''
                this.remark = ''
                this.inputStyle = false
                this.$emit('address:removechange', removecurrency)
              }
              this.getCurrencyList = this.getCurrencyList.filter((item) => item.id != id);
              this.$store.commit('set_message', {type: 'ok', text: res.msg});
            }
          })
      },
      changeVal(val) {//选中给select赋值
        this.ulShow = false;
        this.selectVal = val.address
        this.remark = val.remark
        this.inputStyle = true;
        this.$emit('address:change', val)
      },
      showdown() {
        this.ulShow = !this.ulShow
      }
    }
  }

</script>
<style lang='less' scoped>
  @import "../../static/styles/color";

  .baseselect {
    position: relative;
    .ipt_hover {
      position: relative;
      width: 100%;
      height: 40px;
      padding: 0 10px;
      color: rgb(187, 187, 187);
      border: 1px solid #dddddd;
      cursor: pointer;
      background: white url('./../../static/images/security/an_select_down.png') no-repeat 97% 15px;
    }
    .tip {
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
    }
    .ipt_hover.cl_333 {
      color: #333;
    }
    .hovers {
      background: white url('./../../static/images/security/an_select_up.png') no-repeat 97% 15px;
    }
    .skill {
      position: absolute;
      width: 100%;
      background: white;
      box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, .2);
      z-index: 1;
      top: 41px;
      padding: 10px;
      .set{
        line-height: 28px;
        a {
          color: #6f8ff1;
        }
      }

      .skill-ipt {
        cursor: pointer;
        &:before {
          background: url('./../../static/images/user/icon_setting.png') no-repeat;
          content: '';
          display: inline-block;
          vertical-align: middle;
          width: 16px;
          height: 16px;
          background-size: cover;
        }
        box-sizing: border-box;
        text-align: center;
        line-height: 40px;
        color: @cl_link;
        font-size: 14px;
        border: 1px solid rgba(240, 239, 255, 1);
      }
      ul {
        max-height: 224px;
        overflow-y: scroll;
        margin-top: 5px;
        li {
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          position: relative;
          color: rgb(51, 51, 51);
          .addressState {
            padding: 0 10px;
            line-height: 40px;
            height: 40px;
            position: relative;
            margin: 5px 40px 5px 0;
            background-color: #F9F9FB;
            .addressState_tip {
              float: right;
              height: 20px;
              line-height: 20px;
              margin-right: 0;
              top: 50%;
              position: relative;
              margin-top: -10px;
              padding: 0 6px;
            }
          }
          .delete {
            width: 14px;
            background: url('./../../static/images/user/icon_delete.png') no-repeat center center;
            background-size: cover;
            height: 14px;
            position: absolute;
            right: 5px;
            top: 50%;
            transform: translateY(-50%);
          }
          .addressState:hover {
            background: rgba(240, 239, 247, 1);
          }
        }
      }
      ul::-webkit-scrollbar {
        width: 8px;
        height: 1px;
      }
      ul::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: rgba(144, 147, 153, .3);
      }
      ul::-webkit-scrollbar-track {
        border-radius: 5px;
      }
    }
  }

  .choice {
    height: 40px;
    line-height: 40px;
  }

  .ipt_hover span,
  .skill ul li span {
    font-size: 12px;
    color: @cl_link;
    padding: 2px 6px;
    margin-right: 10px;
    background: rgb(240, 239, 255);
  }

  .skill ul li span:last-child,
  span:last-child {
    background: rgba(220, 241, 225, 1);
    color: rgba(70, 176, 93, 1);
  }

</style>
