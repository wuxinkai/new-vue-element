import Vue from "vue";
import { hasClass } from "../util/validate.js";
/**
 * @description 为空时提示
 */
Vue.directive("nulltext", {
  inserted: (el, binding, vnode) => {
    // 通过lable 绑定值页面值
    const text = el.__vue__.$parent.label || "内容";
    let placeholder = "请输入";
    if (hasClass(el, "el-select")) {
      placeholder = "请选择";
    }
    el.getElementsByClassName("el-input__inner")[0].placeholder =
      binding.value || placeholder + text;
  }
});
