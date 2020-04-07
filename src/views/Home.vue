<template>
  <div class="home">
    <!-- 头部导航 -->
    <header class="header-wrapper">
      <div class="header-container">
        <el-menu
          ref="menu"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
          :default-active="activeIndex"
          @select="selectMenu"
        >
          <el-menu-item class="el-menu-title">
            <h1 class="title">专属旅游记录</h1>
          </el-menu-item>
          <el-menu-item
            v-for="(item, index) in urls"
            :key="index"
            :index="item.path"
          >{{ item.name }}</el-menu-item>

          <el-submenu index=" " v-if="isLogin">
            <template slot="title">我的工作台</template>
            <el-menu-item index="/create-travel">创建游记</el-menu-item>
            <el-menu-item index="/user/personal">设置</el-menu-item>
            <el-menu-item v-permission="'0'" index="/user/manage">用户管理</el-menu-item>
            <el-menu-item @click="onExit">退出</el-menu-item>
          </el-submenu>
        </el-menu>

        <div class="header-right">
          <router-link v-if="!isLogin" to="/login">
            <span class="header-text">登录</span>
          </router-link>

          <el-input
            class="el-input-search"
            placeholder="搜索游记标题/用户名"
            prefix-icon="el-icon-search"
            v-model="searchVal"
          ></el-input>
        </div>
      </div>
    </header>

    <!-- 中间路由 -->
    <main class="main">
      <router-view />
    </main>

    <!-- 底部 -->
    <footer class="footer-wrapper" v-show="$route.name === 'PopularTravel'">
      <div class="footer">
        <p>©{{ year }} glsite.cn</p>
        <p>邮箱：2395373083@qq.com</p>
        <p>
          网站备案号：
          <el-link
            href="http://beian.miit.gov.cn"
            :underline="false"
            target="_blank"
            class="color-white"
          >桂ICP备19011827号</el-link>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data() {
    return {
      searchVal: '',
      year: '',
      activeIndex: '/index',
      urls: [
        {
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

  created() {
    this._initState()
  },

  computed: {
    isLogin() {
      return this.$store.state.token ? true : false
    },

  },

  methods: {
    _initState() {
      this.year = this.$dayjs().year()
      this.activeIndex = this.$localStorage.session('homeIndex') || '/index'
    },

    selectMenu(index) {
      this.$localStorage.session('homeIndex', index)
    },

    onExit() {
      this.$store.commit({
        type: 'setUser',
        token: null,
        user: null
      })
      this.$router.push('/login');
    },

  },

}

</script>

<style lang="scss" scoped>
$header-height: 66px;
$color-background: rgb(84, 92, 100);

/deep/ {
  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }

  .el-menu--horizontal > .el-menu-item {
    height: $header-height;
    line-height: $header-height;
    width: 120px;
    text-align: center;
  }

  .el-menu--horizontal > .el-submenu .el-submenu__title {
    height: $header-height;
    line-height: $header-height;
    text-align: center;
    font-size: $font-size-large;
    width: 140px;
  }

  .el-menu-title {
    padding: 0;
    min-width: 200px !important;

    .title {
      font-size: 30px;
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
      width: 180px;
      // margin-right: 40px;
    }
  }

  .color-white {
    color: #fff;
    margin-top: -3px;
  }
}

// 下拉框
.el-menu--popup > .el-menu-item {
  font-size: 16px;
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
  }
}

//footer
.footer-wrapper {
  background-color: $color-background;
  padding: 40px 0;
  color: #fff;
  text-align: center;

  .footer {
    @include body-width;
  }

  p {
    padding: 10px 0;
  }
}
</style>
