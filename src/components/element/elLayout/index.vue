<template>
  <el-container class="vH cont">
    <slot></slot>
  </el-container>
</template>
<script>
export default {
  name: "elLayout",
  data() {
    return {
      //页面控制
      page: {},
      //数据
      data: {}
    };
  },
  //内部方法
  methods: {
    initPage() {}
  },
  //组件
  components: {},
  //初始化 异步加async await
  mounted() {
    this.initPage();
  },
};
</script>

<style lang="less" scoped>

</style>
