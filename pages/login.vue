<script>
  import {required, email, sameAs, minLength, maxLength} from 'vuelidate/lib/validators'
  import Captcha from '@/plugins/captcha'
  import crypto from "@/plugins/axios/crypto"
  
  export default {
    name: 'Home',
    validations: {
      signModel: {
        password: {
          required
        },
        username: {
          required
        }
      }
    },
    data() {
      return {
        loading: false,
        state: {
          signin: false,
          verify: false,
          login: 'login'
        },
        signModel: {
          username: '',
          password: '',
          verifycode: '',
          rememberme: true,
        },
        verifyModel: null
      }
    }
    ,
    methods: {
      signIn() {
        const _self = this;
        const _sign = Object.assign({}, _self.signModel);
        const _signModel = _self.$v.signModel;
        _signModel.$touch();
        if (_signModel.$invalid) return;
        if (_self.state.signin) return;
        if (_self.loading) return;
        _self.loading = true;
        _self.state.signin = true;
        _sign.password = crypto.md5String(_sign.password);
        _self.$store.dispatch('user_user_signin_verify', _sign).then(({data}) => {
          _self.verifyModel = data;
          if (!data) {
            throw data;
            _self.loading = false;
          }
          if (data.isabnormalip) {
            return Captcha.init()
              .then((res) => {
                if (res && res.ret == 0) {
                  _sign.randstr = res.randstr;
                  _sign.ticket = res.ticket
                  return true
                } else if (res && res.ret == 2) {
                  throw ''
                }
              })
          } else {
            return true
          }
        }).then((data) => {
          if (data) {
            _self.$router.push({
              name: 'auth',
              params: {
                verifyModel: _self.verifyModel,
                signModel: _sign
              }
            })
          }
        }).catch((res) => {
          _self.state.signin = false;
          _self.loading = false;
        })
      }
    }
  }
</script>
<style lang='less' scoped>
  @import "../static/styles/auth.less";
  
  .auth-content_title {
    margin: 100px 0 10px 0;
  }
  
  .auth-bg {
    position: absolute;
    top: 120px;
    right: 140px;
    width: 420px;
    height: 326px;
  }
  
  .auth-content_group_register_tip {
    font-size: 14px;
    color: #333333;
    width: 400px;
  }
  
  .auth-content_group_register_tip .auth_tip {
    color: @cl_link;
    cursor: pointer;
  }
  
  .auth-content_title_tip_auth {
    background: rgba(241, 244, 248, 1);
    border-radius: 4px;
    border: 1px solid rgba(221, 221, 221, 1);
    height: 30px;
    line-height: 30px;
    color: #333333;
    width: 220px;
    font-size: 14px;
    display: inline-block;
    margin-top: 10px;
    .lock {
      background-image: url("../static/images/lock.svg");
      background-size: 12px 14px;
      background-repeat: no-repeat;
      display: inline-block;
      width: 12px;
      height: 14px;
      vertical-align: middle;
      margin-left: 10px;
      margin-right: 5px;
      padding-right: 20px;
      border-right: 1px solid #A8B0C0;
    }
    .line {
      display: inline-block;
      width: 1px;
      margin: 0 10px;
      color: #A8B0C0;
    }
    .http {
      color: #079c04;
    }
  }

</style>
<template>
  <div class="hex-flex">
    <div class="auth hex-flex_auto">
      <div class="auth-content">
        <p class="auth-content_title">{{$t("login.title")}} HEX</p>
        <p class="auth-content_title_tip">{{$t("login.visit")}} https://www.hex.com</p>
        <div class="auth-content_title_tip_auth">
          <span class="lock"></span>
          <span class="http">https://</span>www.hex.com
        </div>
        <div class="auth-content_form">
          <div class="auth-content_group"
               :class="{'auth-content_group--error':$v.signModel.username.$error}">
            <p class="title">
              <span>{{$t("login.account")}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.signModel.username.required">{{$t("login.accountNo")}}</span>
            </p>
            <input class="input ipt_hover"
                   v-focus
                   v-model.trim="signModel.username"
                   :placeholder="$t('login.userLoginAccount')" type="text">
          </div>
          <div class="auth-content_group"
               :class="{'auth-content_group--error':$v.signModel.password.$error}">
            <p class="title">
              <span>{{$t("login.password")}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.signModel.password.required">{{$t("login.passwordNo")}}</span>
            </p>
            <input class="input ipt_hover"
                   v-model.trim="signModel.password"
                   :placeholder="$t('login.userLoginPassword')"
                   @keyup.enter="signIn"
                   type="password">
          </div>
          <div class="auth-content_button button-loading--por"
               v-loading="loading"
               @click="signIn">
            {{$t("login.login")}}
          </div>
          <div class="auth-content_group_register_tip clearfix">
            <nuxt-link to="/reset-password" class="auth_tip left" tag="span"> {{$t("login.forgetPassword")}}?
            </nuxt-link>
            <span class="right"> {{$t("login.noAccount")}}?<nuxt-link to="/register" class="auth_tip" tag="span">{{$t("login.register")}}</nuxt-link></span>
          </div>
        </div>
        <img class="auth-bg" src="~/static/images/user/exchange.png" alt="">
      </div>
    </div>
  </div>

</template>
