<style scoped lang="less">

  ul {
    margin-top: 70px;
  }

  .tip-describe {
    color: #D8D0C7;
  }

  .partner-aptitude, .partner-equity, .proposal {
    width: 1200px;
    margin: auto;
  }

  .partner-equity-area {
    text-align: center;
    background: #F2F2F2;
    color: #333333;
    overflow: hidden;
    .tip-describe, .same {
      color: #333;
    }
  }

  .same {
    padding-top: 105px;
    font-size: 20px;
    font-weight: 600;
    color: rgba(186, 145, 86, 1);
    line-height: 34px;
    margin-bottom: 5px;
  }

  .same:before {
    content: '';
    width: 80px;
    height: 17px;
    display: inline-block;
    background: url("../static/images/partnel/partnel-arrow-right.svg") no-repeat left center;
    background-size: 59px 17px;
  }

  .same:after {
    content: '';
    width: 92px;
    height: 17px;
    display: inline-block;
    background: url("../static/images/partnel/partnel-arrow-left.svg") no-repeat right center;
    background-size: 59px 17px;
  }

  .partner {
    background: white;

    .bg {
      height: 1150px;
      color: white;
      background: url('../static/images/partnel/bg0.png') no-repeat left top;
      background-size: 100% 100%;
      .partner-plan {
        width: 1200px;
        margin: auto;
        padding: 125px 0 20px;
        text-align: center;
        .partner-pic {
          width:640px;
          margin: auto;
          font-size: 67px;
          line-height: 72px;
          p{
            font-weight: bold;
            text-align:center;
            color:RGBA(215, 167, 94, 1);
          }
          img{
            width:470px;
          }

        }
        .partner-describe {
          width: 575px;
          color: RGBA(186, 145, 86, 1);
          font-size: 14px;
          margin: 0 auto 45px;
          margin-top: 30px;
        }
        button {
          width: 240px;
          height: 50px;
          color: RGBA(19, 19, 22, 1);
          font-size: 16px;
          background: linear-gradient(RGBA(231, 210, 168, 1), RGBA(215, 167, 94, 1));
        }

        .partner-ul {
          height: 290px;
          width: 1200px;
          margin: auto;
          margin-top: 111px;
          li {
            width: 299px;
            padding-top: 47px;
            border-right: 1px #2d2d2d dashed;
            img {
              margin: auto;
              width: 130px;
              height: 136px;
            }
            p {
              margin-top: 15px;
              font-size: 14px;
              color: #BA9156;
              line-height: 20px;
            }
            p:last-child {
              margin-top: 0;
              margin-bottom: 50px;
            }
          }
          li:last-child {
            border-right: none;
          }
        }
      }
    }
    .partner-equity {
      ul {
        margin-bottom: 107px;
        li {
          height: 160px;
          float: left;
          width: 360px;
          margin: 35px 40px 0 0;
          border: 1px #f2f2f2 dashed;
          background: white;
          border-radius: 10px;
          .equity-ul {
            width: 179px;
            margin-top: 29px;
            img {
              width: 120px;
              height: 94px;
            }
          }
          .equity-earnings {
            margin-top: 40px;
            width: 179px;
            p {
              text-align: left;
              font-size: 16px;
              color: #333333;
            }
            p:last-child {
              margin-top: 12px;
              font-size: 12px;
              color: #666666;
              padding-right: 35px;
            }
          }
        }
        li.nMargin {
          margin-right: 0;
        }
      }

    }
    .partner-aptitude {
      height: 570px;
      text-align: center;
      .tip-describe, .same {
        color: #333;
      }
      .aptitude-ul {
        li {
          width: 300px;
          float: left;
          img {
            width: 120px;
            height: 120px;
          }
          .partner-aptitude-title {
            font-size: 16px;
            font-weight: bold;
            margin-top: 33px;
            padding-bottom: 10px;
          }
          .detail {
            font-size: 12px;
            color: #666666;
          }
        }
      }
    }
    .proposal-area {
      background: url('../static/images/partnel/bg1.png') no-repeat left top;
      background-size: 100% 100%;
    }
    .proposal {
      .same {
        font-size: 20px;
        text-align: center;
      }
      .proposal-type {
        padding-top: 70px;
      }
      .proposal-type > div {
        color: #BA9156;
        width: 50%;
        img {
          width: 200px;
          height: 200px;
          margin: auto;
          display: block;
        }
      }
      .proposal-type div.proposal-info {
        border-left: 1px #2d2d2d dashed;
        .proposal-info-STEP {
          margin-bottom: 50px;
          padding-left: 50px;
          display: flex;
          flex-direction: row;
          .step-number {
            width: 90px;
          }
          .step-info {
            margin-top: 10px;
          }
          p span {
            color: #D8D0C7;
            font-size: 14px;
          }
        }
        .proposal-info-STEP-3 {
          margin-bottom: 100px;
        }
        .proposal-info-STEP:before {
          content: '';
          width: 9px;
          height: 9px;
          background: url("../static/images/partnel/circle.svg") no-repeat;
          /*background-size: cover;*/
          /*vertical-align: middle;*/
          /*display: inline-block;*/
          position: relative;
          left: -55px;
          top: 6px;
        }
      }
    }
    .apply-area {
      background: url('../static/images/partnel/bg2.png') no-repeat left top;
      background-size: 100% 100%;
      .apply {
        width: 1200px;
        margin: auto;
        overflow: hidden;
        padding: 45px 0;
        div {
          float: left;
          p {
            color: #BA9156;
            font-size: 18px;
            line-height: 28px;
          }
        }
        button {
          float: right;
          width: 200px;
          height: 50px;
          line-height: 50px;
          color: #131316;
          font-size: 16px;
          text-align: center;
          background: linear-gradient(to right, #e9d7b1, #e9d7b1);
          margin-top: 5px;
        }
      }
    }
  }

  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    background: black;
    opacity: 0.7;
    left: 0;
    z-index: 20;

  }

  .partnerPopup{
    .same {
      padding-top:0;
      width: 321px;
      text-align: center;
    }
    .cbo {
      width:321px;
      color: white;
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 10px;
      text-align: center;
    }
    .cbo-img{
      width:321px;
      height:321px;
    }
    p.same:before {
      width: 75px;
    }
    p.same:after {
      width: 77px;
    }
  }

