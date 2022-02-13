<template lang="pug">
section.chart

  header.chart-header

    h4.chart-titl.mb-5.pb-1
      | 科系與學歷

    BarChart.custom.chart-content(
      :chartData='chartData' :options='options')

</template>

<style lang="scss" scoped>
.custom {
  height: 244.5px;
}
</style>

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

    const degree = {
      department: (route.name === 'Designer') ? '設計科系相關' : '資訊科系相關',
      doctor: '博士',
      master: '碩士',
    };

    const departmentRex = new RegExp(degree.department);
    const doctorRex = new RegExp(degree.doctor);
    const masterRex = new RegExp(degree.master);

    const dataOfNormal = ref([0, 0]);
    const dataOfHigh = ref([0, 0]);

    fetch(api)
      .then(async (fetchData) => {
        const rawData = await fetchData.json();
        rawData.forEach((people) => {
          const { major, education } = people;

          switch (departmentRex.test(major)) {
            case true:
              if (doctorRex.test(education) || masterRex.test(education)) {
                dataOfHigh.value[0] += 1;
              } else {
                dataOfNormal.value[0] += 1;
              }
              break;

            default:
              if (doctorRex.test(education) || masterRex.test(education)) {
                dataOfHigh.value[1] += 1;
              } else {
                dataOfNormal.value[1] += 1;
              }
              break;
          }
        });
      });

    // chart
    const chartData = {
      labels: [degree.department, '非相關科系'],
      datasets: [
        {
          maxBarThickness: 32,
          minBarLength: 5,
          stack: degree.department,
          label: '大學（含）以下',
          data: dataOfNormal.value,
          backgroundColor: '#8E7DFA',
        },
        {
          maxBarThickness: 32,
          minBarLength: 5,
          stack: degree.department,
          label: '碩博士',
          data: dataOfHigh.value,
          backgroundColor: '#D2CBFD',
        },
      ],
    };

    const options = {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            padding: 40,
            color: '#6B6783',
            boxWidth: 16,
          },
        },
      },
      scales: {
        y: {
          stacked: true,
          grid: {
            display: false,
          },
        },
        x: {
          stacked: true,
          grid: {
            drawTicks: true,
            color: '#6B6783',
            tickColor: '#080231',
            tickLength: 24,
          },
          min: 0,
          max: 320,
          ticks: {
            stepSize: 40,
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
