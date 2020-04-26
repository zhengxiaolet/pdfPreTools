<template>
  <div id="pdfPre">
    <mt-loadmore
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      :auto-fill="false"
      ref="loadmore"
    >
      <div v-for="(item,key) of pdfImgList" :key="key" class="imgBox">
        <img :src="item" class="item" :preview="key" />
        <div class="large"></div>
      </div>
      <div slot="bottom" class="mint-loadmore-bottom bottomTxt">{{showAllImg?'已加载所有图片':'加载中，请您稍候'}}</div>
    </mt-loadmore>
    <div class="floatBtm" v-if="showCheckBOx&&fileName">
      <div class="checkBox">
        <i :class="checkState?'checkIcon':'checkIcon1'" @click="changeState()"></i>
        <span class="checkText">{{fileName}}</span>
      </div>
      <div class="btnBox">
        <div class="nextBtn" @click="nextBtn">{{jumpTxt}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";
import {
  getDate,
  getHms,
  postJsonSLB,
  postJsonML,
  wxConfig
} from "../js/common";
import { Toast, Indicator, Loadmore } from "mint-ui";
import moment from "moment";
export default {
  name: "pdfPre",
  data() {
    //vue 数据
    return {
      checkState: false, //勾选框状态
      startNum: 0,
      endNum: 2,
      totalNum: 0, //PDF图片总页数
      allLoaded: false, //是否全部加载完
      pdfImgList: [], //图片数组
      showCheckBOx: false, //展示勾选框
      showAllImg: false, //是否加载完所有
      title: "", //当前页面的名字
      appid: "", //调用预览组件项目的appid
      appkey: "", //调用预览组件项目的appkey
      fileName: "", //例如：我已阅读xxx
      jumpUrl: "", //点击下一步跳转的地址
      jumpTxt: "", //跳转按钮文字
      pdfUrl: "", //普通PDF的链接地址
      businessNo: "", //业务号
      shareAppid: "", //公众号的appid
      shareTitle: "", //分享链接的title
      shareDesc: "", //分享链接的描述
      shareImgUrl: "" //分享链接的小图
    };
  },
  components: {},
  methods: {
    changeState: function() {
      this.checkState = !this.checkState;
    },
    //放大
    largeOpen: function(src) {
      console.log(src);
      this.OpenSrc = src;
    },
    //上拉加载
    loadBottom: function() {
      if (this.endNum >= this.totalNum) {
        this.showAllImg = true;
        return false;
      }
      this.startNum += 2;
      this.endNum += 2;
      this.getPdfImgList("loadBottom");
    },
    //获取PDF图片
    getPdfImgList: function(num) {
      let info = {
        head: {
          transCode: "PT600666",
          transDate: getDate(),
          transTime: getHms(),
          transId: new Date().getTime(),
          appid: this.appid,
          appkey: this.appkey,
          sign: "E8TRB2A0ZZ7LQ5QT503J3FIPR4PDVZ"
        },
        supplierId: "100001", //供应商ID
        businessNo: this.businessNo, //业务号
        pdfUrl: this.pdfUrl, //pdf链接
        scaling: "2.5", //缩放比例
        reqType: "2", //转换类型
        imageType: "jpg", //图片类型
        dpi: "", //图片质量
        startNum: this.startNum, //起始页码
        endNum: this.endNum //结束页码
      };
      postJsonSLB("policyElecUrl/pdfToPic", info, data => {
        if (data.resultCode == "10") {
          if (num == 1) {
            this.showCheckBOx = true;
          }
          this.totalNum = data.pageSize;
          if (this.endNum >= this.totalNum) {
            this.showAllImg = true;
          }
          let list = [];
          data.list.map((el, i) => {
            list.push(el.policServiceUrl);
          });
          this.pdfImgList = this.pdfImgList.concat(list);
          this.$previewRefresh();
        } else {
          alert(data.resultMsg);
        }
      });
    },
    //下一步
    nextBtn: function() {
      if (this.checkState) {
        let info = {
          head: {
            transCode: "MSL6068",
            transDate: getDate(),
            transTime: getHms(),
            transId: new Date().getTime(),
            appid: this.appid,
            appkey: this.appkey,
            sign: "E8TRB2A0ZZ7LQ5QT503J3FIPR4PDVZ"
          },
          supplierId: "100001", //供应商ID
          tenantId: "2017032717500543538",
          businessNo: this.businessNo, //业务号
          whetherCheck: "Y",
          checkTime: moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
        };
        postJsonML("order/receiptCheckRead", info, data => {
          if (data.resultCode == "10") {
            window.location.href = pdfPreInfo.jumpUrl;
          } else {
            alert(data.resultMsg);
          }
        });
      } else {
        alert(
          "请勾选'" + this.fileName
            ? this.fileName
            : "我已查阅电子保险合同并阅读其内容" + "'"
        );
      }
    }
  },
  mounted: function() {
    const {
      title,
      appid,
      appkey,
      fileName,
      jumpUrl,
      jumpTxt,
      pdfUrl,
      businessNo,
      shareAppid,
      shareTitle,
      shareDesc,
      shareImgUrl
    } = this.$route.query;
    this.title = decodeURIComponent(title);
    this.appid = appid ? decodeURIComponent(appid) : "WECHAT-APP-SERVER";
    this.appkey = appkey ? decodeURIComponent(appkey) : "DwRaJi6hMN";
    this.fileName = fileName ? decodeURIComponent(fileName) : "";
    this.jumpUrl = jumpUrl ? decodeURIComponent(jumpUrl) : "";
    this.jumpTxt = jumpTxt ? decodeURIComponent(jumpTxt) : "";
    this.pdfUrl = pdfUrl ? decodeURIComponent(pdfUrl) : "";
    this.businessNo = businessNo ? businessNo : "";
    this.shareAppid = shareAppid ? decodeURIComponent(shareAppid) : "";
    this.shareTitle = shareTitle ? decodeURIComponent(shareTitle) : "";
    this.shareImgUrl = shareImgUrl ? decodeURIComponent(shareImgUrl) : "";
    this.shareDesc = shareDesc ? decodeURIComponent(shareDesc) : "";
    if (pdfUrl) {
      localStorage.removeItem("pdfPreNextUrl");
    }
    if (businessNo && jumpUrl) {
      localStorage.setItem("pdfPreNextUrl", decodeURIComponent(jumpUrl));
    }
    let pdfPreNextUrl = localStorage.getItem("pdfPreNextUrl");
    if (businessNo && jumpTxt) {
      this.jumpUrl = pdfPreNextUrl;
    }
    document.title = title ? this.title : "查看电子保单";
    this.getPdfImgList("1");
    if (shareAppid && shareTitle && shareTitle && shareImgUrl && shareDesc) {
      wxConfig({
        appId: this.shareAppid ? this.shareAppid : "wxfee39ae209983e48",
        title: this.shareTitle ? shareInfo.shareTitle : "电子保单查看", // 分享标题
        desc: this.shareDesc
          ? this.shareDesc
          : "尊敬的先生/女士,请您查阅电子保单。", // 分享描述
        imgUrl: this.shareImgUrl ? this.shareImgUrl : "",
        shareUrl: window.location.href
      });
    }
  }
};
</script>
<style scoped lang="scss" src="@/css/pdfPre.scss">
</style>
