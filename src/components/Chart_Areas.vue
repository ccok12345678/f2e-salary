<template lang="pug">
BarChart(:chartData='testData' :options='options')
</template>

<script>
import { BarChart } from 'vue-chart-3';

export default {
  name: 'Home',
  components: { BarChart },
  setup() {
    const testData = {
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
        label: false,
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
            drawTicks: false,
            color: '#6B6783',
          },
        },
      },
    };

    return {
      testData,
      options,
    };
  },
};
</script>
