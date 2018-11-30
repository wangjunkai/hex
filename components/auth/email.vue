<script>
  import {required, email, sameAs, minLength, maxLength} from 'vuelidate/lib/validators'
  import crypto from "@/plugins/axios/crypto";
  import verifycode from "@/components/public/verifycode.vue";
  import terms from "@/components/public/terms-service.vue";
  
  export default {
    name: 'Home',
    components: {verifycode, terms},
    watch: {
      '$store.state.hex_lang.locale': function (val) {
        this.state.sendDelay = this.$i18n.t('formMenu.getCode')
      },
      'signModel.password': function (val) {
        const _signModel = this.signModel
        if (this.reg.strong.test(val)) {
          _signModel.passwordstrength = 3
        } else if (this.reg.middle.test(val)) {
          _signModel.passwordstrength = 2
        } else if (this.reg.single.test(val)) {
          _signModel.passwordstrength = 1
        } else {
          _signModel.passwordstrength = 0
        }
      }
    },
    validations: {
      signModel: {
        email: {
          required, email
        },
        verifycode: {
          required
        },
        password: {
          required,
          minLength: minLength(8),
          maxLength: maxLength(20)
        },
        passwordagain: {
          sameAsPassword: sameAs('password')
        }
      }
    },
    data() {
      return {
        loading: false,
        isemail: true,
        popupStatue: false,
        state: {
          send: false,
          check: true,
          signup: false,
          sendDelay: this.$i18n.t('formMenu.getCode'),
          sendDelayState: false
        },
        reg: {
          single: /^((?=.*[a-z])|(?=.*[A-Z])|(?=.*[0-9]))(?=.{8,})/g,
          middle: /^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[A-Z])))(?=.{8,})/g,
          strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*`~()_=/])(?=.{8,})/g
        },
        //注册model
        signModel: this.getModel(),
        //验证model
        sendModel: {
          email: '',
          template: 'Signup'
        },
        article: {
          "zh_cn": 654641,
          "en_us": 638881
        }
      }
    },
    mounted() {
      this.signModel.referee = this.$route.query.invitecode ? this.$route.query.invitecode : '';
    },
    methods: {
      closeloading() {
        this.state.send = false;
      },
      getModel() {
        const m = {
          signuptype: 'email',
          email: '',
          password: '',
          passwordagain: '',
          verifycode: '',
          passwordstrength: '',
          source: '',
          referee: '',
          usertype: 0,
        }
        return m
      },
      popup() {
        this.popupStatue = !this.popupStatue;
      },
      getCode(val) {
        const _self = this;
        if (_self.state.send) return
        this.sendModel.email = this.signModel.email;
        const email = this.$v.signModel.email;
        email.$touch();
        if (email.$invalid) return;
        _self.state.send = true
        this.$store.dispatch("user_user_exist", {email: this.signModel.email}).then(({data}) => {
          if (data) {
            _self.state.send = false
            _self.$store.commit('set_message', {type: 'error', text: this.$t('formMenu.existEmail')});
          } else {
            _self.$emit('register:sendCode', _self)
          }
        })
      },
      signUp() {
        if (!this.state.check) return
        const _self = this;
        const _sign = Object.assign({}, _self.signModel);
        const _signModel = _self.$v.signModel;
        _signModel.$touch();
        if (_signModel.$invalid) return;
        if (_self.state.signup) return;
        if (_self.loading) {
          return;
        }
        _self.loading = true;
        _self.state.signup = true;
        _sign.password = crypto.md5String(_sign.password);
        delete _sign.passwordagain
        _self.$store.dispatch('user_user_signup', _sign).then((res) => {
          if (res.data) {
            _self.$store.commit('set_message', {
              type: 'ok',
              text: res.msg
            })
            _self.$store.commit('set_user_info', res);
            location.href = '/person'
          }
          _self.loading = false;
        })
          .then((data) => {
            _self.state.signup = false;
          })
      },
    }
  }
</script>

<style scoped lang="less">
  .serve-tip {
    font-size: 14px;
    margin-left: 10px;
    cursor: pointer;
  }
  
  .right.col {
    color: #bbbbbb;
  }
  
  .auth-content_group .password_group .password_group_tip {
    position: absolute;
    right: 0;
    top: 0;
    padding: 0 10px;
    line-height: 40px;
    height: 40px;
    display: inline-block;
    font-size: 14px;
  }
</style>
<template>
  <div class="auth-content_form">
    <div class="auth-content_group" :class="{'auth-content_group--error':$v.signModel.email.$error}">
      <p class="title clearfix">
        <span class="left">{{$t("formMenu.registerEmail")}}</span>
        <span class="normal-tip_error right"
              v-if="!$v.signModel.email.required">{{$t("formMenu.emailNone")}}</span>
        <span class="normal-tip_error right"
              v-if="!$v.signModel.email.email">{{$t("formMenu.emailFormatError")}}</span>
      </p>
      <input class="input"
             v-focus
             v-model.trim="$v.signModel.email.$model"
             :placeholder="$t('formMenu.emialInputAddress')"
             type="text">
    </div>
    <div class="auth-content_group auth-content_group_code"
         :class="{'auth-content_group--error':$v.signModel.verifycode.$error}">
      <p class="title clearfix">
        <span class="left">{{$t("formMenu.emailCodeVerification")}}</span>
        <span class="right col">{{$t('formMenu.checkEmail')}}</span>
      
      </p>
      <span class="normal-tip_error right fz12"
            v-if="!$v.signModel.verifycode.required">{{$t("formMenu.emailCodeVerificationNone")}}</span>
      <div class="auth-content_group_mail">
        <input class="input"
               v-model.trim="$v.signModel.verifycode.$model"
               :placeholder="$t('formMenu.emialInputVerification')" type="text">
        <span class="mail_code get-code button-loading--por"
              :class="{'auth-content_group--unavailable':state.sendDelayState}"
              v-loading="state.send"
              @click="getCode(1)">{{state.sendDelay}}</span>
      </div>
    </div>
    <div class="auth-content_group" :class="{'auth-content_group--error':$v.signModel.password.$error}">
      <p class="title clearfix">
        <span class="left">{{$t("formMenu.loginPassword")}}</span>
        <span class="normal-tip right"
              v-if="!$v.signModel.password.$error">{{$t("formMenu.passwordCombination")}}</span>
        <span class="normal-tip_error right"
              v-if="!$v.signModel.password.required">{{$t("formMenu.loginPasswordNone")}}</span>
        <span class="normal-tip_error right" v-if="!$v.signModel.password.minLength">{{$t("formMenu.loginPasswordL")}}{{$v.signModel.password.$params.minLength.min}}</span>
        <span class="normal-tip_error right" v-if="!$v.signModel.password.maxLength">{{$t("formMenu.loginPasswordG")}}{{$v.signModel.password.$params.maxLength.max}}</span>
      </p>
      <div class="password_group">
        <input class="input" v-model.trim="$v.signModel.password.$model" :placeholder="$t('formMenu.loginPassword')"
               type="password">
        <span class="password_group_tip" v-if="!$v.signModel.password.$error">
                <span class="password_group_tip week" v-show="signModel.passwordstrength==1">{{$t("formMenu.passwordWeak")}}</span>
                <span class="password_group_tip middle" v-show="signModel.passwordstrength==2">{{$t("formMenu.passwordMiddle")}}</span>
                <span class="password_group_tip strong" v-show="signModel.passwordstrength==3">{{$t("formMenu.passwordStrong")}}</span>
              </span>
      </div>
    </div>
    <div class="auth-content_group" :class="{'auth-content_group--error':$v.signModel.passwordagain.$error}">
      <p class="title clearfix">
        <span class="left">{{$t("formMenu.loginPasswordConfirm")}}</span>
        <span class="normal-tip_error right" v-if="!$v.signModel.passwordagain.sameAsPassword">{{$t("formMenu.passwordInconformity")}}</span>
      </p>
      <input class="input" v-model.trim="$v.signModel.passwordagain.$model"
             :placeholder="$t('formMenu.loginPasswordAgain')"
             @keyup.enter="signUp"
             type="password">
    </div>
    <div class="auth-content_group">
      <p class="title clearfix">
        <span class="left">{{$t("formMenu.InviteCode")}}</span>
        <span class="normal-tip right">{{$t("formMenu.notFill")}}</span>
      </p>
      <input class="input" v-model.trim="signModel.referee" @keyup.enter="signUp"
             :placeholder="$t('formMenu.InviteCodeInput')" type="text">
    </div>
    <div class="auth-content_group">
      <el-checkbox v-model="state.check">
        <span class="label-tip">{{$t("formMenu.read")}} HEX.COM</span>
      </el-checkbox>
      <span class="serve-tip" @click="popup">{{$t("formMenu.service")}}</span>
      <terms @close="popup" v-show="popupStatue" :article="article"/>
    </div>
    <div class="auth-content_button button-loading--por"
         v-loading="loading"
         @click="signUp">
      {{$t("formMenu.register")}}
    </div>
  </div>
</template>
