import Vue from "vue";
/**
 * @description 防抖
 * @param {function} fun 要延迟的方法
 * @param {int} delay 要延迟时间
 * @return {function} 延迟后函数
 */
const debounce = (fun = function () { }, delay = 800) => {
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
  inserted: function (el, binding, vnode) {
    debugger
    // vnode.componentOptions.listeners.input;
    // vnode.componentOptions.listeners.input.fns;
    // function(){}.prototype.fns = [];
    //如果是input
    if (vnode.componentOptions && vnode.componentOptions.tag == "el-input") {
      //得到原方法
      let Fns = vnode.componentOptions.listeners.input;
      //重写
      let newfns = [];
      // <el-input v-model="form.id" placeholder="防抖查询" @input="onInput" v-debounce style="width: 200px"></el-input>
      // 增加 @input="onInput" 就会变成一个 数组这样控制台就不会报错了
      Fns && Fns.fns && Fns.fns.forEach((item, index) => {
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
