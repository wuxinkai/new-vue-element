<!--<template>
  <el-form label-width="100px" label-position="left">
    <el-row v-for="(row, index) in formrow" :key="index" :gutter="20">
      <el-col v-for="(col, i) in row" :key="col.AUTOID" :span="12">
        <slot></slot>
       插槽 
      </el-col>
    </el-row>
  </el-form>
</template>-->
<script>
export default {
  name: "meiform",
  data() {
    return {

      elform: {}
    };
  },
  //外部属性
  props: {
    //列数 接收参数 
    colnub: {
      type: Number,
      default() {
        return 2;
      }
    },
  },
  //生成dom表单
  render(h) {
    //计算的行 和 列 [[form-item],[form-item]] newrow[0][0]
    let newrow = [] //  newrow == 上面的this.formrow
    let span = 12; //一列分为多少份 element 是24格
    if (this.$slots.default) {
      const len = this.$slots.default.length, //插槽的长度
        //一行的长度   
        count = this.colnub, lineNum = len % count === 0 ? len / count : Math.floor(len / count + 1); //算出有行数 ，如果不够后面加1
      //能整除就 24直接除以变量， 如果整除不了就减一再除
      span = 24 % count === 0 ? 24 / count : Math.floor(24 / count - 1); //行数
      //循环
      for (let i = 0; i < lineNum; i++) {
        const temp = this.$slots.default.slice(i * count, i * count + count);
        newrow.push(temp);
      }
    }

    //（1）第一层form  拼接上面的dom <el-form label-width="100px" label-position="left">
    const html = h("el-form", {
      // attrs 是普通html的属性
      
      props: { //组件属性 
        //注意驼峰写法
        labelWidth: "100px",
        labelPosition: "left",
        //属性
        ...this.$attrs //属性继承
      },
      on: { ...this.$listeners }, //事件
      ref: "elform"
    },
    //（2）第二层   <el-row v-for="(row, index) in formrow" :key="index" :gutter="20">
    //子组件 是个数组 map函数返回的就是一个数组
      newrow.map((row, index) => {
        //行
        return h("el-row", {
          props: {
            gutter: 20 //间隔20px
          },
          key: index //防止重复的dom 不渲染
        },
        // （3）第三层  <el-col v-for="(col, i) in row" :key="col.AUTOID" :span="12">
          row.map((col, i) =>
            //列
            h("el-col", {
              props: { span: span },
              key: i
            },
            // 第四层 插槽
              [col] //插槽
            )
          )
        );
      })
    );
    //返回elform
    this.$nextTick(() => {
      this.elform = this.$refs.elform;
    });

    return html
  },
  //初始化 异步加async await
  methods: {
    initPage() { }
  },
  //初始化 异步加async await
  mounted() {
    this.initPage();
  },
}
</script>