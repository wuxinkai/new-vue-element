<template>
  <div>
    <p style="color:green">孙子接收:{{demo2}} <el-button @click="getparent">2调用父页面事件</el-button>
    </p>
    <grandson></grandson>
  </div>
</template>

<script>
import grandson from './grandson';
export default {
  //（5）孙子接收 ********
  inject: {
    for: { default: () => ({}) },
    getAttrName: { default: () => ({}) }
  },
  components: {
    grandson
  },
  data() {
    return {
      demo2: this.for
    }
  },
  methods: {
    //调用父页面事件
    getparent() {
      this.getAttrName('孙子页面事件')
    }
  }
}
</script>

<style scoped lang='less'>
</style>