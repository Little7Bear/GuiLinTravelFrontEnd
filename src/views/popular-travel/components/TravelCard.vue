<template>
  <div class="travel-card" @click="goToArticle">
    <el-card shadow="hover">
      <img :src="cover" class="image" alt="图片" />

      <div class="card-footer">
        <div class="footer-left">
          <h4 class="card-title">{{title}}</h4>

          <div class="user-container">
            <el-avatar :size="25" :src="avatar_url"></el-avatar>
            <span class="user-name">{{username}}</span>
            <el-divider direction="vertical"></el-divider>
            <span class="date">{{date}}</span>
            <el-divider direction="vertical"></el-divider>
            <span class="date-count">{{dayTotal}}天</span>
          </div>
        </div>

        <div class="footer-right">
          <div class="icon-container">
            <i class="iconfont icon-loved"></i>
            <span class="icon-count">{{likeCount}}</span>
          </div>

          <div class="icon-container">
            <i class="iconfont icon-comment"></i>
            <span class="icon-count">{{commentCount}}</span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
    },
    title: {
      type: String,
    },
    username: {
      type: String,
    },
    date: {
      type: String,
    },
    dayTotal: {
      type: Number,
    },
    cover: {
      type: String,
    },
    avatar_url: {
      type: String,
    },
    likeCount: {
      type: Number,
      default: 0
    },
    commentCount: {
      type: Number,
      default: 0
    },
  },

  data() {
    return {

    }
  },

  methods: {
    goToArticle() {
      this.$router.push({
        name: 'Article',
        query: {
          articleID: this.id
        }
      })
    }
  }
}

</script>

<style lang='scss' scoped>
/deep/ {
  .el-card {
    &:hover {
      cursor: pointer;
    }
  }

  .el-card__body {
    padding: 0;
  }
}

.image {
  width: 100%;
  height: 168px;
  object-fit: cover;
}

// 下方文字
.travel-card {
  width: 300px;

  .card-footer {
    padding: 10px;
    display: flex;

    .footer-left {
      width: 210px;
      border-right: 1px solid #dedede;

      .card-title {
        margin: 0;
        @include one-ellipsis;
      }

      .user-container {
        display: flex;
        margin-top: 10px;
        align-items: center;
        font-size: $font-size-extra-small;
        color: $color-text-secondary;

        .user-name {
          margin-left: 10px;
        }

        .date {
          align-items: flex-end;
        }
      }
    }

    .footer-right {
      .icon-container {
        padding-left: 10px;
        display: flex;
        align-items: center;

        .iconfont {
          font-size: 18px;
          margin-left: auto;
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
</style>
