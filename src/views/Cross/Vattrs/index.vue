<template>
  <div>
    <h3>index 传递给孙子页面child1数据</h3>
    <div class="a1">
      <div class="a2">index</div>
      <div class="b1">
        <p class="b2">MyChildren</p>
        <div class="c1">child1</div>
      </div>
    </div>
    <h3>$attrs的本质:父组件以形如:foo="xxx"或者v-bind="{age:12}"传给子组件的属性，</h3>
    <br>
    <p>v-bind的本质: 批量传入props</p>
    <br>
    <p style="color:red;font-weight: 700;">但凡没有被子组件的props接收的，都会被扔到子组件的$attrs里去 <span style="color:#333;font-weight: 700;">孙子组件接收不到参数</span></p>
    <MyChildren :foo="foo_data" v-bind="{A2:'字符串',A4}" :text="{A3:false}"></MyChildren>

    <el-button @click='transmitClick()'>爷爷传递给孙子</el-button>
  </div>
</template>

<script>
import MyChildren from './MyChildren'

export default {
  components: {
    MyChildren
  },
  data() {
    return {
      foo_data: {
        A1: '詹姆斯'
      },
      A4: "变化",
      flag: false
    }
  },
  methods: {
    //改变孙子页面信息
    transmitClick() {
      this.flag = !this.flag
      this.flag ? this.A4 = "不变化" : this.A4 = "变化"
    },
  }
}
</script>

<style scoped lang='less'>
.a1 {
  width: 300px;
  height: 200px;
  background: #ccc;
  border: 1px solid #333;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.a2 {
  position: absolute;
  left: 0;
  top: 0;
}
.b2 {
  .a2();
}
.b1 {
  width: 200px;
  height: 150px;
  background: #ccc;
  border: 1px solid #333;
  display: flex;
  justify-content: center;
   align-items: center;
  position: relative;
}
.c1 {
  width: 100px;
  height: 100px;
  background: #ccc;
  border: 1px solid #333;
}
</style>