<template>
  <div>
    <!-- qqqqq -->
    <!-- <grandChild></grandChild> -->
    <grandChild v-bind="$attrs" v-on="$listeners"></grandChild>
  </div>
</template>

<script>
import grandChild from './grandChild';
export default {
  name: '',
  props: {
  },
  components: {
    grandChild
  },
  data() {
    return {

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