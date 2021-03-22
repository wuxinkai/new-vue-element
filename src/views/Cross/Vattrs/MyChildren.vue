<template>
  <div>
    <br>
    <div>子页面: <span style="color:blue">{{foo.A1}}</span></div>
    <br>
    <!-- 孙子可接收，到爷爷页面的数据 -->
    <child1 v-bind="$attrs"></child1>
    
    <br>
    <!-- 孙子没接收到爷爷页面的数据 -->
    <child1></child1>
  </div>
</template>

<script>
import child1 from './child1'
export default {
  components: {
    child1
  },
  inheritAttrs: true,// 继承所有父组件的内容
  //父页面三个属性  :foo="foo_data" v-bind="{A2:'字符串'}" :text="{A3:false}"
  props: {
    foo: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {

    }
  },
  methods: {

  },
  mounted() {

    console.log('儿子：', this.$attrs); //这里值剩下 {A2:'字符串'}" :text="{A3:false}
  },

}
</script>

<style scoped lang='less'>
</style>