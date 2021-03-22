<template>
  <div>
    <div :style="{background:activeColor,height: vheight+'px',width: width+'px'}">
      <h2>子页面数据</h2>
    </div>
    <el-button @click="Handleswc" style="margin-left: 10px" size="mini">切换</el-button>
  </div>
</template>

<script>
export default {
  name: 'MyList',
  props: { // 必须有
    width: [String, Number]
  },
  model: {
    prop: "width", //接收参数
    event: "change" // 修改内容
  },
  data() {
    return {
      current: false,
      activeColor: 'red',
      vheight: 300,
    }
  },
  methods: {
    Handleswc() {
      this.current = !this.current
      if (this.current) {
        this.$emit('change', 500) //设置的是父页面widthVue的值
      } else {
        this.$emit('change', 200)
      }
    }
  }

}
</script>

<style scoped lang='less'>
</style>
