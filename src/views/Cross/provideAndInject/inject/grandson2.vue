<template>
  <div>
    <br>
    <el-button @click="handlebox" type="success">两个曾孙最底层的页面通讯,监听数据变化调用事件</el-button>
  </div>
</template>

<script>
export default {
  inject: {
    brotherFn: { default: () => ({}) },

  },
  data() {
    return {
      sunData: {
        value: '后代传过来的'
      },
    }
  },
  methods: {
    //发送给最外层
    handlebox() {
      this.flag = !this.flag
      this.flag ? this.brotherFn('兄弟页面通讯') : this.brotherFn('改变值内容')
    },
  
  }

}
</script>

<style scoped lang='less'>
</style>