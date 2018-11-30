<template>
  <div class="hex-flex">
    <div class="hex-flex_auto">
      <div class="titles">
        <nuxt-link v-if="article.type==3580" to="/help/help-question">{{title}}</nuxt-link>
        <nuxt-link v-else-if="article.type=='3581'" to="/help/notice">{{title}}</nuxt-link>
        <nuxt-link v-else-if="article.type=='3582'" to="/help/help-coin">{{title}}</nuxt-link>
        <nuxt-link v-else to="/help">{{$t('help.other')}}</nuxt-link>
        > {{$t('help.Details')}}
      </div>
      <div class="flex">
        <div class="tabChange">
          <div class="type">{{title}}</div>
          <ul>
            <li :class="{'active':active==r.id}"
                v-for="r in recommend"
                :key="r.id"
                @click="change(r.id)">
              {{r.title}}
            </li>
          </ul>
        </div>
        <div class="detail-body"  v-hex-loading="loading">
          <div class="detail-inner ovh">
            <h1> {{articleInfo.title}} </h1>
            <div class='help ovh'>
              <div class="help_logo">
                <img src="~/static/images/help/help_logo.svg" alt="">
              </div>
              <div class="help_detail">
                <p>HEX</p>
                <p v-if="articleInfo.updatetime">
                  {{global_get_local_time(articleInfo.updatetime).format('YYYY-MM-DD HH:mm:ss')}}
                </p>
                <p v-else>--</p>
              </div>
            </div>
            <div class='qusition'>
              <p v-html="articleInfo.remark"> {{articleInfo.remark}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "help-detail",
    data() {
      return {
        loading: false,
        lang: this.$store.state.hex_lang.locale,
        article: {},
        articleInfo: {},
        crumbs: "",
        title: "",
        active: '',
        recommend: [],//推荐
        orderModel: {
          pageindex: 1,//页数
          pagesize: 20,//条数
        },
      }
    },
    computed: {
      getlisten: function () {
        return this.$store.state.hex_lang.locale;
      }
    },
    watch: {
      '$store.state.hex_lang.locale': function (val) {
        this.lang = val;
        this.$router.push('/help');
      },
      $route() {
        this.article = this.$route.query;
        this.getdetail();
        this.$forceUpdate();
      }
    },
    mounted() {
      this.loading = true;
      this.getdetail();
    },
    methods: {
      getdetail() {
        this.article = this.$route.query;
        let a = this.article;
        switch (a.type.toString()) {
          case '3580':
            this.title = this.$t('patch.FAQ');
            break;
          case '3582':
            this.title = this.$t('patch.TokenIntroduction');
            break;
          case '3581':
            this.title = this.$t('patch.OfficialNotice');
            break;
          case '3577':
            this.title = this.$t('home.footerPrivacy');
            break;
          case '3576':
            this.title = this.$t('home.footerServe');
            break;
          case '3912':
            this.title = this.$t('c2c.Latest');
            break;
          case '3911':
            this.title = this.$t('c2c.Newcurrency');
            break;
          default:
            this.title = this.$t('help.other');
            break;
        }
        this.active = this.article.id;
        this.getartInfo(this.article.id);
        a.type ? this.getData() : this.recommend = [];
      },
      change(id) {
        this.articleInfo={};
        this.loading=true;
        this.getartInfo(id);
      },
      shows() {
        const _this = this;
        this.$nextTick(() => {
          let a = document.querySelector('.article-content');
          let elementList = a.querySelectorAll("button");
          for (var i = 0; i < elementList.length; i++) {
            elementList[i].count = i;
            elementList[i].onclick = function () {
              if (elementList[this.count].innerHTML == _this.$t('patch.unfold')) {
                elementList[this.count].innerHTML = _this.$t('patch.packUp');
                elementList[this.count].parentNode.previousElementSibling.style.display = 'block';
              } else {
                elementList[this.count].innerHTML = _this.$t('patch.unfold');
                elementList[this.count].parentNode.previousElementSibling.style.display = 'none';
              }
            }
          }
        })
      },
      getartInfo(id) {//详情
        this.active = id;
        this.$store.dispatch("com_article_info_get",
          {articeid: id})
          .then((res) => {
            if (res.data) {
              res.data.remark = res.data.remark.replace('<link rel="stylesheet" href="https://images.ihuoqiu.com/css/ihuoqiu/huoqiu.css?v=123">','')
              let titleSplit = res.data.title.split('' + this.lang + '-' + '')[1];
              res.data.title = titleSplit;
              this.articleInfo = res.data;
              if (this.article.id == 638834) {
                this.shows();
              }
            }
            this.loading=false;
          })
      },
      getData() {
        let pastData = this.orderModel;
        pastData.menutype = this.article.type;
        this.$store.dispatch("com_article_search", pastData).then((res) => {
          if (res.data && res.data.pagedata.length > 0) {
            let coin = [];
            res.data.pagedata.map((item) => {
              if (item.title.indexOf(this.lang + "-") != -1) {
                item.title = item.title.split('' + this.lang + '-' + '')[1];
                coin.push(item);
              }
            })

            let sortList = [];
            coin.forEach((item) => {
              if (item.id == this.article.id) {
                sortList.unshift(item);
              } else {
                sortList.push(item);
              }
            })
            this.recommend = sortList;
          } else {
            this.recommend = [];
          }
          this.loading = false;
        })
      },
    }
  }
