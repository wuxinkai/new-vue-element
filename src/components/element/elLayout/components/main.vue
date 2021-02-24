<template>
  <el-main class="padding_10">
    <!-- 资产列表 -->
    <el-card ref="card" shadow="hover" class="vH99 box-card maincard">
      <div slot="header" class="">
        <slot name="title">
          <span>{{ title }}</span>
        </slot>
      </div>
      <slot></slot>
    </el-card>
  </el-main>
</template>
<script>
export default {
  data() {
    return {
      //页面控制
      page: {},
      //数据
      data: {}
    };
  },
  //外部属性
  props: {
    title: "",
    overflow: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  //内部方法
  methods: {
    initPage() {
      if (this.overflow) {
        this.$refs.card.$el.classList.add("caroverflow");
      }
    }
  },
  //初始化 异步加async await
  mounted() {
    this.initPage();
  },

};
</script>
<style lang="less" scoped>
.vH99{
  height: 99%;
}
.maincard {
    display: flex;
    flex-flow: column;
    /deep/ .el-card__body {
      flex: 1;
      overflow: auto; //子组件做到auto 不用设置高度出现滚动条
      position: relative;//如果下面的元素是 100% 需要使用position:absolute
    }
}
</style>