import dialogComponent from "./dialog";
import selectComponent from "./select";
import selectTreeComponent from "./selectTree";
import asidetoggleComponent from "./asidetoggle";
import elLayoutComponent from "./elLayout";
import elLayoutLeftComponent from "./elLayout/components/left.vue";
import elLayoutMainComponent from "./elLayout/components/main.vue";
//窗口
export const ysdialog = {
  install: function (Vue) {
    Vue.component("ysDialog", dialogComponent);
  }
};
//下拉菜单
export const ysSelect = {
  install: function (Vue) {
    Vue.component("ysSelect", selectComponent);
  }
};
//下拉菜单多级
export const selectTree = {
  install: function (Vue) {
    Vue.component("ysSelectTree", selectTreeComponent);
  }
};
//右侧收起
export const asidetoggle = {
  install: function(Vue) {
    Vue.component("ysAsideToggle", asidetoggleComponent);
  }
};
//左右布局
export const elLayout = {
  install: function (Vue) {
    Vue.component("ysLayout", elLayoutComponent);
  }
};
//左右布局
export const elLayoutLeft = {
  install: function (Vue) {
    Vue.component("ysLayoutLeft", elLayoutLeftComponent);
  }
};
//左右布局
export const elLayoutMain = {
  install: function(Vue) {
    Vue.component("ysLayoutMain", elLayoutMainComponent);
  }
};