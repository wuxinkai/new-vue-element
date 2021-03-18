
import proFormComponent from "./pro-form";
import selectInputComponent from './base-components/ba-select-input'
import radioComponent from './base-components/ba-radio'
import selectComponent from './base-components/ba-select'

// ! 这是 
// ? 这是
// * 自定义组件
// todo 这是 


//整体表单组件
export const proFormName = {
  install: function (Vue) {
    Vue.component("proForm", proFormComponent);
  }
};

// ! select和input组合组件
export const BaSelectInputName = {
  install: function (Vue) {
    Vue.component("BaSelectInput", selectInputComponent);
  }
};

// !  单选 
export const BaradioName = {
  install: function (Vue) {
    Vue.component("BaRadio", radioComponent);
  }
};

// !  下拉选择框 
export const BaSelectName = {
  install: function (Vue) {
    Vue.component("BaSelect", selectComponent);
  }
};


