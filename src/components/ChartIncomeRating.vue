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
  reactive, ref, onMounted, watch,
} from 'vue';
import { Chart } from 'chart.js';

export default {
  props: {
    apiData: {
      type: Promise,
      default() { return []; },
    },
  },
  setup(props) {
    const industries = [];
    const industryCount = [];

    const chart = ref(null);
    const isMoreToLess = ref(true);

    let salaryChart;

    onMounted(async () => {
      const res = await reactive(props.apiData);

      res.forEach((people) => {
        const { industry } = people.company;
        const salary = Number(people.company.salary
          .replace(/[\u4e00-\u9fa5]/g, '')
          .split('~')
          .reduce((x, y) => (Number(x) + Number(y)) / 2));
        const rating = Number(people.company.salary_score);

        if (!industries.includes(industry)) {
          industries.push(industry);
          industryCount.push({
            category: industry,
            count: 1,
            salary,
            rating,
          });
        } else {
          industryCount[industries.indexOf(industry)].count += 1;
          industryCount[industries.indexOf(industry)].salary += salary;
          industryCount[industries.indexOf(industry)].rating += rating;
        }
      });

      industryCount.forEach((industry, index) => {
        const salaryAverage = Math.round(
          (industry.salary / industry.count) * 10,
        );
        const ratingAverage = Math.round(
          (industry.rating / industry.count),
        );

        industryCount[index].salary = salaryAverage;
        industryCount[index].rating = ratingAverage;
      });

      const len = industryCount.length;
      if (isMoreToLess.value) {
        for (let i = 0; i < len - 1; i += 1) {
          for (let j = 0; j < len - 1 - i; j += 1) {
            if (industryCount[j].count < industryCount[j + 1].count) {
              const temp = industryCount[j];
              industryCount[j] = industryCount[j + 1];
              industryCount[j + 1] = temp;
            }
          }
        }
      } else {
        for (let i = 0; i < len - 1; i += 1) {
          for (let j = 0; j < len - 1 - i; j += 1) {
            if (industryCount[j].count > industryCount[j + 1].count) {
              const temp = industryCount[j];
              industryCount[j] = industryCount[j + 1];
              industryCount[j + 1] = temp;
            }
          }
        }
      }
      console.log('sorted', industryCount);

      const labels = reactive(industryCount.map((industry) => industry.category));
      const salaryData = reactive(industryCount.map((industry) => industry.salary));
      const ratingData = reactive(industryCount.map((industry) => industry.rating));

      // chart data & options
      // eslint-disable-next-line no-unused-vars
      salaryChart = new Chart(chart.value, {
        data: {
          labels,
          datasets: [
            {
              type: 'bar',
              data: salaryData,
              maxBarThickness: 48,
              minBarLength: 5,
              order: 2,
            }, {
              type: 'line',
              yAxisID: 'ratingScale',
              data: ratingData,
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
      console.log(isMoreToLess.value);
      const len = industryCount.length;
      if (isMoreToLess.value) {
        for (let i = 0; i < len - 1; i += 1) {
          for (let j = 0; j < len - 1 - i; j += 1) {
            if (industryCount[j].count < industryCount[j + 1].count) {
              const temp = industryCount[j];
              industryCount[j] = industryCount[j + 1];
              industryCount[j + 1] = temp;
            }
          }
        }
      } else {
        for (let i = 0; i < len - 1; i += 1) {
          for (let j = 0; j < len - 1 - i; j += 1) {
            if (industryCount[j].count > industryCount[j + 1].count) {
              const temp = industryCount[j];
              industryCount[j] = industryCount[j + 1];
              industryCount[j + 1] = temp;
            }
          }
        }
      }
      console.log('sorted, in watch', industryCount);

      const labels = reactive(industryCount.map((industry) => industry.category));
      const salaryData = reactive(industryCount.map((industry) => industry.salary));
      const ratingData = reactive(industryCount.map((industry) => industry.rating));

      salaryChart.data.labels = labels;
      salaryChart.data.datasets[0].data = salaryData;
      salaryChart.data.datasets[1].data = ratingData;
      salaryChart.update();
    });

    return {
      chart,
      isMoreToLess,
    };
  },
};
</script>
