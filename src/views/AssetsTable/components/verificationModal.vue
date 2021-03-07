<template>
  <div>

    <!-- 弹窗 -->
    <ys-dialog ref="AssetEditDialog" width="70%" :nopadding="true" title="导入设备台账">
      <el-row style="text-align:right">
        <el-button icon="el-icon-download" type="success" @click="downExcel">
          下载导入模板
        </el-button>
        <el-button icon="el-icon-upload" type="primary" @click="upExcel">
          开始导入
        </el-button>
      </el-row>
      <!-- 表格 -->
      <el-row style="min-height:300px;margin:16px 0;" class="el-main_padding1">
        <el-table ref="table" v-loading="page.loading" border :data="listData" class="poA" stripe height="100%">
          <el-table-column type="index" width="50" label="序号"></el-table-column>
          <el-table-column prop="errormsg" width="250" label="验证信息">
            <template slot-scope="scope">
              <!-- 加载中 -->
              <el-tag type="warning" v-if="!scope.row.errormsg">
                <i class="el-icon-loading"></i>
              </el-tag>
              <!-- 加载成功 -->
              <el-tag v-else-if="scope.row.errormsg == '1'" type="success">
                <i class="el-icon-check"></i>
              </el-tag>
              <!-- 显示详细错误 -->
              <template v-else-if="page.showerror">
                <el-tag v-for="(item, index) in scope.row.errorRow" :key="index" type="warning">{{ item }}</el-tag>
              </template>
              <!-- 收起显示详细错误 -->
              <template v-else-if="!page.showerror">
                <el-progress style="width:120px;display:inline-block" :percentage="Math.floor((1 - scope.row.errorRow.length / column.length) * 100)" color="#67c23a">
                </el-progress>
                <el-popover placement="right" width="400" trigger="hover">
                  <el-tag v-for="(item, index) in scope.row.errorRow" :key="index" type="warning">{{ item }}
                  </el-tag>
                  <el-tag type="warning" slot="reference">
                    {{ scope.row.errorRow.length }}个错误
                  </el-tag>
                </el-popover>
              </template>
            </template>
          </el-table-column>

          <template v-for="item in column">
            <el-table-column :key="item.prop" :prop="item.prop" :label="item.label">
              <!-- 设置表头 -->
              <template slot="header" slot-scope="scope">
                {{ scope.column.label }}
                <!-- {{scope}} -->
                <!-- 如果有错误信息列里面包含，显示感叹号 -->
                <template v-if="page.errorCol.includes(item.label)">

                  <!-- <template> -->
                  <i style="color:red" class="el-icon-warning-outline" slot="reference"></i>
                </template>
              </template>
              <template slot-scope="scope">
                {{ scope.row[item.prop] }}

                <!-- 如果有错误 显示 感叹号 -->
                <template v-if="scope.row.errormsg && scope.row.errorCol.includes(item.label)">
                  <el-popover placement="right" width="400" trigger="hover">
                    <el-tag v-for="(item, index) in scope.row.errorRow" :key="index" type="warning">{{ item }}
                    </el-tag>
                    <i style="color:red" class="el-icon-warning" slot="reference"></i>
                  </el-popover>
                </template>
              </template>
            </el-table-column>
          </template>
          <el-table-column label="操作" width="260px" fixed="right">
            <template slot-scope="scope">
              <el-button size="small" icon="el-icon-view" @click="handleCancel">查看</el-button>
              <el-button size="small" icon="el-icon-delete" @click="handleCancel">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!-- 按钮 -->
      <el-row style="display: flex; align-items: center;">
        <el-switch v-model="page.showerror" active-text="显示错误信息"></el-switch>
        <div style="margin-left:auto">
          <el-button icon="el-icon-download" @click="validationFormat">验证</el-button>
          <el-button icon="el-icon-download" @click="downExcel">取消</el-button>
          <el-button icon="el-icon-download" @click="downExcel">确定</el-button>
        </div>
      </el-row>
    </ys-dialog>
    <!-- 导入Excel -->
    <ys-update-excel ref="updateExcel" @readExcel="onReadExcel"></ys-update-excel>
  </div>
