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
import { reactive } from 'vue';
import { BarChart } from 'vue-chart-3';

export default {
  name: 'Home',
  components: { BarChart },
  props: {
    rawData: {
      type: Array,
      default() { return []; },
    },
  },
  setup(props) {
    const rawData = reactive(props.rawData);

    console.log('rawData', rawData);

    const chartData = {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
      ],
      datasets: [{
        label: true,
        data: [65, 59, 80, 81, 56, 55, 40],
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
