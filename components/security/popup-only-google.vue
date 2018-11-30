<template>
  <div class='popup'>
    <div class="mask"></div>
    <div class='mask-content'>
      <div class="apiset" v-if="!popname">
        <div class="head">
          <span>{{$t('formMenu.safety')}}</span>
          <span class="close" @click="close">
         <img src="@/static/images/an_close.png" alt="">
        </span>
        </div>
        <div
          class="auth-content_group"
          :class="{'auth-content_group--error':$v.googleauthed.$error}">
          <p class="title clearfix">
            <span class="left">{{$t('formMenu.googleCodeVerification')}}</span>
            <span class="normal-tip_error right"
                  v-if="!$v.googleauthed.required">{{$t('formMenu.googleCodeVerificationNone')}}</span>
          </p>
          <input class="input"
                 :placeholder="$t('formMenu.googleInputVerification')"
                 type="text"
                 @keyup.enter='createdApi'
                 v-model.trim="$v.googleauthed.$model">
        </div>
        <button class='commitBtn button-loading--por'
                v-loading="loading"
                @click="createdApi">{{$t('formMenu.determine')}}
        </button>
      </div>
      <!--提币地址确认删除的弹窗-->
      <div class="delete" v-if="popname=='deleteAddress'">
        <div class="head">
          <span>{{$t('popup.deleteMention')}}</span>
          <span class="close" @click='close'>
          <img src="@/static/images/an_close.png" alt="">
        </span>
        </div>
        <div class='info unity'>
          <div class='input-field'>
            <div class="icon"></div>
            <p class='dlt'>
              {{$t('popup.isdeleteMention')}}"{{deleteData.remark}}"
            </p>
            <p>
              {{$t('popup.resetAddress')}}
            </p>
            <button class='commitBtn button-loading--por'
                    v-loading="loading"
                    @click="deleteAddressData(deleteData.id)">{{$t('popup.ConfirmDelete')}}
            </button>
          </div>
        </div>
      </div>
      <!--撤销弹窗-->
      <div class="delete" v-if="popname=='repeal'">
        <div class="head">
          <span>{{$t('popup.repeal')}}</span>
          <span class="close" @click='close'>
          <img src="@/static/images/an_close.png" alt="">
        </span>
        </div>
        <div class='info unity'>
          <div class='input-field'>
            <div class="icon"></div>
            <p class='dlt'>
              {{$t('popup.repealTip')}}
            </p>
            <p>
              {{$t('popup.repealCannots')}}
            </p>
            <button class='commitBtn button-loading--por'
                    v-loading="loading"
                    @click="deleteAddressData(deleteData.id)">{{$t('popup.cancelOrder')}}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {required} from 'vuelidate/lib/validators'
  
  export default {
    name: "stairPopup",
    validations: {
      googleauthed: {
        required
      }
    },
    data() {
      return {
        loading: false,
        submitState: false,
        popname: '',
        googleauthed: "",
        apiid: '',
        deleteData: {}
      };
    },
    subscribe() {
      return {
        resetValidate() {
          this.resetvalidate();
        }
      }
      
    },
    mounted() {
    },
    methods: {
      resetvalidate() {
        this.googleauthed = '';
        this.$v.$reset();
      },
      ShowPopup(deletedata, m) {
        this.popname = m;
        this.deleteData = deletedata;
      },
      deleteAddressData(id) {
        this.loading = true;
        this.$emit('deleteAddress', id);
      },
      apipopup(val) {
        this.googleauthed = '';
        this.$v.$reset();
        this.apiid = val;
      },
      createdApi() {
        this.$v.googleauthed.$touch();
        if (this.$v.googleauthed.$invalid) return;
        if (this.submitState) return;
        this.submitState = true;
        this.loading = true;
        this.$store.dispatch("user_google_verfiycode_check", {
          verifycode: this.googleauthed
        })
          .then((res) => {
            if (res.data) {
              if (this.apiid != 'apiset') {
                this.$emit('createapi', this.apiid);
                
                this.$pubsub.publish(this.$pubsub[this.apiid.pops], this)
              } else {
                this.$emit('createapi', this);
              }
              this.submitState = false;
              this.loading = false;
            } else {
              this.submitState = false;
              this.loading = false;
            }
          })
      },
      closeLoading() {
        this.loading = false;
      },
      close() {
        this.$emit('closePopup');
        this.googleauthed = '';
        this.$v.$reset();
      }
    }
  };
</script>
<style lang='less' scoped>
  @import '../../static/styles/auth';
  
  button.commitBtn.bg_bbb {
    background: #bbb !important;
  }
  
  .head {
    overflow: hidden;
    span {
      font-weight: 600;
    }
  }
  
  .popup .mask-content .apiset {
    .title {
      margin-bottom: 0;
      .normal-tip_error {
        float: right;
      }
    }
    .title span {
      font-size: 12px;
    }
    .auth-content_group {
      margin-left: 20px;
    }
    .commitBtn {
      margin-left: 20px;
    }
  }
  
  .popup {
    .mask-content {
      .delete {
        .unity {
          margin-top: 30px;
          .icon {
            width: 36px;
            height: 36px;
            margin: auto;
            background: url('./../../static/images/security/an_issue.png') no-repeat left center;
          }
          p {
            text-align: center;
            color: @cl_999;
            font-size: 14px;
            opacity: 0.5;
          }
          p.dlt {
            margin: 10px 0;
            color: @cl_333;
            font-weight: 600;
            opacity: 1;
          }
          .commitBtn {
            width: 320px;
            font-size: 14px;
            margin: 20px auto;
            display: block;
          }
          
        }
      }
    }
  }
</style>
