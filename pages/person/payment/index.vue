<template>
  <div class='setting fr'>
    <h2 class="setting-title">
      {{$t('legalDeal.collection')}}
    </h2>
    <div class="setting-verify ">
      <div class='setting-tab'>
        <ul class="account" v-hex-loading="loading">
          <li class='ovh' v-for=" t in bindCollection " :key="t.typeid">
            <div class='setting-tab-left fl  Unionpay'>
              <span class="bank-icon">
                <img class="icon_bank" :src="t.icon" alt="">
              </span>
              <span v-if="lang=='zh_cn'" class='setting-tab-name'>
            {{t.typename}}
              </span>
              <span v-else class='setting-tab-name'>
            {{t.engtypename}}
              </span>
              <span class='setting-tab-password'>
               {{t.payconfig?global_string_split(t.payconfig.account):''}}
              </span>
              <div v-if="t.payconfig&&(t.typeid==849||t.typeid==853)" class="qr_code">
                <div v-if="t.typeid==853">
                  <img class="tip"
                       @click="wechat = true" src="~/static/images/legal/qr_code.svg" alt="">
                  <el-dialog
                    custom-class="qrCode"
                    :lock-scroll="true"
                    :visible.sync="wechat"
                    width="20%"
                    :show-close="false"
                    center>
                    <img :src="t.payconfig.imageurl" alt="">
                  </el-dialog>
                </div>
                <div v-if="t.typeid==849">
                  <img class="tip"
                       @click="alipay = true" src="~/static/images/legal/qr_code.svg" alt="">
                  <el-dialog
                    custom-class="qrCode"
                    :lock-scroll="true"
                    :visible.sync="alipay"
                    width="20%"
                    :show-close="false"
                    center>
                    <img :src="t.payconfig.imageurl" alt="">
                  </el-dialog>
                </div>
              </div>
            </div>
            <div class='setting-tab-right fl ovh'>
              <span class='setting-tab-isopen fr'>
                <span v-if="$userinfo.isopenpaypassword"
                      @click="gopage(t.typeid)"> {{t.payconfig?$t('security.modify'):$t('legalTrad.binding')}}</span>
                <span v-else @click="openpaypassword">{{$t('legalTrad.binding')}}</span>
              </span>
            </div>
          </li>
        </ul>
      </div>
      <el-dialog
        width="30%"
        custom-class="dialog-tip-payment"
        :visible.sync="dialogVisible">
        <img class="pic_tip" src="~/static/images/security/an_issue.png" alt="">
        <p>{{$t('manage.bingaccount')}}</p>
        <span slot="footer" class="dialog-footer dialog-footer-span">
          <button @click="dialogVisible = false">{{$t('legalTrad.Cancel')}}</button>
          <button type="primary" @click="gosecurity">{{$t('formMenu.determine')}}</button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        lang: this.$store.state.hex_lang.locale,
        loading: false,
        wechat: false,
        alipay: false,
        bindCollection: [],
        ispaypassword: '',
        userInfo: {},
        dialogVisible: false
      }
    },
    watch: {
      '$store.state.hex_lang.locale': function (val) {
        this.lang = val;
      }

    },
    mounted() {
      if (this.loading) return;
      this.loading = true;
      this.ispaypassword = this.$userinfo.isopenpaypassword;
      this.$store.dispatch('user_user_payments_getlist').then(({data}) => {
        if (data) {
          let datas = [];
          data.map((item) => {
            datas.push(item);
          })
          this.bindCollection = datas;
        }
        this.$nextTick(() => {
          this.loading = false;
        })
      })
    },
    methods: {
      gopage(val) {
        const _this = this;
        let page = val;
        switch (page) {
          case 848:
            _this.$router.push('/person/payment/bank');
            break;
          case 849:
            _this.$router.push('/person/payment/alipay');
            break;
          case 850:
            _this.$router.push('/person/payment/paypal');
            break;
          case 851:
            _this.$router.push('/person/payment/money-gram');
            break;
          case 852:
            _this.$router.push('/person/payment/western-union');
            break;
          case 853:
            _this.$router.push('/person/payment/wechat');
            break;
        }
      },
      openpaypassword() {
        if (!this.ispaypassword) {
          this.dialogVisible = true;
          // this.$store.commit('set_message', {type: 'error', text: this.$t('wallet.openPayPassword')});
        }
      },
      gosecurity() {
        this.dialogVisible = false;
        this.$router.push('/person/security')
      }
    }
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

  .pic_tip{
    display: block;
    width: 30px;
    margin: auto auto 10px;
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
      background: white url("../../../static/images/user/user_icon@2x.svg") no-repeat 20px center;
      background-size: 36px 36px;
    }
    .setting-verify {
      background: white;
      margin-bottom: 10px;
      padding: 0 20px;
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
              box-sizing: border-box;
              font-weight: 600;
              .bank-icon .icon_bank {
                width: 18px;
                display: inline;
                vertical-align: middle;
                margin-right: 10px;
              }
              background-size: 18px 18px;
              .setting-tab-name {
                color: @cl_333;
                font-size: 16px;
                display: inline-block;
                width: 157px;
              }
              .setting-tab-password {
                font-weight: 400;
              }
            }

            .setting-tab-right {
              float: right;
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
          li:last-child {
            border-bottom: none;
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

  .qr_code {
    margin-left: 8px;
    display: inline-block;
  }

  .qr_code img.tip {
    width: 20px;
    height: 20px;
    -webkit-transform: translate(0, 30%);
  }

  .setting-verify .account {
    position: relative;
    min-height: 371px;
  }


</style>
