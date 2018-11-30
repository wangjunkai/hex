<template>
  <div class='edit-api w990'>
    <div class='common-head'>
      <!--<span class='goback'></span>-->
      <span>
      {{$t('logonHistory.history')}}
      </span>
    </div>
    <div class='edit-api-tab'>
      <table class="hex_table">
        <thead class="hex_table_header padding br">
        <tr>
          <th class="lt">
            <div>{{$t('logonHistory.loginTime')}}</div>
          </th>
          <th class="lt">
            <div>IP{{$t('logonHistory.address')}}</div>
          </th>
          <!--<th class="rt">-->
            <!--<div>{{$t('logonHistory.loginLocation')}}</div>-->
          <!--</th>-->
        </tr>
        </thead>
        <tbody>
        <tr class="hex_table_body padding"
            v-for="(m,index) in loginhistory"
            :key="index">
          <td class="lt">
            {{global_get_local_time(m.time).format('YYYY-MM-DD HH:mm:ss')}}
          </td>
          <td class="lt">
            {{m.ip}}
          </td>
          <!--<td class="rt">-->
            <!--<span class='lookover'></span>-->
          <!--</td>-->
        </tr>
        </tbody>
      </table>
      <div class="anonymous" v-if="found">
        <div class="anonymous-pic">
          <img src="~/static/images/user/anonymous.svg" alt="">
        </div>
        <nuxt-link tag="p" to="/deal/eth_btc" class="anonymous-tip">{{$t('legalTrad.record')}}
        </nuxt-link>
      </div>
      <div class="paging-source" v-if="total>0">
        <el-pagination
          background
          @current-change="handChange"
          :page-size="logsModel.pagesize"
          popper-class="paging"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
      <div class="loadingPic por" v-hex-loading="loading" v-if="loading"></div>
    </div>
  </div>
</template>
<script>
  import more from '@/components/public/more'

  export default {
    name: "loginHistory",
    components: {
      'hex-more': more
    },
    data() {
      return {
        loading: true,
        found: false,
        total: 0,
        moreState: true,
        loginhistory: [],
        logsModel: {
          type: "Signin",
          pageindex: 0,
          pagesize: 20
        }
      };
    },
    mounted() {
      this.getuserSign();
    },
    methods: {
      handChange(val) {
        this.getuserSign(val);
      },
      getuserSign(val) {
        !val ? this.logsModel.pageindex = 1 : this.logsModel.pageindex = val;
        this.$store.dispatch("user_logs_search", this.logsModel).then(({data}) => {
          if (data) {
            this.total = data.totalitemcount;
            this.loginhistory = data.pagedata;
          } else {
            this.total = 0;
            this.found = true;
            this.loginhistory = [];
          }
          this.loading = false;
        })
      },
      record(val) {
        this.records = val;
      }
    },
  };
</script>

<style lang='less' scoped>
  @import "../../static/styles/color";
  @import "../../static/styles/table";

  .common-head {
    margin-bottom: 10px;
    .establish {
      width: 80px;
      height: 36px;
      background: @cl_link;
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
      box-sizing: border-box;
      color: @cl_999;
      border-bottom: 1px solid rgba(133, 131, 172, 0.2);
      div {
        float: left;
        color: @cl_999;
      }
      .api-info {
        width: 494px;
        overflow: hidden;
        span {
          float: left;
        }
        span.key {
          float: right;
        }
        .api-name {
          width: 206px;
        }
      }
      .secret-key {
        float: right;
      }
    }
    .edit-api-tab-body {
      font-size: 12px;
      line-height: 17px;
      li {
        padding: 10px 20px;
        line-height: 24px;
        overflow: hidden;
        div {
          float: left;
        }
        .api-info {
          width: 494px;
          span {
            display: inline-block;
          }
          .api-name {
            width: 206px;
          }
        }
        .look-key {
          float: right;
          color: @cl_link;
          .edit-delete {
            float: right;
            .delete {
              margin-left: 30px;
            }
          }
        }
      }
      li:last-child {
        border-bottom: 1px solid @cl_858_2;
      }

    }
  }

</style>
