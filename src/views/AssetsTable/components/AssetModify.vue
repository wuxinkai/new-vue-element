<template>
  <div v-loading="page.loading">
    <template v-if="modifyData.length == 0">
      <div style="text-align:center;height:200px">无变更记录</div>
    </template>
    <!-- 时间轴 -->
    <el-timeline>
      <transition-group mode="out-in" appear enter-active-class="animated fadeInLeft">
        <!-- timestamp 显示时间 -->
        <el-timeline-item v-for="(item,index) in modifyData" :key="index" :timestamp="item.timestamp" :color="item.color" placement="top">
          <el-card style="width:480px">
            <h4>变更字段：{{ item.content }}</h4>
            <el-row>
              <el-col :span="12">原始值：{{ item.originalVal }}</el-col>
              <el-col :span="12">变更为：{{ item.originalInput }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                变更方式：{{ item.mode }}
              </el-col>
              <el-col :span="12">
                变更来源：{{ item.name }}
              </el-col>
            </el-row>
          </el-card>
        </el-timeline-item>
      </transition-group>
    </el-timeline>
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
      page: {
        loading: false
      },
      modifyData: [],
      activities: [
        {
          content: "郭艾伦 (人事专员)",
          timestamp: "2018-04-12 20:46",
          mode: "自定",
          name: "网址",
          originalVal: "原始值",
          originalInput: "变更后",
          color: "#4E97FF"
        },
        {
          content: "赵继伟 (人事主管)",

          timestamp: "2018-04-03 20:46",
          mode: "手动",
          name: "网址",
          originalVal: "原始值",
          originalInput: "变更后",
          color: "pink"
        },
        {
          content: "韩德君 (财务主管)",
          mode: "手动",
          name: "网址",
          originalVal: "原始值",
          originalInput: "变更后",
          timestamp: "2018-04-03 20:46"
        },
        {
          content: "贺天举 (董事长)",
          mode: "手动",
          name: "网址",
          originalVal: "原始值",
          originalInput: "变更后",
          timestamp: "2018-04-03 20:46"
        },
        {
          content: "易建联 (董事长)",
          mode: "手动",
          name: "网址",
          originalVal: "原始值",
          originalInput: "变更后",
          timestamp: "2018-04-03 20:46"
        }
      ],
    }
  },
  //外部属性
  props: {
    formdata: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    async initPage() {
      this.page.loading = true;
      this.modifyData = [];
      let data = await this.setTimeEvent()
      this.activities.forEach((item, index) => {
        setTimeout(() => {
          this.modifyData.push(item);
        }, 200 * index);
      });
      this.$nextTick(() => {
        this.page.loading = false;
      });
    },
    //转化方法
    setTimeEvent() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved');
        }, 1000);
      });
    }
  },
  mounted() {
    this.initPage()
  },
  watch: {
    formdata() {
      this.initPage();
    }
  }
}
</script>

<style scoped lang='less'>
// @import "../../../style/base.less";
</style>