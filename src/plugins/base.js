import Vue from "vue";

// collapse 展开折叠
import CollapseTransition from "element-ui/lib/transitions/collapse-transition";

import * as proEx from "../components/base/index";

Object.keys(proEx).forEach(item => {  //組件註冊
  proEx[item].install && Vue.use(proEx[item]);
});

/**
 * @description 打开一个window
 * @param {Object} com 组件
 * @param {String} title 标题
 * @param {Object} data 参数
 */
Vue.prototype.$window = proEx.window;
debugger
Vue.component(CollapseTransition.name, CollapseTransition);
