import router from './router'

import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式

NProgress.configure({ showSpinner: false }) // true/false 是否显示螺旋加载（就是右上角那个圈圈）

router.beforeEach((to, from, next) => {
  // 全局前置守卫
  NProgress.start() // start progress bar
  next()
})

router.afterEach((to, from) => {
  // 全局后置守卫
  NProgress.done() // finish progress bar
})
