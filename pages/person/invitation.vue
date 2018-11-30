<style lang="less" scoped>
  @import "../../static/styles/table";

  .invitation-content {
    background: white;
    padding: 0 20px 20px 20px;
    margin-bottom: 10px;
  }

  .invitation-content .h1-title {
    font-size: 18px;
    color: #21283E;
    font-weight: 600;
  }

  .invitation-h2-title {
    margin-bottom: 10px;
    font-size: 16px;
    color: #21283E;
    font-weight: 600;
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
    color: #344B6C;
    margin-bottom: 6px;
  }

  .invitation-link-group .link-input {
    width: 455px;
    height: 40px;
    line-height: 40px;
    background: rgba(251, 252, 254, 1);
    border-radius: 4px;
    border: 1px solid rgba(225, 224, 236, 1);
    padding: 0 14px;
    color: #21283E;
    font-size: 14px;
    margin-right: 20px;
  }

  .invitation-link-group .link-button {
    color: #6F8FF1;
    border-left: 1px solid #E1E0EC;
    padding-left: 14px;
    height: 28px;
    line-height: 28px;
    position: relative;
    top: 6px;
    cursor: pointer;
  }

  .invitation-table {
    background: white;
    margin-bottom: 10px;

    .tab-title {
      padding: 10px 20px 15px;
    }
    span {
      margin-right: 10px;
      font-size: 14px;
      cursor: pointer;
    }
    span.is-active {
      color: #6F8FF1;
      border-bottom: 2px solid #6F8FF1;
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
    background-color: white;
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
    background: white url('../../static/images/user/user_icon@2x.svg') no-repeat 0px center;
    background-size: 36px 36px;
  }

  .invitation-amount {
    background: white;
    margin-bottom: 10px;
    padding: 30px 0;
  }

  .invitation-amount-person:first-child {
    width: 25%;
    border-right: 1px solid #E1E0EC;
  }

  .invitation-amount-person {
    padding-left: 40px;
    float: left;
    flex: auto;

    .amount-person-tip {
      font-size: 20px;
      color: #21283E;
      margin-bottom: 20px;
      font-weight: bold;
    }
    p:last-child {
      color: #8790A1;
      span {
        font-size: 48px;
        color: #6F8FF1;
      }
    }
  }

  .hex_table_body {
    font-size: 14px;
    border-bottom: 1px solid #F0F0F0;
  }

  .nodata {
    font-size: 14px;
    text-align: center;
    line-height: 303px;
  }

  .hex_table_body.padding td {
    border: none !important;
    padding: 0;
  }
</style>
<template>
  <div class="hex-content">
    <div class="invitation-content invitation-title">
      <div class="hex-section ">
        <h2 class="setting-title">
          {{$t('invitation.InviteFriend')}}
        </h2>
        <p class="invitation-h2-title"> {{$t('invitation.myInvitationLink')}}</p>
        <p class="invitation-code-tip">{{$t('invitation.friendthrough')}}</p>
        <div class="invitation-link-group clearfix">
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
      </div>
    </div>
    <div class="invitation-amount clearfix">
      <div class="invitation-amount-person">
        <p class="amount-person-tip">{{$t('invitation.Invited')}}</p>
        <p>
          <span>{{invitedRecord.totalitemcount}}</span>
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
    <div class="hex-section">
      <div class="invitation-table">
        <div class="tab-title">
          <span :class="{'is-active':changeState==1}" @click="changeTab(1)">{{$t('invitation.History')}}</span>
          <span :class="{'is-active':changeState==2}" @click="changeTab(2)">{{$t('invitation.Income')}}</span>
        </div>
        <div class="tab-panney">
          <div v-if="changeState==1">
            <table class="hex_table">
              <thead class="hex_table_header padding br">
              <tr>
                <th class="lt">
                  <div>{{$t('deal.time')}}</div>
                </th>
                <th class="lt">
                  <div>{{$t('invitation.Registered')}}</div>
                </th>

                <th class="rt">
                  <div>{{$t('memberCenter.statue')}}</div>
                </th>
              </tr>
              </thead>
              <tbody>
              <tr class="hex_table_body padding" v-for="(item,index) in invitedRecord.pagedata" :key="index">
                <td>{{global_get_local_time(item.invitatdate).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>{{item.userid}}</td>
                <td class="rt">
                  {{$t('legalDeal.Normal')}}
                </td>
              </tr>
              </tbody>
            </table>
            <div class="paging-source" v-if="total>10">
              <el-pagination
                background
                @current-change="handChange"
                :page-size="10"
                popper-class="paging"
                layout="prev, pager, next"
                :total="total">
              </el-pagination>
            </div>
            <div v-if="found" class="nodata">{{$t('invitation.nomal')}}</div>
            <div class="loadingPic por" v-hex-loading="loading" v-if="loading"></div>
          </div>
          <div v-if="changeState==2">
            <table class="hex_table">
              <thead class="hex_table_header padding br">
              <tr>
                <th class="lt">
                  <div>{{$t('invitation.date')}}</div>
                </th>
                <th class="lt">
                  <div>{{$t('login.account')}}</div>
                </th>
                <th class="lt">
                  <div>{{$t('invitation.Commission')}}</div>
                </th>
                <th class="lt">
                  <div>{{$t('invitation.Source')}}</div>
                </th>
                <th class="rt">
                  <div>{{$t('patch.Status')}}</div>
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="k in earnings" :key="k.id" class="hex_table_body padding">
                <td>{{global_get_local_time(k.createtime).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>{{k.relationuserid}}</td>
                <td>{{k.amount}} {{k.awardname}}</td>
                <td>{{k.title}}</td>
                <td class="rt"> {{k.status==1?$t('legalDeal.Normal'):'--'}}</td>
              </tr>
              </tbody>
            </table>
            <div class="paging-source" v-if="total>10">
              <el-pagination
                background
                @current-change="handChange"
                :page-size="10"
                popper-class="paging"
                layout="prev, pager, next"
                :total="total">
              </el-pagination>
            </div>
            <div v-if="found" class="nodata">{{$t('invitation.earningsnomal')}}</div>
            <div class="loadingPic por" v-hex-loading="loading" v-if="loading"></div>
          </div>
        </div>
      </div>
    </div>
    <activityRules :articeid="articeid"/>
  </div>
</template>

<script>
  import Clipboard from 'clipboard';
  import activityRules from "@/components/public/activity-rules";

  export default {
    name: 'invitation',
    components: {
      activityRules
    },
    data() {
      return {
        loading: false,
        total: "",
        found: false,
        changeState: 1,
        always: [],
        totalPrice: 0,
        totalrate: [],
        page: {
          pagesize: 10,
          pageindex: 1
        },
        earnings: [],
        invitedRecord: [],//邀请记录
        articeid: {
          en_us: 685772,
          zh_cn: 685768
        }
      }
    },
    mounted() {
      this.getlways();
      this.loading = true;
      this.getInviteRecord();
    },
    watch: {
      '$store.state.hex_client_exchange.active': function (val) {
        this.getrate();
      }
    },
    methods: {
      changeTab(val) {//tab 切换
        this.changeState = val;
        this.loading = true;
        this.total = '';
        this.found = false;
        if (val == 1) {
          this.getInviteRecord();
        } else {
          this.getinvitedearnings();
        }
      },
      handChange(val) {//切换分页器
        if (this.changeState == 1) {
          this.getInviteRecord(val);
        } else {
          this.getinvitedearnings(val);
        }
      },
      getrate() {
        this.totalPrice = 0;
        this.totalrate.forEach((item) => {
          let all  = this.$np.plus(this.totalPrice, this.$store.getters.get_client_exchange_rate(item.awardname, item.totalscore));
          this.totalPrice = this.$np.plus(all, this.$store.getters.get_client_exchange_rate(item.awardname, item.locked));
        })
      },
      getlways() {//总汇率
        this.$store.dispatch('user_getuserawardrecord_pagedlist').then(({data}) => {
          if (data && data.pagedata.length > 0) {
            this.always = data;
            this.totalrate = data.pagedata;
            this.getrate();
          } else {
            this.always = [];
          }
        })
      },
      getinvitedearnings(pageIndex) {//获取用户收益记录
        this.page.pageindex = pageIndex ? pageIndex : 1;
        this.$store.dispatch('user_getuserawardrecord_detail_pagedlist', this.page).then(({data}) => {
          if (data) {
            this.earnings = data.pagedata;
            this.total = data.totalitemcount;
          } else {
            this.total = 0;
            this.earnings = [];
          }
          this.loading = false;
          this.total > 0 ? this.found = false : this.found = true;
        })
      },
      getInviteRecord(pageIndex) {//获取邀请记录
        let paging;
        pageIndex ? paging = pageIndex : paging = 1;
        this.$store.dispatch('user_invitationrecord_pagedlist', {
          pagesize: 10,
          pageindex: paging,
          type: 1
        }).then(({data}) => {
          if (data) {
            this.total = data.totalitemcount;
            this.invitedRecord = data;
          } else {
            this.total = 0;
            this.invitedRecord = [];
          }
          this.loading = false;
          this.total > 0 ? this.found = false : this.found = true;
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
