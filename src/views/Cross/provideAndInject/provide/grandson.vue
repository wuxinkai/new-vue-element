<template>
  <div>
    <br>
    <p style="color:pink">曾孙接收:{{demo3}} <el-button @click="getparent">3调用父页面事件</el-button>
    </p>
    <br>
    <p>grandson2传过来的值:{{demo7}}</p>
  </div>
</template>

<script>
export default {
  //（6）儿子接收  ********
  inject: ['for', 'getAttrName', 'brotherData'], //对象是哪过来数据， 函数式发送过去数据
  data() {
    return {
      demo3: this.for,
      demo7: this.brotherData,
    }
  },
  watch: {
    'demo7.val'(to, old) {
      this.grandsonFn()
    }
  },
  methods: {
    //调用父页面事件
    getparent() {
      this.getAttrName('曾孙页面调用根页面事件')
    },
    //被另一个兄弟调用
    grandsonFn() {
      this.$message.info("调用grandson页面事件src\views\Cross\provideAndInject\provide\grandson.vue")
    }
  }
}
</script>

<style scoped lang='less'>
</style>