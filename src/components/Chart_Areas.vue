<template lang="pug">
section.chart

  header.chart-header

    h4.chart-title
      | 地區

  main.chart-body

    small.chart-unit
      | 單位：人

    .chart-content
      BarChart(:chartData='chartData' :options='options')

</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { BarChart } from 'vue-chart-3';

export default {
  name: 'Home',
  components: { BarChart },
  setup() {
    const route = useRoute();
    const api = (route.name === 'Designer')
      ? 'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/ui_data.json'
      : 'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json';

    const areas = ref([]);
    const counts = ref([]);

    fetch(api)
      .then(async (fetchData) => {
        const rawData = await fetchData.json();

        rawData.forEach((people) => {
          let area = people.company.area.replace('台灣 - ', '');
          area = area.replace('(綠島、澎湖、金門、馬祖)', '');
          if (!areas.value.includes(area)) {
            areas.value.push(area);
            counts.value[areas.value.indexOf(area)] = 1;
          } else {
            counts.value[areas.value.indexOf(area)] += 1;
          }
        });
      });
    console.log('areas', areas.value);
    console.log('counts', counts.value);

    const chartData = {
      labels: areas.value,
      datasets: [{
        label: true,
        data: counts.value,
      }],
    };

    const options = {
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            drawTicks: true,
            color: '#6B6783',
            tickColor: '#080231',
          },
          min: 0,
          max: 350,
          ticks: {
            stepSize: 50,
          },
        },
      },
    };

    return {
      chartData,
      options,
    };
  },
};
</script>
