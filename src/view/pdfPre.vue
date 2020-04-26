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
    <div class="floatBtm" v-if="showCheckBOx">
      <div class="checkBox">
        <i :class="checkState?'checkIcon':'checkIcon1'" @click="changeState()"></i>
        <span class="checkText">{{name}}</span>
      </div>
      <div class="btnBox">
        <div class="nextBtn" @click="nextBtn">下一步</div>
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
      name: "", //勾选框后内容
      checkState: false, //勾选框状态
      startNum: 0,
      endNum: 2,
      totalNum: 0, //PDF图片总页数
      allLoaded: false, //是否全部加载完
      pdfImgList: [], //图片数组
      showCheckBOx: false, //展示勾选框
      showAllImg: false //是否加载完所有
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
      const { title, headInfo, pdfInfo, policyInfo } = this.$route.query;
      let info = {
        head: {
          transCode: "PT600666",
          transDate: getDate(),
          transTime: getHms(),
          transId: new Date().getTime(),
          appid: headInfo ? headInfo.appid : "WECHAT-APP-SERVER",
          appkey: headInfo ? headInfo.appkey : "DwRaJi6hMN",
          sign: "E8TRB2A0ZZ7LQ5QT503J3FIPR4PDVZ"
        },
        supplierId: policyInfo ? policyInfo.supplierId : "100001", //供应商ID
        businessNo: policyInfo ? policyInfo.businessNo : "8088577873102568", //业务号
        pdfUrl: pdfInfo ? pdfInfo.pdfUrl : "",//pdf链接
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
      let pdfPreInfo = JSON.parse(localStorage.getItem("pdfPreInfo"));
      const { title, headInfo, pdfInfo, policyInfo } = this.$route.query;
      this.name = policyInfo
        ? policyInfo.fileName
        : "我已查阅电子保险合同并阅读其内容";
      if (this.checkState) {
        let info = {
          head: {
            transCode: "MSL6068",
            transDate: getDate(),
            transTime: getHms(),
            transId: new Date().getTime(),
            appid: headInfo ? headInfo.appid : "WECHAT-APP-SERVER",
            appkey: headInfo ? headInfo.appkey : "DwRaJi6hMN",
            sign: "E8TRB2A0ZZ7LQ5QT503J3FIPR4PDVZ"
          },
          supplierId: policyInfo ? policyInfo.supplierId : "100001", //供应商ID
          tenantId: policyInfo ? policyInfo.tenantId : "2017032717500543538",
          businessNo: policyInfo ? policyInfo.businessNo : "8088577873102568", //业务号
          whetherCheck: "Y",
          checkTime: moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
        };
        postJsonML("order/receiptCheckRead", info, data => {
          if (data.resultCode == "10") {
            window.location.href = pdfPreInfo.jumpHref;
          } else {
            alert(data.resultMsg);
          }
        });
      } else {
        alert("请勾选'" + this.name + "'");
      }
    }
  },
  mounted: function() {
    /* 
    title:页面名字
    headInfo:请求头信息
    pdfInfo:PDF信息
    policyInfo:保单信息
    */
    const {
      title,
      headInfo,
      pdfInfo,
      policyInfo,
      shareInfo
    } = this.$route.query;
    localStorage.setItem("pdfPreInfo", pdfInfo ? pdfInfo : policyInfo);
    document.title = title ? title : "查看电子保单";
    this.getPdfImgList("1");
    wxConfig({
      appId: shareInfo ? shareInfo.appid : "",
      title: shareInfo ? shareInfo.title:"电子保单查看", // 分享标题
      desc:shareInfo ? shareInfo.desc:"尊敬的先生/女士,请您查阅电子保单。", // 分享描述
      imgUrl: shareInfo ? shareInfo.imgUrl : "",
      shareUrl: window.location.href
    });
  }
};
</script>
<style scoped lang="scss" src="@/css/pdfPre.scss">
</style>
