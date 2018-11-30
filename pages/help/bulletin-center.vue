<template>
  <div class="hex-flex">
    <div class="hex-flex_auto">
      <div class="announcement-body">
        <div class='goback'>
          <nuxt-link to="/help">{{$t('home.footerHelp')}}</nuxt-link>
          > {{$t('patch.OfficialNotice')}}
        </div>
        <div class="headline">
          {{$t('c2c.Announcement')}}
        </div>
        <div class="captions clearfix">
          <span>{{$t('c2c.Newcurrency')}}</span>
          <span>{{$t('c2c.Latest')}}</span>

        </div>
        <div class="inner clearfix">
          <ul class="por" v-hex-loading="coinloading">
            <li v-for='c in coinData' :key="c.id" @click="todetail(c,'notice')">
              <div>
                <div class="ovh des">
                  <p class='description'>{{c.title}}</p>
                  <p class='time'>
                    {{global_get_local_time(c.updatetime).format('YYYY-MM-DD HH:mm:ss')}}
                  </p>
                </div>
              </div>
            </li>
            <li class="nodate" v-if="coinNoData">{{$t('home.moreNoData')}}</li>
            <li v-if="total>=6" class="checkaritcle">
              <nuxt-link to="/help/new-currency">{{$t('c2c.viewall')}} <span>{{total}}</span> {{$t('c2c.articles')}}
              </nuxt-link>
            </li>
          </ul>
          <ul class="por" v-hex-loading="coinloading">
            <li v-for='c in hotArticle' :key="c.id" @click="todetail(c,'notice')">
              <div>
                <div class="ovh des">
                  <p class='description'>{{c.title}}</p>
                  <p class='time'>
                    {{global_get_local_time(c.updatetime).format('YYYY-MM-DD HH:mm:ss')}}
                  </p>
                </div>
              </div>
            </li>
            <li v-if="newtotal>=6" class="checkaritcle">
              <nuxt-link to="/help/latest-announcement">{{$t('c2c.viewall')}} <span>{{newtotal}}</span>
                {{$t('c2c.articles')}}
              </nuxt-link>
            </li>
            <li class="nodate" v-if="hotNoData">{{$t('home.moreNoData')}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'bulletin-center',
    data() {
      return {
        coinloading: false,
        hotloading: false,
        coinNoData: false,
        hotNoData: false,
        newtotal: 0,
        total: 0,
        lang: this.$store.state.hex_lang.locale,
        coinData: [],
        hotArticle: [],
        orderState: true,
        search: "",
        filterData: [],
        pagesIndex: 0,
        pageSize: 10,
        orderModel: {
          menutype: 3911,
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
              type: data.menutype,
              id: data.id,
              title: title
            }
          })
        } else {
          window.location.href = data.articlehref;
        }
      },
      getData() {
        this.coinNoData = false;
        this.hotNoData = false;
        this.coinloading = true;
        this.hotloading = true;
        this.$store.dispatch("com_article_search", this.orderModel).then(({data}) => {
          if (data && data.pagedata.length > 0) {
            let coin = [];
            data.pagedata.map((item) => {
              if (item.title.indexOf(this.lang + "-") != -1) {
                item.title = item.title.split('' + this.lang + '-' + '')[1];
                coin.push(item);
              }
            });
            this.total = data.totalitemcount;
            this.coinData = coin.slice(0, 6);
          } else {
            this.coinData = [];
            this.total = 0;
            this.coinNoData = true;
          }
          this.coinloading = false;
          return this.$store.dispatch('com_article_search',
            {
              menutype: 3912,
              pageindex: 1,
              pagesize: 1000
            });
        })
          .then((res) => {
            if (res.data.pagedata) {
              let filterhotarticle = [];
              res.data.pagedata.map((item) => {
                if (item.title.indexOf(this.lang + '-') != -1) {
                  item.title = item.title.split('' + this.lang + '-' + '')[1];
                  filterhotarticle.push(item);
                }
              });
              this.hotArticle = filterhotarticle.slice(0, 6);
              this.newtotal = res.data.totalitemcount;
            } else {
              this.hotArticle = [];
              this.newtotal = 0;
              this.hotNoData = true;
            }
            this.hotloading = false;
          }).catch((res) => {
          this.hotArticle = [];
        })


      },
    }
  }
</script>
<style lang='less' scoped>
  @import "../../static/styles/color";

  .captions {
    margin-top: 30px;
    span {
      width: 560px;
      float: left;
      color: rgba(51, 51, 51, 1);
      font-size: 24px;
    }
    span:first-child {
      margin-right: 80px;
    }
  }

  .hex-flex_auto {
    background: @cl_fff;
  }

  .headline {
    font-size: 30px;
    color: rgba(51, 51, 51, 1);
    font-weight: 400;
  }

  .inner {
    margin: 40px 0 155px;
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
      margin: 30px 0 40px;
      background-size: 16px 16px;
      a {
        color: @cl_link;
      }
    }

    ul {
      width: 560px;
      float: left;
      background: white;
      min-height: 303px;
      li {
        padding: 21px 0 20px;
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
          font-size: 16px;
          line-height: 20px;
          width: 70%;
          font-weight: 400;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          color: rgba(51, 51, 51, 1);
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
        a {
          color: rgba(111, 143, 241, 1);
        }
      }
      li.nodate {
        border-bottom: none;
      }
      li.checkaritcle {
        border-bottom: none;
        margin-top: 10px;
      }
      .more {
        border-bottom: none;
        padding: 0;
      }
    }
    ul:first-child {
      margin-right: 80px;
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

