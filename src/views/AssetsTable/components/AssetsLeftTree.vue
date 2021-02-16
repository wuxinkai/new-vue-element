<template>
 <div>
   <tree ref="a2tree" :showsearch="false" :data="data.TreeData" idKey="ASSET_A2_AUTOID" pi ></tree>
 </div>
</template>

<script>
 export default {
   name: '',
   props: {
   },
   components: {

   },
   data () {
     return {
      //页面控制
       page:{},
       //数据
       data:{}
     }
   },
   methods: {

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