<template>
  <div>
    <p style="color:blue">儿子接收:{{demo}}<el-button @click="getparent">1调用父页面事件</el-button>
    </p>

    <br>
    <grandChild></grandChild>
  </div>
</template>

<script>
import grandChild from './grandChild';
export default {
  // （4） 儿子接收 ********
  inject: {
    for: {
      default: () => ({

      })
    },
    getAttrName: {
      default: function () { }
    }
  },
  
  components: {
    grandChild
  },
  data() {
    return {
      demo: this.for
    };
  },
  methods: {
    //调用父页面事件
    getparent() {
      this.getAttrName('儿子页面调用根页面事件')
    }
  }

}
</script>

<style scoped lang='less'>
</style>