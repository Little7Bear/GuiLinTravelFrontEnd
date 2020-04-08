<template>
  <div class="like-count">
    <i :class="['iconfont',isLike?iconName[0]:iconName[1]]" @click="giveLike"></i>
    <span>{{likeCount}}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    count: {
      type: Number,
      default: 0
    },
    iconName: {
      type: Array,
      default: () => {
        return ["icon-liked", "icon-like"];
      }
    }
  },

  data() {
    return {
      isLike: false,
      likeCount: 0
    };
  },

  computed: {
    ...mapState([
      'user',
    ]),
  },

  created() {
    this.likeCount = this.count;
  },

  methods: {
    giveLike() {
      if (!user) {
        this.message('请先登录')
        return;
      }

      this.isLike = !this.isLike;
      if (this.isLike) {
        this.likeCount++;
      } else {
        this.likeCount--;
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