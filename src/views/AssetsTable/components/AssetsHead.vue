<template>
  <div class="assetHead">
    <el-form ref="form" :model="form" label-width="auto" class="headForm" :inline="true">
      <el-form-item label="防抖函数">
        <el-input v-model="form.id" v-nulltext @input="onInput" v-debounce style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" v-debounce @click="onBtnClick" icon="el-icon-plus">新增</el-button>
        <el-button type="primary" size="small" @click="onBtnSearch" icon="el-icon-search">高级查询</el-button>
        <el-button type="primary" size="small" icon="el-icon-delete">批量删除</el-button>
        <el-button type="primary" @click="getAlert" size="small" icon="el-icon-plus">验证消息提示</el-button>
        <el-button type="primary" size="small" icon="el-icon-edit" @click="showbatchUpdate">批量修改</el-button>
        <el-button type="primary" size="small" icon="el-icon-edit" @click="handleImport">导入Excel</el-button>
        <el-button type="info" size="small" icon="el-icon-document">导出Excel</el-button>
        <el-button type="info" size="small" icon="el-icon-takeaway-box">导出Zip</el-button>
      </el-form-item>
    </el-form>
    <verificationModal ref="verificationDom"></verificationModal>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import verificationModal from "./verificationModal";
import service from "@/service/index";
interface Admin {
  form: Object;
  visible: Boolean;
}

@Component({
  components: { verificationModal },
})
export default class AdminHead extends Vue implements Admin {
  @Prop() private page!: number;
  assetsData: Array<any> = [];
  form = {
    id: "",
  };

  visible = false; // 添加对话框是否可见

  // 请求table数据
  public getAssets() {
    let params = Object.assign({}, this.form, { page: 1 });
    service.getAssetsList(params).then((res) => {
      this.assetsData = res.result["assets"];
      this.$emit("getHeadData", res, true);
    });
  }
  // 搜索用的
  public onInput() {
    this.getAssets();
  }
  public onBtnClick() {
    console.log(1);
  }
  //高级搜索
  public onBtnSearch() {
    this.$emit("handleSearch");
  }

  private created() {
    this.getAssets();
  }

  //打开批量修改
  private showbatchUpdate() {
    this.$emit("handleUpdate");
  }

  /*
   使用的时候传参不传参默认显示实例中定义的
    第一参数：第一个提示内容
    第二个参数：标头提示内容
    第三个参数：第二个提示内容
    第四个参数：图标类型 icon的className
    第五个参数：图标颜色
  */
  //验证提示框
  public getAlert() {
    this.$alert(
      "是否确认新建",
      "系统提示",
      "此项为新建一名用户1",
      "el-icon-s-tools", //el-img-custom   判断第二项想不img
      "#688ef7"
    )
      .then(() => {
        this.$message({
          type: "success",
          message: "已跳转",
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消",
        });
      });
  }

  // 导入
  public handleImport() {
    this.$refs.verificationDom.openModal();
  }
}
</script>
<style lang="less" scoped>
.assetHead {
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