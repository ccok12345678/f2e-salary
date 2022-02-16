<template lang="pug">
section.chart

  header.chart-header

    h4.chart-title
      | 地區

  main.chart-body

    small.chart-unit
      | 單位：人

    BarChart.chart-content(
      :chartData='chartData' :options='options')

</template>

<script>
import { ref } from 'vue';
import { BarChart } from 'vue-chart-3';

export default {
  components: { BarChart },
  props: {
    apiData: {
      type: Array,
      default() { return []; },
    },
  },
  setup(props) {
    const apiData = ref(props.apiData);

    const areas = ref([]);
    const counts = ref([]);

    apiData.value
      .then((rawData) => {
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

    // chart
    const chartData = {
      labels: areas.value,
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
            // maxRotation: 0,
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
