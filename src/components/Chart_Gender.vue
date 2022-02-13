<template lang="pug">
section.chart

  header.chart-header

    h4.chart-title
      | 性別比例

  main.chart-body

    .row.g-0.w-100

      .col-3.d-flex.align-items-center.justify-content-center(
        v-if="percentage.length !== 0"
      )
        .fw-bold.d-flex.flex-column.align-items-center
          span {{ percentage[1].gender }}
          span  {{ percentage[1].percent }} %

      PieChart.chart-content.col-6(
        :chartData='chartData')

      .col-3.d-flex.align-items-center.justify-content-center(
        v-if="percentage.length !== 0"
      )
        .fw-bold.d-flex.flex-column.align-items-center
          span {{ percentage[0].gender }}
          span {{ 100 - percentage[1].percent }} %
</template>

<style lang="scss" scoped>
</style>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { PieChart } from 'vue-chart-3';

export default {
  name: 'Home',
  components: { PieChart },
  setup() {
    // get data
    const route = useRoute();
    const api = (route.name === 'Designer')
      ? 'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/ui_data.json'
      : 'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json';

    const genders = ref([]);
    const counts = ref([]);
    const percentage = ref([]);

    fetch(api)
      .then(async (fetchData) => {
        const rawData = await fetchData.json();

        rawData.forEach((people) => {
          const { gender } = people;
          if (!genders.value.includes(gender)) {
            genders.value.push(gender);
            counts.value[genders.value.indexOf(gender)] = 1;
            percentage.value.push({
              gender: gender.replace('性', ''),
              percent: 0,
            });
          } else {
            counts.value[genders.value.indexOf(gender)] += 1;
            const total = counts.value.reduce((x, y) => x + y);
            const percent = Math.round((counts.value[genders.value.indexOf(gender)] / total) * 100);
            percentage.value[genders.value.indexOf(gender)].percent = percent;
          }
        });
      });

    // chart
    const chartData = {
      labels: genders.value,
      datasets: [{
        data: counts.value,
        backgroundColor: [
          '#8E7DFA',
          '#D2CBFD',
        ],
      }],
    };

    return {
      chartData,
      percentage,
    };
  },
};
</script>
