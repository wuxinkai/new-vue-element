<template>
  <el-card :body-style="{  background: '#B3C0D1' }">
    <div slot="header">表单组件</div>
    <!-- 对表单的封装 -->
    <pro-form :fields="fields1" label-width="100px" @submit="onSubmit" />
  </el-card>
</template>
<script>
import service from "@/service/index";
export default {
  name: "FormPage",
  data() {
    return {
      page: 1,
      form: {
        id: "",
      },
      fields1: [
        {
          key: 'name',
          title: '用户名',
          // span: 6,
          isRequired: true
        },
        {
          key: 'publishTime',
          // span: 6,
          title: '发布时间',
          type: 'datetime',
          isRequired: true
        },
        {
          key: 'activeTime',
          // span: 6,
          title: '活动时间',
          type: 'datetime',
          props: {
            type: 'datetimerange'
          }
        },
        {
          key: 'moreConditions',
          title: '更多条件',
          // span: 6,
          type: 'selectInput',
          options: {
            a: 1,
            b: 2,
            c: 3
          }
        },
        {
          key: 'sex',
          title: '性别',
          type: 'radio',
          options: [
            { label: '男', value: 1 },
            { label: '女', value: 2 }
          ],
          search: {}
        },
        {
          title: '类型',
          isRequired: true,
          key: 'status',
          type: 'select',
          options: [
            { value: 'online', label: '上线', type: 'success' },
            { value: 'hide', label: '隐藏', type: 'info' },
            { value: 'delete', label: '删除', type: 'danger' },
          ],
          search: {},
        },
        {
          title: '年龄',
          key: 'age',
          type: 'inputNumber',
          search: {}
        }
      ]
    }
  },
  created() {
    this.getAdmin();
  },
  methods: {
    // 获取更多条件数据 
    getAdmin() {
      let params = Object.assign({}, this.form, { page: this.page });
      service.getAdminList(params).then((res) => {
        let data = res.result["admins"]
        this.fields1[5].options = data.map(v => { return { ...v, value: v.id, label: v.name, type: v.adminType } })

      });
    },
    onSubmit(form, valid) {
      debugger
      const { moreConditions, ...rest } = form
      //recude报错->moreCoditions未成功获取值或者没判断为undefined的情况

      //数组变对象必学内容
      const temp = moreConditions.reduce((obj, item) => ({ ...obj, [item.key]: item.value }), {})
      
      this.$message.info(`校验结果：${valid} 表单数据：` + JSON.stringify({ ...rest, ...temp }))
    }
  }
}
</script>
