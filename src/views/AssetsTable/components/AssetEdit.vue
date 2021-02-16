<template>
  <div style="height:60vh" class="vH  flex-column">
    <el-row style="min-height:300px;padding:10px" class="main">
      <el-form class="defhetght alltransition" v-loading="page.loading" ref="form" :rules="rules" :model="form" label-width="110px" label-position="left" :disabled="readonly">
        <el-collapse v-model="page.activeNames">
          <el-collapse-item v-for="group in page.sysasseta1.group" :key="group" :name="group">
            <template slot="title">
              <span style="font-size:19px;font-weight:bold">{{ group }}</span>
            </template>
            <transition-group enter-active-class="animated fadeInDown">
              <template v-for="field in page.sysasseta1.fields">
                <el-form-item v-if="field.SYS_ASSET_A1_140 == group" :key="field.AUTOID" :prop="field.SYS_ASSET_A1_160" :label="
                    readonly
                      ? field.SYS_ASSET_A1_50 + ':'
                      : field.SYS_ASSET_A1_50
                  ">
                  <template v-if="readonly || field.readonly">
                    <!-- 如果是关联表 -->
                    <template v-if="field.SYS_ASSET_A1_60">
                      {{ form[`str${field.SYS_ASSET_A1_160}`] }}
                    </template>
                    <template v-else>
                      {{ form[field.SYS_ASSET_A1_160] }}
                    </template>
                  </template>
                  <template v-else>
                    <el-input v-if="
                        !field.SYS_ASSET_A1_60 &&
                          field.SYS_ASSET_A1_170 != 'Date'
                      " v-nulltext v-model="form[field.SYS_ASSET_A1_160]"></el-input>
                    <el-date-picker v-if="
                        !field.SYS_ASSET_A1_60 &&
                          field.SYS_ASSET_A1_170 == 'Date'
                      " v-model="form[field.SYS_ASSET_A1_160]" align="right" type="date" v-nulltext class="vWimp" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <!-- <assetA1Ddl v-else-if="field.SYS_ASSET_A1_60" v-model="form[field.SYS_ASSET_A1_160]" :ref="`ddl${field.SYS_ASSET_A1_160}`" :sysAssetA1="field"></assetA1Ddl> -->
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

export default {
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
      thisDialog: {}
    };
  },
  //依赖注入
  // inject: ["AssetA1", "thisdialog"],
  //外部属性
  props: {
    formdata: {
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
       this.page.selectData = item;
      // this.$refs.editDialog.show();
    },
    //动态创建验证规则 (字段集合)
    getRules(sysasseta1) {

    },
    //type 1 保存  2 保存并关闭
    async onSave(type) {

    },
    onClose() {
      this.thisdialog.close();
    }
  },
  //组件
  components: {
    // assetA1Ddl
  },
  //初始化 异步加async await
  mounted() {
    this.initPage();
  },
  //计算属性
  computed: {},
  //监视
  watch: {

  }
};
</script>

<style lang="less" scoped>
.defhetght {
  height: 60vh;
}
.formfooter {
  padding: 10px 20px 20px;
  text-align: center;
  // position: absolute;
  bottom: 0;
  /* float: right; */
  height: auto;
  width: 89%;
}
</style>
