
PDF在线预览插件（可支持分享）
===

|属性|说明|类型|默认值|是否必传|
|:---|:---|:---|:---|:---|
|title|当前页面的名字|string|查看电子保单|N|
|headInfo|请求头信息|object|{appid:'',appkey:''}|Y|
|appid|本系统的appid|string|空|Y|
|appkey|本系统的appkey|string|空|Y|
|pdfInfo|普通PDF信息|object|{fileName:'',pdfUrl:''}|N|
|fileName|例如：我已阅读xxx）|string|空|N|
|pdfUrl|普通PDF的链接地址|string|空|N|
|policyInfo|电子保单信息|object|{fileName:'',businessNo:''}|N|
|fileName|例如：我已阅读xxx|string|空|N|
|businessNo|业务号|string|空|N|

>普通PDF需传入pdfInfo，电子保单PDF需传入policyInfo<br>