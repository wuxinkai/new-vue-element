<template>
  <div>
    <h3 style="color:red">GrandChild给爷爷index页面传数据</h3>
    <div class="a1">
      <div class="a2">{{indexpage}}</div>
      <div class="b1">
        <p class="b2">myChild</p>
        <div class="c1">grandChild</div>
      </div>
    </div>

    <h5>包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用。</h5>
    <h5>简单点讲它是一个对象，里面包含了作用在这个组件上所有的监听器（监听事件），可以通过 v-on="$listeners" 将事件监听指向这个组件内的子元素（包括内部的子组件）</h5>
    <myChild @test2="onTest2"></myChild>
  </div>
</template>

<script>
import myChild from './myChild'
export default {
  name: '',
  props: {
  },
  components: {
    myChild
  },
  data() {
    return {
      indexpage: 'index'
    }
  },
  methods: {
    //孙子传给爷爷的事件
    onTest2(data) {
      this.indexpage = data
    }
  },

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