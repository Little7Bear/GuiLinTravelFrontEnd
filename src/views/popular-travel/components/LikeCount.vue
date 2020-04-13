<template>
  <div class="like-count">
    <i :class="['iconfont',isClick?iconName[0]:iconName[1]]" @click="giveLike"></i>
    <span>{{nCount}}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import note from '@/api/note';
import userInstance from '@/api/user';

export default {
  props: {
    count: {
      type: Number,
      default: 0
    },
    noteID: {
      type: String,
      required: true,
    },
    ownerID: {
      type: String,
      default: 0
    },
    type: {//0点赞，1收藏
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      isClick: false,
      nCount: 0,
    };
  },

  computed: {
    ...mapState([
      'user',
    ]),

    iconName() {
      return this.type === 0 ? ["icon-liked", "icon-like"] : ['icon-collected', 'icon-collect']
    },
  },

  watch: {
    count: {
      immediate: true,
      handler(value) {
        this.nCount = this.count
      },
    },
  },

  created() {
    this._queryState(this.user.id, this.noteID)
  },

  methods: {
    // 查询是否已点赞或收藏
    _queryState(userId, noteId) {
      let params = {
        id: userId,
        noteId: noteId
      }
      userInstance.verifyState(params)
        .then(res => {
          let data = res.data
          if (this.type === 0) {
            this.isClick = !!data.like
          } else {
            this.isClick = !!data.collect
          }
        })
    },

    // 更新
    async _updateCount(flag) {
      // 判断是否本人
      if (this.user.id === this.ownerID) {
        return;
      }

      let noteParams = {}//游记参数
      // 判断是点赞还是收藏
      if (this.type === 0) {
        noteParams.likeCount = this.nCount
      } else {
        noteParams.collectCount = this.nCount
      }

      let userPamrs = {}//用户参数
      userPamrs.noteId = this.noteID
      // 判断是添加还是取消
      if (flag) {
        //添加
        if (this.type === 0) {
          userPamrs.likeCount = 1
        } else {
          userPamrs.collectCount = 1
        }
      } else {
        //取消
        if (this.type === 0) {
          userPamrs.likeCount = -1
        } else {
          userPamrs.collectCount = -1
        }
      }

      try {
        // 1、更新游记记录数
        await note.update(this.noteID, noteParams)
        // 2、更新个人信息记录数
        await userInstance.updateAmount(this.user.id, userPamrs)
      } catch (error) {
        console.log(error);
      }
    },

    giveLike() {
      if (!this.user) {
        this.$message('请先登录')
        return;
      }

      this.isClick = !this.isClick;
      if (this.isClick) {
        this.nCount++;
        this._updateCount(true)
      } else {
        this.nCount--;
        this._updateCount(false)
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.like-count {
  display: inline-block;
}

.iconfont {
  font-size: 20px;
  margin-right: 5px;
  cursor: pointer;
}
</style>