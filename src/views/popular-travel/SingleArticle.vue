<template>
  <div class="single-article">
    <!-- 头部 -->
    <div class="header">
      <!-- 头像 -->
      <el-avatar :size="80" :src="circleUrl"></el-avatar>
      <!-- 标题 -->
      <div class="info">
        <h2 class="title">非典型性拉萨游</h2>
        <span>2020.01.26</span>
        <el-divider class="el-divider-title" direction="vertical"></el-divider>
        <span>9天</span>
        <el-divider class="el-divider-title" direction="vertical"></el-divider>
        <span>浏览3529次</span>
      </div>
      <!-- 点赞、收藏 -->
      <div class="count">
        <LikeCount />
        <el-divider direction="vertical"></el-divider>
        <i class="iconfont icon-comment"></i>
        <span>0</span>
        <el-divider direction="vertical"></el-divider>
        <LikeCount :iconName="['icon-collected','icon-collect']" />
      </div>
    </div>
  </div>
</template>

<script>
import LikeCount from "./components/LikeCount";

export default {
  components: {
    LikeCount,
  },

  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",

    };
  },

  methods: {

  }
};
</script>

<style lang="scss" scoped>
/deep/ {
  .el-divider-title {
    margin: 0 20px;
  }
}

.single-article {
  border: 1px solid #000;
}

.header {
  display: flex;
  align-items: center;

  .info {
    margin-left: 20px;
    color: $color-text-secondary;
  }

  .title {
    font-size: 30px;
    font-weight: normal;
    margin-bottom: 8px;
  }

  .count {
    user-select: none;
    padding: 13px;
    margin-left: 200px;
    border: 1px solid $border-color-lighter;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

    .icon-comment {
      font-size: 20px;
      margin-right: 5px;
      cursor: pointer;
    }
  }
}
</style>
