<template lang="pug">
section.chart

  header.chart-header

    h4.chart-title
      | 年資

  main.chart-body

    small.chart-unit
      | 單位：人

    BarChart.chart-content.ps-3.ms-1(
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

    const labels = ['1年以下', '2-3年', '3-5年', '5-7年', '7-9年', '10年以上'];

    const tenuresRex = labels.map((tenure) => new RegExp(tenure));

    const tenureDatas = ref(labels.map(() => 0));

    apiData.value
      .then((rawData) => {
        rawData.forEach((people) => {
          const jobTenure = people.company.job_tenure
            .replace(' ', '')
            .replace('~', '-');
          tenuresRex.forEach((tenure, index) => {
            if (tenure.test(jobTenure)) {
              tenureDatas.value[index] += 1;
            }
          });
        });
      });

    // chart
    const chartData = {
      labels,
      datasets: [{
        maxBarThickness: 48,
        minBarLength: 5,
        data: tenureDatas.value,
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
          max: 175,
          ticks: {
            stepSize: 30,
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
