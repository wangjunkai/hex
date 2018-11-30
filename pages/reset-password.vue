<script>
  import {required, sameAs, minLength, maxLength} from 'vuelidate/lib/validators'
  import Captcha from '@/plugins/captcha'
  import crypto from "@/plugins/axios/crypto";
  
  export default {
    name: 'Home',
    validations: {
      step1: {
        accountname: {
          required
        }
      },
      step2: {
        smsverifycode: {
          required
        },
        emailverifycode: {
          required
        }
      },
      step3: {
        password: {
          required,
          minLength: minLength(8),
          maxLength: maxLength(20)
        },
        passwordagain: {
          required,
          sameAsPassword: sameAs('password')
        }
        
      }
    },
    watch: {
      '$store.state.hex_lang.locale': function (val) {
        const a = this.$i18n.t('formMenu.getCode')
        this.state.phone.sendDelay = a
        this.state.email.sendDelay = a
      },
      'step3.password': function (val) {
        const _step3Model = this.step3
        if (this.reg.strong.test(val)) {
          _step3Model.passwordstrength = 3
        } else if (this.reg.middle.test(val)) {
          _step3Model.passwordstrength = 2
        } else if (this.reg.single.test(val)) {
          _step3Model.passwordstrength = 1
        } else {
          _step3Model.passwordstrength = 0
        }
      }
    },
    data() {
      return {
        state: {
          phone: {
            sendDelayState: false,
            state: false,
            sendDelay: this.$t("formMenu.getCode")
          },
          email: {
            sendDelayState: false,
            state: false,
            sendDelay: this.$t("formMenu.getCode")
          },
          sendEmail: false,
          stepState: false,
          resetState: 1,
          codeState: false
        },
        reg: {
          single: /^((?=.*[a-z])|(?=.*[A-Z])|(?=.*[0-9]))(?=.{8,})/g,
          middle: /^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[A-Z])))(?=.{8,})/g,
          strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*`~()_=/])(?=.{8,})/g
        },
        step1Data: {},
        step2Data: {},
        step3Data: {},
        step1: {
          accountname: ''
        },
        step2: {
          accountname: '',
          smsverifycode: '',
          emailverifycode: ''
        },
        step3: {
          accountname: "",
          password: "",
          passwordstrength: 0,
          passwordagain: ''
        },
        sendModel: {
          template: 'ResetPwd'
        }
      }
    },
    methods: {
      toStep1() {
        const _self = this
        const _step1 = _self.$v.step1
        _step1.$touch()
        if (_step1.$invalid) return
        if (_self.state.stepState) return
        this.state.stepState = true
        this.$store.dispatch('user_user_reset_pwd_step1', this.step1)
          .then(({data}) => {
            if (data) {
              this.step1Data = data
              this.state.resetState = 2
              this.step2.accountname = this.step1.accountname
              this.step3.accountname = this.step1.accountname
            }
          })
          .then(() => {
            this.state.stepState = false
          })
      },
      
      toStep2() {
        const _self = this
        let _step2
        if (this.step1Data.isphoneauthed && this.step1Data.isemailauthed) {
          _step2 = _self.$v.step2
        } else if (this.step1Data.isphoneauthed) {
          _step2 = _self.$v.step2.smsverifycode
          delete this.step2.emailverifycode
        } else {
          _step2 = _self.$v.step2.emailverifycode
          delete this.step2.smsverifycode
        }
        _step2.$touch()
        if (_step2.$invalid) return
        if (_self.state.stepState) return
        this.state.stepState = true
        if (this.step1Data.isphoneauthed) {
          Object.assign(this.step2, {
            ticket: this.sendModel.ticket,
            captchaid: Captcha.appId,
            randstr: this.sendModel.randstr,
          })
        }
        this.$store.dispatch('user_user_reset_pwd_step2', this.step2)
          .then(({data}) => {
            if (data) {
              this.step2Data = data
              this.state.resetState = 3
            }
          })
          .then(() => {
            this.state.stepState = false
          })
      },
      toStep3() {
        const _self = this
        const _step3 = _self.$v.step3
        _step3.$touch()
        if (_step3.$invalid) return
        if (_self.state.stepState) return
        this.state.stepState = true
        const _step3Model = Object.assign({}, this.step3)
        _step3Model.password = crypto.md5String(_step3Model.password)
        this.$store.dispatch('user_user_reset_pwd_step3', _step3Model)
          .then((res) => {
            if (res.data) {
              this.step3Data = res.data
              this.$store.commit('set_message', {type: 'ok', text: res.msg})
              if (_self.$store.state.hex_uid.value) {
                _self.$store.commit('set_user_info', res)
              }
              _self.$router.push('login')
            }
          })
          .then(() => {
            this.state.stepState = false
          })
      },
      getCode(type) {
        const _self = this
        let _sendState = _self.state[type]
        
        if (_sendState.state) return
        _sendState.state = true
        
        let post, _send = this.sendModel
        if (type == 'email') {
          post = 'com_email_verifycode_send'
          _send.email = _self.step1Data.email
        } else {
          post = 'com_sms_verifycode_send'
          _send.phone = _self.step1Data.phone
          _send.areacode = _self.step1Data.countrycode
        }
        this.getCaptch(type)
          .then((res) => {
            if (res && res.ret == 0) {
              _send.randstr = res.randstr
              _send.ticket = res.ticket
              _self.$store.dispatch(post, _send)
                .then(({data, msg}) => {
                  if (data) {
                    this.delaySend(type, data)
                  } else {
                    this.$store.commit('set_message', {type: 'error', text: msg});
                  }
                })
            } else if (res && res.ret == 2) {
              _sendState.state = false
            } else {
              _self.$store.dispatch(post, _send)
                .then(({data, msg}) => {
                  if (data) {
                    this.delaySend(type, data)
                  } else {
                    this.$store.commit('set_message', {type: 'error', text: msg});
                  }
                })
            }
          })
        
      },
      getCaptch(type) {
        if (type == 'phone') {
          return Captcha.init()
        } else {
          return new Promise((resolve) => {
            resolve(null)
          })
        }
      },
      delaySend(type, data) {
        let _self = this
        let _m = _self.state[type]
        return new Promise(function (resolve) {
          if (!(data && data.succeed)) {
            resolve(true)
            return
          }
          let number = 119
          _m.state = false
          _m.sendDelayState = true
          _m.sendDelay = number + 's'
          const _timer = setInterval(() => {
            --number
            _m.sendDelay = number + 's'
            if (_m.sendDelay == 0) {
              _m.sendDelayState = false
              _m.sendDelay = _self.$t("formMenu.getCode")
              clearInterval(_timer)
              resolve(true)
            }
          }, 1000)
        })
      }
      
      
    }
  }
</script>
<style lang='less' scoped>
  @import "../static/styles/auth.less";
  
  .auth-content_title {
    margin: 120px 0 10px 0;
  }
  
  .auth-content_title_meg_tip {
    margin-top: 10px;
    font-size: 14px;
  }

</style>
<template>
  <div class="hex-flex">
    <div class="auth hex-flex_auto">
      <div class="auth-content">
        <p class="auth-content_title">{{$t("reset-password.resetPassword")}}</p>
        <p class="auth-content_title_tip">{{$t("reset-password.resetPasswordtitle")}}</p>
        <div class="auth-content_form" v-if="state.resetState==1">
          <div class="auth-content_group"
               :class="{'auth-content_group--error':$v.step1.accountname.$error}">
            <p class="title clearfix">
              <span class="left">{{$t("login.account")}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.step1.accountname.required">{{$t("login.accountNo")}}</span>
            </p>
            <input class="input ipt_hover"
                   v-focus
                   v-model.trim="$v.step1.accountname.$model"
                   :placeholder="$t('login.accountNo')"
                   @keyup.enter="toStep1"
                   type="text">
          </div>
          <div class="auth-content_button button-loading--por"
               v-loading="state.stepState"
               @click="toStep1">
            {{$t("reset-password.next")}}
          </div>
        </div>
        <div class="auth-content_form" v-else-if="state.resetState==2">
          <p class="auth-content_title_meg_tip" v-if="state.codeState">{{$t("reset-password.resetPasswordSend")}}</p>
          <div class="auth-content_group auth-content_group_code"
               v-if="step1Data.isphoneauthed"
               :class="{'auth-content_group--error':$v.step2.smsverifycode.$error}">
            <p class="title clearfix">
              <span class="left">{{$t("formMenu.phoneCodeVerification")}}</span>
              <span class="normal-tip_error right" v-if="!$v.step2.smsverifycode.required">{{$t("formMenu.phoneCodeVerificationNone")}}</span>
            </p>
            <div class="auth-content_group_mail">
              <input class="input"
                     v-focus
                     v-model.trim="$v.step2.smsverifycode.$model"
                     :placeholder="$t('formMenu.phoneInputVerification')"
                     @keyup.enter="toStep2"
                     type="text">
              <span class="mail_code get-code button-loading--por"
                    :class="{'auth-content_group--unavailable':state.phone.sendDelayState}"
                    v-loading="state.phone.state"
                    @click="getCode('phone')">{{state.phone.sendDelay}}</span>
            </div>
          </div>
          <div class="auth-content_group auth-content_group_code"
               v-if="step1Data.isemailauthed"
               :class="{'auth-content_group--error':$v.step2.emailverifycode.$error}">
            <p class="title clearfix">
              <span class="left">{{$t("formMenu.emailCodeVerification")}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.step2.emailverifycode.required">{{$t('formMenu.emailCodeVerificationNone')}}</span>
            </p>
            <div class="auth-content_group_mail">
              <input class="input"
                     v-model.trim="$v.step2.emailverifycode.$model"
                     :placeholder="$t('formMenu.emialInputVerification')"
                     type="text"
                     @keyup.enter="toStep2"
              >
              <span class="mail_code get-code button-loading--por"
                    :class="{'auth-content_group--unavailable':state.email.sendDelayState}"
                    v-loading="state.email.state"
                    @click="getCode('email')">{{state.email.sendDelay}}</span>
            </div>
          </div>
          <div class="auth-content_button button-loading--por"
               v-loading="state.stepState"
               @click="toStep2">
            {{$t("reset-password.next")}}
          </div>
        </div>
        <div class="auth-content_form" v-else>
          <div class="auth-content_group" :class="{'auth-content_group--error':$v.step3.password.$error}">
            <p class="title clearfix">
              <span class="left">{{$t("formMenu.newPassword")}}</span>
              <span class="normal-tip right"
                    v-if="!$v.step3.password.$error">{{$t("formMenu.passwordCombination")}}</span>
              <span class="normal-tip_error right" v-if="!$v.step3.password.required">{{$t("formMenu.loginPasswordNone")}}</span>
              <span class="normal-tip_error right" v-if="!$v.step3.password.minLength">{{$t("formMenu.loginPasswordL")}}{{$v.step3.password.$params.minLength.min}}</span>
              <span class="normal-tip_error right" v-if="!$v.step3.password.maxLength">{{$t("formMenu.loginPasswordG")}}{{$v.step3.password.$params.maxLength.max}}</span>
            </p>
            <div class="password_group">
              <input class="input"
                     v-model.trim="$v.step3.password.$model"
                     v-focus
                     :placeholder="$t('formMenu.newPasswordInput')" type="password">
              <span class="password_group_tip" v-if="!$v.step3.password.$error">
                <span class="password_group_tip week"
                      v-show="step3.passwordstrength==1">{{$t("formMenu.passwordWeak")}}</span>
                <span class="password_group_tip middle" v-show="step3.passwordstrength==2">{{$t("formMenu.passwordMiddle")}}</span>
                <span class="password_group_tip strong" v-show="step3.passwordstrength==3">{{$t("formMenu.passwordStrong")}}</span>
              </span>
            </div>
          </div>
          <div class="auth-content_group" :class="{'auth-content_group--error':$v.step3.passwordagain.$error}">
            <p class="title clearfix">
              <span class="left">{{$t("formMenu.newPasswordConfirm")}}</span>
              <span v-if="$v.step3.passwordagain.sameAsPassword">
                 <span class="normal-tip_error right" v-if="!$v.step3.passwordagain.required">{{$t("formMenu.passwordInconformity")}}</span>
              </span>
              <span class="normal-tip_error right" v-if="!$v.step3.passwordagain.sameAsPassword">{{$t("formMenu.passwordInconformity")}}</span>
            </p>
            <input class="input"
                   v-model.trim="$v.step3.passwordagain.$model"
                   :placeholder="$t('formMenu.newPasswordAgain')"
                   @keyup.enter="toStep3"
                   type="password">
          </div>
          <div class="auth-content_button button-loading--por"
               v-loading="state.stepState"
               @click="toStep3">
            {{$t("formMenu.determine")}}
          </div>
        </div>
        <img class="auth-bg" src="~/static/images/user/group.png" alt="">
      </div>
    </div>
  </div>

</template>
