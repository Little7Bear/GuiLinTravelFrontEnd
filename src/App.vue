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

  // element-链接
  .el-link {
    font-size: inherit;
    user-select: none;
  }

  // 导航
  .el-menu {
    .el-menu-item {
      font-size: 18px;
    }
  }

</style>
