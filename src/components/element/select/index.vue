<template>
    <!-- 下拉选择框 -->
    <el-select v-if="!pIdKey" :disabled="loading" v-nulltext v-model="page.inputVal" :style="`width:${width}`" v-bind="$attrs" v-on="$listeners" @change="onChange">
      <template v-for="item in selectList">
        <el-option :key="item[idKey]" :value="item[idKey]" :label="item[nameKey]" :disabled="item[disabledKey]"></el-option>
      </template>
    </el-select>
    <!-- 下拉选择树 -->
    <el-cascader v-else-if="cascader" :disabled="loading" v-nulltext :props="{ ...$attrs }" :options="options" v-model="page.inputVal" :style="`width:${width}`" v-bind="$attrs" v-on="$listeners" @change="onChange"></el-cascader>
</template>
<script>
import { isArray, isArrayEmpty } from "@/util/validate";  //isArray是否是数组   isArrayEmpty是否是空数组
export default {
  name: "ysSelect",
  data() {
    return {
      page: {
        inputVal: this.inputVal
      }
    };
  },
  props: {
    // 下拉列表数据
    selectList: {
      type: Array,
      default: () => []
    },
    //加载过程 
    loading: {
      type: Boolean,
      default: () => false
    },
    //显示在input中的数据
    inputVal: [String, Array, Number],
    //input宽度
    width: {
      type: String,
      default: "100%"
    },
    //是否禁用字段
    disabledKey: {
      type: String,
      default: ""
    },
    // 值字段名
    idKey: {
      type: String,
      default: "value"
    },
    //  lable 显示的，显示在下拉页面上的内容
    nameKey: {
      type: String,
      default: "text"
    },
    //-------------------select-tree------------------------
    //树上级ID字段
    pIdKey: "",
    //是否是tree
    cascader: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  model: {
    prop: "inputVal",
    event: "change"
  },
  methods: {
    //选择事件
    onChange(val) {
      const text = this.getSeleteText();
    },
    //从新执行方法 获取文本内容
    getSeleteText() {
      console.log(this.page.inputVal)
      if (!this.page.inputVal) return;
      if (isArray(this.page.inputVal)) {
        let key = this.selectList.filter(item => {
          return this.page.inputVal.includes(item[this.idKey]); //主键是否存在如果存在，就从this.page.inputVal中把name返回给前端
        });
        return key.map(item => {
          return item[this.nameKey];
        });
      } else {
        let key = this.selectList.find(item => {
          return item[this.idKey] == this.page.inputVal;
        });
        console.log(key[this.nameKey])
        return key[this.nameKey];
      }
    }
  },
  computed: {
    //计算属性
    options() {
      let _options = [];
      if (this.selectList.length == 0) {
        return [];
      }
      //this 可以获取到 所有属性
      let { selectList, idKey, pIdKey, nameKey, disabledKey } = this;
      console.log(selectList, idKey, pIdKey, nameKey, disabledKey)
      _options = JSON.parse(JSON.stringify(selectList));
      //从新设置属性
      _options.forEach(item => {
        Object.assign(item, {
          value: item[idKey], //树的 两个值
          label: item[nameKey], // 两个值
          disabled: !!item[disabledKey]
        });
      });
      //进行分类
      console.log(idKey, pIdKey)
      _options = _options.getChildren(idKey, pIdKey);
      return _options
    }
  },
   //监视
  watch: {
    inputVal: {
      handler(val) {
        this.$nextTick(() => {
          this.page.inputVal = val; // ASSET_A1_100: 3 
        });
      },
      immediate: true
    }
  }
}
</script>