<template lang="pug">
section.chart

  header.chart-header

    h4.chart-title
      | 年薪

  main.chart-body

    small.chart-unit
      | 單位：千元

    canvas(ref='salaryChart')

</template>

<script>
import { reactive } from 'vue';
// import { Chart } from 'chart.js';

export default {
  props: {
    apiData: {
      type: Promise,
      default() { return []; },
    },
  },
  setup(props) {
    const apiData = reactive(props.apiData);

    const labels = ['1年以下', '2-3年', '3-5年', '5-7年', '7-9年', '10年以上'];

    const tenureRex = labels.map((label) => new RegExp(label));

    const tenureCount = labels.map(() => 0);
    const salaryCount = labels.map(() => 0);
    const counts = reactive([]);

    apiData.then((data) => {
      data.forEach((people) => {
        const jobTenure = people.company.job_tenure
          .replace(' ', '')
          .replace('~', '-');
        const salary = Number(people.company.salary
          .replace(/[\u4e00-\u9fa5]/g, '')
          .split('~')
          .reduce((x, y) => (Number(x) + Number(y)) / 2));

        tenureRex.forEach((rex, index) => {
          if (rex.test(jobTenure)) {
            tenureCount[index] += 1;
            salaryCount[index] += salary;
          }
        });
      });
      console.log(labels);
      console.log('年資', tenureCount);
      console.log('薪資', salaryCount);

      salaryCount.forEach((salary, index) => {
        const average = Math.round((salary / tenureCount[index]) * 10);
        counts.push(average);
      });
    });

    console.log(counts);
  },
};
</script>
