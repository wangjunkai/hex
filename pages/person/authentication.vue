<template>
  <div class='authentication'>
    <div class='authentication-level'>
      <span class='icon_user'></span>
      <span class=' authentication-level-title'>{{$t('authentication.authentication')}}</span>
      <span class='certificationLevel '>{{$t('authentication.certificationLevel')}}：</span>
      <span class='fz12 authentication-level-identifier'>LV.{{state}} </span>
    </div>
    <div class='authentication-grad'>
      <ul>
        <!--1-->
        <li :class='authedState==1?"checked":""'>
          <p :class='authedState==1?"authentication-checked":""'>
            LV.1 {{$t('memberCenter.verifieds')}}</p>
          <p class='mgt10'>{{$t('authentication.limit')}}：
            <span>{{$userinfo.bpiwithdrawbtc}} BTC</span>
          </p>
        </li>
        <!--2-->
        <li :class='authedState==2?"checked":""'>
          <p
            :class='$userinfo.securitylevel==1 && authedState==2?"authentication-checked":""'>
            LV.2 {{$t('memberCenter.verifieds')}}</p>

          <p class='mgt10'>{{$t('authentication.limit')}}：
            <span>{{$userinfo.bpiwithdrawbtc+$userinfo.idaiwithdrawbtc}} BTC</span>
          </p>
        </li>
        <!--3-->
        <li :class='["last",authedState==3?"checked":""]'>
          <p :class='state==3?"authentication-checked":""'>LV.3 {{$t('memberCenter.verifieds')}}</p>
          <p class='mgt10'>{{$t('authentication.Hlimit')}}</p>
        </li>
      </ul>
    </div>
    <!-- 一级认证  -->
    <div class="authLevel" v-hex-loading="loading">
      <div class='authentication-verification-first' v-if="authedState==1">
        <levelauthed1 @getUserInfo="getUserInfo"/>
      </div>
      <!-- 二级认证 -->
      <div v-if="authedState==2">
        <!---idauthauditstate----》-1:未认证过, 0:待审核,1:审核通过,2:审核不通过-->

        <div v-if="auditState==0">
          <div class="wait-audit">
            <h3>LV.2{{$t('memberCenter.verifieds')}}</h3>
            <div class="wait-clock">
              <img src="~/static/images/security/lv2_authed.png" alt="" class="wait-picture">
              <p class="reminder">{{$t('authentication.submitSuccess')}}</p>
              <p class="review-tips">{{$t('authentication.submitSuccessTitle')}}</p>
            </div>
          </div>
        </div>
        <div v-else-if="auditState!=1">
          <levelauthed2 @getUserInfo="getUserInfo"/>
        </div>
      </div>
      <!-- 三级认证 -->
      <div class='authentication-verification-third' v-if='authedState==3'>
        <p class='verifieds'> Lv.3{{$t('memberCenter.verifieds')}}</p>
        <div class='service'>
          <div class='service-image'></div>
          <button @click="openService">{{$t('authentication.relation')}}</button>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import articles from './security/index'
  import verifycode from "@/components/public/verifycode.vue";
  import levelauthed1 from './level1-authentication'
  import levelauthed2 from './level2-authentication'
  import {required} from 'vuelidate/lib/validators'

  export default {
    name: "authentication",
    components: {
      articles, verifycode, levelauthed2, levelauthed1
    },
    validations: {
      email: {
        emailverifycode: {//邮箱 验证码
          required
        },
        emailAddress: {//邮箱号码
          required
        }
      },
      phone: {
        telNumber: {//手机号码
          required
        },
        phoneverifycode: {//手机验证码
          required
        }
      },
      googleverifycode: {//谷歌验证码
        required
      }
    },
    data() {
      return {
        loading: false,
        googleverifycode: '',
        phone: {
          telNumber: '',
          phoneverifycode: ''
        },
        email: {
          emailAddress: '',
          emailverifycode: ''
        },
        state: 0,
        certificate: '1',
        nationSelected: '0',
        authedState: 0,//认证状态  1：一级认证
        auditState: '',
      }
    },
    created() {
    },
    mounted() {
      this.loading = true;
      this.getUserInfo();
    },
    methods: {
      openService() {
        _MEIQIA('showPanel');
      },
      getUserInfo() {
        this.$store.dispatch("user_user").then(({data}) => {
          if (data) {
            this.state = data.securitylevel;
            if (data.securitylevel == 2 && data.idauthauditstate == 1) {
              this.authedState = 3;
            } else if (data.securitylevel == 2||(data.securitylevel == 1 && data.isphoneauthed)) {
              this.authedState = 2;
            } else {
              this.authedState = 1;
            }
            this.auditState = data.idauthauditstate;
            this.$store.commit('set_server_user_info', data);
            this.loading = false;
          }
        })
      },
      submits() {
        let postData;
        if (this.$userinfo.isopengoogleverify) {
          const _google = this.$v.googleverifycode;
          _google.$touch();
          if (_google.$invalid) return;
        }
        if (this.$userinfo.isemailauthed) { //已绑定邮箱
          const _phone = this.$v.phone;
          _phone.$touch();
          this.$v.email.emailverifycode.$touch();
          if (_phone.$invalid) return;
          if (this.$v.email.emailverifycode.$invalid) return;
          postData = {
            authtype: 'AuthPhone',
            account: this.phone.telNumber,
            emailverifycode: this.email.emailverifycode,
            smsverifycode: this.phone.phoneverifycode
          }
          if (this.$userinfo.isopengoogleverify) {
            postData.googleverifycode = this.googleverifycode;
          }
        } else if (this.$userinfo.isphoneauthed) {//已绑定手机
          const _email = this.$v.email;
          _email.$touch();
          this.$v.phone.phoneverifycode.$touch();
          if (_email.$invalid) return;
          if (this.$v.phone.phoneverifycode.$invalid) return;
          postData = {
            authtype: 'AuthEmail',
            account: this.email.emailAddress,
            emailverifycode: this.email.emailverifycode,
            smsverifycode: this.phone.phoneverifycode
          }
          if (this.$userinfo.isopengoogleverify) {
            postData.googleverifycode = this.googleverifycode;
          }
        }
        this.$store.dispatch("user_user_auth", postData).then((res) => {
          if (res.data) {
            this.$store.commit('set_message', {type: 'ok', text: res.msg});
            this.$store.commit('set_user_info', res)
          }
        })
      },
    }
  };


