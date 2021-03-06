import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css'
import './assets/style/index.scss'

import {
  Form,
  FormItem,
  Button,
  Input,
  CheckboxGroup,
  Checkbox,
  Dialog,
  Progress,
  Table,
  TableColumn,
  Loading,
  Steps,
  Step,
  Message,
  Icon,
  Upload,
  Tabs,
  TabPane,
  Tooltip
} from 'element-ui'

import './permission.js'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Dialog)
Vue.use(Progress)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Icon)
Vue.use(Upload)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tooltip)
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