</template>
<script>
export default {
  name: 'verificationModal',
  props: {
    accountData: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  data() {
    return {
      page: {
        showerror: false,
        loading: false,
        Copyloading: false,
        errorCol: [],//错误头部
        errorRow: [],//错误body
      },

      listData: [],
      newExcelListData: [],
      column: [
        {
          prop: 'name1',
          label: '版本号',
          align: 'center'
        },
        {
          prop: 'name2',
          label: '状态',
          align: 'center'
        },
        {
          prop: 'name3',
          label: '标准名称',
          align: 'center'
        },
        {
          prop: 'name4',
          label: '点检类型',
          align: 'center'
        },
        {
          prop: 'name5',
          label: '专业类别',
          align: 'center'
        }, {
          prop: 'name6',
          label: '机型',
          align: 'center'
        }
      ]
    }
  },
  methods: {
    //
    handleCancel() { },
    //下载模板
    downExcel() {
      let data = this.column.map(v => v.label)
      this.$refs.updateExcel.downLoad(data, 'moban');
    },
    //打开选择数据
    upExcel() {
      this.$refs.updateExcel.select();
    },

    //获取导入数据
    async onReadExcel(excelBody, excelHeader) {
      this.excelCol = excelHeader;  //Excel表头
      this.excelData = excelBody; // Eccel数据
      //空数据Excel不显示 通过表头给默认空值
      this.excelData.map((it, idx) => {
        this.excelCol.forEach(item => {
          if (Object.keys(it).indexOf(item) == -1) {
            it[item] = ''
          }
        })
      })
      this.newExcelListData = await this.setAttrExcel(excelBody) //编译后的新数据
      // 添加字段 errormsg 
      this.listData = [...this.listData, ...this.newExcelListData]
      this.listData = this.listData.map(v => { return { ...v, errormsg: '', errorCol: [], errorRow: [] } })
    },
    //编译后的新数据
    setAttrExcel(excelBody) {
      let curAry = []
      excelBody.map((excelItem, idx) => {
        let curRow = {}
        this.column.map((tableItem, index) => {
          Object.keys(excelItem).map((attrName, i) => {
            if (tableItem.label == attrName) {
              //判断类型转换数据格式
              if (this.isType(excelItem[attrName])) {
                var d = new Date(excelItem[attrName]);
                let youWant = this.timeFormate(d)
                excelItem[attrName] = youWant
              }
              Object.assign(curRow, {
                [tableItem.prop]: excelItem[attrName],
              });
            }
          })
        })
        if (Object.keys(curRow).length > 0) {
          curRow['errorRow'] = new Array()
          curAry.push(curRow)
        }
      })
      return curAry
    },
    //判断数据类型
    isType(value) {
      var reg = new RegExp("^\\[object " + 'Date' + "\\]$", "i");
      return reg.test(Object.prototype.toString.call(value));
    },
    //验证格式
    validationFormat() {
      let _errorRow = new Set();
      let _errorCol = new Set();
      let newData = this.listData.map((it, idx) => {
        it.errorCol = []
        it.errorRow = []
        // 是空字符
        if (it.name5 == "") {
          const { label } = this.column.find(data => data['prop'] == 'name5');
          it.errorCol.push(label)
          it.errorRow.push(`字段[${label}]不能为空;`)
        }
        //不是日期格式
        debugger
        if (this.verificationDate(it.name2)) {

          debugger
          const { label } = this.column.find(data => data['prop'] == 'name2');
          it.errorCol.push(label)
          it.errorRow.push(`字段[${it.name2}]值不符合要求;`)

        }

        //空的就是全部正确
        if (it.errorRow.length == 0) {
          it.errormsg = 1
        } else {
          it.errormsg = 2
        }
        //存储多个错误
        it.errorCol && it.errorCol.forEach(e => {
          _errorCol.add(e);
        });
      })
      this.page.errorCol = Array.from(_errorCol);
    },
    //验证日期，
    verificationDate(data) {
      if (!this.checkDate(data)) {
        return false
      } else {
        return true
      }
    },
    //验证是否必填
    verificationRequired(data) {
      if (data == "") {
        return false
      } else {
        return true
      }
    },
    //验证字段
    verificationCharacter(data, array) {
      if (array.indexOf(data) == -1) {
        return false
      } else {
        return true
      }
    },
    //获取日期
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
      let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
      let hh = new Date(timeStamp).getHours() < 10 ? "0" + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
      let mm = new Date(timeStamp).getMinutes() < 10 ? "0" + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
      let ss = new Date(timeStamp).getSeconds() < 10 ? "0" + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds();
      return year + "-" + month + "-" + date
    },
    //判断是不是日期
    checkDate(value) {
      var reg = "^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|          (?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$";
      var regExp = new RegExp(reg);
      if (!regExp.test(value)) {
        return false;
      } else {
        return true;
      }
    },
    //删除列表数据
    handleTableDelete(row, index) {
      console.log(row, index)
    },
    //打开弹窗
    openModal() {
      this.$refs.AssetEditDialog.show();
    },

    //确认
    handleOk() {
      this.$emit("storage",)
    },
  }
}
</script>
<style lang="less" scoped>
/deep/.el-dialog__body {
  padding: 20px !important;
}
//定位+最大最小值可以进行设置
.poA {
  position: absolute;
}
</style>