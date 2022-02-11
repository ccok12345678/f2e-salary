<template lang="pug">
nav.navbar.navbar-expand-md.navbar-light.bg-trasparent.py-4
  .container-lg

    a.navbar-brand.me-md-5(href='#')
      h1.visually-hidden The F2E 3rd 前端薪資數據圖表調查
      img.me-md-5(src='../assets/images/The_F2E.svg'
        title='The F2E 3rd 前端薪資數據圖表調查'
        alt='The F2E 3rd')

    button.navbar-toggler(
      type='button'
      data-bs-toggle='collapse'
      data-bs-target='#navbarNav'
      aria-controls='navbarNav'
      aria-expanded='false'
      aria-label='Toggle navigation')
      span.navbar-toggler-icon

    #navbarNav.collapse.navbar-collapse

      ul.navbar-nav.fw-bold.pt-3.pt-md-0.ps-md-1.d-flex.w-100

        li.nav-item.me-md-4.pe-md-2
          a.nav-link.text-lighter(href='#') 修練精神時光屋

        li.nav-item.dropdown

          a#navDropBtn.nav-link.text-lighter.dropdown-toggle(
            href='#'
            data-bs-toggle='dropdown'
          ) 薪資調查報告

          ul.dropdown-menu.dropdown-menu-dark.border-lighter.py-1.pe-1(
            arial-labelledby='navDropBtn')
            li.p-2
              router-link.dropdown-item.py-2.pe-5.me-3(
                to='/engineercharts'
              ) 前端薪資調查報告
            li
              hr.dropdown-devider.m-0
            li.p-2
              router-link.dropdown-item.py-2(
                to='/designercharts'
              ) UI 薪資調查報告

        li.nav-item.ms-md-auto
          a.nav-link.text-primary(href='#') Login

</template>

<style lang="scss" scoped>
.dropdown-devider {
  border-top: 1px solid #28234C;
}

.dropdown-toggle::after {
  display: none;
}
</style>