</script>

<style lang='less' scoped>
  @import "../../static/styles/auth.less";

  .certificationLevel {
    font-size: 14px;
  }

  .wait-audit {
    background: white;
    padding: 18px 20px;
    height: 580px;
    h3 {
      font-size: 16px;
    }
    .wait-clock {
      width: 286px;
      margin: 100px auto 0;
      img {
        width: 100%;
        height: auto;
        display: block;
      }
      .reminder {
        margin-top: 20px;
        text-align: center;
        font-size: 18px;
        color: rgba(51, 51, 51, 1);
        font-weight: 600;
      }
      .review-tips {
        margin-top: 10px;
        text-align: center;
        font-size: 14px;
        color: rgba(144, 148, 164, 1);
        line-height: 22px;
      }
    }

  }

  .authentication {
    width: 990px;
    float: right;
    .authentication-level {
      overflow: hidden;
      line-height: 36px;
      padding: 16px 20px;
      box-sizing: border-box;
      background: white;
      margin-bottom: 10px;
      padding: 16px 20px;
      color: #333;
      .icon_user {
        float: left;
        width: 36px;
        height: 36px;
        background: url('../../static/images/security/an_big_user@2x.svg') no-repeat center center;
        background-size: 36px 36px;
      }
      span {
        display: inline-block;
      }
      .authentication-level-title {
        font-size: 18px;
        margin: 0 20px;
        font-weight: bold;
      }
      .authentication-level-identifier {
        width: 36px;
        height: 17px;
        line-height: 17px;
        color: white;
        background: #f5a623;
        text-align: center;
      }
    }
  }

  .authentication-grad {
    background: white;
    ul {
      overflow: hidden;
      height: 80px;
      li {
        float: left;
        width: 329px;
        height: 80px;
        padding: 14px;
        box-sizing: border-box;
        border-right: 1px solid rgba(133, 131, 172, 0.2);
        border-bottom: 1px solid rgba(133, 131, 172, 0.2);
        p {
          text-align: center;
        }
        p:first-child {
          font-size: 16px;
          color: #333;
        }
        p:last-child {
          font-size: 14px;
          color: #666;
        }
        p.authentication-checked {
          color: @cl_link;
        }
      }
      li.last {
        width: 332px;
        border-right: none;
      }
      li.checked {
        color: @cl_link;
        border-bottom: 3px solid @cl_link;
      }
    }
  }

  .authentication-verification-third {
    background: white;
    padding: 18px 20px 10px;
    .verifieds {
      font-size: 16px;
      font-weight: bold;
    }
    .authentication-second-countant {
      margin: 30px 0 0 76px;
    }
  }

  .authentication-verification-third {
    height: 660px;
    .service {
      width: 220px;
      margin: 90px auto 0;
      .service-image {
        width: 220px;
        height: 220px;
        background: url("../../static/images/kf.jpg") no-repeat center center;
        background-size: 220px 220px;
      }
      button {
        width: 160px;
        height: 40px;
        display: block;
        line-height: 40px;
        background: @cl_link;
        color: white;
        text-align: center;
        margin: auto;
        font-size: 14px;
      }
    }
  }

  .authLevel {
    background: white;
    position: relative;
    min-height: 400px;
  }

</style>
