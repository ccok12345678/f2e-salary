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

    canvas.chart-content.ps-3(id='scoreChart')

</template>

<script>
import {
  ref, onMounted, watch,
} from 'vue';
import {
  addChart, sortData, sectionData, updateScoreChart,
} from '@/methods/scoreChart';

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

    let salaryChart;

    onMounted(async () => {
      resData.value = await props.apiData;

      const sortedData = sortData(resData.value, isMoreToLess.value);

      sectionedData.value = sectionData(sortedData, nowSection.value);

      salaryChart = addChart(salaryChart, sectionedData.value.sectionData);
    });

    watch(isMoreToLess, () => {
      const sortedData = sortData(resData.value, isMoreToLess.value);

      sectionedData.value = sectionData(sortedData, 1);

      updateScoreChart(salaryChart, sectionedData.value.sectionData);
    });

    return {
      isMoreToLess,
    };
  },
};
</script>
