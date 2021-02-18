<h1 align="center">vue3-admin</h1>

## 简介

vue3-admin 是一个后台管理系统的前端页面展示，是由 vue-cli4 和 elemnet-ui 搭建实现的。使用了最新的 vue 框架，内部采用了组件化开发模式，尽可能使得每个组件都遵循单一
功能原则。虽然刚开始看起来可能略感疲惫（由于子组件功能单一，所以内部通信较多），但是对后期的维护有着非常大的好处。项目采用弹性盒（flex）布局，故而在移动端也有着较好的显示效果，可在移动端进行打开 demo 查看。

## 演示(由于作者自己买的低配版阿里云服务器，所以可能导致请求时间略长)

[在线 demo](http://39.105.222.188/vue3.0-admin/#/login)

移动端可扫码查看

![avatar](./qrCode.png)

## 更快更好的开发体验，请查看下面的项目

[vue3 实战项目](https://github.com/guodonglw/vue3-admin)

## 开发

```bash
# 克隆项目
git clone git@github.com:guodonglw/vue3.0-admin.git

# 进入项目目录
cd vue3.0-admin

# 安装依赖
npm install

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run serve

# 如遇到node-sass的问题，可尝试
npm rebuild node-sass
```

浏览器访问 http://localhost:8080

## 发布

```bash
# 构建生产环境
npm run build
```

打包会出现 dist 文件夹，用 Chrome 浏览器打开 index.html 页面即可

## Browsers support

Modern browsers

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| last 2 versions                                                                                                                                                                                                    | last 2 versions                                                                                                                                                                                                | last 2 versions                                                                                                                                                                                                |

## 备注

```javascript
// 建议首先查看路由文件(了解项目路由以及如何进行动态生成前端路由)
// 页面查看顺序(登录页（views/Login）-> 首页(views/Home/Dashboard))，其中views/Home为其他页面的公共引用部分
// 与后端交互接口（请查看service/index.ts，数据由mock.js产生；实际开发请查看util/request.ts）
// 后台系统包括了登录，异步生成路由，echarts数据可视化，table表增删改查等功能，希望该demo示例可以帮助到有需要的朋友快速上手
// 根据vue-cli示例，主页面index.vue中会采用vue2的写法，在子组件中则有较大的变化，请仔细查看区别
```

# 自己学习

### 计算属性应用

```
 computed: {
    //es6给对象新增属性的方法
    handleTableAssetsData() {
      let _tableAssetsAry = []
      this.tableAssetsData.forEach(item => {
        Object.assign(item, {
          wu1: item.strASSET_A1_100,
          wu2: item.strASSET_A1_160,
          wu3: item.strASSET_A1_180,
        })
        _tableAssetsAry.push(item)
      })
      return _tableAssetsAry
    }
  }
```

### 防抖函数指令的应用 input 的防抖

#### 1 代码 src\directives\debounce.js

```
import Vue from "vue";
/**
 * @description 防抖
 * @param {function} fun 要延迟的方法
 * @param {int} delay 要延迟时间
 * @return {function} 延迟后函数
 */
const debounce = (fun = function() {}, delay = 800) => {
  let timer = null; //缓存
  return (...args) => {
    //如果上一个还没执行 先清空
    timer && clearTimeout(timer);
    //执行当前的
    timer = setTimeout(() => {
      fun.apply(this, args);
      timer = null;
    }, parseInt(delay));
  };
};
Vue.directive("debounce", {
  inserted: function(el, binding, vnode) {
    // vnode.componentOptions.listeners.input;
    // vnode.componentOptions.listeners.input.fns;
    // function(){}.prototype.fns = [];
    //如果是input
    if (vnode.componentOptions && vnode.componentOptions.tag == "el-input") {
      //得到原方法
      let Fns = vnode.componentOptions.listeners.input;
      //重写
      let newfns = [];
      Fns &&
        Fns.fns &&
        Fns.fns.forEach((item, index) => {
          //如果是第一 默认 不处理
          if (index == 0) {
            newfns.push(item);
          }
          //如果不是第一个防抖处理
          else {
            newfns.push(debounce(item));
          }
        });
      //重新赋值
      Fns.fns = newfns;
      vnode.componentOptions.listeners.input = debounce(Fns);
    }
  }
});
//防抖 全局   应用
Vue.prototype.$_debounce = debounce;

```

#### 2 注入 \src\main.js

```
import "./directives/debounce.js"; //防抖
```

#### 3 项目应用 src\directives\debounce.js

必须添加 @input="onInput" 事件否则会报错

```
 <el-form-item label="防抖函数">
    <el-input v-model="form.id" placeholder="防抖查询" @input="onInput" v-debounce style="width: 200px"></el-input>
  </el-form-item>
```

# 注册全局組件 dialog

1 写组件 src\components\element\dialog\index.vue

```
<template>
  <el-dialog ref="dialog" class="dialog alltransition" :class="[nopadding ? 'nopadding' : '']" :title="title" :visible.sync="page.dialogVisible" v-if="keep || page.dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" :width="width" v-bind="$attrs" v-on="$listeners">
    <slot ref="component"></slot>
    <div ref="footer" v-if="page.showfoot" class="el-dialog__footer dialog-footer"></div>
  </el-dialog>
</template>

<script>
export default {
  name: "ysdialog",
  data: () => ({
    page: {
      dialogVisible: false,
      showfoot: false
    }
  }),
  props: {
    title: {
      type: String,
      default: () => "编辑"
    },
    dialogVisible: {
      type: Boolean,
      default: () => false
    },
    width: {
      type: String,
      default: () => "50%"
    },
    nopadding: {
      type: Boolean,
      default: () => false
    },
    keep: {
      type: Boolean,
      default: () => false
    }
  },
  provide() {
    return {
      thisdialog: this
    };
  },
  mounted() { },
  watch: {
    dialogVisible(v) {
      if (v) {
        this.show();
      } else {
        this.close();
      }
    }
  },
  methods: {
    show() {
      this.page.dialogVisible = true;
      debugger
      this.$nextTick(() => {
        // console.log(this.$slots.default[0].componentInstance.$refs);
        const footer = this.$slots.default[0].componentInstance.$refs.footer;
        if (footer && footer.innerHTML) {
          //this.page.showfoot = true;
          // this.$nextTick(() => {
          //   this.$refs.footer.innerHTML = "";
          //   this.$refs.footer.insertAdjacentHTML("beforeend", footer.innerHTML);
          // });
        }
        // this.$slots.default[0].componentInstance.$data.thisdialog = this;
        // this.$slots.default[0].componentInstance.close = () => {
        //   this.close();
        // };
      });
      return this;
    },
    close() {
      this.page.dialogVisible = false;
      return this;
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog {
  /deep/ .el-dialog__body {
    // max-height: 68vh;
    overflow: auto;
  }
}
.nopadding {
  /deep/ .el-dialog__body {
    padding: 5px;
  }
}
.dialog-footer {
  visibility: hidden;
}
</style>

```

2 导出组件 src\components\element\index.js

```
import dialogComponent from "./dialog";

//窗口
export const ysdialog = {
  install: function(Vue) {
    Vue.component("ysDialog", dialogComponent);
  }
};
```

3 全局 注册组件 src\plugins\element.js

```
import Vue from "vue";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/base.css";
// collapse 展开折叠
import CollapseTransition from "element-ui/lib/transitions/collapse-transition";

Vue.use(Element);
//自定义
// import {
//   selectTree, //下拉树
//   window, //窗
//   pagination, //分页
//   tree, //树
//   asidetoggle, //展开收起
//   elLayout,
//   elLayoutLeft,
//   elLayoutMain,
//   select,
//   ysdialog
// } from "../components/element/index";

// Vue.use(Element);
// Vue.use(select);
// Vue.use(selectTree);
// Vue.use(pagination);
// Vue.use(tree);
// Vue.use(asidetoggle);
// Vue.use(elLayout);
// Vue.use(elLayoutLeft);
// Vue.use(elLayoutMain);
// Vue.use(ysdialog);

import * as elEx from "../components/element/index";


Object.keys(elEx).forEach(item => {  //組件註冊
  elEx[item].install && Vue.use(elEx[item]);
});

/**
 * @description 打开一个window
 * @param {Object} com 组件
 * @param {String} title 标题
 * @param {Object} data 参数
 */
Vue.prototype.$window = elEx.window;
Vue.component(CollapseTransition.name, CollapseTransition);
```

4 main.ts 里面注册

```
import "./plugins/element.js";
```

5 实例中应用 利用实例中的插槽进行显示

```
 <ys-dialog ref="AssetEditDialog" width="40%" :nopadding="true" title="资产编辑">
  777
</ys-dialog>
```

# vue 中 modal 的应用

### 在自定义组件中定义 v-model="form"

```
 <asset-ys-select  v-model="form" ></asset-ys-select>
```

### 在子组件接收

```
  props: {
    SelectValue: [String, Array, Number]
  },
  model: {
    prop: "SelectValue",// 继承了v-modal的值
    event: "change" //点击后值默认赋值给 组件的v-model 不用我们再次进行绑定了
  },
  methods: {
    async getDataSourceTow(num) {
      _this.page.SelectValue = _this.SelectValue; //项目中应用
    },
  }
```

# select 的封装 和多级下拉

### （1）代码 src\views\AssetsTable\components\AssetYsSelect.vue

```
  <ys-select
   ref="select"
   :selectList="page.DataSource"
   :idKey="page.DataValueField"
   :nameKey="page.DataTextField"
   :pIdKey="page.TreeLevelField"
    :cascader="page.DataCascader"
    :disabledKey="page.DisabledField"
     :loading="page.loading"
     filterable emitPath
     v-model="page.SelectValue"
     v-bind="$attrs"
     @change="onChange"
     >
  </ys-select>
```

### (2)字段意思

```
  SelectValue: "", //值
  DataSource: [], //数据源
  DataValueField: "", //值字段
  DataTextField: "", //显示字段
  TreeLevelField: "", //树上级ID字段  用了判断是 下拉菜单还是 多级选择
  DisabledField: "", //是否禁止 下拉选择
  DataCascader: false, //是否是tree
  loading: false //加载过程
```

### (3) 组件代码 src\components\element\select\index.vue

```
<template>
  <div>
    <!-- 下拉选择框 -->
    <el-select v-if="!pIdKey" :disabled="loading" v-nulltext v-model="page.inputVal" :style="`width:${width}`" v-bind="$attrs" v-on="$listeners" @change="onChange">
      <template v-for="item in selectList">
        <el-option :key="item[idKey]" :value="item[idKey]" :label="item[nameKey]" :disabled="item[disabledKey]"></el-option>
      </template>
    </el-select>
    <!-- 下拉选择树 -->
    <el-cascader v-else-if="cascader" :disabled="loading" v-nulltext :props="{ ...$attrs }" :options="options" v-model="page.inputVal" :style="`width:${width}`" v-bind="$attrs" v-on="$listeners" @change="onChange"></el-cascader>
  </div>
</template>
<script>
export default {
  name: "ysSelect",
  data() {
    return {

      page: {
        inputVal: this.inputVal
      }
    };
  },
  props: {
    // 下拉列表数据
    selectList: {
      type: Array,
      default: () => []
    },
    //加载过程
    loading: {
      type: Boolean,
      default: () => false
    },
    //显示在input中的数据
    inputVal: [String, Array, Number],
    //input宽度
    width: {
      type: String,
      default: "100%"
    },
    //是否禁用字段
    disabledKey: {
      type: String,
      default: ""
    },
    // 值字段名
    idKey: {
      type: String,
      default: "value"
    },
    //  lable 显示的，显示在下拉页面上的内容
    nameKey: {
      type: String,
      default: "text"
    },
    //-------------------select-tree------------------------
    //树上级ID字段
    pIdKey: "",
    //是否是tree
    cascader: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  model: {
    prop: "inputVal",
    event: "change"
  },
  methods: {
    //选择事件
    onChange(val) {

    },
  },
  computed: {
    //计算属性
    options() {
      let _options = [];
      if (this.selectList.length == 0) {
        return [];
      }
      //this 可以获取到 所有属性
      let { selectList, idKey, pIdKey, nameKey, disabledKey } = this;
      console.log(selectList, idKey, pIdKey, nameKey, disabledKey)
      _options = JSON.parse(JSON.stringify(selectList));
      //从新设置属性
      _options.forEach(item => {
        Object.assign(item, {
          value: item[idKey], //树的 两个值
          label: item[nameKey], // 两个值
          disabled: !!item[disabledKey]
        });
      });
      //进行分类
      console.log(idKey, pIdKey)
      _options = _options.getChildren(idKey, pIdKey);
      return _options
    }
  }
}
</script>
```

### (4) 注册 src\components\element\index.js

```
import selectComponent from "./select";

//下拉
export const select = {
  install: function(Vue) {
    Vue.component("meiSelect", selectComponent);
  }
};
```

### (5) 遍历加载到全局 src\plugins\element.js

```
找到路径看代码
```

# 指令 placeholder 提示的封装

### （1）查询父标签是否有 label 如果有就把 文字拿过来插入到页面 src\directives\placeholder.js

```
import Vue from "vue";
import { hasClass } from "../utils/validate.js";
/**
 * @description 为空时提示
 */
Vue.directive("nulltext", {
  inserted: (el, binding, vnode) => {
    const text = el.__vue__.$parent.label || "内容";
    let placeholder = "请输入";
    if (hasClass(el, "el-select")) {
      placeholder = "请选择";
    }
    el.getElementsByClassName("el-input__inner")[0].placeholder =
      binding.value || placeholder + text;
  }
});

```

### （2） 注册到页面 src\main.ts

```
import "./directives/placeholder.js"; //为空提示
```

### (3) 项目应用

```
 <el-form-item label="防抖函数">
    <el-input v-model="form.id"   v-nulltext @input="onInput" v-debounce style="width: 200px"></el-input>
  </el-form-item>
```

# provide & inject 跨组件传值

### （1）在子组件中 provide 传出去 thisdialog

```
<script>
export default {
  name: "ysdialog",
  data: () => ({

  }),
  props: {

  },
  provide() {
    return {
      thisdialog: this
    };
  },
  mounted() { },
  watch: {
    dialogVisible(v) {
      if (v) {
        this.show();
      } else {
        this.close();
      }
    }
  },
  methods: {}
};
</script>
```

### （2）另一个子组件接收 inject: [ "thisdialog"],

```
<script>
import AssetYsSelect from "./AssetYsSelect.vue";
import FormList from "./json/form";  //form数据
export default {
  components: {
    AssetYsSelect
  },
  data() {
    return {
    };
  },
  inject: [ "thisdialog"],
  props: {},
  methods: {
    //点击关闭
     onClose() {
      this.thisdialog.close();
    }
  },
  mounted() { },
  computed: {},
  watch: {}
};
</script>
```
### select获取值 
```

```

# 列表到详情的的关系表
![Image text](./src/assets/images/1.jpg)
> form 是 列表的item
>  是要现实的 模态框列表
>  是select 要显示的下拉列表
```
form 和 field   field 和select.js
AssetEdit ==>  AssetYsSelect ==>  components/select/index.vue
```
