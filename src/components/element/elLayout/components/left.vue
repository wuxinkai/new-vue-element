<template>
  <el-aside slot="left" ref="left" class="padding_10 wtransition" :width="data.width">
    <el-card shadow="hover" class="vH99 box-card maincard cardbody_0">
      <div slot="header" class="headerdiv">
        <slot name="title">
          <span>{{ title }}</span>
        </slot>
        <!-- 折叠按钮 -->
        <ys-aside-toggle v-if="showtoggle" v-model="data.width" @onToggle="onToggle"></ys-aside-toggle>
      </div>
      <!-- 列表 -->
      <slot></slot>
    </el-card>
  </el-aside>
</template>

<script>
export default {
  name: 'elLayoutLeft',
  props: {
    //标题
    title: "",
    //宽度
    width: "",
    //是否显示收起按钮
    showtoggle: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  data() {
    return {
      //页面控制
      page: {},
      //数据
      data: {
        width: this.width
      }
    };
  },
  methods: {
    onToggle(...ags) {
      this.$emit("onLeftToggle", ...ags);
    }
  },
}
</script>

<style scoped lang='less'>
.vH99{
  height: 99%;
}
.caroverflow{
  /deep/ .el-card__body {
    overflow: auto;
  }
}
.cardbody_0 {
  /deep/ .el-card__body {
    padding: 0px;
  }
}
.maincard {
    display: flex;
    flex-flow: column;
    /deep/ .el-card__body {
      flex: 1;
      position: relative;//如果下面的元素是 100% 需要使用position:absolute
    }
}
</style>