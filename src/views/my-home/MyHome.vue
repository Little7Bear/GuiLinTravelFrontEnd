<template>
  <div class="my-home">
    <div class="main">
      <!-- 个人信息 -->
      <div class="home-header">
        <el-avatar :size="80" :src="circleUrl"></el-avatar>
        <div class="user-info">
          <span class="user-name">Mr.D_dfbf0</span>
        </div>
      </div>

      <!-- toolbar -->
      <div class="toolbar">
        <span class="toolbar-text">游记1</span>
        <span class="toolbar-text">喜欢1</span>
        <span class="toolbar-text">收藏1</span>
      </div>

      <!-- 曾经的游记 -->
      <div class="content-note">
        <h3 class="note-title">曾经的游记</h3>
        <div class="note-container">
          <el-card
            :body-style="{ padding: '0px' }"
            shadow="hover"
            v-for="(item, index) in 2"
            :key="index"
          >
            <imageCover
              src="http://photos.breadtrip.com/photo_2020_03_18_bab8e09048a34b179c3e5a2c5bd31b10.jpg?imageView/2/w/960/q/85"
              class="image"
            />
            <div class="card-body">
              <div>
                <h5 class="card-title">云南5日游</h5>
                <div class="card-toolbar">
                  <span>2020.03.18</span>
                  <span class="day-count">1天</span>
                </div>
              </div>
              <div class="card-right">
                <div class="icon-container">
                  <i class="iconfont icon-loved"></i>
                  <span class="icon-count">10</span>
                </div>

                <div class="icon-container">
                  <i class="iconfont icon-comment"></i>
                  <span class="icon-count">5</span>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>

    <!-- 侧边栏 -->
    <div class="sidebar">
      <div class="sidebar-create">
        <el-button type="primary">
          创建游记
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </div>

      <div class="sidebar-achievement">
        <h4 class="achievement-title">旅行成就</h4>
        <div class="achievement-box">
          <div class="achievement-item">
            <div class="achievement-number">1</div>
            <div>次被阅读</div>
          </div>
          <div class="achievement-row">
            <div class="achievement-item">
              <div class="achievement-number">1</div>
              <div>次被喜欢</div>
            </div>
            <div class="achievement-item">
              <div class="achievement-number">1</div>
              <div>次被收藏</div>
            </div>
          </div>

          <div class="achievement-mileage">
            <i class="iconfont icon-trophy"></i>
            <span>旅行总里程</span>
            <span class="number">1000.0</span>
            <sub>km</sub>
          </div>

          <div class="achievement-row">
            <div class="achievement-item">
              <div class="achievement-number">1</div>
              <div>区县</div>
            </div>
            <div class="achievement-item">
              <div class="achievement-number">1</div>
              <div>景点</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    }
  },
}

</script>

<style lang="scss" scoped>
.my-home {
  display: flex;
  justify-content: space-between;
}

.main {
  width: 611px;
}

// 个人信息
.home-header {
  display: flex;
  align-items: center;

  .user-info {
    margin-left: 10px;
  }

  .user-name {
    font-size: 24px;
    color: $color-text-primary;
  }
}

// toolbar
.toolbar {
  height: 50px;
  margin-top: 30px;
  font-size: 20px;
  display: inline-block;
  border: 1px solid $border-color-base;
  color: $color-primary;
  box-shadow: $box-shadow-base;
  display: flex;
  align-items: center;

  .toolbar-text {
    flex: 1;
    text-align: center;
    border-right: 1px solid $border-color-base;

    &:last-of-type {
      border-right: none;
    }
  }
}

// 曾经的游记
.content-note {
  margin-top: 30px;

  .note-title {
    font-size: 28px;
    font-weight: normal;
  }

  .note-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;

    .el-card {
      width: 300px;
      margin-bottom: 10px;
    }

    .image {
      height: 220px;
    }

    .card-body {
      display: flex;
      justify-content: space-between;
      padding: 14px;
    }

    .card-title {
      font-size: 16px;
      font-weight: normal;
    }

    .card-toolbar {
      font-size: 12px;
      color: $color-text-secondary;
      margin-top: 10px;
    }

    .day-count {
      margin-left: 10px;
    }

    .card-right {
      border-left: 1px solid $border-color-base;

      .icon-container {
        padding-left: 10px;
        display: flex;
        align-items: center;

        .iconfont {
          font-size: 18px;
          margin-right: 5px;
        }

        .icon-loved {
          color: red;
        }

        .icon-count {
          width: 28px;
          font-size: $font-size-extra-small;
          color: $color-text-secondary;
        }

        &:last-of-type {
          margin-top: 5px;
        }
      }
    }
  }
}

// 侧边栏
.sidebar {
  width: 260px;

  .sidebar-create {
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }

  .sidebar-achievement {
    margin-top: 100px;

    .achievement-title {
      font-size: 20px;
      font-weight: normal;
    }

    .achievement-box {
      margin-top: 20px;
      border: 1px solid $border-color-base;
      box-shadow: $box-shadow-base;
      padding: 18px;
    }

    .achievement-row {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;

      .achievement-item {
        width: 40%;
      }
    }

    .achievement-item {
      font-size: 13px;
      color: $color-text-secondary;
      padding-bottom: 10px;
      border-bottom: 1px solid $border-color-light;
    }

    .achievement-number {
      color: $color-text-primary;
      font-size: 20px;
      font-weight: bold;
    }

    .achievement-mileage {
      height: 40px;
      border: 1px solid $border-color-light;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 13px;
      margin-top: 20px;

      .number {
        font-size: 16px;
        font-weight: bold;
        margin-right: 5px;
        margin-left: 10px;
      }

      .icon-trophy {
        margin-right: 10px;
        font-size: 20px;
        color: orange;
      }
    }
  }
}
</style>
