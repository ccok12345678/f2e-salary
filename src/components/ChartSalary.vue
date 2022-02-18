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
// import { reactive, ref } from 'vue';
// import { Chart } from 'chart.js';

export default {
  props: {
    apiData: {
      type: Promise,
      default() { return []; },
    },
  },
};
</script>
