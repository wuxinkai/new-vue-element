import dialogComponent from "./dialog";
import selectComponent from "./select";
//窗口
export const ysdialog = {
  install: function(Vue) {
    Vue.component("ysDialog", dialogComponent);
  }
};

export const ysSelect = {
  install: function(Vue) {
    Vue.component("ysSelect", selectComponent);
  }
};