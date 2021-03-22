<template>
  <div>
    <p style="color:blue">儿子接收:{{demo}}</p>
    <br>
    <grandChild2></grandChild2>
  </div>
</template>

<script>
import grandChild2 from './grandChild2';
export default {
  //（4） 儿子接收 ********
  inject: {
    for: {
      default: () => ({})
    }
  },
  components: {
    grandChild2
  },
  data() {
    return {
      demo: this.for
    };
  },

}
</script>

<style scoped lang='less'>
</style>