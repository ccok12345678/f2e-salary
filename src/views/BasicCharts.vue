<template lang="pug">
.container.pb-1
  .row.gy-4

    .col-md-6.pb-3
      ChartAreas(:apiData='rawData')

    .col-md-6.pb-3
      ChartAge(:apiData='rawData')

    .col-sm-5.pb-3
      ChartGender.h-100(:apiData='rawData')

    .col-sm-7.pb-3
      ChartMajor(:apiData='rawData')

    .col-12.pb-3
      ChartSkills(:apiData='rawData')

</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import ChartAreas from '@/components/Chart_Areas.vue';
import ChartAge from '@/components/Chart_Age.vue';
import ChartGender from '@/components/Chart_Gender.vue';
import ChartMajor from '@/components/Chart_Major.vue';
import ChartSkills from '@/components/Chart_Skills.vue';

export default {
  components: {
    ChartAreas,
    ChartAge,
    ChartGender,
    ChartMajor,
    ChartSkills,
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
