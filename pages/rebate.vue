<style lang="less" scoped>
  .invitation-content {
    background: #222630;
    padding-bottom: 20px;
    margin-bottom: 10px;
    .hex-section {
      padding-left: 20px;
    }
  }
  
  .invitation-content .h1-title {
    font-size: 18px;
    color: #21283E;
    font-weight: 600;
  }
  
  .invitation-h2-title {
    margin-bottom: 10px;
    font-size: 16px;
    color: #6F8FF1;
    font-weight: 600;
    background: #292E39;
    line-height: 32px;
    padding-left: 20px;
  }
  
  .invitation-code-tip {
    font-size: 14px;
    color: #646B8C;
  }
  
  .invitation-link-group {
    margin-top: 30px;
  }
  
  .invitation-link-group .link-title-tip {
    font-size: 14px;
    color: #8790A1;
    margin-bottom: 6px;
  }
  
  .invitation-link-group .link-input {
    width: 500px;
    height: 40px;
    line-height: 40px;
    background: #292E39;
    border-radius: 4px;
    border: 1px solid #414857;
    padding: 0 14px;
    color: white;
    font-size: 14px;
    margin-right: 20px;
  }
  
  .invitation-link-group .link-button {
    color: #6F8FF1;
    border-left: 1px solid #414857;
    padding-left: 14px;
    height: 28px;
    line-height: 28px;
    position: relative;
    top: 6px;
    cursor: pointer;
  }
  
  .invitation-table {
    background: #222630;
    margin-bottom: 10px;
  }
  
  .invitation-table-tab /deep/ .tabs-component-tabs {
    color: #646B8C;
    font-size: 14px;
    font-weight: 600;
    margin: 0px 20px 20px 20px;
    padding-top: 10px;
  }
  
  .invitation-table-tab /deep/ .tabs-component-tabs:after {
    content: '';
    display: inline-block;
    clear: both;
  }
  
  .invitation-table-tab /deep/ .tabs-component-tab {
    margin-right: 40px;
    padding-bottom: 4px;
    float: left;
    cursor: pointer;
    a {
      color: rgba(52, 75, 108, 1);
    }
  }
  
  .invitation-table-tab /deep/ .tabs-component-tab.is-active {
    border-bottom: 2px solid #0076E6;
    a {
      color: rgba(40, 149, 251, 1);
    }
  }
  
  .invitation-table-content {
    width: 100%;
  }
  
  .invitation-table-content thead {
    font-size: 12px;
    color: #646B8C;
  }
  
  .invitation-table-content tbody {
    font-size: 14px;
    color: #21283E;
  }
  
  .invitation-table-content th {
    line-height: 32px;
    background-color: #222630;
    padding: 0 20px;
    border-bottom: 1px solid rgba(133, 131, 172, 0.2);
  }
  
  .invitation-table-content td {
    line-height: 40px;
    border-bottom: 1px solid #F5F7FB;
    padding: 0 20px;
  }
  
  .setting-title {
    height: 68px;
    line-height: 68px;
    font-size: 18px;
    padding-left: 56px;
    font-weight: 900;
    margin-bottom: 10px;
    background: #222630 url('../static/images/user/user_icon@2x.svg') no-repeat 0px center;
    background-size: 36px 36px;
  }
  
  .invitation-amount {
    background: #222630;
    margin-bottom: 10px;
    padding: 30px 0;
  }
  
  .invitation-amount-person:first-child {
    width: 25%;
    border-right: 1px solid #414857;
  }
  
  .invitation-amount-person {
    padding-left: 40px;
    float: left;
    flex: auto;
    
    .amount-person-tip {
      font-size: 20px;
      color: #8790A1;
      margin-bottom: 20px;
      font-weight: bold;
    }
    p {
      color: #8790A1;
      span {
        font-size: 48px;
        color: #6F8FF1;
      }
    }
  }
  
  .hex-content {
    width: 1200px;
    margin: auto;
    margin-top: 30px;
  }
  
  .rebate {
    padding-top: 100px;
    color: white;
    text-align: center;
    height: 420px;
    background: url('../static/images/rebate.png') no-repeat left top;
    background-size: 100% 100%;
    p:first-child {
      font-size: 48px;
    }
    p {
      font-size: 32px;
      margin-top: 20px;
    }
  }
  
  .invitation-rule {
    background: #222630 !important;
    color: #8790A1;
    margin-bottom: 100px;
  }
  
  .checkall {
    background-image: linear-gradient(-135deg, #6F8FF1 0%, #6F8FF1 100%);
    color: white;
    line-height: 34px;
    font-size: 14px;
    display: block;
    text-align: center;
    width: 30%;
    margin: 30px auto 0;
  }
  
  .rebate-login {
    width: 420px;
    margin: 30px auto;
    button {
      font-size: 16px;
      border-radius: 2px;
      width: 200px;
      line-height: 40px;
      text-align: center;
      color: white;
    }
    button.login {
      background: #008EE6;
      margin-right: 10px;
    }
    button.register {
      background: #03BF7B;
    }
  }
</style>
<template>
  <div>
    <div class="rebate">
      <p>
       {{$t('invitation.titleH1')}}
      </p>
      <p> {{$t('invitation.titleH2')}}</p>
    </div>
    <div class="hex-content">
      <div v-if="$userinfo.uid" class="invitation-amount ">
        <div class="ovh">
          <div class="invitation-amount-person">
            <p class="amount-person-tip">{{$t('invitation.PeopleInvited')}}</p>
            <p>
              <span>{{invitedRecord}}</span>
              {{$t('invitation.people')}}
            </p>
          </div>
          <div class="invitation-amount-person">
            <p class="amount-person-tip">{{$t('invitation.Estimated')}}</p>
            <p>
              <span>{{totalPrice}}</span>
              {{$store.getters.get_client_exchange_rate_name.name}}
            </p>
          </div>
        </div>
        <nuxt-link tag="button" to="/person/invitation" class="checkall clearfix">{{$t('invitation.Details')}}</nuxt-link>
      </div>
      <div class="invitation-content invitation-title">
        <div>
          <p class="invitation-h2-title">{{$t('invitation.myInvitationLink')}}</p>
          <div class="hex-section ">
            <p class="invitation-code-tip">{{$t('invitation.friendthrough')}}</p>
            <div v-if="$userinfo.uid" class="invitation-link-group clearfix">
              <div class="left">
                <p class="link-title-tip">{{$t('invitation.InvitationLink')}}</p>
                <div class="link-input clearfix">
                  <span id='keycopy'>https://www.hex.com/register?invitecode={{$userinfo.invitationcode}}</span>
                  <span class="right link-button link-url"
                        data-clipboard-target="#keycopy"
                        @click="copy('link-url')"
                  >{{$t('invitation.CopyLink')}}</span>
                </div>
              </div>
              <div class="left">
                <p class="link-title-tip">{{$t('invitation.Invitationcode')}}</p>
                <div class="link-input clearfix">
                  <span id='invitation'>{{$userinfo.invitationcode}}</span>
                  <span class="right link-button invitation"
                        data-clipboard-target="#invitation"
                        @click="copy('invitation')"
                  >{{$t('invitation.CopyInvitationCode')}}</span>
                </div>
              </div>
            </div>
            <div v-else class="rebate-login">
              <nuxt-link tag="button" to="/login" class="login">{{$t('home.headLogin')}}</nuxt-link>
              <nuxt-link tag="button" to="/register" class="register">{{$t('formMenu.register')}}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <activityRules :articeid="articeid"/>
    </div>
  </div>
</template>

<script>
  import Clipboard from 'clipboard';
  import activityRules from "@/components/public/activity-rules";
  
  export default {
    name: 'rebate',
    components: {
      activityRules
    },
    data() {
      return {
        invitedRecord: 0,
        totalPrice: 0,
        totalrate: [],
        articeid: {
          en_us: 685772,
          zh_cn: 685768
        }
      }
    },
    watch: {
      '$store.state.hex_client_exchange.active': function (val) {
        this.getrate();
      }
    },
    mounted() {
      if (this.$userinfo.uid) {
        this.getlways();
      }
    },
    getrate() {
      this.totalPrice = 0;
      this.totalrate.forEach((item) => {
        this.totalPrice = this.$np.plus(this.totalPrice, this.$store.getters.get_client_exchange_rate(item.awardname, item.totalscore));
      })
    },
    methods: {
      getlways() {//总汇率
        this.$store.dispatch('user_invitationrecord_pagedlist',
          {
            pagesize: 1000,
            pageindex: 1,
            type: 1
          })
          .then(({data}) => {
            if (data) {
              this.invitedRecord = data.totalitemcount;
              return this.$store.dispatch('user_getuserawardrecord_pagedlist');
            }
          })
          .then(({data}) => {
            if (data && data.pagedata.length > 0) {
              this.totalrate = data.pagedata;
              this.getrate();
            }
          })
      },
      getrate() {
        this.totalPrice = 0;
        this.totalrate.forEach((item) => {
          this.totalPrice = this.$np.plus(this.totalPrice, this.$store.getters.get_client_exchange_rate(item.awardname, item.totalscore));
        })
      },
      copy(val) {
        let a = '.' + val;
        let clipboard = new Clipboard(a);
        clipboard.on('success', e => {
          this.$store.commit('set_message', {type: 'ok', text: this.$t('patch.copysuccess')})
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          this.$store.commit('set_message', {type: 'error', text: '复制失败'})
          clipboard.destroy()
        })
      }
    }
  }
</script>

