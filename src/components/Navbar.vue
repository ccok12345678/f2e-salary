<template lang="pug">
nav.navbar.navbar-expand-md.navbar-light.bg-trasparent
  .container

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
      ul.navbar-nav.fw-bold.ps-md-1
        li.nav-item.me-md-4.pe-md-2
          a.nav-link.text-lighter(href='#') 修練精神時光屋
        li.nav-item
          a.nav-link.text-lighter(href='#') 薪資調查報告

</template>
