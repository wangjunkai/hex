<template>
  <div class='experience '>
    <div class="w1200">
      <h3 class='experience-title  c-3  '>{{$t("home.exprienceTitle")}}</h3>
      <ul class="ovh">
        <li>
          <div class='ball '>
            <img src="../../static/images/ball.svg">
          </div>
          <div>
            <p class='c-3  fz2028  '>{{$t("home.exprienceWithdraw")}}</p>
            <p class=' fz14 mgt15'> {{$t("home.exprienceWithdrawTitleLanguage")}}</p>
          </div>
        </li>
        <li>
          <div class='rade_match '>
            <img src="../../static/images/rade_match.svg">
          </div>
          <div>
            <p class='c-3  fz2028  '>{{$t("home.exprienceBring")}}</p>
            <p class='fz14 mgt15'>{{$t("home.exprienceBringTitleLanguage")}}</p>
          </div>
        </li>
        <li>
          <div class='automated_trading '>
            <img src="../../static/images/automated_trading.svg">
          </div>
          <div>
            <p class='c-3  fz2028  '>{{$t("home.exprienceSystem")}}</p>
            <p class='fz14 mgt15'> {{$t("home.exprienceSystemTitleLanguage")}}</p>
          </div>
        </li>
        <li >
          <div class='Innovation_finance '>
            <img src="../../static/images/Innovation_finance.svg">
          </div>
          <div>
            <p class='c-3  fz2028  '>{{$t("home.exprienceProduct")}}</p>
            <p class='fz14 mgt15'>{{$t("home.exprienceProductTitleLanguage")}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>

</template>
<script>
  export default {
    name: 'exprience'
  }
</script>
<style lang='less' scoped>
  .fz14{
    font-size:14px;
    line-height: 22px;
    color:rgba(102,102,102,1);
  }
  .experience {
    background:rgba(248,249,251,1);
    min-width: 1200px;
    padding: 60px 0;
    .experience-title{
      font-size:24px;
      line-height: 42px;
      text-align: center;
      font-weight: 400;
    }
    .fz2028{
      font-size: 20px;
      line-height: 28px;
      color:rgba(51,51,51,1);
    }
    ul {
      li {
        float: left;
        width: 600px;
        overflow: hidden;
        margin-top:60px;
        div {
          float: left;
        }
        div:first-child {
          width: 64px;
        }
        div:last-child {
          width: 536px;
          padding-left:40px;

        }
        .ball,
        .Innovation_finance,
        .automated_trading,
        .automated_trading,
        .rade_match {
          img {
            width: 64px;
            height: auto;
          }
        }
      }
    }
  }


</style>

