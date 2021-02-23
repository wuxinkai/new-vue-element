<template>
  <ys-layout style="height:60vh">
    <ys-layout-left title="资产字段" width="240px">
      <SearchLeftList ref="a1list" @rowClick="onRowClick"></SearchLeftList>
    </ys-layout-left>
    <ys-layout-main title="查询条件">
      <SearchMainList ref="searchList"></SearchMainList>
    </ys-layout-main>
  </ys-layout>
</template>

<script>
import SearchLeftList from "./SearchLeftList";
import SearchMainList from "./SearchMainList";
export default {
  name: '',
  props: {
  },
  components: {
    SearchLeftList,
    SearchMainList
  },
  data() {
    return {

    }
  },
  methods: {
    //相当组件通讯  B1 => A => B2
    onRowClick(row) {
       this.$refs.searchList.addItem(row);
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