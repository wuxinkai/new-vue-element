<template>
  <div class="assets vH">
    <assets-head @getHeadData='getHeadData' ref="child" :page='page'></assets-head>
    <assets-content :tableAssetsData="handleTableAssetsData" :listLoading="listLoading" @contentFlush='contentFlush'></assets-content>
    <div class="block"></div>
    <!-- <el-container>
      <el-aside width="200px" class="">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container> -->
  </div>
</template>
<script>
import AssetsHead from './components/AssetsHead'
import AssetsContent from './components/AssetsContent'

export default {
  components: {
    AssetsHead,
    AssetsContent,
  },

  data() {
    return {
      tableAssetsData: [],
      tableAssetstotal: 0,
      page: 1,
      listLoading: true,
    }
  },

  methods: {
    //获取数据
    getHeadData(data, listLoading = false) {
      let result = data.result
      this.tableAssetsData = result.assets
      this.tableAssetstotal = result.total
      this.listLoading = false
      // debugger
    },
    contentFlush() {

    }
  },
  computed: {
    //--------------------------11111111111111111------------------------
    //es6给对象新增属性的方法
    handleTableAssetsData() {
      let _tableAssetsAry = []
      this.tableAssetsData.forEach(item => {
        Object.assign(item, {
          wu1: item.strASSET_A1_100,
          wu2: item.strASSET_A1_160,
          wu3: item.strASSET_A1_180,
        })
        _tableAssetsAry.push(item)
      })
      return _tableAssetsAry
    }
  }
}
</script>
<style lang="less" scoped>
// .assets {
//   width: 100%;
//   margin: 10px 0;
//   // border: 2px solid blue;
//   // height: 95%;
//   display: flex;
//   flex-flow: column nowrap;
//   align-items: center;
//   justify-content: center;
// }

// .block {
//   flex: 0 0 100px;
// }

.vH {
  height: 100%;
}
.padding_10 {
  padding: 10px !important;
}
</style>