<template lang="pug">
Header(:heading='heading')
Charts(:rawData='feData')
</template>

<script>
import { ref } from 'vue';
import Charts from '@/views/Charts.vue';
import Header from '@/components/Header.vue';

export default {
  components: {
    Header,
    Charts,
  },

  setup() {
    const heading = ref('前端薪資調查報告');

    // get api data
    async function getData() {
      const api = 'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json';
      const http = await fetch(api);
      const fetchData = await http.json();

      return fetchData;
    }

    const feData = getData();

    return {
      heading,
      feData,
    };
  },
};
</script>
