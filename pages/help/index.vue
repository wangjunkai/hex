<template>
  <div class='help hex-flex'>
    <div class="hex-flex_auto">
      <div class="help_search">
        <div class="w1200 search_contant">
          <div class="search-input">
            <span></span>
            <input type="text"
                   class='ipt_hover'
                   v-model="search"
                   :placeholder="$t('help.searchMore')"
                   v-on:input="searchKeyword">
          </div>
        </div>
      </div>
      <div class='intermediate w1200'>
        <div class='help_information'>
           <span>
              <nuxt-link to="/help/bulletin-center" class="question">
             {{$t('c2c.Latest')}}
              </nuxt-link>
           </span>
          <span>
             <nuxt-link to="/help/novice-tutorial" class="service">
         {{$t('c2c.Beginner')}}
              </nuxt-link>
           </span>
          <span>
               <nuxt-link to="/help/help-coin" class="coin">
               {{$t('patch.TokenIntroduction')}}
              </nuxt-link>
            </span>
        </div>
        <div class='help_information help_information-question'>
           <span>
              <nuxt-link to="/help/help-question" class="question">
              {{$t('patch.FAQ')}}
              </nuxt-link>
              </span>
          <span>
          <a href="javascript:;" @click="meiqia" class="service">
          {{$t('patch.ContactService')}}
          </a>
           </span>
        </div>
        <div class="por loading" v-hex-loading="loading">
          <div class="article_area" v-if="dynamic.length>0">
            <h2>
              {{$t('patch.dynamic')}}
            </h2>
            <ul>
              <li v-for='m in dynamic'
                  :key="m.id"
                  @click="todetail(m,'question')">
                <div>
                  <h3>{{m.title}}</h3>
                  <div class="ovh des">
                    <p class='describe fl'>
                      <span>{{m.shortdesc}}</span>
                    </p>
                    <p class='time fr'>
                      <span>{{global_get_local_time(m.updatetime).format('YYYY-MM-DD HH:mm:ss')}}</span>
                    </p>
                  </div>
                </div>
              </li>
              <li class="to-link">
                <nuxt-link to="/help/help-question">{{$t('help.seeMore')}}</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "help",
    data() {
      return {
        loading: false,
        lang: this.$store.state.hex_lang.locale,
        dynamic: [],//最新动态
        hotArticle: [],//热门文章
        search: ''
      }
    },
    watch: {
      '$store.state.hex_lang.locale': function (val) {
        this.lang = val;
        this.getData();
      }
    },
    mounted() {
      this.loading = true;
      this.getData();
    },
    methods: {
      meiqia() {
        _MEIQIA('showPanel');
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
      searchKeyword() {
        this.$router.push({
            name: "help-help-center",
            params: {
              id: this.search
            }
          }
        );
      },
      getData() {
        let pastData = {
          menutype: 3580,
          pageindex: 1,
          pagesize: 100
        }
        this.$store.dispatch('com_article_search', pastData).then(({data}) => {
          if (data) {
            let filterdata = [];
            data.pagedata.map((item) => {
              if (item.title.indexOf(this.lang + '-') != -1) {
                item.title = item.title.split('' + this.lang + '-' + '')[1];
                filterdata.push(item);
              }
            })
            this.dynamic = filterdata.slice(0, 6);
          } else {
            this.dynamic = [];
          }
          this.loading = false;
        })
          .catch((res) => {
          this.hotArticle = [];
        })
      }
    }
  }
</script>

<style lang='less' scoped>
  @import "../../static/styles/color";

  .hex-flex_auto {
    background: @cl_fff;
  }

  .des {
    margin-top: 10px;
  }

  .intermediate .help_information span a {
    display: block;
    height: 80px;
    width: 100%;
    text-align: center;
    line-height: 80px;
    font-size: 16px;
    color: @cl_link;
  }

  .intermediate .help_information span a:hover {
    background: @cl_link;
    color: white;
  }

  .intermediate .help_information span a.coin {
    background-size: cover;

  }

  .intermediate .help_information span a.service {
    background-size: cover;

  }

  .help_search {
    height: 230px;
    background: rgba(21, 20, 44, 1) url("../../static/images/home_bg.jpg") no-repeat left top;
    background-size: 100% 100%;
    .search_contant {
      padding-top: 100px;

      h1 {
        font-size: 30px;
        text-align: center;
        color: white;
        margin-bottom: 20px;
        font-weight: 500;
      }
      div.search-input {
        display: flex;
        flex-direction: row;
        width: 600px;
        height: 40px;
        overflow: hidden;
        background: white;
        border-radius: 20px;
        margin: auto;
        border-radius: 20px;
        span {
          width: 18px;
        }
        span:before {
          content: '';
          width: 14px;
          height: 14px;
          display: inline-block;
          background: url('../../static/images/search.png') no-repeat center center;
          background-size: 14px auto;
          position: relative;
          top: 11px;
          left: 8px;
        }
        input {
          flex: auto;
          line-height: 40px;
          padding: 0 10px;
          box-sizing: border-box;
          font-size: 14px;
        }
        input:hover, input:focus {
          border: none !important;
        }
        button {
          float: left;
          width: 100px;
          text-align: center;
          color: white;
          line-height: 40px;
          background: linear-gradient(135deg, rgba(0, 135, 230, 1), rgba(0, 118, 230, 1));
        }

      }
    }

  }

  .intermediate {
    min-height: 500px;
    margin-top: 30px;
    .help_information {
      overflow: hidden;
      span {
        float: left;
        width: 380px;
        height: 80px;
        margin-right: 30px;
        border-radius: 5px;
        border: 1px solid @cl_link;
        img {
          height: 100%;
          width: auto;
        }
      }
      span:last-child {
        margin-right: 0;
      }
    }
  }

  .article_area {
    margin-bottom: 50px;
    h2 {
      padding-left: 32px;
      background-size: 22px 22px;
      font-size: 22px;
      text-align: center;
      margin-bottom: 17px;
      color: #333333;
      margin-top: 80px;
      font-weight: normal;
      border-top: 1px solid #e1e0ec;
      padding-top: 30px;
    }
    .lastH2 {
      border: none;
      margin-top: 40px;
    }
    ul {
      overflow: hidden;
      margin-bottom: 20px;
      li {
        cursor: pointer;
        color: rgba(102, 102, 102, 1);
        margin-right: 10px;
        padding: 23px 0px 6px;
        box-sizing: border-box;
        background: white;
        border-bottom: 1px solid rgba(225, 224, 236, 1);
        h3 {
          font-size: 16px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }

        .time {
          font-size: 12px;
          line-height: 20px;
          color: rgba(153, 153, 153, 1);
          padding-left: 23px;
          background: url('./../../static/images/help/help_time.svg') no-repeat left center;
          background-size: 14px 14px;
        }
        p {
          line-height: 20px;
          font-size: 13px;
          color: rgba(102, 102, 102, 1);
          margin: 0px 0 13px;
        }
        p.describe {
          width: 80%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
      li.to-link {
        border: none;
        font-size: 13px;
        padding-top: 10px;
        a {
          color: @cl_link;
        }
      }

    }
    .lastUl {
      margin-bottom: 40px;
    }
  }

  .intermediate .help_information.help_information-question {
    margin-top: 30px;
  }

  .intermediate .help_information.help_information-question span {
    width: 585px;
  }

  .loading {
    min-height: 500px;
  }
</style>
