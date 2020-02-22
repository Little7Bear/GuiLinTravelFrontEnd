<template>
  <div class="home">
    <header class="header">
      <div class="header-content">
        <el-menu :default-active="activeIndex" mode="horizontal" background-color="#545c64" text-color="#fff"
          active-text-color="#ffd04b" :router="true">
          <h1 class="title">桂林旅行网</h1>
          <el-menu-item index="/">热门游记</el-menu-item>
          <el-menu-item index="/scenic">景点</el-menu-item>
          <el-menu-item index="/my-home">我的首页</el-menu-item>
        </el-menu>
      </div>
    </header>
  </div>
</template>

<script>
  export default {
    name: 'Home',

    components: {},

    data() {
      return {
        activeIndex: '/',
      }
    },

    methods: {

    }
  }

</script>

<style lang="scss" scoped>
  .home {
    position: relative;

    .header {
      width: 100%;
      background: rgb(84, 92, 100);
      height: 60px;

      .header-content {
        width: 930px;
        margin: 0 auto;

        .title {
          float: left;
          line-height: 60px;
          margin: 0;
          color: rgb(255, 255, 255);
          margin-right: 20px;
          user-select: none;
        }
      }
    }
  }

</style>
