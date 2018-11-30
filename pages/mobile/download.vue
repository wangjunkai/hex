<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide swiper-slide-invite">
        <div class="course first-course ">
          <div class="guidance">
            <a class="guidance-btn"
               href="itms-services://?action=download-manifest&url=https://images.hexpro.biz/hex/HEX.plist">
              <img src="~static/images/guide/down-android.png" alt="">
            </a>
            <a class="guidance-btn" href="javascript:;">
              <img src="~static/images/guide/down-ios.png" alt="">
            </a>
            <a class="guidance-btn-big" href="https://images.ihuoqiu.com/hex/hex.apk">
              <img src="~static/images/guide/big-ans.png" alt="">
            </a>
            <div class="openDeal">在这里，开启数字资产交易新体验</div>
          </div>
          <span class='animate-arrow'></span>
        </div>
      </div>
      <div class="swiper-slide swiper-slide-invite-major">
        <div class="course course1">
          <div class="course-step">
            <button>步骤1</button>
            <p>点击桌面【设置】</p>
          </div>
          <span class='animate-arrow'></span>
        </div>
      </div>
      <div class="swiper-slide ">
        <div class="course course2">
          <div class="course-step">
            <button>步骤 2</button>
            <p>选择【设置】-【通用】</p>
          </div>
          <span class='animate-arrow'></span>
        </div>
      </div>
      <div class="swiper-slide ">
        <div class="course course3">
          <div class="course-step">
            <button>步骤 3</button>
            <p>选择【通用】-【设备管理】</p>
          </div>
          <span class='animate-arrow'></span>
        </div>
      </div>
      <div class="swiper-slide">
        <div class="course course4 ">
          <div class="course-step">
            <button>步骤 4</button>
            <p>选择【设备管理】,找到证书</p>
          </div>
          <span class='animate-arrow'></span>
        </div>
      </div>
      <div class="swiper-slide ">
        <div class="course course5">
          <div class="course-step">
            <button>步骤 5</button>
            <p>点击“信任NUR.AI.GAN.TOO”证书</p>
          </div>
          <span class='animate-arrow'></span>
        </div>
      </div>
      <div class="swiper-slide ">
        <div class="course course6">
          <div class="course-step">
            <button>步骤 6</button>
            <p>点击弹窗中的信任</p>
          </div>
          <span class='animate-arrow'></span>
        </div>
      </div>
      <div class="swiper-slide swiper-slide-invite-experience">
        <div class="course course7">
          <div class="course-step">
            <button>步骤 7</button>
            <p>回到桌面使用HEX APP</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from "swiper"

  export default {
    name: 'download',
    layout: 'm-default',
    data() {
      return {}
    },
    methods: {
      init() {
        new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          direction: 'vertical'
        });
      }
    },
    mounted() {
      this.init();
    }

  }
</script>
<style src="swiper/dist/css/swiper.min.css"></style>
<style lang='less' scoped>
  .swiper-container {
    width: 100%;
    height: 100%;
  }

  .course.pcwidth {
    width: 30px;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .swiper-slide-invite {
    position: relative;
    .guidance {
      position: absolute;
      bottom: 35px;
      left: 0;
      right: 0;
      border-radius: 5px;
      width: 80%;
      overflow: hidden;
      margin: auto;
      .guidance-btn {
        width: 50%;
        float: left;
      }
    }
    img {
      width: 100%;
    }
  }

  .swiper-slide .first-course {
    background: url('../../static/images/guide/invite.png') no-repeat center;
    background-size: 100% 100%;
  }

  .swiper-slide .course2 {
    background: url('../../static/images/guide/course2.png') no-repeat center;
    background-size: 100% 100%;
  }

  .swiper-slide .course3 {
    background: url('../../static/images/guide/course3.png') no-repeat center;
    background-size: 100% 100%;
  }

  .swiper-slide .course4 {
    background: url('../../static/images/guide/course4.png') no-repeat center;
    background-size: 100% 100%;
  }

  .swiper-slide .course5 {
    background: url('../../static/images/guide/course5.png') no-repeat center;
    background-size: 100% 100%;
  }

  .swiper-slide .course6 {
    background: url('../../static/images/guide/course6.png') no-repeat center;
    background-size: 100% 100%;
  }

  .swiper-slide .course7 {
    background: url('../../static/images/guide/course7.png') no-repeat center;
    background-size: 100% 100%;
  }

  .course {
    position: relative;
    width: 100%;
    height: 100%;
    .course-step {
      width: 100%;
      position: absolute;
      left: 50%;
      bottom: 60px;
      transform: translate(-50%);
      button {
        background: white;
        font-size: 15px;
        padding: 5px 31px;
        border-radius: 20px;
        bottom: 0;
        color: rgba(44, 147, 242, 1);
        margin-bottom: 27px;
      }
      p {
        color: white;
        font-size: 15px;
        font-weight: 500;
      }
    }
  }

  .course1 {
    background: url('../../static/images/guide/course1.png') no-repeat center;
    background-size: 100% 100%;
  }

  .animate-arrow {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    width: 22px;
    height: 16px;
    margin: auto;
    background: url('../../static/images/guide/animation-arrow.png') no-repeat center center;
    background-size: cover;
    display: block;
    vertical-align: middle;
    -webkit-animation: tipmove 1.5s infinite linear;
  }

  @-webkit-keyframes tipmove {
    0% {
      bottom: 10px;
    }
    50% {
      bottom: 15px;
    }
    100% {
      bottom: 20px;
    }
  }

  .openDeal {
    color: white;
    font-size: 14px;
    border: 1px solid white;
    line-height: 35px;
    border-radius: 50px;
    width: 90%;
    margin: 15px auto;
  }
</style>
