/**
 * Created by aaaa on 2017/4/18.
 */
import { WXChatShare, IMGURL, SLB, ML, APPID, IPLocation } from '../js/ipconfig.js'
import $ from 'jquery'
import { Indicator } from 'mint-ui';
//格式化年月日
export function getDate() {
    const t = new Date();
    let y = t.getFullYear() + '';
    let m = t.getMonth() + 1;
    let d = t.getDate() + '';
    if (m < 10) {
        m = '0' + m
    }
    if (d < 10) {
        d = '0' + d
    }
    return y + m + d
}
//格式化时分秒
export function getHms() {
    const t = new Date();
    let h = t.getHours() + '';
    let m = t.getMinutes() + '';
    let s = t.getSeconds() + '';
    if (h < 10) {
        h = '0' + h
    }
    if (m < 10) {
        m = '0' + m
    }
    if (s < 10) {
        s = '0' + s
    }
    return h + m + s
}
//闪联保接口
export function postJsonSLB(url, param, callback) {
    $.ajax({
        type: 'post',
        url: SLB + url,
        timeout: '30000',
        data: JSON.stringify(param),
        dataType: "json",
        contentType: 'application/json',
        jsonp: "callback",
        context: this,
        //在请求之前调用的函数
        beforeSend: function () {
            Indicator.open();
        },
        //成功返回之后调用的函数
        success: function (data) {
            Indicator.close();
            if (data.resultCode == '10') {
                callback(data.t)
            } else {
                alert(data.resultMsg)
            }
        },
        //调用执行后调用的函数
        complete: function (XMLHttpRequest, status) {
            // 设置timeout的时间，通过检测complete时status的值判断请求是否超时，如果超时执行响应的操作
            if (status == 'timeout') { //超时,status还有success,error等值的情况
                alert("请求超时");
            }
            Indicator.close();
        },
        //调用出错执行的函数
        error: function () {
            Indicator.close();
            //请求出错处理
        }
    });

}

//麦粒接口
export function postJsonML(url, param, callback) {
    $.ajax({
        type: 'post',
        url: ML + url,
        timeout: '30000',
        data: JSON.stringify(param),
        dataType: "json",
        contentType: 'application/json',
        jsonp: "callback",
        context: this,
        //在请求之前调用的函数
        beforeSend: function () {
            Indicator.open();
        },
        //成功返回之后调用的函数
        success: function (data) {
            Indicator.close();
            if (data.resultCode == '10') {
                callback(data.t)
            } else {
                alert(data.resultMsg)
            }
        },
        //调用执行后调用的函数
        complete: function (XMLHttpRequest, status) {
            // 设置timeout的时间，通过检测complete时status的值判断请求是否超时，如果超时执行响应的操作
            if (status == 'timeout') { //超时,status还有success,error等值的情况
                alert("请求超时");
            }
            Indicator.close();
        },
        //调用出错执行的函数
        error: function () {
            Indicator.close();
            //请求出错处理
        }
    });

}

function share(url, param, callback, state) {
    var strObj = param;
    var infoData = {
        "info": strObj
    };
    //   将请求参数转换为字符串
    infoData = 'info=' + JSON.stringify(infoData.info);
    // var loadScore = layer_.open({type: 2, content: '加载测试中…'});
    $.ajax({
        type: 'get',
        url: WXChatShare + url,
        timeout: '30000',
        data: encodeURI(infoData),
        dataType: "jsonp",
        jsonp: "callback",
        context: this,
        success: function (data) {
            // layer_.close(loadScore);
            if (data.resultCode == '10') {
                callback(data.result);
            } else if (data.resultCode == 'POSTERR01') {
                goRelease(data);
            } else {
                alert(data.resultMsg)
            }
        },
        complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
            if (status == 'timeout') {//超时,status还有success,error等值的情况
                alert("请求超时，请稍后重试")
            }
        },
        error: function (XMLHttpRequest, status, err) {
            alert("网络请求失败：" + err)
        }
    });
};
function filterUrl(uri) {
    var strHref = uri.replace('?from=groupmessage&isappinstalled=0', '').replace('?from=timeline&isappinstalled=0', '').replace('?from=singlemessage&isappinstalled=0', '').replace('?from=singlemessage', '').replace('?from=groupmessage', '');
    return strHref
};
//微信分享
export function wxConfig(info) {
    share(
        "interface/wx/getJsSDKConfig",
        {
            "appId": info.appId ? info.appId : APPID,
            "url": encodeURI(filterUrl(window.location.href.split('#')[0]))
        },
        function (data) {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看参数，可以在pc端打开。
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature,// 必填，签名，见附录1
                jsApiList: ['onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function () {
                wx.onMenuShareAppMessage({
                    title: info.title, // 分享标题
                    desc: info.desc, // 分享描述
                    link: filterUrl(IPLocation + info.shareUrl), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: imgUrl ? imgUrl : IMGURL + 'zzfw/static/img/share.png', // 分享图标
                    success: function () {
                        // 设置成功
                    }
                });
            });
        },
        false
    );
}
