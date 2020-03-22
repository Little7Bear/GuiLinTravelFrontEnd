<template>
  <div class="create-travel">
    <div class="header">
      <span>游记名称：</span>
      <el-input v-model="name" placeholder="请输入内容"></el-input>
      <el-button type="primary">生成游记</el-button>
    </div>

    <div class="content">
      <!-- 侧边照片选择器 -->
      <ul class="sidebar">
        <li class="sidebar-item">
          <ol class="day-wrapper">
            <el-scrollbar>
              <li class="day" v-for="(item, index) in 5" :key="index" @click="selectDay(index)">
                <span :class="{'active-text': index === currentDay}">第{{index + 1}}天</span>
              </li>
              <div>
                <el-button type="primary" size="mini">
                  添加
                  <i class="el-icon-plus"></i>
                </el-button>
              </div>
            </el-scrollbar>
          </ol>

          <ol class="img-wrapper">
            <el-scrollbar>
              <li class="img-item">
                <el-image
                  src="http://photos.breadtrip.com/photo_2020_02_01_27aabfecb6aa5c2bb0781d5f144b288c.jpg?imageView/2/w/960/q/85"
                  fit="cover"
                ></el-image>
              </li>
            </el-scrollbar>
          </ol>
        </li>
      </ul>

      <!-- 描述 -->
      <div class="describe"></div>

      <!-- 时间地点 -->
      <div class="toolbar"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      currentDay: 0,
    }
  },

  methods: {
    selectDay(index) {
      this.currentDay = index;
    },
  },
}
</script>

<style lang='scss' scoped>
.header {
  display: flex;
  align-items: center;

  .el-input {
    width: 300px;
    margin-right: auto;
  }
}

.content {
  display: flex;
}

// 侧边照片选择器
.sidebar {
  margin-top: 30px;
  border-right: 1px solid $border-color-base;

  .sidebar-item {
    display: flex;
  }

  .day-wrapper {
    width: 70px;
    height: 50vh;
  }

  .day {
    margin-bottom: 20px;
    cursor: pointer;
  }

  .active-text {
    color: $color-primary;
  }

  .el-button--mini {
    padding: 5px;
  }

  // 图片
  .img-wrapper {
    width: 150px;
    margin-left: 10px;
    height: 70vh;
  }

  .img-item {
    width: 126px;
    height: 130px;
    margin-bottom: 20px;

    .el-image {
      height: 100%;
      border-radius: 6px;
      cursor: pointer;
    }
  }
}
</style>