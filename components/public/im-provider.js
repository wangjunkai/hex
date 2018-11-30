const privatekey = 'MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgb38n60DZJPzTXhxt814egRy3wFcCDaHVqbVprOWCYSWhRANCAASeFBB52TWfGT5/UXvXLIF1H9J+LEInWmmjHo5ID85pnpSJQz2AUFRWPDORCGv+Uh2DPXvaySkdCtJsYj+ksnSF'
const publickey = 'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEnhQQedk1nxk+f1F71yyBdR/SfixCJ1ppox6OSA/OaZ6UiUM9gFBUVjwzkQhr/lIdgz172skpHQrSbGI/pLJ0hQ=='
const msgobj = {
  message: '',
  desc: '',
  ext: '0' //订单的状态（0 为创建订单成功未支付）
}
const options = {
  isAccessFormalEnv: true,
  isLogOn: false
}
export default () => ({
  privatekey,
  publickey,
  logininfo: {
    sdkAppID: '1400096848',
    appIDAt3rd: '1256072878',
    accountType: '28045',
    identifier: '',
    identifierNick: '',
    userSig: ''
  },
  uploadinfo: {
    'file': '', //图片对象
    'From_Account': '',
    'To_Account': '', //接收者
    'businessType': 2
  },
  options,
  historyoption: {
    'Peer_Account': '', //好友帐号
    'MaxCnt': 15, //拉取消息条数
    'LastMsgTime': 0, //最近的消息时间，即从这个时间点向前拉取历史消息
    'MsgKey': ''
  },
  friendid: '',
  listeners: {
    onConnNotify: function(){},
    jsonpCallback:  function(){},
    onMsgNotify:  function(){},
    onGroupSystemNotifys:  function(){},
    onC2cEventNotifys:  function(){},
    onFriendSystemNotifys:  function(){}
  },
  uploadPic: function () {
    return new Promise((resolve, reject) => {
      webim.uploadPic(this.uploadinfo,
        (resp) => {
          resolve(resp)
        },
        (err) => {
          reject(err)
        }
      )
    })
  },
  login: function () {
    return new Promise((resolve, reject) => {
      webim.login(
        this.logininfo,
        this.listeners,
        this.options,
        (resp) => {
          resolve(resp)
        },
        (err) => {
          reject(err)
        }
      );
    })
  },
  logout: function () {
    return new Promise((resolve, reject) => {
      webim.logout((resp) => {
          resolve(resp)
        },
        (err) => {
          reject(err)
        })
    })
  },
  /*发送消息*/
  sendmessage: function (msgobj) {
    const selSess = new webim.Session('C2C', this.friendid, this.friendid, '', Math.round(new Date().getTime() / 1000))
    const msg = new webim.Msg(selSess, true, -1, -1, -1, this.logininfo.identifier, 0, this.logininfo.identifierNick)
    const custom_obj = new webim.Msg.Elem.Custom(msgobj.message, msgobj.desc, msgobj.ext)
    msg.addCustom(custom_obj);
    //调用发送消息接口
    msg.sending = 1;
    return new Promise((resolve, reject) => {
      webim.sendMsg(
        msg,
        (resp) => {
          resolve({
            resp, msg
          })
        },
        (err) => {
          reject(err)
        })
    })
  },
  /*发送图片*/
  sendimage: function (images, file) {
    const selSess = new webim.Session('C2C', this.friendid, this.friendid, '', Math.round(new Date().getTime() / 1000));
    const msg = new webim.Msg(selSess, true, -1, -1, -1, this.logininfo.identifier, 0, this.logininfo.identifierNick);
    const images_obj = new webim.Msg.Elem.Images(images.File_UUID, file.name.split(".")[1]);

    for (let i in images.URL_INFO) {
      const img = images.URL_INFO[i];
      let newImg;
      let type;
      switch (img.PIC_TYPE) {
        case 1: //原图
          type = 1; //原图
          break;
        case 2: //小图（缩略图）
          type = 3; //小图
          break;
        case 4: //大图
          type = 2; //大图
          break;
      }
      newImg = new webim.Msg.Elem.Images.Image(type, img.PIC_Size, img.PIC_Width, img.PIC_Height, img.DownUrl);
      images_obj.addImage(newImg);
    }
    msg.addImage(images_obj);

    return new Promise((resolve, reject) => {
      webim.sendMsg(
        msg,
        (resp) => {
          resolve({
            resp, msg
          })
        },
        (err) => {
          reject(err)
        })
    })
  },
  gethistory: function () {
    return new Promise((resolve, reject) => {
      webim.getC2CHistoryMsgs(
        this.historyoption,
        (res) => {
          resolve(res)
        },
        (res) => {
          reject(res)
        }
      )
    })
  },
  /*用于监听用户连接状态变化的函数*/
  onConnNotify: function (resp) {
    let info;
    switch (resp.ErrorCode) {
      case webim.CONNECTION_STATUS.ON:
        webim.Log.warn('建立连接成功: ' + resp.ErrorInfo);
        break;
      case webim.CONNECTION_STATUS.OFF:
        info = '连接已断开，无法收到新消息，请检查下您的网络是否正常: ' + resp.ErrorInfo;
        alert(info);
        webim.Log.warn(info);
        break;
      case webim.CONNECTION_STATUS.RECONNECT:
        info = '连接状态恢复正常: ' + resp.ErrorInfo;
        alert(info);
        webim.Log.warn(info);
        break;
      default:
        webim.Log.error('未知连接状态: =' + resp.ErrorInfo);
        break;
    }
  },
  /*用于 IE9（含）以下浏览器中 jsonp 回调函数,移动端可不填*/
  jsonpCallback: function (resp) {

  },
  /*监听新消息函数*/
  onMsgNotify: function (resp) {
  },
  /*监听（多终端同步）群系统消息事件*/
  onGroupSystemNotifys: function (resp) {

  },
  /*监听 C2C 系统消息通道*/
  onC2cEventNotifys: function (resp) {

  },
  /*监听好友系统通知事件*/
  onFriendSystemNotifys: function (resp) {

  }
})
