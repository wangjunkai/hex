<template>
  <div class='footer'>
    <div class="w1200  clearfix footer-contant">
      <div class="footerlogo fl">
        <img src="../../static/images/logo.svg">
      </div>
      <div class='about fl'>
        <ul class='clearfix'>
          <li :class="{'enUs':lang=='en_us'}">
            <h4>{{$t("home.footerAbout")}}</h4>
            <p v-for="about in aboutUs" :key="about.id">
              <a v-if="about.articlehref" :href="about.articlehref">{{about.title}}</a>
              <span v-else @click="toHelp('about',about)">{{about.title}}</span>
            </p>
            <p>
              <nuxt-link to="/help/bulletin-center">{{$t('c2c.Latest')}}</nuxt-link>
            </p>
          </li>

          <li :class="{'enUs':lang=='en_us'}">
            <h4>{{$t("home.footerServe")}}</h4>
            <p>
              <nuxt-link to="/help">
                <span>{{$t("home.footerHelp")}}</span>
              </nuxt-link>
            </p>
            <p v-for="s in service" :key="s.id">
              <a v-if="s.articlehref" :href="s.articlehref">{{s.title}}</a>
              <span v-else @click="toHelp('service',s)">{{s.title}}</span>
            </p>
            <p @click="openService" class="cursor">{{$t('home.footerQuestion')}}</p>
          </li>
          <li :class="{'enUs':lang=='en_us'}">
            <h4>{{$t("home.footerClause")}}</h4>
            <p v-for="c in clause" :key="c.id">
              <a v-if="c.articlehref" :href="c.articlehref">{{c.title}}</a>
              <span v-else @click="toHelp('clause',c)">{{c.title}}</span>
            </p>
          </li>
          <li class="last" >
            <h4>{{$t("home.footerContact")}}</h4>
            <p><span>{{$t('c2c.make')}}：market@hex.com</span></p>
            <p><span>{{$t("home.footerEmail")}}：support@hex.com</span></p>
            <div class="set-currency"
                 @mouseenter="showexchange(true,'business')"
                 @mouseleave="showexchange(false,'business')">
              <div class="set-currency_icon"><span>{{$t('c2c.Business')}}：HEXCBO</span>
                <div class="ewm por">
                  <div class="set-currency_content"
                       v-show="business">
                    <div class="set-currency_content_exchange clearfix">
                      <img src="~/static/images/business-code.jpg" alt="">
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </li>
        </ul>
      </div>
      <!--媒体-->
      <div class='meidia fr'>
        <h4>{{$t("home.footerSocial")}}</h4>
        <div class='icon'>
          <div class="wechat"
               @mouseenter="showexchange(true,'wechat')"
               @mouseleave="showexchange(false,'wechat')">
            <div class="set-currency_icon">
              <span>
                <img style="width: 29px;" src="~/static/images/wechat.svg" alt="">
              </span>
              <div class="set-currency_content"
                   v-show="wechat">
                <div class="set-currency_content_exchange clearfix">
                  <div class="wechat-code">
                    <img src="~/static/images/wechat.jpg" alt="">
                    <p>
                      {{$t('c2c.serviceWeChat')}}
                    </p>
                  </div>
                  <div class="wechat-code">
                    <img src="~/static/images/wechat-group.png" alt="">
                    <p>
                      {{$t('c2c.group')}}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a href="https://t.me/HexChinese" target="_blank" rel="noopener noreferrer">
            <span class="Telegram">
             <img src="../../static/images/Telegram.svg">
          </span>
          </a>
          <a href="https://www.facebook.com/HexGlobal" target="_blank" rel="noopener noreferrer">
          <span class='facebook'>
              <img src="../../static/images/Facebook.svg">
          </span>
          </a>
          <a href="https://twitter.com/HexGlobal" target="_blank" rel="noopener noreferrer">
          <span class='twitter'>
              <img src="../../static/images/Twitter.svg">
          </span>
          </a>
          <a href="https://www.weibo.com/p/1005056558056627" target="_blank" rel="noopener noreferrer">
          <span class='weibo_White'>
              <img src="../../static/images/weibo_White.svg">
          </span>
          </a>
        </div>
        <div>
          <p class="sever">
            {{$t('c2c.provide')}}
          </p>
        </div>
      </div>
    </div>
    <div class="w1200 risk ">
      {{$t('c2c.Risk')}}
    </div>
    <div class='reserved'>
      <div class="w1200">
        <span>© 2018 HEX.com. All Rights Reserved</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Footer",
    data() {
      return {
        wechat: false,
        business: false,
        lang: this.$store.state.hex_lang.locale,
        dataLink: '',
        aboutUs: [],
        service: [],
        clause: [],
        connectUs: []
      };
    },
    computed: {
      getlisten: function () {
        return this.$store.state.hex_lang.locale;
      }
    },
    watch: {
      getlisten: function (val) {
        this.lang = val;
        this.getArticleList('3575', 'aboutUs');
        this.getArticleList('3576', 'service');
        this.getArticleList('3577', 'clause');
        // this.getArticleList('3578', 'connectUs');
      }
    },
    mounted() {
      this.getArticleList('3575', 'aboutUs');
      this.getArticleList('3576', 'service');
      this.getArticleList('3577', 'clause');
      // this.getArticleList('3578', 'connectUs');

    },
    methods: {
      showexchange(e, state) {
        this.exchangetimer && clearTimeout(this.exchangetimer)
        if (!e) {
          this.exchangetimer = setTimeout(() => {
            this[state] = e
          }, 300)
        } else {
          this[state] = e
        }
      },
      openService() {
        _MEIQIA && _MEIQIA('showPanel');
      },
      toHelp(title, data) {
        this.$router.push({
            name: 'help-help-detail', query: {
              type: data.menutype,
              id: data.id,
              title: title
            }
          }
        )
      },
      getArticleList(id, type) {
        let postData = {
          pageindex: 1,
          pagesize: 10
        }
        postData.menutype = id;
        this.$store.dispatch("com_article_search", postData).then(({data}) => {
          if (data) {
            let enlang = [];
            let chlang = [];
            data.pagedata.map((item) => {
              if (item.title.indexOf("en_us") != -1) {
                item.title = item.title.split('en_us-')[1];
                item.listid = id;
                enlang.push(item)
              } else {
                item.title = item.title.split('zh_cn-')[1];
                item.listid = id;
                chlang.push(item);
              }
            })
            if (this.lang == 'zh_cn') {
              this[type] = chlang;
            } else {
              this[type] = enlang;
            }
          }
        })
      }
    }
  };
