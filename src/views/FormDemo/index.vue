<template>
  <el-card :body-style="{  background: '#B3C0D1' }">
    <div slot="header">表单组件</div>
    <pro-form :fields="fields1" label-width="100px" @submit="onSubmit" />
  </el-card>
</template>
<script>

export default {
  name: "FormPage",
  data() {
    return {
      fields1: [
        {
          key: 'name',
          title: '用户名',
          isRequired: true
        },
      ]
    }
  },
  methods: {
    onSubmit(form, valid) {
      debugger
    }
  }
}
</script>
