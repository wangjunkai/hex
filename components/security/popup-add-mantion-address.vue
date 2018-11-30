<template>
  <div class='popup'>
    <div class="mask"></div>
    <div class='mask-content'>
      <div class="head">
        <span class='title head-title'>{{$t("Waddress.add")}}{{currencyname}}{{$t("logonHistory.address")}}</span>
        <span class="close" @click='close(0)'>
          <img src="@/static/images/an_close.png" alt="">
        </span>
      </div>
      <div class='info'>
        <div class="auth-content_group">
          <p class="title clearfix">
            <span class="left ">{{$t("Waddress.coin")}}</span>
          </p>
          <div class="coinName">{{currencyname}}</div>
        </div>
        <div class="auth-content_group"
             :class="{'auth-content_group--error':$v.addMantionAddress.address.$error}">
          <p class="title clearfix">
            <span class="left ">{{$t('Waddress.mentionaddress')}}</span>
            <span class="normal-tip_error right"
                  v-if="!$v.addMantionAddress.address.required">{{$t('Waddress.mentionaddressNone')}}</span>
          </p>
          <input class="input ipt_hover"
                 v-model.trim="$v.addMantionAddress.address.$model"
                 :placeholder="$t('Waddress.mentionaddressInput')"
                 @blur="checkMentionAddress"
                 type="text">
        </div>
        <!--标签-->
        <div class="auth-content_group"
             v-if="currency.istagrequired"
             :class="{'auth-content_group--error':$v.addMantionAddress.remarktag.$error}">
          <p class="title clearfix">
            <span class="left ">{{$t('c2c.Addresslabel')}}</span>
            <span class="normal-tip_error right"
                  v-if="!$v.addMantionAddress.remarktag.required">{{$t('Waddress.remarktagNone')}}</span>
          </p>
          <input class="input ipt_hover"
                 v-model.trim="$v.addMantionAddress.remarktag.$model"
                 :placeholder="$t('Waddress.remarktagInput')"
                 type="text">
        </div>
        <div class="auth-content_group"
             :class="{'auth-content_group--error':$v.addMantionAddress.remeark.$error}">
          <p class="title clearfix">
            <span class="left">{{$t('Waddress.remark')}}</span>
            <span class="normal-tip_error right"
                  v-if="!$v.addMantionAddress.remeark.required">{{$t('Waddress.remarkNone')}}</span>
          </p>
          <input class="input ipt_hover"
                 v-model.trim="$v.addMantionAddress.remeark.$model"
                 :placeholder="$t('Waddress.remarkInput')"
                 type="text">
        </div>
        
        <div class="auth-content_group auth-content_group_code"
             v-if="$userinfo.isphoneauthed"
             :class="{'auth-content_group--error':$v.addressCode.smsverifycode.$error}">
          <div class=" title clearfix">
            <p class="left cl_ccc">
              <span>{{$t('formMenu.phoneCodeVerification')}}</span>
              <span class="fr">{{global_string_split($userinfo.phone)}}</span>
            </p>
            <span class="normal-tip_error right"
                  v-if="!$v.addressCode.smsverifycode.required">{{$t('formMenu.phoneCodeVerificationNone')}}</span>
          </div>
          <div class="auth-content_group_mail">
            <input class="input"
                   :placeholder="$t('formMenu.phoneInputVerification')"
                   type="text"
                   v-model.trim="$v.addressCode.smsverifycode.$model">
            <verifycode :phone="$userinfo.phone" :template="'Withdraw'"></verifycode>
          </div>
        </div>
        <div class="auth-content_group auth-content_group_code"
             v-if="$userinfo.isemailauthed"
             :class="{'auth-content_group--error':$v.addressCode.emailverifycode.$error}">
          <div class="title clearfix">
            <p class="left cl_ccc">
              <span>{{$t("formMenu.emailCodeVerification")}}</span>
              <span class="fr">{{global_string_split($userinfo.email)}}</span>
            </p>
            <span class="normal-tip_error right"
                  v-if="!$v.addressCode.emailverifycode.required">{{$t("formMenu.emailCodeVerificationNone")}}</span>
          </div>
          <div class="auth-content_group_mail">
            <input class="input"
                   :placeholder="$t('formMenu.emialInputVerification')"
                   type="text"
                   v-model.trim="$v.addressCode.emailverifycode.$model">
            <verifycode :email="$userinfo.email" :template="'Withdraw'"></verifycode>
          </div>
        </div>
        
        <div class="auth-content_group"
             v-if="$userinfo.isopengoogleverify"
             :class="{'auth-content_group--error':$v.addressCode.googleverifycode.$error}">
          <p class="title clearfix">
            <span class="left">{{$t('formMenu.googleCodeVerification')}}</span>
            <span class="normal-tip_error right"
                  v-if="!$v.addressCode.googleverifycode.required">{{$t('formMenu.googleCodeVerificationNone')}}</span>
          </p>
          <input class="input ipt_hover" v-model.trim="$v.addressCode.googleverifycode.$model"
                 :placeholder="$t('formMenu.googleInputVerification')"
                 type="text">
        </div>
        <div class="auth-content_group auth-content_group_input">
          <el-checkbox v-model="addMantionAddress.iswhitelist">
            <span class="label-tip">{{$t("Waddress.addWhiteList")}}</span>
          </el-checkbox>
        </div>
        <button class='commitBtn button-loading--por'
                v-loading="loading"
                @click="addAddress">{{$t("Waddress.add")}}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
  import {required} from 'vuelidate/lib/validators'
  import verifycode from '@/components/public/verifycode'
  
  export default {
    name: "popup-add-manton-address",
    validations: {
      addMantionAddress: {
        address: {
          required
        },
        remeark: {
          required
        },
        remarktag: {
          required
        }
      },
      addressCode: {
        emailverifycode: {
          required
        },
        smsverifycode: {
          required
        },
        googleverifycode: {
          required
        }
      }
    },
    components: {
      verifycode
    },
    computed: {
      currencyname: function () {
        return this.currency.currencyname.toUpperCase()
      }
    },
    props: ['currency'],
    data() {
      return {
        withdrawcheck: '',
        loading: false,
        addstate: false,
        addMantionAddress: this.initAddress(),
        addressCode: {
          googleverifycode: '',
          emailverifycode: '',
          smsverifycode: '',
        },
        sendModel: {
          template: 'Default'
        }
      }
    },
    mounted() {
    },
    methods: {
      checkMentionAddress() {
        if (!this.addMantionAddress.address) return;
        let postData = {
          currencyid: this.currency.id,
          address: this.addMantionAddress.address
        }
        this.$store.dispatch('user_user_withdraw_address_check', postData).then(({data}) => {
          if (data) {
            this.withdrawcheck = data;
          }
        })
      },
      initAddress() {
        const a = {
          currencyid: '',
          address: '',
          remeark: '',
          remarktag: '',
          googleverifycode: '',
          emailverifycode: '',
          smsverifycode: '',
          iswhitelist: false
        }
        return a
      },
      addAddress() {
        const _self = this
        const address = Object.assign({}, _self.addMantionAddress)
        const _address = _self.$v.addMantionAddress
        let {google, phone, email,istag} = '';
        // _address.$touch()

        if (this.$userinfo.isopengoogleverify) {
          google = _self.$v.addressCode.googleverifycode
          google.$touch()
        }
        if (this.$userinfo.isphoneauthed) {
          phone = _self.$v.addressCode.smsverifycode
          phone.$touch()
        }
        if (this.$userinfo.isemailauthed) {
          email = _self.$v.addressCode.emailverifycode
          email.$touch()
        }
        if(_self.currency.istagrequired){
          istag=_self.$v.addMantionAddress.remarktag;
          istag.$touch();
        }
        // if (_address.$invalid) return
        //提示问题新增以下判断
        if (this.$userinfo.isphoneauthed) {
          if (phone.$invalid) return
        }
        if (this.$userinfo.isemailauthed) {
          if (email.$invalid) return
        }
        if (this.$userinfo.isopengoogleverify) {
          if (google.$invalid) return
        }
        if(_self.currency.istagrequired){
          if (istag.$invalid) return
        }
        address.googleverifycode = this.addressCode.googleverifycode
        address.emailverifycode = this.addressCode.emailverifycode
        address.smsverifycode = this.addressCode.smsverifycode
        address.currencyid = this.currency.id
        address.remarktag = this.addMantionAddress.remarktag
        if (_self.addstate) return
        _self.addstate = true
        this.loading = true;
        _self.$store.dispatch('user_user_withdraw_address_add', address)
          .then(({data, msg}) => {
            if (data) {
              _self.$store.commit('set_message', {
                type: 'ok', text: msg
              })
              if (_self.currency.page) {//用于提现地址更新视图
                this.currency.fullname = this.currency.currencyname;
                _self.close(0);
                this.$emit('address', this.currency.currencyname + ',' + this.currency.id+ ',' + this.currency.assetsid);
              } else {
                _self.close(0)
                
                this.$pubsub.publish(this.$pubsub.addAddress)
              }
            } else {
              _self.addstate = false;
              _self.loading = false;
            }
          })
          .then(() => {
            _self.addstate = false;
            _self.loading = false;
          })
      },
      close(val) {
        this.$emit('closePopup', val);
      }
    }
  };
