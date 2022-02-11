<template lang="pug">
h3 here can see charts
</template>

<script>
import { reactive } from 'vue';

export default {
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
