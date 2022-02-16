<template lang="pug">
.container.pb-1
  ChartJobTenure(:apiData='rawData')

  .w-100.py-4

  ChartSalary(:apiData='rawData')

</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import ChartJobTenure from '@/components/ChartJobTenure.vue';
import ChartSalary from '@/components/ChartSalary.vue';

export default {
  components: {
    ChartJobTenure,
    ChartSalary,
  },
  setup() {
    async function getData() {
      const route = useRoute();
      const api = (route.name === 'Designer')
        ? 'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/ui_data.json'
        : 'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json';
      const http = await fetch(api);
      const data = await http.json();

      return data;
    }

    const rawData = ref(getData());

    return {
      rawData,
    };
  },
};
</script>
