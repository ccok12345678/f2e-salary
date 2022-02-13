<template lang="pug">
section.chart

  header.chart-header

    h4.chart-title
      | 年齡

  main.chart-body

    small.chart-unit
      | 單位：人

    BarChart.chart-content(
      :chartData='chartData' :options='options')

</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { BarChart } from 'vue-chart-3';

export default {
  name: 'Home',
  components: { BarChart },
  setup() {
    // get data
    const route = useRoute();
    const api = (route.name === 'Designer')
      ? 'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/ui_data.json'
      : 'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json';

    const ages = ref([]);
    const counts = ref([]);

    fetch(api)
      .then(async (fetchData) => {
        const rawData = await fetchData.json();

        rawData.forEach((people) => {
          const { age } = people;
          if (!ages.value.includes(age)) {
            ages.value.push(age);
            counts.value[ages.value.indexOf(age)] = 1;
          } else {
            counts.value[ages.value.indexOf(age)] += 1;
          }
        });
      });

    // chart
    const chartData = {
      labels: ages.value,
      datasets: [{
        maxBarThickness: 32,
        minBarLength: 5,
        data: counts.value,
      }],
    };

    const options = {
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            autoSkip: false,
            maxRotation: 0,
          },
        },
        y: {
          grid: {
            drawTicks: true,
            color: '#6B6783',
            tickColor: '#080231',
            tickLength: 24,
          },
          min: 0,
          max: 250,
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