</script>
<style lang='less' scoped>
  @import "./../../static/styles/auth.less";
  
  .auth-content_group_mail .mail_code {
    height: 40px;
  }
  
  .auth-content_group.auth-content_group_code .title.clearfix {
    width: 400px;
  }
  
  .auth-content_group.auth-content_group_code .title.clearfix .left {
    width: 270px;
  }
  
  .auth-content_group.auth-content_group_code .title.clearfix .fr {
    color: #bbb;
  }
  
  .auth-content_group.auth-content_group_code .title .left,
  .popup .mask-content span {
    font-size: 12px;
    height: inherit;
    color: @cl_fff;
  }
  
  .popup .mask-content .left,
  .auth-content_group.auth-content_group_code .title .cl_ccc span,
  .auth-content_group_input .el-checkbox__label .label-tip {
    color: rgba(102, 102, 102, 1);
  }
  
  .popup .mask-content span.head-title {
    color: #2c3e50;
  }
  
  .auth-content_group input {
    color: rgb(51, 51, 51);
  }
  
  .coinName {
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    border: 1px solid #dddddd;
    color: #000;
    font-size: 14px;
    width: 400px;
    background: rgba(240, 240, 240, 1);
  }
  
  .head span.title {
    font-size: 16px;
    display: initial;
  }
  
  .commitBtn {
    cursor: pointer;
  }

</style>
