<template>
  <div class="home">

    <header class="header">
      <el-menu :default-active="activeIndex" mode="horizontal" background-color="#545c64" text-color="#fff"
        active-text-color="#ffd04b" :router="true">
        <el-menu-item>
          <h1 class="title">桂林旅行网</h1>
        </el-menu-item>
        <el-menu-item index="/index">热门游记</el-menu-item>
        <el-menu-item index="/scenic">景点</el-menu-item>
        <el-menu-item index="/my-home">我的首页</el-menu-item>
      </el-menu>
    </header>

    <main class="main">
      <router-view />
    </main>

  </div>
</template>

<script>
  export default {
    name: 'Home',

    components: {},

    data() {
      return {
        activeIndex: '/index',
      }
    },

    methods: {

    }
  }

</script>

<style lang="scss" scoped>
  $header-height:66px;

  /deep/ {
    .el-menu {
      min-width: 930px;
      margin: 0 auto;
    }

    .el-menu--horizontal>.el-menu-item {
      height: $header-height;
      line-height: $header-height;
    }
  }

  .home {
    .header {
      @include body-padding;
      background: rgb(84, 92, 100);
      height: $header-height;
      display: flex;

      .title {
        float: left;
        border-bottom: none;
        margin: 0;
        color: rgb(255, 255, 255);
        margin-right: 20px;
        user-select: none;
      }

    }
  }

  .main {
    @include body-padding;
    padding-top: 20px;
  }

</style>
