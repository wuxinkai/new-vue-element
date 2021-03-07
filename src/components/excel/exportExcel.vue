<template>
    <el-dialog
        title="错误数据"
        :visible.sync="onoff">
        <el-table
            :id="exportExcelInfo.excelId"
            :data="exportdatas"
            highlight-current-row
            style="width: 100%">
            <template v-for="(item,index) in exportExcelArry">
                <el-table-column :key="index" v-if="item.prop != 'status' && item.prop != 'isused'" :prop="item.prop" :label="item.label"></el-table-column>
                <el-table-column :key="index" :prop="item.prop" :label="item.label" :width="item.width" v-if="item.prop == 'isused'">
                    <template slot-scope="scope">
                        <el-switch
                            active-color="#287BDD"
                            inactive-color="#ccc"
                            disabled
                            v-model="scope.row.isused">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column :key="index" v-if="item.prop == 'status'" :prop="item.prop" :label="item.label">
                    <template slot-scope="scope">
                        <i :class="scope.row.status == 0 ? 'el-icon-error' : 'el-icon-success'" :style="{color: scope.row.status == 0 ? '#D53F3F' : '#52C41A'}"></i>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <span slot="footer" class="dialog-footer other">
            <el-button @click="onoff = false">取 消</el-button>
            <el-button type="primary" @click="exportfun">导 出</el-button>
        </span>
    </el-dialog>
</template>
<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
    props: {
        exportExcelInfo: {
            type: Object,
            default: {},
        },
        exportExcelArry: {//表头
            type: Array,
            default: [],
        },
        exportdatas: {//数据
            type: Array,
            default: [],
        },
    },
    data() {
        return {
            onoff: false
        }
    },
    watch: {
        exportExcelArry(newval) {
            this.exportExcelArry = newval
        },
        exportExcelArry(newval) {
            this.exportExcelArry = newval
        },
        exportdatas(newval) {
            this.exportdatas = newval
        }
    },
    methods: {
        exportfun () {
            this.exportExcelArry.forEach((item,index)=> {
                if(item.label == '状态') {
                    this.exportExcelArry.splice(index,1)
                }
            })
            this.exportdatas.forEach(item=> {
                item.isused = item.isused == true ? '是' : '否'
            })
            console.log(this.exportdatas);
            // setTimeout(()=> {
            //     var xlsxParam = { raw: true } // 导出的内容只做解析，不进行格式转换
            //     var wb = XLSX.utils.table_to_book(document.querySelector('#'+this.exportExcelInfo.excelId),xlsxParam)
            //     console.log(wb);
            //     var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
            //     try {
            //         FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), this.exportExcelInfo.excelName)
            //     } catch (e) { 
            //         if (typeof console !== 'undefined') console.log(e, wbout) 
            //     }
            //     this.onoff = false
            //     return wbout
            // },600)
        },
    },
};
</script>

<style lang="less" scoped>
i {
    font-size: 30px;
}
/deep/.el-dialog {
    width: 70% !important;
    height: 80%;
    max-height: 80%;
    margin-top: 15vh !important;
    background: #2F3D57;
    border-radius: 6px;
    .el-dialog__body {
        height: 80%;
        padding-bottom: 10px;
        padding-top: 10px;
    }
    .el-button {
        background: #47556D;
        border: none;
        color: #A5B0CB;
        span {
            cursor: pointer;
        }
    }
    .el-button--primary {
        background: #1161FB;
        color: #D9E3F3;
    }
    /deep/.el-dialog__title {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 34px;
        color: #D9E3F3;
    }
}
/deep/.el-table {
    width: max-content;
    height: 100%;
    background: #2F3D57;
    &::before {
        display: none;
    }
    /deep/.el-table__body-wrapper {
        width: 100%;
        height: calc(100% - 46px);
        overflow: hidden;
        overflow-y: scroll;
        &::-webkit-scrollbar-track{
            background: #2F3D57;
        }
        &::-webkit-scrollbar-thumb{
            background: rgba(179, 195, 226, 0.2);
            border-radius:10px;
        }
        &::-webkit-scrollbar-thumb:hover{
            background: rgba(179, 195, 226, 0.2);
        }
        &::-webkit-scrollbar-corner{
            background: #2F3D57;
        }
    }
    .con_bot {
        p {
            display: flex;
            flex-direction: row;
            align-items: center;
            .bot_dot {
                display: block;
                width: 8px;
                height: 8px;
                background: #EA404A;
                border-radius: 50%;
            }
            .bot_num {
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 500;
                line-height: 24px;
                color: #EA404A;
                margin-left: 7px;
            }
        }
    }
    tr {
        background-color: #2F3D57;
        th {
            padding-left: 20px;
            border-bottom: none !important;
        }
    }
    tbody {
        padding: 0 20px;
        tr:hover>td { 
            // background-color: #253650 !important;
            background-color: rgba(0,0,0,0) !important;
        }
        td {
            padding-left: 20px;
            color: #8092B0;
            border-bottom: 1px solid #465269;
        }
        .el-progress-bar__outer {
            background: #384763;
        }
        .el-progress__text {
            font-size: 14px;
            color: #8092B0;
        }
    }
}
/deep/.has-gutter {
    tr {
        th {
            color: #D9E3F3;
            font-size: 14px;
            background: #384763;
        }
    }
}
</style>