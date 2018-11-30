<template>
  <div class='authentication-verification-second'>
    <p class='   anthentication_checked'> Lv.2 {{$t('memberCenter.verifieds')}}</p>
    <div class='authentication-second-countant'>
      <div class="auth-content_form">
        <div class="auth-content_group" :class="{'auth-content_group--error':$v.nation.countryid.$error}">
          <p class="title clearfix w350">
            <span class="normal-tip_error right"
                  v-if="!$v.nation.countryid.required">{{$t('formMenu.nationSelect')}}</span>
          </p>
          <div>
            <span class="ltitle">{{$t('formMenu.nation')}}</span>
            <el-select
              filterable
              class="select_input lv2"
              popper-class="select_input_popper"
              :popper-append-to-body="false"
              v-model.trim="$v.nation.countryid.$model"
              :placeholder="$t('formMenu.select')"
            >
              <el-option
                v-for="item in countryOptions"
                :key="item.countryid"
                :label="item.name+' +'+item.areacode"
                :value="item.countryid">
                <span style="float: left">{{item.name+' +'+item.areacode }}</span>
                <span style="float: right;">
                   <img :src="item.flag" style="width:20px;height:auto;padding-top:11px">
               </span>
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="auth-content_form">
        <div class="auth-content_group auth-content_group_mgt0"
             :class="{'auth-content_group--error':$v.nation.vouchertype.$error}">
          <p class="title clearfix w350">
            <span class="normal-tip_error right" v-if="!$v.nation.vouchertype.required">{{$t('authentication.selectCertificateType')}}</span>
          </p>
          <div>
            <span class="ltitle">{{$t('authentication.certificateType')}}</span>
            <el-select
              class="select_input type lv2"
              popper-class="select_input_popper"
              :popper-append-to-body="false"
              @change="changetype"
              v-model.trim="idType"
              :placeholder="$t('formMenu.select')"
            >
              <el-option
                v-for="item in certificateOptions"
                :key="item.value"
                :label="item.text"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>

      <div v-show="flagShow">
        <div class="certificate-numvber authentication-state auth-content_group"
             :class="{'auth-content_group--error':$v.nation.voucherNumber.$error}">
          <span class="widths">{{$t('authentication.certificateNumber')}}</span>
          <input class='  input'
                 type="text"
                 :placeholder="$t('authentication.certificateInput')"
                 v-model.trim="$v.nation.voucherNumber.$model">
        </div>
        <div class="certificate-numvber authentication-state auth-content_group"
             :class="{'auth-content_group--error':$v.nation.name.$error}">
          <span class="widths">{{$t('authentication.name')}}</span>
          <input class='select_input  input'
                 type="text"
                 :placeholder="$t('authentication.nameReal')"
                 v-model.trim="$v.nation.name.$model">
        </div>
        <div class="certificate-numvber authentication-state mgb0 auth-content_group"
             :class="{'auth-content_group--error':$v.nation.street.$error}">
          <span class="widths">{{$t('authentication.street')}}</span>
          <input class='select_input  input'
                 type="text"
                 :placeholder="$t('authentication.streetInput')"
                 v-model.trim="$v.nation.street.$model">
        </div>
      </div>
      <!--身份证正面-->
      <div class='id-front'>
        <p class='id-front-hint ovh'>
          <span
            class='block fl'>{{nation.vouchertype==1?$t('authentication.idCardF'):$t('authentication.idpassF')}}:</span>
          <span class='fl red'>*</span>
          <span class='update block fl'>{{$t('authentication.idformat')}} </span>
        </p>
        <div class='id-front-area mgl118 por' v-loading="loading.front">
          <div class='id-front-picture'>
            <el-upload
              class="avatar-uploader id-front-picture"
              action=""
              :show-file-list="false"
              :http-request="httpRequest"
              :before-upload="beforeAvatarUploadfront">
              <img style="height:186px;"
                   :src="langpicChange==1?idcard.front:passport.front"
                   class="avatar"
                   :class="langpicChange==1?'':'passport'">
              <span class='update-picture '>+</span>
            </el-upload>
          </div>
        </div>
      </div>
      <!--身份证反面-->
      <div class='id-front'>
        <p class='id-front-hint'>
          <span></span>
          <span>{{langpicChange==2?$t('authentication.idpassR'):$t('authentication.idCardR')}}：</span>
        </p>
        <div class='id-front-area mgl118 por' v-loading="loading.reverse">
          <div class='id-front-picture'>
            <el-upload
              class="avatar-uploader id-front-picture"
              action=""
              :show-file-list="false"
              :http-request="httpRequest"
              :before-upload="beforeAvatarUploadreverse">
              <img style="height:186px;"
                   :src="langpicChange==1?idcard.reverse:passport.reverse"
                   :class="langpicChange==1?'':'passport'"
                   class="avatar">
              <span class='update-picture '>+</span>
            </el-upload>
          </div>
        </div>
      </div>
      <!--手持证件照-->
      <div class='id-front '>
        <p class='id-front-hint ovh'>
          <span class='block fl'>{{$t("authentication.oneselfHand")}}：</span>
          <span class='fl red'>*</span>
          <span class='update block fl'>
            {{langpicChange==2?$t('authentication.signaturepass'):$t('authentication.signatureidCard')}}
          </span>
        </p>
        <div class='id-front-area mgl118 por' v-loading="loading.persors">
          <div class='id-front-picture'>
            <el-upload
              class="avatar-uploader id-front-picture"
              action=""
              :show-file-list="false"
              :http-request="httpRequest"
              :before-upload="beforeAvatarUploadpersors">
              <img style="height:186px;"
                   :src="langpicChange==1?idcard.persors:passport.persors"
                   :class="langpicChange==1?'':'passport'"
                   class="avatar">
              <span class='update-picture '>+</span>
            </el-upload>
          </div>
        </div>
        <button class='identity-verification button-loading--por'
                v-loading="loadings"
                :class="{'cl_bbb':loadings}"
                @click="submitAudit">{{$t('authentication.submit')}}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
  import {required} from 'vuelidate/lib/validators'

  export default {
    name: "level2-authentication",
    validations: {
      nation: {
        countryid: {//国家
          required
        },
        vouchertype: {//证件类型
          required
        },
        voucherNumber: {//证件号码
          required
        },
        name: {        //姓名
          required
        },
        street: {   //街道
          required
        }
      }
    },
    data() {
      return {
        langpicChange: 1,
        loadings: false,
        lang: this.$store.state.hex_lang.locale,
        flagShow: false,
        idcard: {//身份证
          front: require('../../static/images/security/an_id_front.png'),
          reverse: require('../../static/images/security/an_id_verso.png'),
          persors: require('../../static/images/security/an_id_head.png'),//手持证件
        },
        passport: {//护照
          front: require("../../static/images/security/an_passport.png"),
          reverse: require('../../static/images/security/an_passport_front.png'),
          persors: require('../../static/images/security/an_id_head.png'),//手持证件
        },
        loading: {
          front: false,
          reverse: false,
          persors: false
        },
        birthday: '',
        sex: "0",//性别
        nation: {//必填项
          countryname: '',
          countryid: '',//国家
          vouchertype: '1',//证件类型
          voucherNumber: '',//证件号码
          name: '',//姓名
          street: '',//街道
        },
        state: {
          country: ''
        },
        countryOptions: '',//所有国家
        changepic: '',
        idType: "",
      }
    },
    computed: {
      certificateOptions: function () {
        return [
          {
            text: this.$t('authentication.idcard'),
            value: '1'
          },
          {
            text: this.$t('authentication.passport'),
            value: '2'
          }
        ]
      }
    },
    watch: {
      'idType': function (val) {
        this.nation.vouchertype = val;
      },
      '$store.state.hex_lang.locale': function (val) {
        this.lang = val;
        if (val == 'en_us') {
          this.flagShow = true;
          this.langpicChange = 2;
          this.nation.countryid = '';
          this.idType = '';
          this.$v.$reset();
        } else {
          this.flagShow = false;
          this.langpicChange = 1;
        }
        this.countryOptions.map((item) => {
          if (val == 'en_us') {
            item.chname = item.name;
            item.name = item.engname;
          } else {
            item.name = item.chname;
          }
        });
      },
      'nation.countryid': function (val) {//国家id
        this.state.country = this.countryOptions.find((item) => {
          if (item.countryid == '243') {
            if (this.nation.vouchertype == '1') {
              this.flagShow = false;
              this.lang == 'en_us' ? this.langpicChange = 2 : this.langpicChange = 1;
            } else {
              this.flagShow = true;
            }
          } else {
            this.flagShow = true;
          }
          return item.countryid == val
        }),
          this.nation.countryname = this.countryOptions.find((item) => {//国家名字
            if (item.countryid == val) {
              return item.name;
            }
          })
      },
      'nation.vouchertype': function (val) {//证件类型
        if (this.nation.countryid == '243' && val == '1') {
          this.flagShow = false;
        } else {
          this.flagShow = true;
        }
      }
    },
    mounted() {
      if (this.lang == 'en_us') {
        this.langpicChange = 2;
        this.flagShow = true;
      } else {
        this.langpicChange = 1;
        this.flagShow = false;
      }
      this.$store.dispatch('com_country_getlist').then(({data}) => {
        this.countryOptions = data;
        this.countryOptions.map((item) => {
          if (this.lang == 'en_us') {
            item.chname = item.name;
            item.name = item.engname;
          }
        });
      })
    },
    methods: {
      beforeAvatarUploadfront(file) {
        this.loading.front = true;
        const isLt1M = file.size / 1024 / 1024 < 1;
        const isJPG = file.type === 'image/jpeg'||file.type==='image/png';
        if (!isLt1M) {
          this.$store.commit('set_message', {type: 'error', text: this.$t('authentication.picMax')});
          this.loading.front = false;
        }
        if (!isJPG) {
          this.$store.commit('set_message', {type: 'error',  text:this.$t('manage.isJpg')});
          this.loading.front = false;
        }
        this.changepic = 'papersFront';
        return isLt1M && isJPG;
      },
      beforeAvatarUploadreverse(file) {
        this.loading.reverse = true;
        const isLt1M = file.size / 1024 / 1024 < 1;
        const isJPG = file.type === 'image/jpeg'||file.type==='image/png';
        if (!isLt1M) {
          this.$store.commit('set_message', {type: 'error', text: this.$t('authentication.picMax')});
          this.loading.reverse = false;
        }
        if (!isJPG) {
          this.$store.commit('set_message', {type: 'error',  text:this.$t('manage.isJpg')});
          this.loading.reverse = false;
        }
        this.changepic = 'persoreverse';
        return isLt1M && isJPG;
      },
      beforeAvatarUploadpersors(file) {
        this.loading.persors = true;
        const isLt1M = file.size / 1024 / 1024 < 1;
        const isJPG = file.type === 'image/jpeg'||file.type==='image/png';
        if (!isLt1M) {
          this.$store.commit('set_message', {type: 'error', text: this.$t('authentication.picMax')});
          this.loading.persors = false;
        }
        if (!isJPG) {
          this.$store.commit('set_message', {type: 'error', text:this.$t('manage.isJpg')});
          this.loading.persors = false;
        }
        this.changepic = 'persors';
        return isLt1M && isJPG;
      },
      changetype(val) {
        this.langpicChange = val;
      },
      httpRequest(options) {
        const _self = this;
        if (_self.changepic == 'papersFront' && !_self.nation.countryid) {
          _self.flagShow = true;
          _self.$v.nation.countryid.$touch();
        }
        _self.$v.nation.vouchertype.$model = this.idType;
        _self.$v.nation.vouchertype.$touch();
        if (_self.$v.nation.countryid.$invalid || _self.$v.nation.vouchertype.$invalid) {
          this.loading.persors = false;
          this.loading.reverse = false;
          this.loading.front = false;
          return;
        }
        let file = options.file;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          let base64Str = e.currentTarget.result;
          if (_self.changepic == 'papersFront') {//正面  // 1：vouchertype 身份证
            _self.CardUpload(_self.nation.vouchertype, 'front', base64Str, _self.nation.countryid);
          } else if (_self.changepic == 'persoreverse') {
            _self.CardUpload(_self.nation.vouchertype, 'reverse', base64Str);
          } else {
            _self.CardUpload(_self.nation.vouchertype, 'persors', base64Str);
          }
        }
      },
      //证件上传idtype 1：身份证 2:护照  val：正面or反面  pic：图片地址  nation:国家
      CardUpload(idtype, val, pic, nation) {
        const _self = this;
        _self.$store.dispatch("com_image_upload", {
          imgbase64: (pic.split(','))[1],
          width: '310',
          height: '186',
          filename: new Date().getTime() + Number(Math.random() * 1000000000)
        }).then((res) => {
          if (res.code == 200) {
            if (idtype == 1) {
              _self.idcard[val] = res.data.imgurl;
            } else {
              _self.passport[val] = res.data.imgurl;
            }
            // _self.loading[val] = false;
            if (_self.lang == 'zh_cn' && idtype == 1 && val == 'front' && nation == 243) {
              return _self.$store.dispatch("com_ocr_idcard", {
                imgurl: res.data.imgurl,
                cardside: val
              })
            } else {
              _self.loading[val] = false;
              return false;
            }
          }
        }).then((data) => {
          //data的返回对象有undefined、{}、false
          let resoule = Object.getOwnPropertyNames(data);
          if (data && resoule.length > 0) {
            _self.nation.voucherNumber = '';
            _self.nation.name = '';
            _self.nation.street = '';
            _self.sex = '';
            _self.birthday = '';
            _self.nation.voucherNumber = data.data.cardno ? data.data.cardno : _self.nation.voucherNumber;
            _self.nation.name = data.data.name ? data.data.name : _self.nation.name;
            _self.nation.street = data.data.address ? data.data.address : _self.nation.street;
            _self.sex = data.data.sex ? data.data.sex : _self.sex;
            _self.birthday = data.data.brithday ? data.data.brithday.split('T')[0] : _self.birthday;
            _self.$v.nation.street.$reset();
            _self.$v.nation.name.$reset();
            _self.$v.nation.voucherNumber.$reset();
          }
          _self.flagShow = true;
          _self.loading[val] = false;
        })
      },
      submitAudit() {
        const _self = this;
        const _nation = this.$v.nation;
        for (let k in  _self.loading) {
          if (_self.loading[k]) {
            _self.$store.commit('set_message', {type: 'error', text: _self.$t('c2c.picUpload')});
            return
          }
        }
        _nation.$touch();//国家
        if (_nation.$invalid) {
          this.$store.commit('set_message', {type: 'error', text: _self.$t('authentication.infoIncomplete')});
          return
        }
        _self.loadings = true;
        let postData;
        if (_self.nation.vouchertype == 1) {
          for (var i in _self.idcard) {
            if (_self.idcard[i].indexOf('http') == -1) {
              _self.$store.commit('set_message', {type: 'error', text: _self.$t('authentication.imageIncomplete')});
              _self.loadings = false;
              return;
            }
          }
          let sex;
          if (_self.sex == '男') {
            sex = 1
          } else if (_self.sex == '女') {
            sex = 2;
          } else {
            sex = 0;
          }
          if (_self.nation.countryid != '243') {
            _self.birthday = null;
          }
          postData = {
            idtype: 'IDCard',
            imagetype: 'Authentication',
            realname: _self.nation.name,//真实姓名
            countryid: _self.nation.countryid,//国家id
            idnumber: _self.nation.voucherNumber,//证件号码
            address: _self.nation.street,//证件地址
            gender: sex,
            birthday: _self.birthday,
            countryname: _self.nation.countryname.name,//国家名称
            idcoverimg: _self.idcard.front,//证件封面
            idinfoimg: _self.idcard.reverse,//证件信息图(身份证反面或证件信息页)
            idinhandimg: _self.idcard.persors//手持证件照
          }
        } else {
          for (var i in _self.passport) {
            if (_self.passport[i].indexOf('http') == -1) {
              _self.$emit("getUserInfo");
              _self.$store.commit('set_message', {type: 'error', text: _self.$t('authentication.imageIncomplete')});
              _self.loadings = false;
              return;
            }
          }
          postData = {
            idtype: 'Passport',
            gender: 0,
            birthday: null,
            imagetype: 'Authentication',
            realname: _self.nation.name,//真实姓名
            countryid: _self.nation.countryid,//国家id
            idnumber: _self.nation.voucherNumber,//证件号码
            address: _self.nation.street,//证件地址
            countryname: _self.nation.countryname.name,//国家名称
            idcoverimg: _self.passport.front,//证件封面
            idinfoimg: _self.passport.reverse,//证件信息图(身份证反面或证件信息页)
            idinhandimg: _self.passport.persors//手持证件照
          }
        }
        _self.$store.dispatch('user_user_idauth', postData).then((res) => {
          if (res.data) {
            _self.$emit('getUserInfo');
            _self.$store.commit('set_message', {type: 'ok', text: res.msg});
          }
          _self.loadings = false;
        })
      },
    }
  }
