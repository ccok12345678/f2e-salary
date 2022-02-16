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
// import { reactive, ref } from 'vue';
import { BarChart } from 'vue-chart-3';

export default {
  components: { BarChart },
  props: {
    apiData: {
      type: Promise,
      default() { return []; },
    },
  },
  data() {
    return {
      labels: ['1年以下', '2-3年', '3-5年', '5-7年', '7-9年', '10年以上'],
      tenuresRex: [],
      tenuerCount: [],
      salaryDatas: [],
      counts: [],
      chartData: {
        labels: [],
        datasets: [{
          data: [],
          maxBarThickness: 48,
          minBarLength: 5,
        }],
      },
      options: {
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
      },
    };
  },
  mounted() {
    this.tenuresRex = this.labels.map((tenure) => new RegExp(tenure));
    this.salaryDatas = this.labels.map(() => 0);
    this.tenuerCount = this.labels.map(() => 0);
    this.chartData.labels = this.labels;

    this.apiData
      .then((rawData) => {
        rawData.forEach((people) => {
          const jobTenure = people.company.job_tenure
            .replace(' ', '')
            .replace('~', '-');
          const salary = Number(people.company.salary
            .replace(/[\u4e00-\u9fa5]/g, '')
            .split('~')
            .reduce((x, y) => (Number(x) + Number(y)) / 2));

          this.tenuresRex.forEach((tenureRex, index) => {
            if (tenureRex.test(jobTenure)) {
              this.tenuerCount[index] += 1;
              this.salaryDatas[index] += salary;
            }
          });
        });
        this.salaryDatas.forEach((salary, index) => {
          this.counts.push(
            Math.round((salary / this.tenuerCount[index]) * 10),
          );
        });
        this.chartData.datasets[0].data = this.counts;
      });
  },

  // componsition api would fail
  // setup(props) {
  //   const apiData = reactive(props.apiData);

  //   const labels = ['1年以下', '2-3年', '3-5年', '5-7年', '7-9年', '10年以上'];

  //   const tenuresRex = labels.map((tenure) => new RegExp(tenure));

  //   const tenuerCount = labels.map(() => 0);
  //   const salaryDatas = labels.map(() => 0);
  //   const counts = [];

  //   apiData
  //     .then((rawData) => {
  //       rawData.forEach((people) => {
  //         const jobTenure = people.company.job_tenure
  //           .replace(' ', '')
  //           .replace('~', '-');
  //         const salary = Number(people.company.salary
  //           .replace(/[\u4e00-\u9fa5]/g, '')
  //           .split('~')
  //           .reduce((x, y) => (Number(x) + Number(y)) / 2));

  //         tenuresRex.forEach((tenureRex, index) => {
  //           if (tenureRex.test(jobTenure)) {
  //             tenuerCount[index] += 1;
  //             salaryDatas[index] += salary;
  //           }
  //         });
  //       });
  //       salaryDatas.forEach((salary, index) => {
  //         counts.push(
  //           Math.round((salary / tenuerCount[index]) * 10),
  //         );
  //       });
  //     });
  //   console.log(counts);

  //   // chart
  //   const chartData = ref({
  //     labels,
  //     datasets: [{
  //       data: counts,
  //       maxBarThickness: 48,
  //       minBarLength: 5,
  //     }],
  //   });

  //   console.log(chartData);

  //   const options = {
  //     scales: {
  //       x: {
  //         grid: {
  //           display: false,
  //         },
  //         ticks: {
  //           autoSkip: false,
  //         },
  //       },
  //       y: {
  //         grid: {
  //           drawTicks: true,
  //           color: '#6B6783',
  //           tickColor: '#080231',
  //           tickLength: 24,
  //         },
  //         min: 0,
  //         max: 1200,
  //         ticks: {
  //           stepSize: 200,
  //         },
  //       },
  //     },
  //   };

  //   return {
  //     chartData,
  //     options,
  //   };
  // },
};
</script>
