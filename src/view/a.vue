<template>
  <div id="pdfPre">
    <div id="iframe-box">
      <iframe
        :src="src"
        height="100%"
        width="100%"
        style="position:absolute;top:0;left: 0;"
      ></iframe>
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
      src:"https://test.jklife.com/pdfPreTools/#/pdfPre?appid="+encodeURIComponent('WECHAT-APP-SERVER')+"&appkey=DwRaJi6hMN&type=2&pdfUrl="+encodeURIComponent('http://test.jklife.com:8888/jkdsimage/images/product/img/product_comment/JK10205_YXJSTK.pdf')
    };
  },
  components: {},
  methods: {},
  mounted: function() {
    let ifram = document.getElementById("ifram");
    if (navigator.userAgent.match(/iPad|iPhone/i)) {
      let iframe_box = document.getElementById("iframe-box");
      iframe_box.style.width = 100 + "%";
      iframe_box.style.height = 1000 + "px";
      iframe_box.style.overflowX = "hidden";
      iframe_box.style.overflowY = "scroll";
      iframe_box.style.webkitOverflowScrolling = "touch";
    }
  }
};
</script>
<style scoped lang="scss" src="@/css/pdfPre.scss">
</style>
