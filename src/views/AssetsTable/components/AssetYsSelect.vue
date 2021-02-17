<template>
  <ys-select ref="select" :selectList="page.DataSource" :idKey="page.DataValueField" :nameKey="page.DataTextField" :pIdKey="page.TreeLevelField" :cascader="page.DataCascader" :disabledKey="page.DisabledField" :loading="page.loading" filterable emitPath v-model="page.SelectValue" v-bind="$attrs" @change="onChange"></ys-select>
</template>

<script>
// import { AssetA1 } from "@/api";
import AssetSelectData from "./json/select"; //要匹配的下拉选择框
import FormList from "./json/form"; //所有列表数据
export default {
  data() {
    return {
      index: 0,
      //页面控制
      page: {
        SelectValue: "",
        DataSource: [], //数据源
        DataValueField: "", //值字段
        DataTextField: "", //显示字段
        TreeLevelField: "", //树上级ID字段  用了判断是 下拉菜单还是 多级选择
        DisabledField: "", //是否禁止 下拉选择
        DataCascader: false, //是否是tree
        loading: false //加载过程
      },
      //数据
      data: {}
    };
  },
  //外部属性
  props: {
    //字段
    sysAssetAItem: {
      type: Object,
      default: () => { }
    },
    //model
    SelectValue: [String, Array, Number]
  },
  model: {
    prop: "SelectValue",// 继承了v-modal的值    <asset-ys-select v-model="form[field.SYS_ASSET_A1_160]"></asset-ys-select>
    event: "change"
  },
  //内部方法
  methods: {
    // initPage() {},
    // 对select 进行设置
    async getDataSourceTow(num) {
      let _this = this
      if (_this.sysAssetAItem.SYS_ASSET_A1_170 == 'Select') {
        let [it] = AssetSelectData.filter((item, index) => item.codeId === _this.sysAssetAItem.SYS_ASSET_A1_60)
        Object.assign(_this.page, { ...it });
      }
      _this.$nextTick(() => {
        _this.page.loading = false;
      });
      //获取v-modal的值
      _this.page.SelectValue = _this.SelectValue;
    },
    //点击事件
    onChange() {

    },
    //  async getDataSource(opt) {
    //   this.page.loading = true;
    //   let ddl = await AssetA1.GetAssetA1Ddl(this.sysAssetAItem, opt);
    //   Object.assign(this.page, { ...ddl });
    //   // console.log(this.page);

    //   this.$nextTick(() => {
    //     //赋值
    //     this.page.loading = false;
    //   });
    //   this.page.ddlvalue = this.ddlvalue;
    // },
  },
  //组件
  components: {},
  //初始化 异步加async await
  mounted() {
    //渲染数据执行一次就可以， 要是真正项目采用sysAssetAItem 方法
    // this.getDataSourceTow();
  },
  //计算属性
  computed: {},
  //监视
  watch: {
    //渲染数据  要是有真实数据这里应该执行多次，但我们用的是假数据，就不在这里做监听； 
    sysAssetAItem: {
      handler() {
        this.getDataSourceTow();
      },
      immediate: true
    },
  }
};
</script>

<style lang="less" scoped>
</style>
