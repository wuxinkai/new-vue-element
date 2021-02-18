<template>
  <div style="height:60vh" class="vH  flex-column">
    <el-row style="min-height:300px;padding:10px" class="asset-main">
      <el-form class="defhetght alltransition" v-loading="page.loading" ref="form" :rules="rules" :model="form" label-width="110px" label-position="left" :disabled="readonly">
        <el-collapse v-model="page.activeNames">
          <el-collapse-item v-for="group in page.sysasseta1.group" :key="group" :name="group">
            <template slot="title">
              <span style="font-size:19px;font-weight:bold">{{ group }}</span>
            </template>
            <transition-group enter-active-class="animated fadeInDown">
              <template v-for="field in page.sysasseta1.fields">
                <el-form-item v-if="field.SYS_ASSET_A1_140 == group" :key="field.AUTOID" :prop="field.SYS_ASSET_A1_160" :label="readonly  ? field.SYS_ASSET_A1_50 + ':' : field.SYS_ASSET_A1_50 ">
                  <template v-if="readonly || field.readonly">
                    <!-- 查看详情 -->
                    <template v-if="field.SYS_ASSET_A1_60">
                      11
                      {{ form[`str${field.SYS_ASSET_A1_160}`] }}
                    </template>
                    <template v-else>
                      22
                      {{ form[field.SYS_ASSET_A1_160] }}
                    </template>
                  </template>
                  <!-- 编辑 -->
                  <template v-else>

                    <!-- 处理文本框 -->
                    <el-input v-if="field.SYS_ASSET_A1_170 == 'Text' " v-model="form[field.SYS_ASSET_A1_160]"></el-input>
                    <!-- 处理日期 -->
                    <el-date-picker v-if="field.SYS_ASSET_A1_170 == 'Date'" v-model="form[field.SYS_ASSET_A1_160]" align="right" type="date" class="vWimp" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <!-- 处理下拉选择 v-else-if -->
                    <asset-ys-select v-if="field.SYS_ASSET_A1_170 == 'Select'" v-model="form[field.SYS_ASSET_A1_160]" :ref="`ddl${field.SYS_ASSET_A1_160}`" :sysAssetAItem="field"></asset-ys-select>
                  </template>
                </el-form-item>
              </template>
            </transition-group>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </el-row>
    <el-row v-if="!readonly" ref="footer" class="foot  formfooter">
      <el-button type="primary" @click="onSave(1)">保存</el-button>
      <el-button type="primary" @click="onSave(2)">
        保存并关闭
      </el-button>
      <el-button @click="onClose">
        关闭
      </el-button>
    </el-row>
  </div>
</template>
<script>
import AssetYsSelect from "./AssetYsSelect.vue";
import FormList from "./json/form";  //form数据
export default {
  components: {
    AssetYsSelect
  },
  data() {
    return {
      //页面控制
      page: {
        loading: false,
        activeNames: ["1"],
        sysasseta1: []
      },
      //数据
      data: {},
      //表单数据
      form: { ...this.formdata },
      rules: {},
      // thisDialog: {}
    };
  },
  //依赖注入
  inject: ["AssetA1", "thisdialog"],
  //外部属性
  props: {
    formdata: { //赋值给
      type: Object,
      default() {
        return {};
      }
    },
    //是否只读
    readonly: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  //内部方法
  methods: {
    async initPage() {
      this.page.activeNames = ["基础数据", "出厂信息", "在用信息"]
      this.page.loading = true
      this.page.sysasseta1 = {
        fields: FormList,
        group: ["基础数据", "出厂信息", "在用信息"],
      }

      this.rules = this.getRules(this.page.sysasseta1.fields);
      console.log(this.page.sysasseta1.fields)
      this.$nextTick(() => {
        this.page.loading = false;
        // this.$refs.form.$el.List.remove("defhetght");
      });
    },
    //动态创建验证规则 (字段集合)
    getRules(sysasseta1) {

    },
    //type 1 保存  2 保存并关闭
    async onSave(type) {
      // console.log(this.form) //  只能获取到 ASSET_A1_100 的数字改变不能获取到，页面值得变化
      this.$refs.form.validate(async valid => {
        if (valid) {
          // const res = await AssetA1.Save(this.form);
          // res.strMS && this.$message(res.strMS); //提示
          // this.form.ASSET_A1_AUTOID = parseInt(res.strMsId); //赋值
          // this.AssetA1.getData(); //刷新
          // res.MsRbool && type == 2 && this.thisdialog.close(); //关闭
        } else {
          this.$message.error("请重新填写"); //提示
        }
      });
    },
    onClose() {
      this.thisdialog.close();
    }
  },

  //初始化 异步加async await
  mounted() {
    this.initPage();
  },
  //计算属性
  computed: {},
  //监视
  watch: {
    async formdata(val) {
      this.form = val;
    },
  }
};
</script>

<style lang="less" scoped>
.defhetght {
  height: 60vh;
}
.asset-main {
  flex: 1;
  position: relative;
  margin-bottom: 10px;
  overflow: auto;
}
.flex-column {
  display: flex;
  flex-direction: column;
}

.formfooter {
  padding: 10px 20px 20px;
  text-align: center;
  bottom: 0;
  height: auto;
  width: 100%;
}
</style>
