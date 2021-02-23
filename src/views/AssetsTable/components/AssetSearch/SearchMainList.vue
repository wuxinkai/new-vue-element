<template>
  <div class="search vH">
    <el-row class="flexRow">
      <!-- 存储的是被保存的模板 -->
      <ys-select ref="searchmodel" :data="sys4data_003" :loading="page.searchmodelloading" width="140px" v-model="page.searchmodel" size="small" filterable allow-create default-first-option style="margin-right:10px" @change="onModelChange"></ys-select>
      <el-button type="primary" size="small" icon="el-icon-circle-check" @click="onSearchSave">
        保存模板
      </el-button>
      <el-button size="small" icon="el-icon-circle-plus-outline">
        新建
      </el-button>
      <el-button size="small" icon="el-icon-remove-outline">
        删除
      </el-button>
    </el-row>
    <el-row class="main">
      <transition-group mode="out-in" appear enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">
        <el-row type="flex" align="middle" style="padding-top: 10px" v-for="(item, index) in formItem" :key="item.sysCode">
          <el-col :span="5">{{item.sysName}}</el-col>
          <el-col :span="4">2222222222</el-col>
          <el-col :span="12">33333333333</el-col>
          <el-col :span="3">444444444444</el-col>
        </el-row>
      </transition-group>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formItem: [],
      sys4data_003: [], //保存模板后的模板
      page: {
        searchmodelloading: false,
        searchmodel: '',
      }
    }
  },
  methods: {
    async initPage() {

    },
    //保存模板
    onSearchSave() {

    },
    //选择内容
    onModelChange() {

    },
    //获取传过来的数据
    addItem(row) {
      this.formItem.push(row)
    }
  }
}
</script>
<style lang="less" scoped>
.search {
  display: flex;
  flex-direction: column;
  .flexRow {
    display: flex;
  }
}
.main {
  flex: 1;
  padding-bottom: 10px;
  overflow: auto;
}
.foot {
  text-align: right;
}
.input-with-select {
  /deep/ .el-input-group__prepend {
    background-color: #fff;
  }
}
</style>