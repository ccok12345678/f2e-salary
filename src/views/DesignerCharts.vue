<template lang="pug">
Header(:heading='heading')
BasicCharts(:rawData='uiData')
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
    const heading = ref('UI 薪資調查報告');

    // get api data
    async function getData() {
      const api = 'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/ui_data.json';
      const http = await fetch(api);
      const fetchData = await http.json();

      return fetchData;
    }

    const uiData = getData();

    return {
      heading,
      uiData,
    };
  },
};
</script>
