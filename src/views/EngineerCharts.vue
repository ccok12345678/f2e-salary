<template lang="pug">
Header(:heading='heading')
BasicCharts(:rawData='feData')
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
    const feData = ref([]);

    // get api data
    async function getData() {
      const api = 'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json';
      const http = await fetch(api);
      const fetchData = await http.json();
      fetchData.forEach((item) => {
        feData.value.push(item);
      });
    }

    getData();

    return {
      heading,
      feData,
    };
  },
};
</script>
