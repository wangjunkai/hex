<script>
  import Captcha from '@/plugins/captcha'
  import {required} from 'vuelidate/lib/validators'
  import verifycode from '@/components/public/verifycode'
  
  export default {
    name: 'Home',
    components: {
      verifycode
    },
    validations: {
      signModel: {
        verifycode: {
          required
        }
      }
    },
    watch: {
      'state.tab': function (val) {
        if (this.signModel.ticket) {
          Object.assign(this.sendModel, {
            ticket: this.signModel.ticket,
            captchaid: Captcha.appId,
            randstr: this.signModel.randstr
          })
        }
        if (val == 'email') {
          Object.assign(this.sendModel, {
            email: this.verifyModel.email
          })
        } else if (val == 'phone') {
          Object.assign(this.sendModel, {
            phone: this.verifyModel.phone,
            areacode: this.verifyModel.countrycode
          })
        }
        setTimeout(() => {
          this.$v.$reset()
        }, 0)
      },
      'signModel.verifycode': function (val) {
        val = val ? val.trim() : ''
        if (val && val.length == 6) {
          this.toSign()
        }
      }
    },
    data() {
      return {
        loading: false,
        state: {
          tab: 'email',
          signin: false,
          sendDelay: this.$t("formMenu.getCode")
        },
        signModel: {},
        sendModel: {
          template: 'Signin',
        },
        verifyModel: {}
      }
    },
    mounted() {
      setTimeout(() => {
        this.$v.$reset()
      }, 0)
    },
    beforeRouteEnter(to, from, next) {
      if (!to.params.verifyModel) {
        next('login')
      } else {
        next((vm) => {
          const {verifyModel, signModel} = to.params;
          vm.verifyModel = verifyModel;
          vm.signModel = signModel;
          if (verifyModel.isgoogleauthed) {
            vm.state.tab = 'google'
          } else if (verifyModel.isphoneauthed) {
            vm.state.tab = 'phone'
          } else {
            vm.state.tab = 'email'
          }
        })
      }
    },
    methods: {
      getUcGet() {
        this.$store.dispatch('user_assets_uc_get', {assetstype: 1})
          .then((res) => {
            const _assets = res.data ? res.data : res.hexdata
            if (_assets) {
              this.$store.commit('set_server_user_assets_uc', _assets)
            }
          })
      },
      toSign() {
        let _self = this;
        if (_self.loading) return;
        _self.loading = true;
        if (this.state.signin) return;
        this.state.signin = true;
        if (this.state.tab == 'email') {
          this.signModel.vctype = 'Email'
        } else if (this.state.tab == 'phone') {
          this.signModel.vctype = 'SMS'
        } else {
          this.signModel.vctype = 'Google'
        }
        _self.$store.dispatch('user_user_signin', this.signModel).then((res) => {
          if (res.data) {
            this.getUcGet()
            _self.$store.commit('set_user_info', res);
            location.href = '/person'
          } else {
            _self.state.signin = false;
            _self.loading = false;
          }
        })
      },
      setActive(tab) {
        this.signModel.verifycode = '';
        this.state.tab = tab
        this.$nextTick(() => {
          this.$v.$reset()
        })
      }
    }
  }
</script>

<style lang='less' scoped>
  @import "../static/styles/auth.less";
  
  .auth-content_title {
    margin: 120px 0 30px 0;
  }
  
  .auth-bg {
    position: absolute;
    top: 130px;
    right: 160px;
    width: 400px;
    height: 321px;
  }
  
  .auth-content_form .auth-content_group .title {
    width: 400px;
  }
</style>
<template>
  <div class="hex-flex">
    <div class="auth hex-flex_auto">
      <div class="auth-content">
        <p class="auth-content_title">{{$t("formMenu.safety")}}</p>
        <div class="auth-content_nav">
          <span :class="state.tab=='google'?'active':''"
                class="google"
                v-if="verifyModel.isgoogleauthed"
                @click="setActive('google')">{{$t("formMenu.googleAuthentication")}}</span>
          <span class="phone" :class="state.tab=='phone'?'active':''"
                v-if="verifyModel.isphoneauthed"
                @click="setActive('phone')">{{$t("formMenu.phoneAuthentication")}}</span>
          
          <span class="email"
                :class="[state.tab=='email'?'active':'']"
                v-if="(verifyModel.isgoogleauthed&&verifyModel.isphoneauthed&&verifyModel.isemailauthed)||!verifyModel.isemailauthed?false:true"
                @click="setActive('email')">{{$t("formMenu.emailAuthentication")}}</span>
        
        </div>
        <div class="auth-content_form" v-if="state.tab=='google'">
          <div class="auth-content_group auth-content_group_code"
               :class="{'auth-content_group--error':$v.signModel.verifycode.$error}">
            <p class="title clearfix">
              <span class="left">{{$t("formMenu.googleCodeVerification")}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.signModel.verifycode.required">{{$t("formMenu.googleCodeVerificationNone")}}</span>
            </p>
            <input class="input ipt_hover"
                   v-focus
                   v-model.trim="$v.signModel.verifycode.$model"
                   :placeholder="$t('formMenu.googleInputVerification')"
                   @keyup.enter="toSign"
                   type="number">
          </div>
          <div class="auth-content_button button-loading--por"
               v-loading="loading"
               @click="toSign">
            {{$t("formMenu.determine")}}
          </div>
        </div>
        <div class="auth-content_form" v-else-if="state.tab=='phone'">
          <div class="auth-content_group auth-content_group_code"
               :class="{'auth-content_group--error':$v.signModel.verifycode.$error}">
            <p class="title clearfix">
              <span class="left">{{$t("formMenu.phoneCodeVerification")}}</span>
              <span class="normal-tip_error right" v-if="!$v.signModel.verifycode.required">{{$t("formMenu.phoneCodeVerificationNone")}}</span>
            </p>
            <div class="auth-content_group_mail">
              <input class="input"
                     v-focus
                     v-model.trim="$v.signModel.verifycode.$model"
                     :placeholder="$t('formMenu.phoneInputVerification')"
                     @keyup.enter="toSign"
                     type="number">
              <verifycode :phone="verifyModel.phone" :areacode="verifyModel.countrycode"
                          :template="'signIn'"></verifycode>
            </div>
          </div>
          <div class="auth-content_button button-loading--por"
               v-loading="loading"
               @click="toSign">
            {{$t("formMenu.determine")}}
          </div>
        </div>
        <div class="auth-content_form" v-else-if="state.tab=='email'">
          <div class="auth-content_group auth-content_group_code"
               :class="{'auth-content_group--error':$v.signModel.verifycode.$error}">
            <p class="title clearfix">
              <span class="left">{{$t("formMenu.emailCodeVerification")}}</span>
              <span class="normal-tip_error right" v-if="!$v.signModel.verifycode.required">{{$t("formMenu.emailCodeVerificationNone")}}</span>
            </p>
            <div class="auth-content_group_mail">
              <input class="input"
                     v-model.trim="$v.signModel.verifycode.$model"
                     :placeholder="$t('formMenu.emialInputVerification')"
                     @keyup.enter="toSign"
                     type="text">
              <verifycode :email="verifyModel.email" :template="'signIn'"></verifycode>
            </div>
          </div>
          <div class="auth-content_button button-loading--por"
               v-loading="loading"
               @click="toSign">
            {{$t("formMenu.determine")}}
          </div>
        </div>
        <img class="auth-bg" src="~/static/images/user/group.png" alt="">
      </div>
    </div>
  </div>

</template>
