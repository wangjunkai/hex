<template>
  <div class='change-password w990'>
    <div class='common-head'>
      <span class='goback' @click="goback"></span>
      <span>{{$t('security.paypassword')}}</span>
    </div>
    <div class='google-countant'>
      <div class='validation-area change-password-area'>
        <div class='hint-text'>
          <div class="auth-content_group"
               :class="{'auth-content_group--error':$v.modifyPayPassword.paypassword.$error}">
            <p class="title clearfix">
              <span class="left">{{$t('security.paypassword')}}</span>
              <span class="normal-tip right"
                    v-if="!$v.modifyPayPassword.paypassword.$error">{{$t('formMenu.passwordCombination')}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.modifyPayPassword.paypassword.required">{{$t('formMenu.payPasswordNone')}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.modifyPayPassword.paypassword.minLength">{{$t('formMenu.payPasswordL')}}{{$v.modifyPayPassword.paypassword.$params.minLength.min}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.modifyPayPassword.paypassword.maxLength">{{$t('formMenu.payPasswordG')}}{{$v.modifyPayPassword.paypassword.$params.maxLength.max}}</span>
            </p>
            <div class="password_group">
              <input class="input"
                     v-model.trim="$v.modifyPayPassword.paypassword.$model"
                     :placeholder="$t('formMenu.modifyPayPassword')"
                     type="password">
              <span class="password_group_tip" v-if="!$v.modifyPayPassword.paypassword.$error">
                <span class="password_group_tip week"
                      v-show="modifyPayPassword.paypasswordstrength==1">{{$t('formMenu.passwordWeak')}}</span>
                <span class="password_group_tip middle"
                      v-show="modifyPayPassword.paypasswordstrength==2">{{$t('formMenu.passwordMiddle')}}</span>
                <span class="password_group_tip strong"
                      v-show="modifyPayPassword.paypasswordstrength==3">{{$t('formMenu.passwordStrong')}}</span>
              </span>
            </div>
          </div>
          <div class="auth-content_group"
               :class="{'auth-content_group--error':$v.modifyPayPassword.passwordagain.$error}">
            <p class="title clearfix">
              <span class="left">{{$t('formMenu.payPasswordConfirm')}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.modifyPayPassword.passwordagain.sameAsPassword">{{$t('formMenu.passwordInconformity')}}</span>
            </p>
            <input class="input"
                   v-model.trim="$v.modifyPayPassword.passwordagain.$model"
                   :placeholder="$t('formMenu.payPasswordAgain')"
                   type="password">
          </div>
          <div class="auth-content_group"
               :class="{'auth-content_group--error':$v.modifyPayPassword.password.$error}">
            <p class="title clearfix">
              <span class="left">{{$t('formMenu.loginPassword')}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.modifyPayPassword.password.required">{{$t('login.loginPasswordNone')}}</span>
            </p>
            <input class="input"
                   :placeholder="$t('login.userLoginPassword')"
                   type="password"
                   @keyup.enter="confirm"
                   v-model.trim="$v.modifyPayPassword.password.$model">
          </div>
          <button class='commitBtn button-loading--por'
                  v-loading="loading"
                  @click="confirm">{{$t('formMenu.determine')}}</button>

        </div>
      </div>
    </div>
    <suggest/>
  </div>
</template>
<script>
  import suggest from './setting-suggest'
  import {
    required,
    email,
    sameAs,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'
  import crypto from "@/plugins/axios/crypto";

  export default {
    name: 'Home',
    components: {suggest},
    watch: {
      'modifyPayPassword.paypassword': function (val) {
        const _modifyPayPassword = this.modifyPayPassword
        if (this.reg.strong.test(val)) {
          _modifyPayPassword.passwordstrength = 3
        } else if (this.reg.middle.test(val)) {
          _modifyPayPassword.passwordstrength = 2
        } else if (this.reg.single.test(val)) {
          _modifyPayPassword.passwordstrength = 1
        } else {
          _modifyPayPassword.passwordstrength = 0
        }
      }
    },
    validations: {
      modifyPayPassword: {
        password: {
          required
        },
        paypassword: {
          required,
          minLength: minLength(8),
          maxLength: maxLength(20)
        },
        passwordagain: {
          sameAsPassword: sameAs('paypassword')
        }
      },
    },

    data() {
      return {
        loading:false,
        submitState: false,
        verfiy: false,
        reg: {
          single: /^((?=.*[a-z])|(?=.*[A-Z])|(?=.*[0-9]))(?=.{8,})/g,
          middle: /^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[A-Z])))(?=.{8,})/g,
          strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*`~()_=/])(?=.{8,})/g
        },
        //注册model
        modifyPayPassword: {
          password: "",
          paypassword: '',
          passwordagain: '',
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      if (!to.params.result) {
        next('/person/security')
      } else {
        next((vm) => {
          vm.verfiy = to.params.result
        })
      }
    },
    methods: {
      goback(){
        this.$router.go(-1);
      },
      confirm() {
        const _self = this;
        const _modify = this.$v.modifyPayPassword;
        _modify.$touch();
        if (_modify.$invalid) return;
        if (_self.submitState) return;
        _self.loading=true;
        _self.submitState = true;
        const password = crypto.md5String(this.modifyPayPassword.password);
        const paypassword = crypto.md5String(this.modifyPayPassword.paypassword);
        _self.$store.dispatch('user_user_paypassword_set', {
          password: password,
          paypassword: paypassword
        }).then((resoult) => {
          if (resoult.data) {
            this.global_refresh_user_info();
            this.$store.commit('set_message', {type: 'ok', text: resoult.msg});
            this.$router.push('/person/security');
          }else{
            _self.submitState = false;
            _self.loading=false;
          }
        })
      }
    },
  }

</script>
<style lang='less' scoped>
  @import '../../../static/styles/auth';
  button.commitBtn.bg_bbb {
    background: #bbb !important;
  }
  .change-password {
    .google-countant {
      background: white;
      padding: 0px 20px 30px;
      box-sizing: border-box;
      overflow: hidden;
      margin-bottom: 10px;
    }
  }

  .google-hint {
    overflow: hidden;
    padding-left: 26px;
  }

  .hint-text {
    padding: 0px 20px 0px;
    color: @cl_666;
    font-size: 14px;
  }
</style>
