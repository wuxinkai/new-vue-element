<h1 align="center">vue3-admin</h1>

## 简介
vue3-admin是一个后台管理系统的前端页面展示，是由vue-cli4和elemnet-ui搭建实现的。使用了最新的vue框架，内部采用了组件化开发模式，尽可能使得每个组件都遵循单一
功能原则。虽然刚开始看起来可能略感疲惫（由于子组件功能单一，所以内部通信较多），但是对后期的维护有着非常大的好处。项目采用弹性盒（flex）布局，故而在移动端也有着较好的显示效果，可在移动端进行打开demo查看。

## 演示(由于作者自己买的低配版阿里云服务器，所以可能导致请求时间略长)
[在线demo](http://39.105.222.188/vue3.0-admin/#/login)

移动端可扫码查看

![avatar](./qrCode.png)

## 更快更好的开发体验，请查看下面的项目
[vue3实战项目](https://github.com/guodonglw/vue3-admin)

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

打包会出现dist文件夹，用Chrome浏览器打开index.html页面即可

## Browsers support

Modern browsers

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- |
| last 2 versions| last 2 versions| last 2 versions
  
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
### 防抖函数指令的应用 input的防抖

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
#### 2注入 \src\main.js
```

```
#### 3项目应用 src\directives\debounce.js
```
```
