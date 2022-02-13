<template lang="pug">
.container
  .row.gy-4

    .col-md-6
      ChartAreas

    .col-md-6
      ChartAge

    .col-sm-5
      ChartGender

    .col-cm-7
</template>

<script>
import ChartAreas from '@/components/Chart_Areas.vue';
import ChartAge from '@/components/Chart_Age.vue';
import ChartGender from '@/components/Chart_Gender.vue';

export default {
  components: {
    ChartAreas,
    ChartAge,
    ChartGender,
  },
};
</script>
