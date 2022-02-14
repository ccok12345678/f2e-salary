<template lang="pug">
section.chart

  header.chart-header

    h4.chart-title
      | 年薪

  main.chart-body

    small.chart-unit
      | 單位：千元

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

    const tenuerCount = ref(labels.map(() => 0));
    const salaryDatas = ref(labels.map(() => 0));
    const counts = ref([]);

    apiData.value
      .then((rawData) => {
        rawData.forEach((people) => {
          const jobTenure = people.company.job_tenure
            .replace(' ', '')
            .replace('~', '-');
          const salary = Number(people.company.salary
            .replace(/[\u4e00-\u9fa5]/g, '')
            .split('~')
            .reduce((x, y) => (Number(x) + Number(y)) / 2));

          tenuresRex.forEach((tenureRex, index) => {
            if (tenureRex.test(jobTenure)) {
              tenuerCount.value[index] += 1;
              salaryDatas.value[index] += salary;
            }
          });
        });
      })
      .then(() => {
        salaryDatas.value.forEach((salary, index) => {
          counts.value.push(
            Math.round((salary / tenuerCount.value[index]) * 10),
          );
        });
      });
    console.log(counts.value);

    // chart
    const chartData = {
      labels,
      datasets: [{
        maxBarThickness: 48,
        minBarLength: 5,
        data: [],
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
          max: 1200,
          ticks: {
            stepSize: 200,
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
