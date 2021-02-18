### 模态框 底部固定中间 出现滚动条
(0)最外层
(1)头部固定
(2)center 和底部设置 60vh

```
<template>
  <div style="height:60vh" class="vH  flex-column">
    <el-row style="min-height:300px;padding:10px" class="asset-main">
      <p>内容部分</p>
    </el-row>
    <el-row v-if="!readonly" ref="footer" class="foot  formfooter">
      <el-button type="primary" @click="onSave(1)">保存</el-button>
      <el-button @click="onClose">  关闭 </el-button>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
.defhetght {
  height: 60vh;
}
.asset-main {
  flex: 1; //这是子元素，让子元素的高度等于父元素的高度：
  position: relative;
  margin-bottom: 10px;
  overflow: auto;
}
.flex-column {
  display: flex;
  flex-direction: column; //灵活的项目将垂直显示，正如一个列一样。
}

.formfooter {
  padding: 10px 20px 20px;
  text-align: center;
  bottom: 0;
  height: auto;
  width:100%;
}
</style>
```
