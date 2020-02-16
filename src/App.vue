<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
  html {
    box-sizing: border-box;
    font-size: 14px;
    color: #303133;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  a,
  a:link,
  a:visited {
    text-decoration: none;
    color: #246bb3;
  }

  a:hover {
    text-decoration: underline;
  }

</style>
