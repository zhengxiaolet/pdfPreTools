
PDF在线预览插件（可支持分享）
===

|属性|说明|类型|默认值|是否必传|
|:---|:---|:---|:---|:---|
|title|当前页面的名字|string|空|N|
|appid|本系统的appid|string|空|Y|
|appkey|本系统的appkey|string|空|Y|
|fileName|例如：我已阅读xxx|string|空|N|
|jumpHref|点击下一步跳转的地址|string|空|N|
<br>

普通PDF需传入`pdfUrl`
|属性|说明|类型|默认值|是否必传|
|:---|:---|:---|:---|:---|
|pdfUrl|普通PDF的链接地址|string|空|N|
<br>

电子保单PDF需传入`businessNo`
|属性|说明|类型|默认值|是否必传|
|:---|:---|:---|:---|:---|
|businessNo|业务号|string|空|N|
<br>

分享功能需传入以下参数
|属性|说明|类型|默认值|是否必传|
|:---|:---|:---|:---|:---|
|appid|公众号的appid|string|空|N|
|title|分享链接的title|string|空|N|
|desc|分享链接的描述|string|空|N|
|imgUrl|分享链接的小图|string|空|N|
<br>