<template lang="pug">
.container
  .row

    .col-md-6
      ChartAreas

    .col-md-6
      ChartAge
</template>

<script>
import ChartAreas from '@/components/Chart_Areas.vue';
import ChartAge from '@/components/Chart_Age.vue';

export default {
  components: {
    ChartAreas,
    ChartAge,
  },
};
</script>