</style>

<template>
  <div class="partner">
    <div class="bg">
      <div class="partner-plan">
       <P class="partner-pic"><img src="~/static/images/partnel/plan-small-text.svg" alt=""></P>
        <div class="partner-pic">
          <p>{{$t('partner.plan')}}</p>
          <img src="~/static/images/partnel/plan-line.svg" alt="">
        </div>
        <p class="partner-describe">{{$t('partner.partner')}}</p>
        <button @click.stop="show">{{$t('partner.Applypartner')}}</button>
        <p class="same">【{{$t('partner.GlobalPartner')}}】{{$t('partner.Mission')}}</p>
        <p class="tip-describe">{{$t('partner.Partnerspromote')}}</p>
        <ul class="ovh partner-ul">
          <li class="fl">
            <img src="~/static/images/partnel/plan-1.svg" alt="">
            <p>{{$t('partner.suggestions')}}</p>
            <p>{{$t('partner.optimization')}}</p>
          </li>
          <li class="fl">
            <img src="~/static/images/partnel/plan-2.svg" alt="">
            <p>{{$t('partner.team')}}</p>
            <p>{{$t('partner.expansion')}}</p>
          </li>
          <li class="fl">
            <img src="~/static/images/partnel/plan-3.svg" alt="">
            <p>{{$t('partner.Jointly')}}</p>
            <p>{{$t('partner.Service')}}</p>
          </li>
          <li class="fl">
            <img src="~/static/images/partnel/plan-4.svg" alt="">
            <p>{{$t('partner.Recognize')}}</p>
            <p>{{$t('partner.together')}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="partner-equity-area">
      <div class="partner-equity">
        <p class="same">【{{$t('partner.HEXPartner')}}】{{$t('partner.Interests')}}</p>
        <p class="tip-describe">
          {{$t('partner.generous')}}
        </p>
        <ul class="ovh">
          <li>
            <div class="fl equity-ul">
              <img src="~/static/images/partnel/equity-1.svg" alt="">
            </div>
            <div class="fl equity-earnings">
              <p class="fw">{{$t('partner.income')}}</p>
              <p>{{$t('partner.currency')}}</p>
            </div>
          </li>
          <li>
            <div class="fl equity-ul">
              <img src="~/static/images/partnel/equity-2.svg" alt="">
            </div>
            <div class="fl equity-earnings">
              <p class="fw">{{$t('partner.Candy')}}</p>
              <p>{{$t('partner.provided')}}</p>
            </div>
          </li>
          <li class="nMargin">
            <div class="fl equity-ul">
              <img src="~/static/images/partnel/equity-3.svg" alt="">
            </div>
            <div class="fl equity-earnings">
              <p class="fw">{{$t('partner.channel')}}</p>
              <p>{{$t('partner.exclusive')}}</p>
            </div>
          </li>
          <li>
            <div class="fl equity-ul">
              <img src="~/static/images/partnel/equity-4.svg" alt="">
            </div>
            <div class="fl equity-earnings">
              <p class="fw">{{$t('partner.Exchange')}}</p>
              <p>{{$t('partner.Community')}}</p>
            </div>
          </li>
          <li>
            <div class="fl equity-ul">
              <img src="~/static/images/partnel/equity-5.svg" alt="">
            </div>
            <div class="fl equity-earnings">
              <p class="fw">{{$t('partner.priority')}}</p>
              <p>{{$t('partner.tickets')}}</p>
            </div>
          </li>
          <li class="nMargin">
            <div class="fl equity-ul">
              <img src="~/static/images/partnel/equity-6.svg" alt="">
            </div>
            <div class="fl equity-earnings">
              <p class="fw">{{$t('partner.Special')}}</p>
              <p>{{$t('partner.Recommend')}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="partner-aptitude-area">
      <div class="partner-aptitude">
        <p class="same">{{$t('partner.Obtain')}}【{{$t('partner.HEXPartner')}}】{{$t('partner.Qualification')}}</p>
        <p class="tip-describe">
          {{$t('partner.obtaining')}}
        </p>
        <ul class="ovh aptitude-ul">
          <li>
            <div><img src="~/static/images/partnel/aptitude-1.svg" alt=""></div>
            <p class="partner-aptitude-title">{{$t('partner.Successfully')}}</p>
            <p class="detail">
              {{$t('partner.more')}}
            </p>
            <p class="detail">
              {{$t('partner.Totalassets')}}
            </p>
          </li>
          <li>
            <div><img src="~/static/images/partnel/aptitude-2.svg" alt=""></div>
            <p class="partner-aptitude-title">{{$t('partner.project')}}</p>
            <p class="detail">
              {{$t('partner.currencys')}}
            </p>
          </li>
          <li>
            <div><img src="~/static/images/partnel/aptitude-3.svg" alt=""></div>
            <p class="partner-aptitude-title">{{$t('partner.development')}}</p>
            <p class="detail">
              {{$t('partner.resources')}}
            </p>
            <p class="detail">
              {{$t('partner.independently')}}
            </p>
          </li>
          <li class="nMargin">
            <div><img src="~/static/images/partnel/aptitude-4.svg" alt=""></div>
            <p class="partner-aptitude-title">{{$t('partner.Industry')}}</p>
            <p class="detail">
              {{$t('partner.Digital')}}
            </p>
            <p class="detail">
              {{$t('partner.Senior')}}
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="proposal-area">
      <div class="proposal">
        <p class="same">{{$t('partner.Application')}}</p>
        <div class="ovh proposal-type">
          <div class="fl">
            <img src="~/static/images/partnel/QR-code.png" alt="">
          </div>
          <div class="fl proposal-info">
            <div class="proposal-info-STEP">
              <p class="step-number">
                STEP1
              </p>
              <div>
                <p>
                  {{$t('partner.code')}}
                </p>
              </div>
            </div>
            <div class="proposal-info-STEP">
              <p class="step-number">
                STEP2
              </p>
              <div>
                <p>{{$t('partner.Tell')}}：</p>
                <p class="step-info">
                  <span>{{$t('partner.Contact')}}</span>
                </p>
                <p>
                  <span>{{$t('partner.Personal')}}</span>
                </p>
              </div>
            </div>
            <div class="proposal-info-STEP proposal-info-STEP-3">
              <p class="step-number">
                STEP3
              </p>
              <div>
                <p>
                  {{$t('partner.feedback')}}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="apply-area">
      <div class="apply">
        <div>
          <p>{{$t('partner.Join')}}</p>
          <p>{{$t('partner.redefine')}}</p>
        </div>
        <button @click.stop="show">{{$t('partner.Membership')}}</button>
      </div>
    </div>
      <el-dialog
        :visible.sync="centerDialogVisible"
        custom-class="partnerPopup"
        :lock-scroll="true"
        width="20%"
        :show-close="false"
        center>
          <p class="same pop-same">{{$t('partner.commerce')}}</p>
          <p class="cbo">HEX CBO</p>
          <img class="cbo-img" src="~/static/images/business-code.jpg" alt="">
      </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "partner",
    data() {
      return {
        centerDialogVisible: false,
      }
    },
    methods: {
      show() {
        this.centerDialogVisible = true;
      }
    }
  }
</script>
