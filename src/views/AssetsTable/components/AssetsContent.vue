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

    <el-table :data="tableAssetsData" stripe row-key="AUTOID" style="width: 100%" @selection-change="handleSelectionChange" @sort-change="OnSortChane">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="id" label="序号" sortable="custom" width="80">
      </el-table-column>
      <el-table-column prop="ASSET_A1_30" sortable="custom" label="系统资产编号" width="150">
      </el-table-column>
      <el-table-column prop="ASSET_A1_20" sortable="custom" label="资产名称" width="180">
      </el-table-column>
      <el-table-column prop="ASSET_A1_60" sortable="custom" label="存放地点">
      </el-table-column>
      <el-table-column prop="ASSET_A1_10" sortable="custom" label="数量">
      </el-table-column>
      <el-table-column prop="ASSET_A1_280" sortable="custom" label="库存状态">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="info" size="mini" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit">编辑</el-button>
          <el-button type="info" size="mini" @click="handleDetails(scope.$index, scope.row)" icon="el-icon-tickets">详情</el-button>
          <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <ys-dialog ref="AssetEditDialog" width="40%" :nopadding="true" title="资产编辑">
      <AssetEdit ref="assetA1Edit" :formdata="page.selectData"></AssetEdit>
    </ys-dialog>

    <ys-dialog ref="cardDialog" width="40%" :nopadding="true" title="查看详情">
      <AssetCard ref="assetCard" :cardData="page.selectData"></AssetCard>
    </ys-dialog>

    <ys-dialog ref="searchDialog" width="60%" :nopadding="true" title="高级搜索查询">
      <AssetSearch ref="assetSearch"></AssetSearch>
    </ys-dialog>

    <ys-dialog ref="updateDialog" width="60%" :nopadding="true" title="批量修改">
      <AssetsUpdate ref="batchUpdate" :updateData="page.selection"></AssetsUpdate>
    </ys-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import AssetEdit from "./AssetEdit.vue";
import AssetCard from "./AssetCard.vue";
import AssetsUpdate from "./AssetsUpdate/index";
import AssetSearch from "./AssetSearch/index";
import service from "@/service/index";

@Component({
  components: { AssetEdit, AssetCard, AssetSearch, AssetsUpdate },
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
          ordertype: "", //方向 不为空 就是 desc
        },
      },
      sort: {
        //排序
        strorder: "", //字段
        ordertype: "", //方向 不为空 就是 desc
      },
      //数据
      data: {
        sysAssetA1Data: [], //列数据
        assetA1data: [], //表数据
      },
    };
  }

  //编辑功能
  public handleEdit(column, row) {
    this.page.selectData = row;
    this.$refs.AssetEditDialog.show();
  }
  //打开资产卡片
  public handleDetails(column, item) {
    this.page.selectData = item;
    this.$refs.cardDialog.show();
  }
  public showAssetA1Search(item) {
    this.$refs.searchDialog.show();
  }
  //是否是多选
  public handleSelectionChange(val) {
    this.page.selection = val;
  }
  //批量修改
  public getUpdate() {
    if (this.page.selection.length == 0) {
      this.$message.warning("请至少选择一条数据。");
      return;
    }
    this.$refs.updateDialog.show();
  }

  //删除功能
  public handleDel(column, row) {}
  //排序
  public OnSortChane({ column, prop, order }, deprop = "id") {
    //本地内存排序
    // 1. 每次先执行默认排序 id
    // 2. 通过 prop 排序 [].sort
    if (order) {
      this.tableAssetsData.sort((m, n) => {
        //数字排序
        if (isFinite(m[prop]) && isFinite(m[prop])) {
          return n[prop] - m[prop];
        } else if (n[prop]) {
          //中文排序
          return n[prop].localeCompare(m[prop]);
        } else {
          return -1; //默认是空值
        }
      }); // 数字比较默认是倒叙
      if (order == "ascending") {
        this.tableAssetsData.reverse();
      }
    }

    //服务端排序
    // if (!order) prop = "";
    // if (order == "ascending") order = "";
    // this.page.sort = {
    //   strorder: prop,
    //   ordertype: order
    // };
  }
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