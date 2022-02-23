<template lang="pug">
section.chart

  header.chart-header.d-flex.flex-column.flex-md-row

    h4.chart-title.me-auto
      | 產業薪資與滿意度

    nav.mb-4.mb-md-0

      button.btn.btn-outline-lighter.p-2.p-md-3.me-3.me-md-4(
        :disabled='!sectionedData.hasPre'
        @click='currentSection -= 1')
        | ＜ 前8筆

      button.btn.btn-outline-lighter.p-2.p-md-3.me-3.me-md-5(
        :disabled='!sectionedData.hasNext'
        @click='currentSection += 1')
        | 後8筆 ＞

      .dropdown.d-inline
        button#orderDropdown.btn.btn-outline-lighter.dropdown-toggle.p-2.p-md-3(
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
    const sectionedData = ref({});
    const currentSection = ref(1);
    const isMoreToLess = ref(true);

    let salaryChart;

    // add chart
    onMounted(async () => {
      resData.value = await props.apiData;
      const sortedData = sortData(resData.value, isMoreToLess.value);
      sectionedData.value = sectionData(sortedData, currentSection.value);
      salaryChart = addChart(salaryChart, sectionedData.value.sectionData);
    });

    // change sort
    watch(isMoreToLess, () => {
      const sortedData = sortData(resData.value, isMoreToLess.value);
      currentSection.value = 1;
      sectionedData.value = sectionData(sortedData, currentSection.value);
      updateScoreChart(salaryChart, sectionedData.value.sectionData);
    });

    // change section
    watch(currentSection, () => {
      const sortedData = sortData(resData.value, isMoreToLess.value);
      sectionedData.value = sectionData(sortedData, currentSection.value);
      updateScoreChart(salaryChart, sectionedData.value.sectionData);
    });

    return {
      isMoreToLess,
      currentSection,
      sectionedData,
    };
  },
};
</script>