</script>
<style lang='less' scoped>
  @import "../../static/styles/auth.less";
  @import "../../static/styles/color.less";

  .anthentication_checked {
    font-size: 16px;
    font-weight: bold;
  }

  .cl_bbb {
    background: #bbb !important;
  }

  p.title.clearfix.w350 {
    width: 350px;
  }

  .id-front-picture {
    img {
      width: 100%;
      height: 100%;
    }
  }

  .el-input.el-input--suffix {
    width: 238px;
  }

  .ltitle {
    font-size: 14px;
    width: 118px;
    display: inline-block;
  }

  .el-select {
    width: 238px;
  }

  .certificate-numvber.authentication-state.mgb0 {
    margin-bottom: 0;
  }

  .auth-content_group .el-input__inner {
    width: 238px !important;
  }

  @border_color: rgba(221, 221, 221, 1);
  .authentication {
    width: 990px;
    float: right;
    .authentication-level {
      overflow: hidden;
      line-height: 36px;
      padding: 16px 20px;
      box-sizing: border-box;
      background: white;
      margin-bottom: 10px;
      padding: 16px 20px;
      color: #333;
      .icon_user {
        float: left;
        width: 36px;
        height: 36px;
        background: url('../../static/images/security/an_big_user@2x.svg') no-repeat center center;
        background-size: 36px 36px;
      }
      span {
        display: inline-block;
      }
      .authentication-level-title {
        margin: 0 20px;
        font-weight: bold;
      }
      .authentication-level-identifier {
        width: 36px;
        height: 17px;
        line-height: 17px;
        color: white;
        background: #f5a623;
        text-align: center;
      }
    }
  }

  .authentication-grad {
    background: white;
    ul {
      overflow: hidden;
      height: 80px;
      li {
        float: left;
        width: 329px;
        height: 80px;
        padding: 14px;
        box-sizing: border-box;
        border-right: 1px solid rgba(133, 131, 172, 0.2);
        border-bottom: 1px solid rgba(133, 131, 172, 0.2);
        p {
          text-align: center;
        }
        p:first-child {
          font-size: 16px;
          color: #333;
        }
        p:last-child {
          font-size: 14px;
          color: #666;
        }
        p.authentication-checked {
          color: @cl_link;
        }
      }
      li.last {
        width: 332px;
        border-right: none;
      }
      li.checked {
        color: @cl_link;
        border-bottom: 3px solid @cl_link;
      }
    }
  }

  .authentication-verification-first {
    background: white;
    padding: 18px 20px;
    margin-bottom: 30px;
    height: 626px;
    box-sizing: border-box;
    .authentication-countant {
      font-size: 14px;
      padding: 40px 0 0 76px;
      .authentication-email {
        margin-bottom: 15px;
        color: #666;
        span:last-child {
          margin-left: 58px;
          color: #333;
          font-weight: bold;
        }
      }
      .authentication-phone {
        div:first-child {

          color: #666;
        }
        .authentication-input {
          margin-left: 58px;
          .phone-number {
            width: 403px;
            height: 40px;
            line-height: 40px;
            padding-left: 10px;
            border: 1px solid rgba(221, 221, 221, 1);
          }
          input.phone-number:hover {
            border: 1px solid rgba(133, 131, 172, 1);
          }
          .authentication-phone-number {
            margin-top: 10px;
            input {
              width: 270px;
              display: inline-block;
              margin-right: 10px;
              padding-left: 10px;
              border: 1px solid rgba(221, 221, 221, 1);
              height: 40px;
            }
            input:hover {
              border: 1px solid rgba(133, 131, 172, 1);
            }
            button.authentication-phone-btn {
              height: 40px;
              display: inline-block;
              text-align: center;
              width: 120px;
              background: rgba(240, 239, 247, 1);
              font-size: 14px;
              cursor: pointer;
            }
            button.authentication-phone-btn:hover {
              background: rgba(240, 239, 255, 1);
            }
          }
          .submit-audit {
            width: 120px;
            height: 40px;
            background: @cl_link;
            color: white;
            margin-top: 30px;
            font-size: 14px;
            cursor: pointer;
            color: white;
          }
          .submit-audit:hover {
            background: @cl_link_hover;
            text-align: center;

          }

        }
      }
    }
  }

  .authentication-verification-second,
  .authentication-verification-third {
    background: white;
    padding: 18px 20px 10px;
    .authentication-second-countant {
      margin: 30px 0 0 76px;
    }
  }

  .authentication-state {
    margin-bottom: 20px;
    height: 40px;
    span {
      line-height: 40px;
      color: #666;
      font-size: 14px;
    }
    select {
      height: 40px;
      width: 200px;
      line-height: 40px;
      outline: none;
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      background: url("../../static/images/security/an_select_down.png") no-repeat 178px center transparent;
      padding: 0 10px;
      border: 1px solid @border_color;
      color: rgba(51, 51, 51, 1);
      background-size: 10px 6px;
      font-size: 14px;
      option {
        line-height: 50px;
        font-size: 14px;
        color: rgba(51, 51, 51, 1);
      }
      option:first-child {
        color: rgba(187, 187, 187, 1);
      }
    }
    select.up {
      background: url("../../static/images/security/an_select_up.png") no-repeat 178px center transparent;
    }
    select.certificate {
      option:first-child {
        color: rgba(51, 51, 51, 1);
      }
    }
    input {
      padding-left: 10px;
      height: 40px;
      width: 200px;
      outline: none;

      line-height: 40px;
      border: 1px solid @border_color;
    }
  }

  input::-webkit-input-placeholder,
  select::-webkit-input-placeholder {
    color: #bbb;
    font-size: 14px;
  }

  input:-moz-placeholder,
  select:-moz-placeholder {
    color: #bbb;
    font-size: 14px;
  }

  input::-moz-placeholder,
  select::-moz-placeholder {
    color: #bbb;
    font-size: 14px;
  }

  input:-ms-input-placeholder,
  select:-ms-input-placeholder {
    color: #bbb;
    font-size: 14px;
  }

  .certificate-numvber input {
    width: 400px;
  }

  .auth-content_group {
    width: inherit;
  }

  .mgl86 {
    margin-left: 86px;
  }

  .mgl58 {
    margin-left: 58px;
  }

  .mgt28 {
    margin-top: 28px;
  }

  .id-front {
    margin: 20px 0;
    font-size: 14px;
    color: #666;
    .id-front-hint {
      .red {
        color: #cd4559;
        padding-left: 10px;
        line-height: 20px;
      }
      .update {
        width: 525px;
        color: #999;
        font-size: 12px;
        line-height: 17px;
      }
    }
    .id-front-area {
      margin-top: 10px;
      width: 400px;
      height: 226px;
      border: 1px solid @border_color;
      padding: 20px 45px;
      .id-front-picture {
        text-align: center;
        position: relative;
        height: 186px;
        width: 310px;
        .update-picture {
          width: 42px;
          height: 42px;
          background: @cl_link;
          color: white;
          font-size: 30px;
          text-align: center;
          line-height: 40px;
          position: absolute;
          top: 72px;
          left: 134px;

        }

        input {
          position: absolute;
          width: 42px;
          height: 42px;
          top: 72px;
          left: 134px;
          opacity: 0;
        }
        img.passport {
          width: 100%;
          height: 100%
        }
      }
    }
  }

  .mgl118 {
    margin-left: 118px;
  }

  .identity-verification {
    display: block;
    width: 120px;
    height: 40px;
    background: @cl_link;
    color: white;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    margin: 30px 0 0 118px;
  }

  .identity-verification:hover {
    background: @cl_link_hover;
  }

  .authentication-verification-third {
    height: 660px;
    .service {
      width: 220px;
      margin: 90px auto 0;
      .service-image {
        width: 220px;
        height: 220px;
        background: url("../../static/images/kf.jpg") no-repeat center center;
        background-size: 220px 220px;
      }
      button {
        width: 160px;
        height: 40px;
        display: block;
        line-height: 40px;
        background: @cl_link;
        color: white;
        text-align: center;
        margin: auto;
        font-size: 14px;
      }
    }
  }

  .auth-content_group.auth-content_group_code {
    margin-top: 0;
  }

  .auth-content_group.auth-content_group_code .title.clearfix {
    width: 400px;
    height: 13px;
  }

  .auth-content_group .title {
    margin: 6px 0;
  }

  .auth-content_group.auth-content_group_mgt0 {
    margin-top: 0;
  }

  .widths {
    display: inline-block;
    width: 118px;
  }
</style>
