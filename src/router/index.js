import Vue from 'vue'
import Router from 'vue-router'
import pdfPre from '../view/pdfPre'
import a from '../view/a'


Vue.use(Router)

export default new Router({
    routes: [
        //预览页
        {
            path: '/pdfPre',
            name: 'pdfPre',
            component: pdfPre
        },
        //预览页
        {
            path: '/a',
            name: 'a',
            component: a
        }
    ]
})
