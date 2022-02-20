<template lang="pug">
section.chart

  header.chart-header.d-flex

    h4.chart-title.me-auto
      | 產業薪資與滿意度

    nav

      button.btn.btn-outline-lighter.p-3.me-4
        | ＜ 前8筆

      button.btn.btn-outline-lighter.p-3.me-5
        | 後8筆 ＞

      .dropdown.d-inline
        button#orderDropdown.btn.btn-outline-lighter.dropdown-toggle.p-3(
          data-bs-toggle='dropdown')
          | 依人數
          span(v-if='isMoreToLess')  高到低
          span(v-else)  低到高
        ul.dropdown-menu.dropdown-menu-dark(
          aria-labelledby='orderDropdown')
          li
            button.dropdown-item(
              @click='isMoreToLess = true')
              | 高到低
          li
            button.dropdown-item(
              @click='isMoreToLess = false')
              | 低到高
  main.chart-body

    small.chart-unit
      | 單位：千元

    canvas.chart-content.ps-3(ref='chart')

</template>

<script>
import {
  ref, onMounted, watch,
} from 'vue';
import { Chart } from 'chart.js';
import sortSalaryScoreData from '@/methods/sortSalaryScoreData';
import sectionData from '@/methods/sectionData';
import updateScoreChart from '@/methods/updateScoreChart';

export default {
  props: {
    apiData: {
      type: Promise,
      default() { return []; },
    },
  },
  setup(props) {
    const resData = ref({});
    const nowSection = ref(1);
    const isMoreToLess = ref(true);
    const sectionedData = ref({});
    const chart = ref(null);

    let salaryChart;

    onMounted(async () => {
      resData.value = await props.apiData;

      const sortedData = sortSalaryScoreData(resData.value, isMoreToLess.value);

      sectionedData.value = sectionData(sortedData, nowSection.value);

      const labels = sectionedData.value.sectionData.map((data) => data.category);
      const salaryDatas = sectionedData.value.sectionData.map((data) => data.salary);
      const scoreDatas = sectionedData.value.sectionData.map((data) => data.score);

      // chart data & options
      // eslint-disable-next-line no-unused-vars
      salaryChart = new Chart(chart.value, {
        data: {
          labels,
          datasets: [
            {
              type: 'bar',
              data: salaryDatas,
              maxBarThickness: 48,
              minBarLength: 5,
              order: 2,
            }, {
              type: 'line',
              yAxisID: 'ratingScale',
              data: scoreDatas,
              borderColor: '#F9F8FE',
              borderWidth: 2,
              fill: true,
              pointBackgroundColor: '#8E7DFA',
              pointRadius: 10,
              pointBorderWidth: 3,
              order: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                color: '#6b6783',
                tickColor: '#080231',
                tickLength: 24,
              },
              min: 0,
              max: 1200,
              ticks: {
                stepSize: 200,
              },
            },
            ratingScale: {
              position: 'right',
              min: 0,
              max: 10,
              grid: {
                display: false,
                tickColor: '#080231',
                tickLength: 24,
              },
              ticks: {
                stepSize: 2,
              },
            },
          },
        },
      });
    });

    watch(isMoreToLess, () => {
      const sortedData = sortSalaryScoreData(resData.value, isMoreToLess.value);

      sectionedData.value = sectionData(sortedData, 1);

      updateScoreChart(salaryChart, sectionedData.value.sectionData);
    });

    return {
      chart,
      isMoreToLess,
    };
  },
};
</script>
