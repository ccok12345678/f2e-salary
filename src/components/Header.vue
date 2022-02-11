<template lang="pug">
head.conteiner.d-flex.flex-column.align-items-center

  h2.fw-bold.pb-2 {{ Heading }}

  .switch.mt-5.p-2.border.border-lighter.rounded

    button.fw-bold.btn.py-2.px-4.me-2(
      :class='{ "btn-switched": isBasic }'
      @click='isBasic = true'
    )
      | 基本資料

    button.fw-bold.btn.py-2.px-4(
      :class='{ "btn-switched": !isBasic }'
      @click='isBasic = false'
    )
      | 薪資與產業

</template>

<style lang="scss" scoped>
h2 {
  margin-top: 45px;
}

.switch {
  margin-bottom: 60px;
}

.btn {
  color: #9c9aad;
}

.btn:hover, .btn-switched {
    background-color: #f2f2f4;
    color: #080231;
}
</style>

<script>
import { ref } from 'vue';

export default {
  props: {
    heading: {
      type: String,
      default() { return ''; },
    },
  },
  setup(props) {
    // console.log('header', props);
    const Heading = ref(props.heading);

    const isBasic = ref(true);

    return {
      Heading,
      isBasic,
    };
  },
};
</script>
