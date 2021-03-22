<template>
  <div>
    <p>通过爷爷页面改变：{{$attrs.A4}}</p>
    <p>孙子页面：{{$attrs.A2?'在父级加了v-bind="$attrs所以有数据"':".....没数据"}}，</p>
  </div>
</template>

<script>
export default {
  // 不想继承所有父组件的内容,同时也不在组件根元素dom上显示属性
  inheritAttrs: false,
  props: {
  },
  components: {

  },
  data() {
    return {

    }
  },
  mounted() {
    console.log('孙子：', this.$attrs);
  },
}
</script>

<style scoped lang='less'>
</style>