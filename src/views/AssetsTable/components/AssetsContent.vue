<template>
  <div class="content">
    <!-- <el-table
    :data="tableData"
    highlight-current-row
    :header-cell-style="{background:'rgba(255,218,185,0.4)',color:'#2F4F4F'}"
    @sort-change='sortChange'
    v-loading="listLoading"
    border>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="名字">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="地址">
              <span>{{ props.row.addr }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.buildtime }}</span>
            </el-form-item>
            <el-form-item label="图像">
              <span><img :src="props.row.image" title="图像示例"></span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="ID"
        prop="id"
        align="center"
        min-width="150"
        sortable='custom'>
      </el-table-column>
      <el-table-column
        label="名字"
        prop="name"
        align="center"
        min-width="150">
      </el-table-column>
      <el-table-column
        label="性别"
        prop="sex"
        align="center"
        min-width="150">
      </el-table-column>
      <el-table-column
        label="地址"
        prop="addr"
        align="center"
        min-width="150">
      </el-table-column>
      <el-table-column
        label="email"
        prop="email"
        align="center"
        min-width="300">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="info" size="mini" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table> -->

    <el-table :data="tableAssetsData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="80">
      </el-table-column>
      <el-table-column prop="ASSET_A1_30" label="系统资产编号" width="120">
      </el-table-column>
      <el-table-column prop="ASSET_A1_20" label="资产名称" width="180">
      </el-table-column>
      <el-table-column prop="ASSET_A1_60" label="存放地点">
      </el-table-column>
      <el-table-column prop="ASSET_A1_10" label="数量">
      </el-table-column>
      <el-table-column prop="ASSET_A1_280" label="库存状态">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="info" size="mini" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <ys-dialog ref="AssetEditDialog" width="40%" :nopadding="true" title="资产编辑">
      <AssetEdit ref="assetA1Edit" :formdata="page.selectData"></AssetEdit>
    </ys-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import AssetEdit from "./AssetEdit.vue";
import service from "@/service/index";

@Component({
  components: { AssetEdit },
})
export default class AdminContent extends Vue {
  @Prop() private tableAssetsData!: Array<object>;

  data() {
    return {
      //页面控制
      page: {
        loading: false,
        Copyloading: false,
        paginations: {},
        searchtxt: "",
        selectData: {},
        selection: [], //选择的数据
        sort: {
          strorder: "", //字段
          ordertype: "" //方向 不为空 就是 desc
        }
      },
      //数据
      data: {
        sysAssetA1Data: [], //列数据
        assetA1data: [] //表数据
      }
    };
  }
  //编辑功能
  public handleEdit(column, row) {
    this.page.selectData = row;
    this.$refs.AssetEditDialog.show();
  }
  //删除功能
  public handleDel(column, row) {}
}
</script>

<style lang="less" scoped>
.content {
  flex: 1 0 auto;
  border: 1px solid rgba(176, 196, 222, 1);
  width: 100%;
  margin: 20px 0;
  overflow: auto;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.el-table {
  width: 100%;
  text-align: center;
}
</style>