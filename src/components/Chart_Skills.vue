<template lang="pug">
section.chart

  header.chart-header

    h4.chart-title.mb-5.pb-1
      | 第一份工作所採用之技術/軟體

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

    const engineerskills = [
      'Git',
      '後端語言',
      '任務指派工具',
      'UI',
    ];

    const designerSkills = [
      'HTML、CSS',
      'jQuery',
      'JavaScript',
      '後端應用',
    ];

    const engineerLabels = [
      'Git 版本控制系統',
      '後端語言',
      '任務指派工具',
      'UI 標示工具',
    ];

    const designerLabels = [
      'HTML、CSS',
      'jQuery',
      'JavaScript',
      '後端應用',
    ];

    const skills = (route.name === 'Designer') ? designerSkills : engineerskills;
    const labels = (route.name === 'Designer') ? designerLabels : engineerLabels;

    const skillsRex = skills.map((skill) => new RegExp(skill));

    const skillsData = ref([0, 0, 0, 0]);
    const dataNum = ref([0]);

    fetch(api)
      .then(async (fetchData) => {
        const rawData = await fetchData.json();

        rawData.forEach((people) => {
          dataNum.value[0] += 1;

          const { skill } = people.first_job;

          skillsRex.forEach((skillRex, index) => {
            if (skillRex.test(skill)) {
              skillsData.value[index] += 1;
            }
          });
        });
      });

    // chart
    const chartData = {
      labels,
      datasets: [
        {
          maxBarThickness: 32,
          minBarLength: 5,
          data: skillsData.value,
          backgroundColor: '#8E7DFA',
        },
      ],
    };

    const options = {
      indexAxis: 'y',
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
          max: dataNum.value,
          ticks: {
            // 以百分比呈現ticks
            callback: (value) => `${((value / dataNum.value) * 100).toFixed(0)}%`,
            stepSize: () => dataNum.value * 0.2,
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
