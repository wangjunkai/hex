<template>
  <div class='binding w990'>
    <div class='common-head'>
      <popupstair
        v-show="popupstate"
        ref="popname"
        @closePopup="popup"
        @createapi="createapi"
      />
      <span class='goback' @click="goback"></span>
      <span>{{$t("api.creat")}} API</span>
    </div>
    <div class='google-countant'>
      <div class='validation-area bind-email-area'>
        <div class='hint-text'>
          <div class="auth-content_group"
               :class="{'auth-content_group--error':$v.api.name.$error}">
            <p class="title clearfix">
              <span class="left">API {{$t("api.name")}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.api.name.required">{{$t("api.nameNone")}}</span>

            </p>
            <input class="input"
                   :placeholder="$t('api.nameInput')"
                   type="text"
                   oninput="if(value.length > 15)value = value.slice(0, 20)"
                   v-model.trim="$v.api.name.$model">
          </div>
          <div class='validation-area-countant'>
            <span class='validation-title'>Access key </span>
            <div class='input-field'>
              {{accesskey}}
            </div>
          </div>
          <div class='validation-area-countant'>
            <span class='validation-title' @click="arr('haha')">Secret key </span>
            <div class='input-field'>
              {{secretkey}}
            </div>
          </div>
          <button class='commitBtn button-loading--por'
                  v-loading="loading"
                  @click="commitBtn">{{$t("api.creat")}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import AxiosConfig from '@/plugins/axios/config';
  import {required} from 'vuelidate/lib/validators'
  import popupstair from '@/components/security/popup-only-google'

  export default {
    name: "setApi",
    components: {
      popupstair
    },
    validations: {
      api: {
        name: {
          required
        }
      }
    },
    data() {
      return {
        loading: false,
        api: {
          name: ''
        },
        accesskey: '',
        secretkey: '',
        popupstate: false,
        popname: 'apiset',
        userList: [],
        nameRepeatState: true,
      };
    },
    mounted() {
      this.getApi();
      this.accesskey = AxiosConfig.getUUID();
      this.secretkey = AxiosConfig.getUUID();
    },
    methods: {
      goback() {
        this.$router.go(-1);
      },
      getApi() {
        this.$store.dispatch("user_api_getlist").then(({data}) => {
          if (data) {
            this.userList = data
          }
        })
      },
      createapi(_child) {
        const _self = this;
        _self.popupstate = !_self.popupstate;
        const _childthis = _child;
        const postDate = {
          name: _self.api.name,
          accesskey: _self.accesskey,
          secretkey: _self.secretkey,
          verifycode: _childthis.googleauthed,
        }
        this.$store.dispatch('user_user_api_add', postDate).then((res) => {
          if (res.data) {
            _self.$store.commit('set_message', {type: 'ok', text: res.msg});

            _self.$router.push('/person/api');
          }
        })
      },
      nameRepeat(a) {
        const _this = this;
        let result = [];
        _this.userList.forEach((item) => {
          if (item.name == a) {
            result.push(item.name);
          }
        })
        if (result.length > 0) {
          _this.$store.commit('set_message', {type: 'error', text: _this.$t('rest.nameRepeat')});
          _this.nameRepeatState = false;
        } else {
          _this.nameRepeatState = true;
        }
      },
      commitBtn() {
        const _this = this;
        const creatApi = _this.$v.api;
        creatApi.$touch();
        if (creatApi.$invalid) {
          return;
        }
        _this.loading = true;
        _this.nameRepeat(_this.api.name);
        if (!_this.nameRepeatState) {
          _this.loading = false;
          return;
        }
        _this.popupstate = !_this.popupstate;
        _this.$refs.popname.apipopup(_this.popname);
        _this.loading = false;
      },
      popup() {
        this.popupstate = !this.popupstate;
      }
    }
  };

</script>
<style lang='less' scoped>
  @import '../../../static/styles/auth';
  @import '../../../static/styles/color';
  @bg_858: #8583ac;
  @cl_333: #333;
  @cl_cd4: #cd4559;
  @cl_666: #666;
  button.commitBtn.bg_bbb {
    background: #bbb !important;
  }

  .binding {
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
    span {
      float: left;
      font-size: 14px;
      color: #333;
      font-weight: bold;
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

  .secret-key-code {
    margin-right: 20px;
  }

  .secret-keycopy {
    color: @cl_link;
  }

  .red-reg {
    color: @cl_cd4 !important;
  }

  span.validation-title {
    line-height: 17px;
    color: #666;
  }

  .input-field {
    width: 400px;
    margin-top: 6px;
    border: 1px solid #dddddd;
    height: 40px;
    padding: 0 10px;
    line-height: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 14px;
    color: #333;
  }

  .mgb0 {
    margin-bottom: 0;
  }

</style>
