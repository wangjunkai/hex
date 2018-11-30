<template>
  <div class="lang-content">
    <span class="lang hover" @click="falseFun">
      {{getLangName}}
        <i class="iconfont icon-sarrow-b"></i>
    </span>
    <ol class="lang-item" v-if="langShow">
      <li v-for="(item,i) in langList"
          :key="i"
          @click="langFun(item.locale)"
          :class="{'hover':ifgetLang(item.locale)}">
        {{item.lang}}
      </li>
    </ol>
  </div>

</template>

<script>
  import * as Cookie from 'js-cookie'
  
  export default {
    name: "lang",
    computed: {
      getLangName: function () {
        let hex_lang = this.$store.state.hex_lang
        const item = hex_lang.locales.find((item) => {
          if (item.locale == hex_lang.locale) {
            return item
          }
        })
        if (!item) {
          this.langFun(hex_lang.locales[0].locale)
          this.falseFun()
          return hex_lang.locales[0].lang
        }
        return item.lang
      },
      getLang: function () {
        return this.$store.state.hex_lang.locale
      }
    },
    data() {
      return {
        langActive: '',
        langShow: false,
        langList: this.$store.state.hex_lang.locales
      };
    },
    methods: {
      ifgetLang(item) {
        return item == this.getLang
      },
      falseFun() {
        this.langShow = !this.langShow;
      },
      langFun(lang) {
        this.$store.commit('set_lang', lang)
        this.$i18n.locale = lang
        Cookie.set(this.$store.state.hex_lang.type, lang)
        
        const ex = lang == 'zh_cn' ? 'cny' : 'usd'
        if (_MEIQIA) {
          if (lang == 'zh_cn') {
            _MEIQIA('language', 'cn')
          } else {
            _MEIQIA('language', 'en')
          }
        }
        this.$store.commit('set_client_exchange', ex)
        Cookie.set(this.$store.state.hex_client_exchange.type, ex)
        this.falseFun()
      }
    },
    created() {
    }
  };
</script>
<style lang="less" scoped>
  .lang-content {
    display: inline-block;
    position: relative;
    z-index: 100;
  }
  
  .lang-content .lang-item {
    position: absolute;
    color: #04050a;
    background:rgba(41,46,57,1);
    right: -10px;
    font-size: 14px;
    min-width: 102px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
    color:white;
    border-radius: 2px;
    overflow: hidden;
  }
  
  /*.lang-content .lang-item:before {*/
    /*content: '';*/
    /*display: inline-block;*/
    /*position: absolute;*/
    /*top: -10px;*/
    /*left: 50%;*/
    /*margin-left: -3px;*/
    /*width: 0;*/
    /*height: 0;*/
    /*border-style: solid;*/
    /*border-width: 0 7.5px 10px 7.5px;*/
    /*border-color: transparent transparent #fff transparent;*/
  /*}*/
  
  .lang-content .lang-item li {
    cursor: pointer;
    text-align: center;
    line-height: 40px;
  }
  
  .lang-content .lang-item li:hover,
  .lang-content .lang-item li.hover {
    background:rgba(51,57,70,1);
    color:rgba(136,152,223,1);
  }
  
  .lang-content .lang {
    display: inline-block;
    height: 22px;
    padding-right: 15px;
    line-height: 22px;
    font-size: 14px;
    position: relative;
    cursor: pointer;
    color: white;
    background: url('../../static/images/arrowdown.png') no-repeat center right;
    i.iconfont {
      position: absolute;
      right: 6px;
      font-size: 20px;
      text-indent: 0;
      color: #ad363f !important;
      transition: all 0.3s linear;
    }
    &.show {
      i {
        transform: rotate(-180deg);
        -ms-transform: rotate(-180deg);
        -o-tranform: rotate(-180deg);
        -webkit-transform: rotate(-180deg);
        -moz-transform: rotate(-180deg);
      }
    }
  }
  
  .lang.hover:before {
    content: '';
    background: url("../../static/images/lang-ball.svg") no-repeat center center;
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: middle;
    
  }
  .lang.hover:hover:before{
    content: '';
    background: url("../../static/images/lang-ball_check.svg") no-repeat center center;
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: middle;
  }
</style>

