<template>
    <div class="single-article">
        <!-- 头部 -->
        <div class="header">
            <!-- 头像 -->
            <el-avatar :size="80" :src="circleUrl"></el-avatar>
            <!-- 标题 -->
            <div class="info">
                <h2 class="title" style="">非典型性拉萨游</h2>
                <span>巴尼拉斯科技</span>
                <el-divider
                    class="el-divider-title"
                    direction="vertical"
                ></el-divider>
                <span>2020.01.26</span>
                <el-divider
                    class="el-divider-title"
                    direction="vertical"
                ></el-divider>
                <span>9天</span>
                <el-divider
                    class="el-divider-title"
                    direction="vertical"
                ></el-divider>
                <span>浏览3529次</span>
            </div>
            <!-- 点赞、收藏 -->
            <div class="count">
                <LikeCount />
                <el-divider direction="vertical"></el-divider>
                <i class="iconfont icon-comment"></i>
                <span>0</span>
                <el-divider direction="vertical"></el-divider>
                <LikeCount :iconName="['icon-collected', 'icon-collect']" />
            </div>
        </div>

        <!-- 内容 -->
        <div class="body" ref="content">
            <!-- 楼层效果 -->
            <NavFloor />
        </div>
    </div>
</template>

<script>
import LikeCount from './components/LikeCount'
import NavFloor from './components/NavFloor'

export default {
  components: {
    LikeCount,
    NavFloor
  },

  data () {
    return {
      scrollTop: 0,
      circleUrl:
                'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      // 时间线
      activities: [{
        content: '活动按期开始',
        timestamp: '2018-04-15'
      }, {
        content: '通过审核',
        timestamp: '2018-04-13'
      }, {
        content: '创建成功',
        timestamp: '2018-04-11'
      }]
    }
  },

  mounted () {
    this.$nextTick(function () {
      // 滑动时显示点赞栏
      window.addEventListener(
        'scroll',
        this.$_.debounce(this.showLike, 200)
      )
    })
  },

  methods: {
    // 显示点赞
    showLike () {
      this.scrollTop = document.documentElement.scrollTop
      if (this.scrollTop > this.$refs.content.offsetTop) {
        // console.log(1); todo 显示点赞
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ {
    .el-divider-title {
        margin: 0 10px;
    }

    .el-timeline {
        padding-left: 35px;
    }
}

.header {
    display: flex;
    align-items: center;

    .info {
        margin-left: 20px;
        color: $color-text-secondary;
        width: 380px;

        .title {
            font-size: 30px;
            font-weight: normal;
            margin-bottom: 8px;
        }
    }

    .count {
        user-select: none;
        padding: 13px;
        margin-left: 40px;
        border: 1px solid $border-color-lighter;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

        .icon-comment {
            font-size: 20px;
            margin-right: 5px;
            cursor: pointer;
        }
    }
}

.body {
    padding-top: 30px;
    padding-left: 10px;
}
</style>
