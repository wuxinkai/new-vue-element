import Vue from 'vue'
import App from './App.vue'
import "./plugins/element.js";
import "./plugins/excel.js";
import "./plugins/animate.js";
import './registerServiceWorker'
import '../src/util/extend'
import alert from '../src/util/alertMsgBox'
import router from './router'
import store from './store'

import "./directives/debounce.js"; //防抖
import "./directives/placeholder.js"; //为空提示


// 引入样式



import './style/base.css'
import 'font-awesome/css/font-awesome.css'
import "./style/transition.css"; //
// 引入axios
import axios from "axios"
import VueAxios from "vue-axios"

// 引入mock
import Mock from './mock'
Mock.bootstrap()

// 引入dialog可移动
import './directives.js'


Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.prototype.$alert = alert
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
