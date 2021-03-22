<template>
  <div>
    <el-button @click="handelpost">孙子页面事件</el-button>
  </div>
</template>

<script>
export default {

  data() {
    return {
      flag: false
    }
  },
  methods: {
    //发送给爷爷页面
    handelpost() {
      this.flag = !this.flag
      this.$emit('test2', this.flag ? '被孙子修改' : "改回index")
    }
  },
  mounted() {

  },

}
</script>

<style scoped lang='less'>
</style>
