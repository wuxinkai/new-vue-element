
import proFormComponent from "./pro-form";
//整体表单组件
export const proFormName = {
  install: function(Vue) {
    Vue.component("proForm", proFormComponent);
  }
};
