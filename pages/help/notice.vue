<template>
  <div class="hex-flex">
    <div class="hex-flex_auto">
      <div class="announcement-body">
        <div class='goback'>
          <nuxt-link to="/help">{{$t('home.footerHelp')}}</nuxt-link>  >  {{$t('patch.OfficialNotice')}}
        </div>
        <div class="headline">
          {{$t('patch.OfficialNotice')}}
        </div>
        <div class="inner ovh">
          <ul>
            <li v-for='c in coinData' :key="c.id" @click="todetail(c,'notice')">
              <div>
                <h3>{{c.title}}</h3>
                <div class="ovh des">
                  <p class='description'>{{c.shortdesc}}</p>
                  <p class='time'>
                    {{global_get_local_time(c.updatetime).format('YYYY-MM-DD HH:mm:ss')}}
                  </p>
                </div>
              </div>
            </li>
          </ul>
          <div class="paging-source" v-if="total>0">
            <el-pagination
              background
              @current-change="handChange"
              :page-size="10"
              popper-class="paging"
              layout="prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import more from '@/components/public/more'

  export default {
    name: 'notice',
    components: {
      'hex-more': more,
    },
    data() {
      return {
        total: 0,
        lang: this.$store.state.hex_lang.locale,
        coinData: [],
        orderState: true,
        search: "",
        filterData: [],
        pagesIndex: 0,
        pageSize: 10,
        orderModel: {
          menutype: 3581,
          pageindex: 1,//页数
          pagesize: 1000,//条数
        },
      }
    },
    watch: {
      '$store.state.hex_lang.locale': function (val) {
        this.lang = val;
        this.$router.push('/help');
      }
    },
    mounted() {
      this.getData(1);
    },
    methods: {
      handChange(val) {
        this.getData(val);
      },
      todetail(data, title) {
        if (!data.articlehref) {
          this.$router.push({
            name: 'help-help-detail',
            query: {
              type: 3581,
              id: data.id,
              title: title
            }
          })
        } else {
          window.location.href = data.articlehref;
        }
      },
      getData(pageIndex) {
        this.$store.dispatch("com_article_search", this.orderModel).then((res) => {
          if (res.data && res.data.pagedata.length > 0) {
            let coin = [];
            res.data.pagedata.map((item) => {
              if (item.title.indexOf(this.lang + "-") != -1) {
                item.title = item.title.split('' + this.lang + '-' + '')[1];
                coin.push(item);
              }
            });
            this.total = coin.length;
            this.coinData = coin.slice((pageIndex-1)*10,pageIndex*10);
          } else {
            this.coinData = [];
            this.total = 0;
          }
          this.total>10? this.total = this.total : this.total = 0;
        })
      },
    }
  }
</script>
<style lang='less' scoped>
  @import "../../static/styles/color";

  .hex-flex_auto {
    background: @cl_fff;
  }

  .headline {
    font-size: 30px;
    color: rgba(51, 51, 51, 1);
    font-weight: 400;
  }

  .inner {
    margin-top: 23px;
  }

  .des {
    margin-top: 10px;
  }

  .announcement {
    background: @cl_link;
    .announcement-head {
      width: 1200px;
      margin: 0 auto;
      height: 76px;
      h1 {
        padding-left: 60px;
        float: left;
        line-height: 45px;
        color: white;
        font-size: 22px;
        font-weight: normal;
        background: url('../../static/images/help/help_issue.png') no-repeat left center;
        background-size: auto 85%;
      }
      .search {
        width: 300px;
        float: right;
        height: 36px;
        margin-top: 20px;
        overflow: hidden;
        input {
          width: 240px;
          line-height: 36px;
          padding-left: 10px;
          font-size: 14px;
        }
        button {
          width: 60px;
          height: 36px;
          color: white;
          font-size: 14px;
          text-align: center;
          background: linear-gradient(135deg, rgba(0, 135, 230, 1), rgba(0, 118, 230, 1));
        }
      }
    }
  }

  .announcement-body {
    width: 1200px;
    margin: auto;
    margin-bottom: 20px;
    min-height: 500px;

    .goback {
      cursor: pointer;
      font-size: 14px;
      color: @cl_link;
      margin: 30px 0;
      background-size: 16px 16px;
      a{
        color: @cl_link;
      }
    }

    ul {
      background: white;
      li {
        padding: 20px 0 20px;
        cursor: pointer;
        border-bottom: 1px solid rgba(133, 131, 172, 0.2);
        h3 {
          font-weight: normal;
          font-size: 16px;
          color: rgba(51, 51, 51, 1)
        }
        p {
          font-size: 13px;
          color: rgba(102, 102, 102, 1);
        }
        .description {
          float: left;
          line-height: 20px;
          width: 80%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .time {
          float: right;
          font-size: 12px;
          line-height: 20px;
          color: rgba(153, 153, 153, 1);
          padding-left: 23px;
          background: url('./../../static/images/help/help_time.svg') no-repeat left center;
          background-size: 14px 14px;
        }
      }
      .more {
        border-bottom: none;
        padding: 0;
      }
    }
  }

  .page-turning {
    overflow: hidden;
    padding: 20px 20px;
    background: white;

    .page {
      width: 330px;
      float: right;
      .arrow-up {

      }
      span {
        float: left;
        width: 30px;
        height: 30px;
        border: 1px solid rgba(221, 221, 221, 1);
        text-align: center;
        line-height: 30px;
        margin-right: 10px;
        font-size: 12px;
        color: rgba(102, 102, 102, 1);
      }
      .dot {
        border: none;
        margin-right: 0;
      }
      .mgr0 {
        margin-right: 0;
      }
      .page-down {
        margin-right: 0;
      }
      span.cur_page {
        background: @cl_link;
        color: white;
      }
    }

  }
</style>

