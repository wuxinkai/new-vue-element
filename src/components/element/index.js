import dialogComponent from "./dialog";

//窗口
export const meidialog = {
  install: function(Vue) {
    Vue.component("meiDialog", dialogComponent);
  }
};