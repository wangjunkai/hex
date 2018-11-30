<style lang="less">
  @import "../../static/styles/color";
  
  .hex-im {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(225, 224, 236, 1);
    font-size: 14px;
    .photo {
      display: inline-block;
      border-radius: 200px;
      text-align: center;
      min-width: 36px;
      width: 36px;
      height: 36px;
      line-height: 36px;
      vertical-align: middle;
      margin-right: 10px;
      color: #ffffff;
    }
    .im_top {
      height: 75px;
      padding: 0 20px;
      line-height: 75px;
      .info {
        line-height: 1.5;
        display: inline-block;
        vertical-align: middle;
      }
      .name {
        font-weight: bold;
        color: #000000;
      }
      .comment {
        display: inline-block;
        font-weight: normal;
        font-size: 12px;
        color: #A5A9BE;
      }
      .phone {
        background-image: url("../../static/images/trade/phone.svg");
        background-repeat: no-repeat;
        background-size: cover;
        display: inline-block;
        width: 24px;
        height: 24px;
        vertical-align: middle;
        cursor: pointer;
      }
      .phone:hover {
        background-image: url("../../static/images/trade/phone-active.svg");
      }
    }
    .im_center {
      overflow: hidden;
      flex: 600px;
      padding: 0 19px;
      background-color: #F5F7FB;
      text-align: center;
      .time {
        display: inline-block;
        height: 18px;
        line-height: 18px;
        background: rgba(251, 252, 254, 1);
        border-radius: 3px;
        font-size: 12px;
        color: #999999;
        margin: 10px 0;
        padding: 2px 5px;
      }
      .tip {
        display: inline-block;
        max-width: 240px;
        line-height: initial;
        background: #e8ecf2;
        border-radius: 3px;
        padding: 8px 22px;
        font-size: 14px;
        color: #333333;
        text-align: left;
        margin-bottom: 20px;
      }
      .message {
        .photo {
          margin: 0;
        }
        margin-bottom: 20px;
        width: 100%;
        .self {
          float: left;
          max-width: 70%;
          display: flex;
        }
        .other {
          float: right;
          max-width: 70%;
          display: flex;
        }
        .self .message_text {
          margin-left: 10px;
        }
        .self .message_text:before {
          border-width: 5px 7px 5px 0;
          border-color: transparent #ffffff transparent transparent;
          left: -6px;
        }
        .other .message_text:after {
          border-width: 5px 0 5px 7px;
          border-color: transparent transparent transparent #ffffff;
          right: -6px;
        }
        .other .message_text:after,
        .self .message_text:before {
          content: '';
          top: 15px;
          display: inline-block;
          width: 0;
          height: 0;
          position: absolute;
          border-style: solid;
        }
        .other .message_text {
          margin-right: 10px;
        }
        .message_text {
          position: relative;
          background: #ffffff;
          border-radius: 5px;
          padding: 10px 16px;
          font-size: 14px;
          color: #21283E;
          display: inline-block;
          flex: 1;
          word-break: break-all;
          text-align: left;
        }
      }
    }
    .im_bottom {
      flex: auto;
      min-height: 60px;
      padding: 20px;
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      .im_textarea {
        .el-textarea__inner {
          resize: none;
          flex: auto;
          border: 0;
          padding: 0;
          max-height: 100px;
        }
      }
      .im_textarea.el-textarea {
        width: initial;
        flex: auto;
        margin-right: 20px;
      }
      .push, .link {
        display: inline-block;
        background-repeat: no-repeat;
        background-size: cover;
        vertical-align: middle;
        cursor: pointer;
      }
      .push {
        width: 20px;
        height: 18px;
        background-image: url("../../static/images/trade/push.svg");
      }
      .link {
        width: 18px;
        height: 18px;
        margin-left: 20px;
        background-image: url("../../static/images/trade/link.svg");
      }
      .push:hover {
        background-image: url("../../static/images/trade/push-active.svg");
      }
      .link:hover {
        background-image: url("../../static/images/trade/link-active.svg");
      }
      .link .link_pic {
        display: none;
      }
    }
    .link_fileimage {
      width: 600px;
      .el-dialog__header {
        padding: 0;
      }
      .el-dialog__body {
        text-align: center;
        img {
          width: auto;
          max-width: 100%;
          vertical-align: middle;
        }
      }
    }
  }
