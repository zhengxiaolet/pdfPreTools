
PDF在线预览插件
===
>使用方式
```javascript
//在页面里面引入iframe
 <div id="iframe-box">
    <iframe
    :src="src"
    height="100%"
    width="100%"
    style="position:absolute;top:0;left: 0;"
    ></iframe>
</div>

//参数有特殊字符需要转码
this.src = "https://test.jklife.com/pdfPreTools/#/pdfPre?appid="+encodeURIComponent('WECHAT-APP-SERVER')+"&appkey=DwRaJi6hMN&type=2&pdfUrl="+encodeURIComponent('http://test.jklife.com:8888/jkdsimage/images/product/img/product_comment/JK10205_YXJSTK.pdf')

//IOS系统微信浏览器iframe兼容性处理
let ifram = document.getElementById("ifram");
if (navigator.userAgent.match(/iPad|iPhone/i)) {
    let iframe_box = document.getElementById("iframe-box");
    iframe_box.style.width = 100 + "%";
    iframe_box.style.height = 1000 + "px";
    iframe_box.style.overflowX = "hidden";
    iframe_box.style.overflowY = "scroll";
    iframe_box.style.webkitOverflowScrolling = "touch";
}

```
|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|title|当前页面的名字（必填）|String|空|
|appid|本系统的appid（必填）|String|空|
|appkey|本系统的appkey（必填）|String|空|
|fileName|例如：我已阅读xxx|String|空|
|jumpUrl|跳转的地址|String|空|
|jumpTxt|跳转按钮文字|String|空|
|type|保单类型（1：电子保单；2：其他）|String|空|
<br>

电子保单PDF需传入`businessNo`
|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|businessNo|业务号|String|空|
<br>

普通PDF需传入`pdfUrl`
|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|pdfUrl|普通PDF的链接地址|String|空|
<br>


