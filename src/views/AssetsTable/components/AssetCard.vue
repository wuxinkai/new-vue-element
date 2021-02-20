<template>
  <div id="card" class="assetCard flex" style="height:68vh">
    <el-row>
      <el-tabs v-model="page.activeName" @tab-click="handleClick">
        <el-tab-pane v-for="item in data.tabs" :key="item.name" :ref="item.name" :label="item.label" :name="item.name">
        </el-tab-pane>
      </el-tabs>
    </el-row>
    <el-row class="main">
      <transition name="breadcrumb">
        <!-- :is="page.activeName" 当前显示的内容  -->
        <!--:formdata="cardData" :readonly="true" 传递参数   -->
        <!-- 动态组件&vue-router -->
        <component :is="page.activeName" ref="cardCom" :formdata="cardData" :readonly="true" keep-alive></component>
      </transition>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //页面控制
      page: {
        activeName: "Details"
      },
      //数据
      data: {
        tabs: []
      }
    };
  },
  props: {
    cardData: Object  //tableitem 数据  传递给下一个组件
  },
  components: {
    //通过tabs 切换加载路由
    Details: resolve => { require(["./AssetEdit"], resolve); }, //加载的是编辑页面
    Modify: resolve => { require(["./AssetModify"], resolve); } //变更
  },
  methods: {
    //初始化项目
    initPage() {
      this.data.tabs.push({ label: "查看详情", name: "Details" });
      this.data.tabs.push({ label: "变更详情", name: "Modify" });
    },
    handleClick() { }
  },
  mounted() {
    this.initPage();
  },
}
</script>
<style lang="less" scoped>
.assetCard {
  padding-left: 20px;
  padding-right: 20px;
}
</style>