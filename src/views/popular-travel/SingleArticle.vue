<template>
  <div class="single-article" v-loading="loading">
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
        <LikeCount :count="likeCount" :ownerID="userID" :noteID="noteID" />
        <el-divider direction="vertical"></el-divider>

        <i class="iconfont icon-comment" @click="jumpComment"></i>
        <span>{{commentCount}}</span>
        <el-divider direction="vertical"></el-divider>

        <LikeCount :type="1" :count="collectCount" :ownerID="userID" :noteID="noteID" />
      </div>

      <el-button
        style="margin-left:auto;"
        type="primary"
        round
        icon="el-icon-back"
        @click="$router.back()"
      >返回</el-button>
    </div>

    <!-- 内容 -->
    <div class="body" id="content">
      <div class="body-content">
        <!-- 楼层效果 -->
        <NavFloor :lists="floorData" />

        <div>
          <!-- 操作 -->
          <div class="opreate" v-if="hasPermission">
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
    <!-- 评论 -->
    <div class="body-bottom">
      <h4 class="comment-title-container">
        <span class="comment-title">{{comments.length}}</span>条评论
      </h4>
      <!-- 评论列表 -->
      <ul>
        <li class="comment-text-container" v-for="(comment, index) in comments" :key="index">
          <div class="avatar-row">
            <el-avatar :size="30" :src="comment.avatar_url"></el-avatar>
            <span class="user-name">{{comment.username}}：</span>
            <span class="comment-text">{{comment.text}}</span>
          </div>
          <div class="comment-tooltip">
            <span class="comment-date">{{comment.date}}</span>

            <div class="comment-right">
              <el-popconfirm
                title="确定删除此条评论吗？"
                icon="el-icon-info"
                iconColor="red"
                v-if="comment.isSelf"
                @onConfirm="delComment(comment.id)"
              >
                <el-link slot="reference" class="delete" type="primary" :underline="false">删除</el-link>
              </el-popconfirm>
              <el-link type="primary" :underline="false" @click="reply(comment.username)">回复</el-link>
            </div>
          </div>
        </li>
      </ul>
      <!-- 评论区 -->
      <div class="comment-input-container">
        <el-input
          ref="comment"
          type="textarea"
          :rows="5"
          placeholder="请输入评论"
          v-model="comment"
          maxlength="500"
          show-word-limit
        ></el-input>
        <el-button type="primary" size="mini" @click="onComment">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import LikeCount from "./components/LikeCount";
import NavFloor from "./components/NavFloor";
import LineSchedule from "./components/LineSchedule";
import note from "@/api/note";
import { mapState } from "vuex";

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
      avatar_url: "",
      name: "",
      username: "",
      date: "",
      dayTotal: 0,
      likeCount: 0,
      commentCount: 0,
      collectCount: 0,
      floorData: null,
      scheduleData: null,
      comment: "",
      loading: false,
      userID: "",
      noteID: "",
      comments: [
        // {
        //   id:'',
        //   avatar_url: '',
        //   userId: '',
        //   username: '雨夜',
        //   text: '好骚哦',
        //   date: '2020年4月14日22:33:59',
        //   isSelf: false,
        // }
      ] //评论列表
    };
  },

  computed: {
    ...mapState(["user"]),

    hasPermission() {
      if (this.user && this.user.id === this.userID) {
        return true;
      } else {
        return false;
      }
    }
  },

  created() {
    this.noteID = this.$route.query.articleID;
    if (this.noteID) {
      this._queryData(this.noteID);
      this._queryComments(this.noteID);
    }
  },

  mounted() {
    this.$nextTick(function() {
      // 滑动时显示点赞栏
      window.addEventListener("scroll", this.handleScrollTop);
    });
  },

  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    _queryData(id) {
      this.loading = true;
      note
        .findByID(id)
        .then(res => {
          this.loading = false;
          let data = res.data;
          this.avatar_url = data.avatar_url;
          this.name = data.name;
          this.username = data.username;
          this.date = data.date;
          this.dayTotal = data.dayTotal;
          this.likeCount = data.likeCount;
          this.commentCount = data.commentCount;
          this.collectCount = data.collectCount;
          this.floorData = data.days;
          this.scheduleData = data.days;
          this.userID = data.userID;
        })
        .catch(err => {
          this.loading = false;
        });
    },

    _queryComments(noteId) {
      note.findComments(noteId).then(res => {
        let lists = res.data;
        //转换数据格式
        lists.forEach(list => {
          if (list.userId === this.user.id || this.hasPermission) {
            list.isSelf = true;
            return;
          }
          list.isSelf = false;
        });
        this.comments = lists;
      });
    },

    onDelete() {
      note.delete(this.$route.query.articleID).then(res => {
        this.$router.replace({ name: "MyHome" });
      });
    },

    editNote() {
      this.$router.push({
        name: "CreateTravel",
        query: { id: this.$route.query.articleID }
      });
    },

    // 显示点赞
    handleScrollTop() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let dom = document.querySelector("#content");
      if (dom) {
        const offsetTop = dom.offsetTop;
        if (this.scrollTop > offsetTop) {
          this.isFixed = true;
        } else {
          this.isFixed = false;
        }
      }
    },

    jumpComment() {
      //跳转到评论
      this.$refs.comment.focus();
    },

    onComment(e, commentId) {
      //评论
      let text = this.comment.trim();
      let param = {
        text,
        commentId: commentId,
        userId: this.user.id,
        date: this.$dayjs().format("YYYY-MM-DD HH:mm:ss")
      };

      note.addComment(this.noteID, param).then(res => {
        let lists = res.data;
        //转换数据格式
        lists.forEach(list => {
          if (list.userId === this.user.id || this.hasPermission) {
            list.isSelf = true;
            return;
          }
          list.isSelf = false;
        });
        this.comments = lists;
        this.comment = "";
      });
    },

    reply(username) {
      //回复
      this.comment = `回复${username}: `;
      this.$refs.comment.focus();
    },

    delComment(commentId) {
      this.onComment(null, commentId);
    }
  }
};
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
  }

  .comment-title {
    font-size: 24px;
    font-weight: bold;
    color: $color-primary;
    margin-right: 5px;
  }

  .comment-text-container {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid $border-color-base;
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
  }

  .comment-right {
    margin-left: auto;

    .delete {
      margin-right: 10px;
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