</style>

<template>
  <div class="hex-im">
    <div class="im_top clearfix">
      <div class="left">
        <span class="photo"
              :style="{'background-color':global_get_random_color(friendid.substring(friendid.length-1))}">
          {{getname(orderdata.nikename)}}
        </span>
        <div class="info">
          <p class="name">{{orderdata.nikename}}</p>
          <p class="comment">交易{{orderdata.tradenum}} 好评{{orderdata.goodcomment}} 差评{{orderdata.badcomment}}</p>
        </div>
      </div>
      <div class="right">
        <span class="phone"></span>
      </div>
    </div>
    <div class="im_center" ref="im_center" v-bar>
      <div>
        <div
          :key="index"
          v-for="(item,index) in chatlist">
          <!--时间-->
          <template>
            <div class="time">
              {{gettime(item.time)}}
            </div>
            <br>
          </template>
          <!--系统提示-->
          <template v-if="item.elems[0].content.ext">
            <div class="tip">
              {{getdes(item)}}
            </div>
            <br>
          </template>
          <!--消息-->
          <div class="message clearfix" v-if="ismessage(item)">
            <!--自己的消息-->
            <div class="other" v-if="item.isSend">
              <p class="message_text">
                <img v-if="isimage(item)"
                     @load="resetscroll"
                     @click="showimage($event)"
                     :src="getimage(item)" alt="">
                <span v-else>{{item.elems[0].content.data}}</span>
              </p>
              <span class="photo"
                    :style="{'background-color':global_get_random_color($userinfo.uid.substring($userinfo.uid.length-1))}">
                {{getname($userinfo.nickname)}}
              </span>
            </div>
            <div class="self" v-else>
              <span class="photo"
                    :style="{'background-color':global_get_random_color(friendid.substring(friendid.length-1))}">
                {{getname(orderdata.nikename)}}
              </span>
              <p class="message_text">
                <img v-if="isimage(item)"
                     @load="resetscroll"
                     @click="showimage($event)"
                     :src="getimage(item)" alt="">
                <span v-else>{{item.elems[0].content.data}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="im_bottom">
      <el-input class="im_textarea"
                type="textarea"
                :autosize="true"
                v-model="message"
                @keydown.native="sendmessage('',$event)"
                placeholder="请输入文字，按回车发送">
      </el-input>
      <span class="push" @click="sendmessage()"></span>
      <span class="link" @click="handleuploadfile">
         <input class="link_pic" @change="changepic" ref="link-pic" type="file">
      </span>
    </div>
    <el-dialog
      top="0"
      custom-class="detail-order-warn"
      :visible.sync="uploadfilestate">
      <div>
        <img style="max-width:100%;max-height: 100px;width: auto;" :src="fileobj.img" alt="">
        <p class="">图片名称：{{fileobj.name}}</p>
        <p class="tip_h2">图片大小：{{parseFloat(fileobj.size/1024).toFixed(2)}}kb</p>
        <span class="detail-button"
              v-loading="uploadloading"
              @click="confirmreceipt">发送</span>
      </div>
    </el-dialog>
    <el-dialog
      :show-close="false"
      custom-class="link_fileimage"
      :visible.sync="fileimagestate">
      <img :src="fileimage"
           @load="linkimageloading=false"
           alt="">
    </el-dialog>
  </div>
</template>
<script>
  
  export default {
    watch: {
      '$userinfo': function (val) {
        if (!val.uid) {
          this.logout()
        }
      },
      'friendid': function (val, oldval) {
        if (val && val != oldval) {
        }
      }
    },
    props: ['orderdata', 'sign'],
    data() {
      return {
        message: '',
        chatlist: [],
        friendid: '',
        file: '',
        fileimagestate: false,
        fileimage: '',
        uploadfilestate: false,
        fileobj: {},
        uploadloading: false,
        isfirst: true,
        linkimageloading: false
      }
    },
    subscribe() {
      return {
        sendImMessage(val) {
          if (val) {
            this.sendmessage(val)
          }
        }
      }
    },
    created() {
    
    },
    mounted() {
      this.login()
      this.file = this.$refs['link-pic']
      this.friendid = this.getfriendid()
      this._data.$im.friendid = this.friendid
    },
    methods: {
      showimage(event) {
        this.fileimagestate = true
        this.linkimageloading = true
        this.fileimage = ''
        const img = event.target.src.split("#"); //字符分割
        if (img) {
          this.fileimage = img[2] ? img[2] : img[0]
        }
      },
      ismessage(item) {
        return item.elems[0].content.data || this.isimage(item)
      },
      isimage(item) {
        return item.elems[0].type == 'TIMImageElem'
      },
      getimage(item) {
        const content = item.elems[0].content
        const smallImage = content.getImage(webim.IMAGE_TYPE.SMALL);//小图
        let bigImage = content.getImage(webim.IMAGE_TYPE.LARGE);//大图
        let oriImage = content.getImage(webim.IMAGE_TYPE.ORIGIN);//原图
        if (!bigImage) {
          bigImage = smallImage;
        }
        if (!oriImage) {
          oriImage = smallImage;
        }
        return `${smallImage.getUrl()}#${bigImage.getUrl()}#${oriImage.getUrl()}`
      },
      onProgressCallBack(res) {
      },
      confirmreceipt() {
        const im = this._data.$im
        const _self = this
        const files = this.file.files
        if (!files) return;
        if (this.uploadloading) {
          return
        }
        this.uploadloading = true
        const file = files[0];
        //上传图片
        im.uploadinfo.file = file
        im.uploadinfo.To_Account = this.friendid
        im.uploadinfo.From_Account = this.$userinfo.uid
        im.uploadinfo.onProgressCallBack = this.onProgressCallBack
        im.uploadPic()
          .then((resp) => {
            return resp
          }, (err) => {
            throw new Error(err)
          })
          .then((resp) => {
            im.sendimage(resp, file)
              .then(
                ({resp, msg}) => {
                  _self.uploadloading = false
                  _self.uploadfilestate = false
                  _self.chatlist.push(msg)
                  this.resetscroll()
                },
                (err) => {
                  _self.uploadloading = false;
                  _self.$store.commit('set_message', {type: 'error', text: '发送图片失败'});
                })
          })
          .catch((e) => {
            _self.uploadloading = false
            this.$store.commit('set_message', {type: 'error', text: '发送图片失败'});
          })
      },
      handleuploadfile() {
        this.file.click()
      },
      /*选择图片*/
      changepic(event) {
        const _self = this
        const files = event.target.files;
        if (!files) return;
        this.uploadfilestate = true
        const file = files[0];
        const fileSize = file.size;
        
        //先检查图片类型和大小
        if (!this.cheakpic(file, fileSize)) {
          return;
        }
        //预览图片
        const reader = new FileReader();
        reader.onload = (function (file) {
          return function (e) {
            _self.fileobj = {
              img: this.result,
              name: file.name,
              size: fileSize
            }
          };
        })(file);
        //预览图片
        reader.readAsDataURL(file);
      },
      /*检查图片类型*/
      cheakpic(obj, fileSize) {
        const picExts = 'jpg|jpeg|png|bmp|gif|webp';
        const photoExt = obj.type.substr(obj.type.lastIndexOf("/") + 1).toLowerCase(); //获得文件后缀名
        const pos = picExts.indexOf(photoExt);
        if (pos < 0) {
          this.$store.commit('set_message', {type: 'error', text: '选择的不是图片,请重新选择'});
          return false;
        }
        fileSize = Math.round(fileSize / 1024 * 100) / 100; //单位为KB
        if (fileSize > 30 * 1024) {
          this.$store.commit('set_message', {type: 'error', text: '选择的图片超过最大限制'});
          return false;
        }
        return true;
      },
      /*获取用户操作信息*/
      getdes(item) {
        let type = item.elems[0].content.ext
        if (!type) {
          return ''
        }
        type = Number(type)
        const _s = item.isSend
        const _buy = this.orderdata.direction > 0
        let msg
        switch (type) {
          case 0:/*订单已生成*/
            msg = _buy ? '订单已生成，请及时完成支付。' : '订单已生成，等待买家付款'
            break;
          case 4:/*买方已确认付款*/
            msg = _buy ? '您已将订单标记为“已付款”的状态，请等待对方确认收款和放币。' : '买家已确认付款，请查看您的收款账户。'
            break;
          case 1:/*卖方已确认收款*/
            msg = _buy ? `对方已确认收到您的付款，您所购买的${this.global_get_uppercase(this.orderdata.currencyname)}已发放到您的账户，请查收。` :
              `您已确认收款，交易${this.global_get_legaltype(this.orderdata.legaltype).name}已转至卖家账户`
            break;
          case 3:/*过期*/
          case 2:/*订单取消*/
            msg = '订单已取消'
            break;
          case 6:/*订单申诉*/
            msg = '订单已进入申诉阶段，等待客服介入处理'
            break;
        }
        return msg
      },
      getfriendid: function () {
        const d = this.orderdata
        const newd = d.type < 0 ? d.userid : d.orderuserid
        if (!newd) {
          return ''
        }
        return newd
      },
      getname(val) {
        return val ? val.substring(0, 1) : '--'
      },
      gettime(time) {
        return this.global_get_local_time(time).format('HH:mm:ss')
      },
      /*监听新消息函数*/
      onMsgNotify(resp) {
        if (resp && resp.length > 0) {
          this.chatlist = this.chatlist.concat(resp)
        }
      },
      /*登录*/
      login() {
        const im = this._data.$im
        im.logininfo.identifier = this.$userinfo.uid
        im.logininfo.userSig = this.$store.state.hex_server_tencentim_sign.value
        im.listeners.onMsgNotify = this.onMsgNotify
        const _self = this
        im.login()
          .then(
            (resp) => {
              this.gethistory()
              if (resp.identifierNick) {
                im.logininfo.identifierNick = resp.identifierNick;//设置当前用户昵称
              }
            }
          )
      },
      logout() {
        const im = this._data.$im
        im.logout()
          .then(
            (resp) => {
            }
          )
      },
      resetscroll: function () {
        let ref = this.$vuebar.getState(this.$refs.im_center);
        ref.el2.scrollTop = ref.el2.scrollHeight + 10;
      },
      /*发送消息*/
      sendmessage(obj, event) {
        if (event) {
          if (event.keyCode == 13) {
            if (!event.shiftKey) {
              event.preventDefault()
              this._sendmessage(obj)
            }
          }
        } else {
          this._sendmessage(obj)
        }
      },
      _sendmessage(obj) {
        const im = this._data.$im
        if (!this.message.trim() && !obj) {
          this.$store.commit('set_message', {type: 'error', text: '消息不能为空'});
          return
        }
        const msgLen = webim.Tool.getStrBytes(this.message.trim());
        
        let maxLen, errInfo;
        maxLen = webim.MSG_MAX_LENGTH.C2C;
        errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
        if (msgLen > maxLen) {
          this.$store.commit('set_message', {type: 'error', text: errInfo});
          return
        }
        const _self = this
        let msgobj = {
          message: '',
          desc: '',
          ext: ''
        }
        if (obj) {
          Object.assign(msgobj, obj)
        } else {
          Object.assign(msgobj, {
            message: _self.message
          })
        }
        im.sendmessage(msgobj)
          .then(
            ({resp, msg}) => {
              _self.chatlist.push(msg)
              _self.message = ''
              _self.$nextTick(() => {
                _self.resetscroll()
              })
            },
            (err) => {
            }
          )
      },
      /*获取历史记录*/
      gethistory() {
        const im = this._data.$im
        const _self = this
        im.historyoption.Peer_Account = this.friendid
        im.gethistory()
          .then(
            (res) => {
              if (res) {
                im.historyoption.MsgKey = res.MsgKey
                im.historyoption.LastMsgTime = res.LastMsgTime
                _self.chatlist = res.MsgList
                _self.$nextTick(() => {
                  _self.resetscroll()
                })
              }
            },
            (err) => {
            }
          )
      }
    }
  };
</script>

