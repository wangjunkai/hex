<template>
  <div class='edit-api w990'>

    <div class='common-head'>
      <!--<span class='goback'></span>-->
      <span>API</span>
      <button class='establish fr'
              @click="creation">{{$t('api.creat')}} API
      </button>
    </div>
    <div class='edit-api-tab'>
      <table class="hex_table">
        <thead class="hex_table_header padding br">
        <tr>
          <th class="lt">
            <div>{{$t('api.name')}}</div>
          </th>
          <th class="lt">
            <div>Access key</div>
          </th>
          <th class="rt">
            <div>Secret key</div>
          </th>
          <th class="rt">
            <div>{{$t('home.tradeOperation')}}</div>
          </th>
        </tr>
        </thead>
        <tbody>
        <template v-for="(apilist,index) in userList">
          <tr class="hex_table_body padding"
              :key="index">
            <td class="fw lt">
              <span class='api-name'>{{apilist.name}}</span>
            </td>
            <td class="lt">
              <span>{{apilist.accesskey}}</span>
            </td>
            <td class="rt">
              <span class="look-key"
                    @click='cheKey(apilist,"checkedKey")'>{{$t('wallet.lookOver')}}key</span>
            </td>
            <td class="rt">
              <span class="look-key"
                    @click='cheKey(apilist,"editIp")'>{{$t('api.modifyWhiteList')}}</span>
              <span class='delete'
                    @click='cheKey(apilist,"deleteApi")'>{{$t('api.delete')}}</span>
            </td>
          </tr>
        </template>
        </tbody>
      </table>
      <div class="anonymous" v-if="found">
        <div class="anonymous-pic">
          <img src="~/static/images/user/anonymous.svg" alt="">
        </div>
        <p class="anonymous-tip">
          {{$t('legalTrad.record')}}
        </p>
      </div>
      <div class="paging-source" v-if="total>0">
        <el-pagination
          background
          @current-change="handChange"
          :page-size="20"
          popper-class="paging"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <popupstair
      v-show="popupstate"
      @closePopup="popup"
      @deleteapi="deleteapi"
      ref="popname"/>
    <onlygoogle
      v-show="onlygooglestate"
      @closePopup="googlepopup"
      ref="apiid"
      @createapi="checkedKey"/>
    <div class="loadingPic por" v-hex-loading="loading" v-if="loading"></div>
    <el-dialog
      width="30%"
      custom-class="dialog-tip-payment"
      :visible.sync="dialogVisible">
      <img  class="pic_tip"  src="~/static/images/security/an_issue.png" alt="">
      <p>{{$t('manage.creatapi')}}</p>
      <span slot="footer" class="dialog-footer dialog-footer-span">
          <button @click="dialogVisible = false">{{$t('legalTrad.Cancel')}}</button>
          <button type="primary" @click="gosecurity">{{$t('formMenu.determine')}}</button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  import popupstair from '@/components/security/popup-stair'
  import onlygoogle from '@/components/security/popup-only-google'
  import more from '@/components/public/more'

  export default {
    name: "editApi",
    components: {
      popupstair,
      onlygoogle,
      'hex-more': more
    },
    data() {
      return {
        dialogVisible: false,
        loading: true,
        total: 0,
        found: false,
        onlygooglestate: false,
        popupstate: false,
        deletepop: 0,
        userList: [],
        page: {
          pageindex: 0,
          pagesize: 20,
        },
        moreState: true
      }
    },
    mounted() {
      this.getApi();
    },
    methods: {
      gosecurity() {
        this.dialogVisible = false;
        this.$router.push('/person/security')
      },
      handChange(val) {
        this.getApi(val);
      },
      edit(val) {
        //deleteapi:删除api  checkedkey:查看key  editip:编辑ip
        this.popupstate = !this.popupstate;
        this.$refs.popname.apipopup(val);
      },
      deleteapi(val) {
        this.userList = this.userList.filter((item) => {
          return item.id != val
        });
        this.total = this.userList.length;
        this.total ? this.found = false : this.found = true;
      },
      checkedKey(m) {
        this.onlygooglestate = !this.onlygooglestate;
        this.popupstate = !this.popupstate;
        this.$refs.popname.apipopup(m.pops);
      },
      cheKey(val, m) {
        val.pops = m;
        const _this = this;
        if (!_this.$userinfo.isopengoogleverify) {
          _this.$store.commit('set_message', {type: 'error', text: _this.$t('authentication.openGoogle')});
        } else {
          _this.onlygooglestate = !this.onlygooglestate;
          _this.$refs.apiid.apipopup(val);
        }
      },
      creation() {
        const _this = this;
        if (!_this.$userinfo.isopengoogleverify) {
          this.dialogVisible = true;
        } else {
          _this.$router.push('/person/api/api-set');
        }
      },
      googlepopup() {
        this.onlygooglestate = !this.onlygooglestate;
      },
      popup() {
        this.popupstate = !this.popupstate;
      },
      getApi(val) {
        !val ? this.page.pageindex = 1 : this.page.pageindex = val;
        this.$store.dispatch("user_api_getlist", this.page).then(({data}) => {
          if (data) {
            this.total = data.length;
            this.userList = data;
          } else {
            this.total = 0;
            this.found = true;
            this.userList = [];
          }
          this.loading = false;
        })
      },
    }
  };

</script>

<style lang='less' scoped>
  @import "../../../static/styles/color";
  @import "../../../static/styles/table";

  .loadingPic {
    min-height: 303px;
    background: white;
  }

  .pic_tip{
    display: block;
    width: 30px;
    margin: auto auto 10px;

  }
  .hex_table_body .api-info {
    width: 609px;
    span {
      display: inline-block;
    }
    .api-name {
      width: 206px;
    }
  }

  .hex_table_body .look-key {
    color: @cl_link;
    cursor: pointer;
  }

  .hex_table_body .delete {
    color: @cl_link;
    cursor: pointer;
    margin-left: 30px;
  }

  .common-head {
    margin-bottom: 10px;
    .establish {
      width: 80px;
      height: 36px;
      background: linear-gradient(135deg, rgba(111, 143, 241, 1) 0%, rgba(111, 143, 241, 1) 100%);
      font-size: 14px;
      color: white;
      position: relative;
      top: -4px;
    }

  }

  .edit-api-tab {
    background: white;
    .edit-api-tab-hd {
      height: 32px;
      line-height: 32px;
      overflow: hidden;
      font-size: 12px;
      padding: 0 20px;
      color: @cl_999;
      border-bottom: 1px solid rgba(133, 131, 172, 0.2);
      div {
        float: left;
        color: @cl_999;
      }
      .api-info {
        width: 609px;
        overflow: hidden;
        span {
          float: left;
        }
        .api-name {
          width: 206px;
        }
      }
      .secret-key {
        width: 337px;
        overflow: hidden;
      }
    }
  }

</style>
