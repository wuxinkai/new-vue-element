<template>
  <div style="height:60vh" class="vH  flex-column">
    <el-row style="min-height:300px;padding:10px" class="asset-main">
      <el-form class="defhetght alltransition" v-loading="page.loading" ref="form" :rules="rules" :model="form" label-width="130px" label-position="left" :disabled="readonly">
        <el-collapse v-model="page.activeNames">
          <el-collapse-item v-for="group in page.sysasseta1.group" :key="group" :name="group">
            <template slot="title">
              <span style="font-size:19px;font-weight:bold">{{ group }}</span>
            </template>
            <transition-group enter-active-class="animated fadeInDown">
              <template v-for="formItem in page.sysasseta1.FormList">
                <el-form-item v-if="formItem.SYS_ASSET_A1_140 == group" :key="formItem.AUTOID" :prop="formItem.SYS_ASSET_A1_160" :label="readonly  ? formItem.SYS_ASSET_A1_50 + ':' : formItem.SYS_ASSET_A1_50 ">
                  <template v-if="readonly || formItem.readonly">
                    <!-- 查看详情 -->
                    <template v-if="formItem.SYS_ASSET_A1_60">
                      <span> {{ form[formItem.SYS_ASSET_A1_160] }}</span> <span class="float_right">处理select下拉菜单</span>
                    </template>
                    <template v-else>
                      <p><span> {{ form[formItem.SYS_ASSET_A1_160] }}</span> <span class="float_right"> 处理input</span></p>
                    </template>
                  </template>
                  <!-- 编辑 -->
                  <template v-else>

                    <!-- 处理文本框 -->
                    <el-input v-if="formItem.SYS_ASSET_A1_170 == 'Text' " v-model="form[formItem.SYS_ASSET_A1_160]"></el-input>
                    <!-- 处理日期 -->
                    <el-date-picker v-if="formItem.SYS_ASSET_A1_170 == 'Date'" v-model="form[formItem.SYS_ASSET_A1_160]" align="right" type="date" class="vWimp" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <!-- 处理下拉选择 v-else-if -->
                    <asset-ys-select v-if="formItem.SYS_ASSET_A1_170 == 'Select'" v-model="form[formItem.SYS_ASSET_A1_160]" :ref="`ddl${formItem.SYS_ASSET_A1_160}`" :sysAssetAItem="formItem"></asset-ys-select>
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
import requiredfields from "./json/rules";  // 验证表单的字段
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
  inject: ["thisdialog"],
  //外部属性
  props: {
    formdata: { //赋值给
      type: Object,
      default() {
        return {};
      }
    },
    //是否只读 是查看详情传过来的
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
      /*
 this.form = {
        ASSET_A1_10: 2
      ASSET_A1_20: "纸"
      ASSET_A1_30: "00001"
      ASSET_A1_50: 703
      ASSET_A1_60: "临时仓"
      ASSET_A1_100: 76
      ASSET_A1_120: 644
      ASSET_A1_150: "京东"
      ASSET_A1_160: "戴尔"
      ASSET_A1_180: 4
      ASSET_A1_210: "徐工"
      ASSET_A1_220: 7
      ASSET_A1_280: 4046
      ASSET_A1_350: "线上测试"
      ASSET_A1_360: "华为"
      ASSET_A1_370: 8
      ASSET_A1_390: 4
      ASSET_A1_400: "1981-10-27"
      ASSET_A1_AUTOID: 119
      ASSET_A1_SELECT: 14
      id: 1
      strASSET_A1_60: "财务部仓库"
      strASSET_A1_100: "销售部仓库"
      strASSET_A1_160: "华为"
      strASSET_A1_180: "小米"
      strASSET_A1_220: "销售部"
      strASSET_A1_280: ""
      wu1: "销售部仓库"
      wu2: "华为"
      wu3: "小米"
    }
      */
      this.page.activeNames = ["基础数据", "出厂信息", "在用信息"]
      this.page.loading = true


      this.page.sysasseta1 = {
        FormList: FormList,
        group: ["基础数据", "出厂信息", "在用信息"],
      }
      //表单验证  c传入的是所有的列
      this.rules = this.getRules(this.page.sysasseta1.FormList);


      this.$nextTick(() => {
        this.page.loading = false;
        // this.$refs.form.$el.List.remove("defhetght");
      });
    },
    //动态创建验证规则 (字段集合)
    getRules(sysasseta1) {
      let _rules = {}
      // { required: true, message: '请输入活动名称', trigger: 'blur' },
      let trigger = "blur"; //触发方式 离开
      let required = true; //必填

      requiredfields.forEach(item => {  //全局注册主键  src\utils\extend.js
        const a1 = sysasseta1.search({
          SYS_ASSET_A1_160: item
        })
        if (a1 && a1.length != 0) {
          // 对象嵌套数组
          Object.assign(_rules, {
            //数组
            [item]: [
              {
                required,
                trigger,
                message: `请输入${a1[0].SYS_ASSET_A1_50}`  //SYS_ASSET_A1_50 是标题
              }
            ]
          });
        }

      });
      console.log(_rules)
      return _rules
    },
    //type 1 保存  2 保存并关闭
    async onSave(type) {
      // console.log(this.form) //  只能获取到 ASSET_A1_100 的数字改变不能获取到，页面值得变化
      this.$refs.form.validate(async valid => {
        if (valid) {
          //Promise.all() //一个失败就都返回了
          //Promise.race()，//只要有一个成功就都返回了
          // Promise.allSettled() //无论是成功还是失败都会执行 所有内容都执行完成后，再往下执行

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
    console.log(this.form)
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
.float_right {
  float: right;
}

.formfooter {
  padding: 10px 20px 20px;
  text-align: center;
  bottom: 0;
  height: auto;
  width: 100%;
}
</style>
