<template lang="pug">
.container
  .row.gy-4

    .col-md-6
      ChartAreas

    .col-md-6
      ChartAge

    .col-sm-5
      ChartGender.h-100

    .col-sm-7
      ChartMajor

    .col-12
      ChartSkills

</template>

<script>
import ChartAreas from '@/components/Chart_Areas.vue';
import ChartAge from '@/components/Chart_Age.vue';
import ChartGender from '@/components/Chart_Gender.vue';
import ChartMajor from '@/components/Chart_Major.vue';
import ChartSkills from '@/components/Chart_Skills.vue';

export default {
  components: {
    ChartAreas,
    ChartAge,
    ChartGender,
    ChartMajor,
    ChartSkills,
  },
};
</script>
