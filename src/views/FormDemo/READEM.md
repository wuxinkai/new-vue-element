# pro-form 组件的封装
### (1) html设置组件 src\views\FormDemo\index.vue
```
 <pro-form :fields="fields1" label-width="100px" @submit="onSubmit" />
```
### (2) 增加base 组件包 src\components\base
### (3) 在base中创建 idnex.js 增加组件用
```
import proFormComponent from "./pro-form";
//整体表单组件
export const proFormName = {
  install: function(Vue) {
    Vue.component("proForm", proFormComponent);
  }
};

```
### (4) 将组件 进行遍历   src\plugins\base.js
```
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
Vue.component(CollapseTransition.name, CollapseTransition);

```
### (5) 将组件注入到 全局 src\main.ts
```
import "./plugins/excel.js";
```

### （6）组件html代码

```

```
