import updateExcel from "./updateExcel";
import ExportExcel from "./exportExcel";
//验证弹框
export const ysUpdateExcel = {
  install: function (Vue) {
    Vue.component("ysUpdateExcel", updateExcel);
  }
};
//报错弹框
export const ysExportExcel = {
  install: function (Vue) {
    Vue.component("ysExportExcel", ExportExcel);
  }
};
