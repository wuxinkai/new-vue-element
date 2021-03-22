<template>
  <div>
    <el-row :gutter="16">
      <el-col :span="12">
        <div class="ac_a1">
          <MyList v-model="widthVue"></MyList>

          <!-- 上面的等于下面的 -->
          <!-- <MyList :value="widthVue" @input="(data) => widthVue = data"></MyList> -->

          <!-- <MyList :value="widthVue" @input="widthVue= $event.target.value" /></MyList> -->
        </div>
      </el-col>
      <el-col :span="12">
        <div :style="{background:'pink',height: '300px',width: widthVue+'px'}">
          <h2>父页面</h2>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <h2>自定义v-moudel实现双向数据绑定</h2>
        <br>
        <p>(1) 定义宽度 widthVue = 200px</p>
        <br>
        <p>(2) 写子组件 MyList 添加 v-model="widthVue"</p>
        <br>
        <p> (3) 引入组件 MyList from './MyList'</p>
        <br>
        <p> (4) 子组件model: 属性 设置 prop: "width", event: "change" 注册了v-model的事件属性和获取值得功能 </p>
        <br>
        <p> (5) 子组件设置 props 设置 width: [String, Number] 这一步很重要</p>
        <br>
        <p> (6)子组件添加点击事件，利用   this.$emit('change', 500) 发送给父页面的v-model属性让其内容改变，父组件变子组件也变</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MyList from './MyList'
export default {
  components: {
    MyList
  },
  data() {
    return {
      widthVue: 200
    }
  },
}
</script>

<style scoped lang='less'>
</style>