<template lang="pug">
.container
  .row

    .col-md-6.bg-darker
      ChartAreas
    .col-md-6
</template>

<script>
import { reactive } from 'vue';
import ChartAreas from '@/components/Chart_Areas.vue';

export default {
  components: {
    ChartAreas,
  },
  props: {
    rawData: {
      type: Array,
      default() { return []; },
    },
  },
  setup(props) {
    const data = reactive(props.rawData);

    console.log('in charts', data);
  },
};
</script>
