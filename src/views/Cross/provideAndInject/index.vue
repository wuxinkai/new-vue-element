<template>
  <div>
    <el-row :gutter="16">
      <el-col :span="24">
        <h3>index 传递给孙子页面child1数据</h3>
        <div class="a1">
          <div class="a2">index :::<span>{{pData}}</span></div>
          <div class="b1">
            <p class="b2">myChild</p>
            <div class="c1">
              <p class="c2">grandChild</p>
              <div class="d1">
                grandson
              </div>
            </div>
          </div>
        </div>
      </el-col>

    </el-row>
    <el-row :gutter="16">
      <el-col :span="12">
        <p>vue提供了provide和inject帮助我们解决多层次嵌套嵌套通信问题。</p>
        <br>
        <p style="color:red">provide中指定要传递给子孙组件的数据，</p>
        <p>provide：是一个对象，或者是一个返回对象的函数。</p>
        <p>注意：子孙层的provide会掩盖祖父层provide中相同key的属性值</p>
        <br>

        <el-button @click="handleClick">根页面点击事件</el-button>
        <br>
        <myChild></myChild>
      </el-col>
      <el-col :span="12">
        <br>
        <br>
        <p style="color:red">子孙组件通过inject注入祖父组件传递过来的数据。</p>
        <p>inject: 一个字符串数组，或者是一个对象</p>
        <br>
        <myChild2></myChild2>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import myChild from './provide/myChild';
import myChild2 from './inject/myChild2';
export default {
  components: {
    myChild,
    myChild2
  },
  //（1）******** provide:{}, //对象
  provide() {
    return {
      for: this.newData, //传递对象 {}
      getAttrName: this.getName, //传递事件 function

      brotherFn: this.brotherClick,
      brotherData: this.brother,

    }
  },
  data() {
    return {
      //这样数据是不变的 *********  不能监听数据变化
      // newData:"123",

      //（2）******** newData是 一个对象 更改数据绑定才会有变化
      newData: {
        text: '传给后代的值'
      },
      flag: false,
      pData: '',

      //兄弟组件传值
      brother: {
        val: ''
      }
    }
  },
  methods: {
    //(3)******** 发送数据
    handleClick() {
      this.flag = !this.flag
      this.flag ? this.newData.text = '传给后代值的变化' : this.newData.text = '改变值内容'
    },
    // 获取儿子 孙子 曾孙 传过来的值
    getName(data) {
      this.pData = data
    },

    //兄弟组件通讯  
    brotherClick(data) {
      this.brother.val = data
    },
  
  },
}
</script>



<style scoped lang='less'>
.a1 {
  width: 400px;
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
  width: 300px;
  height: 150px;
  background: #ccc;
  border: 1px solid #333;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.c1 {
  width: 200px;
  height: 100px;
  background: #ccc;
  border: 1px solid #333;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.d1 {
  width: 160px;
  height: 60px;
  background: #ccc;
  border: 1px solid #333;
  line-height: 60px;
}
.c2 {
  .a2();
}
</style>