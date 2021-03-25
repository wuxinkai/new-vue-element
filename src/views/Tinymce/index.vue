<template>
  <el-row>
    <el-col :span="14">
      <el-tree :data="newdata3" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </el-col>
  </el-row>
</template>

<script>
import { copyTransFunc } from './objectFn'
export default {
  components: {

  },
  data() {
    return {
      newdata3: [],
      //原始数据
      arr: [
        {
          id: 275,
          name: "测试公司", //改成text
          userList: [ // 改成 children
            {
              id: 697,
              userName: "11111" //text
            }
          ]
        }, {
          id: 327,
          name: "有限公司",
          userList: [
            {
              id: 743,
              userName: "张三"
            }, {
              id: 744,
              userName: "李四"
            }
          ]
        }
      ],
      // 动态修改name为text，userName也修改为text，userList为children
      // 可以根据配置去改变参数
      trans: [{ key: "name", value: "text" }, { key: "userName", value: "text" }, { key: "userList", value: "chilren" }]
    }
  },
  mounted() {
    let newdata = copyTransFunc(this.arr, this.trans)
    console.log(newdata)


    let copyAry = Array.from(this.arr);
    let newdata1 = JSON.parse(JSON.stringify(copyAry).replace(/name/g, `label`));
    let newdata2 = JSON.parse(JSON.stringify(newdata1).replace(/userName/g, `label`));
    let newdata3 = JSON.parse(JSON.stringify(newdata2).replace(/userList/g, `children`));
    console.log(newdata3)
    this.newdata3 = newdata3
  }
}
</script>

<style lang="less" scoped>
</style>