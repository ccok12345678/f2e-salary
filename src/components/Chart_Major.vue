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

    const majors = ref({
      department: degree.department,
      highDegree: 0,
      normalDegree: 0,
    });
    const notMajors = ref({
      department: '非相關科系',
      highDegree: 0,
      normalDegree: 0,
    });

    fetch(api)
      .then(async (fetchData) => {
        const rawData = await fetchData.json();
        rawData.forEach((people) => {
          const { major, education } = people;

          switch (departmentRex.test(major)) {
            case true:
              if (doctorRex.test(education) || masterRex.test(education)) {
                majors.value.highDegree += 1;
              } else {
                majors.value.normalDegree += 1;
              }
              break;

            default:
              if (doctorRex.test(education) || masterRex.test(education)) {
                notMajors.value.highDegree += 1;
              } else {
                notMajors.value.normalDegree += 1;
              }
              break;
          }
        });
        // console.log(majors.value);
        // console.log('major: high', majors.value.highDegree);
        // console.log('major: normal', majors.value.normalDegree);

        // console.log(notMajors.value);
        // console.log('notMajor: high', notMajors.value.highDegree);
        // console.log('notMajor: normal', notMajors.value.normalDegree);
      });

    // chart
    const chartData = {
      labels: [majors.value.department, notMajors.value.department],
      datasets: [
        {
          maxBarThickness: 32,
          minBarLength: 5,
          stack: majors.value.department,
          label: '大學（含）以下',
          data: [
            majors.value.normalDegree,
            notMajors.value.normalDegree,
          ],
          backgroundColor: '#8E7DFA',
        },
        {
          maxBarThickness: 32,
          minBarLength: 5,
          stack: majors.value.department,
          label: '碩博士',
          data: [
            majors.value.highDegree,
            notMajors.value.highDegree,
          ],
          backgroundColor: '#D2CBFD',
        },
      ],
    };

    console.log(chartData);

    const options = {
      indexAxis: 'y',
      responsive: true,
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
          max: 240,
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
