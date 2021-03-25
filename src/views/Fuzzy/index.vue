<template>
  <div>
    <el-row span="20">
      <el-col :span="10">
        <el-input v-model="input" placeholder="请输入内容" @keyup.enter.native="rebuildData(input,arr)">
          <el-button slot="append" icon="el-icon-search" @click="rebuildData(input,arr)"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">2 </el-col>
    </el-row>
    <el-row span="20">
      <el-col :span="5">
        <el-tree :data="arr"></el-tree>
      </el-col>
      <el-col :span="5">
        <el-tree :data="arr2"></el-tree>
      </el-col>
      <el-col :span="12">2 </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
  },
  components: {

  },
  data() {
    return {
      input: '',
      arr2: [],
      arr: [
        {
          label: '你好吗？',
          children: [
            {
              label: '很好啊',
              children: null
            },
            {
              label: '是吗',
              children: null
            }
          ]
        },
        {
          label: '卡卡卡',
          children: [
            {
              label: '非常好芬',
              children: null
            }
          ]
        },
        {
          label: '第三方的',
          children: null
        }
      ]
    }
  },
  methods: {
    // rebuildData(value, arr) {
    //   let newarr = [];
    //   this.arr2 = []
    //   debugger
    //   arr.forEach(element => {
    //     if (element.children && element.children.length > 0) { //判断是否有子元素
    //       const ab = this.rebuildData(value, element.children)
    //       const obj = { ...element, children: ab }
    //       if (ab && ab.length) { //存储
    //         newarr.push(obj)
    //       }
    //     } else {
    //       if (element.label.indexOf(value) > -1) {
    //         newarr.push(element)
    //       }
    //     }
    //   });
    //   console.log(newarr)
    //   this.arr2 = newarr
    //   return newarr
    // },

    rebuildData(value, arr) {
      let newarr = []
      arr.forEach(element => {
        if (element.label.indexOf(value) > -1) { //第一层包含
          newarr.push(element)
        } else { //第一层不包含
          if (element.children && element.children.length > 0) {
            const ab = this.rebuildData(value, element.children)
            const obj = { ...element, children: ab }
            //判读 子元素，有没有孩子
            if (ab && ab.length > 0) {
              newarr.push(obj)
            }
          }
        }
      });
      this.arr2 = newarr
      return newarr
    }
  },
  mounted() {

  },
  watch: {

  },
  computed: {

  },
  filters: {

  }
}
</script>

<style scoped lang='less'>
</style>