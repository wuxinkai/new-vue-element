<template>
  <el-table ref="table" v-loading="page.loading" border :data="tableData" row-key="sysCode" height="100%" style="position:absolute" highlight-current-row @row-click="OnrowClick" @selection-change="onSelectionChange" @select="onSelect" @select-all="onSelect">
    <!-- 判断是不是多选 -->
    <el-table-column v-if="showselect" type="selection" width="40"></el-table-column>
    <!-- 序号 -->
    <el-table-column type="index" width="40"> </el-table-column>
    <!-- 就一个字段 -->
    <el-table-column prop="sysName" label="字段">
      <!-- 插槽搜索 -->
      <template slot="header" slot-scope="scope">
        <el-input v-model="page.search" size="small" placeholder="输入关键字搜索" clearable />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import service from "@/service/index";
import searchList from "../json/searchList";  // 验证表单的字段
export default {
  name: '',
  props: {
    showselect: {  //查看是单选还是多选
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      //页面控制
      page: {
        loading: true,
        search: ""
      },
      //数据
      tableSingleData: []
    };
  },
  methods: {
    //获取数据
    async initPage() {
      let _this = this
      let params = Object.assign({}, { id: "" }, { page: 1 });
      service.getAssetsList(params).then((res) => {
        _this.page.loading = false
        _this.tableSingleData = searchList;
        // console.log(_this.tableSingleData)
        // debugger
      });
    },
    //单选
    OnrowClick(row) {
      this.$emit("rowClick", row);
    },
    //多选
    onSelectionChange(rows) {
      this.$emit("onSelectionChange", rows);
    },
    //
    onSelect(rows, row) {
      //全选清除
     if (rows.length == 0) {
        this.$emit("onSelectClear");
        return;
      }
      //单选  和删除
      if (row) {
        const selected = rows.includes(row);  //includes() 方法用于判断字符串是否包含指定的子字符串。
        this.$emit("onSelect", rows, row, selected);
      } else {
        //全选
        rows.forEach(item => {
          const selected = true;
          this.$emit("onSelect", rows, item, selected);
        });
      }
    }
  },
  mounted() {
    this.initPage();
  },

  computed: {
    tableData() {
      let _data = [];
      _data = this.tableSingleData;
      if (this.page.search) {
        //利用 原型上的方法  页面中的方法 src\util\extend.js
        _data = _data.search({ sysName: val => val.includes(this.page.search) });
      }
      return _data;
    }
  },

}
</script>

<style scoped lang='less'>
</style>