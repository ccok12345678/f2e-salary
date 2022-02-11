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
    const heading = ref('前端薪資調查報告');

    // get api data
    async function getData() {
      const api = 'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json';
      const http = await fetch(api);
      const fetchData = await http.json();

      return fetchData;
    }

    console.log('FE', getData());

    return {
      heading,
    };
  },
};
</script>
