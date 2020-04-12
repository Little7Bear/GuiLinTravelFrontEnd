<template>
  <div class="my-home">
    <div class="main">
      <!-- 个人信息 -->
      <div class="home-header">
        <el-avatar :size="80" :src="avatar_url"></el-avatar>
        <div class="user-info">
          <span class="user-name">{{userName}}</span>
        </div>
      </div>

      <!-- toolbar -->
      <div class="toolbar">
        <span class="toolbar-text">游记{{ownCount}}</span>
        <span class="toolbar-text">喜欢{{likeCount}}</span>
        <span class="toolbar-text">收藏{{collectCount}}</span>
      </div>

      <!-- 曾经的游记 -->
      <div class="content-note">
        <h3 class="note-title">曾经的游记</h3>
        <div class="note-container">
          <el-card
            :body-style="{ padding: '0px' }"
            shadow="hover"
            v-for="(item, index) in notes"
            :key="index"
            @click.native="viewDetail(item.id)"
          >
            <imageCover :src="item.cover" class="image" />
            <div class="card-body">
              <div>
                <h5 class="card-title">{{item.title}}</h5>
                <div class="card-toolbar">
                  <span>{{item.date}}</span>
                  <span class="day-count">{{item.dayTotal}}天</span>
                </div>
              </div>
              <div class="card-right">
                <div class="icon-container">
                  <i class="iconfont icon-loved"></i>
                  <span class="icon-count">{{item.like}}</span>
                </div>

                <div class="icon-container">
                  <i class="iconfont icon-comment"></i>
                  <span class="icon-count">{{item.comment}}</span>
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
        <el-button type="primary" @click="createTravel">
          创建游记
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </div>

      <div class="sidebar-achievement">
        <h4 class="achievement-title">旅行成就</h4>
        <div class="achievement-box">
          <div class="achievement-row">
            <div class="achievement-item">
              <div class="achievement-number">{{receiveLike}}</div>
              <div>次被喜欢</div>
            </div>
            <div class="achievement-item">
              <div class="achievement-number">{{receiveCollect}}</div>
              <div>次被收藏</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import note from './note';
import { mapState } from 'vuex'

export default {
  data() {
    return {
      avatar_url: "",
      userName: '',
      ownCount: 0,
      likeCount: 0,
      collectCount: 0,
      receiveLike: 0,
      receiveCollect: 0,
      notes: [],
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

  methods: {
    _queryData() {
      if (!this.user) {
        this.$message({ message: '请先登录', duration: 1000, showClose: true })
        return;
      }

      note.findByUserID(this.user.id)
        .then(res => {
          let data = res.data
          this.userName = data.username
          this.avatar_url = data.avatar_url
          this.notes = data.notes
          this.ownCount = data.ownCount
          this.likeCount = data.likeCount
          this.collectCount = data.collectCount
          this.receiveLike = data.receiveLike
          this.receiveCollect = data.receiveCollect
        })
    },

    createTravel() {
      this.$router.push({ name: 'CreateTravel' })
    },

    viewDetail(articleID) {
      this.$router.push({ name: 'Article', query: { articleID } })
    },
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
      :hover {
        cursor: pointer;
      }
    }

    .image {
      height: 220px;
    }

    .card-body {
      border-top: 1px solid $border-color-base;
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
  }
}
</style>