</script>
<style lang='less' scoped>
  @import "../../static/styles/color.less";

  .set-currency, .wechat {
    position: relative;
    img {
      border-radius: 5px;
    }
  }

  .footer .about ul li.enUs {
    margin-right: 30px;
  }

  .set-currency {
    position: relative;
    .set-currency_content_exchange {
      padding: 6px 0 0 0;
      text-align: center;
    }
    img {
      width: 105px;
    }
  }

  .footer {
    .wechat {
      display: inline-block;
      .set-currency_content_exchange {
        padding-top: 10px;
        .wechat-code {
          float: left;
          width: 121px;
          margin: 0;
          text-align: center;
          height: 100px;
          img {
            width: 98px;
          }
          p {
            font-size: 12px;
            line-height: 24px;
            vertical-align: top;
            position: relative;
            text-align: center;
            top: -4px;
            color: rgba(65, 72, 87, 1);
          }
        }
        .wechat-code:first-child {
          border-right: 1px solid rgba(241, 244, 248, 1);
        }
      }
    }
  }

  .set-currency_content:before {
    content: '';
    display: inline-block;
    position: absolute;
    bottom: -16px;
    left: 47%;
    margin-left: -3px;
    width: 0;
    height: 0;
    border-top: 8px solid #fff;
    border-bottom: 8px solid transparent;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
  }

  .ewm {
    content: '';
    width: 16px;
    height: 16px;
    background: url("../../static/images/ewm.svg") no-repeat center center;
    display: inline-block;
    vertical-align: middle;
    background-size: cover;
  }

  .set-currency:hover .ewm, .wechat:hover .ewm {
    content: '';
    width: 16px;
    height: 16px;
    background: url("../../static/images/ewm-hover.svg") no-repeat center center;
    display: inline-block;
    vertical-align: middle;
    background-size: cover;
  }

  .set-currency_icon {
    cursor: pointer;
    font-style: inherit;
    color: #8790a1;
  }

  .last .set-currency_icon:hover {
    cursor: pointer;
    color: white;

  }

  .set-currency_content {
    position: absolute;
    width: 120px;
    right: -50px;
    z-index: 15;
    line-height: normal;
    background: white;
    bottom: 30px;
    box-shadow: 0px -1px 6px 0px rgba(0, 0, 0, 0.2);
    height: 120px;
    border-radius: 5px;
  }

  .wechat .set-currency_content {
    width: 242px;
    right: -85px;
    height: 140px;
    box-shadow: 0px -1px 6px 0px rgba(0, 0, 0, 0.2);
  }

  .wechat .set-currency_content:before {
    left: 48%;
  }

  .wechat .set-currency_content {
    bottom: 45px;
  }

  .set-currency_content_text {
    font-weight: 900;
    color: rgba(135, 144, 161, 1);
    border-bottom: 1px solid rgba(34, 38, 48, 1);
    margin-bottom: 5px;
    padding-bottom: 5px;
    text-align: center;
  }

  .risk {
    font-size: 12px;
    font-weight: 400;
    color: rgba(94, 101, 115, 1);
    line-height: 18px;
    margin-bottom: 15px;
  }

  .Telegram img, .facebook img {
    width: 24px;
  }

  .twitter img {
    width: 30px;
  }

  .weibo_White img {
    width: 29px;

  }

  .footer {
    color: white;
    background: @cl_content;
    padding: 40px 0 0;
    min-width: 1200px;
    .footer-contant {
      margin-bottom: 20px;
    }
    .footerlogo {
      width: 70px;
      height: 24px;
      margin-right: 55px;
    }
    .about {
      ul {
        li {
          float: left;
          font-size: 14px;
          line-height: 20px;
          margin-right: 50px;
          h4 {
            font-size: 16px;
            line-height: 23px;
            font-weight: 500;
            margin-bottom: 12px;
          }
          p {
            margin-bottom: 10px;
            color: rgba(135, 144, 161, 1);
            span {
              cursor: pointer;
              color: rgba(135, 144, 161, 1);
            }
            span.nocursor {
              cursor: inherit;
            }
            a {
              font-size: 14px;
              color: rgba(135, 144, 161, 1);
            }
            span:hover, a:hover {
              color: white;
            }
          }
          p.cursor:hover {
            color: white;
          }
        }
        li.last {
          margin-right: 0;
        }
      }
    }
    .meidia {
      width: 255px;
      .sever {
        margin-top: 20px;
        font-weight: 400;
        color: rgba(94, 101, 115, 1);
        font-size: 12px;
      }
      .icon {
        a {
          display: inline-block;
        }
        margin-top: 20px;
        span {
          cursor: pointer;
          width: 32px;
          height: 32px;
          display: inline-block;
          background-size: 32px 32px;
          margin-right: 15px;
        }
        .weibo_White {
          margin-right: 0;
        }
      }
    }

    .reserved {
      overflow: hidden;
      height: 50px;
      line-height: 50px;
      background: @cl_content;
      border-top: 1px solid #252931;
      text-align: center;
      .w1200 {
        span {
          font-size: 12px;
          color: @cl_8790A1;
        }
      }
    }
  }

  .language {
    width: 100px;
    text-align: center;
    margin-top: 45px;
    height: 20px;
    line-height: 20px;
    float: right;

    span.language-img {
      float: left;
      width: 32px;
      height: 20px;
      background: url('../../static/images/CN.png') no-repeat center center;
      background-size: 27px auto;
    }
    span.language-text {
      padding-right: 23px;
      font-size: 14px;
      background: url('../../static/images/arrowdown.png') no-repeat right center;
      background-size: 8px 5px;
    }
  }
</style>

