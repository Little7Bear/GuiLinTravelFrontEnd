<template>
  <div class="single-article">
    <!-- 头部 -->
    <div class="header">
      <!-- 头像 -->
      <el-avatar :size="80" :src="avatar_url"></el-avatar>

      <!-- 标题 -->
      <div class="info">
        <h2 class="title" style>{{name}}</h2>
        <span>{{username}}</span>
        <el-divider class="el-divider-title" direction="vertical"></el-divider>
        <span>{{date}}</span>
        <el-divider class="el-divider-title" direction="vertical"></el-divider>
        <span>{{dayTotal}}天</span>
      </div>

      <!-- 点赞、评论、收藏 -->
      <div :class="['count', { fixed: isFixed }]">
        <LikeCount :count="likeCount" />
        <el-divider direction="vertical"></el-divider>

        <i class="iconfont icon-comment"></i>
        <span>{{commentCount}}</span>
        <el-divider direction="vertical"></el-divider>

        <LikeCount :iconName="['icon-collected', 'icon-collect']" :count="collectCount" />
      </div>
    </div>

    <!-- 内容 -->
    <div class="body" id="content">
      <div class="body-content">
        <!-- 楼层效果 -->
        <NavFloor :lists="floorData" />

        <div>
          <!-- 操作 -->
          <div class="opreate">
            <el-button type="primary" @click="editNote">编辑游记</el-button>
            <el-popconfirm
              title="确定删除这篇游记吗？"
              icon="el-icon-info"
              iconColor="red"
              @onConfirm="onDelete"
            >
              <el-button slot="reference" type="danger">删除游记</el-button>
            </el-popconfirm>
          </div>
          <!-- 线路日程 -->
          <LineSchedule :lists="scheduleData" />
        </div>
      </div>
    </div>
    <div class="body-bottom">
      <h4 class="comment-title-container">
        <span class="comment-title">0</span>条评论
      </h4>
      <div class="comment-text-container">
        <div class="avatar-row">
          <el-avatar :size="30" :src="avatar_url"></el-avatar>
          <span class="user-name">Mr.D_dfbf0：</span>
          <span class="comment-text">加油</span>
        </div>
        <div class="comment-tooltip">
          <span class="comment-date">8分钟前</span>

          <el-link type="primary" :underline="false">删除</el-link>
          <el-link type="primary" :underline="false">回复</el-link>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="comment-text-container">
        <div class="avatar-row">
          <el-avatar :size="30" :src="avatar_url"></el-avatar>
          <span class="user-name">Mr.D_dfbf0：</span>
          <span class="comment-text">加油</span>
        </div>
        <div class="comment-tooltip">
          <span class="comment-date">7分钟前</span>

          <el-link type="primary" :underline="false">删除</el-link>
          <el-link type="primary" :underline="false">回复</el-link>
        </div>
      </div>
      <div class="comment-input-container">
        <el-input type="textarea" :rows="4" placeholder="请输入评论" v-model="comment"></el-input>
        <el-button type="primary" size="mini">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import LikeCount from './components/LikeCount'
import NavFloor from './components/NavFloor'
import LineSchedule from './components/LineSchedule'
import note from '../my-home/note';
import { mapState } from 'vuex'

export default {
  components: {
    LikeCount,
    NavFloor,
    LineSchedule
  },

  data() {
    return {
      scrollTop: 0,
      isFixed: false,
      avatar_url: '',
      name: '',
      username: '',
      date: '',
      dayTotal: 0,
      likeCount: 0,
      commentCount: 0,
      collectCount: 0,
      floorData: null,
      scheduleData: null,
      comment: '',
    }
  },

  computed: {
    ...mapState([
      'user',
    ]),
  },

  created() {
    this._queryData()
  },

  mounted() {
    this.$nextTick(function () {
      // 滑动时显示点赞栏
      window.addEventListener(
        'scroll',
        this.handleScrollTop
      )
    })
  },

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    _queryData() {
      note.findByID(this.$route.query.articleID)
        .then(res => {
          let data = res.data
          this.avatar_url = data.avatar_url
          this.name = data.name
          this.username = data.username
          this.date = data.date
          this.dayTotal = data.dayTotal
          this.likeCount = data.likeCount
          this.commentCount = data.commentCount
          this.collectCount = data.collectCount
          this.floorData = data.days
          this.scheduleData = data.days
        })
    },

    onDelete() {
      note.delete(this.$route.query.articleID)
        .then(res => {
          this.$router.replace({ name: 'MyHome' })
        })
    },

    editNote() {
      this.$router.push({
        name: 'CreateTravel',
        query: { id: this.$route.query.articleID }
      })
    },

    // 显示点赞
    handleScrollTop() {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

      const offsetTop = document.querySelector('#content').offsetTop

      if (this.scrollTop > offsetTop) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    }
  },
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
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

    .icon-comment {
      font-size: 20px;
      margin-right: 5px;
      cursor: pointer;
    }
  }

  .fixed {
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 13px 90px;

    .el-divider {
      margin: 0 90px;
    }
  }
}

.body {
  padding-top: 30px;
  padding-left: 10px;
}

.body-content {
  display: flex;

  .opreate {
    text-align: center;
    margin-bottom: 20px;

    .el-button {
      margin-right: 20px;
    }
  }
}

.body-bottom {
  width: 568px;
  margin-left: 100px;
  font-size: 13px;
  padding-bottom: 20px;

  .comment-title-container {
    margin-top: 18px;
    font-size: 18px;
    font-weight: normal;
    padding-bottom: 8px;
    border-bottom: 1px solid $border-color-base;
  }

  .comment-title {
    font-size: 24px;
    font-weight: bold;
    color: $color-primary;
    margin-right: 5px;
  }

  .comment-text-container {
    margin-top: 10px;
    padding-left: 10px;
  }

  .avatar-row {
    display: flex;
    align-items: center;
    margin-bottom: 3px;
  }

  .user-name {
    margin-left: 5px;
    color: $color-primary;
  }

  .comment-tooltip {
    display: flex;

    .el-link:first-of-type {
      margin-left: auto;
      margin-right: 20px;
    }
  }

  .comment-date {
    margin-left: 35px;
    color: $color-text-secondary;
    font-size: 12px;
  }

  .el-divider {
    margin: 0 auto;
    width: 95%;
    margin-top: 10px;
  }

  .comment-input-container {
    margin-top: 30px;
    text-align: right;

    .el-button {
      margin-top: 10px;
    }
  }
}
</style>
