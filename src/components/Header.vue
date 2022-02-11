<template lang="pug">
head.container.d-flex.flex-column.align-items-center

  h2.fw-bold.pb-2 {{ Heading }}

  .row.switch.mt-5.w-100

    .col-12.col-sm-8.offset-md-2.col-md-6.offset-lg-4.col-lg-4

      .p-2.border.border-lighter.rounded.d-flex.justify-content-around

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

    .dropdown.col-12.col-sm-4.text-center.text-sm-end.mt-3.mt-sm-0
      a#headDropBtn.dropdown-toggle.btn.bg-darker.text-lighter.px-4.py-3(
        href='#'
        data-bs-toggle='dropdown'
      )
        span.me-5 2021

      ul.dropdown-menu.dropdown-menu-dark(
        arial-labelledby='headDropBtn')
        li
          a.dropdown-item(
            href='#'
          ) 2021

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
