<template lang="pug">
Header(:heading='heading')
BasicCharts
</template>

<script>
import { ref } from 'vue';
import BasicCharts from '@/views/BasicCharts.vue';
import Header from '@/components/Header.vue';

export default {
  components: {
    Header,
    BasicCharts,
  },

  setup() {
    const heading = ref('前端薪資調查報告');
    return {
      heading,
    };
  },
};
</script>
