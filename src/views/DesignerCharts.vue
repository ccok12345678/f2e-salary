<template lang="pug">
Header(:heading='heading' @toggle-basic='toggleBasic')

BasicCharts(v-if="isBasic")

SalaryChart(v-else)
</template>

<script>
import { ref } from 'vue';
import Header from '@/components/Header.vue';
import BasicCharts from '@/views/BasicCharts.vue';
import SalaryChart from '@/views/SalaryCharts.vue';

export default {
  components: {
    Header,
    BasicCharts,
    SalaryChart,
  },

  setup() {
    const heading = ref('UI 薪資調查報告');
    const isBasic = ref(true);

    function toggleBasic(emitBasic) {
      isBasic.value = emitBasic.value;
    }

    return {
      heading,
      isBasic,
      toggleBasic,
    };
  },
};
</script>
