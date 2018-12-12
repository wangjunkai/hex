<template>
  <div class='setting fr'>
    <popuppassword
      @closepopup='popups()'
      @confirm="confirm"
      v-show="popupstate"
      ref="child"
    />
    <h2 class="setting-title">
      {{$t('person.settings')}}
    </h2>
    <div class="setting-verify">
      <div class='setting-safety'>
        <h3>UID：{{global_get_uid($userinfo.uid)}}</h3>
        <div class='setting-safety-rank'>
          <div class='rating-prompt'>
            <span>{{$t('memberCenter.safetyClass')}}：</span>
            <div class='secure' v-if="security==1">
              <span class='sureness'></span>
              <span class=''></span>
              <span class=''> </span>
            </div>
            <div class='secure' v-if="security==2">
              <span class='centre'></span>
              <span class='centre'></span>
              <span class=''> </span>
            </div>
            <div class='secure' v-if="security==3">
              <span class='tall'></span>
              <span class='tall'></span>
              <span class='tall'> </span>
            </div>
            <span class='safety' v-if="security==1">{{$t('formMenu.passwordWeak')}}</span>
            <span class='strength_centre' v-if="security==2">{{$t('formMenu.passwordMiddle')}}</span>
            <span class='safety_tall' v-if="security==3">{{$t('formMenu.passwordStrong')}}</span>
          
          </div>
          <span v-if="!$userinfo.isopengoogleverify">{{$t('memberCenter.suggestOpenGoogle')}}</span>
        </div>
      </div>
      <div class='setting-tab'>
        <ul>
          <li class='ovh'>
            <div class='setting-tab-left fl  loginPassword'>
              <span class='setting-tab-name'>
              {{$t('security.loginPassword')}}
              </span>
              <span class='setting-tab-password'>
                ********
              </span>
            </div>
            <div class='setting-tab-right fl ovh'>
              <span class='setting-tab-hint fl'>{{$t('security.loginUse')}}</span>
              <span class='setting-tab-isopen fr www'>
                <nuxt-link to='/person/security/password-change'>{{$t('memberCenter.modifyPassword')}}</nuxt-link>
              </span>
            </div>
          </li>
          <li class='ovh'>
            <div class='setting-tab-left fl note' :class="$userinfo.isphoneauthed?'check':''">
              <span class='setting-tab-name'>
               {{$t('formMenu.noteInputVerification')}}
              </span>
              <span class='setting-tab-password'>
                {{$userinfo.isphoneauthed?global_string_split($userinfo.phone):""}}
              </span>
            </div>
            <div class='setting-tab-right fl ovh '>
              <span
                class='setting-tab-hint fl'>{{$t('formMenu.noteInputVerification')}}{{$t('security.noteLoginTip')}}</span>
              <div class='setting-tab-isopen fr'>
                <!--<span class='fl combined gray'> {{$userinfo.phone?"修改":""}}</span>-->
                <span class='mgl20 fr' @click="openEmail('phone')">{{$userinfo.isphoneauthed?$t('formMenu.open'):$t('formMenu.notOpenAuthod')}}</span>
              
              </div>
            </div>
          </li>
          <li class='ovh'>
            <div class='setting-tab-left email fl'
                 :class="$userinfo.isemailauthed?'check':''">
              <span class='setting-tab-name'>
               {{$t('formMenu.emailAuthentication')}}
              </span>
              <span class='setting-tab-password'>
                {{$userinfo.isemailauthed?global_string_split($userinfo.email):""}}
              </span>
            </div>
            <div class='setting-tab-right fl ovh'>
              <span
                class='setting-tab-hint fl'>{{$t('formMenu.emailAuthentication')}}{{$t('security.noteLoginTip')}}</span>
              <div class='setting-tab-isopen fr'>
                <span
                  @click="openEmail('email')"
                  class='mgl20 fr '>{{$userinfo.isemailauthed?$t('formMenu.open'):$t('formMenu.notOpen')}}</span>
              
              </div>
            </div>
          </li>
          <li class='ovh'>
            <div class='setting-tab-left fl google'
                 :class="$userinfo.isgoogleauthed?'check':''">
              <span class='setting-tab-name google'>
               {{$t('formMenu.googleAuthentication')}}
              </span>
              <span class='setting-tab-password'>
              </span>
            </div>
            <div class='setting-tab-right fl ovh'>
              <span class='setting-tab-hint fl'>{{$t('security.jbindgoogle')}}</span>
              <span @click="openGoogle" class='setting-tab-isopen fr mgl20 '>
                  {{$userinfo.isgoogleauthed?$t('formMenu.open'):$t('formMenu.notOpenAuthod')}}
                </span>
              <span v-if="$userinfo.isgoogleauthed">
                <nuxt-link to="/person/security/google-change" class='fr  combined gray cursor'>{{$userinfo.isgoogleauthed?$t('security.modify'):""}}</nuxt-link>
              </span>
            </div>
          </li>
          <li class='ovh'>
            <div class='setting-tab-left fl capital'
                 :class="$userinfo.isopenpaypassword?'check':''">
              <span class='setting-tab-name'>
                {{$t('security.paypassword')}}
              </span>
              <span class='setting-tab-password'>
              </span>
            </div>
            <div class='setting-tab-right fl ovh'>
              <span class='setting-tab-hint fl'>{{$t('security.payPasswordTip')}} </span>
              <span class='setting-tab-isopen fr paypassword'
                    @click="setCapital(1)"
              >{{$userinfo.isopenpaypassword?$t('formMenu.open'):$t('formMenu.notOpenAuthod')}}
              </span>
              <span v-if='$userinfo.isopenpaypassword'
                    @click="capital(1)"
                    class='fr  combined gray cursor'>{{$userinfo.isopenpaypassword?$t('security.modify'):""}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <suggest/>
  </div>
</template>
<script>
  import suggest from './setting-suggest'
  import popuppassword from '@/components/security/popup-capital-password'
  
  export default {
    components: {
      suggest, popuppassword
    },
    data() {
      return {
        popupstate: 0,
        isGooglePopup: true,
        security: 0
      }
    },
    mounted() {
      //安全等级判断
      const _userInfo = this.$userinfo;
      if (_userInfo.isopenpaypassword && _userInfo.isphoneauthed && _userInfo.isopengoogleverify && _userInfo.isemailauthed) {
        this.security = 3;
      } else if ((_userInfo.isopengoogleverify && _userInfo.isemailauthed) || (_userInfo.isphoneauthed && _userInfo.isopengoogleverify)) {
        this.security = 2;
      } else {
        this.security = 1;
      }
    },
    methods: {
      popups(val) {
        this.popupstate = val;
      },
      setCapital(val) {
        if (this.$userinfo.isopenpaypassword) {
          return;
        } else {
          this.capital(val);
        }
      },
      capital(val) {
        this.popupstate = val;
        this.$refs.child.isgooglepopup(true);
      },
      confirm(_this) {
        const _self = this;
        const childThis = _this;
        
        if (childThis.moneyState) return;
        
        Promise.resolve()
          .then(() => {
            if (this.$userinfo.isphoneauthed) {
              return _self.$store.dispatch('user_sms_verfiycode_check', {
                phone: childThis.loginInfo.phone,
                verifycode: childThis.smsverifycode
              })
            } else if (this.$userinfo.isemailauthed) {
              return _self.$store.dispatch('user_email_verfiycode_check', {
                email: childThis.loginInfo.email,
                verifycode: childThis.emailverifycode
              })
            } else if (this.$userinfo.isopengoogleverify) {
              return this.$store.dispatch('user_google_verfiycode_check', {
                googlesecretkey: this.$userinfo.googlesecretkey,
                verifycode: childThis.googleverifycode
              })
            }
          })
          .then(({data}) => {
            if (!data) {
              throw false
            }
            childThis.moneyState = false
            this.$router.push({name: "person-security-password-capital", params: {result: true}});
            _self.$refs.child.closeloading();
          })
          .catch((e) => {
            _self.$refs.child.closeloading();
          })
        
      },
      openEmail(val) {
        const userInfo = this.$userinfo;
        if (val == "phone") {
          if (!userInfo.isphoneauthed) this.$router.push("/person/security/binding-mobile");
        } else if (val == "email") {
          if (!userInfo.isemailauthed) this.$router.push("/person/security/binding-email-google");
        }
        
      },
      openGoogle() {
        if (!this.$userinfo.isopengoogleverify) {
          this.$router.push("/person/security/google");
        }
      },
      changeGoogle() {
        this.$router.push("/person/security/google-change");
      }
    },
  };
</script>
<style lang='less' scoped>
  @import "../../../static/styles/color";
  
  @cl_333: #333333;
  @cl_999: #999;
  @bg_ea0: #ea003d;
  @cl_cd4: #cd4559;
  @bg_f5a: #F5A623;
  @bg_46b: #46B05D;
  .setting-tab-isopen.fr.paypassword {
    margin-left: 20px;
  }
  
  .setting {
    width: 990px;
    .setting-title {
      height: 68px;
      line-height: 68px;
      font-size: 18px;
      padding-left: 76px;
      font-weight: 900;
      margin-bottom: 10px;
      background: white url("../../../static/images/security/an_big_safe@2x.svg") no-repeat 20px center;
      background-size: 36px 36px;
    }
    .setting-verify {
      height: 499px;
      background: white;
      margin-bottom: 10px;
      padding: 20px;
      box-sizing: border-box;
      .setting-safety {
        border-bottom: 1px solid rgba(133, 131, 172, 0.2);
        overflow: hidden;
        h3 {
          font-weight: 700;
        }
        .setting-safety-rank {
          font-size: 14px;
          color: @cl_999;
          margin: 20px 0 30px 0;
          .secure {
            display: inline-block;
            overflow: hidden;
            margin: 0 10px;
            position: relative;
            top: 3px;
            span {
              float: left;
              width: 60px;
              height: 16px;
              background: #eee;
              margin-right: 2px;
            }
            span.sureness {
              background: @bg_ea0;
            }
            span.centre {
              background: @bg_f5a;
            }
            span.tall {
              background: @bg_46b;
            }
          }
          .safety {
            color: #cd4559;
          }
          .strength_centre {
            color: rgba(245, 166, 35, 1);
          }
          .safety_tall {
            color: rgba(70, 176, 93, 1);
          }
        }
      }
      
      .setting-tab {
        ul {
          li {
            font-size: 14px;
            border-bottom: 1px solid rgba(133, 131, 172, 0.2);
            line-height: 60px;
            .setting-tab-left {
              width: 320px;
              padding-left: 22px;
              box-sizing: border-box;
              font-weight: 600;
              background: white url("../../../static/images/security/an_password.svg") no-repeat 0px center;
              background-size: 12px 14px;
              .setting-tab-name {
                color: @cl_333;
                font-size: 16px;
                display: inline-block;
                width: 155px;
              }
              .setting-tab-name.google {
                width: 200px;
              }
            }
            .setting-tab-left.loginPassword {
              background: white url("../../../static/images/security/an_password_check.svg") no-repeat 0px center;
              background-size: 12px 14px;
            }
            
            .setting-tab-left.note.check {
              background: white url("../../../static/images/security/an_note_check.svg") no-repeat 0px center;
              background-size: 14px 14px;
            }
            .setting-tab-left.note {
              background: white url("../../../static/images/security/an_note.svg") no-repeat 0px center;
              background-size: 14px 14px;
            }
            .setting-tab-left.email {
              background: white url("../../../static/images/security/an_money.svg") no-repeat 0px center;
              background-size: 14px 14px;
            }
            .setting-tab-left.email.check {
              background: white url("../../../static/images/security/an_money_check.svg") no-repeat 0px center;
              background-size: 14px 14px;
            }
            .setting-tab-left.google {
              background: white url("../../../static/images/security/an_google.svg") no-repeat 0px center;
              background-size: 14px 14px;
            }
            .setting-tab-left.google.check {
              background: white url("../../../static/images/security/an_google_check.svg") no-repeat 0px center;
              background-size: 14px 14px;
            }
            .setting-tab-left.dual {
              background: white url("../../../static/images/security/an_dual.png") no-repeat 0px center;
              background-size: 14px 14px;
            }
            .setting-tab-left.dual.check {
              background: white url("../../../static/images/security/an_dual_check.png") no-repeat 0px center;
              background-size: 14px 14px;
            }
            .setting-tab-left.capital {
              background: white url("../../../static/images/security/an_capital.svg") no-repeat 0px center;
              background-size: 12px 14px;
            }
            .setting-tab-left.capital.check {
              background: white url("../../../static/images/security/an_capital_check.svg") no-repeat 0px center;
              background-size: 12px 14px;
            }
            .setting-tab-right {
              width: 625px;
              .setting-tab-isopen {
                .cl_cd4 {
                  color: @cl_cd4;
                  font-weight: 600;
                }
                a {
                  color: @cl_link;
                }
              }
              .setting-tab-hint {
                color: @cl_999;
              }
              .setting-tab-isopen {
                color: @cl_link;
                cursor: pointer;
              }
            }
          }
          
        }
      }
    }
    .rating-prompt {
      width: 380px;
      display: inline-block;
    }
  }
  
  .combined {
    padding-left: 24px;
    background: url('../../../static/images/security/an_combined@2x.png') no-repeat left center;
    background-size: 14px 14px;
  }
  
  .gray {
    color: #aaa;
  }

</style>
