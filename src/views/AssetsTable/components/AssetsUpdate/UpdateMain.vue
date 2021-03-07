<template>
  <div class="update vH flex-column">
    <el-row>
    
      <ys-form class v-loading="page.loading" ref="form" :colnub="2" :model="form" size="medium" :rules="rules">
        <!-- prop的作用是父组件向子组件单向传递数据 -->
        <el-form-item v-for="(col, index) in page.cols" :key="index" :label="col.sysName" :prop="col.SYS_ASSET_A1_160">
          <el-input v-if="!col.sysSelect && col.sysType != 'Date'" v-nulltext v-model="form[col.SYS_ASSET_A1_160]" clearable v-debounce @input="onInput"></el-input>
          <!-- 日期 -->
          <el-date-picker v-if="!col.sysSelect &&  col.sysType == 'Date' " v-model="form[col.SYS_ASSET_A1_160]" align="right" type="date" v-nulltext class="vWimp">
          </el-date-picker>
          <!-- 下拉选择框 -->
          <AssetYsSelect v-else-if="col.sysSelect" @onChange="(...ags) => {onInput(...ags, col.SYS_ASSET_A1_160);}" v-model="form[col.SYS_ASSET_A1_160]" :multiple="true" clearable :sysAssetAItem="col"></AssetYsSelect>
        </el-form-item>
      </ys-form>
    </el-row>
    <el-row style="min-height:300px" class="main">
      <el-table ref="table" v-loading="page.loading" border :data="tableConData" row-key="ASSET_A1_AUTOID" class="poA" height="100%" highlight-current-row>
        <el-table-column type="index" width="40"></el-table-column>
        <el-table-column prop="ASSET_A1_30" label="资产编号" width="130"></el-table-column>
        <el-table-column v-for="col in page.cols" :key="col.prop" :prop="col.prop" :label="col.label">
          <template slot-scope="scope">
            <span v-if="page.showval">
              {{ scope.row.strASSET_A1_100}}
              <el-divider direction="vertical"></el-divider>
            </span>
             <!-- el-divider分割线 -->
           
            {{ form[col.prop] }}
            {{ form[col.prop] }}
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="foot tree_top_border">
      <el-switch v-model="page.showval" active-text="显示原值" style="margin-right:10px"></el-switch>
      <el-button size="small" icon="el-icon-close" @click="onClose">关闭</el-button>
      <el-button v-loading="page.loading" type="primary" size="small" icon="el-icon-check" @click="onSave">保存</el-button>
    </el-row>
  </div>
</template>

<script>
import AssetYsSelect from "../AssetYsSelect.vue";
export default {
  name: '',
  props: {
    //选择的数据
    tableData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    AssetYsSelect
  },
  data() {
    return {
      form: {},
      rules: {}, //验证
      copyform: {},
      formrow: [],
      //页面控制
      page: {
        loading: false,
        cols: [], //{prop,label}
        showval: true
      },
    }
  },
  inject: ["thisdialog"],
  methods: {
    //增加数据
    addItem(sysa1item) {
      //新增列表
      this.page.cols.push({
        prop: sysa1item.SYS_ASSET_A1_60 ? sysa1item.SYS_ASSET_A1_60 : "",
        label: sysa1item.sysName, //名字
        ...sysa1item
      });
      this.page.loading = false;
    },
    //全部删除
    clearItem() {
      this.page.cols = [];
    },
    //删除数据
    removeItem(sysa1item) {
      let index = this.page.cols.findIndex(item => { return item.sysID == sysa1item.sysID; });
      this.page.cols.splice(index, 1);
    },
    //值改变
    onInput(val, text, prop) {
      if (text) {
        console.log(text)
        debugger
        //深层无法绘制
        let copyform = { ...this.form };
        copyform["str" + prop] = text;
        // this.form = { ...copyform };
        // this.form["str" + prop] = text;
      }
    },
    onSave() { },
    onClose() {
      this.thisdialog.close();
    },
  },
  mounted() {
    // this.initPage()
  },
  watch: {

  },
  computed: {
    tableConData() {
      let _data = [];
      _data = this.tableData;
      return _data;
    },

  },
  filters: {

  }
}
</script>

<style scoped lang='less'>
.flex-column {
  display: flex;
  flex-direction: column;
}
</style>