<template>
  <div class="head">
    <el-form ref="form" :model="form" label-width="auto" class="headForm" :inline="true">
      <el-form-item label="防抖函数">
        <el-input v-model="form.id" placeholder="防抖查询" @input="onInput" v-debounce style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-plus">新增</el-button>
        <el-button type="primary" size="small" icon="el-icon-search">高级查询</el-button>
        <el-button type="primary" size="small" icon="el-icon-delete">批量删除</el-button>
        <el-button type="primary" size="small" icon="el-icon-edit">批量修改</el-button>
        <el-button type="info" size="small" icon="el-icon-document">导出Excel</el-button>
        <el-button type="info" size="small" icon="el-icon-takeaway-box">导出Zip</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import service from "@/service/index";
interface Admin {
  form: Object;
  visible: Boolean;
}

@Component({})
export default class AdminHead extends Vue implements Admin {
  @Prop() private page!: number;
  assetsData: Array<any> = [];
  form = {
    id: "",
  };

  visible = false; // 添加对话框是否可见

  // 请求table数据
  public getAssets() {
    let params = Object.assign({}, this.form, { page: this.page });
    service.getAssetsList(params).then((res) => {
      this.assetsData = res.result["assets"];
      this.$emit("getHeadData", res, true);
    });
  }
  // 搜索用的
  public onInput() {
    this.getAssets();
  }
  private created() {
    this.getAssets();
  }
}
</script>
<style lang="less" scoped>
.head {
  flex: 0 0 50px;
  width: 100%;
  margin: 10px 0;
  background-color: rgba(176, 196, 222, 0.3);

  &Form {
    margin: 20px 10px 10px 10px;
    float: left;
  }
}

.el-form-item {
  margin-bottom: 10px;
}
</style>