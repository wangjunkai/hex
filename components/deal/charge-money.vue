<style lang='less' scoped>
  @import "../../static/styles/color";
  
  .charge-money_tip {
    font-size: 18px;
    font-weight: bold;
    margin-right: 20px;
  }
  
  .charge-money_info {
    font-size: 14px;
    text-align: left;
    padding: 20px;
    box-shadow: 0 1px 0 0 rgba(133, 131, 172, 0.2);
    color: @cl_666;
    position: relative;
  }
  
  .charge-money_info .title {
    margin-bottom: 7px;
    font-size: 12px;
  }
  
  .charge-money_info .btc {
    color: @cl_buy;
    font-size: 30px;
    font-weight: bold;
    margin-right: 5px;
  }
  
  .charge-money_info .cny {
    color: @cl_link;
    font-size: 30px;
    font-weight: bold;
    margin-right: 5px;
  }
  
  .charge-money_info .br {
    margin: 0 20px;
    border-right: 1px solid @cl_858;
    display: inline-block;
    height: 20px;
  }
  
  .charge-money_info_title {
    line-height: 36px;
    margin-bottom: 8px;
  }
  
  .charge-money_info_num {
    padding: 4px 0;
  }
  
  .charge-money_info_address_button {
    color: @cl_link;
    margin-top: 16px;
  }
  
  .charge-money-block {
    margin-top: 10px;
    background-color: @cl_fff;
  }
  
  .charge-money-block-title {
    padding: 18px 20px;
  }
  
  .charge-money-block-title .title_tip {
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
  
  .charge-money_address {
    font-size: 14px;
    width: 450px;
    position: relative;
  }
  
  .charge-money_address input {
    height: 40px;
    line-height: 40px;
    border: 1px solid #DDDDDD;
    width: 100%;
    padding: 5px 90px 5px 10px;
  }
  
  .charge-money_address .search-tip {
    width: 80px;
    background-color: @cl_link;
    color: @cl_fff;
    border: 1px solid @cl_link;
    text-align: center;
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
    line-height: 40px;
    height: 40px;
  }
  
  .charge-money-block-search .search-tip::placeholder {
    color: @cl_bbb;
  }
  
  .charge-money_scan {
    display: inline-block;
  }
  
  .charge-money_scan span {
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
  
  .charge-money_group {
    width: auto;
  }
  
  .charge-money_hint {
    padding: 10px;
    background-color: @cl_f9f;
    color: @cl_666;
    font-size: 12px;
    line-height: 24px;
    margin-top: 20px;
  }
  
  .charge-money_hint .title {
    color: @cl_999;
  }
  
  .charge-money_info .title.tag {
    margin-top: 20px;
  }
  
  .charge-money_hint .tip {
    color: @cl_cd4;
    font-size: 14px;
    font-weight: 600;
  }
  
  .charge-money_hint .row {
    color: @cl_666;
  }
  
  .charge-money_follow {
    font-size: 12px;
    margin-top: 20px;
  }
  
  .charge-money_follow .charge-money_follow_tip {
    color: @cl_link;
    cursor: pointer;
  }
  
  .charge-money_address input[readonly] {
    background-color: @cl_f0f;
    color: @cl_000;
  }
  
  .charge-money_scan .code {
    width: 140px;
    height: 140px;
    position: absolute;
    right: -160px;
    top: 0;
    border: 1px solid #dddddd;
    background: white;
  }
  
  .charge-money_scan .code:before {
    content: '';
    position: absolute;
    top: 13px;
    left: -4px;
    z-index: 3;
    border: 1px solid #ccc;
    border-bottom: 0 none;
    border-right: 0 none;
    width: 8px;
    height: 8px;
    transform: rotate(-50deg);
    box-sizing: border-box;
    background: #fff;
  }
  
  .charge-money_scan .code.tag {
    bottom: -20px;
    top: inherit;
  }
  
  .charge-money_scan .code.tag:before {
    content: '';
    position: absolute;
    top: 95px;
    left: -4px;
    z-index: 3;
    border: 1px solid #ccc;
    border-bottom: 0 none;
    border-right: 0 none;
    width: 8px;
    height: 8px;
    transform: rotate(-50deg);
    box-sizing: border-box;
    background: #fff;
  }
  
  .charge-money_scan .get-code {
    position: relative;
  }
  
  .marked_words {
    
    display: none;
    width: 100px;
    right: -8px;
    top: 25px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
    padding: 4px 0;
    z-index: 100;
    .triangle {
      position: absolute;
      top: -6px;
      right: 17px;
      box-shadow: 0px -1px 2px 0px rgba(0, 0, 0, .2);
      border-bottom: 0 none;
      border-right: 0 none;
      width: 8px;
      height: 8px;
      -webkit-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      background: white;
    }
    span {
      display: block;
      text-align: center;
      line-height: 32px;
      font-size: 12px;
    }
    span.curret {
      background: rgba(240, 239, 247, 1);
    }
  }
  
  .sanj {
    position: absolute;
    top: -6px;
    border: 1px solid #fff;
    border-bottom: 0 none;
    border-right: 0 none;
    width: 12px;
    height: 12px;
    -webkit-transform: rotate(45deg);
    box-sizing: border-box;
    background: #fff;
  }
  
  .zhLocation {
    right: 133px;
  }
  
  .enLocation {
    right: 225px;
  }

</style>
<template>
  <div class="charge-money_info">
    <div :class="['sanj',$store.state.hex_lang.locale=='zh_cn'?'zhLocation':'enLocation']"></div>
    <div class="charge-money_group">
      <p class="title"> {{$t('wallet.rechargeAddress')}}</p>
      <div class="clearfix">
        <div class="charge-money_address left">
          <input readonly
                 type="text"
                 id='keycopy'
                 :class="['ipt_hover','keycopy'+currencyAll.currency.id]"
                 v-model="currencyAll.address">
          <span
            :class="['search-tip','recharge_address'+currencyAll.currency.id]"
            :data-clipboard-target="'.keycopy'+currencyAll.currency.id"
            @click="copy(currencyAll.currency.id)">{{$t('wallet.copyAddress')}}</span>
        </div>
        <div class="charge-money_scan left">
          <span class='get-code'
                @click.stop="getCode">
             {{$t('wallet.scanCode')}}
            <span class="code"
                  v-show="qrcodeState">
              <img :src="qrcode"/>
            </span>
          </span>
        </div>
      </div>
      <div v-if="currencyAll.currency.istagrequired">
        <p class="title tag"> {{$t('c2c.Addresslabel')}}</p>
        <div class="clearfix">
          <div class="charge-money_address left">
            <input readonly
                   type="text"
                   id='keycopys'
                   :class="['ipt_hover','keycopys'+nextUid]"
                   v-model="nextUid">
            <span
              :class="['search-tip','recharge_address'+ nextUid]"
              :data-clipboard-target="'.keycopys'+ nextUid"
              @click="copy(nextUid)">{{$t('wallet.copyAddress')}}</span>
          </div>
          <div class="charge-money_scan left">
          <span class='get-code'
                @click.stop="getCode('tag')">
             {{$t('wallet.scanCode')}}
            <span class="code tag"
                  v-show="tagQrcodeState">
              <img :src="tagQrcode"/>
            </span>
          </span>
          </div>
        </div>
      </div>
      
      <p class="charge-money_follow">
        {{$t('wallet.lookOver')}}
        <nuxt-link
          to="/person/wallet-history"
          class="charge-money_follow_tip"
          tag="span"> {{$t('wallet.moneyRecord')}}
        </nuxt-link>
        {{$t('wallet.trackingState')}}
      </p>
    </div>
    <div class="charge-money_hint">
      <p class="title">{{$t('wallet.safetyTips')}}</p>
      <p class="tip">
        {{$t('wallet.forbid')}}{{currencyname}}{{$t('wallet.forbidM')}}{{currencyname}}{{$t('wallet.forbidE')}}</p>
      <p v-html="currencyAll.tip">
      </p>
      <p v-if="currencyname=='EOS'">3. EOS 币充值当前暂不支持延时交易</p>
    </div>
  </div>
</template>
<script>
  import coinselect from '@/components/security/coin-select'
  import QRcode from 'qrcode'
  import Clipboard from 'clipboard';
  
  export default {
    name: 'articles',
    components: {
      coinselect,
    },
    computed: {
      currencyname: function () {
        if (this.currencyAll.currency.currencyname) {
          return this.currencyAll.currency.currencyname.toUpperCase()
        }
        return ''
      }
    },
    props: {
      currencyAll: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data() {
      return {
        reminder: '',
        qrcode: '',
        qrcodeState: false,
        tagQrcode: '',
        tagQrcodeState: false,
        nextUid: '',
        address: ''
        
      }
    },
    mounted() {
      this.address = this.currencyAll.address;
      this.nextUid = this.$userinfo.uid.slice(this.$userinfo.uid.length - 10);
      document.addEventListener('click', () => {
        if (this.qrcodeState || this.tagQrcodeState) {
          this.qrcodeState = false;
          this.tagQrcodeState = false;
        }
      })
    },
    methods: {
      getCode(val) {
        let address;
        if (val == 'tag') {
          address = this.nextUid;
          this.tagQrcodeState = !this.tagQrcodeState;
          this.qrcodeState = false;
        } else {
          address = this.currencyAll.address;
          this.qrcodeState = !this.qrcodeState;
          this.tagQrcodeState = false;
        }
        if (!address) {
          this.qrcodeState = !this.qrcodeState;
          return;
        }
        QRcode.toDataURL(address).then((url) => {
          val == 'tag' ? this.tagQrcode = url : this.qrcode = url;
        })
      },
      nameWithLang({name, language}) {
        return `${name} — [${language}]`
      },
      mark(val) {
        this.reminder = val;
      },
      copy(val) {
        const _self = this;
        // var clipboard = new Clipboard('.recharge_address' + this.currencyAll.currency.id);
        var clipboard = new Clipboard('.recharge_address' + val);
        clipboard.on('success', e => {
          this.$store.commit('set_message', {type: 'ok', text: _self.$t('wallet.copySuccess')})
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          this.$store.commit('set_message', {type: 'error', text: _self.$t('wallet.copyError')})
          clipboard.destroy()
        })
      }
    }
  }
</script>
