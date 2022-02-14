<template lang="pug">
.container.pb-1
  ChartJobTenure

  .w-100.py-4

  ChartSalary

</template>

<script>
import ChartJobTenure from '@/components/Chart_JobTenure.vue';
import ChartSalary from '@/components/Chart_Salary.vue';

export default {
  components: {
    ChartJobTenure,
    ChartSalary,
  },
};
</script>
