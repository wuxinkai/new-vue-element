<template>
  <el-popconfirm :popper-append-to-body="false" placement="top-start" :title="`确定${text}?`" cancel-button-text="取消" confirm-button-text="确定" @confirm="handleConfirm">
    <el-button slot="reference" style="margin-left: 10px" size="mini" type="text">{{ text }}</el-button>
  </el-popconfirm>
</template>

<script>
export default {
  name: 'ysConfirmButton',
  props: {
    text: {
      type: String,
      default: '按钮'
    },
    confirmData: {
      type: Object,
      default() {
        return {};
      }
    },
    confirmIndex: {
      type: Number,
      default() {
        return null;
      }

    }
  },
  methods: {
    handleConfirm() {
      this.$emit('confirmItem', this.confirmData, this.confirmIndex)
    }
  }
}
</script>
