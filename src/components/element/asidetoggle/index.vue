<template>
  <el-button class="lefttoggle" size="small" circle icon="el-icon-arrow-left" @click="onlefttoggle"></el-button>
</template>

<script>
export default {
  data() {
    return {};
  },
  //外部属性
  props: {
    width: String
  },
  model: {
    prop: "width",
    event: "change"
  },
  mounted() {
    this.$el.addEventListener('onkeydown', this.onkeydown)
    this.$el.addEventListener('onkeyup', this.onkeydown)
  },
  //内部方法
  methods: {
    initPage() { },
    onkeydown(e) {
      let keynum = e.keyCode
      console.log(keynum)
    },
    onkeyup(e) {
      let keynum2 = e.keyCode
      console.log(keynum2)
    },
    onlefttoggle() {
      //获取父元素的上面的内容
      const aiside = this.$parent.$parent;
      if (!aiside.collapsed) {
        if (!aiside.initWidth) aiside.initWidth = this.width;
        this.$emit("change", "70px");
        aiside.$el.classList.add("collapsed");
      } else {
        this.$emit("change", aiside.initWidth);
        aiside.$el.classList.remove("collapsed");
      }
      aiside.collapsed = !aiside.collapsed;
      this.$emit("onToggle", aiside.collapsed);
    }
  },
};
</script>

<style lang="less" scoped>
</style>
