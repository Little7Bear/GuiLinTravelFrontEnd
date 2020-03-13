<template>
  <div class="home">
    <!-- 头部导航 -->
    <header class="header-wrapper">
      <div class="header-container">
        <el-menu :default-active="activeIndex" mode="horizontal" background-color="#545c64" text-color="#fff"
          active-text-color="#ffd04b" :router="true">
          <el-menu-item class="el-menu-title">
            <h1 class="title">桂林旅行网</h1>
          </el-menu-item>
          <el-menu-item v-for="(item, index) in urls" :key="index" :index="item.path">{{item.name}}</el-menu-item>
        </el-menu>

        <div class="header-right">
          <el-input class="el-input-search" placeholder="搜索游记标题/用户名" prefix-icon="el-icon-search" v-model="searchVal">
          </el-input>
          <router-link to="/login">
            <span class="header-text">登录</span>
          </router-link>
        </div>
      </div>
    </header>

    <!-- 中间路由 -->
    <main class="main">
      <router-view />
    </main>

    <!-- 底部 -->
    <footer class="footer-wrapper">
      <div class="footer">
        <span class="copy-right">Copyright © {{year}} zhaobin</span>
        <span>网站备案号：xxxxxxxxx</span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Home',

  components: {},

  computed: {
    activeIndex () {
      let path = this.urls[0].path
      this.urls.forEach(item => {
        if (item.path.includes(this.$route.path)) {
          path = item.path
        }
      })
      return path
    }
  },

  created () {
    this.year = this.$dayjs().year()
  },

  data () {
    return {
      searchVal: '',
      year: '',
      urls: [{
        path: '/index',
        name: '热门游记'
      }, {
        path: '/scenic',
        name: '景点'
      }, {
        path: '/my-home',
        name: '我的首页'
      }]
    }
  },

  methods: {}
}

</script>

<style lang="scss" scoped>
  $header-height: 66px;
  $color-background: rgb(84, 92, 100);

  /deep/ {
    .el-menu.el-menu--horizontal {
      border-bottom: none;
    }

    .el-menu--horizontal>.el-menu-item {
      height: $header-height;
      line-height: $header-height;
      width: 120px;
      text-align: center;
    }

    .el-menu-title {
      padding: 0;
      width: 200px !important;

      .title {
        float: left;
        border-bottom: none;
        margin: 0;
        color: rgb(255, 255, 255);
        user-select: none;
      }

      &:hover {
        background: $color-background !important;
      }
    }

    .el-input-search {
      .el-input__inner {
        height: 35px;
        line-height: 35px;
        width: 250px;
        margin-right: 40px;
      }
    }
  }

  .home {
    background: #fff;

    // 导航条
    .header-wrapper {
      background: $color-background;
      height: $header-height;
    }

    .header-container {
      @include body-width;
      display: flex;
    }

    .header-right {
      padding-left: 20px;
      display: flex;
      align-items: center;
    }

    .header-text {
      font-size: $font-size-large;
      display: inline-block;
      width: 60px;
      color: #fff;
    }

    // body
    .main {
      @include body-width;
      padding-top: 20px;
      margin-bottom: 30px;
      min-height: 100vh;
    }

    //footer

    .footer-wrapper {
      background-color: $color-background;
    }

    .footer {
      @include body-width;
      color: #fff;
      font-size: 13px;
      height: 50px;
      display: flex;
      align-items: center;
    }

    .copy-right {
      margin-right: 20px;
    }
  }

</style>
