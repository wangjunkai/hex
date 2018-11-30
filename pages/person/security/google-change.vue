<template>
  <div class='changegoogle w990'>
    <div class='common-head'>
      <span class='goback' @click="goback"></span>
      <span>{{$t('google.changeGoogle')}}</span>
    </div>
    <div class='google-countant'>
      <div class='backups'>
        <div class='google-hint mgb20'>
          <span class='red-reg hints'>{{$t('google.forbid')}}</span>
        </div>
        <div class='google-hint mgb20'>
          <span class='mgl26'>{{$t('google.addSecretBackups')}}</span>
        </div>
        <div class='hint-text '>
          <p class='mgt20 '>{{$t('google.scan')}}</p>
          <p class='red-reg mgb20 '>{{$t('google.saveKey')}}</p>
          <div class='google-code'>
            <div class='google-qrcode'>
              <!--<img :src="secretKey.qrcode" alt="">-->
              <img :src='qrcode' :title="bindGoogleData.provisionurl" alt="">
            </div>
            <div class='secret-key'>
              <span>{{$t('google.key')}}：</span>
              <span v-if="encsecretkey" id='keycopy' class='secret-key-code'>{{encsecretkey}}</span>
              <span class='secret-keycopy'
                    data-clipboard-target="#keycopy"
                    @click="copy">{{$t('google.copy')}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class='validation-area'>
        <div class='hint-text'>
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
              <verifycode :phone="$userinfo.phone" :template="'GoogleVerifySettingsChanged'"></verifycode>
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
              <verifycode :email="$userinfo.email" :template="'GoogleVerifySettingsChanged'"></verifycode>
            
            </div>
          </div>
          <div class="auth-content_group auth-content_group_code"
               v-if="$userinfo.isopengoogleverify"
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
                     type="text"
                     @keyup.enter="open(0)">
            </div>
          </div>
          <button class='commitBtn button-loading--por'
                  v-loading="loading"
                  @click='open(0)'>{{$t('formMenu.bindding')}}
          </button>
        </div>
      </div>
    </div>
    <suggest/>
  </div>
</template>
<script>
  import suggest from './setting-suggest'
  import {required, email, sameAs} from 'vuelidate/lib/validators'
  import Clipboard from 'clipboard';
  import verifycode from '@/components/public/verifycode'
  import QRcode from 'qrcode'
  
  
  export default {
    name: "google-change",
    components: {
      suggest,
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
        emailverifycode: '',
        smsverifycode: '',
        googleverifycode: '',
        secretKey: '',
        bindGoogleData:{},
        encsecretkey:'',
        qrcode: '',
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
    // async asyncData({store, params}) {
    //   const {data} = await store.dispatch('user_ga_create')
    //   return {secretKey: data}
    // },
    mounted() {
      this.$store.dispatch('user_ga_create')
        .then((res) => {
          if (res.data) {
            this.bindGoogleData = res.data;
            this.secretKey = this.bindGoogleData['secretkey'];
            this.encsecretkey=this.bindGoogleData['encsecretkey'];//长
            this.getCode();
          }
        })
    },
    methods: {
      goback() {
        this.$router.go(-1);
      },
      getCode() {
        QRcode.toDataURL(this.bindGoogleData.provisionurl).then((url) => {
          this.qrcode = url
        })
      },
      open() {
        const _self = this;
        let postData = {};
        if (_self.$userinfo.isphoneauthed && _self.$userinfo.isemailauthed && _self.$userinfo.isopengoogleverify) {//三步验证
          _self.$v.smsverifycode.$touch();
          _self.$v.emailverifycode.$touch();
          _self.$v.googleverifycode.$touch();
          if (_self.$v.smsverifycode.$invalid || _self.$v.emailverifycode.$invalid || _self.$v.googleverifycode.$invalid) {
            return;
          }
          postData = {
            authtype: 'AuthGoogle',
            account: _self.bindGoogleData.secretkey,
            smsverifycode: _self.smsverifycode,
            emailverifycode: _self.emailverifycode,
            googleverifycode: _self.googleverifycode
          }
        } else if (_self.$userinfo.isphoneauthed && _self.$userinfo.isopengoogleverify) {//手机和谷歌
          _self.$v.smsverifycode.$touch();
          _self.$v.googleverifycode.$touch();
          if (_self.$v.smsverifycode.$invalid || _self.$v.googleverifycode.$invalid) {
            return;
          }
          postData = {
            authtype: 'AuthGoogle',
            account: _self.bindGoogleData.secretkey,
            smsverifycode: _self.smsverifycode,
            googleverifycode: _self.googleverifycode
          }
        } else if (_self.$userinfo.isemailauthed && _self.$userinfo.isopengoogleverify) {//邮箱和谷歌
          _self.$v.emailverifycode.$touch();
          _self.$v.googleverifycode.$touch();
          if (_self.$v.emailverifycode.$invalid || _self.$v.googleverifycode.$invalid) {
            return;
          }
          postData = {
            authtype: 'AuthGoogle',
            account: _self.bindGoogleData.secretkey,
            emailverifycode: _self.emailverifycode,
            googleverifycode: _self.googleverifycode
          }
        }
        if (this.submitState) return;
        this.submitState = true;
        this.loading = true;
        this.$store.dispatch('user_user_auth', postData).then((res) => {
          if (res.data) {
            this.global_refresh_user_info();
            this.$store.commit('set_message', {type: 'ok', text: res.msg});
            this.$router.push("/person/security");
          } else {
            this.submitState = false;
            this.loading = false;
          }
        });
      },
      copy() {
        var clipboard = new Clipboard('.secret-keycopy');
        clipboard.on('success', e => {
          this.$store.commit('set_message', {type: 'right', text: this.$t('patch.copysuccess')})
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          this.$store.commit('set_message', {type: 'error', text: '复制失败'})
          clipboard.destroy()
        })
      }
      
    }
  };

</script>

<style lang='less' scoped>
  @import "../../../static/styles/auth.less";
  
  @bg_858: #8583ac;
  @cl_333: #333;
  @cl_cd4: #cd4559;
  @cl_666: #666;
  .mgl26 {
    margin-left: 26px;
  }
  button.commitBtn.bg_bbb {
    background: #bbb !important;
  }
  .changegoogle {
    .google-countant {
      background: white;
      padding: 20px 20px 30px;
      box-sizing: border-box;
      overflow: hidden;
      margin-bottom: 10px;
    }
  }
  
  .google-hint {
    overflow: hidden;
    span {
      float: left;
      font-size: 14px;
      color: #333;
      font-weight: bold;
    }
    .hints {
      padding-left: 26px;
      background: url('../../../static/images/security/hint.png') no-repeat left center;
    }
    .tag {
      width: 16px;
      height: 16px;
      margin-right: 10px;
      color: white;
      background: #8583ac;
      text-align: center;
      font-size: 12px;
      line-height: 16px;
    }
  }
  
  .validation-area {
    padding-top: 10px;
  }
  
  .hint-text {
    padding: 0px 26px 0px;
    color: @cl_666;
    font-size: 14px;
    p {
      line-height: 20px;
    }
    .download-link {
      margin-top: 20px;
      button {
        width: 136px;
        height: 40px;
        background: @cl_link;
        color: white;
        margin-right: 20px;
        text-align: left;
        padding-left: 49px;
      }
      button:last-child {
        padding-left: 44px;
      }
    }
  }
  
  .backups {
    overflow: hidden;
    .google-code {
      overflow: hidden;
      height: 116px;
      margin-top: 20px;
      div {
        float: left;
      }
      .google-qrcode {
        width: 116px;
        height: 116px;
        margin-right: 20px;
        background: gray;
      }
      .secret-key {
        position: relative;
        bottom: -90px;
      }
    }
  }
  
  .secret-key-code {
    margin-right: 20px;
  }
  
  .secret-keycopy {
    color: @cl_link;
  }
  
  .red-reg {
    color: @cl_cd4 !important;
  }
  
  .input-field {
    width: 400px;
    margin-top: 6px;
  }
  
  .mgb0 {
    margin-bottom: 0;
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
  
  .auth-content_group.auth-content_group_code .title.googles {
    width: 400px;
  }
  
  .popup .mask-content .title span {
    font-size: 12px;
  }
  
  .auth-content_group .title {
    margin-bottom: 0;
  }
</style>
