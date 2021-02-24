<template>
  <ys-layout style="height:68vh">
    <ys-layout-left title="资产字段" width="240px">
      <SearchLeftList ref="a1list" @onSelect="onSelect" @onSelectClear="onSelectClear" :showselect="true"></SearchLeftList>
    </ys-layout-left>
    <ys-layout-main title="资产列表" overflow>
      <UpdateMain ref="update" :tableData="updateData"></UpdateMain>
    </ys-layout-main>
  </ys-layout>
</template>
<script>
import SearchLeftList from "../AssetSearch/SearchLeftList";
import UpdateMain from "./UpdateMain";
export default {
  name: '',
  props: {
    //批量修改的数据
    updateData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    SearchLeftList,
    UpdateMain
  },
  data() {
    return {
      //页面控制
      page: {},
      //数据
      data: {}
    }
  },
  methods: {
    // 选中数据
    onSelect(rows, row, selected) {
      const update = this.$refs.update;
      if (selected) {
        update.addItem(row);
      } else {
        update.removeItem(row);
      }
    },
    //清空所有
    onSelectClear() {
      const update = this.$refs.update;
      update.clearItem();
    }
  },

}
</script>