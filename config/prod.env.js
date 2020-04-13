function configPro(data) {
    switch (process.env.npm_lifecycle_event) {
        case "dev":
            return data.dev;
            break;
        case "uat":
            return data.uat;
            break;
        case "build":
            return data.production;
            break;
        default :
            return data.dev;
    }
}


module.exports = {
    NODE_ENV: '"production"',
    IMGURL: configPro({
        dev: '"https://test.jklife.com/"',
        uat: '"https://test.jklife.com/"',
        production: '"https://wxapp.jklife.com/"'
    }),
    WXChatShare: configPro({
        dev: '"https://test.jklife.com/rear-ms/"',
        uat: '"https://test.jklife.com/rear-ms/"',
        production: '"https://mip.jklife.com/rear-ms/"'
    }),
    //微信的appId
    APPID:configPro({
        dev: '"wxfee39ae209983e48"',
        uat: '"wxac213bfede99cc7b"',
        production: '"wxde7263a65b17ad0a"'
    }),
    //闪联保2.0
    SLB: configPro({
        dev: '"https://test.jklife.com/api/micro-serv-light-trans/"',
        uat: '"https://test.jklife.com/api/micro-serv-light-trans/"',
        production: '"https://dswx.jklife.com/api/micro-serv-light-trans/"'
    }),
    //麦粒
    ML: configPro({
        dev: '"https://test.jklife.com/api/micro-serv-msale-app/"',
        uat: '"https://test.jklife.com/api/micro-serv-msale-app/"',
        production: '"https://dswx.jklife.com/api/micro-serv-msale-app/"'
    }),
    //pdfPreTools20200413
    IPLocation: configPro({
        dev: '"https://test.jklife.com/pdfPreTools20200413/"',
        uat: '"https://test.jklife.com/pdfPreTools20200413/"',
		production: '"https://dswx.jklife.com/pdfPreTools20200413/"'
    }),
};
