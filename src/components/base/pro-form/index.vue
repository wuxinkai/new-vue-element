<template>
  <el-form class="pro-form" ref="form" :model="form" v-bind="$attrs">
    <el-row :gutter="16">
      <el-col v-for="item in formItems" :key="item.key" :span="item.span || 24">
        <el-form-item v-if="item._isShow" :rules="item._rule" :prop="item.key" :label="item.title">
          <!-- component 元素是vue 里面的一个内置组件。 渲染一个组件为动态组件 用 is 的值来 判断渲染 -->
          <component :is="item.type" v-model="form[item.key]" :options="item.options" v-bind="item.props" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item v-if="hasControl">
      <el-button type="primary" @click="submit">{{ submitText }}</el-button>
      <el-button @click="reset">{{ resetText }}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { computeFormItem } from './core'
export default {
  name: 'ProForm',
  props: {
    //from数据
    fields: {
      type: Array,
      default: () => []
    },
    //折叠栏属性

    //按钮属性
    hasControl: {
      type: Boolean,
      default: true
    },
    submitText: {
      type: String,
      default: '提交'
    },
    resetText: {
      type: String,
      default: '重置'
    },
  },
  data() {
    return {
      form: this.initForm()
    }
  },
  computed: {
    //计算属性后渲染到页面 
    formItems() {
      const newformData = this.fields.map(item => computeFormItem(item, this.form))
      console.log(newformData)
      return newformData
    }
  },
  methods: {
    //有利于 初始化  每次跳转页面进来都会执行
    initForm() {
      const form = {}
      const map = {
        input: '',
        inputNumber: undefined
      }
      return form
    },
    //确认
    submit() { },
    //取消
    reset() { },
  }
}
</script>
<style scoped>
.pro-form {
  padding: 12px;
  background: white;
}
</style>
