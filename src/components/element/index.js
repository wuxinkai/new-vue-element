import dialogComponent from "./dialog";
import selectComponent from "./select";
import selectTreeComponent from "./selectTree";
//窗口
export const ysdialog = {
  install: function(Vue) {
    Vue.component("ysDialog", dialogComponent);
  }
};
//下拉菜单
export const ysSelect = {
  install: function(Vue) {
    Vue.component("ysSelect", selectComponent);
  }
};
//下拉菜单多级
export const selectTree = {
  install: function(Vue) {
    Vue.component("ysSelectTree", selectTreeComponent);
  }
};