</script>
<style lang='less' scoped>
  @import "../../static/styles/color";

  .announcement.notice {
    background: @cl_link;
  }

  .hex-flex {
    background: @cl_fff;
  }

  .announcement.coin {
    background: rgba(120, 82, 202, 1);
  }

  .announcement.question {
    background: @cl_link
  }

  .announcement {
    .announcement-head {
      width: 1200px;
      margin: 0 auto;
      height: 76px;
      .titles {
        padding-left: 60px;
        color: white;
        font-weight: normal;
        background: url('../../static/images/help/help_official.png') no-repeat left center;
        background-size: auto 60%;
        margin-top: 30px;
        font-size: 14px;
        color: rgba(111, 143, 241, 1);
        line-height: 20px;

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

  .hex-flex_auto {
    width: 1200px;
    margin: 0 auto;
  }

  .titles {
    color: white;
    font-weight: normal;
    background-size: auto 60%;
    margin-top: 30px;
    font-size: 14px;
    color: rgba(111, 143, 241, 1);
    line-height: 20px;
    cursor: pointer;
    a {
      color: #6f8ff1;
    }
  }

  .flex {
    display: flex;
    flex-direction: row;
    margin-top: 50px;
  }

  .tabChange {
    margin-right: 40px;
    .type {
      width: 200px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 32px;
    }
    ul {
      margin-bottom: 50px;
      li {
        width: 200px;
        margin-top: 15px;
        padding-left: 10px;
        font-size: 14px;
        color: rgba(102, 102, 102, 1);
        line-height: 24px;
        cursor: pointer;
      }
      li.active {
        background: rgba(111, 143, 241, 1);
        border-radius: 5px;
        color: @cl_fff;
      }
    }
  }

  .detail-body {
    /*flex: auto;*/
    width: 960px;
    min-height: 500px;
    position: relative;
    .goback {
      cursor: pointer;
      padding-left: 26px;
      font-size: 14px;
      color: rgba(51, 51, 51, 1);
      margin: 10px 0;
      background: url('./../../static/images/security/an_back@2x.svg') no-repeat left center;
      background-size: 16px 16px;
    }
    .detail-inner {
      background: white;
      margin-bottom: 20px;
      h1 {
        font-size: 32px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 32px;
      }
      .help {
        font-size: 12px;
        line-height: 17px;
        color: rgba(153, 153, 153, 1);
        margin: 30px 0 40px;
        height: 40px;

        .help_logo {
          float: left;
          margin-right: 10px;
          img {
            width: 40px;
            height: 40px;
          }
        }
        .help_detail {
          line-height: 18px;
          float: left;
          color: rgba(153, 153, 153, 1);
          p:first-child {
            padding-top: 3px;
            color: rgba(51, 51, 51, 1);
          }
        }
      }
      .user {
        h3, p {
          font-size: 14px;
          line-height: 22px;
        }
        p {
          margin-top: 20px;
        }
      }
      .qusition {
        h3, p {
          font-size: 14px;
          line-height: 20px;
          margin-top: 20px;
        }
        p{
          line-height: 28px!important;
        }
        h2 {
          line-height: 30px !important;
        }

      }
    }
  }
</style>
