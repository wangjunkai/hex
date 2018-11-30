<template>
  <div class='withdraw w990'>
    <popup
      @closepopup='popups()'
      @confirm="confirm"
      v-show="popupstate"
      ref="child"
    />
    <div class='common-head'>
      <span>{{$t("person.address")}}</span>
    </div>
    <div class='withdraw-countant'>
      <ul>
        <li>
          <span class='name ' :class="isOpenList?'opencCheck':'open'">
            {{$t('Waddress.openList')}}
          </span>
          <span class='state-cue'>
           {{$t('Waddress.tip')}}
          </span>
          <span class='manage' @click="popups(1)">
            {{isOpenList?$t('formMenu.open'):$t('formMenu.notOpen')}}
          </span>
        </li>
        <li>
          <span class='name manage-name'>
             {{$t('Waddress.PriceAddress')}}
          </span>
          <span class='state-cue'>
            {{$t('Waddress.PriceAddressTip')}}
          </span>
          <nuxt-link to='/person/address/mention-site'>
          <span class='manage'>
             {{$t('Waddress.addressManage')}}
          </span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import popup from '@/components/security/popup-public'
  export default {
    name: "withdraw",
    components: {
      popup
    },
    data() {
      return {
        isGooglePopup: true,
        popupstate: 0,
        isOpenList: false
      };
    },
    mounted() {
      this.isOpenWhiteList();
    },
    methods: {
      isOpenWhiteList() {
        this.$store.dispatch("user_withdraw_address_whitelist_check").then(({data}) => {
          if (data) {
            this.isOpenList = data;
          }
        })
      },
      popups(val) {
        if (val) {
          this.$refs.child.isgooglepopup(this.isGooglePopup);
        }
        this.popupstate = val;
      },
      confirm(_this) {
        const _self = this;
        const _user = this.$userinfo;
        const childThis = _this;
        var postData={};
        if (_user.isopengoogleverify) {
          postData.googleverifycode = childThis.googleverifycode
        }
        if (_user.isphoneauthed) {
          postData.smsverifycode = childThis.smsverifycode
        }
        if (_user.isemailauthed) {
          postData.emailverifycode = childThis.emailverifycode
        }
        postData.isopen =_self.isOpenList?false:true;
        this.$store.dispatch("user_withdraw_address_whitelist", postData).then((res) => {
          if (res.data) {
            this.getUser();
            this.popupstate = !this.popupstate;
            this.isOpenList = !this.isOpenList;
            this.$refs.child.resetvalidateWhite();
            this.$store.commit('set_message', {type: 'ok', text: res.msg});
            this.$refs.child.clearTime();
          }
          this.$refs.child.clearstate();

        })
      },
      async getUser() {
        return await this.global_refresh_user_info()
      }
    }
  };

</script>
<style lang='less' scoped>
  @import "../../../static/styles/color";
  @cl-aaa: #aaa;
  @cl-333: #333;

  .withdraw-countant {
    background: white;
    padding: 0 20px;
    margin-bottom: 10px;
    ul {
      li {
        line-height: 61px;
        overflow: hidden;
        border-bottom: 1px solid rgba(133, 131, 172, 0.2);
        span {
          display: inline-block;
          font-size: 14px;
          color: @cl-aaa;
        }
        .name {
          width: 216px;
          font-size: 16px;
          color: @cl-333;
          padding-left: 24px;
          box-sizing: border-box;
          font-weight: 800;
        }
        .manage {
          float: right;
          color: @cl_link;
          cursor: pointer;
        }
        .open {
          background: url('../../../static/images/security/white_list.png') no-repeat left center;
          background-size: 12px 14px;
        }
        .opencCheck {
          background: url('../../../static/images/security/white_list_check.png') no-repeat left center;
          background-size: 12px 14px;
        }
        .manage-name {
          background: url('../../../static/images/security/address.png') no-repeat left center;
          background-size: 12px 14px;
        }
        .manage-nameCheck {
          background: url('../../../static/images/security/white_list.png') no-repeat left center;
          background-size: 12px 14px;
        }
      }
      li:last-child {
        border-bottom: none;
      }
    }
  }

</style>
