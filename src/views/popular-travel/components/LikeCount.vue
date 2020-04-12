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
      likeCount: 0,
    };
  },

  computed: {
    ...mapState([
      'user',
    ]),
  },

  watch: {
    count: {
      immediate: true,
      handler(value) {
        this.likeCount = this.count
      },
    },
  },

  methods: {
    giveLike() {
      if (!this.user) {
        this.$message('请先登录')
        return;
      }

      this.isLike = !this.isLike;
      if (this.isLike) {
        this.likeCount++;
      } else {
        this.likeCount--;
      }
      this.$emit('change', this.likeCount)
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