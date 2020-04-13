(function() {
  require("./jquery.min.js");
  onerror = handleErr;
  var urls = window.location.href;

  function handleErr(msg, url, l) {
    var txt = "前端生产环境Error: " + msg + "--URL: " + encodeURI(urls) + "--Line: " + l;
    var info = {
      bussKeyName: "",
      bussKeyNo: "",
      bussTypeCode: "",
      ccEmail: "",
      content: txt,
      email: "lucy.feng@9an-data.com",
      fileName: "",
      head: {
        appid: "JK-JDWX",
        appkey: "lzTXnzrPS5",
        transCode: "MI0032",
        transDate: "20181024",
        transId: "",
        transTime: "113751"
      },
      organCode: "",
      organId: "",
      sendTime: "",
      sendType: "2",
      templateCode: "JDWX0001"
    };
    if(process.env.NODE_ENV == 'production'){
      $.ajax({
        //提交数据的类型 POST GET
        type: "POST",
        //提交的网址
        url: "http://dswx.jklife.com/tianrong-mail-web/email/sendSingle",
        //提交的数据
        data: JSON.stringify(info),
        //返回数据的格式
        datatype: "json", //"xml", "html", "script", "json", "jsonp", "text".
        contentType: "application/json",
        //在请求之前调用的函数
        beforeSend: function() {},
        //成功返回之后调用的函数
        success: function(data) {
          console.log(data);
          console.log("发送邮件成功！");
        },
        error: function() {
          //请求出错处理
        }
      });
    }else{
      // alert(txt)
    }
    return false;
  }
})();
