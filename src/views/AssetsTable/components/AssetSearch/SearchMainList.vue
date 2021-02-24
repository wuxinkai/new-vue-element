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
        <el-row type="flex" align="middle" style="padding-top: 10px" v-for="(item, index) in formItem" :key="item.keyname">
          <el-col :span="5">{{item.name}}</el-col>
          <el-col :span="4">
            <el-select v-model="formItem[index].symbol" placeholder="请选择" style="width:100%">
              <template v-for="symboltype in Object.keys(types)">
                <!-- formItem[index].types.includes(symboltype) 判断 types里是否包含 页面内容 -->
                <el-option :key="symboltype" v-if="formItem[index].types.includes(symboltype)" :label="symboltype" :value="types[symboltype]" :name="types[symboltype]"></el-option>
              </template>
            </el-select>
          </el-col>
          <el-col :span="12" style="padding-left:5px">
            <!-- input -->
            <el-input v-model="formItem[index].value" v-nulltext v-if=" !item.sysList.sysSelect && item.sysList.sysType != 'Date'"> </el-input>
            <!-- 日期 -->
            <el-date-picker v-if="!item.sysList.sysSelect &&  item.sysList.sysType == 'Date'
              " v-model="formItem[index].value" align="right" type="date" v-nulltext class="vWimp">
            </el-date-picker>
            <!-- 下拉选择框 -->
            <AssetYsSelect v-else-if="item.sysList.sysSelect" v-model="formItem[index].value" :multiple="true" clearable :sysAssetAItem="item.sysList"></AssetYsSelect>
          </el-col>
          <el-col :span="3" style="padding-left:5px">
            <el-button type="primary" plain icon="el-icon-delete" @click="remove(item.keyname)">
            </el-button>
          </el-col>
        </el-row>
      </transition-group>
    </el-row>
    <el-row class="foot tree_top_border">
      <el-button size="small" icon="el-icon-refresh-left" @click="onClear">
        清空查询
      </el-button>
      <el-button size="small" icon="el-icon-close" @click="onClose">
        关闭
      </el-button>
      <el-button size="small" type="primary" icon="el-icon-search" @click="onSearch">
        查询
      </el-button>
    </el-row>
  </div>
</template>
<script>
import AssetYsSelect from "../AssetYsSelect.vue";
export default {
  data() {
    return {
      types: {
        包含: "like",
        不包含: "not like",
        开始: "likestart",
        结束: "likeend",
        等于: "=",
        不等于: "!=",
        为空: "null",
        不为空: "notnull",
        大于: ">",
        大于等于: ">=",
        小于: "<",
        小于等于: "<=",
        包括: "in",
        不包括: "not in"
      },
      formItem: [],
      sys4data_003: [], //保存模板后的模板
      page: {
        searchmodelloading: false,
        searchmodel: '',
      }
    }
  },
  components: {
    AssetYsSelect
  },
  mounted() {
    console.log(Object.keys(this.types))
  },
  inject: ["thisdialog"],
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
    addItem(row, val = {}) {
      let symbol = val.symbol || ""; //运算符
      let name = "";
      let value = val.value || "";
      let types = ""; //运算类型;
      const keyname = `${row.sysCode}_${row.sysID}`;
      switch (true) {
        case row.sysType == "Int" || row.sysType == "Date":
          types = [
            "等于",
            "不等于",
            "为空",
            "不为空",
            "大于",
            "大于等于",
            "小于",
            "小于等于"
          ];
          break;
        default:
          types = Object.keys(this.types).filter(item => {
            return !["包括", "不包括"].includes(item);
          });
      }

      //如果是关联 下拉 ：in || not in
      if (row.SYS_ASSET_A1_60) {
        types = ["包括", "不包括", "为空", "不为空"];
        value = value ? value.split(",") : [];
      }
      //判断是否添加过
      if (this.formItem.search({ keyname }).length == 0) {
        this.formItem.push({
          symbol: symbol || this.types[types[0]], // 有就选择有，没有就选择第一个
          name: row.sysName, //字段
          keyname, //组件ID
          value, //录入的值
          types, //运算类型
          sysList: row //其他
        });
        // debugger
      }
      return keyname;
    },
    //删除功能
    remove(keyname) {
      if (this.formItem.findIndex(item => item.keyname === keyname) != -1) {
        this.formItem.splice(this.formItem.findIndex(item => item.keyname === keyname), 1);
      }
    },
    //清空
    onClear() {
      // this.AssetA1.setAssetQuery([]);
      this.thisdialog.close();
    },
    //关闭
    onClose() {
      this.thisdialog.close();
    },
    // 查询
    onSearch() {
      const assetquery = this.formItem.map(({ symbol, name, value }) => {
        debugger
        // if (!isArray(value)) {
        //   value = [value.toString()];
        // }
        return { symbol, name, value };
      });
    },
  }
}
</script>
<style lang="less" scoped>
.search {
  display: flex;
  flex-direction: column;
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