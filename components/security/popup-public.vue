<template>
  <div class='popup'>
    <div class="mask"></div>
    <div class='mask-content'>
      <div class="head">
        <span class="tip">{{$t('formMenu.safety')}}</span>
        <span class="close" @click='close(1)'>
          <img src="@/static/images/an_close.png" alt="">
        </span>
      </div>
      <div class='info'>

        <div class="auth-content_group auth-content_group_code"
             v-if="$userinfo.isphoneauthed"
             :class="{'auth-content_group--error':$v.smsverifycode.$error}">
          <div class="title clearfix">
            <p class="titlePhone">
              <span class="left">{{$t('formMenu.phoneCodeVerification')}}</span>
              <span class=" right">{{global_string_split($userinfo.phone)}}</span>
            </p>
            <p class="fr">
              <span class="normal-tip_error right"
                    v-if="!$v.smsverifycode.required">{{$t('formMenu.phoneCodeVerificationNone')}}</span>
            </p>
          </div>
          <div class="auth-content_group_mail">
            <input class="input"
                   v-model.trim="$v.smsverifycode.$model"
                   :placeholder="$t('formMenu.phoneInputVerification')"
                   type="text">
            <verifycode ref="phone" :phone="$userinfo.phone" :template="template"></verifycode>

          </div>
        </div>
        <div class="auth-content_group auth-content_group_code"
             v-if="$userinfo.isemailauthed"
             :class="{'auth-content_group--error':$v.emailverifycode.$error}">
          <div class="title clearfix">
            <p class="titlePhone">
              <span class="left">{{$t('formMenu.emailCodeVerification')}}</span>
              <span class=" right">{{global_string_split($userinfo.email)}}</span>
            </p>
            <p class="fr">
              <span class="normal-tip_error right"
                    v-if="!$v.emailverifycode.required">{{$t('formMenu.emailCodeVerificationNone')}}</span>
            </p>

          </div>
          <div class="auth-content_group_mail">
            <input class="input"
                   v-model.trim="$v.emailverifycode.$model"
                   :placeholder="$t('formMenu.emialInputVerification')"
                   type="text">
            <verifycode ref="email" :email="$userinfo.email" :template="template"></verifycode>
          </div>
        </div>
        <div v-if="isGoogle">
          <div class="auth-content_group auth-content_group_code"
               v-if="$userinfo.isopengoogleverify "
               :class="{'auth-content_group--error':$v.googleverifycode.$error}">
            <p class="title clearfix googles">
              <span class="left">{{$t('formMenu.googleCodeVerification')}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.googleverifycode.required">{{$t('formMenu.googleCodeVerificationNone')}}</span>
            </p>
            <div class="auth-content_group_mail nota">
              <input class="input"
                     v-model.trim="$v.googleverifycode.$model"
                     :placeholder="$t('formMenu.googleInputVerification')"
                     keyup.enter="open(0)"
                     type="text">
            </div>
          </div>
        </div>
        <button class='commitBtn button-loading--por'
                v-loading="loading"
                @click='open(0)'>{{$t('formMenu.confirm')}}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
  import {required} from 'vuelidate/lib/validators'
  import verifycode from '@/components/public/verifycode'

  export default {
    name: "popup",
    props: {
      template: {
        type: String,
        default: 'Default'
      },
    },
    components: {
      verifycode
    },
    validations: {
      emailverifycode: {
        required
      },
      smsverifycode: {
        required
      },
      googleverifycode: {
        required
      }
    },
    data() {
      return {
        loading: false,
        submitState: false,
        loginInfo: {},
        isGoogle: '',
        sendModel: {
          template: 'Default'
        },
        emailverifycode: '',
        smsverifycode: '',
        googleverifycode: '',
        state: {
          tab: 'phone',
          phone: {
            state: false,
            sendDelay: this.$t('formMenu.getCode')
          },
          email: {
            state: false,
            sendDelay: this.$t('formMenu.getCode')
          }
        }
      };
    },
    mounted() {
      this.loginInfo = this.$userinfo;
    },
    methods: {
      resetvalidateWhite() {
        this.emailverifycode = '';
        this.smsverifycode = '';
        this.googleverifycode = '';
        this.$v.$reset();
      },
      isgooglepopup(val) {
        this.isGoogle = val;
      },
      open() {
        const _user = this.$userinfo;
        if (_user.isphoneauthed && _user.isemailauthed && _user.isopengoogleverify) {
          this.$v.smsverifycode.$touch();
          this.$v.emailverifycode.$touch();
          if (this.isGoogle) {                    //是否有谷歌输入框
            this.$v.googleverifycode.$touch();
            if (this.$v.googleverifycode.$invalid) return
          }
          if (this.$v.smsverifycode.$invalid || this.$v.emailverifycode.$invalid) {
            return;
          }
        } else if (_user.isopengoogleverify && _user.isphoneauthed) {
          this.$v.smsverifycode.$touch();
          if (this.isGoogle) {
            this.$v.googleverifycode.$touch();
            if (this.$v.googleverifycode.$invalid) {
              return;
            }
          }
          if (this.$v.smsverifycode.$invalid) {
            return;
          }
        } else if (_user.isopengoogleverify && _user.isemailauthed) {
          this.$v.emailverifycode.$touch();
          if (this.isGoogle) {//是否有谷歌输入框
            this.$v.googleverifycode.$touch();
            if (this.$v.googleverifycode.$invalid) {
              return;
            }
          }
          if (this.$v.emailverifycode.$invalid) {
            return;
          }
        } else if (_user.isphoneauthed && _user.isemailauthed) {
          this.$v.smsverifycode.$touch();
          this.$v.emailverifycode.$touch();
          if (this.$v.smsverifycode.$invalid || this.$v.emailverifycode.$invalid) {
            return;
          }
        } else if (_user.isopengoogleverify) {
          if (this.isGoogle) {
            this.$v.googleverifycode.$touch();
            if (this.$v.googleverifycode.$invalid) {
              return;
            }
          }
        } else if (_user.isphoneauthed) {
          this.$v.smsverifycode.$touch();
          if (this.$v.smsverifycode.$invalid) {
            return;
          }
        } else if (_user.isemailauthed) {
          this.$v.emailverifycode.$touch();
          if (this.$v.emailverifycode.$invalid) {
            return;
          }
        }
        if (this.submitState) return;
        this.submitState = true;
        this.loading = true;
        this.$emit("confirm", this);
      },
      closeloading() {
        this.loading = false;
        this.submitState = false;
      },
      clearstate() {
        this.submitState = false;
        this.loading = false;
      },
      clearTime() {
        if (this.$refs.email) {
          this.$refs.email.clearTime();
        }
        if (this.$refs.phone) {
          this.$refs.phone.clearTime();
        }
      },
      close(val) {
        this.emailverifycode = '';
        this.smsverifycode = '';
        this.googleverifycode = '';
        this.submitState = false;
        this.$v.$reset();
        this.$emit('closepopup')
      }
    },
  };
</script>
<style lang='less' scoped>
  @import "../../static/styles/auth.less";

  button.commitBtn.bg_bbb {
    background: #bbb !important;
  }

  .popup {
    .mask-content {
      .unity {
        margin-top: 30px;
        .google_span {
          line-height: 17px;
          font-size: 12px;
          color: #666;
          margin-bottom: 6px;
        }
      }
    }
  }

  .right {
    float: right !important;
  }

  .head {
    overflow: hidden;
  }

  .auth-content_group_mail .mail_code {
    height: 40px;
  }

  .auth-content_group_mail.nota input {
    width: 400px;
  }

  .auth-content_group.auth-content_group_code .title {
    width: 400px;
    .titlePhone {
      width: 270px;
      float: left;
    }
  }

  .auth-content_group_code .title.clearfix .titlePhone {
    .right {
      color: rgba(187, 187, 187, 1);
    }
    .left {
      color: rgba(102, 102, 102, 1);
    }
  }

  .mask-content .head span.tip {
    color: rgba(51, 51, 51, 1);
    font-weight: 600;
  }

  .auth-content_group.auth-content_group_code .title.googles {
    width: 400px;
  }

  .auth-content_group.auth-content_group_code .title .titlePhone .right {
    float: right;
  }

  .popup .mask-content .title span {
    font-size: 12px;
  }

  .auth-content_group .title {
    margin-bottom: 0;
  }
</style>
