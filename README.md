
PDF在线预览插件（可支持分享）
===

|属性|说明|类型|默认值|是否必传|
|:---|:---|:---|:---|:---|
|title|当前页面的名字|string|空|N|
|headInfo|请求头信息|object|{appid:'',appkey:''}|Y|
|appid|本系统的appid|string|空|Y|
|appkey|本系统的appkey|string|空|Y|
|pdfInfo|普通PDF信息|object|{fileName:'',pdfUrl:''}|N|
|fileName|例如：我已阅读xxx|string|空|N|
|pdfUrl|普通PDF的链接地址|string|空|N|
|policyInfo|电子保单信息|object|{fileName:'',businessNo:''}|N|
|fileName|例如：我已阅读xxx|string|空|N|
|businessNo|业务号|string|空|N|
|shareInfo|分享信息|object|{appid:'',title:'',desc:'',imgUrl:''}|N|
|appid|公众号的appid|string|空|N|
|title|分享链接的title|string|空|N|
|desc|分享链接的描述|string|空|N|
|imgUrl|分享链接的小图|string|空|N|
<br>

普通PDF需传入`pdfInfo`，电子保单PDF需传入`policyInfo`。如需分享需传入`shareInfo`