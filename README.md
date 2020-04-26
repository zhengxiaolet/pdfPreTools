
PDF在线预览插件
===
>使用方式
```javascript
<div id="iframe-box">
      <iframe
        src="https://test.jklife.com/pdfPreTools/#/pdfPre?businessNo=8088577873102568&jumpTxt=发送到"
        height="100%"
        width="100%"
        style="position:absolute;top:0;left: 0;"
      ></iframe>
    </div>

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
|title|当前页面的名字|String|查看电子保单|
|appid|本系统的appid|String|WECHAT-APP-SERVER|
|appkey|本系统的appkey|String|DwRaJi6hMN|
|fileName|例如：我已阅读xxx|String|空|
|jumpUrl|跳转的地址|String|空|
|jumpTxt|跳转按钮文字|String|空|
<br>

普通PDF需传入`pdfUrl`
|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|pdfUrl|普通PDF的链接地址|String|空|
<br>

电子保单PDF需传入`businessNo`
|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|businessNo|业务号|String|空|
<br>

分享功能需传入以下参数
|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|shareAppid|公众号的appid|String|空|
|shareTitle|分享链接的title|String|空|
|shareDesc|分享链接的描述|String|空|
|shareImgUrl|分享链接的小图|String|空|
<br>