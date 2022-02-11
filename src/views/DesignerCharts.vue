<template lang="pug">
Header(:heading='heading')
</template>

<script>
import { ref } from 'vue';
import Header from '../components/Header.vue';

export default {
  components: {
    Header,
  },

  setup() {
    const heading = ref('UI 薪資調查報告');

    return {
      heading,
    };
  },
};
</script>
