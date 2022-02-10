<template lang="pug">
nav.navbar.navbar-expand-lg.navbar-light.bg-light
  .container

    a.navbar-brand(href='#')
      h1.visually-hidden The F2E 3rd 前端薪資數據圖表調查
      img(src='../assets/images/The_F2E.svg'
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
      ul.navbar-nav
        li.nav-item
          a.nav-link.active(aria-current='page' href='#') Home
        li.nav-item
          a.nav-link(href='#') Features
        li.nav-item
          a.nav-link(href='#') Pricing
        li.nav-item
          a.nav-link.disabled Disabled

</template>
