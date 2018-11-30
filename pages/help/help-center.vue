<template>
  <div class="hex-flex">
    <div class="hex-flex_auto">
      <div class='announcement'>
        <div class="announcement-head ovh">
          <div class='search fr'>
            <i class="search_coin"></i>
            <input type="text"
                   :placeholder="$t('home.searchButton')"
                   v-model="search"
                   v-focus
                   @keyup.enter="getData(1)">
          </div>
        </div>
      </div>
      <div class="announcement-body">
        <div class="inner ovh">
          <div class='an-enter' v-if="isenter==1">
           {{$t('help.enter')}}
          </div>
          <div class="search-prompt" v-if="isenter==2">
            <div class="search-result">
              {{$t('help.searchresults')}}
            </div>
            <p class="search-result-none">
              “{{searchChage}}”<span>{{$t('help.searchresultN')}}</span>
            </p>
            <nuxt-link class="goHelp" to='/help'>{{$t('help.knowledge')}}</nuxt-link>
          </div>

          <ul >
            <li v-for='k in articleData' :key="k.id" @click="todetail(k,'coin')">
              <h3>{{k.title}}</h3>
              <div class="ovh des">
                <p class='description'>{{k.shortdesc}}</p>
                <p class='time'>
                  {{global_get_local_time(k.updatetime).format('YYYY-MM-DD HH:mm:ss')}}
                </p>
              </div>
            </li>
            <li v-if="isenter==2" class="articleNone">
              <div class="pic">
                <img src="~/static/images/help/helpCenterNone.svg" alt="">
                <p class="tip">{{$t('patch.noArticle')}}</p>
              </div>
            </li>
          </ul>
          <div class="paging-source"  v-if="total>0">
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
    name: "help-center",
    components: {
      'hex-more': more,
    },
    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    },
    computed: {
      searchChage: function () {
        const _this = this;
        let search = this.search;
        if (search) {
          _this.isenter = 2;
          return search;
        } else {
          _this.isenter = 3;
          return '';
        }
      }
    },
    data() {
      return {
        total: 0,
        lang: this.$store.state.hex_lang.locale,
        search: '',
        articleData: [],
        articleNone: false,
        originalData: [],
        isenter: 1,
        orderModel: {
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
      this.search = this.$route.params.id;
    },
    methods: {
      handChange(val) {
        this.getData(val);
      },
      todetail(data, title) {
        if (!data.articlehref) {
          this.$router.push({name: 'help-help-detail',
            query:
              {
                type:data.menutype,
                id: data.id,
                title: title}})
        } else {
          window.location.href = data.articlehref;
        }
      },
      getData(pageIndex) {
        let pastData = this.orderModel;
        if (this.search) {
          pastData.keywords = this.search;
        }
         pastData.pageindex = 1;
        this.$store.dispatch("com_article_search", pastData).then((res) => {
          if (res.data && res.data.pagedata.length > 0) {
            let coin = [];
            res.data.pagedata.map((item) => {
              if (item.title.indexOf(this.lang + "-") != -1) {
                item.title = item.title.split('' + this.lang + '-' + '')[1];
                coin.push(item);
              }
            })
            this.total =coin.length;
            this.articleData = coin.slice((pageIndex-1)*10,pageIndex*10);
          } else {
            this.articleData = [];
            this.total = 0;
          }
          this.total ? this.isenter = 3 : this.isenter = 2;
          // 1:请按回车搜索  2 搜索结果  3都不展示
          this.total>10? this.total = this.total : this.total = 0;
        })
      },
    }
  }
</script>
<style lang='less' scoped>
  @import "../../static/styles/color";

  .hex-flex_auto {
    background: white;
  }
  .des{
    margin-top:10px;
  }

  .announcement {
    .announcement-head {
      width: 1200px;
      margin: 0 auto;
      height: 76px;
      h1 {
        float: left;
        line-height: 45px;
        font-size: 20px;
        color: white;

      }
      .search {
        width: 260px;
        height: 40px;
        margin-top: 18px;
        overflow: hidden;
        margin-left: 20px;
        position: relative;
        .search_coin {
          background-image: url("../../static/images/search.svg");
          display: inline-block;
          width: 16px;
          height: 16px;
          background-size: cover;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 9px;
        }
        input {
          border: 1px solid rgba(225, 224, 236, 1);
          width: 260px;
          line-height: 38px;
          padding-left: 30px;
          font-size: 14px;
          border-radius: 20px;
        }
        button {
          width: 100px;
          height: 100%;
          color: white;
          text-align: center;
          font-size: 14px;
          background: @cl_link;
        }
      }

    }
  }

  .announcement-body {
    width: 1200px;
    margin: auto;
    .inner {
      background: white;
      margin-bottom: 10px;
      .search-prompt {
        color: rgba(51, 51, 51, 1);
        .search-result {
          font-size: 30px;
          font-weight: 400;
        }
        .search-result-none {
          font-size: 14px;
          margin: 30px 0 20px;
        }
        .goHelp {
          font-size: 14px;
          color: rgba(111, 143, 241, 1);
        }

      }
      .an-enter {
        font-size: 13px;
        color: #666;
      }
    }
    .goback {
      background: white;
      padding-left: 20px;
      font-size: 14px;
      color: rgba(102, 102, 102, 1);
      margin-top: 10px;
      background-size: 16px 16px;
      line-height: 50px;
      border-bottom: 1px solid rgba(133, 131, 172, 0.2);
    }

    ul {
      background: white;
      min-height: 600px;
      li {
        cursor: pointer;
        padding: 20px 0 20px;
        border-bottom: 1px solid rgba(133, 131, 172, 0.2);
        .pic {
          width: 291px;
          margin: 120px auto 0;
          .tip {
            text-align: center;
            font-size: 14px;
            color: rgba(221,221,228,1);
            line-height: 22px;
            margin-top: 8px;
          }
        }
        h3 {
          font-size: 14px;
          color: rgba(51, 51, 51, 1)
        }
        p {
          font-size: 13px;
          color: rgba(102, 102, 102, 1);

        }
        .description {
          float:left;
          line-height: 20px;
          width: 80%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .time {
          float:right;
          font-size: 12px;
          line-height: 20px;
          color: rgba(153, 153, 153, 1);
          padding-left: 23px;
          background: url('./../../static/images/help/help_time.svg') no-repeat left center;
          background-size: 14px 14px;
        }
      }
      .articleNone {
      border-bottom: none;
      }
    }
  }

  .page-turning {
    margin: 0 20px;
    overflow: hidden;
    border-top: 1px solid rgba(221, 221, 221, 1);
    padding: 20px 0;
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
