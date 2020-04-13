import Vue from 'vue'
import Router from 'vue-router'
import pdfPre from '../view/pdfPre'


Vue.use(Router)

export default new Router({
    routes: [
        //保单回执  -- 预览页
        {
            path: '/pdfPre',
            name: 'pdfPre',
            component: pdfPre
        }
    ]
})
